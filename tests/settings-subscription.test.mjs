import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import React from 'react';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const exports={};let locale='ko';
const c={};new Function('exports',ts.transpileModule(read('src/locales/compliance.ts'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(c);
new Function('require','exports',ts.transpileModule(read('src/SettingsSubscription.tsx'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText)(name=>({react:React,'react-native':{View:'View'},'./ContentText':{default:'Text',__esModule:true},'./components':{Button:'Button'},'./i18n':{useLanguage:()=>({locale})},'./theme':{s:{},colors:{}},'./locales/compliance':c,'./LegalLinks':{ManageSubscription:'Manage'}}[name]),exports);
const nodes=n=>!n||typeof n!=='object'?[]:[n,...React.Children.toArray(n.props?.children).flatMap(nodes)];
test('settings shows the annual $5 plan in four languages, with guest and active states',()=>{
 for(locale of ['ko','en','ja','zh']){
  let opened=false;
  const props={signedIn:false,active:false,loading:false,error:false,expires:null,onOpen:()=>{opened=true;}};
  const guest=nodes(exports.default(props));
  assert.ok(guest.some(n=>n.props.children===exports.subscriptionSettingsCopy.price[locale]));
  assert.ok(guest.some(n=>n.props.children===c.complianceCopy.annual[locale]));
  guest.find(n=>n.type==='Button').props.onPress();assert.equal(opened,true);
  const active=nodes(exports.default({...props,signedIn:true,active:true,expires:'2027-09-24T00:00:00Z'}));
  assert.ok(active.some(n=>n.props.children===c.complianceCopy.active[locale]));
  assert.equal(active.filter(n=>n.type==='Button').length,0);
  assert.equal(active.filter(n=>n.type==='Manage').length,1);
 }
});
test('account includes the plan while checkout preserves authoritative store pricing',()=>{
 assert.match(read('App.tsx'),/<SettingsSubscription signedIn=/);
 assert.match(read('src/screens/Store.tsx'),/annualPlan\(p,annualId,releaseConfig.googleBasePlan\)!\.price/);
});
test('inactive subscribers can subscribe; checking cannot trigger checkout',()=>{
 for(locale of ['ko','en','ja','zh']){
  const props={signedIn:true,active:false,loading:false,error:false,expires:null,onOpen:()=>{}};
  const inactive=nodes(exports.default(props));
  assert.equal(inactive.find(n=>n.type==='Button').props.title,c.complianceCopy.subscribe[locale]);
  const checking=nodes(exports.default({...props,loading:true}));
  assert.equal(checking.find(n=>n.type==='Button').props.disabled,true);
  assert.equal(checking.filter(n=>n.type==='Manage').length,1);
  const failed=nodes(exports.default({...props,error:true}));
  assert.notEqual(failed.find(n=>n.type==='Button').props.title,c.complianceCopy.subscribe[locale]);
  assert.equal(failed.filter(n=>n.type==='Manage').length,1);
 }
});
test('manage opens the platform subscription center in every language',async()=>{
 const platform={OS:'ios'},opened=[];
 const links={};
 new Function('require','exports',ts.transpileModule(read('src/LegalLinks.tsx'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText)(name=>({react:React,'react-native':{View:'View',Platform:platform,Linking:{openURL:async url=>opened.push(url)},Alert:{alert:()=>assert.fail('unexpected alert')}},'./ContentText':{default:'Text',__esModule:true},'./theme':{s:{}},'./components':{Button:'Button'},'./i18n':{useLanguage:()=>({locale})},'./lib/releaseConfig':{releaseConfig:{},isPublicHttps:url=>url.startsWith('https://')},'./locales/compliance':c}[name]),links);
 for(locale of ['ko','en','ja','zh'])for(const os of ['ios','android']){
  platform.OS=os;
  const rendered=nodes(links.ManageSubscription());
  const button=rendered.find(n=>n.type==='Button');
  assert.equal(button.props.title,c.complianceCopy.manage[locale]);
  assert.ok(rendered.some(n=>n.props.children===c.complianceCopy.manageInfo[locale]));
  button.props.onPress();
  assert.equal(opened.at(-1),os==='ios'?'https://apps.apple.com/account/subscriptions':'https://play.google.com/store/account/subscriptions');
 }
});
