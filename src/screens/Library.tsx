import React,{useEffect,useState} from 'react';
import {FlatList,View,Text,TextInput,Pressable,useWindowDimensions,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {s,colors} from '../theme';
import {useLanguage,usePrinciples} from '../i18n';
import {assets} from '../data/assets';
import {FramedImage} from '../components';
import {libraryLayout,GRID_GAP} from '../layout';

export default function Library({saved,bookmarks,onOpen}:{saved:boolean;bookmarks:number[];onOpen:(id:number)=>void}){
 const {t,locale}=useLanguage(),principles=usePrinciples(),{fontScale}=useWindowDimensions();
 const [availableWidth,setAvailableWidth]=useState(0);
 const [query,setQuery]=useState(''),[mode,setMode]=useState<'icons'|'cards'>('icons');
 useEffect(()=>{AsyncStorage.getItem('library-view').then(x=>{if(x==='cards')setMode(x)}).catch(()=>{});},[]);
 const change=(m:'icons'|'cards')=>{setMode(m);void AsyncStorage.setItem('library-view',m).catch(()=>{});};
 const items=principles.filter(p=>(!saved||bookmarks.includes(p.id))&&(`${String(p.id).padStart(2,'0')} ${p.ko} ${p.en} ${p.cue}`).toLowerCase().includes(query.toLowerCase()));
 const {columns,tileWidth}=libraryLayout(availableWidth,fontScale,mode==='cards');
 return <View style={{flex:1}} onLayout={e=>setAvailableWidth(e.nativeEvent.layout.width)}>
  {availableWidth>0&&<FlatList key={columns} data={items} numColumns={columns}
   keyExtractor={p=>String(p.id)} extraData={{mode,bookmarks,tileWidth}}
   contentContainerStyle={[s.page,{gap:0}]} keyboardShouldPersistTaps="handled"
   columnWrapperStyle={columns>1?{gap:GRID_GAP,alignItems:'stretch'}:undefined}
   ListHeaderComponent={<View style={{gap:18,marginBottom:20}}>
    <Text style={s.eyebrow}>{t('지식 카드')}</Text>
    <Text style={s.title}>{t(saved?'저장한 원리':'40가지 발명원리')}</Text>
    <TextInput accessibilityLabel={t('원리 이름, 키워드, 번호로 검색')} placeholder={t('원리 이름, 키워드, 번호로 검색')} placeholderTextColor={colors.muted} value={query} onChangeText={setQuery} style={s.input}/>
    <View style={[s.between,{flexWrap:'wrap'}]}>
     <Text style={s.muted}>{t('원리')} · {items.length}</Text>
     <View style={[s.row,{flexWrap:'wrap'}]}>{(['icons','cards'] as const).map(m=>
      <Pressable key={m} accessibilityRole="button" accessibilityState={{selected:mode===m}} onPress={()=>change(m)} style={[s.pill,{minHeight:44,justifyContent:'center'},mode===m&&{backgroundColor:colors.lime}]}>
       <Text style={{color:mode===m?colors.bg:colors.muted}}>{t(m==='icons'?'아이콘형':'카드형')}</Text>
      </Pressable>)}</View>
    </View>
   </View>}
   ListEmptyComponent={<Text style={s.muted}>{t('검색 결과가 없습니다.')}</Text>}
   renderItem={({item:p})=>mode==='icons'?<Pressable accessibilityRole="button" accessibilityLabel={`${p.id} ${p.ko}`} onPress={()=>onOpen(p.id)} style={[styles.square,{width:tileWidth,height:tileWidth}]}>
    <View style={styles.iconArt}><View style={{width:Math.max(0,tileWidth-38)}}><FramedImage squareCorners source={assets[`/assets/principle-icons/principle-${String(p.id).padStart(2,'0')}.jpg`]} ratio={1}/></View></View>
    <View pointerEvents="none" style={styles.badges}><Text style={[s.eyebrow,{fontSize:10,letterSpacing:1}]}>{String(p.id).padStart(2,'0')}</Text>{bookmarks.includes(p.id)&&<Text style={{color:colors.lime,fontSize:11}}>★</Text>}</View>
    <Text numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.75} style={styles.name}>{p.ko}</Text>
   </Pressable>:<Pressable accessibilityRole="button" accessibilityLabel={`${p.id} ${p.ko}`} onPress={()=>onOpen(p.id)}
    style={[s.card,{width:tileWidth,marginBottom:GRID_GAP,overflow:'hidden',minWidth:0}]}>
     <View style={s.between}><Text style={s.eyebrow}>{String(p.id).padStart(2,'0')}</Text>{bookmarks.includes(p.id)&&<Text style={{color:colors.lime}}>★</Text>}</View>
     <FramedImage source={assets[p.image]} ratio={1.5}/>
     <Text style={s.heading}>{p.ko}</Text>
     {locale!=='en'&&<Text style={s.muted}>{p.en}</Text>}<Text style={s.text}>{p.cue}</Text>
   </Pressable>}
  />}
 </View>;
}
const styles=StyleSheet.create({
 square:{backgroundColor:'#0b160f',borderWidth:1,borderColor:colors.line,borderRadius:0,overflow:'hidden',marginBottom:GRID_GAP},
 iconArt:{position:'absolute',top:1,left:0,right:0,bottom:30,alignItems:'center',justifyContent:'center'},
 badges:{position:'absolute',top:6,left:7,right:7,flexDirection:'row',justifyContent:'space-between'},
 name:{position:'absolute',bottom:3,left:4,right:4,height:28,color:colors.ink,fontWeight:'700',textAlign:'center',fontSize:11,lineHeight:14},
});
