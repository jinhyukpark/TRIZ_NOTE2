import Text from '../ContentText';
import React,{useState} from 'react';
import {View,ScrollView,TextInput} from 'react-native';
import legacy from '../data/legacy.json';
import artwork from '../data/advancedIllustrations.json';
import {s,colors} from '../theme';
import {Button,Diagram} from '../components';
import {useLanguage} from '../i18n';
export type Collection='physical'|'standards'|'evolution';
const titles={physical:'물리적 모순',standards:'76가지 표준해',evolution:'시스템 진화'};
type Node=string|number|null|Node[]|{[key:string]:Node};
const plain=(s:string)=>s.replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ');
function Content({value}:{value:Node}):React.ReactNode{
 const {t}=useLanguage();
 if(!value||typeof value==='number')return null;
 if(typeof value==='string')return <Text style={s.text}>{t(plain(value))}</Text>;
 if(Array.isArray(value))return value.map((v,i)=><Content key={i} value={v}/>);
 return Object.entries(value).map(([key,item])=>{
 if(['index','group','parent','class','en_titile','en_title','content_archi_img'].includes(key))return null;
 if(key.endsWith('_img'))return (Array.isArray(item)?item:[item]).filter(Boolean).map((src,i)=>{
 const a=(artwork as Record<string,{src:string;title:string;caption?:string}>)[String(src)];
 return a?<View key={key+i} style={{gap:8}}><Diagram src={a.src} title={t(a.title)}/><Text style={s.heading}>{t(a.title)}</Text>{!!a.caption&&<Text style={s.muted}>{t(plain(a.caption))}</Text>}</View>:null;
 });
 if(['ko_title','refer_title'].includes(key))return <Text key={key} style={s.heading}>{t(plain(String(item)))}</Text>;
 return <Content key={key} value={item}/>;
 });
}
export default function Knowledge({collection,onBack}:{collection:Collection;onBack:()=>void}){
 const{t}=useLanguage();const[selected,setSelected]=useState<number|null>(null),[q,setQ]=useState('');
 const entries=collection==='physical'?legacy.physical.map(p=>({title:p.shortKo,body:{description:p.content.map(x=>({ko_title:x.title,examples:x.subTitle})),ko_title:p.expTitle,content_ex_img:p.image,explanation:p.expExp} as Node})):collection==='evolution'?legacy.evolution.flatMap(g=>g.content.map(p=>({title:p.ko_title,body:p.content as Node}))):legacy.standards.flatMap(g=>g.content.flatMap(x=>x.content.map(p=>({title:p.ko_title,body:p as Node}))));
 return <ScrollView key={selected??'list'} contentContainerStyle={s.page}><Button secondary title={'← '+t('뒤로')} onPress={()=>selected===null?onBack():setSelected(null)}/><Text style={s.title}>{selected===null?t(titles[collection]):t(entries[selected].title)}</Text>{selected===null?<><TextInput value={q} onChangeText={setQ} style={s.input} placeholder={t('제목으로 검색')} placeholderTextColor={colors.muted}/>{entries.map((e,i)=>t(e.title).toLocaleLowerCase().includes(q.trim().toLocaleLowerCase())&&<Button key={i} secondary title={t(e.title)} onPress={()=>setSelected(i)}/>)}</>:<Content value={entries[selected].body}/>}</ScrollView>;
}
