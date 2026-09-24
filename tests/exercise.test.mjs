import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=fs.readFileSync(new URL('../src/exerciseStorage.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const {exerciseKey,parseExercise}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
test('application notes round-trip without mixing principles or accounts',()=>{
 const data={problem:'커버가 커요',idea:'접이식 덮개'};
 assert.deepEqual(parseExercise(JSON.stringify(data)),data);
 assert.deepEqual(parseExercise(null),{problem:'',idea:''});
 assert.notEqual(exerciseKey(30),exerciseKey(1));
 assert.notEqual(exerciseKey(30,'alice'),exerciseKey(30,'bob'));
 assert.notEqual(exerciseKey(30),exerciseKey(30,'alice'));
 assert.throws(()=>parseExercise('{'));
 assert.throws(()=>parseExercise('{"problem":1}'));
});
test('exercise guidance and local-storage disclosures cover all four languages',()=>{
 const copy=JSON.parse(fs.readFileSync(new URL('../src/locales/application.json',import.meta.url),'utf8'));
 for(const lang of ['ko','en','ja','zh'])for(const key of Object.keys(copy.ko))assert.ok(copy[lang][key]);
 assert.doesNotMatch(copy.ko.question30,/경계면/);
});
