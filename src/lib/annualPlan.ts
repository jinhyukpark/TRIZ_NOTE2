import type {ProductOrSubscription} from 'expo-iap';
// A displayed annual price must match the exact offer passed to the purchase sheet.
export function annualPlan(p:ProductOrSubscription,expectedId:string,basePlan:string){
 if(!expectedId||p.id!==expectedId||p.type!=='subs')return null;
 if(p.platform==='ios'){
  if(p.typeIOS!=='auto-renewable-subscription'||p.subscriptionPeriodUnitIOS!=='year'||Number(p.subscriptionPeriodNumberIOS)!==1||Number(p.introductoryPriceNumberOfPeriodsIOS)>0)return null;
  return p.displayPrice?{price:p.displayPrice,token:null}:null;
 }
 if(!basePlan)return null;
 const offer=p.subscriptionOffers?.find(o=>o.basePlanIdAndroid===basePlan&&o.offerTokenAndroid&&o.pricingPhasesAndroid?.pricingPhaseList.length===1&&o.pricingPhasesAndroid.pricingPhaseList[0].billingPeriod==='P1Y'&&o.pricingPhasesAndroid.pricingPhaseList[0].recurrenceMode===1);
 const phase=offer?.pricingPhasesAndroid?.pricingPhaseList[0];
 return offer&&phase?.formattedPrice?{price:phase.formattedPrice,token:offer.offerTokenAndroid}:null;
}
