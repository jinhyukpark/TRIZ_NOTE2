import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import React from 'react';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..'),cache=new Map();
process.env.EXPO_PUBLIC_SUPABASE_URL='https://sovzalkrotgvnqvpfkjd.supabase.co';
let response={data:[],error:null};
function load(file){
 if(cache.has(file))return cache.get(file);
 const exports={};cache.set(file,exports);
 const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText;
 new Function('require','exports',code)(name=>{
  if(name==='react')return React;if(name==='react-native')return {};
  if(file.endsWith('/lib/effectContent.ts')&&name==='./supabase')return {supabase:{functions:{invoke:async name=>{assert.equal(name,'effects-content');return response;}}}};
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
const asset={uri:process.env.EXPO_PUBLIC_SUPABASE_URL+'/storage/v1/object/sign/effect-content/test.png?token=test',width:1122,height:1402};
function payload(item){return structuredClone({...item,featured:{...expansionFeatured[item.id],image:asset},artwork:{images:Array(5).fill(asset),tags:expansionArtwork[item.id].tags,callouts:expansionCallouts[item.id]},diagrams:item.steps.map((_,i)=>({shapes:diagramShapes(item.id,i),caption:null}))});}
test('all 17 complete server revisions validate; incomplete or foreign assets are rejected',()=>{
 for(const item of expansionEffects)assert.equal(validEffectPayload(payload(item)),true,item.id);
 const p=payload(expansionEffects[0]);p.artwork.images[0].uri='https://untrusted.invalid/image.png';assert.equal(validEffectPayload(p),false);
 const p2=payload(expansionEffects[0]);delete p2.steps[2].body.ja;assert.equal(validEffectPayload(p2),false);
 const p3=payload(expansionEffects[0]);p3.artwork.callouts[0]=[];assert.equal(validEffectPayload(p3),false);
});
test('unsigned, incomplete, expired and offline responses fail closed',async()=>{
 response={data:{rows:[],expiresAt:Date.now()+10000},error:null};await assert.rejects(refreshEffectContent(),/INVALID_CONTENT_LEASE/);
 response={data:[],error:new Error('offline')};await assert.rejects(refreshEffectContent(),/offline/);
});
test('all 31 published payloads connect 155 apparatus images and preserve 60 legacy explanation panels',async()=>{
 const rows=JSON.parse(execFileSync(process.execPath,['scripts/publish-effects.mjs','--manifest'],{cwd:root,encoding:'utf8',maxBuffer:20*1024*1024}));
 assert.equal(rows.length,31);
 const legacy=rows.filter(r=>r.payload.renderer==='legacy');
 assert.equal(legacy.length,12);
 for(const row of rows)assert.equal(validEffectPayload(row.payload),true,row.id);
 const sign=v=>{if(!v||typeof v!=='object')return;if(v.uri)v.uri=v.uri.replace('/authenticated/','/sign/')+'?token=test';for(const child of Object.values(v))sign(child);};sign(rows);
 response={data:{rows,expiresAt:Date.now()+200000},error:null};assert.equal((await refreshEffectContent()).count,31);
 const remote=data('data/legacyEffectArtwork.ts').remoteLegacyArtwork;
 for(const {id,payload:p} of legacy){
  assert.deepEqual(remote[id].portraits,p.artwork.portraits);
  assert.equal(remote[id].panels.length,5);
  assert.equal(remote[id].portraits[0].uri,p.artwork.portraits[0].uri,'01 is ready without a stage press');
  assert.equal(typeof localEffectImages[id].images[0],'string');
  assert.equal(data('data/scientificArtwork.ts').scientificArtwork[id],undefined,'do not replace original diagrams with generic science diagrams');
 }
 const invalid=structuredClone(legacy[0].payload);invalid.artwork.panels.pop();assert.equal(validEffectPayload(invalid),false);
 const foreign=structuredClone(legacy[0].payload);foreign.artwork.portraits[0].uri='https://untrusted.invalid/a.png';assert.equal(validEffectPayload(foreign),false);
 response={data:{rows,expiresAt:Date.now()-1},error:null};await assert.rejects(refreshEffectContent(),/INVALID_CONTENT_LEASE/);
 const unsigned=structuredClone(rows);unsigned[0].payload.featured.image.uri=unsigned[0].payload.featured.image.uri.replace('/sign/','/authenticated/');
 response={data:{rows:unsigned,expiresAt:Date.now()+100000},error:null};await assert.rejects(refreshEffectContent(),/UNSIGNED_IMAGE/);
 data('lib/effectContent.ts').clearEffectAccess();assert.equal(Object.keys(remote).length,0);
});
