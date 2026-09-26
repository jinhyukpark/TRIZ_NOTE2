import {createClient} from 'npm:@supabase/supabase-js@2.116.0';
import {createHandler} from './handler.ts';
const url=Deno.env.get('SUPABASE_URL')!;
const admin=createClient(url,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,{auth:{persistSession:false,autoRefreshToken:false}});
// Explicit JWT verification via auth.getUser supports rotated asymmetric signing keys.
Deno.serve(createHandler(admin,url));
