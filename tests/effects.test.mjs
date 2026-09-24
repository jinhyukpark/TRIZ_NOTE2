import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const root=new URL('../',import.meta.url);
const read=p=>fs.readFileSync(new URL(p,root),'utf8');
const generated=ts.transpileModule(read('src/data/generatedEffects.ts'),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const base=ts.transpileModule(read('src/data/effects.ts'),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText.replace(/import \{ generatedEffects \} from '.\/generatedEffects';\n/,'');
const scientific=ts.transpileModule(read('src/data/scientificEffects.ts'),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const expansion=ts.transpileModule(read('src/data/expansionEffects.ts'),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const code=generated+'\n'+scientific+'\n'+expansion+'\n'+base.replace(/import \{ (scientificEffects|expansionEffects) \} from '.\/(scientificEffects|expansionEffects)';\n/g,'');
const {effects,effectUi}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
test('effects are extensible items with ordered, bundled and fully localized steps',()=>{
 assert.equal(new Set(effects.map(e=>e.id)).size,effects.length);
 const item=effects.find(e=>e.id==='ultrasonic-soldering');assert.ok(item);assert.equal(item.steps.length,5);
 for(const e of effects){
  for(const field of [e.title,e.summary,...e.steps.flatMap(p=>[p.label,p.title,p.body,p.keyPoint])])for(const locale of ['ko','en','ja','zh'])assert.ok(field[locale]?.trim());
  for(const [i,step] of e.steps.entries()){
   assert.match(step.image,new RegExp(`(?:-|/)${String(i+1).padStart(2,'0')}(?:[-_.])`));
   assert.ok(fs.existsSync(new URL('assets/content/'+step.image.replace('/assets/',''),root)));
   assert.ok(read('src/data/assets.ts').includes(JSON.stringify(step.image)));
  }
 }
 for(const field of Object.values(effectUi))for(const locale of ['ko','en','ja','zh'])assert.ok(field[locale]);
});
test('Effects is the middle tab and has detail-aware Android back navigation',()=>{
 const app=read('App.tsx');
 assert.match(app,/\['principles','원리'\],\['effects','Effects'\],\['matrix','모순'\]/);
 assert.match(app,/if\(effect\)\{setEffect\(null\);return true\}/);
 assert.match(app,/<Effects selected=\{effect\} onSelect=\{setEffect\}/);
});
test('every Effect step has a bundled bitmap without the baked-in process timeline',()=>{
 for(const effect of effects)for(const step of effect.steps){
  // New native compositions start with text-free portraits: no cleaning copy is needed.
  if(/-portrait-v\d+\.png$/.test(step.image))continue;
  const cleaned=step.image.replace(/\.png$/, '-clean-v2.png');
  assert.ok(fs.existsSync(new URL('assets/content/'+cleaned.replace('/assets/',''),root)),cleaned);
  assert.ok(read('src/data/assets.ts').includes(JSON.stringify(cleaned)),cleaned);
 }
});
test('ultrasonic soldering uses portrait-native artwork with localized live copy',()=>{
 const artwork=read('src/EffectArtwork.tsx');
 const soldering=effects.find(effect=>effect.id==='ultrasonic-soldering');
 assert.ok(soldering);
 for(const step of soldering.steps){
  const portrait=step.image.replace(/\.png$/, '-portrait-v1.png');
  assert.ok(fs.existsSync(new URL('assets/content/'+portrait.replace('/assets/',''),root)),portrait);
  assert.ok(read('src/data/assets.ts').includes(JSON.stringify(portrait)),portrait);
 }
 assert.match(artwork,/item\.id==='ultrasonic-soldering'/);
 assert.match(artwork,/const ultrasonicPortraits=\[/);
 for(let i=1;i<=5;i++)assert.match(artwork,new RegExp(`ultrasonic-soldering-0${i}-portrait-v1\\.png`));
 assert.match(artwork,/isCavitation\?cavitationPortraits:ultrasonicPortraits/);
 assert.match(artwork,/const portrait=portraits\[index\]/);
 assert.match(artwork,/\{displayTitle\}/);
 assert.match(artwork,/\{step\.title\[locale\]\}/);
 assert.match(artwork,/\{step\.body\[locale\]\}/);
 assert.match(artwork,/\{step\.keyPoint\[locale\]\}/);
});
test('Effect step navigation stays outside the detail scroll view',()=>{
 const screen=read('src/screens/Effects.tsx');
 const navigation=screen.indexOf('testID="effect-step-navigation"');
 const scroll=screen.indexOf('<ScrollView ref={scroll}');
 assert.ok(navigation>=0&&navigation<scroll);
 assert.ok(!screen.slice(scroll).includes('testID="effect-step-navigation"'));
 assert.match(screen,/onPress=\{\(\)=>move\(i\)\}/);
 assert.match(screen,/scrollTo\(\{y:0,animated:false\}\)/);
});
