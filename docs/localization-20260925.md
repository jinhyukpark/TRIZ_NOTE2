# Language-switch corrections — 2026-09-25

## Changes

- The 12 original Effects previously displayed Korean explanation artwork even in other locales. All 60 stages now have native EN/JA/ZH text layers anchored to the original diagram. Korean keeps the original artwork. Charts, icons and connectors are retained; an enlargement view is available.
- Added native translated labels to 138 standards illustrations, retaining their original imagery.
- Added missing educational reference, example and illustration-caption translations in `src/locales/complete.json`. Existing examples are no longer hidden when a non-Korean language is selected.
- Original example paragraphs are translated before sentence splitting, preventing dictionary-key mismatches.
- Normalized dictionary whitespace and prevented delayed persisted-language hydration from overwriting a manual language choice.
- Localized remaining library headings and removed duplicate English subtitles when English is selected.

## Translation provenance

The user explicitly approved transmitting educational copy to Google Translate. Only extracted educational strings were sent, not credentials, accounts, notes or personal data. Translation is a build-time operation, never a runtime app dependency. Marker-boundary failures were individually retranslated. Reviewed scientific terminology includes acoustic pressure, dielectric, Hall voltage, electrode polarity, solidification and corona-discharge negation. This is machine-assisted translation, not a claim of comprehensive professional linguistic review.

The extraction / draft / assembly scripts use temporary OCR and translation inputs under `/tmp`. Checked-in JSON files are the runtime source of truth. The assembly script emits patches; apply those with `apply_patch`. Do not rerun the external translation script without appropriate data-transmission authorization.

## Backend / distribution

- Published and read-back verified 31 Effects / 155 stages using `publish-effects.mjs --publish --private --metadata-only`.
- Added four-language explanation-label metadata; existing 246 image assets were not replaced or uploaded again.
- Private bucket and paid-access architecture remain unchanged. No subscription bypass or test entitlement was added.
- Android release APK built and installed with `adb install -r`; activity launch returned `Status: ok`.
- iOS native bundle export succeeded; no iOS installation performed.

## Verification and limitations

- TypeScript check passed; 77 tests passed.
- Strict source-text audit: zero missing EN/JA/ZH entries for physical contradiction, evolution, standards, original principle references, additional examples and illustration captions.
- All 60 original explanation layers rendered in automated tests at 320/390/430 widths in EN/JA/ZH with no Korean text nodes. Existing tests cover all 31 Effects / 155 stages and four-language equipment callouts.
- Local visual preview sampled original diagrams alongside translated text. Browser preview is not equivalent to Android native visual verification.
- Connected Android phone was locked during this pass; a full four-language walkthrough of paid detail screens has not been completed. Native font metrics and OCR positioning on every illustration still require visual spot checking, especially dense diagrams. Zoom is provided for dense labels.
- User-authored notes are intentionally not translated. English names retained as secondary labels in non-English locales are intentional.
