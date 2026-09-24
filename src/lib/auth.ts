import {supabase} from './supabase';
export const redirectTo='triznote://auth/callback';
export async function handleAuthLink(url:string) {
 if(!url.startsWith(redirectTo))return;
 const parsed=new URL(url);
 const error=parsed.searchParams.get('error_description'); if(error)throw new Error(error);
 const code=parsed.searchParams.get('code');
 if(code){const{error}=await supabase.auth.exchangeCodeForSession(code);if(error)throw error;}
}
