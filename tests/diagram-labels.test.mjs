import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const data={...JSON.parse(fs.readFileSync(new URL('../src/data/principleDiagramLabels.json',import.meta.url),'utf8')),...JSON.parse(fs.readFileSync(new URL('../src/data/evolutionDiagramLabels.json',import.meta.url),'utf8'))};
const source=fs.readFileSync(new URL('../src/layout.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const {fitDiagramLabel}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));

test('principle overlay labels have complete translations and valid canvas coordinates',()=>{
 assert.equal(Object.keys(data).length,48); // Principle 30 is manually positioned in diagramLabels.ts.
 for(const [path,diagram] of Object.entries(data)){
  assert.ok(diagram.labels.length>=3,path);
  for(const label of diagram.labels){
   assert.ok(label.x>=0&&label.y>=0,path);
   assert.ok(label.x+label.width<=diagram.width+1,path);
   assert.ok(label.y+label.height<=diagram.height+1,path);
   for(const locale of ['ko','en','ja','zh']){
    assert.ok(label.text[locale]?.trim(),`${path}: ${locale}`);
    if(locale!=='ko')assert.doesNotMatch(label.text[locale],/[가-힣]/);
    const fit=fitDiagramLabel(label.text[locale],label.width,label.height,label.fontSize);
    assert.ok(fit.fontSize>0&&fit.fontSize<=label.fontSize);
    assert.ok(fit.lines>=1);
    assert.ok(fit.lines*fit.lineHeight<=label.height+1,`${path}: ${locale}`);
   }
  }
 }
});

test('native inline and enlarged artwork share the localized renderer',()=>{
 const component=fs.readFileSync(new URL('../src/components.tsx',import.meta.url),'utf8');
 assert.ok((component.match(/<LocalizedArtwork/g)||[]).length>=2);
 const artwork=fs.readFileSync(new URL('../src/LocalizedArtwork.tsx',import.meta.url),'utf8');
 assert.match(artwork,/item.text\[locale\]/);
 assert.match(artwork,/candidate&&assets\[candidate.clean\]/);
 assert.match(artwork,/size.width-fit.width/);
 assert.match(artwork,/size.height-fit.height/);
});
