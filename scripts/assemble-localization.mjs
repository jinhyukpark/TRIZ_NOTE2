// Assemble reviewed draft resources into an apply_patch patch on stdout.
import fs from 'node:fs';
const input=JSON.parse(fs.readFileSync('/tmp/triz-localization-input.json','utf8'));
const complete={};
const correct=(value,source,locale)=>{
 let text=value.trim().replace(/^TRIZ\s*SEG\s*\d+\s*END\s*/i,'');
 if(locale==='ja'&&/장/.test(source))text=text.replaceAll('腸','場');
 if(locale==='zh'&&/장/.test(source))text=text.replaceAll('肠','场');
 if(locale==='en'&&/장/.test(source))text=text.replace(/\bintestin(?:e|es|al)\b/gi,'field').replace(/(?:material|matter|substance)\s*[-–]\s*field/gi,'substance–field');
 if(/홀\s*(전압|효과)/.test(source)&&locale==='en')text=text.replace(/hole/gi,'Hall');
 if(/홀\s*(전압|효과)/.test(source)&&locale==='ja')text=text.replace(/穴/g,'ホール');
 if(/윅/.test(source)&&locale==='en')text=text.replace(/week/gi,'wick');
 if(/혼/.test(source)&&/초음파|진동/.test(source)&&locale==='en')text=text.replace(/soul|spirit/gi,'horn');
 return text;
};
for(const line of fs.readFileSync('/tmp/triz-localization-draft.jsonl','utf8').trim().split('\n').filter(Boolean)){
 const r=JSON.parse(line);(complete[r.source]??={})[r.locale]=correct(r.text,r.source,r.locale);
}
Object.assign(complete,{
 '오스테나이트 고온 상 (안정한 구조)':{en:'Austenite: high-temperature phase (stable structure)',ja:'オーステナイト：高温相（安定な構造）',zh:'奥氏体：高温相（稳定结构）'},
 '마르텐사이트 저온 상 (변형된 구조)':{en:'Martensite: low-temperature phase (deformed structure)',ja:'マルテンサイト：低温相（変形した構造）',zh:'马氏体：低温相（变形结构）'},
 '코로나 방전 전극 주변에만 코로나가 형성되며. 전체를 관통하지 않습니다.':{en:'Corona discharge: confined near the electrode; it does not bridge the whole gap.',ja:'コロナ放電：電極付近だけに形成され、電極間全体を貫通しません。',zh:'电晕放电：仅出现在电极附近，不贯穿整个间隙。'},
 '이온화 영역 강한 전기장에 의해 공기가 이온화 됩니다.':{en:'Ionization region: the strong electric field ionizes the air.',ja:'電離領域：強い電場により空気が電離します。',zh:'电离区域：强电场使空气电离。'},
 '01 - 배치':{en:'01 — Placement',ja:'01 — 配置',zh:'01 — 放置'},
 '정렬':{en:'Alignment',ja:'位置合わせ',zh:'对齐'},
 '인가':{en:'Apply',ja:'印加',zh:'施加'},
 '응고':{en:'Solidification',ja:'凝固',zh:'凝固'},
 '젖음':{en:'Wetting',ja:'濡れ',zh:'润湿'},
 '토치 배치 용접 토치':{en:'Torch positioning: welding torch',ja:'トーチ配置：溶接トーチ',zh:'焊炬定位：焊接焊炬'},
 '양극 원형 전극':{en:'Anode: circular electrode',ja:'陽極：円形電極',zh:'阳极：圆形电极'},
 '저온 조직은 변형을 수용합니다':{en:'The low-temperature microstructure accommodates deformation.',ja:'低温相の組織は変形を受け入れます。',zh:'低温组织能够适应变形。'},
 '마르텐사이트 상태에서 외력으로 모양을 바꿉니다.':{en:'An external force changes the shape in the martensitic state.',ja:'マルテンサイト状態で外力を加え、形を変えます。',zh:'在马氏体状态下，通过外力改变形状。'},
 '음압은 액체 압력을 주기적으로 바꿉니다.':{en:'Acoustic pressure changes the liquid pressure periodically.',ja:'音圧が液体の圧力を周期的に変化させます。',zh:'声压使液体压力周期性变化。'},
 '전류와 자기장에 수직인 전압을 관찰합니다.':{en:'Observe a voltage perpendicular to both the current and magnetic field.',ja:'電流と磁場の両方に垂直な方向の電圧を観察します。',zh:'观察同时垂直于电流和磁场方向的电压。'},
 '02 - 교류 인가':{en:'02 — AC application',ja:'02 — 交流印加',zh:'02 — 施加交流电'},
 '작동 유체 관 벽의 열로 가열됨':{en:'Working fluid: heated by the tube wall',ja:'作動流体：管壁の熱で加熱',zh:'工作流体：由管壁传热加热'},
 '전자 사태':{en:'Electron avalanche',ja:'電子なだれ',zh:'电子雪崩'},
 '04 - 수중 전파':{en:'04 — Underwater propagation',ja:'04 — 水中伝搬',zh:'04 — 水中传播'},
 '슬릿 파원':{en:'Slit wave source',ja:'スリットの波源',zh:'狭缝波源'},
 '유전체 전체가, 하나의 방향을가집니다.':{en:'The dielectric develops an overall polarization direction.',ja:'誘電体全体の分極方向がそろいます。',zh:'电介质整体形成一致的极化方向。'},
 '05- 응고 비드':{en:'05 — Solidified bead',ja:'05 — 凝固ビード',zh:'05 — 凝固焊道'},
 '퍼지면서, 두 재료를 연결합니다.':{en:'As the solder spreads, it joins the two materials.',ja:'はんだが広がり、二つの材料をつなぎます。',zh:'钎料铺展，将两种材料连接起来。'},
 '전용 솔더가 접합 계면에 퍼집니다.':{en:'The specialized solder spreads across the joining interface.',ja:'専用のはんだが接合界面に広がります。',zh:'专用钎料在接合界面铺展。'},
 '재료 전체가, 빠르고 고르게 데워집니다.':{en:'The entire material heats quickly and evenly.',ja:'材料全体が速く均一に温まります。',zh:'整个材料快速均匀升温。'},
 '자':{en:'Ruler',ja:'定規',zh:'直尺'},
 '변경 후':{en:'After modification',ja:'変更後',zh:'更改后'},
 '해결 방법':{en:'Solution',ja:'解決方法',zh:'解决方法'},
 '전기분해 / Cavitation 등에':{en:'Electrolysis / cavitation:',ja:'電気分解・キャビテーション等で',zh:'电解／空化等产生的'},
 '의한 가스나 증기 거품':{en:'gas or vapor bubbles',ja:'生じる気体・蒸気の泡',zh:'气体或蒸气泡'},
 '전기장 형성 재료 내부로 전달':{en:'Electric field forms and penetrates the material',ja:'電場を形成し、材料内部へ伝達',zh:'形成电场并传入材料内部'},
 '지식 카드':{en:'KNOWLEDGE DECK',ja:'知識カード',zh:'知识卡片'},
 '기존 사례':{en:'Original example',ja:'既存の事例',zh:'原有案例'},
 '적용 예시':{en:'Application examples',ja:'適用例',zh:'应用示例'},
 '효과 라이브러리':{en:'EFFECT LIBRARY',ja:'効果ライブラリ',zh:'效应库'},
 '솔더링 팁':{en:'Soldering tip',ja:'こて先',zh:'焊头'},
 '용융 솔더':{en:'Molten solder',ja:'溶融はんだ',zh:'熔融钎料'},
 '쌍극자':{en:'Dipole',ja:'双極子',zh:'偶极子'},
 '로런츠 힘':{en:'Lorentz force',ja:'ローレンツ力',zh:'洛伦兹力'},
 '핵심 원리':{en:'Key principle',ja:'核心原理',zh:'核心原理'},
 '압력파 압축 • 팽창':{en:'Pressure wave: compression / rarefaction',ja:'圧力波：圧縮・膨張',zh:'压力波：压缩／稀疏'},
 '진동자 초음파 진동':{en:'Transducer: ultrasonic vibration',ja:'振動子：超音波振動',zh:'换能器：超声振动'},
 '초음파 혼이 진동합니다.':{en:'The ultrasonic horn vibrates.',ja:'超音波ホーンが振動します。',zh:'超声变幅杆产生振动。'},
 '덮기':{en:'Cover',ja:'覆う',zh:'覆盖'},
 '분말형 화물 위에 얇은 막을 씌웁니다.':{en:'Cover the powder cargo with a thin membrane.',ja:'粉体貨物を薄い膜で覆います。',zh:'用薄膜覆盖粉状货物。'},
 '공기 빼기':{en:'Remove air',ja:'空気を抜く',zh:'抽出空气'},
 '진공 펌프로 막 아래의 공기를 빼냅니다.':{en:'Use a vacuum pump to remove air beneath the membrane.',ja:'真空ポンプで膜の下の空気を抜きます。',zh:'使用真空泵抽出薄膜下方的空气。'},
 '고정하기':{en:'Secure',ja:'固定する',zh:'固定'},
 '바깥 공기의 압력이 막을 화물에 밀착시켜 고정합니다.':{en:'Outside air pressure presses the membrane against the cargo to secure it.',ja:'外気の圧力が膜を貨物に密着させ、固定します。',zh:'外部气压使薄膜紧贴货物，将其固定。'},
 '초과되는 장은 물질로 제거하고, 초과되는 물질은 장으로 제거함':{en:'Remove an excess field using a substance, and remove excess substance using a field.',ja:'過剰な場は物質で除去し、過剰な物質は場で除去します。',zh:'用物质消除过量的场，用场去除过量的物质。'},
});
const dictionary={...input.dictionary};
for(const [s,value] of Object.entries(complete))dictionary[s]={...dictionary[s],...value};
const localized=s=>{
 const row={ko:s,...dictionary[s]};
 for(const l of ['en','ja','zh'])if(!row[l]||/[가-힣]/.test(row[l]))throw Error('Missing or mixed translation '+l+': '+s);
 return row;
};
for(const s of input.missing)localized(s);
const overlay=entry=>entry.labels.map(l=>({x:l.x,y:l.y,width:l.width,height:l.height,fontHeight:l.fontHeight,text:localized(l.text)}));
const panels=Object.fromEntries(Object.entries(input.panels).map(([name,entry])=>[name,overlay(entry)]));
const illustrations=Object.fromEntries(Object.entries(input.illustrations).map(([name,entry])=>[name,overlay(entry)]));
const output={'src/locales/complete.json':complete,'src/data/effectExplanationLabels.json':panels,'src/data/artworkTextOverlays.json':illustrations};
if(process.argv.includes('--count')){console.log(JSON.stringify(Object.fromEntries(Object.entries(output).map(([file,data])=>[file,Object.keys(data).length]))));process.exit(0);}
const fileArg=process.argv.indexOf('--file');
if(fileArg>=0){
 const file=process.argv[fileArg+1],part=Number(process.argv[process.argv.indexOf('--part')+1]);
 const chunk=process.argv.includes('--small')?5:20;
 const entries=Object.entries(output[file]).slice(part*chunk,(part+1)*chunk);
 if(!entries.length)throw Error('Empty patch');
 const lines=entries.map(([k,v],i)=>(part||i?',':'')+JSON.stringify(k)+':'+JSON.stringify(v));
 const old=fs.readFileSync(file,'utf8').trim();
 if(process.argv.includes('--refresh')){
  let patch='';
  const added=[];
  for(const [k,v] of entries){const key=JSON.stringify(k)+':';const before=old.split('\n').find(line=>line.startsWith(key)||line.startsWith(','+key));if(!before){added.push(','+key+JSON.stringify(v));continue;}const after=(before.startsWith(',')?',':'')+key+JSON.stringify(v);if(before!==after)patch+='@@\n-'+before+'\n+'+after+'\n';}
  if(added.length)patch+='@@\n-}\n'+added.map(l=>'+'+l).join('\n')+'\n+}\n';
  console.log(patch?'*** Begin Patch\n*** Update File: '+process.cwd()+'/'+file+'\n'+patch+'*** End Patch':'UNCHANGED');process.exit(0);
 }
 const patch=old==='{}'?'@@\n-{}\n+{\n'+lines.map(l=>'+'+l).join('\n')+'\n+}':'@@\n-}\n'+lines.map(l=>'+'+l).join('\n')+'\n+}';
 console.log('*** Begin Patch\n*** Update File: '+process.cwd()+'/'+file+'\n'+patch+'\n*** End Patch');process.exit(0);
}
let patch='*** Begin Patch\n';
for(const [path,value] of Object.entries(output)){
 const old=fs.readFileSync(path,'utf8').trimEnd(),next=JSON.stringify(value,null,2);
 patch+='*** Update File: '+process.cwd()+'/'+path+'\n@@\n'+old.split('\n').map(l=>'-'+l).join('\n')+'\n'+next.split('\n').map(l=>'+'+l).join('\n')+'\n';
}
console.log(patch+'*** End Patch');
