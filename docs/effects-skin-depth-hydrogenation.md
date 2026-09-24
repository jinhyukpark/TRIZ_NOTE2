# New Effects: Skin depth / Hydrogenation

## Scope

Added two independent catalog items with five stages each. Existing `skin-effect` remains unchanged. Hydrogenation is explicitly scoped to catalytic hydrogenation of ethene to ethane; it does not claim to cover all hydrogenation mechanisms.

The supplied videos were identified through public metadata. Their full audiovisual contents/transcripts were not accessible during preparation. The approved five-stage outlines and independently checked scientific principles were used; these pages are not asserted to reproduce the videos scene for scene.

## References

- User video: [Skin depth](https://youtu.be/ZWafy-7oBf4)
- User video: [Hydrogenation](https://youtu.be/WwjP6ibtG6Y)
- [US EPA: Electromagnetic signal attenuation / skin depth](https://www.epa.gov/environmental-geophysics/electromagnetic-signal-attenuation-skin-depth)
- [Ellingson: Skin depth](https://phys.libretexts.org/Bookshelves/Electricity_and_Magnetism/Electromagnetics_II_%28Ellingson%29/03%3A_Wave_Propagation_in_General_Media/3.12%3A_Skin_Depth)
- [OpenStax Organic Chemistry, 8.6: Hydrogenation](https://openstax.org/books/organic-chemistry/pages/8-6-reduction-of-alkenes-hydrogenation)

No textbook graphics or wording were copied. Raster apparatus illustrations are newly generated. Native educational diagrams and copy were authored for this app.

## Implementation

- `src/data/scientificEffects.ts`: ordered stages, titles, detailed explanations and key principles in Korean, English, Japanese and Chinese.
- `src/data/scientificArtwork.ts`: static Metro imports, per-stage tag positions, localized names and roles, diagram captions.
- `src/ScientificEffectArtwork.tsx`: explicit source aspect ratio and contain rendering; title inside image; one native timeline; divider; stage-specific diagrams; localized role details.
- `src/data/effects.ts`: catalog registration.
- `src/data/effectCatalog.ts`: classifications, new chemistry field and chemical-conversion function.
- `src/data/featuredEffects.ts`, `src/data/assets.ts`: list imagery and static asset registration.
- `src/EffectArtwork.tsx`: isolated route for the two new items, leaving prior artwork paths intact.
- `tests/scientific-effects.test.mjs`: images, localization, four widths, ten stages, native rendering and scientific distinctions.

## Artwork

Versioned assets: `assets/content/effects/skin-depth-01-portrait-v1.png` through `skin-depth-05-portrait-v1.png`, and the corresponding `hydrogenation-01` through `hydrogenation-05` files.

Creation mode: built-in image generation, followed by reference-image edits preserving equipment identity. No rasterized explanatory text, tags or timeline. Full prompts are recorded in `effects-science-image-prompts-v1.json`; visual-QA correction prompts are in `effects-science-image-corrections-v1.json`. Corrections fixed surplus hydrogen, ethane valence/atom count, framing, and an unnecessary inset border before the final assets were accepted.

Image generation is used for apparatus/phenomena, while exact chart curves and atom/bond diagrams are native React Native views. Native text reflows with locale; no Korean-only description bitmaps are used in these two new items.

## Scientific constraints

- Skin depth is the 1/e **amplitude** depth, not the power depth or a hard boundary. The equation uses the good-conductor, locally planar approximation. Frequency/permeability/conductivity comparisons hold other properties fixed. Material comparison is conceptual, not a measured material dataset.
- Hydrogenation preserves two carbons and six total hydrogens. Color distinguishes original and added hydrogen, not different elements. The metal surface is a magnified model, not a commercial reactor design. Catalyst sites are reusable in an ideal cycle; deactivation is acknowledged.

## Verification

- `npm run typecheck`: passed.
- `npm test`: 46/46 passed, including ten stages × four languages × widths 320/390/430/768. Checks cover asset existence, distinct content, portrait ratios, explicit contain dimensions, localized copy/tag roles, and a single timeline.
- `npx expo export --platform ios --output-dir /tmp/triz-effects-science-ios-v1`: passed; 1,307 modules, 492 bundled assets.
- `git diff --check`: passed.
- Inspected all ten generated images. Corrected hydrogenation steps 4/5 so carbon/hydrogen counts and C–C bond order match the depicted state. Source originals remain in the generation output folder.
- iPhone 16e / iOS 26.1 simulator: confirmed 14-item library, both new detail screens, images and localized tags; selected hydrogenation stage 3 and confirmed content changed. These were Korean-language spot checks, not exhaustive visual verification of all locale/device combinations.
- Full manual scrolling and four-language platform typography checks were not completed. Automated native-tree tests verify presence/layout contracts, not actual glyph measurement. Maximum accessibility font sizes and physical Android devices have not been visually checked.
- Existing Effects were not migrated or regenerated in this task, including their legacy localized-description limitations.
