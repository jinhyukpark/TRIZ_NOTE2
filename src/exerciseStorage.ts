export function exerciseKey(id:number,userId?:string){return `triz:application:v1:${userId??'guest'}:${id}`;}
export function parseExercise(raw:string|null):{problem:string;idea:string}{
 if(raw===null)return {problem:'',idea:''};
 const data=JSON.parse(raw);
 if(!data||typeof data.problem!=='string'||typeof data.idea!=='string')throw new Error('Invalid exercise');
 return {problem:data.problem,idea:data.idea};
}
