import React from 'react';
import {Image,StyleSheet,Text,useWindowDimensions,View} from 'react-native';
import {assets} from './data/assets';
import type {Effect,EffectStep} from './data/effects';
import {useLanguage} from './i18n';
import {colors} from './theme';
import {cavitationPortraits,cavitationEquipmentLabels,cavitationFlows} from './data/cavitationPortrait';
import {coronaPortraits,coronaEquipmentLabels} from './data/coronaPortrait';
import {remainingEffectPortraits} from './data/remainingEffectPortraits';

// Keep the portrait pilot as direct Metro dependencies. Looking these up via
// a generated string map can leave a blank frame in an already-running native
// bundle when the new files have not yet entered Metro's asset graph.
const ultrasonicPortraits=[
 require('../assets/content/effects/ultrasonic-soldering-01-portrait-v1.png'),
 require('../assets/content/effects/ultrasonic-soldering-02-portrait-v1.png'),
 require('../assets/content/effects/ultrasonic-soldering-03-portrait-v1.png'),
 require('../assets/content/effects/ultrasonic-soldering-04-portrait-v1.png'),
 require('../assets/content/effects/ultrasonic-soldering-05-portrait-v1.png'),
];
const solderingEquipmentLabels=[
 {number:'01',x:'39%',y:'34%',text:{ko:'솔더링 팁',en:'Soldering tip',ja:'こて先',zh:'焊头'}},
 {number:'02',x:'8%',y:'57%',text:{ko:'구리선',en:'Copper wire',ja:'銅線',zh:'铜线'}},
 {number:'03',x:'47%',y:'73%',text:{ko:'유리 기판',en:'Glass substrate',ja:'ガラス基板',zh:'玻璃基板'}},
 {number:'04',x:'70%',y:'43%',text:{ko:'공급 노즐',en:'Feed nozzle',ja:'供給ノズル',zh:'供料嘴'}},
] as const;
const solderingFlows=[
 [
  {icon:'⌖',label:{ko:'접합 도구',en:'Joining tools',ja:'接合工具',zh:'连接工具'},detail:{ko:'팁 · 공급 노즐',en:'Tip · feed nozzle',ja:'こて先・供給ノズル',zh:'焊头 · 供料嘴'}},
  {icon:'◇',label:{ko:'접합 위치',en:'Joint position',ja:'接合位置',zh:'连接位置'},detail:{ko:'정확히 정렬',en:'Precise alignment',ja:'正確に整列',zh:'精确对准'}},
  {icon:'●',label:{ko:'구리선 · 유리',en:'Copper · glass',ja:'銅線・ガラス',zh:'铜线 · 玻璃'},detail:{ko:'두 재료 준비',en:'Materials ready',ja:'二材料を準備',zh:'准备两种材料'}},
 ],[
  {icon:'♨',label:{ko:'가열',en:'Heating',ja:'加熱',zh:'加热'},detail:{ko:'팁에서 열 전달',en:'Heat from tip',ja:'こて先から伝熱',zh:'焊头传热'}},
  {icon:'●',label:{ko:'솔더 공급',en:'Solder feed',ja:'はんだ供給',zh:'供给钎料'},detail:{ko:'접합부에 공급',en:'Feed to joint',ja:'接合部へ供給',zh:'送至接合处'}},
  {icon:'◉',label:{ko:'용융 솔더',en:'Molten solder',ja:'溶融はんだ',zh:'熔融钎料'},detail:{ko:'액체 상태',en:'Liquid state',ja:'液体状態',zh:'液态'}},
 ],[
  {icon:'≈',label:{ko:'초음파 진동',en:'Ultrasonic vibration',ja:'超音波振動',zh:'超声振动'},detail:{ko:'팁에서 발생',en:'From the tip',ja:'こて先で発生',zh:'由焊头产生'}},
  {icon:'↓',label:{ko:'진동 전달',en:'Vibration transfer',ja:'振動伝達',zh:'振动传递'},detail:{ko:'용융 솔더로 전달',en:'Into molten solder',ja:'溶融はんだへ',zh:'传入熔融钎料'}},
  {icon:'◎',label:{ko:'젖음 촉진',en:'Wetting',ja:'ぬれ促進',zh:'促进润湿'},detail:{ko:'계면에 작용',en:'At the interface',ja:'界面に作用',zh:'作用于界面'}},
 ],[
  {icon:'●',label:{ko:'용융 솔더',en:'Molten solder',ja:'溶融はんだ',zh:'熔融钎料'},detail:{ko:'접합 매개물',en:'Joining medium',ja:'接合媒体',zh:'连接介质'}},
  {icon:'◇',label:{ko:'계면 확산',en:'Interface spread',ja:'界面拡散',zh:'界面铺展'},detail:{ko:'고르게 젖음',en:'Even wetting',ja:'均一にぬれる',zh:'均匀润湿'}},
  {icon:'⇄',label:{ko:'재료 연결',en:'Materials joined',ja:'材料を接合',zh:'连接材料'},detail:{ko:'구리선과 유리',en:'Copper and glass',ja:'銅線とガラス',zh:'铜线与玻璃'}},
 ],[
  {icon:'❄',label:{ko:'냉각',en:'Cooling',ja:'冷却',zh:'冷却'},detail:{ko:'가열 종료',en:'Heating ends',ja:'加熱終了',zh:'停止加热'}},
  {icon:'▱',label:{ko:'솔더 응고',en:'Solidification',ja:'はんだ凝固',zh:'钎料凝固'},detail:{ko:'액체에서 고체로',en:'Liquid to solid',ja:'液体から固体へ',zh:'液态变固态'}},
  {icon:'✓',label:{ko:'접합 고정',en:'Joint fixed',ja:'接合固定',zh:'接头固定'},detail:{ko:'연결층 완성',en:'Bond layer complete',ja:'接合層が完成',zh:'连接层完成'}},
 ],
] as const;

/**
 * The generated renders supply the apparatus and scientific state. All
 * explanatory copy is painted again as native text so changing locale never
 * depends on text baked into a bitmap.
 */
export default function EffectArtwork({item,step,index}:{item:Effect;step:EffectStep;index:number}){
 const {locale}=useLanguage();
 const {width:windowWidth}=useWindowDimensions();
 // Prefer artwork with the baked-in timeline removed from the actual bitmap.
 // Keep the original poster as a reversible source, not an opaque UI cover.
 // Versioned cleaned assets prevent Metro/iOS from reusing an older bitmap
 // that still contains the baked-in close icon or process footer.
 const source=assets[step.image.replace(/\.png$/, '-clean-v2.png')] ?? assets[step.image];
 const imageSize=Image.resolveAssetSource(source);
 const aspectRatio=imageSize.width/imageSize.height;
 const mobileSceneAspect=aspectRatio*.66;
 const principleLabel={ko:'핵심 원리',en:'KEY PRINCIPLE',ja:'核心原理',zh:'核心原理'}[locale];
 const mobileSplit=item.id==='heat-pipe'?.673:.66;
 const mobileDetail=1-mobileSplit;
 const additionalPortrait=remainingEffectPortraits[item.id];
 if(windowWidth<700&&(additionalPortrait||item.id==='ultrasonic-soldering'||item.id==='acoustic-cavitation'||item.id==='corona-discharge')){
  const isCavitation=item.id==='acoustic-cavitation';
  const isCorona=item.id==='corona-discharge';
  const portraits=additionalPortrait?.portraits ?? (isCorona?coronaPortraits:isCavitation?cavitationPortraits:ultrasonicPortraits);
  const equipmentLabels=additionalPortrait?.labelsByStage?.[index] ?? additionalPortrait?.labels ?? (isCorona?coronaEquipmentLabels:isCavitation?cavitationEquipmentLabels:solderingEquipmentLabels);
  const portrait=portraits[index] ?? portraits[0];
  // Match the full viewport and the actual portrait aspect ratio.
  // The Image itself needs explicit dimensions: React Native supplies
  // bundled asset dimensions by default, even with absoluteFill positioning.
  const portraitWidth=windowWidth;
  const portraitSize=Image.resolveAssetSource(portrait);
  const portraitHeight=portraitWidth*portraitSize.height/portraitSize.width;
  const explanationStart=additionalPortrait?.explanationStart ?? .667;
  const explanationFraction=(additionalPortrait?.explanationEnd ?? .997)-explanationStart;
  const explanationScale=portraitWidth/explanationFraction;
  return <View style={[a.portraitPoster,{width:portraitWidth}]} accessibilityRole="image" accessibilityLabel={`${item.title[locale]}. ${step.title[locale]}. ${step.body[locale]}. ${step.keyPoint[locale]}`}>
   <View style={[a.portraitApparatus,{width:portraitWidth,height:portraitHeight}]}>
    <Image source={portrait} resizeMode="contain" style={{width:portraitWidth,height:portraitHeight}} accessible={false}/>
    <View pointerEvents="none" style={a.portraitHeadingOverlay}>
     <Text style={a.portraitEyebrow}>{String(index+1).padStart(2,'0')}  —  {step.label[locale]}</Text>
     <Text style={[a.portraitTitle,a.portraitOverlayTitle]}>{item.title[locale]}</Text>
    </View>
    {equipmentLabels.map(label=><View key={label.number} style={[a.equipmentLabel,{left:label.x,top:label.y}]}>
     <View style={a.equipmentDot}/><Text style={a.equipmentNumber}>{label.number}</Text><Text style={a.equipmentText}>{label.text[locale]}</Text>
    </View>)}
   </View>
   <View style={a.heatPipeTimeline}>
    <View style={a.heatPipeTrack}/>
    {item.steps.map((p,i)=><View key={p.image} style={a.heatPipeTimelineItem}>
     <View style={[a.heatPipeNumber,i===index&&a.activeNumber]}><Text style={[a.heatPipeNumberText,i===index&&a.activeText]}>{String(i+1).padStart(2,'0')}</Text></View>
     <Text numberOfLines={2} style={[a.heatPipeTimelineText,i===index&&a.activeText]}>{p.label[locale]}</Text>
    </View>)}
   </View>
   <View style={a.sectionDivider}/>
   <View style={[a.heatPipeExplanation,{width:portraitWidth,height:explanationScale/aspectRatio}]}>
    {/* Preserve the original stage-specific charts, illustrations and copy.
        Start beyond the baked-in divider, with explicit bitmap dimensions. */}
    <Image source={source} resizeMode="contain" style={{position:'absolute',left:-explanationScale*explanationStart,top:0,width:explanationScale,height:explanationScale/aspectRatio}} accessible={false}/>
   </View>
   {locale!=='ko'&&<View style={a.portraitExplanation}>
    <Text style={a.portraitStage}>{String(index+1).padStart(2,'0')}  —  {step.label[locale]}</Text>
    <Text style={a.portraitHeadline}>{step.title[locale]}</Text>
    <Text style={a.portraitBody}>{step.body[locale]}</Text>
    <View style={a.portraitRule}/>
    <Text style={a.portraitKeyLabel}>{principleLabel}</Text>
    <Text style={a.portraitKey}>{step.keyPoint[locale]}</Text>
   </View>}
  </View>;
 }
 if(windowWidth<700){
  // Reuse both panels of the existing artwork at their original proportions.
  // Explicit bitmap dimensions override RN's intrinsic asset size.
  const apparatusWidth=windowWidth/mobileSplit;
  const apparatusHeight=apparatusWidth/aspectRatio;
  const explanationStart=mobileSplit+.007;
  const explanationWidth=windowWidth/(.997-explanationStart);
  const explanationHeight=explanationWidth/aspectRatio;
  return <View style={[a.heatPipePoster,{width:windowWidth}]} accessibilityRole="image" accessibilityLabel={`${item.title[locale]}. ${step.title[locale]}. ${step.body[locale]}. ${step.keyPoint[locale]}`}>
  <View style={[a.heatPipeApparatus,{width:windowWidth,height:apparatusHeight}]}>
   <Image source={source} resizeMode="contain" style={{position:'absolute',left:0,top:0,width:apparatusWidth,height:apparatusHeight}} accessible={false}/>
  </View>
   <View style={a.heatPipeTimeline}>
    <View style={a.heatPipeTrack}/>
    {item.steps.map((p,i)=><View key={p.image} style={a.heatPipeTimelineItem}>
     <View style={[a.heatPipeNumber,i===index&&a.activeNumber]}><Text style={[a.heatPipeNumberText,i===index&&a.activeText]}>{String(i+1).padStart(2,'0')}</Text></View>
     <Text numberOfLines={2} style={[a.heatPipeTimelineText,i===index&&a.activeText]}>{p.label[locale]}</Text>
    </View>)}
   </View>
  <View style={a.sectionDivider}/>
  <View style={[a.heatPipeExplanation,{width:windowWidth,height:explanationHeight}]}>
   <Image source={source} resizeMode="contain" style={{position:'absolute',left:-explanationWidth*explanationStart,top:0,width:explanationWidth,height:explanationHeight}} accessible={false}/>
  </View>
  {locale!=='ko'&&<View style={a.portraitExplanation}>
   <Text style={a.portraitStage}>{String(index+1).padStart(2,'0')}  —  {step.label[locale]}</Text>
   <Text style={a.portraitHeadline}>{step.title[locale]}</Text>
   <Text style={a.portraitBody}>{step.body[locale]}</Text>
   <View style={a.portraitRule}/><Text style={a.portraitKeyLabel}>{principleLabel}</Text>
   <Text style={a.portraitKey}>{step.keyPoint[locale]}</Text>
  </View>}
 </View>;
 }
 return <View style={[a.frame,{aspectRatio}]} accessibilityRole="image" accessibilityLabel={`${item.title[locale]}. ${step.title[locale]}. ${step.body[locale]}`}>
  <Image source={source} resizeMode="contain" style={StyleSheet.absoluteFill} accessible={false}/>
  <View style={a.topMask}><Text style={a.kicker}>TRIZ NOTE  /  EFFECT LIBRARY</Text><Text numberOfLines={1} adjustsFontSizeToFit style={a.effectTitle}>{item.title[locale]}</Text></View>
  <View style={a.rightMask}>
   <Text style={a.stage}>{String(index+1).padStart(2,'0')}  —  {step.label[locale]}</Text>
   <Text numberOfLines={3} adjustsFontSizeToFit minimumFontScale={0.65} style={a.headline}>{step.title[locale]}</Text>
   <Text numberOfLines={4} adjustsFontSizeToFit minimumFontScale={0.65} style={a.body}>{step.body[locale]}</Text>
   <View style={a.rule}/><Text style={a.keyLabel}>KEY PRINCIPLE</Text>
   <Text numberOfLines={4} adjustsFontSizeToFit minimumFontScale={0.65} style={a.key}>{step.keyPoint[locale]}</Text>
  </View>
  <View style={a.timeline}>{item.steps.map((p,i)=><View key={p.image} style={a.timelineItem}>
   <View style={[a.number,i===index&&a.activeNumber]}><Text style={[a.numberText,i===index&&a.activeText]}>{String(i+1).padStart(2,'0')}</Text></View>
   <Text numberOfLines={1} style={[a.timelineText,i===index&&a.activeText]}>{p.label[locale]}</Text>
  </View>)}</View>
 </View>;
}

const a=StyleSheet.create({
 frame:{width:'100%',overflow:'hidden',borderRadius:8,borderWidth:1,borderColor:colors.line,backgroundColor:'#07100e'},
 heatPipePoster:{width:'100%',overflow:'hidden',borderRadius:10,backgroundColor:'#06100e'},
 portraitPoster:{width:'100%',overflow:'hidden',borderRadius:10,backgroundColor:'#06100e'},
 portraitHeading:{paddingHorizontal:16,paddingTop:15,paddingBottom:12,gap:4,backgroundColor:'#06100e'},
 portraitHeadingOverlay:{position:'absolute',left:16,right:16,top:14,gap:4},
 portraitOverlayTitle:{textShadowColor:'#06100e',textShadowOffset:{width:0,height:1},textShadowRadius:4},
 portraitEyebrow:{color:colors.lime,fontSize:12,lineHeight:18,fontWeight:'900',letterSpacing:.6},
 portraitTitle:{color:'#f3eee4',fontFamily:'serif',fontSize:27,lineHeight:34,fontWeight:'800'},
 // Match the generated 4:5 bitmap so `contain` fills the available width
 // without cropping or introducing horizontal letterboxing.
 portraitApparatus:{alignSelf:'center',backgroundColor:'#06100e'},
 equipmentLabel:{position:'absolute',minHeight:24,maxWidth:'28%',paddingHorizontal:7,paddingVertical:4,borderRadius:4,flexDirection:'row',alignItems:'center',gap:4,backgroundColor:'rgba(5,16,14,.82)'},
 equipmentDot:{width:5,height:5,borderRadius:3,backgroundColor:colors.lime},
 equipmentNumber:{color:colors.lime,fontSize:9,lineHeight:13,fontWeight:'900'},
 equipmentText:{color:'#f3eee4',fontSize:10,lineHeight:14,fontWeight:'800',flexShrink:1},
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
