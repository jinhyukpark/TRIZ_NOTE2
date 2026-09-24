import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=name=>JSON.parse(fs.readFileSync(new URL('../src/data/'+name,import.meta.url),'utf8'));
test('all 93 principle sections have 2–5 distinct examples without dropping originals',()=>{
 const {principles}=read('legacy.json'),added=read('additionalExamples.json');let total=0;
 principles.forEach((p,i)=>p.content.forEach((section,j)=>{
  const original=(section.subTitle??[]).filter(x=>x.trim());
  const examples=[...new Set([...original,...(added[i+1]?.[j]??[])])];
  assert.ok(examples.length>=2&&examples.length<=5,`${i+1}.${j+1}: ${examples.length}`);
  original.forEach(x=>assert.ok(examples.includes(x)));
  total++;
 }));
 assert.equal(total,93);
});
