import React,{useRef,useState} from 'react';
import {View,ScrollView,Pressable,TextInput,StyleSheet,useWindowDimensions} from 'react-native';
import Text from '../ContentText';
import {Button} from '../components';
import EffectArtwork from '../EffectArtwork';
import {effects,effectUi as ui} from '../data/effects';
import EffectFeatured from '../EffectFeatured';
import {useLanguage} from '../i18n';
import {s,colors} from '../theme';

export default function Effects({selected,onSelect}:{selected:string|null;onSelect:(id:string|null)=>void}){
 const {locale}=useLanguage();
 const [query,setQuery]=useState('');
 const item=effects.find(e=>e.id===selected);
 if(item)return <EffectReader key={item.id} item={item} onBack={()=>onSelect(null)}/>;
 const matches=effects.filter(e=>Object.values(e.title).join(' ').toLowerCase().includes(query.trim().toLowerCase()));
 return <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={s.page}>
  <Text style={s.eyebrow}>EFFECT LIBRARY</Text><Text style={s.title}>Effects</Text><Text style={s.muted}>{ui.intro[locale]}</Text>
  <TextInput accessibilityLabel={ui.search[locale]} value={query} onChangeText={setQuery} placeholder={ui.search[locale]} placeholderTextColor={colors.muted} style={s.input}/>
  {matches.map(e=><Pressable key={e.id} accessibilityRole="button" accessibilityLabel={e.title[locale]} onPress={()=>onSelect(e.id)} style={d.card}>
   <EffectFeatured id={e.id} title={e.title[locale]}/>
   <View style={{padding:14,gap:8}}><Text style={s.heading}>{e.title[locale]}</Text><Text style={s.muted}>{e.summary[locale]}</Text></View>
  </Pressable>)}
  {!matches.length&&<Text style={s.muted}>{ui.empty[locale]}</Text>}
 </ScrollView>;
}

function EffectReader({item,onBack}:{item:(typeof effects)[number];onBack:()=>void}){
 const {locale}=useLanguage();const [index,setIndex]=useState(0);const scroll=useRef<ScrollView>(null);
 const isMobile=useWindowDimensions().width<700;
 const step=item.steps[index],last=index===item.steps.length-1;
 const move=(next:number)=>{setIndex(Math.max(0,Math.min(next,item.steps.length-1)));scroll.current?.scrollTo({y:0,animated:false});};
 return <View style={{flex:1}}>
  <View style={d.header}><Pressable accessibilityRole="button" accessibilityLabel={ui.list[locale]} onPress={onBack} style={d.back}><Text style={s.heading}>←</Text></Pressable><View style={{flex:1,gap:3}}><Text style={s.eyebrow}>EFFECTS</Text><Text style={[s.heading,{fontSize:17}]}>{item.title[locale]}</Text></View><Text style={s.muted}>{index+1} / {item.steps.length}</Text></View>
  {/* Keep step navigation outside the scrolling artwork and explanation. */}
  <View testID="effect-step-navigation" style={[s.page,d.stepNavigation]}>{item.steps.map((p,i)=><Pressable key={p.image} accessibilityRole="button" accessibilityLabel={`${i+1}. ${p.label[locale]}`} accessibilityState={{selected:index===i}} onPress={()=>move(i)} style={[d.step,index===i&&d.activeStep]}><Text style={{color:index===i?colors.bg:colors.muted,fontWeight:'800'}}>{String(i+1).padStart(2,'0')}</Text></Pressable>)}</View>
  <ScrollView ref={scroll} style={{flex:1}} contentContainerStyle={[s.page,{gap:14,paddingTop:2},isMobile&&{paddingHorizontal:0}]}>
   <EffectArtwork key={`${step.image}-${locale}`} item={item} step={step} index={index}/>
   {!isMobile&&<><View style={{flexDirection:'row',gap:10,flexWrap:'wrap'}}><View style={{flex:1,minWidth:120}}><Button secondary disabled={index===0} title={'← '+ui.previous[locale]} onPress={()=>move(index-1)}/></View><View style={{flex:1,minWidth:120}}><Button title={last?ui.list[locale]:ui.next[locale]+' →'} onPress={()=>last?onBack():move(index+1)}/></View></View>
   {last&&<Button secondary title={ui.restart[locale]} onPress={()=>move(0)}/>}</>}
  </ScrollView>
 </View>;
}
const d=StyleSheet.create({
 card:{borderWidth:1,borderColor:colors.line,borderRadius:8,backgroundColor:colors.panel,overflow:'hidden'},
 header:{flexDirection:'row',gap:10,alignItems:'center',paddingHorizontal:12,paddingVertical:12,borderBottomWidth:1,borderColor:colors.line},
 back:{width:44,minHeight:44,justifyContent:'center',alignItems:'center'},
 stepNavigation:{flexDirection:'row',gap:5,paddingTop:12,paddingBottom:12,backgroundColor:colors.bg,flexShrink:0},
 step:{flex:1,minHeight:44,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:colors.line,borderRadius:6,backgroundColor:colors.panel},
 activeStep:{backgroundColor:colors.lime,borderColor:colors.lime},
});
