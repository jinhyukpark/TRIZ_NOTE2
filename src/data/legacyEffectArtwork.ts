import {remainingEffectPortraits} from './remainingEffectPortraits';
import {cavitationPortraits,cavitationEquipmentLabels} from './cavitationPortrait';
import {coronaPortraits,coronaEquipmentLabels} from './coronaPortrait';
import type {ImageSourcePropType} from 'react-native';
import type {EffectText} from './effects';
import type {ExplanationLabel} from '../EffectExplanation';
export type LegacyArtwork={portraits:ImageSourcePropType[];panels?:ImageSourcePropType[];explanationLabels?:ExplanationLabel[][];labels:ReadonlyArray<{number:string;text:EffectText}>;labelsByStage?:ReadonlyArray<ReadonlyArray<{number:string;text:EffectText}>>;explanationStart:number;explanationEnd?:number};
export const legacyEffectArtwork:Record<string,LegacyArtwork>={
 ...remainingEffectPortraits,
 'ultrasonic-soldering':{portraits:[
  require('../../assets/content/effects/ultrasonic-soldering-01-portrait-v1.png'),
  require('../../assets/content/effects/ultrasonic-soldering-02-portrait-v1.png'),
  require('../../assets/content/effects/ultrasonic-soldering-03-portrait-v1.png'),
  require('../../assets/content/effects/ultrasonic-soldering-04-portrait-v1.png'),
  require('../../assets/content/effects/ultrasonic-soldering-05-portrait-v1.png'),
 ],explanationStart:.667,labels:[
  {number:'01',text:{ko:'솔더링 팁',en:'Soldering tip',ja:'こて先',zh:'焊头'}},
  {number:'02',text:{ko:'구리선',en:'Copper wire',ja:'銅線',zh:'铜线'}},
  {number:'03',text:{ko:'유리 기판',en:'Glass substrate',ja:'ガラス基板',zh:'玻璃基板'}},
  {number:'04',text:{ko:'공급 노즐',en:'Feed nozzle',ja:'供給ノズル',zh:'供料嘴'}},
 ]},
 'acoustic-cavitation':{portraits:[...cavitationPortraits],labels:cavitationEquipmentLabels,explanationStart:.667},
 'corona-discharge':{portraits:[...coronaPortraits],labels:coronaEquipmentLabels,explanationStart:.667},
};
// Server revisions are separate from immutable bundled fallbacks.
export const remoteLegacyArtwork:Record<string,LegacyArtwork>={};
