import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import ui from './locales/ui.json';
import labels from './locales/labels.json';
import notes from './locales/notes.json';
import native from './locales/native.json';
import advanced from './locales/advanced.json';
import complete from './locales/complete.json';
import en from './locales/principles.en.json';
import ja from './locales/principles.ja.json';
import zh from './locales/principles.zh.json';
import detailsKo from './data/principleDetails.ko.json';
import detailsEn from './locales/principleDetails.en.json';
import detailsJa from './locales/principleDetails.ja.json';
import detailsZh from './locales/principleDetails.zh.json';
import { principles } from './data/principles';
export type Locale = 'ko'|'en'|'ja'|'zh';
export const languages = {ko:'한국어', en:'English', ja:'日本語', zh:'简体中文'};
const dictionary: Record<string, Partial<Record<Locale,string>>> = {};
export const normalizeText=(s:string)=>s.replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
for(const entries of [ui,labels,notes,native,advanced,complete])for(const [key,value] of Object.entries(entries)){
 const normalized=normalizeText(key);dictionary[normalized]={...dictionary[normalized],...value as Partial<Record<Locale,string>>};
}
export const translateText=(s:string,locale:Locale)=>locale==='ko'?s:dictionary[normalizeText(s)]?.[locale]??s;
const Context = createContext({locale:'ko' as Locale, setLocale:(_l:Locale)=>{}, t:(s:string)=>s});
export function LocaleProvider({children}:{children:React.ReactNode}) {
 const detected=getLocales()[0]?.languageCode ?? 'ko';
 const [locale,setLanguage]=useState<Locale>(detected in languages ? detected as Locale : 'ko');
 const chosen=useRef(false);
 useEffect(()=>{let live=true;AsyncStorage.getItem('locale').then(l=>{if(live&&!chosen.current&&l&&l in languages)setLanguage(l as Locale)}).catch(()=>{});return()=>{live=false;};},[]);
 const setLocale=(l:Locale)=>{chosen.current=true;setLanguage(l);void AsyncStorage.setItem('locale',l).catch(()=>{});};
 const t=(s:string)=>translateText(s,locale);
 return <Context.Provider value={{locale,setLocale,t}}>{children}</Context.Provider>;
}
export const useLanguage=()=>useContext(Context);
export function usePrincipleDetails(id:number){
 const {locale}=useLanguage();
 if(locale==='ko')return detailsKo[id-1];
 const [question,...parts]={en:detailsEn,ja:detailsJa,zh:detailsZh}[locale][id-1];
 return {id,question,parts};
}
export function usePrinciples(){
 const {locale,t}=useLanguage();
 return locale==='ko'?principles:principles.map((p,i)=>{
 const x={en,ja,zh}[locale][i];
 return {...p,ko:x.name,cue:x.steps[0],exampleTitle:x.title,question:{en:detailsEn,ja:detailsJa,zh:detailsZh}[locale][i][0],guide:{...p.guide,summary:x.summary,steps:x.steps,labels:p.guide.labels.map(t)}};
 });
}
