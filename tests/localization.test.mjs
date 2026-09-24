import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../src/'+p,import.meta.url),'utf8'));
const legacy=read('data/legacy.json');
const dictionary=Object.assign({},...['ui','labels','notes','native','advanced'].map(n=>read('locales/'+n+'.json')));
const plain=s=>s.replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').trim();
function strings(value){
 if(typeof value==='string')return /[가-힣]/.test(value)&&!value.includes('/assets/')&&!/\.(jpg|png)$/.test(value)?[plain(value)]:[];
 return value&&typeof value==='object'?Object.values(value).flatMap(strings):[];
}
test('all physical contradiction and system evolution text has three translations',()=>{
 for(const text of new Set([...strings(legacy.physical),...strings(legacy.evolution)])){
  for(const language of ['en','ja','zh']){
   assert.ok(dictionary[text]?.[language],`${language}: ${text}`);
   assert.doesNotMatch(dictionary[text][language],/[가-힣]/);
  }
 }
});
test('every principle question and diagram part is translated without losing parts',()=>{
 const source=read('data/principleDetails.ko.json');
 for(const language of ['en','ja','zh']){
  const rows=read('locales/principleDetails.'+language+'.json');
  assert.equal(rows.length,40);
  rows.forEach((row,i)=>{
   assert.equal(row.length,source[i].parts.length+1,`${language}, principle ${i+1}`);
   row.forEach(text=>{assert.ok(text.trim().length>0);assert.doesNotMatch(text,/[가-힣]/);});
  });
 }
});
