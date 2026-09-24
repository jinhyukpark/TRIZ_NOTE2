# Effects list landscape thumbnails

- Dedicated 1672×941 landscape images replace portrait references only in the Skin depth and Hydrogenation list cards.
- `src/EffectFeatured.tsx` keeps every featured frame at 16:9 with `contain`. The existing detail portraits and stage diagrams are unchanged.
- `src/data/featuredEffects.ts` supplies three localized component labels per new thumbnail (Korean, English, Japanese, Chinese). Each name sits above a horizontal leader connected to a small point on the component. Native lines and labels replace the black badges; text wraps without shrinking. Target coordinates scale with the fixed 16:9 canvas.
- Generated assets: `assets/content/effects/featured/skin-depth-v1.png` and `assets/content/effects/featured/hydrogenation-v1.png`.
- Built-in image generation used the original portrait references to recompose whole apparatuses, not crop them. Exact prompts: `effects-featured-landscape-v1.json`.

## Verification

- TypeScript check and all 47 tests passed, including landscape ratios, nonempty labels in four languages, static assets, and preservation of separate detail portraits.
- iOS export succeeded with 494 assets.
- iPhone 16e simulator: both new images and Korean component labels rendered; the Hydrogenation card was visible in full at the intended compact aspect ratio. The Skin depth card was partly above the current scroll viewport. No manual four-language/small-device visual sweep was performed.
