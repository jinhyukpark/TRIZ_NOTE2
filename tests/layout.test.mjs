import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const code=fs.readFileSync(new URL('../src/layout.ts',import.meta.url),'utf8');
const js=ts.transpileModule(code,{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const {libraryLayout,fitImage}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));

test('grid stays within the measured container at small, phone, landscape and tablet sizes',()=>{
 for(const width of [280,320,350,375,390,430,568,650,768,844,1024,1366]){
  for(const font of [1,1.3,1.8,2.5]){
   const {pageWidth,columns,tileWidth}=libraryLayout(width,font);
   assert.ok(columns>=1&&columns<=6);
   assert.ok(tileWidth>0);
   assert.ok(columns*tileWidth+(columns-1)*10<=pageWidth-40+0.01);
   assert.ok(pageWidth<=960);
  }
 }
 assert.equal(libraryLayout(390).columns,3);
 assert.equal(libraryLayout(320).columns,2);
 assert.ok(libraryLayout(390,2).columns<3);
});
test('cards fill only their actual parent content area',()=>{
 for(const width of [320,390,768,1366]){
  const {pageWidth,columns,tileWidth}=libraryLayout(width,1,true);
  assert.equal(columns,1);assert.equal(tileWidth,pageWidth-40);
 }
});
test('expanded diagrams initially fit both screen dimensions without distortion',()=>{
 for(const [w,h] of [[320,500],[390,600],[780,240],[980,700]]){
  for(const ratio of [0.5,1,1.5,2.4]){
   const size=fitImage(w,h,ratio);
   assert.ok(size.width<=w&&size.height<=h+0.001);
   assert.ok(Math.abs(size.width/size.height-ratio)<0.001);
  }
 }
});
test('bundled image dimensions cannot determine the size of inline image frames',()=>{
 const component=fs.readFileSync(new URL('../src/components.tsx',import.meta.url),'utf8');
 const artwork=fs.readFileSync(new URL('../src/LocalizedArtwork.tsx',import.meta.url),'utf8');
 assert.match(component,/LocalizedArtwork/);
 assert.match(artwork,/StyleSheet.absoluteFill/);
 assert.match(artwork,/width:'100%',height:'100%'/);
 assert.doesNotMatch(component,/width:1100|height:850/);
 const library=fs.readFileSync(new URL('../src/screens/Library.tsx',import.meta.url),'utf8');
 assert.match(library,/onLayout=/);
 assert.match(library,/FramedImage/);
 assert.doesNotMatch(library,/<Image\s/);
});
