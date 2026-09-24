import {supabase} from './supabase';
import {effects,type Effect} from '../data/effects';
import {scientificArtwork} from '../data/scientificArtwork';
import {featuredEffects} from '../data/featuredEffects';
import {effectCallouts} from '../data/effectCallouts';
import {effectCatalog,effectFields,effectKinds,effectFunctions} from '../data/effectCatalog';
import {remoteEffectDiagrams} from '../data/remoteEffectDiagrams';
import {localEffectImages} from '../data/localEffectImages';
const locales=['ko','en','ja','zh'];
const text=(v:any)=>v&&locales.every(l=>typeof v[l]==='string'&&v[l].trim().length>0);
const point=(v:any)=>v&&Number.isFinite(v.x)&&Number.isFinite(v.y)&&v.x>=0&&v.x<=100&&v.y>=0&&v.y<=100;
const image=(v:any)=>v&&typeof v.uri==='string'&&v.uri.startsWith(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/effect-content/`)&&Number.isFinite(v.width)&&v.width>0&&Number.isFinite(v.height)&&v.height>0;
/** Reject incomplete revisions atomically; retain the working bundled version. */
export function validEffectPayload(p:any):boolean{
 if(!p||!localEffectImages[p.id]||!text(p.title)||!text(p.summary)||!Array.isArray(p.steps)||p.steps.length!==5)return false;
 if(!p.steps.every((s:any)=>['label','title','body','keyPoint'].every(k=>text(s[k]))))return false;
 if(!p.featured||!image(p.featured.image)||!Array.isArray(p.featured.labels)||!p.featured.labels.every((l:any)=>point(l)&&point(l.target)&&text(l.text)&&l.width>0&&l.x+l.width<=100))return false;
 const a=p.artwork;if(!a||!Array.isArray(a.images)||a.images.length!==5||!a.images.every(image)||!Array.isArray(a.tags)||a.tags.length!==5||!Array.isArray(a.callouts)||a.callouts.length!==5)return false;
 if(!a.tags.every((tags:any,i:number)=>Array.isArray(tags)&&Array.isArray(a.callouts[i])&&tags.length===a.callouts[i].length&&tags.every((t:any)=>text(t.name)&&text(t.role))&&a.callouts[i].every((c:any)=>point(c)&&point(c.target)&&c.width>0&&c.x+c.width<=100)))return false;
 return Array.isArray(p.diagrams)&&p.diagrams.length===5&&p.diagrams.every((d:any)=>Array.isArray(d.shapes)&&d.shapes.length>0&&d.shapes.length<2000&&(d.caption===null||text(d.caption))&&d.shapes.every((s:any)=>['line','dot','rect','text'].includes(s.kind)&&Number.isFinite(s.x)&&Number.isFinite(s.y)&&['x2','y2','w','h','r','thick'].every(k=>s[k]===undefined||Number.isFinite(s[k]))));
}
export async function refreshEffectContent(){
 const {data,error}=await supabase.from('effect_content').select('id,schema_version,payload').eq('published',true).abortSignal(AbortSignal.timeout(15000));
 if(error)throw error;
 let count=0;
 for(const row of data??[]){
  const p=row.payload;if(row.schema_version!==1||row.id!==p?.id||!validEffectPayload(p))continue;
  const at=effects.findIndex(e=>e.id===p.id);if(at<0)continue;
  effects[at]={id:p.id,title:p.title,summary:p.summary,steps:p.steps} as Effect;
  scientificArtwork[p.id]={images:p.artwork.images,tags:p.artwork.tags};
  featuredEffects[p.id]=p.featured;effectCallouts[p.id]=p.artwork.callouts;
  // The classification vocabulary is compiled into this app; do not accept unknown values.
  const c=p.catalog;
  if(c&&c.kind in effectKinds&&c.primaryField in effectFields&&Array.isArray(c.relatedFields)&&c.relatedFields.every((v:string)=>v in effectFields)&&Array.isArray(c.functions)&&c.functions.every((v:string)=>v in effectFunctions)&&Array.isArray(c.foundations)&&c.foundations.every((f:any)=>text(f.title)&&(!f.effectId||effects.some(e=>e.id===f.effectId)))&&(!c.title||text(c.title)))effectCatalog[p.id]=c;
  remoteEffectDiagrams[p.id]=p.diagrams;count++;
 }
 return count;
}
