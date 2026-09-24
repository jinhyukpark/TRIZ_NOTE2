import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=new URL('../',import.meta.url);
const read=p=>fs.readFileSync(new URL(p,root),'utf8');
const json=p=>JSON.parse(read(p));
test('native app uses RN screens, not a WebView host',()=>{
 const pkg=json('package.json');assert.equal(pkg.dependencies['@capacitor/core'],undefined);
 for(const f of ['App.tsx',...fs.readdirSync(new URL('src/screens/',root)).map(x=>'src/screens/'+x)])assert.doesNotMatch(read(f),/WebView|dangerouslySetInnerHTML|<iframe|react-dom/);
 const config=json('app.json').expo;assert.equal(config.ios.bundleIdentifier,config.android.package);assert.equal(config.scheme,'triznote');
});
test('all 40 icons and all current 3D diagrams are bundled',()=>{
 const legacy=json('src/data/legacy.json');assert.equal(legacy.principles.length,40);
 for(let i=1;i<=40;i++){const id=String(i).padStart(2,'0');for(const f of ['principle-icons/principle-'+id+'.jpg','illustrations/principle-'+id+'-3d-labeled.'+(i===30?'png':'jpg')])assert.ok(fs.existsSync(new URL('assets/content/'+f,root)),f);}
 const map=json('src/data/advancedIllustrations.json');
 assert.equal(Object.keys(map).length,151);
 for(const a of Object.values(map)){
  assert.match(a.src,/^[\x00-\x7F]+$/,'Native asset filenames must be ASCII: '+a.src);
  assert.ok(fs.existsSync(new URL('assets/content/'+a.src.replace('/assets/',''),root)),a.src);
  assert.ok(read('src/data/assets.ts').includes(JSON.stringify(a.src)),a.src);
 }
});
test('four-language controls and all principle translations remain available',()=>{
 for(const l of ['en','ja','zh']){const p=json('src/locales/principles.'+l+'.json');assert.equal(p.length,40);for(const x of p){assert.ok(x.name);assert.ok(x.summary);assert.ok(x.steps.length);}}
 for(const v of Object.values(json('src/locales/native.json')))for(const l of ['en','ja','zh'])assert.ok(v[l]);
});
test('39x39 contradiction matrix preserves direction and valid principle IDs',()=>{
 const {matrix}=json('src/data/legacy.json');assert.equal(matrix.length,39);
 for(const row of matrix){assert.equal(row.length,39);for(const cell of row)if(!['*','-'].includes(cell))for(const n of cell.split(',').map(Number))assert.ok(n>=1&&n<=40);}
});
test('purchase is fail-closed and acknowledged only after server verification',()=>{
 const code=read('src/screens/Store.tsx');assert.match(code,/EXPO_PUBLIC_IAP_ENABLED==='true'/);assert.ok(code.indexOf('!data?.verified')<code.indexOf('await finishTransaction'));
 const backend=read('supabase/functions/verify-purchase/index.ts');assert.match(backend,/auth.getUser/);assert.match(backend,/BILLING_ENABLED/);assert.match(backend,/appAccountToken!==user.id/);assert.match(backend,/obfuscatedExternalAccountId!==user.id/);
});
