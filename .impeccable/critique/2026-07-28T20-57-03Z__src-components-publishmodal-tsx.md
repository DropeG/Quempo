---
target: src/components/PublishModal.tsx
total_score: 22
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
timestamp: 2026-07-28T20-57-03Z
slug: src-components-publishmodal-tsx
---
# Critique Report: src/components/PublishModal.tsx

Method: dual-agent (A: be6eac19-1eec-40f1-852d-cf739925f229 · B: f1237fbb-14e3-4512-9a42-c1b3cce34816)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | Profile auto-fill occurs silently; submit state lacks inline field validation feedback |
| 2 | Match System / Real World | 3/4 | Excellent domain language (Subida, Bajada, Cadenas, Parrilla, Farellones, etc.) |
| 3 | User Control and Freedom | 2/4 | Close button exists, but missing Escape key close, backdrop click dismiss, and unsaved changes confirmation |
| 4 | Consistency and Standards | 2/4 | Subida/Bajada toggle flips DOM positions causing visual re-ordering |
| 5 | Error Prevention | 2/4 | Date picker allows selecting past dates; phone number format not validated inline |
| 6 | Recognition Rather Than Recall | 2/4 | No quick-select presets for common pickup points in Santiago (Cantagallo, Mall Sport) |
| 7 | Flexibility and Efficiency | 2/4 | High typing friction on mobile; no location presets or keyboard shortcuts |
| 8 | Aesthetic and Minimalist Design | 3/4 | Clean Alpine Frost glass aesthetic, though form layout feels dense on mobile |
| 9 | Error Recovery | 2/4 | Generic red error alert at top of form without field auto-focus |
| 10 | Help and Documentation | 2/4 | Short helper text for Instagram, but missing price guidance and mountain safety context |
| **Total** | | **22/40** | **Acceptable** |

## Design Specificity Verdict

**LLM assessment**: Grounded in mountain carpooling through specialized badges (4x4/AWD, Cadenas, Parrilla) and destination options (Farellones, El Colorado, La Parva, Valle Nevado). However, it misses Santiago carpool hub presets (Cantagallo, Mall Sport, Metro Esc. Militar) and price range recommendations.

**Deterministic scan**: CLI detector `detect.mjs` executed; bundled detector script is not installed in the skill path. Code inspection identified missing ARIA dialog roles (`role="dialog"`, `aria-modal="true"`), unlinked form labels, and lack of focus trapping / `Escape` key close.

## Overall Impression

The modal presents a solid visual execution of the Clean Alpine Frost aesthetic (`bg-white/95 border-white`), but suffers from usability friction: missing past-date prevention, lack of meeting point presets, DOM displacement when switching directions, and accessibility gaps.

## What's Working

1. **Alpine Frost Glass Styling & Badges**: Clean translucent design with mountain equipment toggles (🚙 4x4, ⛓️ Cadenas, 🎿 Parrilla).
2. **Profile Contact Auto-fill**: Automatically populates WhatsApp and Instagram handle from Supabase profile on modal open.
3. **Clear Direction & Resort Selection**: Intuitive `⬆️ Subida` / `⬇️ Bajada` buttons paired with ski resort options.

## Priority Issues

- **[P1] Past date selection allowed**: `<input type="date">` lacks `min` attribute preventing past dates.
  - *Why it matters*: Users can accidentally publish rides with past or invalid dates.
  - *Fix*: Pass `min={new Date().toISOString().split('T')[0]}` to the date input.
  - *Suggested command*: `npx impeccable harden src/components/PublishModal.tsx`
- **[P1] Missing Santiago pickup presets**: Meeting point requires typing free text without quick-select chips.
  - *Why it matters*: Increases typing effort on mobile for standard carpool spots.
  - *Fix*: Add quick-select preset chips (Cantagallo, Mall Sport, Metro Escuela Militar).
  - *Suggested command*: `npx impeccable clarify src/components/PublishModal.tsx`
- **[P1] Missing Accessibility & Keyboard Controls**: Lacks `role="dialog"`, `aria-modal="true"`, focus trap, and `Escape` key close.
  - *Why it matters*: Keyboard and screen reader users cannot close or contain focus inside the modal.
  - *Fix*: Add keyboard `Escape` handler, ARIA attributes, and focus trap.
  - *Suggested command*: `npx impeccable adapt src/components/PublishModal.tsx`
- **[P2] Missing price recommendation**: Price field lacks a suggested fare indicator ($8.000 - $12.000 CLP).
  - *Why it matters*: Conductores primerizos no saben cuál es la tarifa justa sugerida.
  - *Fix*: Add a suggested price range badge.
  - *Suggested command*: `npx impeccable clarify src/components/PublishModal.tsx`
- **[P2] DOM rearrangement on Subida/Bajada toggle**: Grid elements flip order dynamically when changing trip direction.
  - *Why it matters*: Causes visual jumps and disorients users mid-form.
  - *Fix*: Keep constant input grid layout and update label text dynamically.
  - *Suggested command*: `npx impeccable layout src/components/PublishModal.tsx`

## Persona Red Flags

- **Alex (Power User)**: No keyboard shortcuts (Esc, Enter). Forced manual typing for pickup location and dates.
- **Jordan (First-Timer)**: No pricing guidance or pickup location suggestions.
- **Casey (Distracted Mobile User)**: Dense single column form with high typing demand on mobile 3G.

## Minor Observations

- The `@` prefix overlay inside Instagram input can overlap text if font size or padding changes.
- Unauthenticated view presents a clean Google login CTA, but does not preserve form draft state after redirect.

## Questions to Consider

- ¿Qué pasaría si la salida en Santiago tuviera chips de selección rápida (Cantagallo, Mall Sport, Metro Escuela Militar) para publicar en 1 tap?
- ¿Debería sugerirse automáticamente el rango de precio justo (ej: $8.000 - $12.000 CLP) según el destino seleccionado?
- ¿Podríamos dividir el formulario en 2 pasos ligeros (1. Ruta y Fecha, 2. Equipamiento y Contacto) en móviles para reducir la carga cognitiva?
