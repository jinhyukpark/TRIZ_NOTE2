# Baked-in process and helper-copy removal

All 12 Effects, steps 01–05 (60 detail images), use sibling `*-clean-v2.png` assets in this directory. Originals and the earlier `*-no-process.png` pass are retained for recovery. The versioned name prevents Metro/iOS from reusing a cached bitmap that still contains the close icon. EffectArtwork prefers the cleaned bitmap; the mobile native process layout remains below the full apparatus image.

Edited with the built-in image generation tool following the imagegen skill, not cropping or a UI mask. All 60 cleaned assets remove the bottom-left timeline, the right-panel close icon, concept-visualization footers, and redundant helper/disclaimer copy. Apparatus, component callouts, process diagram, main explanation, and core-principle copy are retained. A regression test checks that every step has its cleaned file registered in the static asset map.

Series: ultrasonic soldering, acoustic cavitation, corona discharge, dielectric heating, Hall effect, heat pipe, light diffraction, polarisation, shape memory, skin effect, ultrasonic waves, and arc welding.

The final soldering source also contained a video-player bar at the bottom; that bar was removed as part of background restoration. These are generative edits, not pixel-identical reproductions outside the edited region. No simulator verification was performed for this asset update.

## Prompt

Use case: precise-object-edit. Input is the exact edit target scientific poster. Erase ONLY the five-step process timeline at the very bottom of the LEFT apparatus panel: five numbered circles 01–05, Korean process labels and their connecting horizontal lines. Seamlessly inpaint erased pixels with realistic surrounding dark floor/tabletop background and reflections. NO flat rectangle cover, NO cropping. Preserve full landscape canvas dimensions and composition, apparatus, every upper title, component labels and their leader lines, scientific effects and all right-panel text, diagrams, icons and divider unchanged. Do NOT erase the apparatus component callouts. Return the full poster with only its bottom-left small process timeline removed.

Second pass: in the RIGHT explanation panel only, remove the top-right close icon, the `원리 이해를 위한 개념 시각화` footer or equivalent, and redundant helper/disclaimer sentences such as `파동은 개념 표시입니다.` Seamlessly restore the dark panel background. Preserve the main step label, headline, explanation, process diagram, `핵심 원리` heading, and its actual principle sentence.
