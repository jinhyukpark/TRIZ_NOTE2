# Remaining Effects portrait rollout

Mode: built-in image generation tool, image-edit mode with each existing cleaned poster as reference. No original source posters were replaced. Each effect retains its own equipment design. Explanations use the original right panel, including diagrams and charts, not generic native flow replacements.

## Edit prompt

Use case: precise-object-edit. Edit target: supplied existing scientific effect poster. Recompose ONLY its LEFT apparatus illustration into a 4:5 PORTRAIT mobile illustration. Preserve its exact original equipment design, materials, colors, camera character, scientific components and stage-specific phenomena. Do NOT substitute a generic machine or unify the design with other equipment. Preserve field lines, particles, heat, cutaways or light paths where present in this stage. Remove ALL titles, breadcrumbs, text, numbers, equipment label leader lines, timelines, frame borders and the entire RIGHT explanation panel. Keep the complete important apparatus visible with generous dark background above (top 18% clear for native title), no cropped machinery. Fit apparatus in middle/lower portrait, retaining original relative geometry. No text or UI labels in bitmap. Scientific plus/minus symbols may remain. The result is just the original apparatus faithfully reframed as a portrait.

For Hall effect, heat pipe and diffraction, a retry explicitly required portrait 4:5 rather than the original landscape poster. Arc welding additionally preserves stage-specific arc/molten pool/bead with no arc at steps 1 and 5.

## Saved assets

- `dielectric-heating-01-portrait-v2.png` — reference `01_sample_placement-clean-v2.png`
- `dielectric-heating-02-portrait-v2.png` — reference `02_high_frequency_field-clean-v2.png`
- `dielectric-heating-03-portrait-v2.png` — reference `03_dipole_rotation-clean-v2.png`
- `dielectric-heating-04-portrait-v2.png` — reference `04_internal_heating-clean-v2.png`
- `dielectric-heating-05-portrait-v2.png` — reference `05_uniform_heating-clean-v2.png`
- `hall-effect-01-portrait-v2.png` — reference `01_sample_setup-clean-v2.png`
- `hall-effect-02-portrait-v2.png` — reference `02_current_input-clean-v2.png`
- `hall-effect-03-portrait-v2.png` — reference `03_magnetic_field-clean-v2.png`
- `hall-effect-04-portrait-v2.png` — reference `04_charge_deflection-clean-v2.png`
- `hall-effect-05-portrait-v2.png` — reference `05_hall_voltage-clean-v2.png`
- `heat-pipe-01-portrait-v2.png` — reference `01_working_fluid-clean-v2.png`
- `heat-pipe-02-portrait-v2.png` — reference `02_heat_input-clean-v2.png`
- `heat-pipe-03-portrait-v2.png` — reference `03_evaporation-clean-v2.png`
- `heat-pipe-04-portrait-v2.png` — reference `04_vapor_transport-clean-v2.png`
- `heat-pipe-05-portrait-v2.png` — reference `05_condense_return-clean-v2.png`
- `light-diffraction-01-portrait-v2.png` — reference `01_light_alignment-clean-v2.png`
- `light-diffraction-02-portrait-v2.png` — reference `02_plane_wave-clean-v2.png`
- `light-diffraction-03-portrait-v2.png` — reference `03_slit_passage-clean-v2.png`
- `light-diffraction-04-portrait-v2.png` — reference `04_wavefront_spreading-clean-v2.png`
- `light-diffraction-05-portrait-v2.png` — reference `05_diffraction_pattern-clean-v2.png`
- `polarisation-01-portrait-v2.png` — reference `01_random-clean-v2.png`
- `polarisation-02-portrait-v2.png` — reference `02_field-clean-v2.png`
- `polarisation-03-portrait-v2.png` — reference `03_alignment-clean-v2.png`
- `polarisation-04-portrait-v2.png` — reference `04_induced_charge-clean-v2.png`
- `polarisation-05-portrait-v2.png` — reference `05_polarised-clean-v2.png`
- `shape-memory-alloy-01-portrait-v2.png` — reference `01_deformation-clean-v2.png`
- `shape-memory-alloy-02-portrait-v2.png` — reference `02_heating-clean-v2.png`
- `shape-memory-alloy-03-portrait-v2.png` — reference `03_phase_transition-clean-v2.png`
- `shape-memory-alloy-04-portrait-v2.png` — reference `04_recovery-clean-v2.png`
- `shape-memory-alloy-05-portrait-v2.png` — reference `05_cooling-clean-v2.png`
- `skin-effect-01-portrait-v2.png` — reference `01_conductor_setup-clean-v2.png`
- `skin-effect-02-portrait-v2.png` — reference `02_ac_input-clean-v2.png`
- `skin-effect-03-portrait-v2.png` — reference `03_changing_field-clean-v2.png`
- `skin-effect-04-portrait-v2.png` — reference `04_induced_opposition-clean-v2.png`
- `skin-effect-05-portrait-v2.png` — reference `05_surface_concentration-clean-v2.png`
- `ultrasonic-01-portrait-v2.png` — reference `01_signal_setup-clean-v2.png`
- `ultrasonic-02-portrait-v2.png` — reference `02_piezo_conversion-clean-v2.png`
- `ultrasonic-03-portrait-v2.png` — reference `03_horn_vibration-clean-v2.png`
- `ultrasonic-04-portrait-v2.png` — reference `04_underwater_propagation-clean-v2.png`
- `ultrasonic-05-portrait-v2.png` — reference `05_target_interaction-clean-v2.png`
- `arc-welding-01-portrait-v2.png` — reference `01_alignment-clean-v2.png`
- `arc-welding-02-portrait-v2.png` — reference `02_arc_ignition-clean-v2.png`
- `arc-welding-03-portrait-v2.png` — reference `03_molten_pool-clean-v2.png`
- `arc-welding-04-portrait-v2.png` — reference `04_fusion-clean-v2.png`
- `arc-welding-05-portrait-v2.png` — reference `05_solidified_bead-clean-v2.png`

## Integration

`src/data/remainingEffectPortraits.ts` provides static Metro imports, per-equipment native labels in Korean, English, Japanese and Chinese and explanation-panel boundaries. `src/EffectArtwork.tsx` renders proportional full-width contained images, localized upper-left title/stage and tags, native timeline, divider and original explanation artwork. The explanation bitmap remains Korean; other locales retain the original diagram plus localized explanatory text below, matching the existing pilot implementation.

