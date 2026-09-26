const path=require('node:path');
const {getDefaultConfig}=require('expo/metro-config');
const config=getDefaultConfig(__dirname);
config.resolver.resolveRequest=(context,moduleName,platform)=>{
 const result=context.resolveRequest(context,moduleName,platform);
 // List-card covers are a free catalogue preview. Keep only the 31 lightweight
 // 16:9 featured images in the app; all full-resolution step/detail artwork
 // continues to resolve to the private placeholder and is fetched only after
 // the paid entitlement check succeeds.
 if(result.type==='assetFiles'&&result.filePaths.some(p=>p.includes('/assets/content/effects/')&&!p.includes('/assets/content/effects/featured/'))){
  return {type:'sourceFile',filePath:path.join(__dirname,'src/data/privateEffectPlaceholder.js')};
 }
 return result;
};
module.exports=config;
