# TRIZ Note public pages

Run `node build.mjs` to generate Korean/English HTML. Source content is in `build.mjs`; styling is in `public/style.css`. No frontend framework, analytics, cookies or authentication is required.

Confirmed operator: TeraGraph. Contact: manager@teragraph.io.

Reference for structure only: https://api.plantalk.io/legal/terms.html. PlanTalk's social features and policies were not copied.

## Publication status

Published policy assumptions confirmed for this release:

- Supabase project data is hosted in `ap-northeast-2` (Seoul).
- Security/troubleshooting logs: up to 90 days; rotating backups: ordinarily up to 30 days; support correspondence: up to three years after resolution.
- The service is not designed for children under 14.
- Effective date: 2026-09-26.

These pages describe the implemented service and operational policy but are not a substitute for review by qualified legal counsel.

Google-only in-app deletion currently falls through to password reauthentication; support email is provided as an alternative, not a claim that this flow is fixed.

Deploy only this `public` directory using Firebase Hosting. Never deploy the mobile repository root or `.env` files. Confirm the live Hosting URL before changing app or Google OAuth configuration.
