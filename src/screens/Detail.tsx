import Text from '../ContentText';
import React,{useEffect,useState} from 'react';
import {ScrollView,View,TextInput,Alert,Pressable,StyleSheet} from 'react-native';
import {s as shared,colors} from '../theme';
import {Button,Diagram} from '../components';
import {useLanguage,usePrinciples,usePrincipleDetails} from '../i18n';
import {supabase} from '../lib/supabase';
import TabIcon from '../TabIcon';
import ApplicationExercise from '../ApplicationExercise';
const s={...shared,text:[shared.text,{fontSize:14,lineHeight:21}],heading:[shared.heading,{fontSize:18,lineHeight:25}],muted:[shared.muted,{fontSize:12,lineHeight:18}]};
const membraneParts=[
 ['유연한 막 / 필름','화물의 굴곡을 따라 밀착하는 얇은 경계면입니다.'],
 ['대기압','내부 압력이 낮아졌을 때 막을 바깥에서 누르는 쪽의 압력입니다.'],
 ['보조 필터','분말이 공기와 함께 배관 쪽으로 들어가는 것을 줄입니다.'],
 ['흡입 배관','필터를 통과한 공기가 펌프 쪽으로 이동하는 통로입니다.'],
 ['진공 펌프','막 아래의 공기를 빼내 압력 차를 만듭니다.'],
 ['분말형 화물','막으로 표면을 덮고 고정하려는 대상입니다.'],
];
export default function Detail({id,userId,saved,done,busy,onSave,onDone,onBack,onNext}:{id:number;userId?:string;saved:boolean;done:boolean;busy:boolean;onSave:()=>void;onDone:()=>void;onBack:()=>void;onNext:()=>void}){
 const{t,locale}=useLanguage(),p=usePrinciples()[id-1];
 const principleDetails=usePrincipleDetails(id);
 const [note,setNote]=useState(''),[notes,setNotes]=useState<{id:string;body:string}[]>([]),[saving,setSaving]=useState(false);
 const [expanded,setExpanded]=useState(false);
 useEffect(()=>setExpanded(false),[id]);
 useEffect(()=>{let live=true;setNote('');setNotes([]);if(userId)void supabase.from('notes').select('id,body').eq('user_id',userId).eq('principle_id',id).order('updated_at',{ascending:false}).then(({data,error})=>{if(live){if(error)Alert.alert(t('동기화 실패'),error.message);else setNotes(data??[]);}});return()=>{live=false}},[id,userId]);
 async function save(){if(!userId||!note.trim())return;setSaving(true);try{const{data,error}=await supabase.from('notes').insert({user_id:userId,principle_id:id,body:note.trim()}).select('id,body').single();if(error)throw error;setNotes(n=>[data,...n]);setNote('');}catch(e){Alert.alert(t('동기화 실패'),e instanceof Error?e.message:String(e));}finally{setSaving(false);}}
 return <View style={{flex:1}}>
  <View style={d.header}>
   <Pressable accessibilityRole="button" accessibilityLabel={t('원리 목록')} onPress={onBack} style={d.back}><Text style={{color:colors.ink,fontSize:22}}>←</Text></Pressable>
   <View style={{flex:1,gap:3,minWidth:0}}><Text accessibilityRole="header" style={d.headerTitle}><Text style={{color:colors.lime}}>{String(id).padStart(2,'0')}. </Text>{p.ko}</Text>{locale!=='en'&&<Text style={{color:colors.muted,fontSize:11,lineHeight:15}}>{p.en}</Text>}</View>
   <Pressable accessibilityRole="button" accessibilityLabel={t(saved?'저장됨':'저장')} accessibilityState={{disabled:busy}} disabled={busy} onPress={()=>userId?onSave():Alert.alert(t('로그인'),t('로그인하면 학습 기록을 동기화할 수 있습니다.'))} style={[d.save,saved&&{borderColor:colors.lime}]}><TabIcon name="saved" color={saved?colors.lime:colors.ink} size={17}/><Text style={{color:saved?colors.lime:colors.ink,fontSize:12}}>{t(saved?'저장됨':'저장')}</Text></Pressable>
  </View>
  <ScrollView key={id} contentContainerStyle={[s.page,{gap:12,paddingTop:14}]} keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets>
  <View style={[d.panel,d.takeaway]}><Text style={s.eyebrow}>{t('한눈에 이해하기')}</Text><Text style={s.heading}>{p.guide.summary}</Text></View>
  <View style={[d.panel,{padding:0,gap:0,overflow:'hidden'}]}><Diagram src={p.image} title={p.exampleTitle} overlay/><View style={{padding:12,gap:6}}><Text style={s.eyebrow}>{t('3D로 보는 적용 사례')}</Text><Text style={s.heading}>{p.exampleTitle}</Text></View></View>
  <View style={d.panel}><Text style={s.eyebrow}>{t('그림 읽는 순서')}</Text><Text style={s.heading}>{t('이 부분을 살펴보세요')}</Text>
   {id===30?membraneParts.map(([name,description])=><View key={name} style={d.divider}><View style={d.partTag}><Text accessibilityRole="header" style={d.partTitle}>{t(name)}</Text></View><Text style={s.text}>{t(description)}</Text></View>):p.guide.labels.map((label,i)=><View key={i} style={d.divider}><View style={d.partTag}><Text accessibilityRole="header" style={d.partTitle}>{t(label)}</Text></View><Text style={s.text}>{principleDetails.parts[i]}</Text></View>)}
   <Text style={[s.muted,{fontSize:12,marginTop:8}]}>{t('그림의 연결선으로 위치를 확인하세요. 작은 글씨는 ‘도해 확대’에서 읽을 수 있어요.')}</Text>
  </View>
  <View style={d.panel}><Text style={s.eyebrow}>{t('작동 과정')}</Text><Text style={s.heading}>{t('세 단계로 이해하기')}</Text>
   {p.guide.steps.map((step,i)=><View key={i} style={[d.divider,s.row,{alignItems:'flex-start'}]}><View style={d.step}><Text style={[s.eyebrow,{letterSpacing:0}]}>{String(i+1).padStart(2,'0')}</Text></View><Text style={[s.text,{flex:1}]}>{step}</Text></View>)}
  </View>
  {!!p.guide.note&&<View style={d.panel}><Text style={s.eyebrow}>{t('알아두세요')}</Text><Text style={s.text}>{t(p.guide.note)}</Text></View>}
  <Text style={[s.muted,{fontSize:12}]}>{t('원리를 설명하기 위한 3D 개념 도해입니다. 실제 제품의 구조·크기와 다를 수 있습니다.')}</Text>
  <View style={d.panel}><Pressable accessibilityRole="button" accessibilityState={{expanded}} onPress={()=>setExpanded(x=>!x)} style={[s.between,{minHeight:28}]}><Text style={[d.part,{flex:1}]}>{t('원리와 기존 사례 더 읽기')}</Text><Text style={s.text}>{expanded?'⌄':'›'}</Text></Pressable>
   {expanded&&<>
    {!!p.example&&<View style={d.legacyCase}>
     <Text style={s.eyebrow}>{t('기존 사례')}</Text><Text style={s.heading}>{p.exampleTitle}</Text>
     {id===30?[['덮기','분말형 화물 위에 얇은 막을 씌웁니다.'],['공기 빼기','진공 펌프로 막 아래의 공기를 빼냅니다.'],['고정하기','바깥 공기의 압력이 막을 화물에 밀착시켜 고정합니다.']].map(([label,body])=><View key={label} style={d.caseRow}><Text style={d.caseLabel}>{t(label)}</Text><Text style={[s.text,{flex:1}]}>{t(body)}</Text></View>):t(p.example).split(/(?<=[.!?])\s+/).filter(Boolean).map((sentence,i)=><Text key={i} style={s.text}>{t(sentence)}</Text>)}
    </View>}
    <Text style={[s.heading,{marginTop:8}]}>{t('원리 이해하기')}</Text>
    {p.sections.map((x,i)=><View key={i} style={d.ruleCard}>
     <View style={[s.row,{alignItems:'flex-start'}]}><View style={d.ruleNumber}><Text style={[s.eyebrow,{letterSpacing:0}]}>{String(i+1).padStart(2,'0')}</Text></View><Text style={[d.part,{flex:1,lineHeight:23}]}>{t(x.title)}</Text></View>
     {!!x.subTitle?.filter(Boolean).length&&<View style={d.examples}><Text style={d.exampleLabel}>{t('적용 예시')}</Text>{x.subTitle.filter(Boolean).map((y,j)=><View key={j} style={[s.row,{alignItems:'flex-start',gap:8}]}><Text style={{color:colors.muted,fontSize:12,lineHeight:22}}>{j+1}.</Text><Text style={[s.text,{flex:1,lineHeight:22}]}>{t(y)}</Text></View>)}</View>}
    </View>)}
   </>}
  </View>
  <ApplicationExercise key={`${id}-${userId??'guest'}`} principle={p} userId={userId}/>
  <View style={[s.row,{justifyContent:'flex-end',flexWrap:'wrap'}]}><Button disabled={busy} title={'✓　'+t(done?'학습 완료':'이 원리 익히기')} onPress={()=>userId?onDone():Alert.alert(t('로그인'),t('로그인하면 학습 기록을 동기화할 수 있습니다.'))}/><Button secondary title={t('다음 원리')+'　→'} onPress={onNext}/></View>
  {!userId&&<Text style={s.muted}>{t('로그인하면 학습 기록을 동기화할 수 있습니다.')}</Text>}
  {userId&&<View style={d.panel}><Text style={s.heading}>{t('메모')}</Text><TextInput multiline maxLength={5000} value={note} onChangeText={setNote} placeholder={t('내 생각을 기록하세요.')} placeholderTextColor={colors.muted} style={[s.input,{minHeight:110,textAlignVertical:'top'}]}/><Button disabled={saving||!note.trim()} title={t('메모 저장')} onPress={()=>void save()}/>{notes.map(n=><Text key={n.id} style={s.text}>{n.body}</Text>)}</View>}
 </ScrollView></View>;
}
const d=StyleSheet.create({
 header:{flexDirection:'row',alignItems:'center',gap:10,paddingHorizontal:14,paddingVertical:10,borderBottomWidth:1,borderColor:colors.line,backgroundColor:colors.bg},
 back:{minWidth:48,minHeight:44,alignItems:'center',justifyContent:'center',gap:2},
 headerTitle:{color:colors.ink,fontSize:17,lineHeight:23,fontWeight:'800'},
 save:{minHeight:44,padding:10,borderRadius:6,borderWidth:1,borderColor:colors.line,flexDirection:'row',alignItems:'center',gap:6,backgroundColor:colors.panel},
 panel:{backgroundColor:'#111914',borderWidth:1,borderColor:colors.line,borderRadius:8,padding:12,gap:8},
 takeaway:{backgroundColor:'#18201b',borderWidth:1,borderColor:'#3a493e',padding:14,gap:8},
 divider:{borderTopWidth:1,borderTopColor:colors.line,paddingTop:9,gap:4},
 legacyCase:{backgroundColor:'#18211b',borderRadius:6,padding:12,gap:10,marginTop:4},
 caseRow:{flexDirection:'row',alignItems:'flex-start',gap:10},
 caseLabel:{width:66,color:'#c6d6ca',fontSize:12,fontWeight:'700',lineHeight:21},
 ruleCard:{borderTopWidth:1,borderTopColor:colors.line,paddingTop:12,paddingBottom:4,gap:10},
 ruleNumber:{minWidth:28,height:28,borderRadius:4,backgroundColor:'#26351e',alignItems:'center',justifyContent:'center'},
 examples:{backgroundColor:'#0c140f',borderRadius:6,padding:12,gap:9},
 exampleLabel:{color:colors.muted,fontSize:11,fontWeight:'700',letterSpacing:1},
 part:{color:'#dfecd6',fontSize:14,fontWeight:'700',lineHeight:21},
 partTag:{alignSelf:'flex-start',maxWidth:'100%',backgroundColor:'#24321b',borderWidth:1,borderColor:'#40532a',borderRadius:4,paddingHorizontal:8,paddingVertical:3,marginBottom:3},
 partTitle:{color:colors.lime,fontSize:14,fontWeight:'800',lineHeight:20},
 step:{width:26,height:26,borderRadius:13,backgroundColor:'#26351e',alignItems:'center',justifyContent:'center'},
});
