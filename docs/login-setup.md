# Mobile login release checklist

The app requires a non-anonymous session before rendering content menus. Email signup/login and password recovery remain available. Google uses the system browser with Supabase PKCE; supported iOS devices show the native Apple sign-in button. Legal/support links and store subscription management remain available before login.

External setup (not completed by this code change):

- Enable Email, Google and Apple providers in the intended Supabase project. Configure email delivery and confirmation.
- Add `triznote://auth/callback` to Supabase's allowed redirect URLs.
- Configure a Google Web OAuth client and its secret in Supabase, with the project's `/auth/v1/callback` HTTPS URL as Google's authorized redirect URI. Never place the client secret in app environment variables.
- Enable Sign in with Apple for `com.triznote.app` and configure the corresponding Apple audience/provider in Supabase. Existing Apple account-deletion/revocation server secrets must also be configured.
- Build a signed iOS development/release binary with the existing `usesAppleSignIn` entitlement and Apple authentication plugin. Apple button availability is device-based, no longer gated by `EXPO_PUBLIC_APPLE_AUTH_ENABLED`.
- Test new/existing users for all three methods, email verification, cancellation, expired session, logout, app restart and callback replay. Confirm no menu content appears before login.
- Check account deletion and store purchase restoration on a real device. UI login gating is not a substitute for server authorization/RLS; this change does not make bundled assets secret.

Apple review notes should explain account-based learning-record/bookmark synchronization. Login-required review eligibility is not guaranteed by adding Apple sign-in.
