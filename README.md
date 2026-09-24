# TRIZ Note — React Native
Active iOS/Android application. The sibling `triz-note-next` is the preserved web/Capacitor predecessor.

## What is native
React Native 0.86.3 / Expo SDK 57 render native views through Fabric/Hermes.
No WebView is used to render any app screen. Expo is build tooling/native modules, not a hosted website.
Production bundles include content and 3D diagrams and do not require localhost:5188 or Metro.
Minimum baseline: iOS 16.4, Android 7/API 24. Android target API 36.
Bundle/package identifier: `com.triznote.app`. URL scheme: `triznote`.

## Implemented
- Native home, 40 principles icon/card views, search, details, 3D diagram enlargement.
- Four UI languages and existing translated principle summaries.
- Physical contradictions, 76 standards, system evolution, 39x39 matrix.
- Advanced original content/image text remains Korean, as in the predecessor (explicit UI notice).
- Email/password login, signup, password recovery, PKCE callback.
- Sessions in iOS Keychain/Android encrypted SecureStore; foreground token refresh.
- Supabase bookmarks, learning completion, notes. Guest reading available; account needed to save.
- Local language/view preferences; these preferences are not yet synced across devices.
- Native StoreKit/Play Billing purchase and restore adapter; fail-closed server receipt verification.

## Supabase — actually deployed
Project: TrizNote2 / `sovzalkrotgvnqvpfkjd` (Seoul).
`.env.local` contains only its public URL + publishable client key.
Tables: profiles, bookmarks, learning_progress, notes, store_products, purchase_records, entitlements.
All seven tables have RLS. Account records are own-row only. Client purchase/entitlement writes are denied.
`commit_verified_purchase` is an atomic SECURITY INVOKER function callable only by service_role.
Migration source is under `supabase/migrations`; both migrations have been applied remotely.
`verify-purchase` Edge Function is deployed. It authenticates every request with Auth.getUser.
Gateway verify_jwt is false because the function explicitly verifies current signing-key JWTs itself; this is NOT an unauthenticated purchase endpoint.
No secret/service_role/store credential is in the app.

### Still required for email verification/recovery
Supabase Dashboard → Authentication → URL Configuration → Redirect URLs:
`triznote://auth/callback`
The dashboard required the owner's login during setup, so this allowlist change was NOT applied.
Email/password provider and signup enabled were verified via the live Auth API.
Actual signup-mail-confirmation-signin/recovery roundtrip still needs a real test mailbox.
Configure production SMTP/delivery and test links on the same device that initiated PKCE.
Do not disable email confirmation to bypass testing.
Apple/Google social sign-in is not implemented/enabled; email/password is the current working implementation.

## Run/build
```sh
npm ci
npm run assets
npm run typecheck
npm test
npx expo prebuild --no-install
cd ios && pod install && cd ..
npm run ios
npm run android
```
Use native builds, not Expo Go, for IAP. There is no web preview command in this native project.
Local release Android build:
```sh
cd android
ANDROID_HOME=/Users/devdevil0625/Library/Android/sdk NODE_ENV=production ./gradlew '-Dorg.gradle.java.home=/Applications/Android Studio.app/Contents/jbr/Contents/Home' :app:assembleRelease
```
Local iOS simulator release:
```sh
NODE_ENV=production xcodebuild -workspace ios/TRIZNote.xcworkspace -scheme TRIZNote -configuration Release -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' -derivedDataPath build/ios CODE_SIGNING_ALLOWED=NO build
```
Generated native folders are reproducible from app.json and ignored by git; Podfile.lock is currently local.
The generated Android release uses the template DEBUG signing key: for local testing only, NOT Play upload.
An unsigned simulator .app is NOT an installable iPhone IPA. Real devices/store distribution require signing teams/credentials.
Template app icons remain placeholders until a final app-brand icon is chosen.

## Billing status — not ready for live sales
Two gates default OFF: app `EXPO_PUBLIC_IAP_ENABLED` and Edge Function `BILLING_ENABLED`.
The product catalog is deliberately empty. No pricing/paywall/product scope was invented.
The current UI cannot charge anyone.
No external paid billing service/RevenueCat account was created.

Before enabling:
1. Owner decides premium features and subscription vs non-consumable products/prices.
2. Create products in App Store Connect/Google Play Console for com.triznote.app; add matching active store_products rows.
3. Configure Edge secrets (never EXPO_PUBLIC):
   - APPLE_ENVIRONMENT=Sandbox or Production (explicit, no automatic sandbox fallback)
   - APPLE_BUNDLE_ID, APPLE_ISSUER_ID, APPLE_KEY_ID, APPLE_PRIVATE_KEY
   - GOOGLE_PACKAGE_NAME, GOOGLE_SERVICE_ACCOUNT_JSON (Android Publisher permission)
4. Complete lifecycle integration: App Store Server Notifications V2 and Google RTDN/voided purchase reconciliation.
   Current verification runs on purchase/restore only. Revocations/renewals while app is closed are NOT yet reconciled.
   Therefore entitlements are currently a purchase/restore snapshot, not production authorization for premium content.
5. Add the decided premium feature gates to server-authorized resources. No existing content has been paywalled.
6. Add required subscription disclosures, privacy/terms links, subscription management and account deletion flow for release.
7. Test real store sandbox: success/cancel/pending/restore/reinstall/renewal/expiry/refund/cross-account replay.
8. Only then enable both gates and rebuild for distribution.

Server implementation fetches authoritative Apple transaction data over authenticated TLS / Google Android Publisher data.
It checks product allowlist, bundle/package, purchase type, and the store-provided app account identifier against Supabase user UUID.
Client-side purchase success never grants access. Transactions are finished only after successful server commit.
Subscription expiry is stored; any future premium authorization MUST also check active, expiry, and verification freshness.
Store keys are absent; no real store transaction has been verified in this session.

## Verified 2026-09-21
- TypeScript check and 5 structural/content tests passed.
- Both platform Hermes exports, 232 image assets bundled.
- Android assembleRelease successful.
- iOS Release simulator Xcode build successful (code signing disabled).
- Live Auth settings: HTTP 200, email login and signup enabled.
- Anonymous bookmark query: HTTP 401. Unauthenticated verify-purchase: HTTP 401.
- Rollback-only DB test: own-row read/write pass, cross-user write denied, client entitlement/RPC write denied.
- Supabase security advisor: no warnings.
- Native simulator interaction and real account login roundtrip have not yet been performed.
- npm audit: 0 vulnerabilities after a scoped xcode → uuid 11.1.1 override.
  Xcode parser/UUID generation and Expo config validation passed with the override.

## References
- https://docs.expo.dev/versions/latest/
- https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native
- https://supabase.com/docs/guides/auth/native-mobile-deep-linking
- https://www.openiap.dev/docs/setup/expo
- https://developer.android.com/google/play/billing/security
