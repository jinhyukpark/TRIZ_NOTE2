import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const compile=p=>ts.transpileModule(read(p),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const load=code=>import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
const catalog=await load(compile('src/data/effectCatalog.ts'));
const {effects}=await load(compile('src/data/generatedEffects.ts')+'\n'+compile('src/data/scientificEffects.ts')+'\n'+compile('src/data/expansionEffects.ts')+'\n'+compile('src/data/effects.ts').replace(/import \{ (generatedEffects|scientificEffects|expansionEffects) \} from '.\/(generatedEffects|scientificEffects|expansionEffects)';\n/g,''));
const {effectCatalog,effectKinds,effectFields,effectFunctions,catalogUi,effectTitle,filterEffects,linkedApplications,resultCount}=catalog;
const ids=items=>items.map(item=>item.id);
test('list titles include English once and visually truncate without losing the accessible name',()=>{
 const item=effects.find(e=>e.id==='skin-effect');
 assert.equal(catalog.effectListTitle(item,'ko'),'표피 효과 (Skin effect)');
 assert.equal(catalog.effectListTitle(item,'en'),'Skin effect');
 for(const locale of ['ja','zh'])assert.ok(catalog.effectListTitle(item,locale).endsWith('(Skin effect)'));
 const screen=read('src/screens/Effects.tsx');
 assert.match(screen,/numberOfLines=\{1\} ellipsizeMode="tail" style=\{d.listTitle\}>\{effectListTitle\(e,locale\)\}/);
 assert.match(screen,/accessibilityLabel=\{effectListTitle\(e,locale\)\}/);
});
test('detail headings separate English into a smaller single-line subtitle only outside English locale',()=>{
 const screen=read('src/screens/Effects.tsx');
 const artwork=read('src/EffectArtwork.tsx');
 assert.match(screen,/\{item.title\[locale\]\}/);
 assert.match(screen,/locale!=='en'&&<Text numberOfLines=\{1\} ellipsizeMode="tail"[^>]+>\(\{item.title.en\}\)/);
 assert.match(artwork,/const displayTitle=title\[locale\]/);
 assert.match(artwork,/locale!=='en'&&<Text numberOfLines=\{1\} ellipsizeMode="tail"[^>]+>\(\{title.en\}\)/);
 assert.match(artwork,/a\.portraitOverlayTitle\]\}>\{displayTitle\}/);
 for(const item of effects){
  assert.equal(catalog.effectListTitle(item,'en'),effectTitle(item).en);
  assert.equal(catalog.effectListTitle(item,'ko'),`${effectTitle(item).ko} (${effectTitle(item).en})`);
 }
});
test('advanced filters live in a dismissible bottom sheet with draft-only selection',()=>{
 const screen=read('src/screens/Effects.tsx');
 const modal=screen.indexOf('<Modal visible={filtersOpen}');
 assert.ok(modal>0);
 assert.ok(!screen.slice(0,modal).includes('<FilterChip'));
 assert.match(screen,/animationType="slide" onRequestClose=\{closeFilters\}/);
 assert.match(screen,/setDraftField\(field\);setDraftKind\(kind\);setFiltersOpen\(true\)/);
 assert.match(screen,/setField\(draftField\);setKind\(draftKind\);closeFilters\(\)/);
 assert.match(screen,/setDraftField\('all'\);setDraftKind\('all'\)/);
 assert.match(screen,/Keyboard.dismiss\(\)/);
});

test('every existing Effect has valid independent kind, fields and function metadata',()=>{
 assert.deepEqual(Object.keys(effectCatalog).sort(),ids(effects).sort());
 for(const item of effects){
  const entry=effectCatalog[item.id];
  assert.ok(effectKinds[entry.kind]);
  const fields=[entry.primaryField,...entry.relatedFields];
  assert.equal(fields.length,new Set(fields).size);
  fields.forEach(field=>assert.ok(effectFields[field]));
  assert.ok(entry.functions.length);
  entry.functions.forEach(fn=>assert.ok(effectFunctions[fn]));
  if(entry.kind==='application')assert.ok(entry.foundations.length);
 }
 assert.equal(filterEffects(effects,'','all','basic').length,17);
 assert.equal(filterEffects(effects,'','all','application').length,14);
});
test('filters combine with AND, include secondary fields, and support multilingual functional search',()=>{
 assert.equal(filterEffects(effects,'  ','all','all').length,effects.length);
 assert.deepEqual(ids(filterEffects(effects,'','acoustic','application')),['ultrasonic-soldering','ultrasonic','acoustic-levitation']);
 assert.ok(ids(filterEffects(effects,'','material','application')).includes('ultrasonic-soldering'));
 assert.deepEqual(ids(filterEffects(effects,'냉각','all','all')),['heat-pipe','condensation','distillation','aerogel']);
 assert.deepEqual(ids(filterEffects(effects,' HEAT   PIPE ','all','application')),['heat-pipe']);
 assert.deepEqual(ids(filterEffects(effects,'','optical','application')),[]);
 assert.deepEqual(ids(filterEffects(effects,'存在しない項目','all','all')),[]);
 for(const query of ['분극','polarization','誘電分極','介质极化'])assert.ok(ids(filterEffects(effects,query,'all','basic')).includes('polarisation'));
});
test('display names clarify content scope but original names still work in search',()=>{
 const shape=effects.find(e=>e.id==='shape-memory-alloy');
 assert.equal(effectTitle(shape).ko,'형상기억 효과');
 assert.ok(ids(filterEffects(effects,'형상기억합금','all','all')).includes(shape.id));
 assert.equal(effectTitle(effects.find(e=>e.id==='ultrasonic')).ko,'초음파 발생·전달');
});
test('application links target real basic pages and reverse links cannot drift',()=>{
 for(const item of effects)for(const foundation of effectCatalog[item.id].foundations){
  if(!foundation.effectId)continue;
  assert.ok(effects.some(e=>e.id===foundation.effectId));
  assert.equal(effectCatalog[foundation.effectId].kind,'basic');
  assert.ok(ids(linkedApplications(effects,foundation.effectId)).includes(item.id));
 }
 assert.deepEqual(ids(linkedApplications(effects,'acoustic-cavitation')),['ultrasonic-soldering']);
 assert.deepEqual(ids(linkedApplications(effects,'polarisation')),['dielectric-heating']);
 assert.deepEqual(linkedApplications(effects,'corona-discharge'),[]);
 assert.ok(effectCatalog['heat-pipe'].foundations.every(f=>!f.effectId));
});
test('catalog labels, concepts and display titles cover all four locales',()=>{
 const labels=[...Object.values(effectKinds),...Object.values(effectFields),...Object.values(effectFunctions),...Object.values(catalogUi),...Object.values(effectCatalog).flatMap(e=>[...(e.title?[e.title]:[]),...e.foundations.map(f=>f.title)])];
 for(const label of labels)for(const locale of ['ko','en','ja','zh'])assert.ok(label[locale]?.trim());
 assert.equal(resultCount(1,'en'),'1 item');
 assert.equal(resultCount(12,'ko'),'12개 항목');
});
