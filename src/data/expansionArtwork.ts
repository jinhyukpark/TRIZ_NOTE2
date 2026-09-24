import type {ScienceArtwork} from './scientificArtwork';
import type {FeaturedEffect} from './featuredEffects';
import type {CalloutPosition} from '../EquipmentCallout';
import {expansionDrafts,xtext} from './expansionEffects';
import {expansionPositions,expansionFeaturedPositions} from './expansionPositions';

// Literal imports keep every asset visible to Metro's dependency graph.
const images:Record<string,ScienceArtwork['images']>={
 'adhesive-bonding':[require('../../assets/content/effects/adhesive-bonding-01-portrait-v1.png'),require('../../assets/content/effects/adhesive-bonding-02-portrait-v1.png'),require('../../assets/content/effects/adhesive-bonding-03-portrait-v1.png'),require('../../assets/content/effects/adhesive-bonding-04-portrait-v1.png'),require('../../assets/content/effects/adhesive-bonding-05-portrait-v1.png')],
 'condensation':[require('../../assets/content/effects/condensation-01-portrait-v1.png'),require('../../assets/content/effects/condensation-02-portrait-v1.png'),require('../../assets/content/effects/condensation-03-portrait-v1.png'),require('../../assets/content/effects/condensation-04-portrait-v1.png'),require('../../assets/content/effects/condensation-05-portrait-v1.png')],
 'acoustic-levitation':[require('../../assets/content/effects/acoustic-levitation-01-portrait-v1.png'),require('../../assets/content/effects/acoustic-levitation-02-portrait-v1.png'),require('../../assets/content/effects/acoustic-levitation-03-portrait-v1.png'),require('../../assets/content/effects/acoustic-levitation-04-portrait-v1.png'),require('../../assets/content/effects/acoustic-levitation-05-portrait-v1.png')],
 'amphiphiles':[require('../../assets/content/effects/amphiphiles-01-portrait-v1.png'),require('../../assets/content/effects/amphiphiles-02-portrait-v1.png'),require('../../assets/content/effects/amphiphiles-03-portrait-v1.png'),require('../../assets/content/effects/amphiphiles-04-portrait-v1.png'),require('../../assets/content/effects/amphiphiles-05-portrait-v1.png')],
 'electrodeposition':[require('../../assets/content/effects/electrodeposition-01-portrait-v1.png'),require('../../assets/content/effects/electrodeposition-02-portrait-v1.png'),require('../../assets/content/effects/electrodeposition-03-portrait-v1.png'),require('../../assets/content/effects/electrodeposition-04-portrait-v1.png'),require('../../assets/content/effects/electrodeposition-05-portrait-v1.png')],
 'electrostatic-induction':[require('../../assets/content/effects/electrostatic-induction-01-portrait-v1.png'),require('../../assets/content/effects/electrostatic-induction-02-portrait-v1.png'),require('../../assets/content/effects/electrostatic-induction-03-portrait-v1.png'),require('../../assets/content/effects/electrostatic-induction-04-portrait-v2.png'),require('../../assets/content/effects/electrostatic-induction-05-portrait-v2.png')],
 'distillation':[require('../../assets/content/effects/distillation-01-portrait-v1.png'),require('../../assets/content/effects/distillation-02-portrait-v1.png'),require('../../assets/content/effects/distillation-03-portrait-v2.png'),require('../../assets/content/effects/distillation-04-portrait-v1.png'),require('../../assets/content/effects/distillation-05-portrait-v1.png')],
 'photoionisation':[require('../../assets/content/effects/photoionisation-01-portrait-v1.png'),require('../../assets/content/effects/photoionisation-02-portrait-v1.png'),require('../../assets/content/effects/photoionisation-03-portrait-v1.png'),require('../../assets/content/effects/photoionisation-04-portrait-v1.png'),require('../../assets/content/effects/photoionisation-05-portrait-v1.png')],
 'creaming':[require('../../assets/content/effects/creaming-01-portrait-v1.png'),require('../../assets/content/effects/creaming-02-portrait-v1.png'),require('../../assets/content/effects/creaming-03-portrait-v1.png'),require('../../assets/content/effects/creaming-04-portrait-v1.png'),require('../../assets/content/effects/creaming-05-portrait-v1.png')],
 'bingham-plastic':[require('../../assets/content/effects/bingham-plastic-01-portrait-v1.png'),require('../../assets/content/effects/bingham-plastic-02-portrait-v1.png'),require('../../assets/content/effects/bingham-plastic-03-portrait-v1.png'),require('../../assets/content/effects/bingham-plastic-04-portrait-v1.png'),require('../../assets/content/effects/bingham-plastic-05-portrait-v1.png')],
 'aerogel':[require('../../assets/content/effects/aerogel-01-portrait-v1.png'),require('../../assets/content/effects/aerogel-02-portrait-v1.png'),require('../../assets/content/effects/aerogel-03-portrait-v1.png'),require('../../assets/content/effects/aerogel-04-portrait-v1.png'),require('../../assets/content/effects/aerogel-05-portrait-v1.png')],
 'arc-evaporation':[require('../../assets/content/effects/arc-evaporation-01-portrait-v1.png'),require('../../assets/content/effects/arc-evaporation-02-portrait-v1.png'),require('../../assets/content/effects/arc-evaporation-03-portrait-v1.png'),require('../../assets/content/effects/arc-evaporation-04-portrait-v1.png'),require('../../assets/content/effects/arc-evaporation-05-portrait-v1.png')],
 'activated-alumina':[require('../../assets/content/effects/activated-alumina-01-portrait-v1.png'),require('../../assets/content/effects/activated-alumina-02-portrait-v1.png'),require('../../assets/content/effects/activated-alumina-03-portrait-v1.png'),require('../../assets/content/effects/activated-alumina-04-portrait-v1.png'),require('../../assets/content/effects/activated-alumina-05-portrait-v1.png')],
 'lorentz-force':[require('../../assets/content/effects/lorentz-force-01-portrait-v2.png'),require('../../assets/content/effects/lorentz-force-02-portrait-v1.png'),require('../../assets/content/effects/lorentz-force-03-portrait-v1.png'),require('../../assets/content/effects/lorentz-force-04-portrait-v2.png'),require('../../assets/content/effects/lorentz-force-05-portrait-v2.png')],
 'ferromagnetism':[require('../../assets/content/effects/ferromagnetism-01-portrait-v1.png'),require('../../assets/content/effects/ferromagnetism-02-portrait-v1.png'),require('../../assets/content/effects/ferromagnetism-03-portrait-v1.png'),require('../../assets/content/effects/ferromagnetism-04-portrait-v1.png'),require('../../assets/content/effects/ferromagnetism-05-portrait-v1.png')],
 'doppler-effect':[require('../../assets/content/effects/doppler-effect-01-portrait-v1.png'),require('../../assets/content/effects/doppler-effect-02-portrait-v1.png'),require('../../assets/content/effects/doppler-effect-03-portrait-v1.png'),require('../../assets/content/effects/doppler-effect-04-portrait-v1.png'),require('../../assets/content/effects/doppler-effect-05-portrait-v1.png')],
 'activated-carbon':[require('../../assets/content/effects/activated-carbon-01-portrait-v1.png'),require('../../assets/content/effects/activated-carbon-02-portrait-v1.png'),require('../../assets/content/effects/activated-carbon-03-portrait-v1.png'),require('../../assets/content/effects/activated-carbon-04-portrait-v1.png'),require('../../assets/content/effects/activated-carbon-05-portrait-v1.png')],
};
const covers:Record<string,FeaturedEffect['image']>={
 'adhesive-bonding':require('../../assets/content/effects/featured/adhesive-bonding-v1.png'),
 'condensation':require('../../assets/content/effects/featured/condensation-v1.png'),
 'acoustic-levitation':require('../../assets/content/effects/featured/acoustic-levitation-v1.png'),
 'amphiphiles':require('../../assets/content/effects/featured/amphiphiles-v1.png'),
 'electrodeposition':require('../../assets/content/effects/featured/electrodeposition-v1.png'),
 'electrostatic-induction':require('../../assets/content/effects/featured/electrostatic-induction-v1.png'),
 'distillation':require('../../assets/content/effects/featured/distillation-v1.png'),
 'photoionisation':require('../../assets/content/effects/featured/photoionisation-v1.png'),
 'creaming':require('../../assets/content/effects/featured/creaming-v1.png'),
 'bingham-plastic':require('../../assets/content/effects/featured/bingham-plastic-v1.png'),
 'aerogel':require('../../assets/content/effects/featured/aerogel-v1.png'),
 'arc-evaporation':require('../../assets/content/effects/featured/arc-evaporation-v1.png'),
 'activated-alumina':require('../../assets/content/effects/featured/activated-alumina-v1.png'),
 'lorentz-force':require('../../assets/content/effects/featured/lorentz-force-v1.png'),
 'ferromagnetism':require('../../assets/content/effects/featured/ferromagnetism-v1.png'),
 'doppler-effect':require('../../assets/content/effects/featured/doppler-effect-v1.png'),
 'activated-carbon':require('../../assets/content/effects/featured/activated-carbon-v1.png'),
};
export const expansionArtwork:Record<string,ScienceArtwork>={};
export const expansionFeatured:Record<string,FeaturedEffect>={};
export const expansionCallouts:Record<string,CalloutPosition[][]>={};
// Labels describe the current state, including preparation and regeneration.
const stageParts:Record<string,[string,string]>={
 'photoionisation:0:0':['광원|Light source|光源|光源','광자를 공급할 광원|Source that supplies photons|光子を供給する光源|提供光子的光源'],
 'acoustic-levitation:0:2':['시험 입자|Test particle|試験粒子|测试颗粒','정재파로 띄울 작은 입자|Small particle to be levitated|定在波で浮かせる小粒子|将由驻波悬浮的小颗粒'],
 'activated-alumina:4:1':['재생 기체|Purge gas|再生ガス|再生气体','흡착된 수분의 탈착을 돕는 기체|Gas assisting moisture desorption|吸着水分の脱着を助けるガス|帮助吸附水分脱附的气体'],
 'activated-alumina:4:2':['탈착 수분|Desorbed moisture|脱着水分|脱附水分','재생 중 배출되는 수분|Moisture removed during regeneration|再生中に排出される水分|再生时排出的水分'],
 'lorentz-force:0:2':['전자 경로|Electron path|電子の軌道|电子轨迹','자기장이 없을 때의 직선 경로|Straight path without a magnetic field|磁場がないときの直線軌道|无磁场时的直线轨迹'],
};
for(const draft of expansionDrafts){
 const positions=expansionPositions[draft.id];
 expansionArtwork[draft.id]={
  images:images[draft.id],
  tags:positions.map((row,stage)=>row.map(p=>{
   const [name,role]=stageParts[`${draft.id}:${stage}:${p.part}`]??[draft.parts[p.part],draft.roles[p.part]];
   return {x:p.x,y:p.y,name:xtext(name),role:xtext(role)};
  })),
 };
 expansionCallouts[draft.id]=positions.map(row=>row.map(({part,...position})=>position));
 expansionFeatured[draft.id]={image:covers[draft.id],labels:expansionFeaturedPositions[draft.id].map(p=>({x:p.x,y:p.y,width:p.width,target:p.target,text:xtext(draft.parts[p.part])}))};
}
