import React,{useEffect,useState} from 'react';
import {ActivityIndicator,Image,StyleSheet,Text,useWindowDimensions,View} from 'react-native';
import {assets} from './data/assets';
import type {Effect,EffectStep} from './data/effects';
import {effectTitle} from './data/effectCatalog';
import {useLanguage} from './i18n';
import {colors} from './theme';
import ScientificEffectArtwork from './ScientificEffectArtwork';
import {scientificArtwork} from './data/scientificArtwork';
import EquipmentCallout from './EquipmentCallout';
import {effectCallouts} from './data/effectCallouts';
import {legacyEffectArtwork,remoteLegacyArtwork} from './data/legacyEffectArtwork';
import ContentImage from './ContentImage';
import EffectExplanation,{type ExplanationLabel} from './EffectExplanation';
import explanationLabels from './data/effectExplanationLabels.json';


/**
 * The generated renders supply the apparatus and scientific state. All
 * explanatory copy is painted again as native text so changing locale never
 * depends on text baked into a bitmap.
 */
export default function EffectArtwork({item,step,index}:{item:Effect;step:EffectStep;index:number}){
 const {locale}=useLanguage();
 const title=effectTitle(item);
 const displayTitle=title[locale];
 const {width:windowWidth}=useWindowDimensions();
 const [imageReady,setImageReady]=useState(false);
 useEffect(()=>setImageReady(false),[item.id,index]);
 if(scientificArtwork[item.id])return <ScientificEffectArtwork item={item} step={step} index={index}/>;
 // Prefer artwork with the baked-in timeline removed from the actual bitmap.
 // Keep the original poster as a reversible source, not an opaque UI cover.
 // Versioned cleaned assets prevent Metro/iOS from reusing an older bitmap
 // that still contains the baked-in close icon or process footer.
 const bundledSource=assets[step.image.replace(/\.png$/, '-clean-v2.png')] ?? assets[step.image];
 const source=remoteLegacyArtwork[item.id]?.panels?.[index] ?? bundledSource;
 const additionalPortrait=remoteLegacyArtwork[item.id] ?? legacyEffectArtwork[item.id];
 if(additionalPortrait){
  const portraits=additionalPortrait.portraits;
  const equipmentLabels=additionalPortrait.labelsByStage?.[index] ?? additionalPortrait.labels;
  const portrait=portraits[index] ?? portraits[0];
  // Match the full viewport and the actual portrait aspect ratio.
  // The Image itself needs explicit dimensions: React Native supplies
  // bundled asset dimensions by default, even with absoluteFill positioning.
  const portraitWidth=Math.min(windowWidth,640);
  const portraitSize=Image.resolveAssetSource(portrait);
  const portraitHeight=portraitWidth*portraitSize.height/portraitSize.width;
  const explanationStart=additionalPortrait?.explanationStart ?? .667;
  return <View style={[a.portraitPoster,{width:portraitWidth}]} accessibilityRole="image" accessibilityLabel={`${item.title[locale]}. ${step.title[locale]}. ${step.body[locale]}. ${step.keyPoint[locale]}`}>
   <View style={[a.portraitApparatus,{width:portraitWidth,height:portraitHeight}]}>
    {!imageReady&&<View pointerEvents="none" style={a.imageLoading}><ActivityIndicator color={colors.lime}/></View>}
    <ContentImage key={`${item.id}-${index}-apparatus`} source={portrait} fallback={legacyEffectArtwork[item.id].portraits[index]} resizeMode="contain" style={{width:portraitWidth,height:portraitHeight}} accessible={false} onLoadStart={()=>setImageReady(false)} onLoad={()=>setImageReady(true)}/>
    {imageReady&&<><View pointerEvents="none" style={a.portraitHeadingOverlay}>
     <Text style={a.portraitEyebrow}>{String(index+1).padStart(2,'0')}  —  {step.label[locale]}</Text>
     <Text style={[a.portraitTitle,a.portraitOverlayTitle]}>{displayTitle}</Text>
     {locale!=='en'&&<Text numberOfLines={1} ellipsizeMode="tail" style={[a.englishSubtitle,a.portraitOverlayTitle]}>({title.en})</Text>}
    </View>
    {equipmentLabels.map((label,i)=><EquipmentCallout key={label.number} position={effectCallouts[item.id][index][i]} text={label.text[locale]} aspectRatio={portraitSize.width/portraitSize.height}/>)}</>}
   </View>
   <View style={a.heatPipeTimeline}>
    <View style={a.heatPipeTrack}/>
    {item.steps.map((p,i)=><View key={p.image} style={a.heatPipeTimelineItem}>
     <View style={[a.heatPipeNumber,i===index&&a.activeNumber]}><Text style={[a.heatPipeNumberText,i===index&&a.activeText]}>{String(i+1).padStart(2,'0')}</Text></View>
     <Text numberOfLines={2} style={[a.heatPipeTimelineText,i===index&&a.activeText]}>{p.label[locale]}</Text>
    </View>)}
   </View>
   <View style={a.sectionDivider}/>
   <EffectExplanation source={source} fallback={bundledSource} width={portraitWidth} start={explanationStart} end={additionalPortrait.explanationEnd} labels={additionalPortrait.explanationLabels?.[index]??(explanationLabels as Record<string,ExplanationLabel[]>)[step.image.split('/').pop()!.replace(/\.png$/,'-clean-v2.png')]??[]}/>
  </View>;
 }
 return null;
}

const a=StyleSheet.create({
 imageLoading:{position:'absolute',left:0,right:0,top:0,bottom:0,alignItems:'center',justifyContent:'center',backgroundColor:'#06100e'},
 frame:{width:'100%',overflow:'hidden',borderRadius:8,borderWidth:1,borderColor:colors.line,backgroundColor:'#07100e'},
 heatPipePoster:{width:'100%',overflow:'hidden',borderRadius:10,backgroundColor:'#06100e'},
 portraitPoster:{width:'100%',overflow:'hidden',borderRadius:10,backgroundColor:'#06100e'},
 portraitHeading:{paddingHorizontal:16,paddingTop:15,paddingBottom:12,gap:4,backgroundColor:'#06100e'},
 portraitHeadingOverlay:{position:'absolute',left:16,right:16,top:14,gap:4},
 portraitOverlayTitle:{textShadowColor:'#06100e',textShadowOffset:{width:0,height:1},textShadowRadius:4},
 portraitEyebrow:{color:colors.lime,fontSize:12,lineHeight:18,fontWeight:'900',letterSpacing:.6},
 portraitTitle:{color:'#f3eee4',fontFamily:'serif',fontSize:27,lineHeight:34,fontWeight:'800'},
 englishSubtitle:{color:'#b9c5bf',fontSize:13,lineHeight:18,fontWeight:'400'},
 // Match the generated 4:5 bitmap so `contain` fills the available width
 // without cropping or introducing horizontal letterboxing.
 portraitApparatus:{alignSelf:'center',backgroundColor:'#06100e'},
 portraitExplanation:{width:'100%',paddingHorizontal:18,paddingTop:25,paddingBottom:30,gap:11,backgroundColor:'#071310'},
 portraitStage:{color:colors.lime,fontSize:13,lineHeight:19,fontWeight:'900'},
 portraitHeadline:{color:'#f3eee4',fontFamily:'serif',fontSize:28,lineHeight:37,fontWeight:'800'},
 portraitBody:{color:'#c6cfcb',fontSize:16,lineHeight:25},
 portraitFlow:{width:'100%',alignItems:'center',paddingVertical:6},
 portraitFlowArrow:{color:colors.lime,fontSize:20,lineHeight:24,fontWeight:'900'},
 portraitFlowNode:{width:'88%',minHeight:58,borderWidth:1,borderColor:'#31443f',borderRadius:29,paddingHorizontal:16,paddingVertical:9,flexDirection:'row',alignItems:'center',gap:13,backgroundColor:'#091714'},
 portraitFlowIcon:{width:38,height:38,borderRadius:19,borderWidth:1,borderColor:'#53645f',alignItems:'center',justifyContent:'center',backgroundColor:'#0d1d19'},
 portraitFlowIconText:{color:colors.lime,fontSize:20,fontWeight:'900'},
 portraitFlowCopy:{flex:1},
 portraitFlowLabel:{color:'#f3eee4',fontSize:15,lineHeight:20,fontWeight:'800'},
 portraitFlowDetail:{color:'#9eaaa5',fontSize:12,lineHeight:17},
 portraitRule:{height:1,marginTop:7,backgroundColor:'#40544e'},
 portraitKeyLabel:{color:colors.lime,fontSize:12,lineHeight:18,fontWeight:'900'},
 portraitKey:{color:'#f3eee4',fontSize:17,lineHeight:26},
 heatPipeApparatus:{width:'100%',alignSelf:'stretch',overflow:'hidden',backgroundColor:'#06100e'},
 // Apparatus, divider and explanation all share the exact poster width.
 heatPipeExplanation:{width:'100%',alignSelf:'stretch',overflow:'hidden',backgroundColor:'#06100e'},
 heatPipeLeftCrop:{position:'absolute',left:0,top:0,height:'100%',zIndex:0},
 heatPipeRightCrop:{position:'absolute',top:0,height:'100%'},
 // The right-hand crop starts on the source poster's vertical divider. Cover
 // the whole divider (plus its antialiased edge) so it does not look like a
 // second card border on phones.
 // The source poster has a vertical divider at the left edge of its detail
 // panel. Cover only that baked-in seam; the container itself remains 100%
 // wide so the detail background still aligns with the apparatus above.
 heatPipeSeamMask:{position:'absolute',left:-1,top:0,bottom:0,width:18,backgroundColor:'#06100e',zIndex:2},
 heatPipeTopEdgeMask:{position:'absolute',left:0,right:0,top:0,height:3,backgroundColor:'#06100e',zIndex:2},
 heatPipeRightEdgeMask:{position:'absolute',right:0,top:0,bottom:0,width:1,backgroundColor:'#06100e',zIndex:2},
 sectionDivider:{width:'100%',alignSelf:'stretch',height:1,backgroundColor:'#40544e'},
 // A normal-flow sibling below the full apparatus image, never an overlay.
 heatPipeTimeline:{width:'100%',alignSelf:'stretch',minHeight:78,paddingHorizontal:8,paddingTop:9,paddingBottom:12,flexDirection:'row',alignItems:'flex-start',justifyContent:'space-between',backgroundColor:'#06100e'},
 heatPipeTrack:{position:'absolute',left:'10%',right:'10%',top:24,height:1,backgroundColor:'#89938f',zIndex:11},
 heatPipeTimelineItem:{width:'19%',alignItems:'center',gap:4,zIndex:12,elevation:12},
 heatPipeNumber:{width:30,height:30,borderRadius:15,borderWidth:1.5,borderColor:'#929d98',backgroundColor:'#06100e',alignItems:'center',justifyContent:'center'},
 heatPipeNumberText:{color:'#e2e6e3',fontSize:11,fontWeight:'900'},
 heatPipeTimelineText:{color:'#d2d8d5',fontSize:11,lineHeight:14,fontWeight:'800',textAlign:'center'},
 mobileCard:{width:'100%',overflow:'hidden',borderRadius:10,borderWidth:1,borderColor:'#31443f',backgroundColor:'#06100e'},
 mobileScene:{width:'100%',overflow:'hidden',backgroundColor:'#06100e'},
 // The generated art is a 66/34 desktop composition. Enlarge and clip it so
 // the apparatus panel fills the phone width without squeezing the device.
 mobileCrop:{position:'absolute',left:0,top:0,width:'151.52%',height:'100%'},
 mobileHeaderMask:{position:'absolute',left:0,top:0,width:'61%',height:'27%',paddingHorizontal:14,paddingTop:11,backgroundColor:'#06100e'},
 mobileKicker:{color:colors.lime,fontSize:8,fontWeight:'900',letterSpacing:1.25},
 mobileEffectTitle:{color:'#f3eee4',fontFamily:'serif',fontSize:28,lineHeight:34,fontWeight:'800',marginTop:5},
 mobileSubtitle:{color:'#c2cbc7',fontSize:11,lineHeight:15,letterSpacing:2.4,marginTop:1},
 mobileTimeline:{position:'absolute',left:0,right:0,bottom:0,height:74,paddingHorizontal:8,paddingTop:10,flexDirection:'row',alignItems:'flex-start',justifyContent:'space-between',backgroundColor:'#06100e'},
 mobileTrack:{position:'absolute',left:'10%',right:'10%',top:25,height:1,backgroundColor:'#89938f'},
 mobileTimelineItem:{width:'19%',alignItems:'center',gap:5,zIndex:1},
 mobileNumber:{width:31,height:31,borderRadius:16,borderWidth:1.5,borderColor:'#929d98',backgroundColor:'#06100e',alignItems:'center',justifyContent:'center'},
 mobileNumberText:{color:'#e2e6e3',fontSize:10,fontWeight:'900'},
 mobileTimelineText:{color:'#c7cecb',fontSize:10,lineHeight:13,fontWeight:'700',textAlign:'center'},
 mobileExplanation:{paddingHorizontal:20,paddingTop:22,paddingBottom:24,gap:12,borderTopWidth:1,borderTopColor:'#40544e',backgroundColor:'#06100e'},
 mobileStage:{color:colors.lime,fontSize:14,lineHeight:20,fontWeight:'900'},
 mobileHeadline:{color:'#f3eee4',fontFamily:'serif',fontSize:27,lineHeight:36,fontWeight:'800'},
 mobileBody:{color:'#c6cfcb',fontSize:16,lineHeight:25},
 mobileRule:{height:1,backgroundColor:'#40544e',marginTop:5},
 mobileKeyLabel:{color:colors.lime,fontSize:12,lineHeight:18,fontWeight:'900'},
 mobileKey:{color:'#f3eee4',fontSize:17,lineHeight:26},
 topMask:{position:'absolute',left:0,top:0,width:'66%',height:'22%',paddingHorizontal:'3%',paddingTop:'2%',backgroundColor:'rgba(5,14,13,.96)'},
 kicker:{color:colors.lime,fontSize:8,fontWeight:'800',letterSpacing:1},
 effectTitle:{color:'#f2eee5',fontSize:24,lineHeight:30,fontWeight:'800',marginTop:5},
 rightMask:{position:'absolute',right:0,top:0,bottom:0,width:'34%',paddingHorizontal:'2.4%',paddingTop:'5%',paddingBottom:'14%',backgroundColor:'rgba(4,14,13,.98)',borderLeftWidth:1,borderLeftColor:'#38504a'},
 stage:{color:colors.lime,fontSize:9,fontWeight:'800',marginBottom:9},
 headline:{color:'#f2eee5',fontSize:17,lineHeight:21,fontWeight:'800',marginBottom:8},
 body:{color:'#c8d1cd',fontSize:9,lineHeight:13},
 rule:{height:1,backgroundColor:'#38504a',marginTop:'auto',marginBottom:7},
 keyLabel:{color:colors.lime,fontSize:8,fontWeight:'800',marginBottom:5},
 key:{color:'#f2eee5',fontSize:9,lineHeight:13},
 timeline:{position:'absolute',left:0,bottom:0,width:'66%',height:'13%',paddingHorizontal:'2.5%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'rgba(5,14,13,.97)'},
 timelineItem:{flexDirection:'row',alignItems:'center',gap:3,maxWidth:'20%'},
 number:{width:20,height:20,borderRadius:10,borderWidth:1,borderColor:'#8b9792',alignItems:'center',justifyContent:'center'},
 activeNumber:{borderColor:colors.lime,backgroundColor:'#182019'},numberText:{color:'#d7ddda',fontSize:7,fontWeight:'800'},
 timelineText:{color:'#c5ceca',fontSize:7,fontWeight:'700',flexShrink:1},activeText:{color:colors.lime},
});
