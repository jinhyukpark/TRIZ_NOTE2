import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import React from 'react';
const root=path.resolve(import.meta.dirname,'..'),cache=new Map();
process.env.EXPO_PUBLIC_SUPABASE_URL='https://sovzalkrotgvnqvpfkjd.supabase.co';
let response={data:[],error:null};
function load(file){
 if(cache.has(file))return cache.get(file);
 const exports={};cache.set(file,exports);
 const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText;
 new Function('require','exports',code)(name=>{
  if(name==='react')return React;if(name==='react-native')return {};
  if(file.endsWith('/lib/effectContent.ts')&&name==='./supabase')return {supabase:{from:table=>{assert.equal(table,'effect_content');return {select:()=>({eq:()=>({abortSignal:async()=>response})})};}}};
  const p=path.resolve(path.dirname(file),name);if(name.endsWith('.png'))return p;
  return load(fs.existsSync(p+'.ts')?p+'.ts':p+'.tsx');
 },exports);return exports;
}
const data=f=>load(path.join(root,'src',f));
const {expansionEffects}=data('data/expansionEffects.ts');
const {expansionArtwork,expansionFeatured,expansionCallouts}=data('data/expansionArtwork.ts');
const {diagramShapes}=data('ExpansionDiagram.tsx');
const {validEffectPayload,refreshEffectContent}=data('lib/effectContent.ts');
const {effects}=data('data/effects.ts');
const {localEffectImages}=data('data/localEffectImages.ts');
const asset={uri:process.env.EXPO_PUBLIC_SUPABASE_URL+'/storage/v1/object/public/effect-content/test.png',width:1122,height:1402};
function payload(item){return structuredClone({...item,featured:{...expansionFeatured[item.id],image:asset},artwork:{images:Array(5).fill(asset),tags:expansionArtwork[item.id].tags,callouts:expansionCallouts[item.id]},diagrams:item.steps.map((_,i)=>({shapes:diagramShapes(item.id,i),caption:null}))});}
test('all 17 complete server revisions validate; incomplete or foreign assets are rejected',()=>{
 for(const item of expansionEffects)assert.equal(validEffectPayload(payload(item)),true,item.id);
 const p=payload(expansionEffects[0]);p.artwork.images[0].uri='https://untrusted.invalid/image.png';assert.equal(validEffectPayload(p),false);
 const p2=payload(expansionEffects[0]);delete p2.steps[2].body.ja;assert.equal(validEffectPayload(p2),false);
 const p3=payload(expansionEffects[0]);p3.artwork.callouts[0]=[];assert.equal(validEffectPayload(p3),false);
});
test('server refresh updates text, images, tags and diagrams without losing local image fallback',async()=>{
 const p=payload(expansionEffects[0]),fallback=localEffectImages[p.id].images[0];p.summary.ko='서버에서 수정한 설명';
 response={data:[{id:p.id,schema_version:1,payload:p}],error:null};assert.equal(await refreshEffectContent(),1);
 assert.equal(effects.find(e=>e.id===p.id).summary.ko,p.summary.ko);
 assert.equal(data('data/scientificArtwork.ts').scientificArtwork[p.id].images[0].uri,asset.uri);
 assert.equal(data('data/remoteEffectDiagrams.ts').remoteEffectDiagrams[p.id].length,5);
 assert.equal(localEffectImages[p.id].images[0],fallback);
 response={data:[],error:new Error('offline')};await assert.rejects(refreshEffectContent(),/offline/);
 assert.equal(effects.find(e=>e.id===p.id).summary.ko,p.summary.ko);
});
