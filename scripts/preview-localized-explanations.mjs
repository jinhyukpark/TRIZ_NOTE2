// Local-only visual QA of the same source coordinates and font fitting used by RN.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const root=path.resolve(import.meta.dirname,'..');
const labels=JSON.parse(fs.readFileSync(path.join(root,'src/data/effectExplanationLabels.json'),'utf8'));
const module={exports:{}};
new Function('exports',ts.transpileModule(fs.readFileSync(path.join(root,'src/layout.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(module.exports);
const {fitDiagramLabel}=module.exports;
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
http.createServer((req,res)=>{
 const url=new URL(req.url,'http://127.0.0.1:8796');
 const file=url.searchParams.get('file')??'01_pressure_wave-clean-v2.png';
 if(!labels[file]){res.writeHead(404);res.end();return;}
 const bytes=fs.readFileSync(path.join(root,'assets/content/effects',file));
 if(url.pathname==='/image'){res.setHeader('Content-Type','image/png');res.end(bytes);return;}
 const width=[320,390,430].includes(Number(url.searchParams.get('width')))?Number(url.searchParams.get('width')):390;
 const start=.68,end=.997,fullWidth=width/(end-start),height=fullWidth*bytes.readUInt32BE(20)/bytes.readUInt32BE(16);
 const cards=['ko','en','ja','zh'].map(locale=>`<section><h2>${locale} · ${width}px</h2><div style="position:relative;width:${width}px;height:${height}px;overflow:hidden;background:#06100e"><img src="/image?file=${file}" style="position:absolute;left:${-fullWidth*start}px;top:0;width:${fullWidth}px;height:${height}px">${locale==='ko'?'':labels[file].map(l=>{
  const maskLeft=Math.max(0,(l.x-start)*fullWidth-3),top=Math.max(0,l.y*height-3),maskWidth=Math.min(width-maskLeft,l.width*fullWidth+6),maskHeight=l.height*height+6;
  const standalone=l.y<.14||l.text.ko==='핵심 원리',center=l.x+l.width/2,neighbors=labels[file].filter(o=>o!==l&&Math.abs(o.y-l.y)<.025),spacing=Math.min(.10,...neighbors.map(o=>Math.abs(o.x+o.width/2-center)*.9)),textWidth=standalone?end-l.x-.015:Math.max(l.width,Math.min(.10,spacing));
  const left=standalone||l.width>.16||l.x>.90?maskLeft:Math.max(0,(center-textWidth/2-start)*fullWidth-3),w=Math.min(width-left,textWidth*fullWidth+6),h=maskHeight+(!standalone&&l.fontHeight<.045?8:0);
  const type=fitDiagramLabel(l.text[locale],w-4,h-2,l.fontHeight*height*.88);
  return `<div style="position:absolute;left:${maskLeft}px;top:${top}px;width:${maskWidth}px;height:${maskHeight}px;background:#06100e"></div><div style="position:absolute;left:${left}px;top:${top}px;width:${w}px;height:${h}px;box-sizing:border-box;padding:0 2px;display:flex;align-items:center;text-align:${!standalone&&l.width<.16?'center':'left'};font-size:${type.fontSize}px;line-height:${type.lineHeight}px;font-weight:${l.fontHeight>.045?700:500};color:${l.text.ko==='핵심 원리'?'#c5ff2c':'#f1f5ef'}">${escape(l.text[locale])}</div>`;
 }).join('')}</div></section>`).join('');
 res.setHeader('Content-Type','text/html; charset=utf-8');
 res.end(`<!doctype html><meta charset="utf-8"><title>Localization QA</title><style>body{background:#161c18;color:white;font-family:Arial,sans-serif;margin:16px}main{display:flex;gap:16px;flex-wrap:wrap}h2{font-size:16px}form{position:sticky;top:0;background:#161c18;padding:12px;z-index:1}</style><form><select name="file">${Object.keys(labels).map(f=>`<option ${f===file?'selected':''}>${f}</option>`).join('')}</select><select name="width">${[320,390,430].map(w=>`<option ${w===width?'selected':''}>${w}</option>`).join('')}</select><button>Preview</button></form><main>${cards}</main>`);
}).listen(8796,'127.0.0.1',()=>console.log('Local preview: http://127.0.0.1:8796'));
