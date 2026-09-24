import {useCallback,useEffect,useRef,useState} from 'react';
import {AppState} from 'react-native';
import {supabase} from './supabase';
import {isEntitled} from './entitlement';
const listeners=new Set<()=>void>();
export function subscriptionChanged(){for(const listener of listeners)listener();}
export function useSubscription(userId?:string){
 const [state,setState]=useState<{owner?:string;loading:boolean;active:boolean;expires:string|null;error:boolean}>({loading:!!userId,active:false,expires:null,error:false});
 const owner=useRef(userId);owner.current=userId;
 const refresh=useCallback(async()=>{
  if(!userId){setState({loading:false,active:false,expires:null,error:false});return false;}
  try{
   const{data,error}=await supabase.from('entitlements').select('active,expires_at').eq('user_id',userId).eq('entitlement','premium').maybeSingle();
   if(error)throw error;
   const active=isEntitled(data);
   if(owner.current===userId)setState({owner:userId,loading:false,active,expires:data?.expires_at??null,error:false});
   return active;
  }catch{if(owner.current===userId)setState({owner:userId,loading:false,active:false,expires:null,error:true});throw Error('SUBSCRIPTION_LOOKUP_FAILED');}
 },[userId]);
 useEffect(()=>{setState({owner:userId,loading:!!userId,active:false,expires:null,error:false});void refresh().catch(()=>{});const listener=AppState.addEventListener('change',s=>{if(s==='active')void refresh().catch(()=>{});});return()=>listener.remove();},[refresh]);
 useEffect(()=>{const listener=()=>{void refresh().catch(()=>{});};listeners.add(listener);return()=>{listeners.delete(listener);};},[refresh]);
 useEffect(()=>{if(!state.active||!state.expires)return;const remaining=Date.parse(state.expires)-Date.now();const timer=setTimeout(()=>{setState(s=>({...s,active:isEntitled({active:s.active,expires_at:s.expires})}));},Math.max(0,Math.min(remaining,2147483647)));return()=>clearTimeout(timer);},[state.active,state.expires]);
 return {...state,loading:!!userId&&(state.owner!==userId||state.loading),active:state.owner===userId&&state.active&&isEntitled({active:true,expires_at:state.expires}),refresh};
}
