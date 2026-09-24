import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const home=fs.readFileSync(new URL('../src/screens/Home.tsx',import.meta.url),'utf8');
test('native home preserves the web home section order and featured principles',()=>{
 const sections=['오늘의 사고 훈련','3분 학습 시작','모순에서 원리 찾기','무작위 원리 뽑기','빠른 탐색','자주 쓰는 발명원리','더 깊이 탐구하기'];
 let last=-1;for(const section of sections){const pos=home.indexOf(section);assert.ok(pos>last,section);last=pos;}
 assert.match(home,/\[1,13,22,24\]/);
 assert.match(home,/now.getDate\(\)\+now.getMonth\(\)/);
 assert.match(home,/onPress=\{onExplore\}/);
 assert.match(home,/onCollection\(c\)/);
});
test('all new home copy is available in the existing four-language dictionary',()=>{
 const ui=JSON.parse(fs.readFileSync(new URL('../src/locales/ui.json',import.meta.url),'utf8'));
 for(const key of ['오늘의 사고 훈련','모순에서 원리 찾기','무작위 원리 뽑기','자주 쓰는 발명원리','더 깊이 탐구하기','물리적 모순 · 4가지 분리']){
  for(const language of ['en','ja','zh'])assert.ok(ui[key]?.[language],`${key}: ${language}`);
 }
});
