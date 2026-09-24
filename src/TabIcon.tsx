import React from 'react';
import {View} from 'react-native';

type Point=readonly [number,number];
export type TabIconName='home'|'principles'|'effects'|'matrix'|'saved';
// Shared 24-point outline grid, rendered with native views (no text glyphs or WebView).
const outlines:Record<TabIconName,readonly (readonly Point[])[]>={
 effects:[[[2,12],[5,12],[8,5],[12,19],[16,5],[19,12],[22,12]]],
 home:[[[3,10],[12,3],[21,10]],[[5,9],[5,21],[10,21],[10,14],[14,14],[14,21],[19,21],[19,9]]],
 principles:[[[12,5],[9,3.5],[3,3.5],[3,19],[9,19],[12,21],[15,19],[21,19],[21,3.5],[15,3.5],[12,5],[12,21]]],
 matrix:[[[9,3],[15,3]],[[10,3],[10,9],[4.5,19],[4.5,20],[5.5,21],[18.5,21],[19.5,20],[19.5,19],[14,9],[14,3]],[[7.5,14],[16.5,14]]],
 saved:[[[6,3],[18,3],[18,21],[12,17],[6,21],[6,3]]],
};
export default function TabIcon({name,color,size=24}:{name:TabIconName;color:string;size?:number}){
 const scale=size/24,stroke=1.7*scale;
 return <View pointerEvents="none" accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={{width:size,height:size}}>
  {outlines[name].flatMap((points,path)=>points.slice(1).map((end,i)=>{
   const start=points[i],dx=(end[0]-start[0])*scale,dy=(end[1]-start[1])*scale,length=Math.hypot(dx,dy);
   return <View key={`${path}-${i}`} style={{position:'absolute',backgroundColor:color,borderRadius:stroke/2,width:length+stroke,height:stroke,left:(start[0]+end[0])*scale/2-(length+stroke)/2,top:(start[1]+end[1])*scale/2-stroke/2,transform:[{rotate:`${Math.atan2(dy,dx)}rad`}]}}/>;
  }))}
 </View>;
}
