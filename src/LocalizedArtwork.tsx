import React,{useState} from 'react';
import {Image,Text,View,StyleSheet,type ImageSourcePropType} from 'react-native';
import {assets} from './data/assets';
import {diagramLabels} from './data/diagramLabels';
import {useLanguage} from './i18n';
import {fitImage,fitDiagramLabel} from './layout';
import artworkTextOverlays from './data/artworkTextOverlays.json';
import type {ExplanationLabel} from './EffectExplanation';

const bySource=new Map(Object.entries(diagramLabels).map(([src,entry])=>[assets[src],entry]));
const overlayBySource=new Map(Object.entries(artworkTextOverlays as Record<string,ExplanationLabel[]>).map(([src,labels])=>[assets[src],labels]));
export function hasLocalizedArtwork(src:string){return (!!diagramLabels[src]&&!!assets[diagramLabels[src].clean])||src in artworkTextOverlays;}

/** Draw in the actual contain rectangle, including its letterbox offset.
 * Enlarging this view enlarges both the bitmap and the native label layer.
 * Do not impose a minimum font size here: that would detach labels at thumbnail sizes.
 */
export default function LocalizedArtwork({source,label,onError,onLoadStart}:{source:ImageSourcePropType;label?:string;onError?:()=>void;onLoadStart?:()=>void}){
 const {locale}=useLanguage();
 const [size,setSize]=useState({width:0,height:0});
 const candidate=bySource.get(source);
 const overlay=overlayBySource.get(source);
 const intrinsic=overlay?Image.resolveAssetSource(source):undefined;
 const overlayEntry=overlay&&intrinsic?{clean:'',width:intrinsic.width,height:intrinsic.height,labels:overlay.map(l=>({x:l.x*intrinsic.width,y:l.y*intrinsic.height,width:l.width*intrinsic.width,height:l.height*intrinsic.height,fontSize:l.fontHeight*intrinsic.height*.88,text:l.text,align:'left' as const,color:'#f1f5ef'}))}:undefined;
 const entry=candidate&&assets[candidate.clean]?candidate:overlayEntry;
 const sourceToShow=entry?.clean?assets[entry.clean]:source;
 const fit=entry?fitImage(size.width,size.height,entry.width/entry.height):size;
 const scale=entry?fit.width/entry.width:0;
 return <View style={StyleSheet.absoluteFill} onLayout={({nativeEvent:{layout}})=>setSize({width:layout.width,height:layout.height})}
  accessible={!!label||!!entry} accessibilityRole="image" accessibilityLabel={[label,...(entry?.labels.map(l=>l.text[locale])??[])].filter(Boolean).join('. ')}>
  <Image source={sourceToShow} resizeMode="contain" accessible={false} onError={onError} onLoadStart={onLoadStart} style={[StyleSheet.absoluteFill,{width:'100%',height:'100%'}]}/>
  {entry&&scale>0&&(entry!==overlayEntry||locale!=='ko')&&<View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={{position:'absolute',left:(size.width-fit.width)/2,top:(size.height-fit.height)/2,width:fit.width,height:fit.height}}>
   {entry.labels.map((item,i)=>{const inset=overlayEntry===entry?4:0;const typography=fitDiagramLabel(item.text[locale],item.width,item.height,item.fontSize);return <View key={i} style={{position:'absolute',left:(item.x-inset)*scale,top:(item.y-inset)*scale,width:(item.width+inset*2)*scale,height:(item.height+inset*2)*scale,padding:inset*scale,justifyContent:'center',backgroundColor:overlayEntry===entry?'#071310':undefined}}>
    <Text key={locale} allowFontScaling={false} adjustsFontSizeToFit minimumFontScale={0.5} numberOfLines={typography.lines}
     style={{color:item.color??'#f1f5ef',fontSize:typography.fontSize*scale,lineHeight:typography.lineHeight*scale,fontWeight:'600',textAlign:item.align??'left',includeFontPadding:false,textShadowColor:'#08100c',textShadowOffset:{width:0,height:scale},textShadowRadius:2*scale}}>{item.text[locale]}</Text>
   </View>;})}
  </View>}
 </View>;
}
