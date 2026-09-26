// Build-time draft only. Never called by the app and never receives user notes/accounts.
// Output must be reviewed before becoming a checked-in locale resource.
import fs from 'node:fs';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const run=promisify(execFile);
const input=JSON.parse(fs.readFileSync('/tmp/triz-localization-input.json','utf8'));
const done=new Set(fs.existsSync('/tmp/triz-localization-draft.jsonl')?fs.readFileSync('/tmp/triz-localization-draft.jsonl','utf8').trim().split('\n').filter(Boolean).map(line=>{const r=JSON.parse(line);return r.locale+'|'+r.source;}):[]);
const batches=[];let batch=[],size=0;
for(const text of input.missing){if(size+text.length>950&&batch.length){batches.push(batch);batch=[];size=0;}batch.push(text);size+=text.length+20;}
if(batch.length)batches.push(batch);
const jobs=batches.flatMap(texts=>['en','ja','zh'].map(locale=>({texts:texts.filter(s=>!done.has(locale+'|'+s)),locale}))).filter(j=>j.texts.length);
if(process.argv.includes('--repair')){
 const latest=new Map(fs.readFileSync('/tmp/triz-localization-draft.jsonl','utf8').trim().split('\n').map(line=>{const r=JSON.parse(line);return [r.locale+'|'+r.source,r];}));
 const repair=new Map();
 for(const row of latest.values())if(!row.text.trim()||row.text.includes('\n')){
  const at=input.missing.indexOf(row.source);
  for(const source of input.missing.slice(at,at+2))repair.set(row.locale+'|'+source,{texts:[source],locale:row.locale});
 }
 jobs.splice(0,jobs.length,...repair.values());
}
let cursor=0;
async function translate(text,locale){
 const url=new URL('https://translate.googleapis.com/translate_a/single');
 const clarified=text.replaceAll('물질-장','물질-필드').replace(/\b장(?=[(（])/g,'필드').replace(/(^|[\s])장(?=을|이|의|에|은|으로|과|만)/g,'$1필드').replaceAll('로렌츠','로런츠');
 for(const [k,v] of Object.entries({client:'gtx',sl:'ko',tl:locale,dt:'t',q:clarified}))url.searchParams.set(k,v);
 // Use the host's configured proxy path; direct Node fetch is rejected upstream.
 const {stdout}=await run('curl',['--fail','--silent','--show-error','--max-time','30','--retry','3','--retry-delay','2','--retry-max-time','100',url.href],{maxBuffer:1024*1024});
 const body=JSON.parse(stdout);return body[0].map(s=>s[0]??'').join('');
}
await Promise.all(Array.from({length:3},async()=>{while(cursor<jobs.length){const {texts,locale}=jobs[cursor++];
 if(process.argv.includes('--repair')){console.log(JSON.stringify({source:texts[0],locale,text:await translate(texts[0],locale)}));continue;}
 const value=(await translate(texts.map((s,i)=>`TRIZSEG${i+1000}END ${s}`).join('\n'),locale)).normalize('NFKC');
 const pieces=[...value.matchAll(/TRIZ\s*SEG\s*(\d{4})\s*END\s*([\s\S]*?)(?=TRIZ\s*SEG\s*\d{4}\s*END|$)/gi)];
 const valid=pieces.length===texts.length&&pieces.every((p,i)=>Number(p[1])===i+1000);
 for(let i=0;i<texts.length;i++){const text=valid?pieces[i][2].trim():await translate(texts[i],locale);console.log(JSON.stringify({source:texts[i],locale,text}));}
 await new Promise(r=>setTimeout(r,300));
}}));
