import React from 'react';
import {ScrollView,ActivityIndicator} from 'react-native';
import Text from './ContentText';
import {Button} from './components';
import {s,colors} from './theme';
import {useLanguage} from './i18n';
import {complianceCopy as copy} from './locales/compliance';
export default function SubscriptionGate({loading,error,onSubscribe,onRetry,onBack}:{loading:boolean;error:boolean;onSubscribe:()=>void;onRetry:()=>void;onBack:()=>void}){
 const {locale,t}=useLanguage();
 return <ScrollView contentContainerStyle={s.page}><Button secondary title={'← '+t('뒤로')} onPress={onBack}/><Text style={s.title}>{copy.annual[locale]}</Text><Text style={s.text}>{copy.benefits[locale]}</Text><Text style={s.muted}>{copy.preview[locale]}</Text>{loading?<ActivityIndicator color={colors.lime}/>:error?<><Text style={s.error}>{copy.failed[locale]}</Text><Button secondary title={t('재시도')} onPress={onRetry}/></>:<Button title={t('결제 및 이용권')} onPress={onSubscribe}/>}</ScrollView>;
}
