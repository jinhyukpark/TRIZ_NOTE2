// Report untranslated source text without hiding it or substituting unrelated copy.
import fs from 'node:fs';
const root=new URL('../src/',import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const dictionary=Object.assign({},...['ui','labels','notes','native','advanced','complete'].map(n=>read('locales/'+n+'.json')));
const source=read('data/legacy.json');
const extra=read('data/additionalExamples.json');
const plain=s=>s.replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
function collect(value,result=new Set()){
 if(typeof value==='string'){
  if(/[가-힣]/.test(value)&&!value.includes('/assets/')&&!/\.(jpg|png)$/.test(value))result.add(plain(value));
 }else if(value&&typeof value==='object')Object.values(value).forEach(v=>collect(v,result));
 return result;
}
const groups={
 physical:source.physical,
 evolution:source.evolution,
 standards:source.standards,
 principleReference:source.principles.map(p=>({description:p.expExp,sections:p.content})),
 additionalExamples:extra,
 illustrationCaptions:read('data/advancedIllustrations.json'),
};
const missing={};
for(const [group,value] of Object.entries(groups)){
 missing[group]=[...collect(value)].filter(text=>['en','ja','zh'].some(l=>!dictionary[text]?.[l]));
 console.log(`${group}: ${missing[group].length} untranslated source strings`);
}
if(process.argv.includes('--details'))console.log(JSON.stringify(missing,null,2));
if(process.argv.includes('--strict')&&Object.values(missing).some(rows=>rows.length))process.exitCode=1;
