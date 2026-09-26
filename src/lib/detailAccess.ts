export const detailAccessCopy = {
 ko:{title:'유료 구독이 필요합니다',message:'콘텐츠 상세는 유료 구독 후 이용할 수 있습니다. 지금 구독 화면으로 이동하시겠어요?',cancel:'나중에',subscribe:'구독하기',error:'구독 상태를 확인하지 못했습니다. 인터넷 연결을 확인한 후 다시 시도해 주세요.'},
 en:{title:'Subscription required',message:'A paid subscription is required to view content details. Open the subscription screen now?',cancel:'Not now',subscribe:'Subscribe',error:'Unable to verify your subscription. Check your connection and try again.'},
 ja:{title:'有料購読が必要です',message:'コンテンツの詳細は有料購読後にご利用いただけます。購読画面を開きますか？',cancel:'後で',subscribe:'購読する',error:'購読状況を確認できませんでした。接続を確認して再度お試しください。'},
 zh:{title:'需要付费订阅',message:'订阅后即可查看内容详情。现在前往订阅页面吗？',cancel:'稍后',subscribe:'立即订阅',error:'无法确认订阅状态，请检查网络连接后重试。'},
};

// Only a successful, current entitlement check may open protected content.
export async function checkDetailAccess(check:()=>Promise<boolean>,open:()=>void,blocked:(error:boolean)=>void,isCurrent:()=>boolean){
 try{const active=await check();if(isCurrent()){if(active)open();else blocked(false);}}
 catch{if(isCurrent())blocked(true);}
}
