import type {ImageSourcePropType} from 'react-native';
import {expansionFeatured} from './expansionArtwork';
import type {EffectText} from './effects';
export type FeaturedLabel={x:number;y:number;width:number;text:EffectText;target?:{x:number;y:number}};
export type FeaturedEffect={image:ImageSourcePropType;labels:FeaturedLabel[]};
// Percent coordinates measured on the complete generated image. No crop or masking.
export const featuredEffects:Record<string,FeaturedEffect>={
 ...expansionFeatured,
 'skin-depth':{image:require('../../assets/content/effects/featured/skin-depth-v1.png'),labels:[
  {x:3,y:34,width:24,target:{x:20,y:48},text:{ko:'구리 도체',en:'Copper conductor',ja:'銅導体',zh:'铜导体'}},
  {x:35,y:18,width:25,target:{x:49,y:35},text:{ko:'표면 전류',en:'Surface current',ja:'表面電流',zh:'表面电流'}},
  {x:76,y:43,width:23,target:{x:80,y:63},text:{ko:'교류 전원',en:'AC source',ja:'交流電源',zh:'交流电源'}},
 ]},
 'hydrogenation':{image:require('../../assets/content/effects/featured/hydrogenation-v1.png'),labels:[
  {x:7,y:21,width:24,target:{x:35,y:33},text:{ko:'에텐 · C₂H₄',en:'Ethene · C₂H₄',ja:'エテン · C₂H₄',zh:'乙烯 · C₂H₄'}},
  {x:60,y:20,width:23,target:{x:65,y:36},text:{ko:'수소 · H₂',en:'Hydrogen · H₂',ja:'水素 · H₂',zh:'氢气 · H₂'}},
  {x:64,y:88,width:32,target:{x:62,y:66},text:{ko:'촉매 표면',en:'Catalyst surface',ja:'触媒表面',zh:'催化剂表面'}},
 ]},
"ultrasonic-soldering":{image:require('../../assets/content/effects/featured/ultrasonic-soldering-v1.png'),labels:[{"x":31,"y":18,"width":18,"text":{"ko":"솔더링 팁","en":"Soldering tip","ja":"こて先","zh":"钎焊头"}},{"x":15,"y":31,"width":19,"text":{"ko":"구리선","en":"Copper wire","ja":"銅線","zh":"铜线"}},{"x":32,"y":69,"width":20,"text":{"ko":"유리 기판","en":"Glass substrate","ja":"ガラス基板","zh":"玻璃基板"}}]},
"acoustic-cavitation":{image:require('../../assets/content/effects/featured/acoustic-cavitation-v1.png'),labels:[{"x":30,"y":13,"width":18,"text":{"ko":"기포 붕괴","en":"Bubble collapse","ja":"気泡崩壊","zh":"气泡崩溃"}},{"x":32,"y":46,"width":19,"text":{"ko":"미세 제트","en":"Microjet","ja":"微小ジェット","zh":"微射流"}},{"x":64,"y":44,"width":20,"text":{"ko":"충격파","en":"Shock wave","ja":"衝撃波","zh":"冲击波"}}]},
"corona-discharge":{image:require('../../assets/content/effects/featured/corona-discharge-v1.png'),labels:[{"x":32,"y":28,"width":19,"text":{"ko":"코로나 발광","en":"Corona glow","ja":"コロナ発光","zh":"电晕辉光"}},{"x":52,"y":19,"width":20,"text":{"ko":"이온 이동","en":"Ion movement","ja":"イオン移動","zh":"离子运动"}},{"x":63,"y":4,"width":20,"text":{"ko":"링 전극","en":"Ring electrode","ja":"リング電極","zh":"环形电极"}}]},
"dielectric-heating":{image:require('../../assets/content/effects/featured/dielectric-heating-v1.png'),labels:[{"x":37,"y":14,"width":20,"text":{"ko":"균일 온도","en":"Uniform temperature","ja":"均一温度","zh":"均匀温度"}},{"x":55,"y":54,"width":20,"text":{"ko":"가열 중심부","en":"Heated core","ja":"加熱中心部","zh":"加热中心"}},{"x":48,"y":63,"width":20,"text":{"ko":"완성 시료","en":"Heated sample","ja":"加熱済み試料","zh":"加热后的样品"}}]},
"hall-effect":{image:require('../../assets/content/effects/featured/hall-effect-v1.png'),labels:[{"x":20,"y":19,"width":20,"text":{"ko":"전하 분리","en":"Charge separation","ja":"電荷分離","zh":"电荷分离"}},{"x":40,"y":67,"width":22,"text":{"ko":"자기 회로","en":"Magnetic circuit","ja":"磁気回路","zh":"磁路"}}]},
"heat-pipe":{image:require('../../assets/content/effects/featured/heat-pipe-v1.png'),labels:[{"x":61,"y":14,"width":20,"text":{"ko":"응축 액적","en":"Condensed droplets","ja":"凝縮液滴","zh":"冷凝液滴"}},{"x":47,"y":32,"width":20,"text":{"ko":"모세관 윅","en":"Capillary wick","ja":"毛細管ウィック","zh":"毛细芯"}},{"x":27,"y":30,"width":18,"text":{"ko":"액체 복귀","en":"Liquid return","ja":"液体還流","zh":"液体回流"}}]},
"light-diffraction":{image:require('../../assets/content/effects/featured/light-diffraction-v1.png'),labels:[{"x":13,"y":15,"width":20,"text":{"ko":"레이저","en":"Laser","ja":"レーザー","zh":"激光器"}},{"x":61,"y":55,"width":20,"text":{"ko":"미세 슬릿","en":"Narrow slit","ja":"微細スリット","zh":"窄缝"}},{"x":80,"y":12,"width":19,"text":{"ko":"회절 무늬","en":"Diffraction pattern","ja":"回折模様","zh":"衍射图样"}}]},
"polarisation":{image:require('../../assets/content/effects/featured/polarisation-v1.png'),labels:[{"x":60,"y":4,"width":20,"text":{"ko":"양극","en":"Positive electrode","ja":"正極","zh":"正极"}},{"x":77,"y":29,"width":21,"text":{"ko":"정렬 쌍극자","en":"Aligned dipoles","ja":"整列双極子","zh":"定向偶极子"}},{"x":56,"y":61,"width":22,"text":{"ko":"음극","en":"Negative electrode","ja":"負極","zh":"负极"}}]},
"shape-memory-alloy":{image:require('../../assets/content/effects/featured/shape-memory-alloy-v1.png'),labels:[{"x":34,"y":11,"width":20,"text":{"ko":"냉각 공기","en":"Cooling air","ja":"冷却空気","zh":"冷却空气"}},{"x":34,"y":32,"width":20,"text":{"ko":"복원 형상","en":"Recovered shape","ja":"回復形状","zh":"恢复形状"}},{"x":31,"y":66,"width":20,"text":{"ko":"니티놀","en":"Nitinol","ja":"ニチノール","zh":"镍钛合金"}}]},
"skin-effect":{image:require('../../assets/content/effects/featured/skin-effect-v1.png'),labels:[{"x":15,"y":25,"width":20,"text":{"ko":"표면 전류","en":"Surface current","ja":"表面電流","zh":"表面电流"}},{"x":55,"y":4,"width":22,"text":{"ko":"교류 코일","en":"AC coil","ja":"交流コイル","zh":"交流线圈"}},{"x":71,"y":34,"width":22,"text":{"ko":"저전류 중심","en":"Low-current core","ja":"低電流中心部","zh":"低电流中心"}}]},
"ultrasonic":{image:require('../../assets/content/effects/featured/ultrasonic-v1.png'),labels:[{"x":9,"y":32,"width":22,"text":{"ko":"신호 발생기","en":"Signal generator","ja":"信号発生器","zh":"信号发生器"}},{"x":64,"y":38,"width":22,"text":{"ko":"입사파","en":"Incident wave","ja":"入射波","zh":"入射波"}},{"x":65,"y":57,"width":24,"text":{"ko":"구형 시험편","en":"Spherical sample","ja":"球形試験片","zh":"球形试样"}}]},
"arc-welding":{image:require('../../assets/content/effects/featured/arc-welding-v1.png'),labels:[{"x":28,"y":20,"width":21,"text":{"ko":"용접 토치","en":"Welding torch","ja":"溶接トーチ","zh":"焊枪"}},{"x":54,"y":44,"width":20,"text":{"ko":"응고 비드","en":"Solidified bead","ja":"凝固ビード","zh":"凝固焊缝"}},{"x":73,"y":54,"width":24,"text":{"ko":"접지 클램프","en":"Ground clamp","ja":"接地クランプ","zh":"接地夹"}}]},
};
