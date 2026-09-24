import React from 'react';
import {View} from 'react-native';
import Text from './ContentText';
import {Button} from './components';
import {useLanguage} from './i18n';
import {s,colors} from './theme';
import {complianceCopy as copy} from './locales/compliance';
import {ManageSubscription} from './LegalLinks';
const q=(ko:string,en:string,ja:string,zh:string)=>({ko,en,ja,zh});
export const subscriptionSettingsCopy={
 title:q('구독','Subscription','サブスクリプション','订阅'),
 price:q('US$5 / 년','US$5 / year','US$5 / 年','US$5 / 年'),
 note:q('연간 기본 요금입니다. 실제 결제 금액과 통화는 구매 화면의 스토어 가격을 확인해 주세요.','Annual base price. Check the store purchase screen for the actual amount and currency.','年間基本料金です。実際の金額と通貨はストアの購入画面でご確認ください。','年度基础价格。实际金额和币种请以商店购买页面为准。'),
 login:q('로그인하고 연간 구독하기','Sign in to subscribe annually','ログインして年間プランに登録','登录并订阅年度套餐'),
 checking:q('구독 상태 확인 중…','Checking subscription…','契約状況を確認中…','正在检查订阅状态…'),
 guest:q('로그인 후 구독 상태를 확인할 수 있습니다.','Sign in to check your subscription.','ログインすると契約状況を確認できます。','登录后可查看订阅状态。'),
};
export default function SettingsSubscription({signedIn,active,loading,error,expires,onOpen}:{signedIn:boolean;active:boolean;loading:boolean;error:boolean;expires:string|null;onOpen:()=>void}){
 const {locale}=useLanguage(),c=subscriptionSettingsCopy;
 const status=!signedIn?c.guest[locale]:loading?c.checking[locale]:error?copy.failed[locale]:active?copy.active[locale]:copy.inactive[locale];
 return <View style={[s.card,{gap:12}]} testID="settings-subscription">
  <Text style={s.heading}>{c.title[locale]}</Text>
  <Text style={[s.eyebrow,{color:colors.lime}]}>{copy.annual[locale]}</Text>
  {!active&&<><Text style={s.title}>{c.price[locale]}</Text>
  <Text style={s.muted}>{c.note[locale]}</Text></>}
  <Text style={s.text}>{copy.benefits[locale]}</Text>
  <Text accessibilityLiveRegion="polite" style={s.muted}>{status}</Text>
  {active&&expires&&<Text style={s.muted}>{copy.expiry[locale]}: {new Date(expires).toLocaleDateString(locale)}</Text>}
  {!active&&<Button disabled={signedIn&&loading} title={!signedIn?c.login[locale]:loading?c.checking[locale]:error?c.title[locale]:copy.subscribe[locale]} onPress={onOpen}/>}
  <ManageSubscription/>
  <Text style={s.muted}>{copy.renewal[locale]}</Text>
 </View>;
}
