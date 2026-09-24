// Administrative publisher. Keys stay in process memory and are never bundled or logged.
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import ts from 'typescript';
import {createClient} from '@supabase/supabase-js';
const root=path.resolve(import.meta.dirname,'..'),require=createRequire(import.meta.url),cache=new Map();
function load(file){
 if(cache.has(file))return cache.get(file);
 const exports={};cache.set(file,exports);
 const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText;
 new Function('require','exports',code)(name=>{
  if(name==='react')return require('react');
  if(name==='react-native')return {};
  const p=path.resolve(path.dirname(file),name);
  if(name.endsWith('.png'))return p;
  return load(fs.existsSync(p+'.ts')?p+'.ts':p+'.tsx');
 },exports);return exports;
}
const {expansionEffects,expansionDrafts}=load(path.join(root,'src/data/expansionEffects.ts'));
const {expansionArtwork,expansionFeatured,expansionCallouts}=load(path.join(root,'src/data/expansionArtwork.ts'));
const {effectCatalog}=load(path.join(root,'src/data/effectCatalog.ts'));
const {diagramShapes,axes}=load(path.join(root,'src/ExpansionDiagram.tsx'));
const ref='sovzalkrotgvnqvpfkjd',url=`https://${ref}.supabase.co`,bucket='effect-content';
const files=new Map();
function asset(file){
 const bytes=fs.readFileSync(file),hash=createHash('sha256').update(bytes).digest('hex');
 const key=`expansion-v1/${hash.slice(0,16)}/${path.basename(file)}`;
 files.set(key,{file,bytes,hash});
 return {uri:`${url}/storage/v1/object/public/${bucket}/${key}`,width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20),sha256:hash};
}
const rows=expansionEffects.map(item=>{
 const art=expansionArtwork[item.id],featured=expansionFeatured[item.id];
 return {id:item.id,schema_version:1,published:true,payload:{...item,
  sourceVideo:`https://youtu.be/${expansionDrafts.find(d=>d.id===item.id).video}`,
  catalog:effectCatalog[item.id],featured:{...featured,image:asset(featured.image)},
  artwork:{images:art.images.map(asset),tags:art.tags,callouts:expansionCallouts[item.id]},
  diagrams:item.steps.map((_,index)=>({shapes:diagramShapes(item.id,index),caption:axes[item.id]&&(item.id!=='activated-carbon'||index===4)&&(item.id!=='photoionisation'||index>=2)?Object.fromEntries(['ko','en','ja','zh'].map((l,i)=>[l,axes[item.id].split('|')[i]])):null}))
 }};
});
if(!process.argv.includes('--publish')){console.log(JSON.stringify({effects:rows.length,steps:rows.length*5,images:files.size,bytes:[...files.values()].reduce((n,f)=>n+f.bytes.length,0)}));process.exit(0);}
const keys=JSON.parse(execFileSync('supabase',['projects','api-keys','--project-ref',ref,'--reveal','--output','json'],{encoding:'utf8',stdio:['ignore','pipe','pipe']}));
const list=Array.isArray(keys)?keys:keys.api_keys??keys.keys??[];
const key=list.find(k=>k.name==='service_role')?.api_key??list.find(k=>k.type==='secret')?.api_key;
if(!key)throw Error('Administrative publisher credential unavailable; no client write permissions will be opened.');
const client=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
const queue=[...files.entries()];let uploaded=0;
await Promise.all(Array.from({length:4},async()=>{while(queue.length){const [name,f]=queue.shift();
 const {error}=await client.storage.from(bucket).upload(name,f.bytes,{contentType:'image/png',cacheControl:'31536000',upsert:false});
 if(error&&!/already exists|duplicate/i.test(error.message))throw error;
 const response=await fetch(`${url}/storage/v1/object/public/${bucket}/${name}`);
 if(!response.ok||createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex')!==f.hash)throw Error(`Image verification failed: ${name}`);
 uploaded++;if(uploaded%10===0||uploaded===files.size)console.log(`Verified images ${uploaded}/${files.size}`);
}}));
const {error}=await client.from('effect_content').upsert(rows,{onConflict:'id'});if(error)throw error;
const {data,error:readError}=await client.from('effect_content').select('id,payload').in('id',rows.map(r=>r.id));
if(readError||data?.length!==rows.length)throw Error('Database read-back count mismatch');
for(const row of rows)if(JSON.stringify(data.find(d=>d.id===row.id)?.payload,sortedKeys(row.payload))!==JSON.stringify(row.payload,sortedKeys(row.payload)))throw Error(`Read-back mismatch: ${row.id}`);
console.log(`Published and verified ${rows.length} Effects, ${rows.length*5} stages, ${files.size} images.`);
function sortedKeys(value){const keys=new Set();function walk(v){if(v&&typeof v==='object'){for(const k of Object.keys(v)){keys.add(k);walk(v[k]);}}}walk(value);return [...keys].sort();}
