import React from 'react';
import {Image,StyleSheet,Text,View} from 'react-native';
import {colors} from './theme';

const brainNote=require('../assets/triz-note-brain-mark-v1.png');

/** Selected notebook-ring/brain brand lockup, rendered crisply at UI size. */
export default function BrandLogo({large=false}:{large?:boolean}){
 const mark=large?50:36;
 return <View accessible accessibilityRole="image" accessibilityLabel="TRIZ NOTE" style={styles.row}>
  <Image source={brainNote} resizeMode="contain" style={{width:mark*1.04,height:mark}}/>
  <Text allowFontScaling={false} numberOfLines={1} style={[styles.wordmark,large&&styles.wordmarkLarge]}>
   TRIZ <Text style={styles.note}>NOTE</Text>
  </Text>
 </View>;
}

const styles=StyleSheet.create({
 row:{flexDirection:'row',alignItems:'center',gap:9},
 wordmark:{color:colors.ink,fontSize:15,lineHeight:20,fontWeight:'900',letterSpacing:2},
 wordmarkLarge:{fontSize:21,lineHeight:28,letterSpacing:3},
 note:{color:colors.lime},
});
