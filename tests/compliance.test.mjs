import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
async function module(p){const code=ts.transpileModule(read(p),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;return import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));}
const {annualPlan}=await module('src/lib/annualPlan.ts');
const {isEntitled}=await module('src/lib/entitlement.ts');
test('only a one-year auto-renewing plan is sold with its matching store price',()=>{
 const ios={id:'annual',type:'subs',platform:'ios',typeIOS:'auto-renewable-subscription',subscriptionPeriodUnitIOS:'year',subscriptionPeriodNumberIOS:'1',displayPrice:'$5.00'};
 assert.equal(annualPlan(ios,'annual','')?.price,'$5.00');
 for(const change of [{id:'other'},{subscriptionPeriodUnitIOS:'month'},{subscriptionPeriodNumberIOS:'2'},{introductoryPriceNumberOfPeriodsIOS:'1'},{typeIOS:'non-renewing-subscription'}])assert.equal(annualPlan({...ios,...change},'annual',''),null);
 const phase={billingPeriod:'P1Y',recurrenceMode:1,formattedPrice:'₩7,000'};
 const offer={basePlanIdAndroid:'yearly',offerTokenAndroid:'correct-token',pricingPhasesAndroid:{pricingPhaseList:[phase]}};
 const android={id:'annual',type:'subs',platform:'android',displayPrice:'WRONG-GENERIC-PRICE',subscriptionOffers:[{...offer,basePlanIdAndroid:'monthly'},offer]};
 assert.deepEqual(annualPlan(android,'annual','yearly'),{price:'₩7,000',token:'correct-token'});
 assert.equal(annualPlan(android,'annual','missing'),null);
 assert.equal(annualPlan({...android,subscriptionOffers:[{...offer,pricingPhasesAndroid:{pricingPhaseList:[phase,phase]}}]},'annual','yearly'),null);
});
test('expired, unverified or invalid entitlement cannot unlock annual access',()=>{
 const now=Date.parse('2026-09-22');
 assert.equal(isEntitled({active:true,expires_at:'2027-09-22'},now),true);
 for(const row of [null,{active:false,expires_at:'2027-09-22'},{active:true,expires_at:null},{active:true,expires_at:'invalid'},{active:true,expires_at:'2026-09-22'}])assert.equal(isEntitled(row,now),false);
});
test('compliance copy has all four languages',async()=>{
 const {complianceCopy}=await module('src/locales/compliance.ts');
 for(const row of Object.values(complianceCopy))for(const locale of ['ko','en','ja','zh'])assert.ok(row[locale]?.trim());
});
function deletionHarness({authenticated=true,passwordOk=true,apple=false,appleSubject='apple-owner'}={}){
 let handler;const events=[];
 const user={id:'verified-owner',email:'owner@example.com',identities:apple?[{id:'apple-owner',provider:'apple'}]:[]};
 const admin={auth:{getUser:async()=>({data:{user:authenticated?user:null},error:null}),admin:{signOut:async()=>{events.push('signOut');return {error:null};},deleteUser:async id=>{events.push('delete:'+id);return {error:null};}}}};
 const auth={auth:{signInWithPassword:async input=>({error:passwordOk?null:Error(),data:{user:input.email===user.email?user:null}}),signOut:async()=>({error:null})}};
 class SignJWT{setProtectedHeader(){return this;}setIssuer(){return this;}setSubject(){return this;}setAudience(){return this;}setIssuedAt(){return this;}setExpirationTime(){return this;}async sign(){return 'test-secret';}}
 const context={Deno:{env:{get:name=>name==='SUPABASE_SERVICE_ROLE_KEY'?'service':'configured'},serve:f=>{handler=f;}},createClient:(_url,key)=>key==='service'?admin:auth,SignJWT,importPKCS8:async()=>({}),createRemoteJWKSet:()=>({}),jwtVerify:async()=>({payload:{sub:appleSubject}}),fetch:async url=>{events.push(url.endsWith('/revoke')?'revoke':'exchange');return Response.json({id_token:'test-id',refresh_token:'test-refresh'});},Response,Request,URL,URLSearchParams,AbortSignal};
 const code=ts.transpileModule(read('supabase/functions/delete-account/index.ts').replace(/^import .*;\n/gm,''),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.None}}).outputText;
 vm.runInNewContext(code,context);
 return {events,call:body=>handler(new Request('https://example.com/delete',{method:'POST',headers:{Authorization:'Bearer test'},body:JSON.stringify(body)}))};
}
test('account deletion authenticates, confirms and reauthenticates before deleting only the caller',async()=>{
 for(const options of [{authenticated:false},{passwordOk:false}]){const h=deletionHarness(options);assert.equal((await h.call({confirmation:'DELETE_MY_ACCOUNT',password:'test'})).status,401);assert.deepEqual(h.events,[]);}
 const h=deletionHarness();assert.equal((await h.call({password:'test'})).status,400);assert.deepEqual(h.events,[]);
 assert.equal((await h.call({confirmation:'DELETE_MY_ACCOUNT',password:'test',userId:'victim'})).status,200);
 assert.deepEqual(h.events,['signOut','delete:verified-owner']);
});
test('Apple deletion rejects another identity and revokes Apple before deleting the owner',async()=>{
 const wrong=deletionHarness({apple:true,appleSubject:'other'});assert.equal((await wrong.call({confirmation:'DELETE_MY_ACCOUNT',appleCode:'code'})).status,403);assert.deepEqual(wrong.events,['exchange']);
 const good=deletionHarness({apple:true});assert.equal((await good.call({confirmation:'DELETE_MY_ACCOUNT',appleCode:'code'})).status,200);assert.deepEqual(good.events,['exchange','revoke','signOut','delete:verified-owner']);
});
