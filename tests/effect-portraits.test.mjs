import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';

const root=new URL('../',import.meta.url);
const source=fs.readFileSync(new URL('src/data/remainingEffectPortraits.ts',root),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const module={exports:{}};
new Function('exports','require',js)(module.exports,path=>path);
const configs=module.exports.remainingEffectPortraits;

test('all 45 stages render a contained mobile image, original diagram and translated tags',async()=>{
 const {createRequire}=await import('node:module');
 const {fileURLToPath}=await import('node:url');
 const nodeRequire=createRequire(import.meta.url);
 const React=nodeRequire('react');
 let width=390,locale='ko';
 let stateCall=0;
 const Image=Object.assign(function Image(){},{resolveAssetSource(path){
  const png=fs.readFileSync(path);
  return {width:png.readUInt32BE(16),height:png.readUInt32BE(20)};
 }});
 const rn={Image,Modal:'Modal',Pressable:'Pressable',ScrollView:'ScrollView',StyleSheet:{create:s=>s},Text:'Text',View:'View',useWindowDimensions:()=>({width})};
 const cache=new Map();
 function load(url){
  if(cache.has(url.href))return cache.get(url.href);
  const exports={};
  cache.set(url.href,exports);
  const compiled=ts.transpileModule(fs.readFileSync(url,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText;
  new Function('require','exports',compiled)(specifier=>{
   if(specifier==='react')return {...React,useState:initial=>{stateCall+=1;return [stateCall===1||stateCall===4?true:initial,()=>{}];},useEffect:()=>{}};
   if(specifier==='react-native-safe-area-context')return {SafeAreaView:'View'};
   if(specifier.endsWith('.json'))return JSON.parse(fs.readFileSync(new URL(specifier,url),'utf8'));
   if(specifier==='react-native')return rn;
   if(specifier==='./i18n')return {useLanguage:()=>({locale})};
   if(specifier==='./theme')return {colors:{lime:'#c5ff2c',line:'#30423d'}};
   if(specifier==='./data/assets')return {assets:new Proxy({}, {get:(_,key)=>fileURLToPath(new URL('assets/content/'+key.replace('/assets/',''),root))})};
   if(specifier.endsWith('.png'))return fileURLToPath(new URL(specifier,url));
   const dependency=new URL(specifier+'.ts',url);
   return load(fs.existsSync(dependency)?dependency:new URL(specifier+'.tsx',url));
  },exports);
  return exports;
 }
 const {effects}=load(new URL('src/data/effects.ts',root));
 const render=load(new URL('src/EffectArtwork.tsx',root)).default;
 const flatten=node=>{
  if(!node||typeof node!=='object'||node.props?.visible===false)return [];
  if(typeof node.type==='function'&&node.type!==Image)return flatten(node.type(node.props));
  return [node,...React.Children.toArray(node.props?.children).flatMap(flatten)];
 };
 for(width of [320,390,430])for(locale of ['ko','en','ja','zh']){
  for(const item of effects.filter(e=>configs[e.id])){
   for(const [index,step] of item.steps.entries()){
    stateCall=0;
    const nodes=flatten(render({item,step,index}));
    const images=nodes.filter(n=>n.type===Image);
    assert.equal(images.length,2,item.id);
    const hero=images[0].props,diagram=images[1].props;
    assert.equal(hero.resizeMode,'contain');
    assert.equal(hero.style.width,width);
    const size=Image.resolveAssetSource(hero.source);
    assert.equal(hero.style.height,width*size.height/size.width);
    assert.ok(diagram.source.endsWith(step.image.split('/').at(-1).replace('.png','-clean-v2.png')));
    const copy=nodes.filter(n=>n.type==='Text').flatMap(n=>React.Children.toArray(n.props.children)).join(' ');
    const config=configs[item.id];
    for(const label of config.labelsByStage?.[index]??config.labels)assert.ok(copy.includes(label.text[locale]),item.id+' '+locale);
   }
  }
 }
});


test('remaining nine Effects have five genuine portrait assets each',()=>{
 assert.equal(Object.keys(configs).length,9);
 for(const [id,config] of Object.entries(configs)){
  assert.equal(config.portraits.length,5,id);
  for(const path of config.portraits){
   const png=fs.readFileSync(new URL(path.replace('../../',''),root));
   assert.equal(png.subarray(1,4).toString(),'PNG');
   const width=png.readUInt32BE(16),height=png.readUInt32BE(20);
   assert.ok(height>width,path+' must not contain the landscape source poster');
   assert.ok(Math.abs(width/height-.8)<.02,path+' must be mobile 4:5');
  }
 }
});
test('equipment labels support all four locales and remain within portrait bounds',()=>{
 for(const [id,config] of Object.entries(configs)){
  for(const labels of [config.labels,...(config.labelsByStage??[])]){
   assert.ok(labels.length>=3,id);
   assert.equal(new Set(labels.map(l=>l.number)).size,labels.length);
   for(const label of labels){
    for(const locale of ['ko','en','ja','zh'])assert.ok(label.text[locale]?.trim(),id+locale);
    assert.ok(parseFloat(label.x)>=0&&parseFloat(label.x)<=72,id+' label x');
    assert.ok(parseFloat(label.y)>=18&&parseFloat(label.y)<=90,id+' label y');
   }
  }
  assert.ok(config.explanationStart>.66&&config.explanationStart<.7);
 }
});
test('mobile layout keeps original explanation artwork and explicit contain dimensions',()=>{
 const artwork=fs.readFileSync(new URL('src/EffectArtwork.tsx',root),'utf8');
 assert.match(artwork,/remoteLegacyArtwork\[item.id\] \?\? legacyEffectArtwork\[item.id\]/);
 assert.match(artwork,/source=\{portrait\} fallback=\{legacyEffectArtwork\[item.id\].portraits\[index\]\} resizeMode="contain" style=\{\{width:portraitWidth,height:portraitHeight\}\}/);
 assert.match(artwork,/portraitWidth\*portraitSize.height\/portraitSize.width/);
 assert.match(artwork,/<EffectExplanation source=\{source\} fallback=\{bundledSource\}/);
 assert.match(artwork,/label.text\[locale\]/);
});
