const t=(ko:string,en:string,ja:string,zh:string)=>({ko,en,ja,zh});
const node=(icon:string,label:ReturnType<typeof t>,detail:ReturnType<typeof t>)=>({icon,label,detail});
export const cavitationPortraits=[
 require('../../assets/content/effects/acoustic-cavitation-01-portrait-v1.png'),
 require('../../assets/content/effects/acoustic-cavitation-02-portrait-v1.png'),
 require('../../assets/content/effects/acoustic-cavitation-03-portrait-v1.png'),
 require('../../assets/content/effects/acoustic-cavitation-04-portrait-v1.png'),
 require('../../assets/content/effects/acoustic-cavitation-05-portrait-v1.png'),
];
export const cavitationEquipmentLabels=[
 {number:'01',x:'16%',y:'32%',text:t('초음파 혼','Ultrasonic horn','超音波ホーン','超声变幅杆')},
 {number:'02',x:'66%',y:'60%',text:t('액체 매질','Liquid medium','液体媒質','液体介质')},
 {number:'03',x:'30%',y:'80%',text:t('금속 시편','Metal sample','金属試料','金属试样')},
] as const;
export const cavitationFlows=[
 [node('≈',t('초음파 혼','Ultrasonic horn','超音波ホーン','超声变幅杆'),t('기계적 진동','Mechanical vibration','機械振動','机械振动')),node('↕',t('압축 · 팽창','Compression · expansion','圧縮・膨張','压缩 · 膨胀'),t('압력이 교대로 변화','Alternating pressure','圧力が交互に変化','压力交替变化')),node('◎',t('압력파 전달','Wave propagation','圧力波伝播','压力波传播'),t('액체 내부로 전달','Into the liquid','液体内部へ伝達','传入液体'))],
 [node('↔',t('팽창 구간','Rarefaction','膨張区間','稀疏阶段'),t('액체가 당겨짐','Liquid under tension','液体に張力','液体受拉')),node('↓',t('국부 압력 감소','Local pressure drop','局所圧力低下','局部压力降低'),t('혼 주변의 저압 영역','Low pressure near horn','ホーン周辺の低圧','变幅杆附近低压')),node('◌',t('기포 형성 조건','Bubble conditions','気泡形成条件','气泡形成条件'),t('기존 미세 핵이 활성화','Existing nuclei activate','既存の微小核が活性化','已有微小核被激活'))],
 [node('·',t('미세 핵','Microscopic nuclei','微小核','微小核'),t('액체 속 기체와 결함','Gas and imperfections','液体中の気体と欠陥','液体中的气体与缺陷')),node('◌',t('기포 핵생성','Bubble nucleation','気泡核生成','气泡成核'),t('저압에서 작은 기포 형성','Small bubbles at low pressure','低圧で微小気泡が形成','低压下形成小气泡')),node('○',t('초기 기포','Initial bubbles','初期気泡','初始气泡'),t('성장할 기포의 시작','Starting point for growth','成長の出発点','生长的起点'))],
 [node('↕',t('압력 주기','Pressure cycle','圧力周期','压力周期'),t('압축과 팽창 반복','Repeated pressure changes','圧縮と膨張を反復','压缩与膨胀反复')),node('◯',t('기포 성장','Bubble growth','気泡成長','气泡生长'),t('팽창 중 반경 증가','Radius grows in rarefaction','膨張時に半径が増加','稀疏时半径增大')),node('◎',t('큰 기포','Expanded bubble','成長した気泡','长大的气泡'),t('다음 압축 구간으로','Toward compression','次の圧縮区間へ','进入下一压缩阶段'))],
 [node('↓',t('압력 상승','Pressure rises','圧力上昇','压力上升'),t('압축 구간 진입','Compression begins','圧縮区間に入る','进入压缩阶段')),node('◉',t('기포 붕괴','Bubble collapse','気泡崩壊','气泡崩溃'),t('기포가 급격히 수축','Rapid bubble contraction','気泡が急収縮','气泡急剧收缩')),node('≈',t('충격파 · 미세 제트','Shock · microjet','衝撃波・微小ジェット','冲击波 · 微射流'),t('표면 근처에 에너지 전달','Energy near the surface','表面近傍へエネルギー伝達','在表面附近传递能量'))],
];
