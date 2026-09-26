// Administrative utility: grant or revoke server-controlled premium access.
// The service credential is requested from the linked Supabase project and is
// never written to disk or printed.
import {execFileSync} from 'node:child_process';
import {createClient} from '@supabase/supabase-js';

const ref='sovzalkrotgvnqvpfkjd',url=`https://${ref}.supabase.co`;
const email=process.argv.find(x=>x.startsWith('--email='))?.slice(8).trim().toLowerCase();
const enabled=process.argv.includes('--enable')?true:process.argv.includes('--disable')?false:null;
if(!email||enabled===null)throw Error('Usage: node scripts/set-premium-override.mjs --email=user@example.com --enable|--disable');

const keys=JSON.parse(execFileSync('supabase',['projects','api-keys','--project-ref',ref,'--reveal','--output','json'],{encoding:'utf8',stdio:['ignore','pipe','pipe']}));
const list=Array.isArray(keys)?keys:keys.api_keys??keys.keys??[];
const key=list.find(k=>k.name==='service_role')?.api_key??list.find(k=>k.type==='secret')?.api_key;
if(!key)throw Error('Administrative credential unavailable');
const admin=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});

let match=null;
for(let page=1;!match;page++){
 const{data,error}=await admin.auth.admin.listUsers({page,perPage:1000});
 if(error)throw error;
 const found=data.users.filter(user=>user.email?.trim().toLowerCase()===email);
 if(found.length>1)throw Error('Multiple users matched the email');
 if(found.length===1){match=found[0];break;}
 if(data.users.length<1000)break;
}
if(!match)throw Error('User not found');

const appMetadata={...match.app_metadata};
if(enabled)appMetadata.premium_override=true;else delete appMetadata.premium_override;
const{error:updateError}=await admin.auth.admin.updateUserById(match.id,{app_metadata:appMetadata});
if(updateError)throw updateError;
const overrideExpiry='2099-12-31T23:59:59.000Z';
if(enabled){
 const{error:entitlementError}=await admin.from('entitlements').upsert({
  user_id:match.id,
  entitlement:'premium',
  active:true,
  expires_at:overrideExpiry,
  verified_at:new Date().toISOString(),
 },{onConflict:'user_id,entitlement'});
 if(entitlementError)throw entitlementError;
}else{
 // Revoke only the synthetic override row; never overwrite a real store term.
 const{data:current,error:currentError}=await admin.from('entitlements').select('expires_at').eq('user_id',match.id).eq('entitlement','premium').maybeSingle();
 if(currentError)throw currentError;
 if(current&&Date.parse(current.expires_at)===Date.parse(overrideExpiry)){
  const{error:revokeError}=await admin.from('entitlements').update({active:false,expires_at:new Date().toISOString(),verified_at:new Date().toISOString()}).eq('user_id',match.id).eq('entitlement','premium');
  if(revokeError)throw revokeError;
 }
}
const{data:verified,error:verifyError}=await admin.auth.admin.getUserById(match.id);
if(verifyError||verified.user?.app_metadata?.premium_override!==enabled)throw Error('Premium override verification failed');
if(enabled){
 const{data:entitlement,error:entitlementReadError}=await admin.from('entitlements').select('active,expires_at,verified_at').eq('user_id',match.id).eq('entitlement','premium').single();
 if(entitlementReadError||!entitlement.active||!entitlement.verified_at||Date.parse(entitlement.expires_at)<=Date.now())throw Error('Premium entitlement verification failed');
}
console.log(`Premium override ${enabled?'enabled':'disabled'} and verified for ${email}.`);
