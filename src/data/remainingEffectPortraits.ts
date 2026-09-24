import type {ImageSourcePropType} from 'react-native';

type Label={number:string;x:`${number}%`;y:`${number}%`;text:Record<'ko'|'en'|'ja'|'zh',string>};
type PortraitConfig={portraits:ImageSourcePropType[];labels:Label[];labelsByStage?:Label[][];explanationStart:number;explanationEnd?:number};

// Native overlays remain localized; the original detailed explanation artwork is retained.
// Coordinates are percentages of the whole uncropped portrait, not the screen.
export const remainingEffectPortraits:Record<string,PortraitConfig>={
 'dielectric-heating':{
  portraits:[
   require('../../assets/content/effects/dielectric-heating-01-portrait-v2.png'),
   require('../../assets/content/effects/dielectric-heating-02-portrait-v2.png'),
   require('../../assets/content/effects/dielectric-heating-03-portrait-v2.png'),
   require('../../assets/content/effects/dielectric-heating-04-portrait-v2.png'),
   require('../../assets/content/effects/dielectric-heating-05-portrait-v2.png'),
  ],
  explanationStart:0.668,
  labels:[{"number":"01","x":"18%","y":"46%","text":{"ko":"전극","en":"Electrode","ja":"電極","zh":"电极"}},{"number":"02","x":"42%","y":"67%","text":{"ko":"유전체","en":"Dielectric","ja":"誘電体","zh":"电介质"}},{"number":"03","x":"70%","y":"55%","text":{"ko":"고주파 코일","en":"RF coil","ja":"高周波コイル","zh":"射频线圈"}}],
 },
 'hall-effect':{
  portraits:[
   require('../../assets/content/effects/hall-effect-01-portrait-v2.png'),
   require('../../assets/content/effects/hall-effect-02-portrait-v2.png'),
   require('../../assets/content/effects/hall-effect-03-portrait-v2.png'),
   require('../../assets/content/effects/hall-effect-04-portrait-v2.png'),
   require('../../assets/content/effects/hall-effect-05-portrait-v2.png'),
  ],
  explanationStart:0.678,
  labels:[{"number":"01","x":"40%","y":"55%","text":{"ko":"홀 소자","en":"Hall element","ja":"ホール素子","zh":"霍尔元件"}},{"number":"02","x":"55%","y":"32%","text":{"ko":"자기장 요크","en":"Magnetic yoke","ja":"磁気ヨーク","zh":"磁轭"}},{"number":"03","x":"5%","y":"60%","text":{"ko":"전류원","en":"Current source","ja":"電流源","zh":"电流源"}}],
 },
 'heat-pipe':{
  portraits:[
   require('../../assets/content/effects/heat-pipe-01-portrait-v2.png'),
   require('../../assets/content/effects/heat-pipe-02-portrait-v2.png'),
   require('../../assets/content/effects/heat-pipe-03-portrait-v2.png'),
   require('../../assets/content/effects/heat-pipe-04-portrait-v2.png'),
   require('../../assets/content/effects/heat-pipe-05-portrait-v2.png'),
  ],
  explanationStart:0.678,
  labels:[{"number":"01","x":"8%","y":"55%","text":{"ko":"가열부","en":"Heater","ja":"加熱部","zh":"加热器"}},{"number":"02","x":"36%","y":"65%","text":{"ko":"히트 파이프","en":"Heat pipe","ja":"ヒートパイプ","zh":"热管"}},{"number":"03","x":"70%","y":"40%","text":{"ko":"응축부","en":"Condenser","ja":"凝縮部","zh":"冷凝器"}}],
 },
 'light-diffraction':{
  portraits:[
   require('../../assets/content/effects/light-diffraction-01-portrait-v2.png'),
   require('../../assets/content/effects/light-diffraction-02-portrait-v2.png'),
   require('../../assets/content/effects/light-diffraction-03-portrait-v2.png'),
   require('../../assets/content/effects/light-diffraction-04-portrait-v2.png'),
   require('../../assets/content/effects/light-diffraction-05-portrait-v2.png'),
  ],
  explanationStart:0.668,
  labels:[{"number":"01","x":"6%","y":"54%","text":{"ko":"광원","en":"Light source","ja":"光源","zh":"光源"}},{"number":"02","x":"40%","y":"47%","text":{"ko":"슬릿","en":"Slit","ja":"スリット","zh":"狭缝"}},{"number":"03","x":"70%","y":"62%","text":{"ko":"스크린","en":"Screen","ja":"スクリーン","zh":"屏幕"}}],
 },
 'polarisation':{
  portraits:[
   require('../../assets/content/effects/polarisation-01-portrait-v2.png'),
   require('../../assets/content/effects/polarisation-02-portrait-v2.png'),
   require('../../assets/content/effects/polarisation-03-portrait-v2.png'),
   require('../../assets/content/effects/polarisation-04-portrait-v2.png'),
   require('../../assets/content/effects/polarisation-05-portrait-v2.png'),
  ],
  explanationStart:0.668,
  labels:[{"number":"01","x":"40%","y":"37%","text":{"ko":"전극판","en":"Electrode plate","ja":"電極板","zh":"电极板"}},{"number":"02","x":"60%","y":"61%","text":{"ko":"유전체","en":"Dielectric","ja":"誘電体","zh":"电介质"}},{"number":"03","x":"20%","y":"51%","text":{"ko":"쌍극자","en":"Dipoles","ja":"双極子","zh":"偶极子"}}],
 },
 'shape-memory-alloy':{
  portraits:[
   require('../../assets/content/effects/shape-memory-alloy-01-portrait-v2.png'),
   require('../../assets/content/effects/shape-memory-alloy-02-portrait-v2.png'),
   require('../../assets/content/effects/shape-memory-alloy-03-portrait-v2.png'),
   require('../../assets/content/effects/shape-memory-alloy-04-portrait-v2.png'),
   require('../../assets/content/effects/shape-memory-alloy-05-portrait-v2.png'),
  ],
  explanationStart:0.668,
  labels:[{"number":"01","x":"34%","y":"61%","text":{"ko":"형상기억합금","en":"Memory alloy","ja":"形状記憶合金","zh":"形状记忆合金"}},{"number":"02","x":"65%","y":"45%","text":{"ko":"가열 도구","en":"Heater","ja":"加熱器","zh":"加热器"}},{"number":"03","x":"70%","y":"30%","text":{"ko":"온도 센서","en":"Temperature sensor","ja":"温度センサー","zh":"温度传感器"}}],
 },
 'skin-effect':{
  portraits:[
   require('../../assets/content/effects/skin-effect-01-portrait-v2.png'),
   require('../../assets/content/effects/skin-effect-02-portrait-v2.png'),
   require('../../assets/content/effects/skin-effect-03-portrait-v2.png'),
   require('../../assets/content/effects/skin-effect-04-portrait-v2.png'),
   require('../../assets/content/effects/skin-effect-05-portrait-v2.png'),
  ],
  explanationStart:0.668,
  labels:[{"number":"01","x":"13%","y":"59%","text":{"ko":"구리 도체","en":"Copper conductor","ja":"銅導体","zh":"铜导体"}},{"number":"02","x":"39%","y":"49%","text":{"ko":"유도 코일","en":"Induction coil","ja":"誘導コイル","zh":"感应线圈"}},{"number":"03","x":"68%","y":"36%","text":{"ko":"측정기","en":"Oscilloscope","ja":"オシロスコープ","zh":"示波器"}}],
 },
 'ultrasonic':{
  portraits:[
   require('../../assets/content/effects/ultrasonic-01-portrait-v2.png'),
   require('../../assets/content/effects/ultrasonic-02-portrait-v2.png'),
   require('../../assets/content/effects/ultrasonic-03-portrait-v2.png'),
   require('../../assets/content/effects/ultrasonic-04-portrait-v2.png'),
   require('../../assets/content/effects/ultrasonic-05-portrait-v2.png'),
  ],
  explanationStart:0.668,
  labels:[{"number":"01","x":"59%","y":"40%","text":{"ko":"초음파 혼","en":"Ultrasonic horn","ja":"超音波ホーン","zh":"超声变幅杆"}},{"number":"02","x":"5%","y":"66%","text":{"ko":"신호 발생기","en":"Signal generator","ja":"信号発生器","zh":"信号发生器"}},{"number":"03","x":"62%","y":"72%","text":{"ko":"금속 시편","en":"Metal target","ja":"金属試料","zh":"金属试样"}}],
 },
 'arc-welding':{
  portraits:[
   require('../../assets/content/effects/arc-welding-01-portrait-v2.png'),
   require('../../assets/content/effects/arc-welding-02-portrait-v2.png'),
   require('../../assets/content/effects/arc-welding-03-portrait-v2.png'),
   require('../../assets/content/effects/arc-welding-04-portrait-v2.png'),
   require('../../assets/content/effects/arc-welding-05-portrait-v2.png'),
  ],
  explanationStart:0.673,
  labels:[{"number":"01","x":"43%","y":"47%","text":{"ko":"용접 토치","en":"Welding torch","ja":"溶接トーチ","zh":"焊枪"}},{"number":"02","x":"39%","y":"72%","text":{"ko":"모재","en":"Workpiece","ja":"母材","zh":"母材"}},{"number":"03","x":"5%","y":"40%","text":{"ko":"보호 가스","en":"Shielding gas","ja":"シールドガス","zh":"保护气体"}}],
 },
};

// Stage-specific camera/tool positions: never reuse a tag at a stale pixel location.
const stageCoordinates:Record<string,[number,number][][]>={
 'light-diffraction':Array.from({length:5},()=>[[5,44],[43,58],[72,43]]),
 'heat-pipe':Array.from({length:5},()=>[[8,48],[36,59],[72,37]]),
 'hall-effect':Array.from({length:5},()=>[[37,57],[55,35],[4,61]]),
 'dielectric-heating':[
  [[27,46],[43,66],[4,58]],
  [[25,45],[44,62],[72,50]],
  [[16,40],[44,68],[72,49]],
  [[16,39],[43,65],[72,51]],
  [[29,43],[46,64],[10,51]],
 ],
 'shape-memory-alloy':[
  [[35,63],[66,44],[70,29]],
  [[40,56],[40,69],[70,40]],
  [[30,62],[44,43],[70,46]],
  [[42,61],[65,43],[9,39]],
  [[43,64],[68,54],[64,38]],
 ],
 'arc-welding':[
  [[43,49],[36,72],[5,48]],
  [[42,48],[32,72],[5,48]],
  [[42,49],[32,72],[5,48]],
  [[42,47],[32,71],[5,43]],
  [[42,47],[32,72],[5,43]],
 ],
};
for(const [id,stages] of Object.entries(stageCoordinates)){
 const config=remainingEffectPortraits[id];
 config.labelsByStage=stages.map(points=>config.labels.map((label,i)=>({
  ...label,x:`${points[i][0]}%`,y:`${points[i][1]}%`,
 })));
}
remainingEffectPortraits['shape-memory-alloy'].labelsByStage![4][1].text={
 ko:'측정 도구',en:'Measurement probe',ja:'測定プローブ',zh:'测量探头',
};
