// Public URLs only. No server secrets belong in EXPO_PUBLIC variables.
export const releaseConfig={
 website:process.env.EXPO_PUBLIC_WEBSITE_URL||'https://triznote2.web.app/',
 privacy:process.env.EXPO_PUBLIC_PRIVACY_URL||'https://triznote2.web.app/privacy.html',
 terms:process.env.EXPO_PUBLIC_TERMS_URL||'https://triznote2.web.app/terms.html',
 support:process.env.EXPO_PUBLIC_SUPPORT_URL||'https://triznote2.web.app/support.html',
 deletion:process.env.EXPO_PUBLIC_ACCOUNT_DELETION_URL||'https://triznote2.web.app/deletion.html',
 appleLogin:process.env.EXPO_PUBLIC_APPLE_AUTH_ENABLED==='true',
 appleAnnual:process.env.EXPO_PUBLIC_APPLE_ANNUAL_PRODUCT_ID??'',
 googleAnnual:process.env.EXPO_PUBLIC_GOOGLE_ANNUAL_PRODUCT_ID??'triznote_annual',
 googleBasePlan:process.env.EXPO_PUBLIC_GOOGLE_ANNUAL_BASE_PLAN_ID??'annual',
};
export function isPublicHttps(value:string){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password&&!['localhost','127.0.0.1'].includes(u.hostname);}catch{return false;}}
