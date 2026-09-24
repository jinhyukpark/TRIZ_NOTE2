# Image-label localization — 2026-09-22

## Implementation

Native images use one shared text-free bitmap plus React Native Text overlays selected by the app locale (ko/en/ja/zh). Inline and zoomed views share LocalizedArtwork.tsx. Coordinates use the actual aspect-fit image rectangle, not the frame. Screen-reader text includes translated labels.

## Coverage

- 40 inventive-principle diagrams: four-language label metadata and cleaned backgrounds installed.
- Four physical-contradiction diagrams: installed and connected.
- Five ultrasonic-soldering stages: installed and connected.
- Nine system-evolution diagrams: four-language label metadata and cleaned backgrounds installed.
- 138 standard-solution illustrations: NOT converted yet. Existing originals remain visible. Do not describe whole-library localization as complete.
- Text-free icon thumbnails need no text-layer conversion.

## Assets and provenance

Original files are preserved in assets/content/illustrations, advanced and effects. Edited copies are in assets/content/localized. Tool: built-in image_gen.imagegen, edit mode with referenced_image_paths (imagegen skill). No external image-edit API or Python image processing.

Main exact editing prompt:

> Edit the supplied diagram by removing ONLY the Korean explanatory text and all other lettering. Reconstruct background seamlessly where letters were. Preserve original full canvas, exact object geometry, people, camera, lighting, colors, arrows, leader lines, endpoints and underlines; no new content, no cropping, no redesign. Leave label spaces blank for a separate app text layer. Output same aspect ratio as input.

Principle 38 additionally requested preservation of O3 chemical symbols. Initial physical/Effects edits used equivalent preserve-composition/remove-lettering instructions. AI retouching can subtly alter texture; these are not claimed to be pixel-identical outside lettering.

## Verification

Final checkpoint: 58 edited backgrounds registered; TypeScript and all 27 tests pass. Expo export produced both iOS and Android Hermes bundles successfully. This is bundle verification, not a signed store build or Android device visual test.

TypeScript and existing 25 tests passed before the final batch. New tests verify 39 principle metadata entries, all locale strings, canvas bounds, label fit and shared zoom rendering. Principle 30 and the physical/Effects overlays are manually positioned. English Effects and Japanese Effects at 2× were visually checked on iOS simulator; Korean locale restored afterward. Full Android visual QA and per-diagram per-language inspection remain outstanding.
