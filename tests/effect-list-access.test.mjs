import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=path=>fs.readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('Effect catalogue always renders featured previews while detail remains subscription gated',()=>{
 const screen=read('src/screens/Effects.tsx'),app=read('App.tsx'),metro=read('metro.config.js');
 assert.match(screen,/<EffectFeatured id=\{item\.id\} title=\{effectListTitle\(item,locale\)\}/);
 assert.match(screen,/<EffectCardSkeleton\/>/);
 assert.doesNotMatch(screen,/구독 후 이미지 보기|Subscribe to view images/);
 assert.match(app,/const openEffect=\(id:string\|null\)=>\{if\(id===null\)setEffect\(null\);else openContent\(\(\)=>setEffect\(id\)\);\}/);
 assert.match(app,/checkDetailAccess\(subscription\.refresh/);
 assert.match(metro,/!p\.includes\('\/assets\/content\/effects\/featured\/'\)/);
});
