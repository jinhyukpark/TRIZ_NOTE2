import React from 'react';
import {StyleSheet,Text,View} from 'react-native';

/** Coordinates are percentages of the uncropped image; y is the text baseline. */
export type CalloutPosition={x:number;y:number;width:number;target:{x:number;y:number}};
export function leaderGeometry(position:CalloutPosition,aspectRatio:number){
 const {target}=position;
 const startX=target.x<position.x+position.width/2?position.x:position.x+position.width;
 const dx=target.x-startX,dy=(target.y-position.y)/aspectRatio;
 const length=Math.hypot(dx,dy);
 return {left:(startX+target.x-length)/2,top:(position.y+target.y)/2,length,angle:Math.atan2(dy,dx)};
}
export default function EquipmentCallout({position,text,aspectRatio,fontSize=12,description}:{position:CalloutPosition;text:string;aspectRatio:number;fontSize?:number;description?:string}){
 const g=leaderGeometry(position,aspectRatio);
 return <View pointerEvents="none" style={StyleSheet.absoluteFill} testID="equipment-callout" accessible accessibilityLabel={description??text}>
  <View testID="callout-leader" style={[s.line,{left:`${g.left}%`,top:`${g.top}%`,width:`${g.length}%`,transform:[{rotate:`${g.angle}rad`}]}]}/>
  <View testID="callout-baseline" style={[s.line,{left:`${position.x}%`,top:`${position.y}%`,width:`${position.width}%`}]}/>
  <View testID="callout-point" style={[s.point,{left:`${position.target.x}%`,top:`${position.target.y}%`}]}/>
  <View style={{position:'absolute',left:`${position.x}%`,bottom:`${100-position.y}%`,width:`${position.width}%`,paddingBottom:3}}>
   <Text allowFontScaling={false} style={[s.text,{fontSize,lineHeight:fontSize+3}]}>{text}</Text>
  </View>
 </View>;
}
const s=StyleSheet.create({
 line:{position:'absolute',height:1,backgroundColor:'#b3c3c0'},
 point:{position:'absolute',width:4,height:4,borderRadius:2,backgroundColor:'#c7ff29',transform:[{translateX:-2},{translateY:-1.5}]},
 text:{color:'#f1f4ed',fontWeight:'600',textShadowColor:'#020906',textShadowOffset:{width:0,height:1},textShadowRadius:3},
});
