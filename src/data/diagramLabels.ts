import type {Locale} from '../i18n';
import principleDiagramLabels from './principleDiagramLabels.json';
import evolutionDiagramLabels from './evolutionDiagramLabels.json';

export type DiagramText=Record<Locale,string>;
export type DiagramLabel={x:number;y:number;width:number;height:number;fontSize:number;text:DiagramText;color?:string;align?:'left'|'center'|'right'};
export type LocalizedDiagram={clean:string;width:number;height:number;labels:DiagramLabel[]};
export const words=(ko:string,en:string,ja:string,zh:string):DiagramText=>({ko,en,ja,zh});
const label=(x:number,y:number,width:number,height:number,fontSize:number,text:DiagramText,align:DiagramLabel['align']='left',color='#f1f5ef'):DiagramLabel=>({x,y,width,height,fontSize,text,align,color});
const diagram=(name:string,labels:DiagramLabel[],width=1536,height=1024):LocalizedDiagram=>({clean:`/assets/localized/${name}.png`,width,height,labels});

// Coordinates refer to the original full canvas, never the containing view.
// Each entry is enabled only after its text-free background has been inspected.
export const diagramLabels:Record<string,LocalizedDiagram>={
 ...principleDiagramLabels as Record<string,LocalizedDiagram>,
 ...evolutionDiagramLabels as Record<string,LocalizedDiagram>,
 '/assets/illustrations/principle-30-3d-labeled.png':diagram('principle-30',[
  label(500,38,350,62,43,words('대기압','Atmospheric pressure','大気圧','大气压'),'center'),
  label(1255,153,270,65,39,words('유연한 막 / 필름','Flexible membrane / film','柔軟な膜・フィルム','柔性膜／薄膜')),
  label(1280,405,245,75,39,words('분말형 화물','Powder cargo','粉体貨物','粉状货物')),
  label(590,515,180,67,39,words('보조 필터','Auxiliary filters','補助フィルター','辅助过滤器'),'center'),
  label(30,800,220,75,39,words('흡입 배관','Suction pipe','吸引配管','吸气管道'),'right'),
  label(575,860,265,67,39,words('진공 펌프','Vacuum pump','真空ポンプ','真空泵'),'center'),
 ]),
 '/assets/advanced/physical-41.png':diagram('physical-41',[
  label(200,26,1136,104,72,words('시간의 분리','Separation in time','時間による分離','时间分离'),'center'),
  label(291,163,239,47,32,words('이착륙 시','Takeoff / landing','離着陸時','起飞／降落时'),'center','#d3f76b'),
  label(1005,163,239,47,32,words('고속 비행 시','High-speed flight','高速飛行時','高速飞行时'),'center','#d3f76b'),
  label(38,254,222,55,34,words('펼친 날개','Extended wings','広げた翼','展开的机翼')),
  label(1305,250,210,54,34,words('회전 연결부','Pivot joint','回転接続部','旋转连接部')),
  label(1306,574,220,80,33,words('뒤로 젖힌 날개','Swept-back wings','後退させた翼','后掠机翼')),
  label(180,879,1176,78,40,words('필요한 시점에 따라 날개의 형태를 바꿉니다','Wing shape changes at different stages of flight.','必要なタイミングに応じて翼の形を変えます。','根据飞行阶段改变机翼形状。'),'center'),
 ]),
 '/assets/advanced/physical-42.png':diagram('physical-42',[
  label(220,22,1096,104,72,words('공간의 분리','Separation in space','空間による分離','空间分离'),'center'),
  label(1210,188,300,64,40,words('원거리 영역','Distance vision zone','遠方用領域','远视区域')),
  label(1260,588,258,70,40,words('근거리 영역','Near vision zone','近方用領域','近视区域')),
  label(64,662,232,65,40,words('하나의 렌즈','One lens','一枚のレンズ','同一镜片')),
  label(440,865,560,75,40,words('영역별로 다른 광학 특성','Different optical properties by zone','領域ごとに異なる光学特性','各区域具有不同的光学特性'),'center'),
  label(624,582,210,133,28,words('지식은 더 넓은 세상을 만듭니다.','Knowledge opens a wider world.','知識は世界を広げます。','知识拓宽世界。'),'center','#34382c'),
 ]),
 '/assets/advanced/physical-43.png':diagram('physical-43',[
  label(50,20,830,104,64,words('전체와 부분의 분리','Separation of whole and parts','全体と部分の分離','整体与部分分离')),
  label(53,133,820,80,41,words('부분은 단단하게, 전체는 유연하게','Rigid parts, flexible whole','部分は硬く、全体は柔軟に','部分坚硬，整体柔韧')),
  label(112,247,330,60,37,words('유연한 체인 전체','Flexible chain assembly','柔軟なチェーン全体','柔韧的链条整体')),
  label(1280,124,227,68,37,words('단단한 링크','Rigid link','硬いリンク','刚性链节')),
  label(1370,388,150,63,35,words('회전 핀','Pivot pin','回転ピン','转轴销')),
 ]),
 '/assets/advanced/physical-44.png':diagram('physical-44',[
  label(57,31,500,91,60,words('조건에 의한 분리','Separation by condition','条件による分離','条件分离')),
  label(1050,134,435,55,32,words('큰 입자: 통과하지 못함','Large particles: retained','大きな粒子：通過しない','大颗粒：被截留')),
  label(764,590,274,57,32,words('작은 입자: 통과','Small particles: pass','小さな粒子：通過','小颗粒：通过')),
  label(1370,689,153,62,33,words('체의 눈','Mesh opening','ふるいの目','筛孔')),
  label(951,798,528,77,33,words('크기에 따라 통과 여부가 달라집니다','Passage depends on particle size.','大きさによって通過の可否が変わります。','能否通过取决于颗粒大小。'),'center'),
 ]),
};

const tip=words('솔더링 팁','Soldering tip','こて先','焊头');
const wire=words('구리선','Copper wire','銅線','铜线');
const glass=words('유리 기판','Glass substrate','ガラス基板','玻璃基板');
const molten=words('용융 솔더','Molten solder','溶融はんだ','熔融钎料');
const nozzle=words('솔더 공급 노즐','Solder feed nozzle','はんだ供給ノズル','钎料供料嘴');
const interfaceText=words('접합 계면','Joining interface','接合界面','接合界面');
const ultrasoundTip=words('초음파 팁','Ultrasonic tip','超音波チップ','超声波焊头');
const stages=[words('배치','Position','配置','定位'),words('가열','Heat','加熱','加热'),words('초음파','Ultrasound','超音波','超声波'),words('접합','Join','接合','连接'),words('고정','Set','固定','固定')];
const headings=[
 words('두 재료,\n하나의 접합을 준비합니다.','Prepare two materials\nfor one joint.','二つの材料を\n接合する準備。','准备两种材料，\n形成一个接头。'),
 words('열을 전달하고,\n솔더를 녹입니다.','Apply heat\nand melt the solder.','熱を伝え、\nはんだを溶かします。','传递热量，\n熔化钎料。'),
 words('진동으로,\n계면에 작용합니다.','Vibration acts\nat the interface.','振動が\n界面に作用します。','通过振动，\n作用于界面。'),
 words('퍼지면서,\n두 재료를 연결합니다.','Solder spreads\nand joins the materials.','広がりながら、\n二つの材料をつなぎます。','钎料铺展，\n连接两种材料。'),
 words('식으면,\n하나로 연결됩니다.','Cooling sets\nthe joint.','冷えると、\n一つにつながります。','冷却后，\n连接成一体。'),
];
const subtitles=[
 words('유리 위에 구리선을 놓고 도구를 정렬합니다.','Place copper wire on glass and align the tools.','ガラスの上に銅線を置き、工具を合わせます。','将铜线放在玻璃上，对齐工具。'),
 words('접합부에 열과 솔더를 함께 공급합니다.','Supply heat and solder to the joint.','接合部に熱とはんだを供給します。','向接合部位供给热量和钎料。'),
 words('초음파가 용융 솔더에 전달됩니다.','Ultrasound is transmitted into molten solder.','超音波が溶融はんだに伝わります。','超声波传入熔融钎料。'),
 words('전용 솔더가 접합 계면에 퍼집니다.','Specialized solder spreads along the interface.','専用はんだが接合界面に広がります。','专用钎料在接合界面铺展。'),
 words('솔더가 굳으며 구리선과 유리를 고정합니다.','Solidifying solder secures copper wire to glass.','はんだが固まり、銅線とガラスを固定します。','钎料凝固，将铜线与玻璃固定。'),
];
const keys=[
 words('정확한 배치가 안정적인 접합의 시작입니다.','Accurate alignment starts a stable joint.','正確な配置が安定した接合の出発点です。','准确定位是稳定接合的起点。'),
 words('열이 솔더를 녹여 접합을 준비합니다.','Heat melts solder in preparation for joining.','熱ではんだを溶かし、接合を準備します。','热量熔化钎料，为连接做好准备。'),
 words('초음파가 젖음과 계면 작용을 돕습니다.','Ultrasound assists wetting and interfacial action.','超音波がぬれと界面作用を助けます。','超声波促进润湿和界面作用。'),
 words('적합한 솔더와 공정 조건이 필요합니다.','Suitable solder and process conditions are required.','適切なはんだと工程条件が必要です。','需要合适的钎料与工艺条件。'),
 words('솔더가 두 재료 사이의 연결층이 됩니다.','Solder forms a connecting layer between the materials.','はんだが二つの材料の接合層になります。','钎料形成两种材料之间的连接层。'),
];
for(let i=0;i<5;i++){
 const last=i===4, width=last?1672:1742, height=last?941:903;
 // Last supplied slide uses a distinct canvas (including a decorative video bar).
 const sx=width/1742,sy=last?865/903:1;
 const L=(x:number,y:number,w:number,h:number,f:number,t:DiagramText,a:DiagramLabel['align']='left',color?:string)=>label(x*sx,y*sy,w*sx,h*sy,f*sx,t,a,color);
 const labels=[
  L(47,20,490,31,17,words('TRIZ NOTE  /  EFFECT LIBRARY  /  01','TRIZ NOTE  /  EFFECT LIBRARY  /  01','TRIZ NOTE  /  EFFECT LIBRARY  /  01','TRIZ NOTE  /  EFFECT LIBRARY  /  01')),
  L(49,79,510,92,68,words('초음파 솔더링','Ultrasonic soldering','超音波はんだ付け','超声波钎焊')),
  L(56,178,450,38,24,words('Ultrasonic soldering','Scientific effect','科学的効果','科学效应')),
  L(1198,87,480,40,24,words(`${String(i+1).padStart(2,'0')} — ${stages[i].ko}`,`${String(i+1).padStart(2,'0')} — ${stages[i].en}`,`${String(i+1).padStart(2,'0')} — ${stages[i].ja}`,`${String(i+1).padStart(2,'0')} — ${stages[i].zh}`)),
  L(1200,138,495,121,46,headings[i]),L(1204,268,490,58,25,subtitles[i]),
  L(1203,750,466,35,22,words('핵심 원리','Key principle','重要な原理','核心原理'),'left','#e7f79e'),
  L(1203,790,490,58,25,keys[i]),
  L(1465,858,250,29,14,words('원리 이해를 위한 개념 시각화','Conceptual illustration','原理理解のための概念図','原理概念示意图'),'right','#a0b3ac'),
 ];
 const firstX=[464,464,443,464,464][i],firstY=i===2?260:265;
 labels.push(L(firstX,firstY,146,32,21,words('01 '+(i===2?ultrasoundTip.ko:tip.ko),'01 '+(i===2?ultrasoundTip.en:tip.en),'01 '+(i===2?ultrasoundTip.ja:tip.ja),'01 '+(i===2?ultrasoundTip.zh:tip.zh))));
 const numbered=(n:string,t:DiagramText):DiagramText=>({ko:n+' '+t.ko,en:n+' '+t.en,ja:n+' '+t.ja,zh:n+' '+t.zh});
 if(i===0||last){labels.push(L(164,373,164,37,21,numbered('02',wire)),L(375,699,180,31,21,numbered('03',glass)));}
 else if(i===1){labels.push(L(949,383,192,34,21,numbered('02',nozzle)),L(499,592,177,32,21,numbered('03',molten)));}
 else {labels.push(L(462,487,176,37,21,numbered('02',i===2?molten:interfaceText)),L(375,700,180,32,21,numbered('03',glass)));}
 // Numbered timeline remains a true language-aware text overlay too.
 [69,277,471,670,870].forEach((x,j)=>{labels.push(L(x-18,842,36,36,19,words('0'+(j+1),'0'+(j+1),'0'+(j+1),'0'+(j+1)),'center'),L(x+38,839,90,39,21,stages[j]));});
 const flow=(x:number,y:number,w:number,h:number,t:DiagramText,f=23)=>labels.push(L(x,y,w,h,f,t));
 const small=(ko:string,en:string,ja:string,zh:string)=>words(ko,en,ja,zh);
 if(i===0){
  flow(1440,345,125,35,small('접합 도구','Joining tools','接合工具','接合工具'));
  flow(1440,379,125,28,small('팁 · 공급 노즐','Tip / feed nozzle','先端・供給ノズル','焊头／供料嘴'),18);
  flow(1468,433,109,38,small('정렬','Align','整列','对齐'));
  flow(1440,498,125,37,small('접합 위치','Joint position','接合位置','接合位置'));
 }else if(i===1){
  flow(1307,345,119,35,tip);flow(1307,379,119,29,small('열 전달','Heat transfer','熱伝達','传热'),18);
  flow(1567,345,120,35,small('공급 노즐','Feed nozzle','供給ノズル','供料嘴'));flow(1567,379,120,29,small('솔더 공급','Solder feed','はんだ供給','供给钎料'),18);
  flow(1317,426,105,37,stages[1]);flow(1571,426,98,37,small('공급','Feed','供給','供料'));
  flow(1438,483,135,37,molten);flow(1438,519,135,28,small('액체 상태','Liquid state','液体状態','液态'),18);
  flow(1409,584,172,32,small('접합 준비','Ready to join','接合準備','准备连接'));
 }else{
  flow(1440,344,130,38,last?small('냉각','Cooling','冷却','冷却'):i===2?ultrasoundTip:molten);
  flow(1440,380,132,29,last?small('가열 종료','Heating ends','加熱終了','停止加热'):i===2?small('기계적 진동','Mechanical vibration','機械的振動','机械振动'):small('접합 매개물','Joining medium','接合媒体','连接介质'),18);
  flow(1466,426,185,38,last?small('응고','Solidification','凝固','凝固'):i===2?small('진동 전달','Vibration transfer','振動伝達','传递振动'):small('젖음','Wetting','ぬれ','润湿'));
  flow(1439,483,139,38,last?small('고체 솔더','Solid solder','固体はんだ','固态钎料'):i===2?molten:interfaceText);
  if(i===2)flow(1439,520,139,29,small('계면 작용','Interface action','界面作用','界面作用'),18);
  flow(1408,584,200,32,last?small('고정 · 결합','Set / bond','固定・結合','固定／结合'):i===2?small('젖음 촉진','Promote wetting','ぬれを促進','促进润湿'):small('연결 · 결합','Connect / bond','接続・結合','连接／结合'));
 }
 flow(1314,634,109,37,wire);flow(1314,671,109,29,small('도체','Conductor','導体','导体'),18);
 flow(1570,634,107,37,small('유리','Glass','ガラス','玻璃'));flow(1570,671,119,29,small('접합 대상','Workpiece','接合対象','接合对象'),18);
 if(i===2)flow(1530,828,174,28,small('파동은 개념 표시입니다.','Waves are schematic.','波は概念表現です。','波纹为概念示意。'),14);
 if(last){labels.push(label(116,880,65,32,15,words('00:27','00:27','00:27','00:27')),label(956,880,65,32,15,words('00:28','00:28','00:28','00:28')));}
 diagramLabels[`/assets/effects/ultrasonic-soldering-0${i+1}.png`]=diagram(`ultrasonic-soldering-0${i+1}`,labels,width,height);
}
