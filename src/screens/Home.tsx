import Text from '../ContentText';
import React from 'react';
import {View,ScrollView,Pressable,StyleSheet,useWindowDimensions} from 'react-native';
import {useLanguage,usePrinciples} from '../i18n';
import {Diagram,FramedImage} from '../components';
import {assets} from '../data/assets';
import {s,colors} from '../theme';
import type {Collection} from './Knowledge';

export default function Home({completed,bookmarks,onOpen,onExplore,onSolve,onCollection}:{completed:number[];bookmarks:number[];onOpen:(id:number)=>void;onExplore:()=>void;onSolve:()=>void;onCollection:(c:Collection)=>void}){
 const {t}=useLanguage(),principles=usePrinciples(),{fontScale}=useWindowDimensions();
 // Match the web app's local-calendar selection, not a UTC epoch-day offset.
 const now=new Date(),today=principles[(now.getDate()+now.getMonth())%40];
 const count=Math.min(40,completed.length);
 return <ScrollView contentContainerStyle={[s.page,h.page]}>
  <View style={h.welcome}>
   <View style={{flex:1,gap:12}}><Text style={s.eyebrow}>{t('오늘의 사고 훈련')}</Text><Text style={h.headline}>{t('문제를 바꾸지 말고,')}{'\n'}<Text style={{color:colors.muted}}>{t('보는 방식을 바꿔보세요.')}</Text></Text></View>
   <View accessible accessibilityLabel={`${t('학습 완료')} ${count} / 40`} style={h.progress}>
    {Array.from({length:40},(_,i)=><View key={i} style={[h.tick,{backgroundColor:i<Math.max(1,count)?colors.lime:colors.line,transform:[{rotate:`${i*9}deg`},{translateY:-29}]}]}/>)}
    <Text style={[s.heading,{fontSize:22}]}>{count}</Text><Text style={{color:colors.muted,fontSize:10}}>/ 40</Text>
   </View>
  </View>
  <View style={h.daily}>
   <View><Diagram src={today.image} title={today.exampleTitle} overlay/><View pointerEvents="none" style={h.number}><Text style={{color:colors.ink,fontSize:11}}>{t('원리')} {String(today.id).padStart(2,'0')}</Text></View></View>
   <Pressable accessibilityRole="button" accessibilityLabel={t('3분 학습 시작')} onPress={()=>onOpen(today.id)} style={h.copy}>
    <View style={h.chip}><Text style={{fontSize:11,fontWeight:'800',color:colors.bg}}>✧ {t('오늘의 원리')}</Text></View>
    <View style={{gap:3}}><Text style={[s.title,{fontSize:27}]}>{today.ko}</Text><Text style={s.muted}>{today.en}</Text></View>
    <Text style={s.text}>{today.cue}</Text><Text style={h.link}>{t('3분 학습 시작')}　→</Text>
   </Pressable>
  </View>
  <View style={{gap:12}}>
   {[{title:'모순에서 원리 찾기',caption:'문제 해결 도구',body:'좋아지는 것과 나빠지는 것을 선택하세요.',icon:'⚗',primary:true,action:onSolve},{title:'무작위 원리 뽑기',caption:'생각이 막혔다면',body:'예상 밖의 관점으로 문제를 다시 봅니다.',icon:'⤨',primary:false,action:()=>onOpen(principles[Math.floor(Math.random()*principles.length)].id)}].map(item=><Pressable key={item.title} accessibilityRole="button" onPress={item.action} style={[h.quick,item.primary&&{backgroundColor:colors.lime,borderColor:colors.lime}]}>
    <View style={[h.quickIcon,{backgroundColor:item.primary?'#addd29':'#26312b'}]}><Text style={{fontSize:25,color:item.primary?colors.bg:colors.ink}}>{item.icon}</Text></View>
    <View style={{flex:1,gap:5}}><Text style={[h.caption,item.primary&&{color:'#52651d'}]}>{t(item.caption)}</Text><Text style={[h.quickTitle,item.primary&&{color:colors.bg}]}>{t(item.title)}</Text><Text style={[h.caption,item.primary&&{color:'#52651d'}]}>{t(item.body)}</Text></View><Text style={{fontSize:23,color:item.primary?colors.bg:colors.ink}}>→</Text>
   </Pressable>)}
  </View>
  <View style={h.section}>
   <Text style={s.eyebrow}>{t('빠른 탐색')}</Text>
   <View style={[s.between,{flexWrap:'wrap'}]}><Text style={s.heading}>{t('자주 쓰는 발명원리')}</Text><Pressable accessibilityRole="button" onPress={onExplore} style={{paddingVertical:12}}><Text style={h.link}>{t('모두 보기')}　→</Text></Pressable></View>
   <View style={h.grid}>{[1,13,22,24].map(id=>{const p=principles[id-1];return <Pressable key={id} accessibilityRole="button" accessibilityLabel={`${id} ${p.ko}`} onPress={()=>onOpen(id)} style={[h.mini,{width:fontScale>1.5?'100%':'48%'}]}>
    <FramedImage source={assets[p.image]} label={p.exampleTitle}/><Text style={s.eyebrow}>{String(id).padStart(2,'0')}{bookmarks.includes(id)?' ☆':''}</Text><Text style={[s.heading,{fontSize:16}]}>{p.ko}</Text><Text style={[s.muted,{fontSize:12,lineHeight:18}]}>{p.en}</Text>
   </Pressable>})}</View>
  </View>
  <View style={h.section}><Text style={s.eyebrow}>{t('더 깊이 탐구하기')}</Text>{(['physical','standards','evolution'] as const).map((c,i)=><Pressable key={c} accessibilityRole="button" onPress={()=>onCollection(c)} style={h.collection}><View accessibilityElementsHidden style={{width:22,height:20,flexDirection:'row'}}>{[0,1].map(n=><View key={n} style={{flex:1,borderWidth:1.5,borderColor:colors.ink,borderTopLeftRadius:n===0?3:0,borderTopRightRadius:n===1?3:0}}/>)}</View><Text style={[h.quickTitle,{flex:1}]}>{t(['물리적 모순 · 4가지 분리','76가지 표준해','시스템 진화'][i])}</Text><Text style={{color:colors.ink,fontSize:25}}>›</Text></Pressable>)}</View>
 </ScrollView>;
}
const h=StyleSheet.create({
 page:{gap:14,paddingTop:26,paddingBottom:44},welcome:{flexDirection:'row',alignItems:'center',gap:12,marginBottom:10},headline:{color:colors.ink,fontSize:24,lineHeight:34,fontWeight:'800'},
 progress:{width:64,height:64,alignItems:'center',justifyContent:'center'},tick:{position:'absolute',width:5,height:5,borderRadius:1,top:29.5,left:29.5},
 daily:{borderWidth:1,borderColor:colors.line,borderRadius:10,overflow:'hidden',backgroundColor:'#101713'},number:{position:'absolute',bottom:10,left:12,padding:7,borderRadius:5,backgroundColor:colors.bg},copy:{padding:20,gap:18},chip:{alignSelf:'flex-start',backgroundColor:colors.lime,borderRadius:6,paddingHorizontal:11,paddingVertical:7},link:{color:colors.ink,fontSize:13,fontWeight:'800'},
 quick:{flexDirection:'row',alignItems:'center',gap:12,padding:17,minHeight:106,borderRadius:10,borderWidth:1,borderColor:colors.line,backgroundColor:'#141b17'},quickIcon:{width:40,height:40,borderRadius:6,alignItems:'center',justifyContent:'center'},caption:{color:colors.muted,fontSize:11,lineHeight:17},quickTitle:{color:colors.ink,fontSize:16,fontWeight:'700'},
 section:{gap:12,marginTop:18},grid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',gap:12},mini:{padding:11,gap:8,backgroundColor:'#111914',borderWidth:1,borderColor:colors.line,borderRadius:8},collection:{flexDirection:'row',alignItems:'center',gap:12,padding:17,minHeight:64,borderWidth:1,borderColor:colors.line,borderRadius:8,backgroundColor:'#111914'},
});
