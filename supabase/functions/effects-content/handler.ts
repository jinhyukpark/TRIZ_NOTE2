// Service credentials remain server-side; no client-supplied user ID or object path.
export function createHandler(admin:any,baseUrl:string,now=()=>Date.now()){
 const json=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
 return async(req:Request)=>{
  if(req.method!=='POST')return json({error:'METHOD_NOT_ALLOWED'},405);
  const token=req.headers.get('Authorization')?.match(/^Bearer (.+)$/)?.[1];
  if(!token)return json({error:'UNAUTHORIZED'},401);
  try{
   const {data:{user},error:authError}=await admin.auth.getUser(token);
   if(authError||!user||user.is_anonymous)return json({error:'UNAUTHORIZED'},401);
   const override=user.app_metadata?.premium_override===true;
   let expiry=now()+300000;
   if(!override){
    const {data:access,error:accessError}=await admin.from('entitlements').select('active,expires_at,verified_at').eq('user_id',user.id).eq('entitlement','premium').maybeSingle();
    if(accessError)return json({error:'ACCESS_CHECK_FAILED'},503);
    expiry=Date.parse(access?.expires_at??'');
    if(!access?.active||!access.verified_at||!Number.isFinite(expiry)||expiry<=now())return json({error:'SUBSCRIPTION_REQUIRED'},403);
   }
   const ttl=Math.min(300,Math.floor((expiry-now())/1000));
   if(ttl<1)return json({error:'SUBSCRIPTION_REQUIRED'},403);
   const issuedAt=now();
   const {data:rows,error}=await admin.from('effect_content').select('id,schema_version,payload').eq('published',true);
   if(error||!rows?.length)return json({error:'CONTENT_UNAVAILABLE'},503);
   const paths=new Set<string>();
   const visit=(v:any,fn:(asset:any)=>void)=>{if(!v||typeof v!=='object')return;if(typeof v.uri==='string'&&v.sha256&&v.width&&v.height){fn(v);return;}for(const x of Object.values(v))visit(x,fn);};
   const objectPath=(asset:any)=>{
    const url=new URL(asset.uri),prefix='/storage/v1/object/authenticated/effect-content/';
    if(url.origin!==new URL(baseUrl).origin||!url.pathname.startsWith(prefix))throw Error('UNTRUSTED_ASSET');
    const path=decodeURIComponent(url.pathname.slice(prefix.length));
    if(!path||path.split('/').includes('..'))throw Error('INVALID_PATH');return path;
   };
   for(const row of rows)visit(row.payload,a=>paths.add(objectPath(a)));
   const {data:signed,error:signError}=await admin.storage.from('effect-content').createSignedUrls([...paths],ttl);
   if(signError||signed?.length!==paths.size||signed.some((s:any)=>s.error||!s.signedUrl))return json({error:'IMAGE_SIGNING_FAILED'},503);
   const urls=new Map(signed.map((s:any)=>[s.path,s.signedUrl]));
   for(const row of rows)visit(row.payload,a=>{const uri=urls.get(objectPath(a));if(!uri)throw Error('MISSING_IMAGE');a.uri=uri;});
   // Do not issue a lease if the subscription expired during signing.
   const expiresAt=Math.min(expiry,issuedAt+ttl*1000);
   if(expiresAt<=now())return json({error:'SUBSCRIPTION_REQUIRED'},403);
   return json({rows,expiresAt});
  }catch{return json({error:'CONTENT_UNAVAILABLE'},503);}
 };
}
