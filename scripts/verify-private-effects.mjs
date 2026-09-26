import {execFileSync} from 'node:child_process';
import {createClient} from '@supabase/supabase-js';
const ref='sovzalkrotgvnqvpfkjd',url=`https://${ref}.supabase.co`;
const keys=JSON.parse(execFileSync('supabase',['projects','api-keys','--project-ref',ref,'--reveal','--output','json'],{encoding:'utf8',stdio:['ignore','pipe','pipe']}));
const list=Array.isArray(keys)?keys:keys.api_keys??keys.keys??[];
const secret=list.find(k=>k.name==='service_role')?.api_key,pub=list.find(k=>k.name==='anon')?.api_key;
if(!secret||!pub)throw Error('Verification credentials unavailable');
const admin=createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}});
const {data:bucket}=await admin.storage.getBucket('effect-content');if(bucket?.public!==false)throw Error('Bucket is public');
const {data:rows,error}=await admin.from('effect_content').select('id,payload').eq('published',true);
if(error||rows?.length!==31)throw Error('Expected 31 Effects');
const sample=rows.find(r=>r.id==='adhesive-bonding').payload.featured.image.uri;
const path=sample.split('/effect-content/')[1];
const request=async(name,uri,options={})=>{const r=await fetch(uri,options);await r.arrayBuffer();console.log(`${name}: HTTP ${r.status}`);return r.status;};
for(const [name,uri] of [['new public image',sample.replace('/authenticated/','/public/')],['previous public image',sample.replace('/authenticated/','/public/').replace('/private-v1/','/expansion-v1/')]]){
 const status=await request(name,uri);if(status<400)throw Error(`${name} is still accessible`);
}
if(await request('anonymous content API',url+'/rest/v1/effect_content?select=id',{headers:{apikey:pub}})<400)throw Error('Anonymous table access allowed');
for(const [name,headers] of [['unauthenticated',{}],['anonymous token',{Authorization:'Bearer '+pub}],['forged token',{Authorization:'Bearer invalid'}]]){
 const status=await request(name+' Edge Function',url+'/functions/v1/effects-content',{method:'POST',headers:{apikey:pub,'Content-Type':'application/json',...headers},body:'{}'});if(status!==401)throw Error('Unauthorized function access not rejected');
}
const {data:signed,error:signError}=await admin.storage.from('effect-content').createSignedUrl(path,30);
if(signError||await request('private signed image',signed.signedUrl)!==200)throw Error('Signed download failed');
console.log(`Verified private bucket, ${rows.length} Effects, ${rows.reduce((n,r)=>n+r.payload.steps.length,0)} stages; no public access.`);
