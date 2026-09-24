import type {Locale} from '../i18n';
import {generatedEffects} from './generatedEffects';
export type EffectText=Record<Locale,string>;
export type EffectStep={image:string;label:EffectText;title:EffectText;body:EffectText;keyPoint:EffectText};
export type Effect={id:string;title:EffectText;summary:EffectText;steps:EffectStep[]};
const text=(ko:string,en:string,ja:string,zh:string):EffectText=>({ko,en,ja,zh});
// Add a new item here with a stable id and ordered steps; bundle its images via npm run assets.
export const effects:Effect[]=[{
 id:'ultrasonic-soldering',
 title:text('초음파 솔더링','Ultrasonic soldering','超音波はんだ付け','超声波钎焊'),
 summary:text('열과 초음파를 이용해 구리선과 유리를 연결하는 과정을 살펴보세요.','Explore how heat and ultrasound help join copper wire to glass.','熱と超音波を使って銅線とガラスを接合する過程を見てみましょう。','了解如何利用热量和超声波将铜线与玻璃连接。'),
 steps:[
  {image:'/assets/effects/ultrasonic-soldering-01.png',label:text('배치','Position','配置','定位'),title:text('두 재료와 도구를 정렬합니다.','Align the materials and tools.','材料と工具の位置を合わせます。','对齐材料和工具。'),body:text('유리 기판 위에 구리선을 놓고 접합할 위치에 솔더링 팁과 공급 노즐을 맞춥니다.','Place the copper wire on the glass substrate. Align the soldering tip and feed nozzle with the intended joint.','ガラス基板の上に銅線を置き、接合位置にこて先と供給ノズルを合わせます。','将铜线放在玻璃基板上，使焊头和供料嘴对准连接位置。'),keyPoint:text('정확한 배치가 안정적인 접합의 시작입니다.','Accurate positioning is the starting point for a stable joint.','正確な配置が安定した接合の出発点です。','准确定位是形成稳定接头的起点。')},
  {image:'/assets/effects/ultrasonic-soldering-02.png',label:text('가열','Heat','加熱','加热'),title:text('열을 전달하고 솔더를 녹입니다.','Apply heat and melt the solder.','熱を伝えて、はんだを溶かします。','传递热量，熔化钎料。'),body:text('솔더링 팁이 접합부에 열을 전달하고, 공급 노즐에서 나온 솔더가 녹아 액체 상태가 됩니다.','The soldering tip transfers heat to the joint. Solder from the feed nozzle melts into a liquid.','こて先が接合部に熱を伝え、供給ノズルから出たはんだが溶けて液体になります。','焊头向接合部位传热，供料嘴送出的钎料熔化为液态。'),keyPoint:text('열은 솔더를 녹여 접합을 준비합니다.','Heat melts the solder to prepare for joining.','熱ではんだを溶かし、接合を準備します。','热量使钎料熔化，为连接做好准备。')},
  {image:'/assets/effects/ultrasonic-soldering-03.png',label:text('초음파','Ultrasound','超音波','超声波'),title:text('진동을 용융 솔더에 전달합니다.','Transmit vibration into the molten solder.','溶融はんだに振動を伝えます。','将振动传入熔融钎料。'),body:text('팁의 기계적 진동이 용융 솔더에 전달됩니다. 초음파는 접합 계면에서 솔더가 퍼지는 젖음을 돕습니다.','Mechanical vibration from the tip enters the molten solder. Ultrasound helps wetting, allowing solder to spread at the joining interface.','こて先の機械的振動が溶融はんだに伝わります。超音波は接合界面ではんだが広がる「ぬれ」を助けます。','焊头的机械振动传入熔融钎料，超声波帮助钎料在接合界面润湿和铺展。'),keyPoint:text('이미지의 파동은 진동 전달을 나타내는 개념 표현입니다.','The illustrated waves represent vibration transfer conceptually.','図の波は振動の伝達を示す概念表現です。','图中的波纹是振动传递的概念表示。')},
  {image:'/assets/effects/ultrasonic-soldering-04.png',label:text('접합','Join','接合','连接'),title:text('솔더가 퍼지며 두 재료를 연결합니다.','Solder spreads to connect the materials.','はんだが広がり、材料をつなぎます。','钎料铺展，连接两种材料。'),body:text('용융 솔더가 구리선과 유리 사이의 접합 계면에 퍼집니다. 이 사례에는 재료에 맞는 전용 솔더와 적절한 공정 조건이 필요합니다.','Molten solder spreads at the interface between the copper wire and glass. This example requires a suitable specialized solder and appropriate process conditions.','溶融はんだが銅線とガラスの接合界面に広がります。この例では材料に合った専用はんだと適切な工程条件が必要です。','熔融钎料在铜线与玻璃之间的接合界面铺展。本例需要适用的专用钎料和合适的工艺条件。'),keyPoint:text('솔더는 두 재료 사이의 접합 매개물입니다.','Solder acts as the joining medium between the materials.','はんだは材料の間をつなぐ接合媒体です。','钎料是连接两种材料的中间介质。')},
  {image:'/assets/effects/ultrasonic-soldering-05.png',label:text('냉각·고정','Cool & set','冷却・固定','冷却固定'),title:text('솔더가 굳으며 접합부가 고정됩니다.','The joint sets as the solder solidifies.','はんだが固まり、接合部を固定します。','钎料凝固，接合部固定。'),body:text('가열을 끝내고 식히면 솔더가 액체에서 고체로 바뀝니다. 굳은 솔더가 구리선과 유리 사이의 연결층이 됩니다.','After heating ends, cooling changes the solder from liquid to solid. The solid solder forms a connecting layer between the copper wire and glass.','加熱を終えて冷却すると、はんだが液体から固体に変わります。固まったはんだが銅線とガラスの間の接合層になります。','停止加热并冷却后，钎料从液态变为固态，形成铜线与玻璃之间的连接层。'),keyPoint:text('배치 → 가열 → 초음파 → 접합 → 냉각·고정','Position → Heat → Ultrasound → Join → Cool & set','配置 → 加熱 → 超音波 → 接合 → 冷却・固定','定位 → 加热 → 超声波 → 连接 → 冷却固定')}
 ]
},...generatedEffects];
export const effectUi={
 intro:text('과학적 효과를 이미지와 단계별 설명으로 살펴보세요.','Explore scientific effects through images and step-by-step explanations.','画像と段階ごとの説明で科学的効果を学びましょう。','通过图片和分步说明了解科学效应。'),
 search:text('Effects 검색','Search effects','Effectsを検索','搜索Effects'),
 empty:text('검색 결과가 없습니다. 다른 단어로 검색해 보세요.','No results. Try another search term.','見つかりませんでした。別の言葉で検索してください。','没有结果，请尝试其他关键词。'),
 previous:text('이전 단계','Previous','前の段階','上一步'),next:text('다음 단계','Next','次の段階','下一步'),
 list:text('목록으로','Back to list','一覧に戻る','返回列表'),restart:text('처음부터 보기','Start again','最初から見る','从头查看'),
 key:text('핵심 포인트','Key point','ポイント','要点'),
 imageNote:text('이미지의 설명 텍스트는 선택한 언어로 표시됩니다.','Artwork descriptions are displayed in the selected language.','画像内の説明文は選択した言語で表示されます。','图片中的说明文字将以所选语言显示。')
};
