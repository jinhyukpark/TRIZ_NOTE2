import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const exports={};
new Function('exports',ts.transpileModule(fs.readFileSync(new URL('../src/lib/detailAccess.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(exports);
test('detail entry allows paid users and blocks unpaid and lookup errors',async()=>{
 for(const [result,expected] of [[true,['open']],[false,[false]],['error',[true]]]){
  const calls=[];await exports.checkDetailAccess(async()=>{if(result==='error')throw Error();return result;},()=>calls.push('open'),error=>calls.push(error),()=>true);assert.deepEqual(calls,expected);
 }
});
test('obsolete entitlement checks cannot open details or show stale alerts',async()=>{
 for(const active of [true,false]){let resolve;const calls=[];const pending=exports.checkDetailAccess(()=>new Promise(r=>resolve=r),()=>calls.push('open'),()=>calls.push('alert'),()=>false);resolve(active);await pending;assert.deepEqual(calls,[]);}
});
test('all detail routes use the shared guard without gating menus or exempting principle 1',()=>{
 const app=fs.readFileSync(new URL('../App.tsx',import.meta.url),'utf8');
 assert.equal((app.match(/onOpen=\{openDetail\}/g)||[]).length,3);
 for(const text of ['onCollection={openCollection}','onSelect={openEffect}','onNext={()=>openDetail(detail%40+1)}','checkDetailAccess(subscription.refresh','onPress:()=>navigate(\'store\')'])assert.ok(app.includes(text),text);
 assert.doesNotMatch(app,/detail!==1|billingEnabled/);
 const effects=fs.readFileSync(new URL('../src/screens/Effects.tsx',import.meta.url),'utf8');
 assert.match(effects,/if\(!canAccess\)\{setLeaseUntil\(0\);clearEffectAccess\(\);return;\}/);
 assert.match(effects,/if\(item&&canAccess\)/);assert.match(effects,/<EffectFeatured id=\{item\.id\}/);assert.doesNotMatch(effects,/구독 후 이미지 보기|canAccess\?<EffectFeatured/);
 for(const lang of ['ko','en','ja','zh'])for(const key of ['title','message','cancel','subscribe','error'])assert.ok(exports.detailAccessCopy[lang][key]);
});
