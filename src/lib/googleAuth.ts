import * as WebBrowser from 'expo-web-browser';
import {Platform} from 'react-native';
import {supabase} from './supabase';
import {redirectTo,handleAuthLink} from './auth';

async function androidAuthOptions() {
 if(Platform.OS!=='android')return {};
 try{
  const browsers=await WebBrowser.getCustomTabsSupportingBrowsersAsync();
  // Keep the OAuth flow on a consistent Custom Tabs provider when Android has
  // multiple browsers installed. Prefer Chrome, then use the device fallback.
  const browserPackage=browsers.servicePackages.includes('com.android.chrome')
   ?'com.android.chrome'
   :browsers.preferredBrowserPackage??browsers.defaultBrowserPackage??browsers.servicePackages[0];
  return {browserPackage,createTask:false,showInRecents:false};
 }catch{
  return {createTask:false,showInRecents:false};
 }
}

export async function signInWithGoogle(){
 const {data,error}=await supabase.auth.signInWithOAuth({provider:'google',options:{redirectTo,skipBrowserRedirect:true}});
 if(error)throw error;
 if(!data.url)throw new Error('GOOGLE_AUTH_URL_MISSING');
 const result=await WebBrowser.openAuthSessionAsync(data.url,redirectTo,await androidAuthOptions());
 if(result.type==='success')await handleAuthLink(result.url);
}
