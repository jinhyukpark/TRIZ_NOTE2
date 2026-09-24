import {supabase} from './supabase';
export const redirectTo='triznote://auth/callback';
const exchanges=new Map<string,Promise<void>>();
export async function handleAuthLink(url:string) {
 const parsed=new URL(url);
 if(parsed.protocol!=='triznote:'||parsed.host!=='auth'||parsed.pathname!=='/callback')return;
 const error=parsed.searchParams.get('error_description')||new URLSearchParams(parsed.hash.slice(1)).get('error_description'); if(error)throw new Error(error);
 const code=parsed.searchParams.get('code');
 if(code){
  // The browser result and OS deep-link listener can receive the same callback.
  if(!exchanges.has(code)){
   const task=(async()=>{const{error}=await supabase.auth.exchangeCodeForSession(code);if(error)throw error;})();
   exchanges.set(code,task);
   if(exchanges.size>20)exchanges.delete(exchanges.keys().next().value!);
  }
  await exchanges.get(code);
 }
}
