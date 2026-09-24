import { createClient } from 'npm:@supabase/supabase-js@2.116.0';
import { SignJWT, importPKCS8, decodeJwt } from 'npm:jose@6.1.3';

const json = (body: unknown, status = 200) => Response.json(body, { status });
const required = (name: string) => { const value = Deno.env.get(name); if (!value) throw new Error('BILLING_NOT_CONFIGURED'); return value; };
const enc = encodeURIComponent;
async function request(url: string, options: RequestInit = {}) {
 const response = await fetch(url, { ...options, signal: AbortSignal.timeout(15000) });
 if (!response.ok) throw new Error('STORE_VERIFICATION_FAILED');
 return await response.json();
}
Deno.serve(async (req) => {
 if (req.method !== 'POST') return json({error:'METHOD_NOT_ALLOWED'},405);
 const authorization=req.headers.get('Authorization')??'';
 if(!authorization.startsWith('Bearer '))return json({error:'UNAUTHORIZED'},401);
 const admin=createClient(required('SUPABASE_URL'),required('SUPABASE_SERVICE_ROLE_KEY'));
 const {data:{user},error:authError}=await admin.auth.getUser(authorization.slice(7));
 if(authError||!user)return json({error:'UNAUTHORIZED'},401);
 try{
 const raw=await req.text(); if(raw.length>24000)return json({error:'TOO_LARGE'},413);
 const {store,productId,transactionId,purchaseToken}=JSON.parse(raw);
 if(!['apple','google'].includes(store)||typeof productId!=='string'||productId.length>200)return json({error:'INVALID_REQUEST'},400);
 const {data:product,error}=await admin.from('store_products').select('kind').eq('store',store).eq('product_id',productId).eq('active',true).single();
 if(error||!product)return json({error:'PRODUCT_NOT_CONFIGURED'},409);
 // Disabled in the deployed environment until store credentials and lifecycle tests are ready.
 if(Deno.env.get('BILLING_ENABLED')!=='true')return json({error:'BILLING_NOT_CONFIGURED'},503);
 let expires:string|null=null,revoked=false,identity:string;
 if(store==='apple'){
   if(typeof transactionId!=='string'||!/^\d{1,40}$/.test(transactionId))return json({error:'INVALID_TRANSACTION'},400);
   const environment=required('APPLE_ENVIRONMENT');
   if(!['Production','Sandbox'].includes(environment))throw new Error('BILLING_NOT_CONFIGURED');
   const bundle=required('APPLE_BUNDLE_ID');
   const key=await importPKCS8(required('APPLE_PRIVATE_KEY').replace(/\\n/g,'\n'),'ES256');
   const token=await new SignJWT({bid:bundle}).setProtectedHeader({alg:'ES256',kid:required('APPLE_KEY_ID'),typ:'JWT'}).setIssuer(required('APPLE_ISSUER_ID')).setAudience('appstoreconnect-v1').setIssuedAt().setExpirationTime('5m').sign(key);
   const host=environment==='Production'?'api.storekit.itunes.apple.com':'api.storekit-sandbox.itunes.apple.com';
   const result=await request('https://'+host+'/inApps/v1/transactions/'+enc(transactionId),{headers:{Authorization:'Bearer '+token}});
   // Payload is obtained DIRECTLY from authenticated Apple API over TLS, never from a client JWS.
   const tx=decodeJwt(result.signedTransactionInfo);
   if(tx.bundleId!==bundle||tx.environment!==environment||tx.productId!==productId||tx.transactionId!==transactionId||tx.appAccountToken!==user.id)throw new Error('PURCHASE_IDENTITY_MISMATCH');
   if(product.kind==='subscription'&&tx.type!=='Auto-Renewable Subscription')throw new Error('PRODUCT_KIND_MISMATCH');
   if(product.kind==='non_consumable'&&tx.type!=='Non-Consumable')throw new Error('PRODUCT_KIND_MISMATCH');
   if(product.kind==='subscription'){
     if(typeof tx.expiresDate!=='number')throw new Error('INVALID_EXPIRY');
     expires=new Date(tx.expiresDate).toISOString();
   }
   revoked=!!tx.revocationDate;
   identity=transactionId;
 }else{
   if(typeof purchaseToken!=='string'||purchaseToken.length<8||purchaseToken.length>8192)return json({error:'INVALID_TOKEN'},400);
   const account=JSON.parse(required('GOOGLE_SERVICE_ACCOUNT_JSON'));
   const key=await importPKCS8(account.private_key,'RS256');
   const assertion=await new SignJWT({scope:'https://www.googleapis.com/auth/androidpublisher'}).setProtectedHeader({alg:'RS256'}).setIssuer(account.client_email).setAudience('https://oauth2.googleapis.com/token').setIssuedAt().setExpirationTime('5m').sign(key);
   const access=await request('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion})});
   const base='https://androidpublisher.googleapis.com/androidpublisher/v3/applications/'+enc(required('GOOGLE_PACKAGE_NAME'))+'/purchases/';
   const sub=product.kind==='subscription';
   const tx=await request(base+(sub?'subscriptionsv2/tokens/':'productsv2/tokens/')+enc(purchaseToken),{headers:{Authorization:'Bearer '+access.access_token}});
   if(sub){
     const item=tx.lineItems?.find((x:{productId:string})=>x.productId===productId);
     if(!item||tx.externalAccountIdentifiers?.obfuscatedExternalAccountId!==user.id)throw new Error('PURCHASE_IDENTITY_MISMATCH');
     if(tx.subscriptionState==='SUBSCRIPTION_STATE_PENDING')throw new Error('PURCHASE_PENDING');
     if(!item.expiryTime||!Number.isFinite(Date.parse(item.expiryTime)))throw new Error('INVALID_EXPIRY');
     expires=new Date(item.expiryTime).toISOString();
     revoked=!['SUBSCRIPTION_STATE_ACTIVE','SUBSCRIPTION_STATE_IN_GRACE_PERIOD','SUBSCRIPTION_STATE_CANCELED'].includes(tx.subscriptionState);
   }else{
     const item=tx.productLineItem?.find((x:{productId:string})=>x.productId===productId);
     if(!item||tx.obfuscatedExternalAccountId!==user.id)throw new Error('PURCHASE_IDENTITY_MISMATCH');
     if(tx.purchaseStateContext?.purchaseState==='PENDING')throw new Error('PURCHASE_PENDING');
     revoked=tx.purchaseStateContext?.purchaseState!=='PURCHASED'||item.productOfferDetails?.refundableQuantity===0;
   }
   const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(purchaseToken));
   identity=Array.from(new Uint8Array(digest),x=>x.toString(16).padStart(2,'0')).join('');
 }
 const {error:commitError}=await admin.rpc('commit_verified_purchase',{p_user:user.id,p_store:store,p_transaction:identity,p_product:productId,p_expires:expires,p_revoked:revoked});
 if(commitError)throw new Error('PURCHASE_COMMIT_FAILED');
 return json({verified:true,active:!revoked&&(!expires||Date.parse(expires)>Date.now()),expiresAt:expires});
 }catch(error){
 const message=error instanceof Error?error.message:'VERIFICATION_FAILED';
 const safe=new Set(['BILLING_NOT_CONFIGURED','STORE_VERIFICATION_FAILED','PURCHASE_IDENTITY_MISMATCH','PRODUCT_KIND_MISMATCH','PURCHASE_PENDING','INVALID_EXPIRY','PURCHASE_COMMIT_FAILED']);
 return json({error:safe.has(message)?message:'VERIFICATION_FAILED'},message==='BILLING_NOT_CONFIGURED'?503:400);
 }
});
