import React from 'react';
import {Image,Text,View,StyleSheet} from 'react-native';
import {useLanguage} from './i18n';
import {featuredEffects} from './data/featuredEffects';
import EquipmentCallout from './EquipmentCallout';
import ContentImage from './ContentImage';
import {localEffectImages} from './data/localEffectImages';

/** Label coordinates use the complete generated canvas, never a cropped poster. */
export default function EffectFeatured({id,title}:{id:string;title:string}){
 const {locale}=useLanguage();
 const entry=featuredEffects[id];
 return <View style={styles.frame} accessible accessibilityRole="image" accessibilityLabel={[title,...entry.labels.map(l=>l.text[locale])].join('. ')}>
  {typeof entry.image==='object'&&'uri' in entry.image?<ContentImage key={entry.image.uri} source={entry.image} fallback={localEffectImages[id].featured} resizeMode="contain" accessible={false} style={[StyleSheet.absoluteFill,{width:'100%',height:'100%'}]}/>:<Image source={entry.image} resizeMode="contain" accessible={false} style={[StyleSheet.absoluteFill,{width:'100%',height:'100%'}]}/>}
  {entry.labels.map((label,i)=>label.target?<EquipmentCallout key={i} position={{...label,target:label.target}} text={label.text[locale]} aspectRatio={16/9} fontSize={11}/>:<View key={i} testID="baked-leader-label" pointerEvents="none" style={[styles.label,{left:`${label.x}%`,bottom:`${100-label.y-9}%`,width:`${label.width}%`}]}>
   <Text allowFontScaling={false} style={styles.text}>{label.text[locale]}</Text>
  </View>)}
 </View>;
}
const styles=StyleSheet.create({
 frame:{width:'100%',aspectRatio:16/9,backgroundColor:'#06100e'},
 // Legacy featured bitmaps already contain leader lines. Only overlay their names.
 label:{position:'absolute',paddingBottom:2},
 text:{color:'#f1f4ed',fontSize:11,lineHeight:13,fontWeight:'600',textShadowColor:'#020906',textShadowOffset:{width:0,height:1},textShadowRadius:3},
});
