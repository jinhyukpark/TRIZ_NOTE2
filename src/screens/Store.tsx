import React,{useEffect,useRef,useState} from 'react';
import {View,ScrollView,Platform} from 'react-native';
import Text from '../ContentText';
import {useIAP,getAvailablePurchases,finishTransaction,type Purchase,type ProductOrSubscription,ErrorCode} from 'expo-iap';
import {s} from '../theme';
import {Button} from '../components';
import {supabase} from '../lib/supabase';
import {useLanguage} from '../i18n';
import LegalLinks,{ManageSubscription} from '../LegalLinks';
import {releaseConfig,isPublicHttps} from '../lib/releaseConfig';
import {annualPlan} from '../lib/annualPlan';
import {useSubscription,subscriptionChanged} from '../lib/useSubscription';
import {complianceCopy as copy} from '../locales/compliance';
const enabled=process.env.EXPO_PUBLIC_IAP_ENABLED==='true';
const annualId=Platform.OS==='ios'?releaseConfig.appleAnnual:releaseConfig.googleAnnual;
export default function Store({userId}:{userId:string}){
 const {t,locale}=useLanguage();
 if(!enabled)return <ScrollView contentContainerStyle={s.page}><Text style={s.title}>{t('결제 및 이용권')}</Text><Text style={s.heading}>{copy.annual[locale]}</Text><Text style={s.text}>{copy.benefits[locale]}</Text><Text style={s.muted}>{t('스토어 상품과 서버 검증 설정 후 구매할 수 있습니다.')}</Text><ManageSubscription/><LegalLinks/></ScrollView>;
 return <ConnectedStore userId={userId}/>;
}
function ConnectedStore({userId}:{userId:string}){
 const{t,locale}=useLanguage(),[catalog,setCatalog]=useState<string[]>([]),[error,setError]=useState(''),[busy,setBusy]=useState(false),[message,setMessage]=useState('');
 const subscription=useSubscription(userId);
 const inFlight=useRef(new Map<string,Promise<void>>());
 function verify(purchase:Purchase):Promise<void>{
  if(purchase.purchaseState!=='purchased'){setMessage(copy.pending[locale]);return Promise.resolve();}
  const existing=inFlight.current.get(purchase.id);if(existing)return existing;
  const job=(async()=>{
   const {data,error}=await supabase.functions.invoke('verify-purchase',{body:{store:Platform.OS==='ios'?'apple':'google',productId:purchase.productId,transactionId:purchase.id,purchaseToken:purchase.purchaseToken}});
   if(error||!data?.verified)throw new Error(copy.failed[locale]);
   await finishTransaction({purchase,isConsumable:false});
   await subscription.refresh();subscriptionChanged();setMessage(data.active?copy.verified[locale]:copy.inactive[locale]);
  })().finally(()=>inFlight.current.delete(purchase.id));
  inFlight.current.set(purchase.id,job);return job;
 }
 const iap=useIAP({onPurchaseSuccess:p=>{setBusy(true);void verify(p).catch(()=>setError(copy.failed[locale])).finally(()=>setBusy(false));},onPurchaseError:e=>{setBusy(false);if(e.code!==ErrorCode.UserCancelled)setError(copy.failed[locale]);},onError:()=>setError(copy.failed[locale])});
 useEffect(()=>{let live=true;void supabase.from('store_products').select('product_id').eq('kind','subscription').eq('store',Platform.OS==='ios'?'apple':'google').eq('product_id',annualId).eq('active',true).then(({data,error})=>{if(live){if(error)setError(copy.failed[locale]);else setCatalog((data??[]).map(x=>x.product_id));}});return()=>{live=false}},[]);
 useEffect(()=>{if(iap.connected&&catalog.length)void iap.fetchProducts({skus:catalog,type:'subs'}).catch(()=>setError(copy.failed[locale]));},[iap.connected,catalog]);
 async function buy(p:ProductOrSubscription){
  if(busy)return;setBusy(true);setError('');setMessage('');
  try{
   const plan=annualPlan(p,annualId,releaseConfig.googleBasePlan);if(!plan)throw Error();
   // Authoritative lookup before purchase prevents another purchase while already entitled.
   if(await subscription.refresh()){setMessage(copy.active[locale]);return;}
   await iap.requestPurchase({type:'subs',request:{apple:{sku:p.id,appAccountToken:userId},google:{skus:[p.id],obfuscatedAccountId:userId,subscriptionOffers:plan.token?[{sku:p.id,offerToken:plan.token}]:[]}}});
  }catch(e){if((e as {code?:string}).code!==ErrorCode.UserCancelled)setError(copy.failed[locale]);}finally{setBusy(false);}
 }
 async function restore(){
  setBusy(true);setError('');setMessage('');
  try{await iap.restorePurchases();const purchases=(await getAvailablePurchases()).filter(p=>p.productId===annualId);for(const p of purchases)await verify(p);await subscription.refresh();setMessage(t(purchases.length?'구매 복원이 완료되었습니다.':'구매 내역이 없습니다.'));}
  catch{setError(copy.failed[locale]);}finally{setBusy(false);}
 }
 const products=iap.subscriptions.filter(p=>catalog.includes(p.id)&&annualPlan(p,annualId,releaseConfig.googleBasePlan));
 const legalReady=[releaseConfig.privacy,releaseConfig.terms,releaseConfig.support,releaseConfig.deletion].every(isPublicHttps);
 return <ScrollView contentContainerStyle={s.page}>
  <Text style={s.title}>{copy.annual[locale]}</Text><Text style={s.text}>{copy.benefits[locale]}</Text>
  {!!error&&<Text accessibilityRole="alert" style={s.error}>{error}</Text>}{!!message&&<Text style={s.text}>{message}</Text>}
  {subscription.error&&<Text style={s.error}>{copy.failed[locale]}</Text>}
  {subscription.active&&<View style={s.card}><Text style={s.heading}>{copy.active[locale]}</Text><Text style={s.text}>{copy.expiry[locale]}: {subscription.expires?new Date(subscription.expires).toLocaleDateString(locale):''}</Text></View>}
  {!subscription.active&&!products.length&&<Text style={s.muted}>{copy.noAnnual[locale]}</Text>}
  {!subscription.active&&products.map(p=><View key={p.id} style={s.card}><Text style={s.heading}>{p.title}</Text><Text style={s.title}>{annualPlan(p,annualId,releaseConfig.googleBasePlan)!.price}</Text><Text style={s.text}>{copy.annual[locale]}</Text><Text style={s.text}>{copy.renewal[locale]}</Text><Button disabled={busy||!iap.connected||subscription.loading||subscription.error||!legalReady} title={copy.subscribe[locale]} onPress={()=>void buy(p)}/></View>)}
  {!legalReady&&<Text style={s.muted}>{copy.unavailable[locale]}</Text>}
  <Button disabled={busy||!iap.connected} secondary title={t('구매 복원')} onPress={()=>void restore()}/><ManageSubscription/><LegalLinks/>
 </ScrollView>;
}
