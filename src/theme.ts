import { StyleSheet } from 'react-native';
import { PAGE_MAX_WIDTH, PAGE_PADDING } from './layout';
export const colors={bg:'#090f0c',panel:'#111c16',line:'#2a3930',ink:'#edf4ef',muted:'#93a49a',lime:'#c6ff38',cyan:'#55dfed'};
export const s=StyleSheet.create({
 root:{flex:1,backgroundColor:colors.bg},page:{width:'100%',maxWidth:PAGE_MAX_WIDTH,alignSelf:'center',padding:PAGE_PADDING,gap:18,paddingBottom:32},
 row:{flexDirection:'row',alignItems:'center',gap:10},between:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:10},
 title:{fontSize:30,fontWeight:'800',color:colors.ink},heading:{fontSize:21,fontWeight:'700',color:colors.ink},text:{fontSize:16,lineHeight:25,color:colors.ink},
 muted:{fontSize:14,lineHeight:22,color:colors.muted},eyebrow:{fontSize:11,fontWeight:'800',letterSpacing:2,color:colors.lime},
 card:{backgroundColor:colors.panel,borderWidth:1,borderColor:colors.line,borderRadius:12,padding:18,gap:12},
 button:{minHeight:48,paddingHorizontal:16,paddingVertical:13,borderRadius:8,backgroundColor:colors.lime,alignItems:'center',justifyContent:'center'},
 buttonText:{color:'#111a08',fontWeight:'800',fontSize:15,textAlign:'center',flexShrink:1},secondary:{backgroundColor:colors.panel,borderWidth:1,borderColor:colors.line},
 input:{minHeight:50,borderWidth:1,borderColor:colors.line,borderRadius:8,padding:14,color:colors.ink,backgroundColor:colors.panel,fontSize:16},
 imageFrame:{width:'100%',alignSelf:'stretch',borderRadius:8,overflow:'hidden',backgroundColor:'#0b160f'},
 tab:{flex:1,alignItems:'center',justifyContent:'center',paddingVertical:13,minHeight:56},
 error:{color:'#ffac9a',fontSize:14,lineHeight:22},pill:{padding:9,borderRadius:6,backgroundColor:colors.panel},
});
