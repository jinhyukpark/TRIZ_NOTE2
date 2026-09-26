# Google login

Configured on 2026-09-26.

- Google Cloud project: `triznote2`
- OAuth client: `TRIZ Note Supabase Auth` (Web application)
- Supabase project: `sovzalkrotgvnqvpfkjd` (TrizNote2)
- Google authorized redirect: `https://sovzalkrotgvnqvpfkjd.supabase.co/auth/v1/callback`
- Supabase redirect allow list: `triznote://auth/callback`
- Google provider enabled. Client secret stored only in Supabase provider settings, not in app assets or environment variables.
- Existing app flow: system browser → Supabase Google OAuth → app deep link → PKCE code exchange. Existing email login and subscription authorization remain unchanged.

## Release limitation

Google consent is currently External / Testing. The existing test-user list applies. Public publishing remains pending Google branding configuration; this setup did not publish the consent screen or broaden the test-user list.

## Verification

The installed iOS simulator app reached the Google account login page successfully. After the user completed Google authentication, the app returned to Home and displayed the signed-in account in Settings. Terminating and relaunching the app preserved the same account session. The Google account correctly remained without an active subscription; no entitlement override was added. TypeScript checking and all 79 tests passed. No Android build was performed.

References: https://supabase.com/docs/guides/auth/social-login/auth-google and https://docs.expo.dev/versions/v57.0.0/sdk/webbrowser/
