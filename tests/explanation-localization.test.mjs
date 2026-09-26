import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import React from 'react';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('all 60 original Effects panels and 138 standards illustrations have complete native text layers',()=>{
 for(const [file,count] of [['effectExplanationLabels',60],['artworkTextOverlays',138]]){
  const entries=JSON.parse(read('src/data/'+file+'.json'));assert.equal(Object.keys(entries).length,count);
  for(const [image,labels] of Object.entries(entries)){
   assert.ok(labels.length>0,image);
   for(const label of labels){
    for(const locale of ['ko','en','ja','zh']){assert.ok(label.text[locale]?.trim(),image+locale);if(locale!=='ko')assert.doesNotMatch(label.text[locale],/[가-힣]|TRIZSEG\d/);}
    for(const k of ['x','y','width','height','fontHeight'])assert.ok(Number.isFinite(label[k])&&label[k]>=0&&label[k]<=1,image+k);
    assert.ok(label.x+label.width<=1.001&&label.y+label.height<=1.001,image);
   }
  }
 }
});
test('all display sizes use localized explanations, not Korean bitmaps followed by translated summaries',()=>{
 const art=read('src/EffectArtwork.tsx');
 assert.match(art,/<EffectExplanation/);assert.doesNotMatch(art,/locale!=='ko'|rightMask\}>|if\(windowWidth<700\)/);
 const panel=read('src/EffectExplanation.tsx');assert.match(panel,/l.text\[locale\]/);assert.match(panel,/fitDiagramLabel/);assert.match(panel,/resizeMode="contain"/);assert.match(panel,/Math.max\(width\*2,800\)/);
 const detail=read('src/screens/Detail.tsx');assert.doesNotMatch(detail,/locale==='ko'/);assert.match(detail,/t\(x.title\)/);assert.match(detail,/t\(y\)/);assert.match(detail,/t\(sentence\)/);
});
test('locale hydration cannot overwrite an explicit language selection and lookup normalizes whitespace',()=>{
 const code=read('src/i18n.tsx');assert.match(code,/!chosen.current/);assert.match(code,/chosen.current=true;setLanguage\(l\)/);assert.match(code,/dictionary\[normalizeText\(s\)\]/);
});
test('all original explanation text layers actually render the selected language at mobile widths',()=>{
 let locale='en';
 let stateCall=0;
 const layout={};new Function('exports',ts.transpileModule(read('src/layout.ts'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(layout);
 const exports={};
 new Function('require','exports',ts.transpileModule(read('src/EffectExplanation.tsx'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText)(name=>{
  if(name==='react')return {...React,useState:initial=>{stateCall+=1;return [stateCall===2?true:initial,()=>{}];}};
  if(name==='react-native')return {Image:{resolveAssetSource:x=>x},View:'View',Text:'Text',Pressable:'Pressable',ScrollView:'ScrollView',Modal:'Modal'};
  if(name==='react-native-safe-area-context')return {SafeAreaView:'View'};
  if(name==='./i18n')return {useLanguage:()=>({locale})};
  if(name==='./ContentImage')return {__esModule:true,default:'Image'};
  if(name==='./layout')return layout;
  if(name==='./theme')return {colors:{lime:'#c5ff2c',ink:'#f1f5ef',bg:'#06100e'}};
  throw Error(name);
 },exports);
 const flatten=n=>!n||typeof n!=='object'?[]:[n,...React.Children.toArray(n.props?.children).flatMap(flatten)];
 const entries=JSON.parse(read('src/data/effectExplanationLabels.json'));
 for(locale of ['en','ja','zh'])for(const width of [320,390,430])for(const [image,labels] of Object.entries(entries)){
  stateCall=0;
  const nodes=flatten(exports.default({source:{width:1728,height:972},fallback:1,width,start:.667,labels}));
  const text=nodes.filter(n=>n.type==='Text').map(n=>n.props.children);
  for(const l of labels)assert.ok(text.includes(l.text[locale]),image+' '+locale);
  assert.doesNotMatch(text.join(' '),/[가-힣]/);
  assert.equal(nodes.filter(n=>n.type==='Image').length,1);
 }
});
