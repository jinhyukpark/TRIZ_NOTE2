import React,{useState} from 'react';
import {Image,Modal,Pressable,ScrollView,Text,View,type ImageSourcePropType} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useLanguage,type Locale} from './i18n';
import ContentImage from './ContentImage';
import {fitDiagramLabel} from './layout';
import {colors} from './theme';

export type ExplanationLabel={x:number;y:number;width:number;height:number;fontHeight:number;text:Record<Locale,string>};
const copy={ko:{zoom:'설명 도해 확대',close:'닫기'},en:{zoom:'Enlarge explanation',close:'Close'},ja:{zoom:'説明図を拡大',close:'閉じる'},zh:{zoom:'放大说明图',close:'关闭'}};

/** Keep every original illustration, chart and connector; replace only its text layer.
 * Coordinates reference the full source bitmap, not the cropped explanation viewport.
 */
export default function EffectExplanation({source,fallback,width,start,end=.997,labels}:{source:ImageSourcePropType;fallback:ImageSourcePropType;width:number;start:number;end?:number;labels:ExplanationLabel[]}){
 const {locale}=useLanguage();const [zoom,setZoom]=useState(false),[imageReady,setImageReady]=useState(false);
 const size=Image.resolveAssetSource(source);
 const panel=(visibleWidth:number)=>{
  const fullWidth=visibleWidth/(end-start),height=fullWidth*size.height/size.width;
  return <View style={{width:visibleWidth,height,overflow:'hidden',backgroundColor:'#06100e'}} accessibilityRole="image" accessible accessibilityLabel={labels.map(l=>l.text[locale]).join('. ')}>
   <ContentImage source={source} fallback={fallback} resizeMode="contain" style={{position:'absolute',left:-fullWidth*start,top:0,width:fullWidth,height}} accessible={false} onLoadStart={()=>setImageReady(false)} onLoad={()=>setImageReady(true)}/>
   {imageReady&&locale!=='ko'&&labels.map((l,i)=>{
    const maskLeft=Math.max(0,(l.x-start)*fullWidth-3),top=Math.max(0,l.y*height-3);
    const maskWidth=Math.min(visibleWidth-maskLeft,l.width*fullWidth+6),maskHeight=l.height*height+6;
    const standalone=l.y<.14||l.text.ko==='핵심 원리';
    const center=l.x+l.width/2;
    const neighbors=labels.filter(other=>other!==l&&Math.abs(other.y-l.y)<.025);
    const spacing=Math.min(.10,...neighbors.map(other=>Math.abs(other.x+other.width/2-center)*.9));
    const textWidth=standalone?end-l.x-.015:Math.max(l.width,Math.min(.10,spacing));
    const left=standalone||l.width>.16||l.x>.90?maskLeft:Math.max(0,(center-textWidth/2-start)*fullWidth-3);
    const boxWidth=Math.min(visibleWidth-left,textWidth*fullWidth+6),boxHeight=maskHeight+(!standalone&&l.fontHeight<.045?8:0);
    const typography=fitDiagramLabel(l.text[locale],boxWidth-4,boxHeight-2,l.fontHeight*height*.88);
    return <React.Fragment key={`${locale}-${i}`}>
     <View pointerEvents="none" style={{position:'absolute',left:maskLeft,top,width:maskWidth,height:maskHeight,backgroundColor:'#06100e'}}/>
     <View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={{position:'absolute',left,top,width:boxWidth,height:boxHeight,paddingHorizontal:2,justifyContent:'center'}}>
      <Text allowFontScaling={false} style={{fontSize:typography.fontSize,lineHeight:typography.lineHeight,color:l.text.ko==='핵심 원리'?colors.lime:colors.ink,includeFontPadding:false,textAlign:!standalone&&l.width<.16?'center':'left',fontWeight:l.fontHeight>.045?'700':'500'}}>{l.text[locale]}</Text>
     </View>
    </React.Fragment>;
   })}
  </View>;
 };
 return <View>
  {panel(width)}
  <Pressable accessibilityRole="button" onPress={()=>setZoom(true)} style={{minHeight:44,padding:12,alignItems:'center'}}><Text style={{color:colors.lime}}>{copy[locale].zoom}</Text></Pressable>
  {zoom&&<Modal visible onRequestClose={()=>setZoom(false)} animationType="fade">
   <SafeAreaView style={{flex:1,backgroundColor:colors.bg}}>
    <Pressable accessibilityRole="button" onPress={()=>setZoom(false)} style={{minHeight:48,padding:16}}><Text style={{color:colors.lime}}>{copy[locale].close}</Text></Pressable>
    <ScrollView><ScrollView horizontal>{panel(Math.max(width*2,800))}</ScrollView></ScrollView>
   </SafeAreaView>
  </Modal>}
 </View>;
}
