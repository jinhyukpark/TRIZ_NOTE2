// Read-only extraction. OCR is supplied by read-diagram-text.swift; no artwork is altered.
import fs from 'node:fs';
import ts from 'typescript';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const dict={};
for(const name of ['ui','labels','notes','native','advanced'])for(const [key,value] of Object.entries(read('src/locales/'+name+'.json')))dict[key]={...dict[key],...value};
const plain=s=>s.replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
const texts=new Set();
function collect(value){if(typeof value==='string'){if(/[가-힣]/.test(value)&&!value.includes('/assets/')&&!/\.(jpg|png)$/.test(value))texts.add(plain(value));}else if(value&&typeof value==='object')Object.values(value).forEach(collect);}
const legacy=read('src/data/legacy.json');
for(const value of [legacy.physical,legacy.evolution,legacy.standards,legacy.principles.map(p=>({description:p.expExp,sections:p.content})),read('src/data/additionalExamples.json')])collect(value);
collect(read('src/data/advancedIllustrations.json'));
const corrections={'시존 렌즈':'시준 렌즈','흘 전압':'홀 전압','전기자':'전기장','열올':'열을','전기장올':'전기장을','중발부':'증발부','온도 중가':'온도 증가','침 전국':'침 전극','뾰족한 전국':'뾰족한 전극','전국 끝':'전극 끝','용용':'용융','액채':'액체','옴직임':'움직임','로렌초':'로런츠','로렌츠':'로런츠','층돌':'충돌','차애':'차에','봉괴':'붕괴','압력이 중가':'압력이 증가','응죽':'응축','안정회':'안정화','뱡향':'방향','흩 전압':'홀 전압','고추파':'고주파','열을 홉수':'열을 흡수','전류를 홀':'전류를 흘','전기장올':'전기장을','바꿜':'바뀔','가집니다':'가집니다','울, 암모니아 동':'물, 암모니아 등'};
const fix=s=>Object.entries(corrections).reduce((v,[from,to])=>v.replaceAll(from,to),s).replace('사이에,,','사이에,');
const panels={};
for(const row of read('/tmp/triz-effects-ocr.json')){
 if(row.error)throw Error(row.path+': '+row.error);
 const labels=row.labels.filter(l=>l.x>.665&&/[가-힣]/.test(l.text)).sort((a,b)=>a.y-b.y||a.x-b.x);
 const groups=[];
 for(const l of labels){
  // Join wrapped sentences only within the same column and font size.
  const prior=groups.find(g=>(Math.abs(g.x-l.x)<.009||(l.x>=g.x-.003&&l.x+l.width<=g.x+g.width+.003&&Math.abs((g.x+g.width/2)-(l.x+l.width/2))<.018))&&Math.abs(g.fontHeight-l.height)<.015&&l.y-(g.y+g.height)<.023&&l.y>=g.y+g.height-.015&&Math.abs((g.x+g.width/2)-(l.x+l.width/2))<.075);
  if(prior){prior.width=Math.max(prior.x+prior.width,l.x+l.width)-Math.min(prior.x,l.x);prior.x=Math.min(prior.x,l.x);prior.height=l.y+l.height-prior.y;prior.text+=' '+fix(l.text);prior.rects.push(l);}
  else groups.push({...l,text:fix(l.text),fontHeight:l.height,rects:[l]});
 }
 for(const g of groups){g.text=plain(g.text);texts.add(g.text);}
 panels[row.path.split('/').pop()]={labels:groups};
}
// Include all dictionary lookups, including UI ternary branches and accessible labels.
function sourceScan(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=dir+'/'+e.name;if(e.isDirectory())sourceScan(p);else if(/\.tsx?$/.test(p)&&!p.includes('/data/')&&!p.includes('/locales/')){const source=ts.createSourceFile(p,fs.readFileSync(p,'utf8'),ts.ScriptTarget.Latest,true);function visit(n){if(ts.isCallExpression(n)&&n.expression.getText(source)==='t')for(const a of n.arguments){function strings(v){if(ts.isStringLiteral(v)&&/[가-힣]/.test(v.text))texts.add(plain(v.text));ts.forEachChild(v,strings);}strings(a);}ts.forEachChild(n,visit);}visit(source);}}}
sourceScan('src');
const missing=[...texts].filter(s=>['en','ja','zh'].some(l=>!dict[s]?.[l]));
const illustrations={};
if(fs.existsSync('/tmp/triz-standards-ocr.json'))for(const row of read('/tmp/triz-standards-ocr.json')){
 if(row.error)throw Error(row.path+': '+row.error);
 const labels=row.labels.filter(l=>/[가-힣]/.test(l.text)).map(l=>({...l,fontHeight:l.height,text:plain(fix(l.text))}));
 for(const l of labels)if(['en','ja','zh'].some(lang=>!dict[l.text]?.[lang])&&!missing.includes(l.text))missing.push(l.text);
 illustrations[row.path.replace('assets/content/','/assets/')]={labels};
}
console.log(JSON.stringify({missing,panels,illustrations,dictionary:dict}));
