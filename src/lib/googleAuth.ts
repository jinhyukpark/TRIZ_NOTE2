import * as WebBrowser from 'expo-web-browser';
import {supabase} from './supabase';
import {redirectTo,handleAuthLink} from './auth';
export async function signInWithGoogle(){
 const {data,error}=await supabase.auth.signInWithOAuth({provider:'google',options:{redirectTo,skipBrowserRedirect:true}});
 if(error)throw error;
 if(!data.url)throw new Error('GOOGLE_AUTH_URL_MISSING');
 const result=await WebBrowser.openAuthSessionAsync(data.url,redirectTo);
 if(result.type==='success')await handleAuthLink(result.url);
}
