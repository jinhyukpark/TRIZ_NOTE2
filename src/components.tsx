import React,{useState} from 'react';
import {Text,Pressable,View,Image,Modal,ScrollView,StyleSheet,type ImageSourcePropType} from 'react-native';
import {SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context';
import {s,colors} from './theme';
import {assets} from './data/assets';
import {useLanguage} from './i18n';
import {fitImage} from './layout';
import LocalizedArtwork from './LocalizedArtwork';

export function Button({title,onPress,secondary=false,disabled=false}:{title:string;onPress:()=>void;secondary?:boolean;disabled?:boolean}){
 return <Pressable accessibilityRole="button" accessibilityState={{disabled}} disabled={disabled} onPress={onPress} style={[s.button,secondary&&s.secondary,disabled&&{opacity:.45}]}><Text style={[s.buttonText,secondary&&{color:colors.ink}]}>{title}</Text></Pressable>;
}

// The View determines layout; the image cannot contribute its bundled intrinsic dimensions.
// Both image dimensions must override React Native Image's source width/height defaults.
export function FramedImage({source,ratio=1.5,label,squareCorners=false}:{source:ImageSourcePropType;ratio?:number;label?:string;squareCorners?:boolean}){
 const [error,setError]=useState(false);
 const {locale}=useLanguage();
 return <View style={[s.imageFrame,{aspectRatio:ratio},squareCorners&&{borderRadius:0}]}>
  <LocalizedArtwork source={source} label={label}
   onLoadStart={()=>setError(false)} onError={()=>setError(true)}
   />
  {error&&<Text style={[s.error,{padding:12}]}>{{ko:'이미지를 불러오지 못했습니다. 화면을 다시 열어 주세요.',en:'Unable to load this image. Please reopen this screen.',ja:'画像を読み込めませんでした。画面を開き直してください。',zh:'无法加载图片，请重新打开此页面。'}[locale]}</Text>}
 </View>;
}

export function Diagram({src,title,overlay=false}:{src:string;title:string;overlay?:boolean}){
 const [open,setOpen]=useState(false),[zoom,setZoom]=useState(1);
 const [viewport,setViewport]=useState({width:0,height:0});
 const {t}=useLanguage();
 const source=assets[src]; if(!source)return <Text style={s.muted}>{t('이미지를 준비하고 있습니다.')}</Text>;
 const dimensions=Image.resolveAssetSource(source);
 const ratio=dimensions?.width&&dimensions?.height?dimensions.width/dimensions.height:1.5;
 const fit=fitImage(viewport.width,viewport.height,ratio);
 return <View style={{gap:8,alignSelf:'stretch',minWidth:0}}>
  <Pressable accessibilityRole="button" accessibilityLabel={title+' '+t('도해 확대')} onPress={()=>{setZoom(1);setOpen(true);}}>
   <FramedImage source={source} ratio={ratio}/>
   <Text style={[s.muted,overlay&&{position:'absolute',right:10,bottom:10,padding:7,borderWidth:1,borderColor:colors.line,borderRadius:5,backgroundColor:colors.bg,fontSize:11}]}>{t('도해 확대')} ↗</Text>
  </Pressable>
  <Modal visible={open} onRequestClose={()=>setOpen(false)} animationType="fade">
   <SafeAreaProvider>
   <SafeAreaView style={s.root}>
    <View style={[s.page,{paddingBottom:12,gap:10}]}>
     <View style={[s.between,{flexWrap:'wrap'}]}>
      <Button title={t('닫기')} onPress={()=>setOpen(false)}/>
      <View style={[s.row,{flexWrap:'wrap'}]}>{[1,2,3].map(n=><Pressable key={n} accessibilityRole="button" accessibilityLabel={n+'×'} accessibilityState={{selected:zoom===n}} onPress={()=>setZoom(n)} style={[s.pill,{minHeight:44,minWidth:44,alignItems:'center',justifyContent:'center'},zoom===n&&{backgroundColor:colors.lime}]}><Text style={{color:zoom===n?colors.bg:colors.ink}}>{n}×</Text></Pressable>)}</View>
     </View><Text style={s.heading}>{title}</Text>
    </View>
    <View style={{flex:1,overflow:'hidden'}} onLayout={({nativeEvent:{layout}})=>{setViewport({width:layout.width,height:layout.height});}}>
     {viewport.width>0&&viewport.height>0&&<ScrollView key={`${zoom}-${viewport.width}-${viewport.height}`} bounces={false} contentContainerStyle={{minHeight:viewport.height,justifyContent:'center'}}>
      <ScrollView horizontal bounces={false} contentContainerStyle={{minWidth:viewport.width,justifyContent:'center',alignItems:'center'}}>
       <View style={{width:fit.width*zoom,height:fit.height*zoom}}><LocalizedArtwork source={source} label={title}/></View>
      </ScrollView>
     </ScrollView>}
    </View>
   </SafeAreaView>
   </SafeAreaProvider>
  </Modal>
 </View>;
}
