import React,{useState} from 'react';
import {Text,View,ScrollView,Modal} from 'react-native';
import {SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context';
import legacy from '../data/legacy.json';
import parameters from '../locales/parameters.json';
import {useLanguage,usePrinciples} from '../i18n';
import {s} from '../theme';
import {Button} from '../components';
export default function Matrix({onOpen}:{onOpen:(id:number)=>void}){
 const {t,locale}=useLanguage(),principles=usePrinciples();
 const[better,setBetter]=useState(0),[worse,setWorse]=useState(9),[select,setSelect]=useState<'better'|'worse'|null>(null);
 const parameterName=(i:number)=>locale==='ko'?legacy.parameters[i].strKo:locale==='en'?(i===6?'Volume of moving object':legacy.parameters[i].strEn):parameters[locale][i];
 const label=(i:number)=>`${legacy.parameters[i].index}. ${parameterName(i)}`;
 const cell=legacy.matrix[better][worse];const ids=cell==='*'||cell==='-'?[]:cell.split(',').map(Number);
 return <ScrollView contentContainerStyle={s.page}><Text style={s.eyebrow}>{t('기술적 모순 해결')}</Text><Text style={s.title}>{t('좋아지면,')} {t('무엇이 나빠지나요?')}</Text><View style={s.card}><Text style={s.muted}>{t('개선하려는 특성')}</Text><Button secondary title={label(better)} onPress={()=>setSelect('better')}/><Text style={s.muted}>{t('나빠지는 특성')}</Text><Button secondary title={label(worse)} onPress={()=>setSelect('worse')}/></View>{ids.length?ids.map((id,i)=><Button key={i} secondary title={`${id}. ${principles[id-1].ko}`} onPress={()=>onOpen(id)}/>):<Text style={s.muted}>{t(cell==='*'?'서로 다른 특성을 선택하세요':'이 조합에 등록된 추천이 없어요')}</Text>}<Modal visible={!!select} onRequestClose={()=>setSelect(null)}><SafeAreaProvider><SafeAreaView style={s.root}><ScrollView contentContainerStyle={s.page}><Button title={t('닫기')} onPress={()=>setSelect(null)}/>{legacy.parameters.map((p,i)=><Button key={i} secondary title={label(i)} onPress={()=>{select==='better'?setBetter(i):setWorse(i);setSelect(null);}}/>)}</ScrollView></SafeAreaView></SafeAreaProvider></Modal></ScrollView>;
}
