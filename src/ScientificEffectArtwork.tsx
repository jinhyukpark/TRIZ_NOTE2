import React,{useEffect,useState} from 'react';
import {ActivityIndicator,Image,StyleSheet,Text,useWindowDimensions,View} from 'react-native';
import type {Effect,EffectStep} from './data/effects';
import {scientificArtwork,scienceUi as ui} from './data/scientificArtwork';
import {useLanguage,type Locale} from './i18n';
import EquipmentCallout from './EquipmentCallout';
import {effectCallouts} from './data/effectCallouts';
import ExpansionDiagram from './ExpansionDiagram';
import {expansionEffects} from './data/expansionEffects';
import {effects} from './data/effects';
import ContentImage from './ContentImage';
import {localEffectImages} from './data/localEffectImages';

const ink='#f3f2e9',muted='#a7b8b4',accent='#c7ff28',cyan='#59dfea',line='#364e49';
/** Text and charts stay native; bitmaps contain only apparatus/phenomena. */
export default function ScientificEffectArtwork({item,step,index}:{item:Effect;step:EffectStep;index:number}){
 const {locale}=useLanguage();
 const {width:windowWidth}=useWindowDimensions();
 const width=Math.min(windowWidth,640);
 const config=scientificArtwork[item.id];
 const source=config.images[index];
 const sourceKey=typeof source==='object'&&'uri' in source?source.uri:`${item.id}-${index}`;
 const [imageReady,setImageReady]=useState(false);
 useEffect(()=>setImageReady(false),[sourceKey]);
 const size=Image.resolveAssetSource(source);
 const height=width*size.height/size.width;
 const tags=config.tags[index];
 return <View style={{width,maxWidth:'100%',alignSelf:'center'}} testID={`science-${item.id}-${index}`}>
  <View style={{width,height}}>
   {!imageReady&&<View pointerEvents="none" style={styles.imageLoading}><ActivityIndicator color={accent}/></View>}
   <ContentImage key={`${item.id}-${index}`} source={source} fallback={localEffectImages[item.id].images[index]} resizeMode="contain" accessibilityLabel={step.title[locale]} style={{width,height}} onLoadStart={()=>setImageReady(false)} onLoad={()=>setImageReady(true)}/>
   {imageReady&&<><View style={[styles.heading,item.id==='skin-depth'&&index>=2?{width:width*.38}:undefined]} pointerEvents="none"><Text style={styles.eyebrow}>{String(index+1).padStart(2,'0')} — {step.label[locale]}</Text><Text style={[styles.title,{fontSize:width<360?24:28}]}>{item.title[locale]}</Text>{locale!=='en'&&<Text style={styles.englishSubtitle} numberOfLines={1} ellipsizeMode="tail">({item.title.en})</Text>}</View>
   {tags.map((tag,i)=><EquipmentCallout key={i} position={effectCallouts[item.id][index][i]} text={tag.name[locale]} description={`${tag.name[locale]}. ${tag.role[locale]}`} aspectRatio={size.width/size.height}/>)}</>}
  </View>
  <View style={styles.timeline} testID="science-timeline">
   <View style={{position:'absolute',left:'10%',right:'10%',top:42,height:1,backgroundColor:line}}/>
   {item.steps.map((s,i)=><View key={i} style={{flex:1,alignItems:'center',gap:7}}><View style={[styles.node,{borderColor:i===index?accent:muted}]}><Text style={[styles.number,{color:i===index?accent:muted}]}>{String(i+1).padStart(2,'0')}</Text></View><Text style={[styles.timelineText,{color:i===index?accent:muted}]}>{s.label[locale]}</Text></View>)}
  </View>
  <View style={styles.divider}/>
  <View style={styles.copy}>
   <Text style={styles.eyebrow}>{String(index+1).padStart(2,'0')} — {step.label[locale]}</Text>
   <Text style={styles.explanationTitle}>{step.title[locale]}</Text>
   <Text style={styles.body}>{step.body[locale]}</Text>
   <ScientificDiagram id={item.id} index={index} width={width-32} locale={locale}/>
   <View style={styles.divider}/><Text style={styles.eyebrow}>{ui.principle[locale]}</Text><Text style={styles.body}>{step.keyPoint[locale]}</Text>
   <Text style={[styles.eyebrow,{marginTop:14}]}>{ui.parts[locale]}</Text>
   {tags.map((tag,i)=><View key={i} style={{gap:4}}><Text style={styles.part}><Text style={{color:accent}}>{String(i+1).padStart(2,'0')} </Text>{tag.name[locale]}</Text><Text style={styles.body}>{tag.role[locale]}</Text></View>)}
  </View>
 </View>;
}

type SegmentProps={x1:number;y1:number;x2:number;y2:number;color?:string;thickness?:number;dashed?:boolean};
function Segment({x1,y1,x2,y2,color=cyan,thickness=2,dashed=false}:SegmentProps){
 const length=Math.hypot(x2-x1,y2-y1),angle=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
 return <View style={{position:'absolute',left:(x1+x2-length)/2,top:(y1+y2)/2-thickness/2,width:length,height:thickness,backgroundColor:dashed?'transparent':color,borderTopWidth:dashed?thickness:0,borderColor:color,borderStyle:dashed?'dashed':'solid',transform:[{rotate:`${angle}deg`}]}}/>;
}
function Dot({x,y,r,color}:{x:number;y:number;r:number;color:string}){
 return <View style={{position:'absolute',left:x-r,top:y-r,width:2*r,height:2*r,borderRadius:r,backgroundColor:color,borderWidth:1,borderColor:'#ffffff55',shadowColor:color,shadowOpacity:.35,shadowRadius:5,shadowOffset:{width:0,height:0}}}/>;
}
function Chart({width,kind}:{width:number;kind:'wave'|'decay'}){
 const w=width-40,h=120,points=Array.from({length:61},(_,i)=>({x:20+w*i/60,y:kind==='decay'?20+h*(1-Math.exp(-3*i/60)):80-50*Math.sin(i/60*Math.PI*4)}));
 return <View style={{width,height:175}} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
  <Segment x1={20} y1={10} x2={20} y2={150} color={muted}/><Segment x1={20} y1={kind==='wave'?80:140} x2={width-12} y2={kind==='wave'?80:140} color={muted}/>
  {points.slice(1).map((p,i)=><Segment key={i} x1={points[i].x} y1={points[i].y} x2={p.x} y2={p.y} thickness={3}/>)}
  {kind==='decay'&&<><Segment x1={20+w/3} y1={20+h*(1-Math.exp(-1))} x2={20+w/3} y2={140} color={accent} dashed/><Dot x={20+w/3} y={20+h*(1-Math.exp(-1))} r={4} color={accent}/><Text style={[styles.plotText,{left:20+w/3-6,top:146}]}>δ</Text><Text style={[styles.plotText,{left:27+w/3,top:76}]}>1/e</Text><Text style={[styles.plotText,{left:0,top:8}]}>1</Text><Text style={[styles.plotText,{left:4,top:130}]}>0</Text><Text style={[styles.plotText,{left:width-27,top:146}]}>3δ</Text></>}
 </View>;
}

export function ScientificDiagram({id,index,width,locale}:{id:string;index:number;width:number;locale:Locale}){
 const expansion=expansionEffects.find(item=>item.id===id);
 if(expansion)return <ExpansionDiagram id={id} index={index} width={width} locale={locale} description={(effects.find(e=>e.id===id)??expansion).steps[index].body[locale]}/>;
 return <View testID={`diagram-${id}-${index}`} style={{gap:14,marginVertical:12}}>
 {id==='skin-depth'?<SkinDiagram index={index} width={width} locale={locale}/>:<HydrogenDiagram index={index} width={width} locale={locale}/>}</View>;
}
function SkinDiagram({index,width,locale}:{index:number;width:number;locale:Locale}){
 if(index===0)return <><Text style={styles.part}>{ui.crossSection[locale]}</Text><View style={{height:160,alignItems:'center',justifyContent:'center'}}>{[150,128,106,84,62].map((size,i)=><View key={i} style={{position:'absolute',width:size,height:size,borderRadius:size/2,backgroundColor:['#55dae7','#279fab','#166773','#15414b','#1a292f'][i],borderWidth:1,borderColor:'#83f6ff44'}}/>)}<Text style={{color:ink,fontSize:38}}>↕</Text></View><Text style={styles.body}>{ui.alternating[locale]}</Text><Chart width={width} kind="wave"/></>;
 if(index===1)return <><Text style={styles.part}>{ui.amplitude[locale]}</Text><Chart width={width} kind="decay"/><Text style={styles.caption}>{ui.distance[locale]}</Text><Text style={styles.formula}>J(x) / J₀ = e⁻ˣ⁄δ</Text><Text style={styles.caption}>{ui.goodConductor[locale]}</Text></>;
 if(index===2)return <><View style={{flexDirection:'row',gap:12,alignItems:'flex-end'}}>{[1,Math.exp(-1),Math.exp(-2)].map((v,i)=><View key={i} style={{flex:1,gap:7,alignItems:'center'}}><Text style={styles.part}>{(v*100).toFixed(1)}%</Text><View style={{width:'80%',height:140*v,backgroundColor:i===1?accent:cyan,borderRadius:4}}/><Text style={styles.caption}>{['x = 0','x = δ','x = 2δ'][i]}</Text></View>)}</View><Text style={styles.caption}>{ui.amplitude[locale]}</Text><Text style={styles.formula}>J(δ) / J₀ = 1/e ≈ 0.368</Text></>;
 if(index===3)return <><Text style={styles.part}>{ui.frequency[locale]}</Text>{[1,4,16].map(f=><View key={f} style={{gap:6}}><Text style={styles.caption}>{f}f₀ → δ₀ / {Math.sqrt(f)}</Text><View style={{height:28,width:'100%',backgroundColor:'#16323a'}}><View style={{height:28,width:`${100/Math.sqrt(f)}%`,backgroundColor:cyan}}/></View></View>)}<Text style={styles.caption}>{ui.normalized[locale]}</Text><Text style={styles.formula}>δ ∝ 1 / √f</Text><Text style={styles.caption}>{ui.fixed[locale]}</Text></>;
 return <><Text style={styles.formula}>δ = 1 / √(π f μ σ)</Text><Text style={styles.caption}>{ui.formula[locale]}</Text>{['σ','μ'].map(symbol=><View key={symbol} style={{gap:8}}><Text style={styles.part}>{symbol} × 4 → δ × ½</Text><View style={{height:35,flexDirection:'row',gap:12}}><View style={{flex:2,backgroundColor:cyan,borderRadius:4}}/><Text style={styles.part}>→</Text><View style={{flex:1,backgroundColor:accent,borderRadius:4}}/></View></View>)}<Text style={styles.caption}>{ui.fixed[locale]}</Text></>;
}

// Exact atom counts live in the native diagram rather than relying on a render.
function Molecule({width,product=false,surface=false,stage=0}:{width:number;product?:boolean;surface?:boolean;stage?:number}){
 const unit=width/300,px=(v:number)=>v*unit;
 const cy=surface?(stage===4?65:102):80;
 const atoms=[{x:108,y:cy,c:'#4b5964',r:16},{x:178,y:cy,c:'#4b5964',r:16},{x:75,y:cy-38,c:'#f0f2ed',r:10},{x:75,y:cy+38,c:'#f0f2ed',r:10},{x:211,y:cy-38,c:'#f0f2ed',r:10},{x:211,y:cy+38,c:'#f0f2ed',r:10}];
 const bonds:[[number,number],[number,number]][]=[[[108,cy],[75,cy-38]],[[108,cy],[75,cy+38]],[[178,cy],[211,cy-38]],[[178,cy],[211,cy+38]]];
 if(product){atoms.push({x:108,y:cy-57,c:cyan,r:10},{x:178,y:cy+57,c:cyan,r:10});bonds.push([[108,cy],[108,cy-57]],[[178,cy],[178,cy+57]]);}
 if(surface&&stage===3){atoms.push({x:108,y:cy-57,c:cyan,r:10});bonds.push([[108,cy],[108,cy-57]]);}
 const hY=170;
 return <View style={{width,height:px(surface?250:165)}} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
 {surface&&Array.from({length:18},(_,i)=><Dot key={`m${i}`} x={px(26+(i%9)*31)} y={px(207+Math.floor(i/9)*27)} r={px(14)} color="#b09066"/>)}
 {surface&&stage>=2&&stage<4&&(stage===3?[178]:[108,178]).map(x=><Segment key={x} x1={px(x)} y1={px(cy+18)} x2={px(x)} y2={px(194)} color={accent} dashed/>)}
 {surface&&stage<4&&(stage===3?[252]:[44,252]).map((x,i)=><Dot key={`h${i}`} x={px(x)} y={px(hY)} r={px(10)} color={cyan}/>)}
 {surface&&stage===3&&<Segment x1={px(252)} y1={px(hY-15)} x2={px(200)} y2={px(cy+17)} color={cyan} dashed/>}
 {bonds.map(([a,b],i)=><Segment key={i} x1={px(a[0])} y1={px(a[1])} x2={px(b[0])} y2={px(b[1])} color={muted} thickness={px(5)}/>)}
 {(product||surface&&stage===3?[0]:[-5,5]).map(offset=><Segment key={offset} x1={px(108)} y1={px(cy+offset)} x2={px(178)} y2={px(cy+offset)} color={muted} thickness={px(4)}/>)}
 {atoms.map((a,i)=><Dot key={`a${i}`} x={px(a.x)} y={px(a.y)} r={px(a.r)} color={a.c}/>)}
 </View>;
}
function HydrogenDiagram({index,width,locale}:{index:number;width:number;locale:Locale}){
 const legend=<View style={{flexDirection:'row',flexWrap:'wrap',gap:12}}>{[[ui.carbon,'#4b5964'],[ui.originalH,'#f0f2ed'],[ui.addedH,cyan]] .map(([label,color],i)=><View key={i} style={{flexDirection:'row',gap:6,alignItems:'center'}}><View style={{height:12,width:12,borderRadius:6,backgroundColor:color as string}}/><Text style={styles.caption}>{(label as typeof ui.carbon)[locale]}</Text></View>)}</View>;
 if(index===0)return <><Molecule width={width}/><Text style={styles.formula}>C₂H₄ + H₂ → C₂H₆</Text>{legend}<Text style={styles.caption}>{ui.conserved[locale]}</Text></>;
 if(index===1)return <><View style={{height:210,width}} accessibilityElementsHidden importantForAccessibility="no-hide-descendants"><Segment x1={width*.42} y1={35} x2={width*.58} y2={35} thickness={5}/><Dot x={width*.42} y={35} r={14} color={cyan}/><Dot x={width*.58} y={35} r={14} color={cyan}/><Segment x1={width*.42} y1={58} x2={width*.25} y2={135} color={accent} dashed/><Segment x1={width*.58} y1={58} x2={width*.75} y2={135} color={accent} dashed/><Dot x={width*.25} y={145} r={14} color={cyan}/><Dot x={width*.75} y={145} r={14} color={cyan}/>{Array.from({length:8},(_,i)=><Dot key={i} x={width*(i+.5)/8} y={184} r={width/18} color="#b09066"/>)}</View><Text style={styles.formula}>H₂ → H* + H*</Text><Text style={styles.caption}>* — {ui.site[locale]}</Text><Text style={styles.part}>{ui.catalyst[locale]}</Text></>;
 if(index===2)return <><Molecule width={width} surface stage={2}/>{legend}<Text style={styles.caption}>{ui.interaction[locale]}</Text></>;
 if(index===3)return <><Molecule width={width} surface stage={3}/><Text style={styles.part}>{ui.transfer[locale]}</Text><Text style={styles.formula}>C=C + 2H* → H–C–C–H</Text>{legend}</>;
 return <><View style={{flexDirection:'row',justifyContent:'space-between'}}><Text style={styles.part}>{ui.before[locale]}</Text><Text style={styles.part}>{ui.after[locale]}</Text></View><View style={{flexDirection:'row',alignItems:'center'}}><Molecule width={(width-24)/2}/><Text style={styles.part}>→</Text><Molecule width={(width-24)/2} product/></View><Text style={styles.formula}>C₂H₄ + H₂ → C₂H₆</Text>{legend}<Text style={styles.caption}>{ui.conserved[locale]}</Text><Text style={styles.part}>{ui.reusable[locale]}</Text></>;
}
const styles=StyleSheet.create({
 imageLoading:{position:'absolute',left:0,right:0,top:0,bottom:0,alignItems:'center',justifyContent:'center',backgroundColor:'#06100e'},
 englishSubtitle:{color:'#b9c5bf',fontSize:13,lineHeight:18},
 heading:{position:'absolute',top:16,left:16,right:24,gap:7},eyebrow:{fontSize:13,lineHeight:20,color:accent,fontWeight:'700'},title:{color:ink,fontWeight:'800',maxWidth:'80%'},
 timeline:{flexDirection:'row',paddingVertical:20,paddingHorizontal:6,gap:3},node:{borderWidth:1.5,borderRadius:23,width:44,height:44,backgroundColor:'#07110e',alignItems:'center',justifyContent:'center'},number:{fontSize:16,fontWeight:'800'},timelineText:{fontSize:12,lineHeight:17,textAlign:'center'},
 divider:{height:1,backgroundColor:line,width:'100%'},copy:{paddingHorizontal:16,paddingVertical:24,gap:16},explanationTitle:{color:ink,fontSize:24,lineHeight:34,fontWeight:'700'},body:{color:muted,fontSize:16,lineHeight:26},part:{color:ink,fontSize:16,lineHeight:24,fontWeight:'600'},caption:{color:muted,fontSize:13,lineHeight:20},formula:{color:cyan,fontSize:20,lineHeight:30,textAlign:'center',fontWeight:'600'},plotText:{position:'absolute',color:muted,fontSize:12}
});
