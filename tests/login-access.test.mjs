import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
function load(path,deps){const out={};new Function('require','exports',ts.transpileModule(read(path),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(name=>deps[name],out);return out;}
test('all menu content is behind a non-anonymous session; guest bypass removed',()=>{
 const app=read('App.tsx');
 assert.match(app,/if\(recovery\|\|!session\|\|session.user.is_anonymous\)return/);
 assert.ok(!app.includes('setGuest(true)'));
 assert.ok(app.indexOf('if(recovery||!session')<app.indexOf('<Home completed='));
 const auth=read('src/screens/Auth.tsx');
 for(const text of ['signInWithPassword','signUp','signInWithGoogle','<AppleLogin','<LegalLinks','<ManageSubscription'])assert.ok(auth.includes(text));
});
test('PKCE callbacks are exact matched and exchanged only once',async()=>{
 const codes=[];
 const auth=load('src/lib/auth.ts',{'./supabase':{supabase:{auth:{exchangeCodeForSession:async code=>{codes.push(code);return {error:null};}}}}});
 await auth.handleAuthLink('triznote://auth/callback-evil?code=bad');
 await auth.handleAuthLink('https://auth/callback?code=bad');
 await Promise.all([auth.handleAuthLink('triznote://auth/callback?code=good'),auth.handleAuthLink('triznote://auth/callback?code=good')]);
 assert.deepEqual(codes,['good']);
 await assert.rejects(auth.handleAuthLink('triznote://auth/callback?error_description=denied'),/denied/);
});
test('Google uses the system browser and cancellation does not create a session',async()=>{
 let result={type:'cancel'};const callbacks=[];const opens=[];
 const google=load('src/lib/googleAuth.ts',{
  './supabase':{supabase:{auth:{signInWithOAuth:async input=>{assert.equal(input.provider,'google');assert.equal(input.options.skipBrowserRedirect,true);return {data:{url:'https://example.com/oauth'},error:null};}}}},
  'react-native':{Platform:{OS:'android'}},
  'expo-web-browser':{
   getCustomTabsSupportingBrowsersAsync:async()=>({browserPackages:['com.android.chrome','com.sec.android.app.sbrowser'],servicePackages:['com.android.chrome','com.sec.android.app.sbrowser'],defaultBrowserPackage:'com.sec.android.app.sbrowser',preferredBrowserPackage:'com.sec.android.app.sbrowser'}),
   openAuthSessionAsync:async(...args)=>{opens.push(args);return result},
  },
  './auth':{redirectTo:'triznote://auth/callback',handleAuthLink:async url=>callbacks.push(url)},
 });
 await google.signInWithGoogle();assert.equal(callbacks.length,0);
 result={type:'success',url:'triznote://auth/callback?code=test'};
 await google.signInWithGoogle();assert.deepEqual(callbacks,[result.url]);
 assert.deepEqual(opens[0][2],{browserPackage:'com.android.chrome',createTask:false,showInRecents:false});
});
