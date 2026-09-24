import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
const root=new URL('../',import.meta.url),require=createRequire(import.meta.url),React=require('react');
let width=390,locale='ko';
const Image=Object.assign(function Image(){},{resolveAssetSource(path){const b=fs.readFileSync(path);return {width:b.readUInt32BE(16),height:b.readUInt32BE(20)};}});
const cache=new Map();
function load(url){
 if(cache.has(url.href))return cache.get(url.href);
 const exports={};cache.set(url.href,exports);
 const code=ts.transpileModule(fs.readFileSync(url,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText;
 new Function('require','exports',code)(name=>{
  if(name==='react')return React;
  if(name==='react-native')return {Image,Text:'Text',View:'View',StyleSheet:{create:s=>s,absoluteFill:{position:'absolute',top:0,bottom:0,left:0,right:0}},useWindowDimensions:()=>({width})};
  if(name==='./i18n')return {useLanguage:()=>({locale})};
  if(name==='./theme')return {colors:{lime:'#c5ff2c',line:'#30423d'}};
  if(name==='./data/assets')return {assets:new Proxy({}, {get:(_,key)=>fileURLToPath(new URL('assets/content/'+key.replace('/assets/',''),root))})};
  if(name.endsWith('.png'))return fileURLToPath(new URL(name,url));
  const p=new URL(name+'.ts',url);return load(fs.existsSync(p)?p:new URL(name+'.tsx',url));
 },exports);return exports;
}
function flatten(node){
 if(!node||typeof node!=='object')return [];
 if(typeof node.type==='function'&&node.type!==Image)return [node,...flatten(node.type(node.props))];
 return [node,...React.Children.toArray(node.props?.children).flatMap(flatten)];
}
const {effects}=load(new URL('src/data/effects.ts',root));
const {effectCallouts}=load(new URL('src/data/effectCallouts.ts',root));
const {featuredEffects}=load(new URL('src/data/featuredEffects.ts',root));
const {leaderGeometry,default:Callout}=load(new URL('src/EquipmentCallout.tsx',root));
const render=load(new URL('src/EffectArtwork.tsx',root)).default;
const renderFeatured=load(new URL('src/EffectFeatured.tsx',root)).default;

test('all 31 Effects / 155 stages use localized unboxed leaders at 320, 390 and 430pt',()=>{
 assert.equal(effects.length,31);
 assert.deepEqual(Object.keys(effectCallouts).sort(),effects.map(e=>e.id).sort());
 const preview=[];
 for(width of [320,390,430])for(locale of ['ko','en','ja','zh'])for(const item of effects){
  assert.equal(effectCallouts[item.id].length,5);
  for(const [index,step] of item.steps.entries()){
   const nodes=flatten(render({item,step,index}));
   const calls=nodes.filter(n=>n.type===Callout);
   assert.equal(calls.length,effectCallouts[item.id][index].length,item.id+' '+index);
   assert.ok(calls.length>=2);
   assert.equal(nodes.filter(n=>n.props.testID==='callout-point').length,calls.length);
   assert.equal(nodes.filter(n=>n.props.testID==='callout-leader').length,calls.length);
   const hero=nodes.find(n=>n.type===Image).props;
   assert.equal(hero.resizeMode,'contain');
   const size=Image.resolveAssetSource(hero.source);
   for(const call of calls){
    const {position,text,aspectRatio}=call.props;
    assert.ok(text.trim());
    assert.equal(aspectRatio,size.width/size.height);
    assert.ok(position.x>=0&&position.x+position.width<=100);
    assert.ok(position.y>=26&&position.y<=90);
    assert.ok(position.target.x>0&&position.target.x<100&&position.target.y>0&&position.target.y<100);
    // Rotated line endpoints must land on the target for the real image ratio.
    const g=leaderGeometry(position,aspectRatio);
    assert.ok(Math.abs(g.left+g.length/2+Math.cos(g.angle)*g.length/2-position.target.x)<1e-8);
    assert.ok(Math.abs(g.top+Math.sin(g.angle)*g.length/2*aspectRatio-position.target.y)<1e-8);
    const texts=flatten(call).filter(n=>n.type==='Text');
    assert.ok(texts.every(n=>!n.props.adjustsFontSizeToFit&&!n.props.numberOfLines));
    assert.ok(flatten(call).every(n=>!JSON.stringify(n.props.style??{}).includes('backgroundColor":"#051211')));
   }
   if(width===390&&locale==='ko')preview.push({id:item.id,index,image:hero.source,labels:calls.map(c=>({...c.props.position,text:c.props.text}))});
  }
 }
 if(process.env.CALLOUT_AUDIT_DIR){fs.mkdirSync(process.env.CALLOUT_AUDIT_DIR,{recursive:true});fs.writeFileSync(process.env.CALLOUT_AUDIT_DIR+'/portraits.json',JSON.stringify(preview));}
});
test('31 list cards preserve a single leader source, localized text, and 16:9 framing',()=>{
 const preview=[];
 for(locale of ['ko','en','ja','zh'])for(const item of effects){
  const entry=featuredEffects[item.id],tree=renderFeatured({id:item.id,title:item.title[locale]}),nodes=flatten(tree);
  assert.equal(tree.props.style.aspectRatio,16/9);
  const dynamic=entry.labels.filter(l=>l.target).length;
  assert.equal(nodes.filter(n=>n.props.testID==='callout-leader').length,dynamic);
  assert.equal(nodes.filter(n=>n.props.testID==='baked-leader-label').length,entry.labels.length-dynamic);
  const text=nodes.filter(n=>n.type==='Text').flatMap(n=>React.Children.toArray(n.props.children)).join(' ');
  for(const label of entry.labels)assert.ok(text.includes(label.text[locale]));
  if(locale==='ko')preview.push({id:item.id,index:0,image:entry.image,labels:entry.labels.map(l=>({...l,y:l.target?l.y:l.y+9,text:l.text.ko}))});
 }
 if(process.env.CALLOUT_AUDIT_DIR)fs.writeFileSync(process.env.CALLOUT_AUDIT_DIR+'/featured.json',JSON.stringify(preview));
});
