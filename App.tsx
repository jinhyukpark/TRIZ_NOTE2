import React,{useEffect,useState} from 'react';
import {ActivityIndicator,AppState,BackHandler,View,Text,ScrollView,Pressable,Alert} from 'react-native';
import {SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import * as Linking from 'expo-linking';
import type {Session} from '@supabase/supabase-js';
import {supabase} from './src/lib/supabase';
import {handleAuthLink} from './src/lib/auth';
import {useLearning} from './src/lib/learning';
import {LocaleProvider,useLanguage,languages,Locale} from './src/i18n';
import {s,colors} from './src/theme';
import {Button} from './src/components';
import Auth from './src/screens/Auth';
import Library from './src/screens/Library';
import Detail from './src/screens/Detail';
import Knowledge,{Collection} from './src/screens/Knowledge';
import Matrix from './src/screens/Matrix';
import Store from './src/screens/Store';
import Home from './src/screens/Home';
import SubscriptionGate from './src/SubscriptionGate';
import {useSubscription} from './src/lib/useSubscription';
import AccountDeletion from './src/AccountDeletion';
import LegalLinks from './src/LegalLinks';
import SettingsSubscription from './src/SettingsSubscription';
import Effects from './src/screens/Effects';
import TabIcon,{type TabIconName} from './src/TabIcon';
export default function App(){return <SafeAreaProvider><LocaleProvider><Main/></LocaleProvider></SafeAreaProvider>;}
function Main(){
 const{t,locale,setLocale}=useLanguage();
 const [session,setSession]=useState<Session|null>(null),[loading,setLoading]=useState(true),[recovery,setRecovery]=useState(false);
 const[guest,setGuest]=useState(false),[tab,setTab]=useState('home'),[detail,setDetail]=useState<number|null>(null),[collection,setCollection]=useState<Collection|null>(null);
 const [effect,setEffect]=useState<string|null>(null);
 const billingEnabled=process.env.EXPO_PUBLIC_IAP_ENABLED==='true';
 const subscription=useSubscription(session?.user.id);
 const gated=billingEnabled&&((detail!==null&&detail!==1)||collection!==null||(tab==='effects'&&effect!==null)||tab==='matrix');
 const learning=useLearning(session?.user.id);
 useEffect(()=>{
 let live=true;supabase.auth.getSession().then(({data,error})=>{if(live){if(error)Alert.alert('TRIZ Note',error.message);setSession(data.session);setLoading(false);}}).catch(e=>{if(live){setLoading(false);Alert.alert('TRIZ Note',e.message);}});
 const{data:{subscription}}=supabase.auth.onAuthStateChange((event,next)=>{setSession(next);if(event==='PASSWORD_RECOVERY')setRecovery(true);if(event==='SIGNED_OUT'){setDetail(null);setCollection(null);setTab('home');setGuest(false);}});
 const state=AppState.addEventListener('change',x=>{if(x==='active')supabase.auth.startAutoRefresh();else supabase.auth.stopAutoRefresh();});
 supabase.auth.startAutoRefresh();
 const link=(url:string)=>{void handleAuthLink(url).catch(e=>Alert.alert('TRIZ Note',e.message));};
 void Linking.getInitialURL().then(url=>{if(url)link(url)});
 const links=Linking.addEventListener('url',e=>link(e.url));
 return()=>{live=false;subscription.unsubscribe();state.remove();links.remove();supabase.auth.stopAutoRefresh();};
 },[]);
 useEffect(()=>{const sub=BackHandler.addEventListener('hardwareBackPress',()=>{if(effect){setEffect(null);return true}if(detail){setDetail(null);return true}if(collection){setCollection(null);return true}if(tab==='saved'){setTab('account');return true}if(tab!=='home'){setTab('home');return true}return false});return()=>sub.remove();},[detail,collection,tab,effect]);
 function navigate(next:string){setEffect(null);setDetail(null);setCollection(null);setTab(next);}
 if(loading)return <SafeAreaView style={[s.root,{justifyContent:'center'}]}><ActivityIndicator color={colors.lime}/></SafeAreaView>;
 if(recovery||!session||session.user.is_anonymous)return <SafeAreaView style={s.root}><StatusBar style="light"/><Auth recovery={recovery} onRecovered={()=>setRecovery(false)}/></SafeAreaView>;
 return <SafeAreaView style={s.root}><StatusBar style="light"/>{!detail&&!(tab==='effects'&&effect)&&<View style={[s.between,{flexWrap:'wrap',paddingHorizontal:20,paddingVertical:12,borderBottomWidth:1,borderColor:colors.line}]}><View style={s.row}><View style={{width:30,height:32,backgroundColor:colors.lime,alignItems:'center',justifyContent:'center',borderBottomRightRadius:10}}><Text style={{fontSize:12,fontWeight:'900',color:colors.bg}}>TR</Text></View><Text style={{color:colors.ink,fontSize:15,fontWeight:'900',letterSpacing:2}}>TRIZ <Text style={{color:colors.lime}}>NOTE</Text></Text></View><Pressable accessibilityRole="button" onPress={()=>navigate('account')} style={{padding:12}}><Text style={{color:colors.ink}}>{t('설정')} ⚙</Text></Pressable></View>}
 {!!learning.error&&<View style={{padding:12}}><Text style={s.error}>{t('동기화 실패')}: {learning.error}</Text><Button secondary title={t('재시도')} onPress={()=>void learning.refresh()}/></View>}
 <View style={{flex:1}}>
 {gated&&!subscription.active?<SubscriptionGate loading={subscription.loading} error={subscription.error} onRetry={()=>void subscription.refresh().catch(()=>{})} onBack={()=>navigate('home')} onSubscribe={()=>session?navigate('store'):navigate('account')}/>:detail?<Detail key={detail} id={detail} userId={session?.user.id} saved={learning.bookmarks.includes(detail)} done={learning.completed.includes(detail)} busy={learning.busy} onSave={()=>void learning.toggle('bookmarks',detail)} onDone={()=>void learning.toggle('learning_progress',detail)} onBack={()=>setDetail(null)} onNext={()=>setDetail(detail%40+1)}/>:collection?<Knowledge collection={collection} onBack={()=>setCollection(null)}/>:tab==='principles'||tab==='saved'?<View style={{flex:1}}>{tab==='saved'&&<View style={{paddingHorizontal:20,paddingTop:12}}><Button secondary title={'← '+t('마이페이지')} onPress={()=>navigate('account')}/></View>}<Library saved={tab==='saved'} bookmarks={learning.bookmarks} onOpen={setDetail}/></View>:tab==='effects'?<Effects selected={effect} onSelect={setEffect}/>:tab==='matrix'?<Matrix onOpen={setDetail}/>:tab==='store'&&session?<Store userId={session.user.id}/>:tab==='account'?<ScrollView contentContainerStyle={s.page}><Text style={s.title}>{t('마이페이지')}</Text><Button secondary title={`${t('저장한 원리')} · ${learning.bookmarks.length} →`} onPress={()=>navigate('saved')}/><Text style={s.muted}>{session?.user.email??t('로그인하면 학습 기록을 동기화할 수 있습니다.')}</Text><SettingsSubscription signedIn={!!session} active={subscription.active} loading={subscription.loading} error={subscription.error} expires={subscription.expires} onOpen={()=>session?navigate('store'):setGuest(false)}/><LegalLinks/>{session&&<AccountDeletion/>}<Text style={s.heading}>{t('언어')}</Text>{Object.entries(languages).map(([l,label])=><Button key={l} title={label} secondary={locale!==l} onPress={()=>setLocale(l as Locale)}/>)}{session?<><Button title={t('결제 및 이용권')} onPress={()=>navigate('store')}/><Button secondary title={t('로그아웃')} onPress={()=>{void supabase.auth.signOut().then(({error})=>{if(error)Alert.alert('TRIZ Note',error.message)})}}/></>:<Button title={t('로그인')} onPress={()=>setGuest(false)}/>}</ScrollView>:<Home completed={learning.completed} bookmarks={learning.bookmarks} onOpen={setDetail} onExplore={()=>navigate('principles')} onSolve={()=>navigate('matrix')} onCollection={setCollection}/>}
 </View><View style={[s.row,{gap:0,borderTopWidth:1,borderColor:colors.line}]}>{[['home','오늘'],['principles','원리'],['effects','Effects'],['matrix','모순']].map(([key,label])=>{const active=tab===key&&!detail&&!collection;const color=active?colors.lime:colors.muted;return <Pressable key={key} accessibilityRole="tab" accessibilityLabel={t(label)} accessibilityState={{selected:active}} onPress={()=>navigate(key)} style={[s.tab,{gap:6,borderTopWidth:2,borderTopColor:active?colors.lime:'transparent'}]}><TabIcon name={key as TabIconName} color={color}/><Text style={{color,fontSize:11,fontWeight:active?'700':'500'}}>{t(label)}</Text></Pressable>;})}</View>
 </SafeAreaView>;
}
