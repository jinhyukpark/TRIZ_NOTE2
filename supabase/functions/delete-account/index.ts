import {createClient} from 'npm:@supabase/supabase-js@2.116.0';
import {SignJWT,importPKCS8,createRemoteJWKSet,jwtVerify} from 'npm:jose@6.1.3';
const keys=createRemoteJWKSet(new URL('https://appleid.apple.com/auth/keys'));
const json=(body:unknown,status=200)=>Response.json(body,{status});
const required=(name:string)=>{const value=Deno.env.get(name);if(!value)throw Error('NOT_CONFIGURED');return value;};
async function applePost(path:string,body:URLSearchParams){
 const result=await fetch('https://appleid.apple.com/auth/'+path,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body,signal:AbortSignal.timeout(15000)});
 if(!result.ok)throw Error('APPLE_AUTH_FAILED');return result;
}
Deno.serve(async req=>{
 if(req.method!=='POST')return json({error:'METHOD_NOT_ALLOWED'},405);
 try{
  const bearer=req.headers.get('Authorization')??'';if(!bearer.startsWith('Bearer '))return json({error:'UNAUTHORIZED'},401);
  const token=bearer.slice(7),url=required('SUPABASE_URL');
  const admin=createClient(url,required('SUPABASE_SERVICE_ROLE_KEY'),{auth:{persistSession:false,autoRefreshToken:false}});
  const {data:{user},error}=await admin.auth.getUser(token);if(error||!user)return json({error:'UNAUTHORIZED'},401);
  const raw=await req.text();if(raw.length>12000)return json({error:'TOO_LARGE'},413);
  const body=JSON.parse(raw);if(body.confirmation!=='DELETE_MY_ACCOUNT')return json({error:'CONFIRMATION_REQUIRED'},400);
  const apple=user.identities?.find(i=>i.provider==='apple');
  if(apple){
   if(typeof body.appleCode!=='string'||body.appleCode.length>4096)return json({error:'REAUTH_REQUIRED'},401);
   const clientId=required('APPLE_AUTH_CLIENT_ID');
   const signingKey=await importPKCS8(required('APPLE_AUTH_PRIVATE_KEY').replace(/\\n/g,'\n'),'ES256');
   const secret=await new SignJWT({}).setProtectedHeader({alg:'ES256',kid:required('APPLE_AUTH_KEY_ID')}).setIssuer(required('APPLE_AUTH_TEAM_ID')).setSubject(clientId).setAudience('https://appleid.apple.com').setIssuedAt().setExpirationTime('5m').sign(signingKey);
   const response=await applePost('token',new URLSearchParams({client_id:clientId,client_secret:secret,code:body.appleCode,grant_type:'authorization_code'}));
   const tokens=await response.json();
   if(!tokens.id_token||!tokens.refresh_token)throw Error('APPLE_AUTH_FAILED');
   const {payload}=await jwtVerify(tokens.id_token,keys,{issuer:'https://appleid.apple.com',audience:clientId});
   // A valid code from some other Apple account must never delete this account.
   if(payload.sub!==apple.id)return json({error:'IDENTITY_MISMATCH'},403);
   await applePost('revoke',new URLSearchParams({client_id:clientId,client_secret:secret,token:tokens.refresh_token,token_type_hint:'refresh_token'}));
  }else{
   if(!user.email||typeof body.password!=='string'||!body.password||body.password.length>1024)return json({error:'REAUTH_REQUIRED'},401);
   const auth=createClient(url,required('SUPABASE_ANON_KEY'),{auth:{persistSession:false,autoRefreshToken:false}});
   const check=await auth.auth.signInWithPassword({email:user.email,password:body.password});
   if(check.error||check.data.user?.id!==user.id)return json({error:'REAUTH_FAILED'},401);
   await auth.auth.signOut({scope:'local'});
  }
  // Revoke refresh sessions before the cascading deletion. Do not trust a client user ID.
  const signedOut=await admin.auth.admin.signOut(token,'global');if(signedOut.error)throw Error('SIGNOUT_FAILED');
  const deleted=await admin.auth.admin.deleteUser(user.id,false);if(deleted.error)throw Error('DELETE_FAILED');
  return json({deleted:true});
 }catch{return json({error:'ACCOUNT_DELETION_FAILED'},400);}
});
