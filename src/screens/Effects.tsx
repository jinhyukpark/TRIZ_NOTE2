import React,{useEffect,useRef,useState} from 'react';
import {View,ScrollView,FlatList,Pressable,TextInput,StyleSheet,useWindowDimensions,Modal,Keyboard,ActivityIndicator,AppState} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '../ContentText';
import {Button} from '../components';
import EffectArtwork from '../EffectArtwork';
import {effects,effectUi as ui} from '../data/effects';
import {catalogUi,effectCatalog,effectFields,effectKinds,effectFunctions,effectTitle,effectListTitle,filterEffects,linkedApplications,resultCount,type EffectField,type EffectKind} from '../data/effectCatalog';
import EffectFeatured from '../EffectFeatured';
import {useLanguage} from '../i18n';
import {s,colors} from '../theme';
import {refreshEffectContent,clearEffectAccess,prefetchEffectStage} from '../lib/effectContent';
import EffectCardSkeleton from '../EffectCardSkeleton';

export default function Effects({selected,onSelect,canAccess=true}:{selected:string|null;onSelect:(id:string|null)=>void;canAccess?:boolean}){
 const {locale,t}=useLanguage();
 const [query,setQuery]=useState('');
 const [field,setField]=useState<EffectField|'all'>('all');
 const [kind,setKind]=useState<EffectKind|'all'>('all');
 const [filtersOpen,setFiltersOpen]=useState(false);
 const [draftField,setDraftField]=useState<EffectField|'all'>('all');
 const [draftKind,setDraftKind]=useState<EffectKind|'all'>('all');
 const insets=useSafeAreaInsets();
 const [contentRevision,setContentRevision]=useState(0);
 const [leaseUntil,setLeaseUntil]=useState(0),[loadError,setLoadError]=useState(false),[attempt,setAttempt]=useState(0);
 useEffect(()=>{
  if(!canAccess){setLeaseUntil(0);clearEffectAccess();return;}
  let live=true,loadEpoch=0;
  const load=async()=>{const epoch=++loadEpoch;try{const result=await refreshEffectContent();if(live&&epoch===loadEpoch){setLeaseUntil(result.expiresAt);setLoadError(false);setContentRevision(n=>n+1);}}catch{if(live&&epoch===loadEpoch){setLeaseUntil(0);setLoadError(true);clearEffectAccess();}}};
  void load();const timer=setInterval(()=>{if(AppState.currentState==='active')void load();},120000);
  const listener=AppState.addEventListener('change',state=>{loadEpoch++;setLeaseUntil(0);clearEffectAccess();if(state==='active')void load();});
  return()=>{live=false;clearInterval(timer);listener.remove();clearEffectAccess();};
 },[attempt,canAccess]);
 useEffect(()=>{if(!leaseUntil)return;const timer=setTimeout(()=>{setLeaseUntil(0);clearEffectAccess();setAttempt(n=>n+1);},Math.max(0,leaseUntil-Date.now()));return()=>clearTimeout(timer);},[leaseUntil]);
 const listScroll=useRef<FlatList<(typeof effects)[number]>>(null);
 const listOffset=useRef(0);
 const restoringList=useRef(true);
 const restoreListPosition=()=>{
  if(restoringList.current)listScroll.current?.scrollToOffset({offset:listOffset.current,animated:false});
 };
 const item=effects.find(e=>e.id===selected);
 if(item&&canAccess&&leaseUntil<=Date.now())return <View style={[s.page,{gap:16}]}><Text style={s.heading}>Effects</Text>{loadError?<><Text style={s.muted}>{{ko:'유료 구독 권한과 인터넷 연결을 확인해 주세요.',en:'Check your paid subscription and internet connection.',ja:'有料購読とインターネット接続をご確認ください。',zh:'请检查付费订阅和互联网连接。'}[locale]}</Text><Button title={{ko:'다시 확인',en:'Retry',ja:'再試行',zh:'重试'}[locale]} onPress={()=>{setLoadError(false);setAttempt(n=>n+1);}}/></>:<ActivityIndicator color={colors.lime}/>}</View>;
 if(item&&canAccess){
  restoringList.current=true;
  return <EffectReader key={item.id} item={{...item,title:effectTitle(item)}} onBack={()=>onSelect(null)} onSelect={onSelect}/>;
 }
 const matches=filterEffects(effects,query,field,kind);
 const reset=()=>{setQuery('');setField('all');setKind('all');};
 const activeFilters=Number(field!=='all')+Number(kind!=='all');
 const openFilters=()=>{Keyboard.dismiss();setDraftField(field);setDraftKind(kind);setFiltersOpen(true);};
 const closeFilters=()=>setFiltersOpen(false);
 const applyFilters=()=>{setField(draftField);setKind(draftKind);closeFilters();};
 return <>
 <FlatList ref={listScroll} testID="effects-list" keyboardShouldPersistTaps="handled" contentContainerStyle={s.page}
  data={matches} keyExtractor={e=>e.id} extraData={`${locale}-${contentRevision}`}
  initialNumToRender={3} maxToRenderPerBatch={3} windowSize={5} updateCellsBatchingPeriod={50}
  removeClippedSubviews={false}
  contentOffset={{x:0,y:listOffset.current}} scrollEventThrottle={16}
  onLayout={restoreListPosition} onContentSizeChange={restoreListPosition}
  onScrollBeginDrag={()=>{restoringList.current=false;}}
  onScroll={({nativeEvent})=>{
   const y=Math.max(0,nativeEvent.contentOffset.y);
   // Ignore the remount's initial zero offset until native layout restores the list.
   if(restoringList.current&&Math.abs(y-listOffset.current)>1)return;
   restoringList.current=false;
   listOffset.current=y;
  }} ListHeaderComponent={<View style={{gap:14}}>
  <Text style={s.eyebrow}>{t('효과 라이브러리')}</Text><Text style={s.title}>Effects</Text><Text style={s.muted}>{catalogUi.intro[locale]}</Text>
  <View style={d.searchRow}>
   <TextInput accessibilityLabel={catalogUi.search[locale]} value={query} onChangeText={setQuery} placeholder={catalogUi.search[locale]} placeholderTextColor={colors.muted} style={[s.input,{flex:1,minWidth:0}]}/>
   <Pressable accessibilityRole="button" accessibilityLabel={`${catalogUi.filters[locale]}${activeFilters?` (${activeFilters})`:''}`} accessibilityState={{expanded:filtersOpen}} onPress={openFilters} style={[d.filterButton,activeFilters>0&&{borderColor:colors.lime}]}><Text style={d.linkText}>{catalogUi.filters[locale]}{activeFilters>0?` · ${activeFilters}`:''}</Text></Pressable>
  </View>
  <Text style={s.muted} accessibilityLiveRegion="polite">{resultCount(matches.length,locale)}{activeFilters>0?` · ${[field!=='all'?effectFields[field][locale]:'',kind!=='all'?effectKinds[kind][locale]:''].filter(Boolean).join(' / ')}`:''}</Text>
  </View>}
  renderItem={({item:e})=><Pressable accessibilityRole="button" accessibilityLabel={effectListTitle(e,locale)} onPress={()=>{if(canAccess)void prefetchEffectStage(e.id,0);onSelect(e.id);}} style={d.card}>
   <EffectCardBody item={e} locale={locale}/>
  </Pressable>}
  ListEmptyComponent={<View style={s.card}><Text style={s.muted}>{catalogUi.empty[locale]}</Text><Button secondary title={catalogUi.reset[locale]} onPress={reset}/></View>}
 />
 <Modal visible={filtersOpen} transparent animationType="slide" onRequestClose={closeFilters} statusBarTranslucent>
  <View style={d.sheetOverlay}>
   <Pressable style={StyleSheet.absoluteFill} accessibilityRole="button" accessibilityLabel={catalogUi.closeFilters[locale]} onPress={closeFilters}/>
   <View accessibilityViewIsModal onAccessibilityEscape={closeFilters} style={[d.sheet,{paddingBottom:Math.max(insets.bottom,16)}]}>
    <View style={d.sheetHandle}/>
    <View style={s.between}><Text accessibilityRole="header" style={s.heading}>{catalogUi.filters[locale]}</Text><Pressable accessibilityRole="button" accessibilityLabel={catalogUi.closeFilters[locale]} onPress={closeFilters} style={d.back}><Text style={s.heading}>×</Text></Pressable></View>
    <ScrollView contentContainerStyle={d.sheetContent} keyboardShouldPersistTaps="handled">
  <View style={d.filterGroup}>
   <Text style={d.filterLabel}>{catalogUi.field[locale]}</Text>
   <View style={d.chips}>
    <FilterChip label={catalogUi.all[locale]} group={catalogUi.field[locale]} active={draftField==='all'} onPress={()=>setDraftField('all')}/>
    {(Object.keys(effectFields) as EffectField[]).map(f=><FilterChip key={f} label={effectFields[f][locale]} group={catalogUi.field[locale]} active={draftField===f} onPress={()=>setDraftField(f)}/>)}
   </View>
  </View>
  <View style={d.filterGroup}>
   <Text style={d.filterLabel}>{catalogUi.kind[locale]}</Text>
   <View style={d.chips}>
    <FilterChip label={catalogUi.all[locale]} group={catalogUi.kind[locale]} active={draftKind==='all'} onPress={()=>setDraftKind('all')}/>
    {(Object.keys(effectKinds) as EffectKind[]).map(k=><FilterChip key={k} label={effectKinds[k][locale]} group={catalogUi.kind[locale]} active={draftKind===k} onPress={()=>setDraftKind(k)}/>)}
   </View>
   {draftKind!=='all'&&<Text style={s.muted}>{catalogUi[draftKind==='basic'?'basicHint':'applicationHint'][locale]}</Text>}
  </View>
    </ScrollView>
    <View style={d.sheetActions}>
     <Button secondary title={catalogUi.reset[locale]} onPress={()=>{setDraftField('all');setDraftKind('all');}}/>
     <View style={{flex:1}}><Button title={`${catalogUi.applyFilters[locale]} · ${resultCount(filterEffects(effects,query,draftField,draftKind).length,locale)}`} onPress={applyFilters}/></View>
    </View>
   </View>
  </View>
 </Modal>
 </>;
}

const loadedFeaturedCards=new Set<string>();
function EffectCardBody({item,locale}:{item:(typeof effects)[number];locale:ReturnType<typeof useLanguage>['locale']}){
 const [ready,setReady]=useState(()=>loadedFeaturedCards.has(item.id));
 useEffect(()=>setReady(loadedFeaturedCards.has(item.id)),[item.id]);
 return <View>
  <View pointerEvents={ready?'auto':'none'} style={{opacity:ready?1:0}}>
   <EffectFeatured id={item.id} title={effectListTitle(item,locale)} onReady={()=>{loadedFeaturedCards.add(item.id);setReady(true);}}/>
   <View style={{padding:14,gap:8}}><Classification id={item.id}/><Text numberOfLines={1} ellipsizeMode="tail" style={d.listTitle}>{effectListTitle(item,locale)}</Text><Text style={s.muted}>{item.summary[locale]}</Text></View>
  </View>
  {!ready&&<View pointerEvents="none" style={d.skeletonOverlay}><EffectCardSkeleton/></View>}
 </View>;
}

function EffectReader({item,onBack,onSelect}:{item:(typeof effects)[number];onBack:()=>void;onSelect:(id:string)=>void}){
 const {locale}=useLanguage();const [index,setIndex]=useState(0);const scroll=useRef<ScrollView>(null);
 const isMobile=useWindowDimensions().width<700;
 const step=item.steps[index],last=index===item.steps.length-1;
 const move=(next:number)=>{const target=Math.max(0,Math.min(next,item.steps.length-1));void prefetchEffectStage(item.id,target);setIndex(target);scroll.current?.scrollTo({y:0,animated:false});};
 return <View style={{flex:1}}>
  <View style={d.header}><Pressable accessibilityRole="button" accessibilityLabel={ui.list[locale]} onPress={onBack} style={d.back}><Text style={s.heading}>←</Text></Pressable><View style={{flex:1,gap:3}}><Text style={s.eyebrow}>EFFECTS</Text><Text style={[s.heading,{fontSize:17}]}>{item.title[locale]}</Text>{locale!=='en'&&<Text numberOfLines={1} ellipsizeMode="tail" style={{color:colors.muted,fontSize:12,lineHeight:16}}>({item.title.en})</Text>}</View><Text style={s.muted}>{index+1} / {item.steps.length}</Text></View>
  {/* Keep step navigation outside the scrolling artwork and explanation. */}
  <View testID="effect-step-navigation" style={[s.page,d.stepNavigation]}>{item.steps.map((p,i)=><Pressable key={p.image} accessibilityRole="button" accessibilityLabel={`${i+1}. ${p.label[locale]}`} accessibilityState={{selected:index===i}} onPress={()=>move(i)} style={[d.step,index===i&&d.activeStep]}><Text style={{color:index===i?colors.bg:colors.muted,fontWeight:'800'}}>{String(i+1).padStart(2,'0')}</Text></Pressable>)}</View>
  <ScrollView ref={scroll} removeClippedSubviews={false} style={{flex:1}} contentContainerStyle={[s.page,{gap:14,paddingTop:2},isMobile&&{paddingHorizontal:0}]}>
   <View style={isMobile?{paddingHorizontal:20}:undefined}><Classification id={item.id}/></View>
   <EffectArtwork key={`${step.image}-${locale}`} item={item} step={step} index={index}/>
   <EffectConnections id={item.id} onSelect={onSelect}/>
   {!isMobile&&<><View style={{flexDirection:'row',gap:10,flexWrap:'wrap'}}><View style={{flex:1,minWidth:120}}><Button secondary disabled={index===0} title={'← '+ui.previous[locale]} onPress={()=>move(index-1)}/></View><View style={{flex:1,minWidth:120}}><Button title={last?ui.list[locale]:ui.next[locale]+' →'} onPress={()=>last?onBack():move(index+1)}/></View></View>
   {last&&<Button secondary title={ui.restart[locale]} onPress={()=>move(0)}/>}</>}
  </ScrollView>
 </View>;
}
function FilterChip({label,group,active,onPress}:{label:string;group:string;active:boolean;onPress:()=>void}){
 return <Pressable accessibilityRole="button" accessibilityLabel={`${group}: ${label}`} accessibilityState={{selected:active}} onPress={onPress} style={[d.chip,active&&d.activeStep]}><Text style={[d.chipText,active&&{color:colors.bg}]}>{label}</Text></Pressable>;
}
function Classification({id}:{id:string}){
 const {locale}=useLanguage();const entry=effectCatalog[id];
 if(!entry)return null;
 return <View style={d.chips}><Text style={d.kindBadge}>{effectKinds[entry.kind][locale]}</Text>{[entry.primaryField,...entry.relatedFields].map(f=><Text key={f} style={d.fieldBadge}>{effectFields[f][locale]}</Text>)}</View>;
}
function EffectConnections({id,onSelect}:{id:string;onSelect:(id:string)=>void}){
 const {locale}=useLanguage();const entry=effectCatalog[id];
 if(!entry)return null;
 const applications=linkedApplications(effects,id);
 return <View style={d.connections}>
  <Text style={d.filterLabel}>{catalogUi.functions[locale]}</Text>
  <View style={d.chips}>{entry.functions.map(f=><Text key={f} style={d.fieldBadge}>{effectFunctions[f][locale]}</Text>)}</View>
  <Text accessibilityRole="header" style={s.heading}>{catalogUi[entry.kind==='application'?'foundations':'applications'][locale]}</Text>
  {entry.kind==='application'?entry.foundations.map((foundation,i)=>{
   const target=effects.find(e=>e.id===foundation.effectId);
   return target?<Pressable key={target.id} accessibilityRole="button" onPress={()=>onSelect(target.id)} style={d.connectionCard}><View style={{flex:1,gap:6}}><Text style={d.linkText}>{effectTitle(target)[locale]}</Text><Text style={s.muted}>{target.summary[locale]}</Text></View><Text style={d.linkText}>→</Text></Pressable>:<View key={i} style={d.concept}><Text style={s.text}>{foundation.title[locale]}</Text><Text style={s.muted}>{catalogUi.conceptOnly[locale]}</Text></View>;
  }):applications.length?applications.map(target=><Pressable key={target.id} accessibilityRole="button" onPress={()=>onSelect(target.id)} style={d.connectionCard}><View style={{flex:1,gap:6}}><Text style={d.linkText}>{effectTitle(target)[locale]}</Text><Text style={s.muted}>{target.summary[locale]}</Text></View><Text style={d.linkText}>→</Text></Pressable>):<Text style={s.muted}>{catalogUi.noApplications[locale]}</Text>}
 </View>;
}
const d=StyleSheet.create({
 skeletonOverlay:{position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:colors.panel},
 listTitle:{fontSize:18,lineHeight:25,fontWeight:'700',color:colors.ink},
 searchRow:{flexDirection:'row',gap:8,alignItems:'stretch'},
 filterButton:{minHeight:50,maxWidth:'36%',paddingHorizontal:12,justifyContent:'center',borderWidth:1,borderColor:colors.line,borderRadius:8,backgroundColor:colors.panel},
 sheetOverlay:{flex:1,justifyContent:'flex-end',backgroundColor:'rgba(0,0,0,.6)'},
 sheet:{width:'100%',maxWidth:700,maxHeight:'85%',alignSelf:'center',backgroundColor:colors.bg,borderTopLeftRadius:22,borderTopRightRadius:22,paddingHorizontal:20,paddingTop:10,gap:8},
 sheetHandle:{width:36,height:4,borderRadius:2,backgroundColor:colors.muted,alignSelf:'center',marginBottom:4},
 sheetContent:{gap:24,paddingVertical:12},
 sheetActions:{flexDirection:'row',gap:10,paddingTop:12,borderTopWidth:1,borderColor:colors.line},
 filterGroup:{gap:8},
 filterLabel:{fontSize:13,fontWeight:'700',color:colors.muted},
 chips:{flexDirection:'row',flexWrap:'wrap',gap:7,alignItems:'center'},
 chip:{minHeight:44,paddingHorizontal:13,paddingVertical:10,justifyContent:'center',borderRadius:22,borderWidth:1,borderColor:colors.line,backgroundColor:colors.panel},
 chipText:{fontSize:13,fontWeight:'700',color:colors.ink},
 kindBadge:{fontSize:11,fontWeight:'800',color:colors.lime,paddingVertical:5,paddingHorizontal:8,backgroundColor:colors.panel,borderRadius:4},
 fieldBadge:{fontSize:11,color:colors.muted,paddingVertical:5,paddingHorizontal:8,backgroundColor:colors.panel,borderRadius:4},
 reset:{minHeight:44,justifyContent:'center',paddingHorizontal:8},
 linkText:{fontSize:15,lineHeight:22,fontWeight:'700',color:colors.lime},
 connections:{padding:20,gap:12,borderTopWidth:1,borderColor:colors.line},
 connectionCard:{minHeight:48,flexDirection:'row',alignItems:'center',gap:12,padding:16,borderRadius:8,backgroundColor:colors.panel,borderWidth:1,borderColor:colors.line},
 concept:{gap:4,paddingVertical:10},
 card:{borderWidth:1,borderColor:colors.line,borderRadius:8,backgroundColor:colors.panel,overflow:'hidden'},
 header:{flexDirection:'row',gap:10,alignItems:'center',paddingHorizontal:12,paddingVertical:12,borderBottomWidth:1,borderColor:colors.line},
 back:{width:44,minHeight:44,justifyContent:'center',alignItems:'center'},
 stepNavigation:{flexDirection:'row',gap:5,paddingTop:12,paddingBottom:12,backgroundColor:colors.bg,flexShrink:0},
 step:{flex:1,minHeight:44,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:colors.line,borderRadius:6,backgroundColor:colors.panel},
 activeStep:{backgroundColor:colors.lime,borderColor:colors.lime},
});
