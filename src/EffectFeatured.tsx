import React from 'react';
import {Image,Text,View,StyleSheet} from 'react-native';
import {useLanguage} from './i18n';
import {featuredEffects} from './data/featuredEffects';

/** Label coordinates use the complete generated canvas, never a cropped poster. */
export default function EffectFeatured({id,title}:{id:string;title:string}){
 const {locale}=useLanguage();
 const entry=featuredEffects[id];
 const size=Image.resolveAssetSource(entry.image);
 return <View style={[styles.frame,{aspectRatio:size.width/size.height}]} accessible accessibilityRole="image" accessibilityLabel={[title,...entry.labels.map(l=>l.text[locale])].join('. ')}>
  <Image source={entry.image} resizeMode="contain" accessible={false} style={[StyleSheet.absoluteFill,{width:'100%',height:'100%'}]}/>
  {entry.labels.map((label,i)=><View key={i} pointerEvents="none" style={[styles.label,{left:`${label.x}%`,top:`${label.y}%`,width:`${label.width}%`}]}>
   <Text allowFontScaling={false} adjustsFontSizeToFit minimumFontScale={.7} numberOfLines={2} style={styles.text}>{label.text[locale]}</Text>
  </View>)}
 </View>;
}
const styles=StyleSheet.create({
 frame:{width:'100%',backgroundColor:'#06100e'},
 label:{position:'absolute',height:'9%',justifyContent:'flex-end',paddingBottom:2},
 text:{color:'#f1f4ed',fontSize:11,lineHeight:13,fontWeight:'600',textShadowColor:'#020906',textShadowOffset:{width:0,height:1},textShadowRadius:3},
});
