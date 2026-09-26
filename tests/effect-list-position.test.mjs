import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import ts from 'typescript';

test('Effects restores the previous list offset after detail/back without resetting search or filters',()=>{
 const slots=[];let cursor=0;
 const hooks={...React,useEffect:()=>{},useRef:initial=>{const i=cursor++;return slots[i]??(slots[i]={current:initial});},useState:initial=>{const i=cursor++;if(!(i in slots))slots[i]=initial;return [slots[i],value=>{slots[i]=value;}];}};
 const item={id:'example',title:{ko:'예시',en:'Example'},summary:{ko:'설명'},steps:[]};
 const filters=[];
 const label={ko:'항목'};
 const catalog={catalogUi:new Proxy({}, {get:()=>label}),effectCatalog:{},effectFields:{thermal:label},effectKinds:{basic:label},effectFunctions:{},effectTitle:e=>e.title,effectListTitle:e=>e.title.ko,filterEffects:(_items,q,f,k)=>{filters.push([q,f,k]);return [item];},linkedApplications:()=>[],resultCount:()=>''};
 const dependencies={
  react:hooks,'react-native':{View:'View',FlatList:'FlatList',ScrollView:'ScrollView',Pressable:'Pressable',TextInput:'TextInput',Modal:'Modal',Keyboard:{dismiss(){}},StyleSheet:{create:s=>s},useWindowDimensions:()=>({width:390})},
  'react-native-safe-area-context':{useSafeAreaInsets:()=>({bottom:0})},
  '../ContentText':{default:'Text',__esModule:true},'../components':{Button:'Button'},
  '../EffectArtwork':{default:'Artwork',__esModule:true},'../EffectFeatured':{default:'Featured',__esModule:true},
  '../EffectCardSkeleton':{default:'Skeleton',__esModule:true},
  '../data/effects':{effects:[item],effectUi:{}},'../data/effectCatalog':catalog,
  '../lib/effectContent':{refreshEffectContent:async()=>0,prefetchEffectStage:async()=>true},
  '../i18n':{useLanguage:()=>({locale:'ko',t:s=>s})},'../theme':{s:{},colors:{}},
 };
 const code=ts.transpileModule(fs.readFileSync(new URL('../src/screens/Effects.tsx',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText;
 const exports={};new Function('require','exports',code)(name=>{assert.ok(name in dependencies,name);return dependencies[name];},exports);
 let selected=null;const onSelect=id=>{selected=id;};
 const render=()=>{cursor=0;return exports.default({selected,onSelect});};
 const nodes=node=>!node||typeof node!=='object'?[]:[node,...React.Children.toArray(node.props?.children).flatMap(nodes)];
 const list=tree=>nodes(tree).find(n=>n.props.testID==='effects-list');
 const scroll=(node,y)=>node.props.onScroll({nativeEvent:{contentOffset:{y}}});
 render();slots[7]=Date.now()+200000; // A server-verified, unexpired content lease.
 let tree=render(),view=list(tree);
 scroll(view,0);scroll(view,1824);
 nodes(view.props.ListHeaderComponent).find(n=>n.type==='TextInput').props.onChangeText('예시');
 // Applied filters live in the same persistent parent as the scroll snapshot.
 slots[1]='thermal';slots[2]='basic';
 tree=render();assert.deepEqual(filters.at(-2),['예시','thermal','basic']);
 list(tree).props.renderItem({item}).props.onPress();
 tree=render();assert.equal(tree.props.item.id,'example');
 // Related-detail navigation must not overwrite the original list snapshot.
 tree=render();tree.props.onBack();
 tree=render();view=list(tree);
 assert.equal(view.props.contentOffset.y,1824);
 const restored=[];view.props.ref.current={scrollToOffset:position=>restored.push(position)};
 scroll(view,0);view.props.onLayout();view.props.onContentSizeChange();
 assert.deepEqual(restored,[{offset:1824,animated:false},{offset:1824,animated:false}]);
 scroll(view,1824);scroll(view,2050);
 selected='example';render();selected=null;view=list(render());
 assert.equal(view.props.contentOffset.y,2050);
 assert.deepEqual(filters.at(-2),['예시','thermal','basic']);
 // A user drag takes priority over a restoration interrupted by layout changes.
 view.props.onScrollBeginDrag();scroll(view,900);
 selected='example';render();selected=null;
 assert.equal(list(render()).props.contentOffset.y,900);
});
