import type {Effect,EffectText} from './effects';
import type {Locale} from '../i18n';

const t=(ko:string,en:string,ja:string,zh:string):EffectText=>({ko,en,ja,zh});
export const effectKinds={
 basic:t('기본 효과','Basic effects','基本効果','基本效应'),
 application:t('응용 기술','Applications','応用技術','应用技术'),
};
export const effectFields={
 chemical:t('화학','Chemistry','化学','化学'),
 thermal:t('열','Thermal','熱','热学'),
 electromagnetic:t('전기·자기','Electricity & magnetism','電気・磁気','电与磁'),
 fluid:t('유체','Fluids','流体','流体'),
 optical:t('빛','Optics','光','光学'),
 acoustic:t('음향·진동','Sound & vibration','音響・振動','声与振动'),
 material:t('재료','Materials','材料','材料'),
};
export const effectFunctions={
 conversion:t('물질 변환','Chemical conversion','物質変換','物质转化'),
 heating:t('가열','Heating','加熱','加热'),
 cooling:t('냉각','Cooling','冷却','冷却'),
 joining:t('접합','Joining','接合','连接'),
 transport:t('이동·전달','Transport & transfer','移動・伝達','移动与传递'),
 measuring:t('측정','Measuring','測定','测量'),
 cleaning:t('세정','Cleaning','洗浄','清洗'),
 deformation:t('변형·복원','Deformation & recovery','変形・回復','变形与恢复'),
 charge:t('전하 제어','Charge control','電荷制御','电荷控制'),
 light:t('빛 제어','Light control','光制御','光控制'),
};
export type EffectKind=keyof typeof effectKinds;
export type EffectField=keyof typeof effectFields;
export type EffectFunction=keyof typeof effectFunctions;
type Foundation={title:EffectText;effectId?:string};
export type EffectClassification={
 kind:EffectKind;
 primaryField:EffectField;
 relatedFields:EffectField[];
 functions:EffectFunction[];
 // An absent effectId is a concept label, not a link to an unbuilt page.
 foundations:Foundation[];
 title?:EffectText;
};
const cavitation:Foundation={effectId:'acoustic-cavitation',title:t('음향 공동현상','Acoustic cavitation','音響キャビテーション','声空化')};
const polarization:Foundation={effectId:'polarisation',title:t('유전체 분극','Dielectric polarization','誘電分極','介质极化')};
const phaseChange:Foundation={title:t('용융·응고','Melting & solidification','溶融・凝固','熔化与凝固')};

// Editorial classifications are separate from generated artwork and stable IDs.
// Relations are defined once on applications; reverse links are derived below.
export const effectCatalog:Record<string,EffectClassification>={
 'adhesive-bonding':{kind:'application',primaryField:'material',relatedFields:['chemical'],functions:['joining'],foundations:[{title:t('젖음과 계면 결합','Wetting & interfacial bonding','ぬれと界面結合','润湿与界面结合')}]},
 'condensation':{kind:'basic',primaryField:'thermal',relatedFields:['fluid'],functions:['cooling'],foundations:[]},
 'acoustic-levitation':{kind:'application',primaryField:'acoustic',relatedFields:['fluid'],functions:['transport'],foundations:[{title:t('음향 복사력','Acoustic radiation force','音響放射力','声辐射力')},{title:t('정상파','Standing waves','定在波','驻波')}]},
 'amphiphiles':{kind:'basic',primaryField:'chemical',relatedFields:['fluid'],functions:['cleaning'],foundations:[]},
 'electrodeposition':{kind:'application',primaryField:'electromagnetic',relatedFields:['chemical','material'],functions:['conversion'],foundations:[{title:t('전기화학적 환원','Electrochemical reduction','電気化学的還元','电化学还原')}]},
 'electrostatic-induction':{kind:'basic',primaryField:'electromagnetic',relatedFields:[],functions:['charge'],foundations:[]},
 'distillation':{kind:'application',primaryField:'thermal',relatedFields:['chemical','fluid'],functions:['conversion','cooling'],foundations:[{effectId:'condensation',title:t('응축','Condensation','凝縮','冷凝')},{title:t('기액 평형','Vapor–liquid equilibrium','気液平衡','气液平衡')}]},
 'photoionisation':{kind:'basic',primaryField:'optical',relatedFields:['electromagnetic'],functions:['charge'],foundations:[]},
 'creaming':{kind:'basic',primaryField:'fluid',relatedFields:['material'],functions:['transport'],foundations:[]},
 'bingham-plastic':{kind:'basic',primaryField:'fluid',relatedFields:['material'],functions:['deformation'],foundations:[]},
 'aerogel':{kind:'application',primaryField:'thermal',relatedFields:['material'],functions:['cooling'],foundations:[{title:t('열전달 억제','Reduced heat transfer','熱伝達の抑制','抑制传热')}]},
 'arc-evaporation':{kind:'application',primaryField:'electromagnetic',relatedFields:['material','thermal'],functions:['conversion'],foundations:[{title:t('아크 방전','Arc discharge','アーク放電','电弧放电')},{title:t('증발·증착','Vaporization & deposition','蒸発・堆積','蒸发与沉积')}]},
 'activated-alumina':{kind:'application',primaryField:'chemical',relatedFields:['material'],functions:['cleaning'],foundations:[{title:t('표면 흡착','Surface adsorption','表面吸着','表面吸附')}]},
 'lorentz-force':{kind:'basic',primaryField:'electromagnetic',relatedFields:[],functions:['transport'],foundations:[]},
 'ferromagnetism':{kind:'basic',primaryField:'electromagnetic',relatedFields:['material'],functions:['charge'],foundations:[]},
 'doppler-effect':{kind:'basic',primaryField:'acoustic',relatedFields:[],functions:['measuring'],foundations:[]},
 'activated-carbon':{kind:'application',primaryField:'chemical',relatedFields:['material'],functions:['cleaning'],foundations:[{title:t('표면 흡착','Surface adsorption','表面吸着','表面吸附')}]},
 'skin-depth':{kind:'basic',primaryField:'electromagnetic',relatedFields:['material'],functions:['charge','measuring'],foundations:[]},
 'hydrogenation':{kind:'application',primaryField:'chemical',relatedFields:['material'],functions:['conversion'],foundations:[{title:t('촉매 작용','Catalysis','触媒作用','催化作用')},{title:t('표면 흡착','Surface adsorption','表面吸着','表面吸附')}]},
 'ultrasonic-soldering':{kind:'application',primaryField:'acoustic',relatedFields:['thermal','material'],functions:['joining'],foundations:[cavitation,phaseChange]},
 'acoustic-cavitation':{kind:'basic',primaryField:'acoustic',relatedFields:['fluid'],functions:['cleaning'],foundations:[]},
 'corona-discharge':{kind:'basic',primaryField:'electromagnetic',relatedFields:[],functions:['charge'],foundations:[]},
 'dielectric-heating':{kind:'application',primaryField:'thermal',relatedFields:['electromagnetic','material'],functions:['heating'],foundations:[polarization,{title:t('유전 손실','Dielectric loss','誘電損失','介质损耗')}]},
 'hall-effect':{kind:'basic',primaryField:'electromagnetic',relatedFields:[],functions:['measuring'],foundations:[]},
 'heat-pipe':{kind:'application',primaryField:'thermal',relatedFields:['fluid'],functions:['cooling','transport'],foundations:[{title:t('증발·응축','Evaporation & condensation','蒸発・凝縮','蒸发与冷凝')},{title:t('모세관 현상','Capillary action','毛細管現象','毛细现象')}]},
 'light-diffraction':{kind:'basic',primaryField:'optical',relatedFields:[],functions:['light'],foundations:[]},
 'polarisation':{kind:'basic',primaryField:'electromagnetic',relatedFields:['material'],functions:['charge'],foundations:[]},
 'shape-memory-alloy':{kind:'basic',primaryField:'material',relatedFields:['thermal'],functions:['deformation'],foundations:[],title:t('형상기억 효과','Shape-memory effect','形状記憶効果','形状记忆效应')},
 'skin-effect':{kind:'basic',primaryField:'electromagnetic',relatedFields:[],functions:['charge'],foundations:[]},
 'ultrasonic':{kind:'application',primaryField:'acoustic',relatedFields:['electromagnetic','fluid'],functions:['transport','cleaning'],foundations:[{title:t('역압전 효과','Inverse piezoelectric effect','逆圧電効果','逆压电效应')},{title:t('공진','Resonance','共振','共振')}],title:t('초음파 발생·전달','Ultrasound generation & transmission','超音波の発生・伝達','超声波产生与传播')},
 'arc-welding':{kind:'application',primaryField:'thermal',relatedFields:['electromagnetic','material'],functions:['joining'],foundations:[{title:t('아크 방전','Arc discharge','アーク放電','电弧放电')},phaseChange]},
};

export const catalogUi={
 filters:t('상세 필터','Filters','詳細フィルター','详细筛选'),
 closeFilters:t('필터 닫기','Close filters','フィルターを閉じる','关闭筛选'),
 applyFilters:t('적용','Apply','適用','应用'),
 all:t('전체','All','すべて','全部'),
 field:t('분야','Field','分野','领域'),
 kind:t('종류','Type','種類','类型'),
 functions:t('활용 기능','Functions','活用機能','用途'),
 search:t('이름·분야·기능 검색','Search names, fields or functions','名前・分野・機能で検索','搜索名称、领域或功能'),
 intro:t('과학의 기본 효과와 이를 활용한 기술을 연결해서 살펴보세요.','Explore scientific effects and the technologies that use them.','科学の基本効果とそれを活用した技術をつなげて学びましょう。','探索科学基本效应及其应用技术。'),
 basicHint:t('현상이 일어나는 조건과 원리를 살펴봅니다.','Explore the conditions and principles behind a phenomenon.','現象が起こる条件と原理を学びます。','了解现象发生的条件和原理。'),
 applicationHint:t('기본 효과를 장치와 공정에 활용하는 방법을 살펴봅니다.','Explore how effects are used in devices and processes.','効果を装置や工程に活用する方法を学びます。','了解如何将效应用于设备与工艺。'),
 foundations:t('이 기술에 사용된 기본 효과','Effects used by this technology','この技術に使われる基本効果','此技术使用的基本效应'),
 applications:t('이 효과를 활용한 기술','Technologies using this effect','この効果を活用した技術','使用此效应的技术'),
 noApplications:t('현재 등록된 활용 기술이 없습니다.','No linked applications in the library yet.','関連する応用技術はまだ登録されていません。','资料库中暂无关联应用技术。'),
 conceptOnly:t('개념 · 상세 미등록','Concept · no detail page','概念・詳細未登録','概念 · 暂无详情'),
 reset:t('필터 초기화','Reset filters','フィルターを解除','重置筛选'),
 empty:t('조건에 맞는 항목이 없습니다. 검색어나 필터를 바꿔보세요.','No matches. Try another search or filter.','該当する項目がありません。検索語や条件を変えてください。','没有匹配项，请更改搜索词或筛选条件。'),
 results:t('개 항목','items','件','项'),
};

export const effectTitle=(item:Effect):EffectText=>effectCatalog[item.id]?.title??item.title;
export function effectListTitle(item:Effect,locale:Locale){
 const title=effectTitle(item);
 return locale==='en'?title.en:`${title[locale]} (${title.en})`;
}
export function filterEffects(items:Effect[],query:string,field:EffectField|'all',kind:EffectKind|'all'){
 const terms=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
 return items.filter(item=>{
  const entry=effectCatalog[item.id];
  if(!entry)return field==='all'&&kind==='all'&&terms.every(term=>Object.values(item.title).join(' ').toLowerCase().includes(term));
  if(kind!=='all'&&entry.kind!==kind)return false;
  if(field!=='all'&&entry.primaryField!==field&&!entry.relatedFields.includes(field))return false;
  const text=[item.title,effectTitle(item),item.summary,effectKinds[entry.kind],effectFields[entry.primaryField],...entry.relatedFields.map(f=>effectFields[f]),...entry.functions.map(f=>effectFunctions[f]),...entry.foundations.map(f=>f.title)].flatMap(Object.values).join(' ').toLowerCase();
  return terms.every(term=>text.includes(term));
 });
}
export function linkedApplications(items:Effect[],basicId:string){
 return items.filter(item=>effectCatalog[item.id]?.kind==='application'&&effectCatalog[item.id].foundations.some(f=>f.effectId===basicId));
}
export function resultCount(count:number,locale:Locale){
 return locale==='en'?`${count} ${count===1?'item':'items'}`:`${count}${locale==='ko'?'개 항목':locale==='ja'?'件':'项'}`;
}
