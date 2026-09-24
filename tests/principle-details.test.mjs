import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=name=>JSON.parse(fs.readFileSync(new URL('../src/data/'+name,import.meta.url),'utf8'));
test('every principle has a readable question and a description for every diagram label',()=>{
 const guides=read('learningGuides.json'),details=read('principleDetails.ko.json');
 assert.equal(details.length,40);
 details.forEach((row,i)=>{
  assert.equal(row.id,i+1);
  assert.ok(row.question.endsWith('?'));
  assert.equal(row.parts.length,guides[i].labels.length,`principle ${row.id}`);
  row.parts.forEach(text=>assert.ok(text.trim().length>10));
 });
});
test('all principle IDs use the shared detail layout and exercise editor',()=>{
 const app=fs.readFileSync(new URL('../App.tsx',import.meta.url),'utf8');
 const detail=fs.readFileSync(new URL('../src/screens/Detail.tsx',import.meta.url),'utf8');
 assert.match(app,/<Detail key=\{detail\} id=\{detail\}/);
 assert.match(detail,/import Text from '..\/ContentText'/);
 assert.match(detail,/<ApplicationExercise/);
 assert.match(detail,/principleDetails\.parts\[i\]/);
});
