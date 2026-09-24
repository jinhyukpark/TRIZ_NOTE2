import React from 'react';
import {View,Alert,Linking,Platform} from 'react-native';
import {Button} from './components';
import {useLanguage} from './i18n';
import {releaseConfig,isPublicHttps} from './lib/releaseConfig';
import {complianceCopy as copy} from './locales/compliance';
export function useLegalLink(){const{locale}=useLanguage();return async(url:string)=>{try{if(!isPublicHttps(url))throw Error();await Linking.openURL(url);}catch{Alert.alert('TRIZ Note',copy.unavailable[locale]);}};}
export function ManageSubscription(){const{locale}=useLanguage();const open=useLegalLink();return <Button secondary title={copy.manage[locale]} onPress={()=>void open(Platform.OS==='ios'?'https://apps.apple.com/account/subscriptions':'https://play.google.com/store/account/subscriptions')}/>;}
export default function LegalLinks(){const{locale}=useLanguage();const open=useLegalLink();return <View style={{gap:8}}>{(['privacy','terms','support'] as const).map(key=><Button key={key} secondary title={copy[key][locale]} onPress={()=>void open(releaseConfig[key])}/>)}</View>;}
