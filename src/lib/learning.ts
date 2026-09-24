import {useEffect,useRef,useState} from 'react';
import {supabase} from './supabase';
export function useLearning(userId:string|undefined){
 const [bookmarks,setBookmarks]=useState<number[]>([]),[completed,setCompleted]=useState<number[]>([]),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 const [loadedOwner,setLoadedOwner]=useState<string|undefined>();
 const owner=useRef(userId);owner.current=userId;
 async function refresh(){
 if(!userId)return;const id=userId;
 const [b,p]=await Promise.all([supabase.from('bookmarks').select('principle_id').eq('user_id',id),supabase.from('learning_progress').select('principle_id').eq('user_id',id).eq('completed',true)]);
 if(owner.current!==id)return;
 if(b.error||p.error){setError(b.error?.message??p.error?.message??'Sync failed');return;}
 setBookmarks(b.data.map(x=>x.principle_id));setCompleted(p.data.map(x=>x.principle_id));setLoadedOwner(id);setError('');
 }
 useEffect(()=>{setBookmarks([]);setCompleted([]);setError('');void refresh().catch(e=>setError(e.message));},[userId]);
 async function toggle(kind:'bookmarks'|'learning_progress',id:number){
 if(!userId||busy)return;setBusy(true);const uid=userId;
 try{
 const active=(kind==='bookmarks'?bookmarks:completed).includes(id);
 const result=kind==='bookmarks'?(active?await supabase.from(kind).delete().eq('user_id',uid).eq('principle_id',id):await supabase.from(kind).insert({user_id:uid,principle_id:id})):await supabase.from(kind).upsert({user_id:uid,principle_id:id,completed:!active,updated_at:new Date().toISOString()});
 if(result.error)throw result.error;
 if(owner.current===uid)await refresh();
 }catch(e){if(owner.current===uid)setError(e instanceof Error?e.message:String(e));}finally{setBusy(false);}
 }
 return {bookmarks:loadedOwner===userId?bookmarks:[],completed:loadedOwner===userId?completed:[],error,busy,refresh,toggle};
}
