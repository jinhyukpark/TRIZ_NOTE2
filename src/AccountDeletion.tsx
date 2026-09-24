import React,{useState} from 'react';
import {View,TextInput,Alert,Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from './ContentText';
import {Button} from './components';
import {s,colors} from './theme';
import {supabase} from './lib/supabase';
import {appleCredential} from './lib/appleAuth';
import {releaseConfig} from './lib/releaseConfig';
import {ManageSubscription,useLegalLink} from './LegalLinks';
import {complianceCopy as copy} from './locales/compliance';
import {useLanguage} from './i18n';
export default function AccountDeletion(){
 const{locale}=useLanguage();const open=useLegalLink();
 const [expanded,setExpanded]=useState(false),[password,setPassword]=useState(''),[busy,setBusy]=useState(false),[apple,setApple]=useState(false);
 async function begin(){try{const{data:{user},error}=await supabase.auth.getUser();if(error||!user)throw Error();setApple(!!user.identities?.some(i=>i.provider==='apple'));setExpanded(true);}catch{Alert.alert('TRIZ Note',copy.failed[locale]);}}
 async function remove(){
  setBusy(true);
  try{
   const {data:{user},error}=await supabase.auth.getUser();if(error||!user)throw Error();
   const appleCode=apple?(await appleCredential()).credential.authorizationCode:undefined;
   const {data,error:failure}=await supabase.functions.invoke('delete-account',{body:{confirmation:'DELETE_MY_ACCOUNT',password:apple?undefined:password,appleCode}});
   if(failure||data?.deleted!==true)throw Error();
   const keys=(await AsyncStorage.getAllKeys()).filter(k=>k.startsWith(`triz:application:v1:${user.id}:`));
   try{await AsyncStorage.multiRemove(keys);}finally{await supabase.auth.signOut({scope:'local'});}
  }catch(e){if((e as {code?:string})?.code!=='ERR_REQUEST_CANCELED')Alert.alert('TRIZ Note',copy.failed[locale]);}
  finally{setBusy(false);setPassword('');}
 }
 return <View style={{gap:10}}><Button secondary disabled={busy} title={copy.delete[locale]} onPress={()=>void begin()}/>{expanded&&<View style={s.card}>
  <Text style={s.heading}>{copy.delete[locale]}</Text><Text style={s.text}>{copy.deleteInfo[locale]}</Text><Text style={s.text}>{copy.deleteBilling[locale]}</Text><ManageSubscription/>
  {apple?<Text style={s.muted}>{copy.appleDelete[locale]}</Text>:<TextInput accessibilityLabel={copy.password[locale]} placeholder={copy.password[locale]} placeholderTextColor={colors.muted} secureTextEntry autoCapitalize="none" autoComplete="current-password" value={password} onChangeText={setPassword} style={s.input}/>}
  {apple&&Platform.OS!=='ios'?<Button title={copy.webDelete[locale]} onPress={()=>void open(releaseConfig.deletion)}/>:<Button disabled={busy||(!apple&&!password)} title={copy.confirm[locale]} onPress={()=>Alert.alert(copy.delete[locale],copy.deleteInfo[locale],[{text:copy.cancel[locale],style:'cancel'},{text:copy.confirm[locale],style:'destructive',onPress:()=>void remove()}])}/>}
  <Button secondary disabled={busy} title={copy.cancel[locale]} onPress={()=>{setExpanded(false);setPassword('');}}/>
 </View>}</View>;
}
