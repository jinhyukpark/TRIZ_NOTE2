import {Image,type ImageSourcePropType} from 'react-native';
import {supabase} from './supabase';
import {effects,type Effect} from '../data/effects';
import {scientificArtwork} from '../data/scientificArtwork';
import {featuredEffects} from '../data/featuredEffects';
import {effectCallouts} from '../data/effectCallouts';
import {effectCatalog,effectFields,effectKinds,effectFunctions} from '../data/effectCatalog';
import {remoteEffectDiagrams} from '../data/remoteEffectDiagrams';
import {localEffectImages} from '../data/localEffectImages';
import {legacyEffectArtwork,remoteLegacyArtwork} from '../data/legacyEffectArtwork';
const locales=['ko','en','ja','zh'];
const text=(v:any)=>v&&locales.every(l=>typeof v[l]==='string'&&v[l].trim().length>0);
const point=(v:any)=>v&&Number.isFinite(v.x)&&Number.isFinite(v.y)&&v.x>=0&&v.x<=100&&v.y>=0&&v.y<=100;
const image=(v:any)=>v&&typeof v.uri==='string'&&['authenticated','sign'].some(mode=>v.uri.startsWith(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/${mode}/effect-content/`))&&Number.isFinite(v.width)&&v.width>0&&Number.isFinite(v.height)&&v.height>0;
/** Reject incomplete revisions atomically; retain the working bundled version. */
export function validEffectPayload(p:any):boolean{
 if(!p||!localEffectImages[p.id]||!text(p.title)||!text(p.summary)||!Array.isArray(p.steps)||p.steps.length!==5)return false;
 if(!p.steps.every((s:any)=>['label','title','body','keyPoint'].every(k=>text(s[k]))))return false;
 if(!p.featured||!image(p.featured.image)||!Array.isArray(p.featured.labels)||!p.featured.labels.every((l:any)=>point(l)&&(l.target===undefined||point(l.target))&&text(l.text)&&l.width>0&&l.x+l.width<=100))return false;
 if(p.renderer==='legacy'){
  const a=p.artwork;
  if(a?.explanationLabels!==undefined&&(!Array.isArray(a.explanationLabels)||a.explanationLabels.length!==5||!a.explanationLabels.every((ls:any)=>Array.isArray(ls)&&ls.length>0&&ls.length<100&&ls.every((l:any)=>text(l.text)&&['x','y','width','height','fontHeight'].every(k=>Number.isFinite(l[k])&&l[k]>=0&&l[k]<=1)&&l.width>0&&l.height>0&&l.fontHeight>0&&l.x+l.width<=1.001&&l.y+l.height<=1.001))))return false;
  const labels=(ls:any)=>Array.isArray(ls)&&ls.length>0&&ls.every((l:any)=>typeof l.number==='string'&&text(l.text));
  return !!legacyEffectArtwork[p.id]&&a&&Array.isArray(a.portraits)&&a.portraits.length===5&&a.portraits.every(image)&&Array.isArray(a.panels)&&a.panels.length===5&&a.panels.every(image)&&labels(a.labels)&&(!a.labelsByStage||(Array.isArray(a.labelsByStage)&&a.labelsByStage.length===5&&a.labelsByStage.every(labels)))&&Number.isFinite(a.explanationStart)&&a.explanationStart>0&&a.explanationStart<1&&(a.explanationEnd===undefined||(a.explanationEnd>a.explanationStart&&a.explanationEnd<=1))&&Array.isArray(a.callouts)&&a.callouts.length===5&&a.callouts.every((cs:any,i:number)=>Array.isArray(cs)&&cs.length===(a.labelsByStage?.[i]??a.labels).length&&cs.every((c:any)=>point(c)&&point(c.target)&&c.width>0&&c.x+c.width<=100));
 }
 const a=p.artwork;if(!a||!Array.isArray(a.images)||a.images.length!==5||!a.images.every(image)||!Array.isArray(a.tags)||a.tags.length!==5||!Array.isArray(a.callouts)||a.callouts.length!==5)return false;
 if(!a.tags.every((tags:any,i:number)=>Array.isArray(tags)&&Array.isArray(a.callouts[i])&&tags.length===a.callouts[i].length&&tags.every((t:any)=>text(t.name)&&text(t.role))&&a.callouts[i].every((c:any)=>point(c)&&point(c.target)&&c.width>0&&c.x+c.width<=100)))return false;
 if(p.renderer==='native-science')return ['skin-depth','hydrogenation'].includes(p.id);
 return Array.isArray(p.diagrams)&&p.diagrams.length===5&&p.diagrams.every((d:any)=>Array.isArray(d.shapes)&&d.shapes.length>0&&d.shapes.length<2000&&(d.caption===null||text(d.caption))&&d.shapes.every((s:any)=>['line','dot','rect','text'].includes(s.kind)&&Number.isFinite(s.x)&&Number.isFinite(s.y)&&['x2','y2','w','h','r','thick'].every(k=>s[k]===undefined||Number.isFinite(s[k]))));
}
let revision=0;
export function clearEffectAccess(){
 revision++;
 for(const [id,local] of Object.entries(localEffectImages)){
  featuredEffects[id]={...featuredEffects[id],image:local.featured};
  if(scientificArtwork[id])scientificArtwork[id]={...scientificArtwork[id],images:[...local.images]};
  delete remoteLegacyArtwork[id];delete remoteEffectDiagrams[id];
 }
}
function remoteUri(source:ImageSourcePropType|undefined){
 return source&&typeof source==='object'&&'uri' in source&&typeof source.uri==='string'?source.uri:null;
}
/** Warm only the requested apparatus image so competing downloads do not delay it. */
export function prefetchEffectStage(id:string,index=0){
 const source=scientificArtwork[id]?.images[index]??remoteLegacyArtwork[id]?.portraits[index];
 const uri=remoteUri(source);
 return uri?Image.prefetch(uri).catch(()=>false):Promise.resolve(false);
}
export async function refreshEffectContent(){
 const requestedRevision=++revision;
 const {data:response,error}=await supabase.functions.invoke('effects-content',{body:{},timeout:15000});
 if(error)throw error;
 if(requestedRevision!==revision)throw Error('STALE_ACCESS');
 const data=response?.rows,expiresAt=response?.expiresAt;
 if(!Array.isArray(data)||data.length!==effects.length||!Number.isFinite(expiresAt)||expiresAt<=Date.now()||expiresAt>Date.now()+301000)throw Error('INVALID_CONTENT_LEASE');
 // Validate the complete response before modifying shared data. Never fall back to bundled paid content.
 for(const row of data){
  if(row.schema_version!==1||row.id!==row.payload?.id||!validEffectPayload(row.payload))throw Error('INVALID_CONTENT');
  const check=(v:any)=>{if(!v||typeof v!=='object')return;if(typeof v.uri==='string'&&(!v.uri.startsWith(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/sign/effect-content/`)||!v.uri.includes('?token=')))throw Error('UNSIGNED_IMAGE');for(const child of Object.values(v))check(child);};check(row.payload);
 }
 if(new Set(data.map((r:any)=>r.id)).size!==effects.length)throw Error('DUPLICATE_CONTENT');
 let count=0;
 for(const row of data??[]){
  const p=row.payload;if(row.schema_version!==1||row.id!==p?.id||!validEffectPayload(p))continue;
  const at=effects.findIndex(e=>e.id===p.id);if(at<0)continue;
  effects[at]={id:p.id,title:p.title,summary:p.summary,steps:p.steps} as Effect;
  if(p.renderer==='legacy')remoteLegacyArtwork[p.id]=p.artwork;
  else scientificArtwork[p.id]={images:p.artwork.images,tags:p.artwork.tags};
  featuredEffects[p.id]=p.featured;effectCallouts[p.id]=p.artwork.callouts;
  // The classification vocabulary is compiled into this app; do not accept unknown values.
  const c=p.catalog;
  if(c&&c.kind in effectKinds&&c.primaryField in effectFields&&Array.isArray(c.relatedFields)&&c.relatedFields.every((v:string)=>v in effectFields)&&Array.isArray(c.functions)&&c.functions.every((v:string)=>v in effectFunctions)&&Array.isArray(c.foundations)&&c.foundations.every((f:any)=>text(f.title)&&(!f.effectId||effects.some(e=>e.id===f.effectId)))&&(!c.title||text(c.title)))effectCatalog[p.id]=c;
  if(p.diagrams)remoteEffectDiagrams[p.id]=p.diagrams;count++;
 }
 return {count,expiresAt};
}
