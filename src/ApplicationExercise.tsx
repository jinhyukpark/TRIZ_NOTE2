import Text from './ContentText';
import React,{useEffect,useState} from 'react';
import {View,TextInput,StyleSheet,Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from './components';
import {s,colors} from './theme';
import {useLanguage} from './i18n';
import copy from './locales/application.json';
import type {Principle} from './data/principles';
import {exerciseKey,parseExercise} from './exerciseStorage';

export default function ApplicationExercise({principle:p,userId}:{principle:Principle;userId?:string}){
 const {locale}=useLanguage(),c=copy[locale],key=exerciseKey(p.id,userId);
 const [problem,setProblem]=useState(''),[idea,setIdea]=useState('');
 const [expanded,setExpanded]=useState(false);
 const [ready,setReady]=useState(false),[loadingError,setLoadingError]=useState(false),[saving,setSaving]=useState(false),[saveError,setSaveError]=useState(false);
 const [baseline,setBaseline]=useState(''),[attempt,setAttempt]=useState(0);
 const current=JSON.stringify({problem,idea}),dirty=ready&&current!==baseline;
 useEffect(()=>{let live=true;setReady(false);setLoadingError(false);
  AsyncStorage.getItem(key).then(raw=>{const data=parseExercise(raw);if(live){setProblem(data.problem);setIdea(data.idea);setBaseline(JSON.stringify(data));setReady(true);}}).catch(()=>{if(live)setLoadingError(true);});
  return()=>{live=false;};
 },[key,attempt]);
 async function save(){setSaving(true);setSaveError(false);try{await AsyncStorage.setItem(key,current);setBaseline(current);}catch{setSaveError(true);}finally{setSaving(false);}}
 return <View style={styles.panel}>
  <Pressable accessibilityRole="button" accessibilityState={{expanded}} onPress={()=>setExpanded(x=>!x)} style={{minHeight:44,flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:8}}><Text style={s.eyebrow}>{c.title}{ready&&(problem||idea)?' ✓':''}</Text><Text style={s.text}>{expanded?'−':'＋'}</Text></Pressable>
  <Text style={[s.heading,{fontSize:17,lineHeight:24}]}>{p.id===30?c.question30:p.question}</Text>
  {expanded&&<>
  <Text style={s.muted}>{c.intro}</Text>
  <View style={styles.example}><Text style={{color:colors.lime,fontWeight:'700'}}>{c.exampleTitle}</Text><Text style={s.text}>{p.id===30?c.example30:p.guide.summary}</Text></View>
  {loadingError?<><Text style={s.error}>{c.loadError}</Text><Button secondary title={c.retry} onPress={()=>setAttempt(n=>n+1)}/></>:<>
   <Text style={styles.label}>{c.problem}</Text><TextInput accessibilityLabel={c.problem} editable={ready&&!saving} multiline maxLength={2000} value={problem} onChangeText={v=>{setProblem(v);setSaveError(false);}} placeholder={c.problemHint} placeholderTextColor={colors.muted} style={[s.input,styles.input]}/>
   <Text style={styles.label}>{c.idea}</Text><TextInput accessibilityLabel={c.idea} editable={ready&&!saving} multiline maxLength={3000} value={idea} onChangeText={v=>{setIdea(v);setSaveError(false);}} placeholder={c.ideaHint} placeholderTextColor={colors.muted} style={[s.input,styles.input]}/>
   <Button title={saving?c.saving:c.save} disabled={!ready||saving||!dirty} onPress={()=>void save()}/>
   <Text accessibilityLiveRegion="polite" style={saveError?s.error:s.muted}>{saveError?c.saveError:dirty?c.unsaved:ready&&(problem||idea)?c.saved:''}</Text>
  </>}
  <Text style={[s.muted,{fontSize:12,lineHeight:19}]}>{c.privacy}</Text>
  </>}
  {!expanded&&dirty&&<Text style={s.muted}>{c.unsaved}</Text>}
 </View>;
}
const styles=StyleSheet.create({panel:{backgroundColor:'#111914',borderWidth:1,borderColor:colors.line,borderRadius:8,padding:12,gap:8},example:{backgroundColor:'#18201b',borderWidth:1,borderColor:'#3a493e',borderRadius:6,padding:10,gap:6},label:{color:colors.ink,fontSize:14,fontWeight:'700'},input:{minHeight:76,textAlignVertical:'top',fontSize:14}});
