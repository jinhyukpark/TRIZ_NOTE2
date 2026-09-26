import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../src/'+p,import.meta.url),'utf8');
test('Effects list virtualizes cards with bounded batches and refreshes for locale/server changes',()=>{
 const screen=read('screens/Effects.tsx');
 assert.match(screen,/<FlatList ref=\{listScroll\}/);
 assert.match(screen,/data=\{matches\} keyExtractor=\{e=>e.id\}/);
 assert.match(screen,/initialNumToRender=\{3\} maxToRenderPerBatch=\{3\} windowSize=\{5\}/);
 assert.match(screen,/extraData=\{`\$\{locale\}-\$\{contentRevision\}`\}/);
 assert.doesNotMatch(screen,/matches\.map\(/);
 assert.match(screen,/scrollToOffset\(/);
});
test('detail starts at 01 with clipping disabled and stable stage identity',()=>{
 const screen=read('screens/Effects.tsx');
 assert.match(screen,/\[index,setIndex\]=useState\(0\)/);
 assert.match(screen,/<EffectReader key=\{item.id\}/);
 assert.match(screen,/<ScrollView ref=\{scroll\} removeClippedSubviews=\{false\}/);
 assert.match(screen,/<EffectArtwork key=\{`\$\{step.image\}-\$\{locale\}`\}/);
});
test('local and remote bitmaps use size-aware decoding while catalogue previews avoid signed-url cache churn',()=>{
 const image=read('ContentImage.tsx');
 const featured=read('EffectFeatured.tsx'),screen=read('screens/Effects.tsx');
 assert.equal((image.match(/resizeMethod="resize"/g)??[]).length,2);
 assert.match(image,/key=\{props.source.uri\}/);
 assert.match(image,/source=\{failed\?fallback:props.source\}/);
 assert.match(featured,/const source=localEffectImages\[id\]\.featured/);
 assert.match(featured,/<ContentImage source=\{source\} fallback=\{source\}/);
 assert.doesNotMatch(featured,/onLoadStart=\{\(\)=>setImageReady\(false\)\}/);
 assert.match(screen,/const loadedFeaturedCards=new Set<string>\(\)/);
 assert.doesNotMatch(screen,/setReady\(false\).*contentRevision/);
});
