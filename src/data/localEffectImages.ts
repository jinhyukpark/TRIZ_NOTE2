import {scientificArtwork} from './scientificArtwork';
import {featuredEffects} from './featuredEffects';
import type {ImageSourcePropType} from 'react-native';
export const localEffectImages:Record<string,{images:ImageSourcePropType[];featured:ImageSourcePropType}>=Object.fromEntries(Object.entries(scientificArtwork).map(([id,art])=>[id,{images:[...art.images],featured:featuredEffects[id].image}]));
