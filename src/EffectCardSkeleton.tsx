import React,{useEffect,useRef} from 'react';
import {Animated,StyleSheet,View} from 'react-native';
import {colors} from './theme';

/** Keeps the final card geometry stable while its featured bitmap decodes. */
export default function EffectCardSkeleton(){
 const pulse=useRef(new Animated.Value(.42)).current;
 useEffect(()=>{
  const animation=Animated.loop(Animated.sequence([
   Animated.timing(pulse,{toValue:.82,duration:650,useNativeDriver:true}),
   Animated.timing(pulse,{toValue:.42,duration:650,useNativeDriver:true}),
  ]));
  animation.start();
  return()=>animation.stop();
 },[pulse]);
 return <View testID="effect-card-skeleton" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.card}>
  <Animated.View style={[styles.image,{opacity:pulse}]}/>
  <View style={styles.copy}>
   <Animated.View style={[styles.badges,{opacity:pulse}]}/>
   <Animated.View style={[styles.title,{opacity:pulse}]}/>
   <Animated.View style={[styles.line,{opacity:pulse}]}/>
   <Animated.View style={[styles.shortLine,{opacity:pulse}]}/>
  </View>
 </View>;
}

const styles=StyleSheet.create({
 card:{width:'100%',backgroundColor:colors.panel},
 image:{width:'100%',aspectRatio:16/9,backgroundColor:'#19302b'},
 copy:{padding:14,gap:10},
 badges:{width:'44%',height:18,borderRadius:5,backgroundColor:'#29423b'},
 title:{width:'78%',height:24,borderRadius:5,backgroundColor:'#29423b'},
 line:{width:'100%',height:15,borderRadius:4,backgroundColor:'#203832'},
 shortLine:{width:'67%',height:15,borderRadius:4,backgroundColor:'#203832'},
});
