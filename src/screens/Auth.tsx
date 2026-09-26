import React,{useState} from 'react';
import {View,Text,TextInput,KeyboardAvoidingView,Platform,ScrollView,Alert} from 'react-native';
import {s,colors} from '../theme';
import {Button} from '../components';
import {supabase} from '../lib/supabase';
import {redirectTo} from '../lib/auth';
import {signInWithGoogle} from '../lib/googleAuth';
import {useLanguage,languages,Locale} from '../i18n';
import AppleLogin from '../AppleLogin';
import LegalLinks,{ManageSubscription} from '../LegalLinks';
import {complianceCopy as copy} from '../locales/compliance';
import BrandLogo from '../BrandLogo';
export default function Auth({recovery,onRecovered}:{recovery:boolean;onRecovered:()=>void}){
 const {t,locale,setLocale}=useLanguage();
 const [mode,setMode]=useState<'login'|'signup'>('login');
 const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState('');
 async function submit(){
 setBusy(true);setError('');
 try {
 if(recovery){const{error}=await supabase.auth.updateUser({password});if(error)throw error;onRecovered();return;}
 if(mode==='login'){const{error}=await supabase.auth.signInWithPassword({email:email.trim(),password});if(error)throw error;}
 else{const{data,error}=await supabase.auth.signUp({email:email.trim(),password,options:{emailRedirectTo:redirectTo}});if(error)throw error;if(!data.session)Alert.alert(t('이메일 확인'),t('이메일의 인증 링크를 눌러 가입을 완료하세요.')); }
 }catch(e){setError(e instanceof Error?e.message:t('다시 시도해주세요.'));}finally{setBusy(false);}
 }
 async function reset(){
 setBusy(true);setError('');
 try{const{error}=await supabase.auth.resetPasswordForEmail(email.trim(),{redirectTo});if(error)throw error;Alert.alert(t('이메일 확인'),t('비밀번호 재설정 링크를 보냈습니다.'));}
 catch(e){setError(e instanceof Error?e.message:t('다시 시도해주세요.'));}finally{setBusy(false);}
 }
 return <KeyboardAvoidingView style={s.root} behavior={Platform.OS==='ios'?'padding':undefined}><ScrollView contentContainerStyle={[s.page,{paddingTop:48}]} keyboardShouldPersistTaps="handled">
 <BrandLogo large/><Text style={[s.title,{fontSize:40}]}>Think different.{'\n'}Build better.</Text><Text style={s.muted}>{t('학습 기록을 이어가세요')}</Text>
 <View style={s.card}><Text style={s.heading}>{t(recovery?'새 비밀번호':mode==='login'?'로그인':'회원가입')}</Text>
 {!recovery&&<TextInput accessibilityLabel={t('이메일')} placeholder="you@example.com" placeholderTextColor={colors.muted} autoCapitalize="none" keyboardType="email-address" autoComplete="email" value={email} onChangeText={setEmail} style={s.input}/>}
 <TextInput accessibilityLabel={t('비밀번호')} placeholder={t('비밀번호 (8자 이상)')} placeholderTextColor={colors.muted} secureTextEntry autoCapitalize="none" autoComplete={mode==='signup'||recovery?'new-password':'current-password'} value={password} onChangeText={setPassword} style={s.input}/>
 {!!error&&<Text accessibilityRole="alert" style={s.error}>{error}</Text>}
 <Button title={t(busy?'처리 중…':recovery?'비밀번호 변경':mode==='login'?'로그인':'회원가입')} disabled={busy||password.length<(mode==='login'&&!recovery?1:8)||(!recovery&&!email.includes('@'))} onPress={()=>void submit()}/>
 {!recovery&&<><Button secondary disabled={busy} title={t(mode==='login'?'회원가입':'로그인')} onPress={()=>{setMode(mode==='login'?'signup':'login');setError('');}}/><Button secondary disabled={busy||!email.includes('@')} title={t('비밀번호 재설정')} onPress={()=>void reset()}/></>}
 </View><View style={[s.row,{flexWrap:'wrap'}]}>{Object.entries(languages).map(([l,label])=><Button key={l} title={label} secondary={l!==locale} onPress={()=>setLocale(l as Locale)}/>)}</View>
 {!recovery&&<><Button secondary disabled={busy} title={({ko:'Google로 계속하기',en:'Continue with Google',ja:'Googleで続ける',zh:'使用 Google 继续'})[locale]} onPress={()=>{setBusy(true);setError('');void signInWithGoogle().catch(()=>setError(copy.failed[locale])).finally(()=>setBusy(false));}}/><AppleLogin disabled={busy}/><Text style={s.muted}>{copy.legalHint[locale]}</Text><LegalLinks/><ManageSubscription/></>}
 <Text style={s.muted}>{t('계정은 Supabase로 안전하게 관리됩니다.')}</Text>
 </ScrollView></KeyboardAvoidingView>;
}
