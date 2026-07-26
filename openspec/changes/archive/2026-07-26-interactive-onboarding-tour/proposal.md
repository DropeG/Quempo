## Why

Faredeo needs a frictionless, visually engaging way to onboard first-time logged-in users so they immediately grasp the core features (Subida/Bajada direction switch, quick date filters, direct $0 WhatsApp contact, trip publishing, and driver profile verification). 

Many users skip onboarding tours if they feel invasive or slow. To solve this, we will offer an irresistible initial prompt with a prominent, friendly "Skip / Omitir" button, ensuring users who prefer immediate exploration can dive right into the app with zero friction. The tour will trigger strictly once on first login, storing state so it never prompts again unless explicitly requested from the user's profile.

## What Changes

- **First-Login Trigger & State Management**: Detect if a user is logging in for the first time (`has_seen_onboarding` flag stored in local state/Supabase user metadata) and present an attractive Onboarding Welcome Modal.
- **Attractive Skip Option**: Design a ultra-friendly "Omitir por ahora" / "Skip" action alongside a high-converting "Ver Tour Express (45s)" action.
- **6-Step Interactive & Dynamic Spotlight Tour**: 
  1. Direction Switcher (Subida ⬆️ / Bajada ⬇️)
  2. Quick Date Filters (Hoy, Mañana, Fin de semana)
  3. Trip Card Gear Badges (4x4, Cadenas, Porta-ski)
  4. Instant $0 Commission WhatsApp Contact & Trip Detail Form (Auto-opens trip detail modal, showcasing driver profile and mountain gear)
  5. Publish Trip Form (Auto-opens driver publication modal, showcasing how drivers publish seats)
  6. Profile & Instagram Verification
- **Smart Non-Overlapping Tooltip Positioning**: For steps involving open modals (steps 4 & 5), the tour card automatically docks to the bottom of the screen on mobile or side-offset on desktop so it never overlaps or blocks modal form fields.
- **Z-Index Modal Layering and Backdrop Suppression**: 
  - To prevent any dark overlay or blur from covering the modal forms, the active modal wrapper's z-index is elevated to `z-[220]` during modal tour steps, sitting above the tour backdrop's `z-[200]`.
  - The tour overlay skips rendering the SVG cutout mask during modal steps since the modal card is already fully illuminated.
  - The modal's internal backdrop blur and dark background are suppressed when `isTourActive` is true, making the modal content 100% bright, crisp, and readable.
- **Re-trigger from Profile**: Add a "Ver tutorial de inicio" button in user settings/profile to replay the tour anytime.

## Capabilities

### New Capabilities
- `onboarding-tour`: Interactive spotlight tour component and first-time user prompt with skip support, programmatic modal triggers, smart non-overlapping tooltip positioning, modal layer elevation, and completion persistence.

### Modified Capabilities

## Impact

- Frontend: New onboarding overlay/spotlight component in React/Next.js with step enter/exit callbacks, elevated modal z-index hierarchy, and dynamic tooltip positioning.
- User Profile / State: Persistence key `faredeo_onboarding_completed` (localStorage & optional user profile metadata).
- UI Components: Adding data attributes (e.g. `data-tour="direction-switch"`, `data-tour="publish-btn"`, etc.) to target core elements cleanly.
