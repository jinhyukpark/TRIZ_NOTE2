export const PAGE_PADDING = 20;
export const PAGE_MAX_WIDTH = 960;
export const GRID_GAP = 10;

export function libraryLayout(availableWidth: number, fontScale = 1, cards = false) {
  const pageWidth = Math.min(PAGE_MAX_WIDTH, Math.max(0, availableWidth));
  const innerWidth = Math.max(0, pageWidth - PAGE_PADDING * 2);
  const minimumTile = 98 * Math.max(1, fontScale);
  const columns = cards ? 1 : Math.max(1, Math.min(6, Math.floor((innerWidth + GRID_GAP) / (minimumTile + GRID_GAP))));
  // Round down so fractional Yoga pixel rounding never pushes the final column outside its row.
  const tileWidth = Math.floor((innerWidth - GRID_GAP * (columns - 1)) / columns * 100) / 100;
  return { pageWidth, columns, tileWidth: Math.max(0, tileWidth) };
}
export function fitImage(width: number, height: number, ratio: number) {
  const safeRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : 1.5;
  const imageWidth = Math.max(0, Math.min(width, height * safeRatio));
  return { width: imageWidth, height: imageWidth / safeRatio };
}

// Conservative em widths avoid relying on platform-specific shrink-to-fit behavior.
// Word boundaries are preserved for Latin text; CJK can wrap between characters.
export function fitDiagramLabel(text:string,width:number,height:number,preferredSize:number){
 const em=(value:string)=>Array.from(value).reduce((n,c)=>n+(/\s/.test(c)?.34:/[\u2e80-\uffff]/.test(c)?1:.62),0);
 const linesAt=(font:number)=>text.split('\n').reduce((total,line)=>{
  let lines=1,used=0;
  for(const token of line.match(/[\u2e80-\uffff]|[^\s\u2e80-\uffff]+\s*|\s+/gu)??[]){
   const length=em(token)*font;
   if(used>0&&used+length>width){lines++;used=0;}
   const wrapped=Math.max(0,Math.ceil(length/width)-1);lines+=wrapped;used=wrapped?length%width:length+used;
  }
  return total+lines;
 },0);
 let font=preferredSize;
 while(font>preferredSize*.35&&linesAt(font)*font*1.22>height)font-=.5;
 return {fontSize:font,lines:linesAt(font),lineHeight:font*1.22};
}
