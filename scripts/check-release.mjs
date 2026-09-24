import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
// Validate only public configuration. Never print secret values.
for(const name of ['.env','.env.local']){
 const file=path.join(root,name);if(fs.existsSync(file)){
  for(const line of fs.readFileSync(file,'utf8').split('\n')){const match=line.match(/^([A-Z_]+)=(.*)$/);if(match&&!process.env[match[1]])process.env[match[1]]=match[2].replace(/^['"]|['"]$/g,'');}
 }
}
const failures=[];
for(const name of ['PRIVACY_URL','TERMS_URL','SUPPORT_URL','ACCOUNT_DELETION_URL']){
 try{const u=new URL(process.env['EXPO_PUBLIC_'+name]??'');if(u.protocol!=='https:'||u.username||u.password||u.hostname==='localhost')throw Error();}
 catch{failures.push('Set a live, public HTTPS page: EXPO_PUBLIC_'+name);}
}
for(const name of ['APPLE_ANNUAL_PRODUCT_ID','GOOGLE_ANNUAL_PRODUCT_ID','GOOGLE_ANNUAL_BASE_PLAN_ID'])if(!process.env['EXPO_PUBLIC_'+name])failures.push('Set EXPO_PUBLIC_'+name);
if(process.env.EXPO_PUBLIC_IAP_ENABLED!=='true')failures.push('IAP is not enabled. Enable only after sandbox and server lifecycle tests pass.');
for(const name of ['apple-notifications','google-notifications'])if(!fs.existsSync(path.join(root,'supabase/functions',name,'index.ts')))failures.push('Subscription renewal/refund/revocation handler not implemented: '+name);
console.log('Release checks (configuration only; not an approval guarantee):');
if(failures.length){for(const message of failures)console.log('BLOCKED: '+message);process.exitCode=1;}else console.log('Configuration checks passed. Complete STORE_RELEASE.md manual checks before submission.');
