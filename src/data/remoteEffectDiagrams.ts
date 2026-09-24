import type {EffectText} from './effects';
export type DiagramShape={kind:'line'|'dot'|'rect'|'text';x:number;y:number;x2?:number;y2?:number;w?:number;h?:number;r?:number;color?:string;fill?:string;text?:string;thick?:number};
export const remoteEffectDiagrams:Record<string,{shapes:DiagramShape[];caption:EffectText|null}[]>={};
