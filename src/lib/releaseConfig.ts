// Public URLs only. No server secrets belong in EXPO_PUBLIC variables.
export const releaseConfig={
 website:'https://www.illunex.com',
 privacy:process.env.EXPO_PUBLIC_PRIVACY_URL??'',
 terms:process.env.EXPO_PUBLIC_TERMS_URL??'',
 support:process.env.EXPO_PUBLIC_SUPPORT_URL??'',
 deletion:process.env.EXPO_PUBLIC_ACCOUNT_DELETION_URL??'',
 appleLogin:process.env.EXPO_PUBLIC_APPLE_AUTH_ENABLED==='true',
 appleAnnual:process.env.EXPO_PUBLIC_APPLE_ANNUAL_PRODUCT_ID??'',
 googleAnnual:process.env.EXPO_PUBLIC_GOOGLE_ANNUAL_PRODUCT_ID??'',
 googleBasePlan:process.env.EXPO_PUBLIC_GOOGLE_ANNUAL_BASE_PLAN_ID??'',
};
export function isPublicHttps(value:string){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password&&!['localhost','127.0.0.1'].includes(u.hostname);}catch{return false;}}
