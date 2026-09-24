import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const app=fs.readFileSync(new URL('../App.tsx',import.meta.url),'utf8');
test('saved principles are accessed from My Page rather than the bottom tabs',()=>{
 assert.ok(!app.includes("['saved','저장']"));
 assert.ok(app.includes("onPress={()=>navigate('saved')}"));
 assert.ok(app.includes("if(tab==='saved'){setTab('account');return true}"));
 assert.ok(app.includes("onBack={()=>setDetail(null)}"));
 assert.ok(app.includes('bookmarks={learning.bookmarks}'));
 const labels=JSON.parse(fs.readFileSync(new URL('../src/locales/native.json',import.meta.url),'utf8'));
 for(const locale of ['en','ja','zh'])assert.ok(labels['마이페이지'][locale]);
});
