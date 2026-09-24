# Effects equipment callouts — full mobile rollout

## Scope

- All 14 list cards: retain landscape 16:9 featured images and localized names. The original 12 bitmaps already contain leader lines/points; these were visually inspected and retained without drawing duplicate lines. Their native names now wrap above the existing line instead of shrinking inside a fixed-height text box.
- Skin depth and Hydrogenation list cards use native leader lines/points and localized names through the shared renderer.
- All 14 mobile detail pages / 70 stages: replace black numbered badges with native names above a horizontal line, a leader segment, and a small lime point on the apparatus. Image and explanation assets are unchanged.
- All 70 stage layouts have explicit text positions and separate target positions in `src/data/effectCallouts.ts`. Points were measured against the currently referenced portrait version, not old unused files.
- Missing English subtitles in the two scientific hero renderers were added below the current-language title. English locale omits the extra subtitle.

## Files

- `src/EquipmentCallout.tsx`: shared native line geometry and readable, unboxed translated names.
- `src/data/effectCallouts.ts`: 70 stage layouts, including different camera/tool positions.
- `src/EffectArtwork.tsx`: 60 original mobile stages.
- `src/ScientificEffectArtwork.tsx`: 10 scientific stages; role descriptions remain accessible and in the text below the diagrams.
- `src/EffectFeatured.tsx`: distinguish baked leaders from dynamic leaders; never duplicate them.
- `tests/effect-callouts.test.mjs`: full-catalog rendering and geometry regression tests.

## Verification

- Inspected all 70 referenced portrait bitmaps and all 14 featured images.
- Visually reviewed Korean overlay previews for all 70 stages and 14 cards. These are diagnostic raster previews of the source images plus coordinate data, not simulator screenshots. Corrected Hall element/current-source endpoints, dielectric coil endpoints, corona ring/needle endpoints, a shape-memory label overlap, and soldering wire/nozzle endpoints after review.
- Automated render checks: 70 stages × 4 locales × 3 widths (320/390/430pt), plus all 14 list cards × 4 locales. Validate translation presence, target count, bounds, contained images, fixed list ratio, no double leaders, and calculated endpoint accuracy for the real image ratio.
- TypeScript, all 49 tests, iOS export, and whitespace checks passed.
- iPhone 16e simulator: inspected soldering stages 1 and 5 and hydrogenation stage 1 with native callouts. All 70 stages and all languages were not individually opened in the simulator.

## Boundaries

- The original 12 list images intentionally retain their baked-in line geometry; only the names are dynamic. Their image files were not regenerated.
- Existing original explanation diagrams are preserved. This change does not claim to resolve their pre-existing Korean-bitmap localization limitations.
- The original wide/tablet fallback layout (700pt and wider) is outside this mobile portrait rollout.
