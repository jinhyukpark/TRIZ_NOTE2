import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const exports={};
new Function('exports',ts.transpileModule(fs.readFileSync(new URL('../supabase/functions/effects-content/handler.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(exports);
const base='https://sovzalkrotgvnqvpfkjd.supabase.co',now=1700000000000;
function fixture({user={id:'paid-user'},access={active:true,expires_at:new Date(now+600000).toISOString(),verified_at:new Date(now).toISOString()},path='private-v1/test.png',failure=false}={}){
 let signs=0,ttl,owner;
 const rows=[{id:'sample',schema_version:1,payload:{featured:{image:{uri:base+'/storage/v1/object/authenticated/effect-content/'+path,width:10,height:10,sha256:'hash'}}}}];
 const admin={auth:{getUser:async()=>({data:{user},error:null})},from:table=>({select:()=>{
  if(table==='effect_content')return {eq:async()=>({data:rows,error:null})};
  const chain={eq:(k,v)=>{if(k==='user_id')owner=v;return chain;},maybeSingle:async()=>({data:access,error:null})};return chain;
 }}),storage:{from:bucket=>{assert.equal(bucket,'effect-content');return {createSignedUrls:async(paths,seconds)=>{signs++;ttl=seconds;return {data:paths.map(path=>({path,signedUrl:base+'/storage/v1/object/sign/effect-content/'+path+'?token=test'})),error:failure?new Error('failed'):null};}};}}};
 return {run:authorization=>exports.createHandler(admin,base,()=>now)(new Request(base,{method:'POST',headers:authorization?{Authorization:authorization}:{}})),state:()=>({signs,ttl,owner})};
}
test('private Effects refuses missing, anonymous, nonpaying, expired and revoked access before signing',async()=>{
 for(const setup of [{user:null},{user:{id:'guest',is_anonymous:true}},{access:null},{access:{active:false,expires_at:new Date(now+60000).toISOString(),verified_at:'yes'}},{access:{active:true,expires_at:new Date(now-1).toISOString(),verified_at:'yes'}},{access:{active:true,expires_at:null,verified_at:'yes'}},{access:{active:true,expires_at:new Date(now+60000).toISOString(),verified_at:null}}]){
  const f=fixture(setup),r=await f.run('Bearer test');assert.ok([401,403].includes(r.status));assert.equal(f.state().signs,0);
 }
 const f=fixture();assert.equal((await f.run()).status,401);assert.equal(f.state().signs,0);
});
test('paid access signs only database paths, limits lease to subscription expiry and disables response caching',async()=>{
 const f=fixture({access:{active:true,expires_at:new Date(now+45000).toISOString(),verified_at:'yes'}}),r=await f.run('Bearer test'),body=await r.json();
 assert.equal(r.status,200);assert.equal(r.headers.get('Cache-Control'),'no-store');assert.deepEqual(f.state(),{signs:1,ttl:45,owner:'paid-user'});
 assert.equal(body.expiresAt,now+45000);assert.match(body.rows[0].payload.featured.image.uri,/\/sign\/effect-content\/.+\?token=/);
 const full=fixture();await full.run('Bearer test');assert.equal(full.state().ttl,300);
});
test('server-controlled premium override grants a short private-content lease without a store subscription',async()=>{
 const f=fixture({user:{id:'admin-user',app_metadata:{premium_override:true}},access:null}),r=await f.run('Bearer test'),body=await r.json();
 assert.equal(r.status,200);assert.equal(body.expiresAt,now+300000);assert.deepEqual(f.state(),{signs:1,ttl:300,owner:undefined});
});
test('signing errors and traversal paths fail closed',async()=>{
 assert.equal((await fixture({failure:true}).run('Bearer test')).status,503);
 const f=fixture({path:'../another-bucket/secret.png'});assert.equal((await f.run('Bearer test')).status,503);assert.equal(f.state().signs,0);
});
test('paid Effects gate is independent of checkout flag and release resolver excludes premium bitmaps',()=>{
 const app=fs.readFileSync(new URL('../App.tsx',import.meta.url),'utf8');assert.match(app,/const gated=detail!==null\|\|collection!==null\|\|effect!==null/);assert.match(app,/canAccess=\{subscription.active\}/);assert.doesNotMatch(app,/billingEnabled/);
 const metro=fs.readFileSync(new URL('../metro.config.js',import.meta.url),'utf8');assert.match(metro,/\/assets\/content\/effects\//);assert.match(metro,/!p\.includes\('\/assets\/content\/effects\/featured\/'\)/);assert.match(metro,/privateEffectPlaceholder.js/);
 const migration=fs.readFileSync(new URL('../supabase/migrations/20260924152526_private_paid_effects.sql',import.meta.url),'utf8');assert.match(migration,/revoke all on public.effect_content from anon, authenticated/);
});
