import React from 'react';
import {View,Text} from 'react-native';
import type {Locale} from './i18n';
import {xtext} from './data/expansionEffects';
import {remoteEffectDiagrams} from './data/remoteEffectDiagrams';

const cyan='#60dfea',amber='#f3b46a',lime='#c7ff28',ink='#ecf2ed',muted='#8ea8a1';
type Shape={kind:'line'|'dot'|'rect'|'text';x:number;y:number;x2?:number;y2?:number;w?:number;h?:number;r?:number;color?:string;fill?:string;text?:string;thick?:number};
/** Deterministic native diagrams: quantities, charge signs and labels aren't AI bitmap text. */
export function diagramShapes(id:string,stage:number):Shape[]{
 const a:Shape[]=[];
 const line=(x:number,y:number,x2:number,y2:number,color=cyan,thick=2)=>a.push({kind:'line',x,y,x2,y2,color,thick});
 const dot=(x:number,y:number,r=5,color=cyan,fill=color)=>a.push({kind:'dot',x,y,r,color,fill});
 const rect=(x:number,y:number,w:number,h:number,fill='#153333',color=muted)=>a.push({kind:'rect',x,y,w,h,fill,color});
 const text=(x:number,y:number,value:string,color=ink)=>a.push({kind:'text',x,y,text:value,color});
 const arrow=(x:number,y:number,x2:number,y2:number,color=lime)=>{line(x,y,x2,y2,color);const t=Math.atan2(y2-y,x2-x);line(x2,y2,x2-8*Math.cos(t-.45),y2-8*Math.sin(t-.45),color);line(x2,y2,x2-8*Math.cos(t+.45),y2-8*Math.sin(t+.45),color);};
 const wave=(x:number,y:number,w:number,amp:number,cycles=3,color=cyan)=>{for(let k=1;k<=60;k++)line(x+(k-1)*w/60,y-amp*Math.sin((k-1)/60*cycles*2*Math.PI),x+k*w/60,y-amp*Math.sin(k/60*cycles*2*Math.PI),color);};
 const graph=()=>{arrow(35,190,290,190,muted);arrow(35,190,35,20,muted);};
 if(id==='adhesive-bonding'){
  rect(30,140,170,22,'#667b83');rect(115,stage<2?64:108,170,22,'#667b83');
  if(stage>0)rect(115,stage<2?130:130,85,10,amber,amber);
  if(stage===0){[55,85,125,155,190,225].forEach(x=>{dot(x,x<110?131:55,3,muted);arrow(x,40,x,20);});}
  if(stage===1){rect(145,25,20,35,amber);arrow(155,63,155,115);dot(155,122,5,amber);}
  if(stage===2){arrow(155,91,155,119);arrow(145,135,120,135);arrow(160,135,192,135);}
  if(stage>=3)for(let k=0;k<6;k++){dot(122+k*13,134,3,lime);if(k<5)line(122+k*13,134,135+k*13,134,lime);}
  if(stage===4){arrow(62,151,10,151);arrow(251,118,308,118);}
 }else if(id==='condensation'){
  rect(30,145,260,20,'#357b9a');arrow(150,167,150,214,amber);text(159,185,'Q',amber);
  if(stage===0){for(let k=0;k<9;k++)dot(45+k*28,55+(k%3)*15,3,cyan);arrow(265,55,265,130);}
  else for(let k=0;k<(stage===1?6:9);k++)dot(45+k*27,140-(stage===1?3:stage===2?8:12),stage===1?3:stage===2?7:11,cyan);
  if(stage>=3){arrow(245,130,289,169);rect(265,175,40,25,'#173f51');if(stage===4)rect(268,188,34,10,cyan);}
 }else if(id==='acoustic-levitation'){
  rect(70,18,180,17,'#425861');rect(70,190,180,17,'#425861');
  if(stage===0){[175,150,125].forEach(y=>wave(105,y,110,7,1));arrow(40,175,40,65);}
  else if(stage===1){arrow(45,170,45,55);arrow(275,55,275,170);wave(100,105,120,35,2);}
  else {for(let k=0;k<80;k++){const y=40+k*1.8;dot(160+43*Math.sin(k/80*3*Math.PI),y,1.2,cyan);} [65,112,160].forEach(y=>line(105,y,215,y,muted,1));}
  if(stage>=3){(stage===4?[65,112,160]:[112]).forEach(y=>dot(160,y,6,amber));arrow(183,112,183,80);arrow(200,112,200,144,amber);text(213,85,'F');text(213,140,'mg',amber);}
 }else if(id==='amphiphiles'){
  const molecule=(x:number,y:number,t:number)=>{line(x,y,x+24*Math.cos(t),y+24*Math.sin(t),amber,3);dot(x,y,6,cyan);};
  if(stage===0){for(let k=0;k<6;k++)molecule(50+(k%3)*95,60+Math.floor(k/3)*80,k*.7);}
  else if(stage<3){rect(30,110,260,85,'#795730',amber);for(let k=0;k<(stage===1?4:9);k++)molecule(45+k*28,105,Math.PI/2);text(42,35,'H₂O',cyan);}
  else if(stage===3){for(let k=0;k<18;k++){const t=k*Math.PI/9;molecule(160+65*Math.cos(t),115+65*Math.sin(t),t+Math.PI);}}
  else {[[85,85],[220,90],[160,175]].forEach(([cx,cy])=>{dot(cx,cy,28,amber,'#74532e');for(let k=0;k<8;k++){const t=k*Math.PI/4;line(cx+25*Math.cos(t),cy+25*Math.sin(t),cx+13*Math.cos(t),cy+13*Math.sin(t),amber,2);dot(cx+29*Math.cos(t),cy+29*Math.sin(t),4,cyan);}});}
 }else if(id==='electrodeposition'){
  rect(35,75,250,115,'#123b50');rect(60,65,17,100,amber);rect(238,65,17,100,'#778991');
  line(68,65,68,30,muted);line(68,30,245,30,muted);line(245,30,245,65,muted);text(76,34,'+');text(222,34,'−');
  for(let k=0;k<8;k++){const x=100+(k%4)*33;dot(x,98+Math.floor(k/4)*50,4,cyan);}
  if(stage>0)arrow(110,122,216,122);
  if(stage>=2){for(let k=0;k<6;k++)dot(235,78+k*15,stage>=3?5:2,amber);text(96,205,'Cu²⁺ + 2e⁻ → Cu');}
  if(stage===4)rect(230,67,7,95,amber,amber);
 }else if(id==='electrostatic-induction'){
  dot(170,112,65,muted,'#1d3036');
  if(stage<4){rect(15,60,18,105,'#663c84');text(16,71,'−');text(16,109,'−');arrow(40,112,78,112);}
  const positive=stage===4?[[125,73],[115,119],[148,160],[197,153],[221,105],[182,57]]:[[130,82],[130,112],[130,142],[165,62],[165,162],[190,82]];
  positive.forEach(([x,y])=>text(x,y,'+',amber));
  if(stage<3){const neg=stage===0?[[190,100],[157,122],[145,100],[185,137],[152,80],[170,145]]:[[202,76],[213,104],[213,131],[195,149],[195,118],[187,98]];neg.slice(0,stage===2?3:6).forEach(([x,y])=>text(x,y,'−',cyan));}
  if(stage===2){line(235,112,281,112);line(281,112,281,190);line(264,190,298,190);line(270,196,292,196);line(276,202,286,202);arrow(246,101,283,101);text(252,74,'e⁻',cyan);}
  if(stage===4)text(111,201,'Q > 0',amber);
 }else if(id==='distillation'){
  dot(75,142,45,muted,'#213841');rect(43,145,64,25,'#854b91');line(75,98,75,54);line(75,54,239,101);rect(137,64,80,45,'#184957',cyan);line(125,67,235,104,ink,3);line(239,101,239,135);dot(239,169,32,muted,'#16323b');
  if(stage>0){[55,72,89].forEach(x=>dot(x,144-stage*3,3,amber));arrow(75,90,75,61,amber);}
  if(stage>=2)arrow(97,59,139,72,amber);
  if(stage>=3){dot(239,130,4,cyan);arrow(191,44,191,20,amber);text(204,25,'Q',amber);}
  if(stage===4){rect(217,174,43,17,cyan,cyan);arrow(36,204,106,204,amber);arrow(215,214,268,214);}
 }else if(id==='photoionisation'){
  if(stage<2){dot(190,115,50,muted,'#102c37');dot(190,115,14,amber);dot(225,81,6,cyan);if(stage===1){wave(15,110,100,13,3,'#c08df6');arrow(125,110,145,110,'#c08df6');text(25,68,'hν');}}
  else {line(60,174,280,174,muted);line(60,60,280,60,muted);dot(140,stage===2?174:stage===3?78:36,6,cyan);arrow(105,170,105,64,lime);text(60,107,'Eᵢ');text(218,42,'E = 0');text(197,178,'E < 0');if(stage===4){arrow(163,40,260,25);text(201,84,'A⁺ + e⁻');}}
 }else if(id==='creaming'){
  rect(65,20,190,185,'#143644',muted);
  for(let k=0;k<24;k++){const x=80+(k%6)*30;const y=stage===0||stage===4?42+Math.floor(k/6)*43:stage===1?32+Math.floor(k/6)*35:stage===2?32+Math.floor(k/6)*21:31+Math.floor(k/6)*13;dot(x,y,6,amber);}
  if(stage===1||stage===2)arrow(285,175,285,65);
  if(stage===3)line(65,88,255,88,cyan);
  if(stage===4){arrow(280,50,280,170);arrow(35,170,35,50);}
 }else if(id==='bingham-plastic'){
  graph();text(9,20,'τ');text(280,202,'γ̇');text(6,129,'τᵧ',amber);line(35,135,280,135,muted,1);line(35,135,265,38,cyan,3);
  const xs=[35,35,40,195,35],ys=[187,158,133,68,187];dot(xs[stage],ys[stage],6,lime);
  if(stage===3){line(90,112,205,112,amber);line(205,112,205,63,amber);text(117,91,'μₚ',amber);}
 }else if(id==='aerogel'){
  rect(30,180,260,18,stage>0?amber:muted);rect(30,30,260,18,cyan);
  for(let row=0;row<4;row++)for(let col=0;col<6;col++){const x=45+col*45,y=62+row*34;dot(x,y,3,muted);if(col<5)line(x,y,x+45,y+((col%2)*12),muted,1);if(row<3)line(x,y,x+8,y+34,muted,1);}
  if(stage===1||stage===4){arrow(310,176,310,52,amber);text(268,105,'Q',amber);}
  if(stage===2){line(46,175,54,142,amber,3);line(54,142,89,131,amber,3);line(89,131,81,96,amber,3);line(81,96,123,64,amber,3);}
  if(stage===3){for(let k=0;k<12;k++)dot(68+(k%4)*46,79+Math.floor(k/4)*34,3,cyan);arrow(66,91,90,91);}
 }else if(id==='arc-evaporation'){
  rect(25,30,270,170,'#11272e');rect(47,135,35,43,amber);rect(229,54,20,89,'#6e7d84');
  if(stage>0){dot(82,145,7,lime);for(let k=0;k<7;k++)line(88,145,220,62+k*13,'#926cbb',1);}
  if(stage>=2){for(let k=0;k<12;k++)dot(106+k*9,125-((k*19)%60),3,'#c08df6');arrow(135,140,199,102);}
  if(stage>=3)for(let k=0;k<7;k++)dot(225,63+k*12,stage===4?5:2,cyan);
 }else if(id==='activated-alumina'||id==='activated-carbon'){
  const carbon=id==='activated-carbon';
  if(stage===4&&carbon){graph();for(let k=1;k<=60;k++){const f=(j:number)=>185-140/(1+Math.exp(-(j-34)/5));line(35+(k-1)*4,f(k-1),35+k*4,f(k),amber,3);}text(2,20,'C/C₀');text(284,204,'t');text(11,56,'1');}
  else {dot(160,115,90,muted,carbon?'#22312f':'#e5e0d5');const pore=carbon?'#081612':'#40636a';rect(80,94,160,23,pore,pore);rect(120,55,22,128,pore,pore);rect(184,55,19,121,pore,pore);
   const sites=[[96,98],[111,112],[126,75],[137,131],[129,159],[174,99],[191,73],[198,146],[218,113]];
   if(stage>0)sites.slice(0,stage===1?2:stage===2?5:stage===3?9:2).forEach(([x,y])=>dot(x,y,4,carbon?amber:cyan));
   if(stage<3)arrow(8,105,69,105);if(stage===3)arrow(252,106,313,106);if(stage===4){arrow(150,58,150,11,amber);text(232,193,'Q',amber);}
  }
 }else if(id==='lorentz-force'){
  if(stage>0)for(let row=0;row<4;row++)for(let col=0;col<6;col++)text(60+col*36,34+row*43,stage===4?'⊙':'⊗',muted);
  if(stage===0)arrow(24,115,290,115,cyan);
  else {const r=stage===3?48:77,cx=165,cy=117;for(let k=1;k<=64;k++){const t=(k-1)/64*Math.PI*1.5,t2=k/64*Math.PI*1.5,s=stage===4?-1:1;line(cx+r*Math.cos(t),cy+s*r*Math.sin(t),cx+r*Math.cos(t2),cy+s*r*Math.sin(t2),cyan,3);}dot(cx+r,cy,5,cyan);arrow(cx+r,cy,cx+r,stage===4?cy-42:cy+42,amber);arrow(cx+r,cy,cx+r-40,cy,lime);text(cx+r+9,cy,'v',amber);text(cx+r-42,cy-24,'F',lime);}
 }else if(id==='ferromagnetism'){
  rect(25,40,270,140,'#203131');
  for(let row=0;row<3;row++)for(let col=0;col<5;col++){const x=51+col*51,y=65+row*43;const t=stage===0?(row*5+col)*1.7:stage===1&&col<2?1.5:stage===3&&col===0?1.3:stage===4?Math.PI:0;arrow(x-12*Math.cos(t),y-12*Math.sin(t),x+12*Math.cos(t),y+12*Math.sin(t),stage===0?muted:cyan);}
  if(stage===1||stage===2)arrow(30,210,285,210);if(stage===4)arrow(285,210,30,210);text(28,10,stage===0||stage===3?'H = 0':'H ≠ 0');
 }else if(id==='doppler-effect'){
  const moving=stage>0&&stage<4,source=stage===3?215:moving?170:155;
  for(let k=0;k<5;k++){const cx=moving?source-k*13:source;dot(cx,116,18+k*17,cyan,'transparent');}
  rect(source-11,106,22,20,amber,amber);rect(stage===3?85:280,86,12,60,muted,muted);
  if(moving)arrow(source-5,205,source+42,205,amber);
 }
 return a;
}
export const axes:Record<string,string>={
 'adhesive-bonding':'회색: 피착재 · 주황: 접착층 · 연두: 결합과 하중|Grey: substrates · amber: adhesive · lime: bonding and load|灰：被着材・橙：接着層・黄緑：結合と荷重|灰：被粘材料 · 橙：胶层 · 黄绿：结合与载荷',
 'condensation':'청록: 물 분자와 물방울 · Q: 방출되는 열|Cyan: water molecules and droplets · Q: released heat|青緑：水分子と水滴・Q：放出される熱|青色：水分子与水滴 · Q：释放的热',
 'acoustic-levitation':'진동자 사이의 음장과 입자 · F: 음향 복사력 · mg: 무게|Sound field and particles between arrays · F: radiation force · mg: weight|振動子間の音場と粒子・F：音響放射力・mg：重さ|阵列间声场与颗粒 · F：声辐射力 · mg：重力',
 'amphiphiles':'청록 머리는 물 쪽, 주황 꼬리는 물을 피해 배열됩니다.|Cyan heads face water; amber tails orient away from water.|青緑の頭部は水へ、橙の尾部は水を避けて配列します。|青色头部朝向水，橙色尾部避开水排列。',
 'electrodeposition':'양극(+): 구리 공급 · 음극(−): 구리 석출|Anode (+): copper supply · cathode (−): copper deposition|陽極(+)：銅を供給・陰極(−)：銅が析出|阳极(+)：供铜 · 阴极(−)：析出铜',
 'electrostatic-induction':'주황 +: 양전하 · 청록 −: 전자 · 접지로 전자가 이동합니다.|Amber +: positive charge · cyan −: electrons · grounding allows charge flow.|橙+：正電荷・青緑−：電子・接地で電子が移動します。|橙+：正电荷 · 青−：电子 · 接地允许电子转移。',
 'distillation':'가열 용기 → 증기 이동 → 냉각기 → 액체 수집|Heated vessel → vapor transfer → condenser → liquid collection|加熱容器 → 蒸気移動 → 冷却器 → 液体回収|加热容器 → 蒸气传输 → 冷凝器 → 收集液体',
 'creaming':'방울 크기는 유지된 채 위치와 농도가 달라집니다.|Droplet positions and concentration change without fusion.|液滴は融合せず、位置と濃度が変わります。|液滴不融合，只改变位置与浓度。',
 'aerogel':'가는 골격과 작은 기공이 열이 전달되는 경로를 제한합니다.|Thin struts and small pores restrict heat-transfer paths.|細い骨格と小さな気孔が熱伝達の経路を制限します。|细骨架与小孔隙限制传热路径。',
 'arc-evaporation':'음극의 작은 아크점 → 금속 플라스마 → 기판에 막 형성|Cathode spot → metal plasma → film on substrate|陰極点 → 金属プラズマ → 基板上に成膜|阴极弧斑 → 金属等离子体 → 基片成膜',
 'activated-alumina':'기공 확대: 청록 분자가 내부 표면에 붙고, 재생 시 빠져나옵니다.|Pore close-up: cyan molecules attach to internal surfaces and leave during regeneration.|細孔拡大：青緑の分子が内面に吸着し、再生時に離れます。|孔隙放大：青色分子吸附于内表面，再生时脱离。',
 'ferromagnetism':'작은 화살표: 자구의 자화 방향 · H: 외부 자기장|Small arrows: domain magnetization · H: applied magnetic field|小矢印：磁区の磁化方向・H：外部磁場|小箭头：磁畴磁化方向 · H：外磁场',
 'doppler-effect':'주황: 음원 · 청록 원: 파면 · 회색: 관측 마이크|Amber: source · cyan circles: wavefronts · grey: observing microphone|橙：音源・青緑の円：波面・灰：観測マイク|橙：声源 · 青色圆：波面 · 灰：观测麦克风',
 'bingham-plastic':'전단응력 τ / 전단률 γ̇ · 이상 모델|Shear stress τ / shear rate γ̇ · ideal model|せん断応力 τ / せん断速度 γ̇・理想モデル|剪切应力 τ / 剪切速率 γ̇ · 理想模型',
 'activated-carbon':'출구 농도 비율 C/C₀ / 시간 t|Outlet concentration ratio C/C₀ / time t|出口濃度比 C/C₀ / 時間 t|出口浓度比 C/C₀ / 时间 t',
 'photoionisation':'에너지 준위: 결합 상태에서 연속 상태로|Energy levels: bound to continuum|エネルギー準位：束縛状態から連続状態へ|能级：从束缚态到连续态',
 'lorentz-force':'청록: 전자 궤적 · 주황: 속도 · 연두: 자기력|Cyan: electron path · amber: velocity · lime: magnetic force|青緑：電子軌道・橙：速度・黄緑：磁気力|青色：电子轨迹 · 橙色：速度 · 黄绿：磁力',
};
export default function ExpansionDiagram({id,index,width,locale,description}:{id:string;index:number;width:number;locale:Locale;description:string}){
 const remote=remoteEffectDiagrams[id]?.[index];
 const scale=width/320,shapes=remote?.shapes??diagramShapes(id,index);
 const caption=axes[id]&&(id!=='activated-carbon'||index===4)&&(id!=='photoionisation'||index>=2);
 return <View testID={`expansion-diagram-${id}-${index}`} style={{gap:10,marginVertical:18}} accessible accessibilityLabel={description}>
  <View style={{width,height:230*scale}} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
  {shapes.map((s,i)=>{
   if(s.kind==='line'){const dx=s.x2!-s.x,dy=s.y2!-s.y,len=Math.hypot(dx,dy);return <View key={i} style={{position:'absolute',left:(s.x+s.x2!-len)*scale/2,top:(s.y+s.y2!)*scale/2,width:len*scale,height:(s.thick??2)*scale,backgroundColor:s.color,transform:[{rotate:`${Math.atan2(dy,dx)}rad`}]}}/>;}
   if(s.kind==='dot')return <View key={i} style={{position:'absolute',left:(s.x-s.r!)*scale,top:(s.y-s.r!)*scale,width:2*s.r!*scale,height:2*s.r!*scale,borderRadius:s.r!*scale,borderWidth:1,borderColor:s.color,backgroundColor:s.fill}}/>;
   if(s.kind==='rect')return <View key={i} style={{position:'absolute',left:s.x*scale,top:s.y*scale,width:s.w!*scale,height:s.h!*scale,borderColor:s.color,borderWidth:1,backgroundColor:s.fill,borderRadius:3}}/>;
   return <Text key={i} style={{position:'absolute',left:s.x*scale,top:s.y*scale,color:s.color,fontSize:12}}>{s.text}</Text>;
  })}
  </View>
  {(remote?remote.caption:caption)&&<Text style={{fontSize:13,lineHeight:20,color:muted}}>{remote?remote.caption?.[locale]:xtext(axes[id])[locale]}</Text>}
 </View>;
}
