import type {EffectText} from './effects';
import {expansionArtwork} from './expansionArtwork';
import type {ImageSourcePropType} from 'react-native';
const l=(ko:string,en:string,ja:string,zh:string):EffectText=>({ko,en,ja,zh});
export type ScienceTag={x:number;y:number;name:EffectText;role:EffectText};
export type ScienceArtwork={images:ImageSourcePropType[];tags:ScienceTag[][]};
const conductor={x:37,y:29,name:l('도체','Conductor','導体','导体'),role:l('교류가 흐르는 금속','Metal carrying AC','交流が流れる金属','承载交流的金属')};
const source={x:61,y:80,name:l('교류원','AC source','交流源','交流源'),role:l('전류 방향을 주기적으로 반전','Periodically reverses current','電流方向を周期的に反転','周期性反转电流方向')};
const layer={x:4,y:44,name:l('표면 전류층','Surface layer','表面電流層','表面电流层'),role:l('전류 밀도가 높은 영역','Region of higher current density','電流密度が高い領域','电流密度较高的区域')};
const depth={x:4,y:44,name:l('침투 깊이','Penetration','浸透深さ','穿透深度'),role:l('표면에서 안쪽으로 진폭 감쇠','Amplitude decays inward','表面から内部へ振幅が減衰','振幅从表面向内衰减')};
const metal={x:8,y:77,name:l('촉매 표면','Catalyst','触媒表面','催化剂表面'),role:l('흡착과 수소 전달을 돕는 금속 활성 자리','Metal sites support adsorption and hydrogen transfer','吸着と水素移動を助ける金属活性点','促进吸附和氢转移的金属活性位')};
const alkene={x:5,y:28,name:l('에텐','Ethene','エテン','乙烯'),role:l('C=C 결합을 가진 반응물 C₂H₄','C₂H₄ reactant with a C=C bond','C=C結合を持つ反応物C₂H₄','含C=C键的反应物C₂H₄')};
const hydrogen={x:63,y:33,name:l('수소 H₂','Hydrogen H₂','水素 H₂','氢气 H₂'),role:l('두 수소 원자를 공급','Supplies two hydrogen atoms','水素原子を二つ供給','提供两个氢原子')};
const adsorbed={x:62,y:46,name:l('흡착 수소','Surface H','吸着水素','吸附氢'),role:l('H₂에서 분리되어 촉매에 결합','Dissociated from H₂ and bound to the catalyst','H₂から解離して触媒に結合','从H₂解离并结合于催化剂')};
export const scientificArtwork:Record<string,ScienceArtwork>={
 ...expansionArtwork,
 'skin-depth':{images:[
  require('../../assets/content/effects/skin-depth-01-portrait-v1.png'),
  require('../../assets/content/effects/skin-depth-02-portrait-v1.png'),
  require('../../assets/content/effects/skin-depth-03-portrait-v1.png'),
  require('../../assets/content/effects/skin-depth-04-portrait-v1.png'),
  require('../../assets/content/effects/skin-depth-05-portrait-v1.png'),
 ],tags:[[conductor,layer,source],[conductor,depth,source],[conductor,depth,source],[conductor,layer,source],[{...conductor,name:l('비교 시료','Comparison samples','比較試料','对比样品'),role:l('주파수를 고정하고 재료 특성 비교','Compare material properties at fixed frequency','周波数を固定して材料特性を比較','固定频率，比较材料特性')},depth,source]]},
 'hydrogenation':{images:[
  require('../../assets/content/effects/hydrogenation-01-portrait-v1.png'),
  require('../../assets/content/effects/hydrogenation-02-portrait-v1.png'),
  require('../../assets/content/effects/hydrogenation-03-portrait-v1.png'),
  require('../../assets/content/effects/hydrogenation-04-portrait-v1.png'),
  require('../../assets/content/effects/hydrogenation-05-portrait-v1.png'),
 ],tags:[[alkene,hydrogen,metal],[alkene,adsorbed,metal],[{...alkene,y:34},adsorbed,metal],[{...alkene,y:29,name:l('수소 첨가','H addition','水素付加','氢加成'),role:l('새 C–H 결합 형성','New C–H bonds form','新しいC–H結合を形成','形成新的C–H键')},adsorbed,metal],[{...alkene,x:2,y:21,name:l('에테인','Ethane','エタン','乙烷'),role:l('수소 두 개를 받은 생성물 C₂H₆','C₂H₆ product with two added hydrogens','水素を二つ受け取った生成物C₂H₆','增加两个氢的产物C₂H₆')},{...metal,role:l('다음 반응물을 받을 활성 자리','Sites available for the next reactant','次の反応物を受け入れる活性点','可接纳下一反应物的活性位')}]]},
};
export const scienceUi={
 parts:l('장비·현상 안내','Parts & phenomena','装置・現象の案内','部件与现象'),
 principle:l('핵심 원리','Key principle','重要な原理','核心原理'),
 amplitude:l('전류 밀도 진폭','Current-density amplitude','電流密度の振幅','电流密度振幅'),
 distance:l('표면에서의 깊이 x / δ','Depth from surface x / δ','表面からの深さ x / δ','距表面深度 x / δ'),
 crossSection:l('도체 단면','Conductor cross section','導体断面','导体截面'),
 alternating:l('시간에 따른 방향 반전','Direction reverses over time','時間とともに方向が反転','方向随时间反转'),
 frequency:l('주파수 / 기준 주파수','Frequency / reference frequency','周波数 / 基準周波数','频率 / 基准频率'),
 normalized:l('표피 깊이 / 기준 깊이','Skin depth / reference depth','表皮深さ / 基準深さ','趋肤深度 / 基准深度'),
 fixed:l('다른 조건 고정 · 정규화 비교','Other factors fixed · normalized comparison','他条件を固定・規格化比較','其他条件固定 · 归一化比较'),
 surface:l('표면','Surface','表面','表面'),
 carbon:l('탄소 C','Carbon C','炭素 C','碳 C'),
 originalH:l('기존 수소 H','Original H','元の水素 H','原有氢 H'),
 addedH:l('추가 수소 H','Added H','追加水素 H','新增氢 H'),
 catalyst:l('금속 촉매','Metal catalyst','金属触媒','金属催化剂'),
 before:l('반응 전','Before','反応前','反应前'),
 after:l('반응 후','After','反応後','反应后'),
 site:l('활성 자리','Active site','活性点','活性位'),
 conserved:l('탄소 2개 · 수소 6개 보존','2 carbons · 6 hydrogens conserved','炭素2個・水素6個を保存','2个碳 · 6个氢守恒'),
 interaction:l('점선: 촉매 표면과의 상호작용','Dashed: interaction with the catalyst','点線：触媒表面との相互作用','虚线：与催化剂表面的相互作用'),
 transfer:l('표면 수소가 차례로 전달됩니다.','Surface hydrogen transfers sequentially.','表面水素が順に移動します。','表面氢依次转移。'),
 reusable:l('생성물 탈착 → 활성 자리 재사용','Desorption → active sites reused','生成物脱離 → 活性点を再利用','产物脱附 → 活性位再次使用'),
 goodConductor:l('좋은 도체 · 평탄한 표면 근사','Good conductor · locally flat surface','良導体・局所平面近似','良导体 · 局部平面近似'),
 formula:l('f: 주파수 · μ: 투자율 · σ: 전도도','f: frequency · μ: permeability · σ: conductivity','f：周波数・μ：透磁率・σ：導電率','f：频率 · μ：磁导率 · σ：电导率'),
};
