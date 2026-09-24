import React,{useEffect,useState} from 'react';
import {Platform,View,Alert} from 'react-native';
import {releaseConfig} from './lib/releaseConfig';
import {appleCredential} from './lib/appleAuth';
import {supabase} from './lib/supabase';
import {useLanguage} from './i18n';
import {complianceCopy as copy} from './locales/compliance';
export default function AppleLogin(){
 const{locale}=useLanguage();const [api,setApi]=useState<typeof import('expo-apple-authentication')|null>(null),[busy,setBusy]=useState(false);
 useEffect(()=>{let live=true;if(Platform.OS==='ios'&&releaseConfig.appleLogin)void import('expo-apple-authentication').then(async module=>{if(await module.isAvailableAsync()&&live)setApi(module);}).catch(()=>{});return()=>{live=false;};},[]);
 if(!api)return null;
 const NativeButton=api.AppleAuthenticationButton;
 return <View pointerEvents={busy?'none':'auto'} style={{opacity:busy?.5:1}}><NativeButton buttonType={api.AppleAuthenticationButtonType.SIGN_IN} buttonStyle={api.AppleAuthenticationButtonStyle.WHITE} cornerRadius={8} style={{height:48,width:'100%'}} onPress={()=>{if(busy)return;setBusy(true);void (async()=>{const{credential,nonce}=await appleCredential();const{error}=await supabase.auth.signInWithIdToken({provider:'apple',token:credential.identityToken!,nonce});if(error)throw error;})().catch(e=>{if(e?.code!=='ERR_REQUEST_CANCELED')Alert.alert('TRIZ Note',copy.failed[locale]);}).finally(()=>setBusy(false));}}/></View>;
}
