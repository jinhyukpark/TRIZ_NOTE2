import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
const root=new URL('../',import.meta.url),require=createRequire(import.meta.url),React=require('react');
let width=320,locale='ko';
const Image=Object.assign(function Image(){},{resolveAssetSource(path){const b=fs.readFileSync(path);return {width:b.readUInt32BE(16),height:b.readUInt32BE(20)};}});
const cache=new Map();
function load(url){
 if(cache.has(url.href))return cache.get(url.href);
 const exports={};cache.set(url.href,exports);
 const code=ts.transpileModule(fs.readFileSync(url,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText;
 new Function('require','exports',code)(name=>{
  if(name==='react')return React;
  if(name==='react-native')return {Image,Text:'Text',View:'View',StyleSheet:{create:s=>s},useWindowDimensions:()=>({width})};
  if(name==='./i18n')return {useLanguage:()=>({locale})};
  if(name.endsWith('.png'))return fileURLToPath(new URL(name,url));
  const p=new URL(name+'.ts',url);return load(fs.existsSync(p)?p:new URL(name+'.tsx',url));
 },exports);return exports;
}
const {scientificEffects:items}=load(new URL('src/data/scientificEffects.ts',root));
const {scientificArtwork:configs,scienceUi}=load(new URL('src/data/scientificArtwork.ts',root));
const render=load(new URL('src/ScientificEffectArtwork.tsx',root)).default;
const {featuredEffects}=load(new URL('src/data/featuredEffects.ts',root));
const renderFeatured=load(new URL('src/EffectFeatured.tsx',root)).default;
const {expansionEffects:expansion,expansionDrafts,xtext}=load(new URL('src/data/expansionEffects.ts',root));
const {diagramShapes}=load(new URL('src/ExpansionDiagram.tsx',root));
function flatten(node){
 if(!node||typeof node!=='object')return [];
 if(typeof node.type==='function'&&node.type!==Image)return flatten(node.type(node.props));
 return [node,...React.Children.toArray(node.props?.children).flatMap(flatten)];
}
test('17 video-based Effects have 85 distinct portrait assets and complete native localized content',()=>{
 assert.equal(expansion.length,17);
 assert.equal(new Set(expansionDrafts.map(d=>d.video)).size,17);
 assert.throws(()=>xtext('one|two'));
 const hashes=new Set();
 for(const item of expansion){
  assert.equal(item.steps.length,5);
  assert.equal(configs[item.id].images.length,5);
  for(const image of configs[item.id].images){
   const data=fs.readFileSync(image);hashes.add(require('node:crypto').createHash('sha256').update(data).digest('hex'));
   const size=Image.resolveAssetSource(image);assert.ok(Math.abs(size.width/size.height-.8)<.02,image);
  }
  assert.ok(!configs[item.id].images.includes(featuredEffects[item.id].image));
  for(const field of [item.title,item.summary,...item.steps.flatMap(s=>[s.label,s.title,s.body,s.keyPoint]),...configs[item.id].tags.flat().flatMap(t=>[t.name,t.role])]){
   for(const language of ['ko','en','ja','zh'])assert.ok(field[language]?.trim(),item.id+' '+language);
  }
 }
 assert.equal(hashes.size,85);
});
test('all 85 explanations render native diagrams and translations at 320 and 390pt',()=>{
 for(width of [320,390])for(locale of ['ko','en','ja','zh'])for(const item of expansion)for(const [index,step] of item.steps.entries()){
  const nodes=flatten(render({item,step,index}));
  assert.equal(nodes.filter(n=>n.props.testID==='science-timeline').length,1);
  assert.equal(nodes.filter(n=>n.props.testID===`expansion-diagram-${item.id}-${index}`).length,1);
  const text=nodes.filter(n=>n.type==='Text').flatMap(n=>React.Children.toArray(n.props.children)).join(' ');
  for(const field of [item.title,step.title,step.body,step.keyPoint])assert.ok(text.includes(field[locale]));
  const shapes=diagramShapes(item.id,index);assert.ok(shapes.length>=3,item.id+' '+index);
  for(const shape of shapes)for(const key of ['x','y','x2','y2','w','h','r'])if(shape[key]!==undefined)assert.ok(Number.isFinite(shape[key]));
 }
});
test('new descriptions preserve scientific distinctions rather than universal flow cards',()=>{
 const get=id=>expansion.find(e=>e.id===id);
 assert.match(get('creaming').steps[3].body.en,/coalescence/);
 assert.match(get('bingham-plastic').steps[4].body.en,/elastic/);
 assert.match(get('photoionisation').steps[2].body.en,/Single-photon/);
 assert.match(get('activated-carbon').steps[4].body.en,/concentration/);
 assert.equal(new Set(expansion.map(e=>JSON.stringify(diagramShapes(e.id,3)))).size,17);
});
test('two new Effects have five distinct, versioned, 4:5 portraits and complete translations',()=>{
 assert.deepEqual(items.map(i=>i.id),['skin-depth','hydrogenation']);
 for(const item of items){
  assert.equal(item.steps.length,5);assert.equal(configs[item.id].images.length,5);
  const hashes=new Set();
  for(const source of configs[item.id].images){
   const data=fs.readFileSync(source);hashes.add(require('node:crypto').createHash('sha256').update(data).digest('hex'));
   const size=Image.resolveAssetSource(source);assert.ok(Math.abs(size.width/size.height-.8)<.02,source);
  }
  assert.equal(hashes.size,5);
  for(const translations of [item.title,item.summary,...item.steps.flatMap(s=>[s.title,s.label,s.body,s.keyPoint]),...configs[item.id].tags.flatMap(tags=>tags.flatMap(t=>[t.name,t.role]))])for(const language of ['ko','en','ja','zh'])assert.ok(translations[language]?.trim());
 }
 for(const translations of Object.values(scienceUi))for(const language of ['ko','en','ja','zh'])assert.ok(translations[language]?.trim());
});
test('all ten steps render at small and normal widths in four locales without crop or duplicate timeline',()=>{
 for(width of [320,390,430,768])for(locale of ['ko','en','ja','zh'])for(const item of items)for(const [index,step] of item.steps.entries()){
  const tree=render({item,step,index}),nodes=flatten(tree),hero=nodes.find(n=>n.type===Image).props;
  const expected=Math.min(width,640),size=Image.resolveAssetSource(hero.source);
  assert.equal(tree.props.style.width,expected);
  assert.equal(hero.resizeMode,'contain');assert.equal(hero.style.width,expected);assert.equal(hero.style.height,expected*size.height/size.width);
  assert.equal(nodes.filter(n=>n.type===Image).length,1);
  assert.equal(nodes.filter(n=>n.props.testID==='science-timeline').length,1);
  assert.ok(nodes.some(n=>n.props.testID===`diagram-${item.id}-${index}`));
  const text=nodes.filter(n=>n.type==='Text').flatMap(n=>React.Children.toArray(n.props.children)).join(' ');
  for(const field of [item.title,step.title,step.body,step.keyPoint,...configs[item.id].tags[index].flatMap(t=>[t.name,t.role])])assert.ok(text.includes(field[locale]),item.id+' '+index+' '+locale);
  for(const tag of configs[item.id].tags[index]){assert.ok(tag.x>=0&&tag.x+33<=100);assert.ok(tag.y>=20&&tag.y<90);}
 }
});
test('physics and chemistry keep the distinguishing scientific content',()=>{
 const depth=items[0],hydrogen=items[1];
 assert.match(depth.steps[2].body.en,/36.8%/);assert.match(depth.steps[2].body.en,/13.5%/);
 assert.match(depth.steps[4].body.en,/1\/√\(πfμσ\)/);
 assert.match(hydrogen.steps[0].keyPoint.en,/C₂H₄ \+ H₂ → C₂H₆/);
 assert.match(hydrogen.steps[4].body.en,/deactivation/);
});
test('all featured assets are landscape with localized equipment labels',()=>{
 for(const [id,entry] of Object.entries(featuredEffects)){
  const size=Image.resolveAssetSource(entry.image);
  assert.ok(Math.abs(size.width/size.height-16/9)<.02,id);
  assert.ok(entry.labels.length>0,id);
  for(const label of entry.labels){
   assert.ok(label.x>=0&&label.x+label.width<=100,id);
   assert.ok(label.y>=0&&label.y+9<=100,id);
   for(const language of ['ko','en','ja','zh'])assert.ok(label.text[language]?.trim(),id);
  }
  for(locale of ['ko','en','ja','zh']){
   const tree=renderFeatured({id,title:id}),nodes=flatten(tree);
   assert.equal(tree.props.style.aspectRatio,16/9);
   assert.equal(nodes.find(n=>n.type===Image).props.resizeMode,'contain');
   const targets=entry.labels.filter(l=>l.target);
   assert.equal(nodes.filter(n=>n.props.testID==='callout-leader').length,targets.length);
   assert.equal(nodes.filter(n=>n.props.testID==='callout-point').length,targets.length);
   for(const {target} of targets){
    assert.ok(target.x>0&&target.x<100&&target.y>0&&target.y<100);
   }
   const text=nodes.filter(n=>n.type==='Text').flatMap(n=>React.Children.toArray(n.props.children)).join(' ');
   for(const label of entry.labels)assert.ok(text.includes(label.text[locale]),id+' '+locale);
  }
 }
 for(const id of ['skin-depth','hydrogenation'])assert.ok(!configs[id].images.includes(featuredEffects[id].image));
});
