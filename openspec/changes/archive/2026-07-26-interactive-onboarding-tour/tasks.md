## 1. Core State & Data Attributes

- [x] 1.1 Add `data-tour` attributes to target UI components (`direction-switch`, `date-filters`, `trip-card-gear`, `whatsapp-btn`, `publish-btn`, `user-profile`)
- [x] 1.2 Implement first-time login detection hook with `localStorage` and Supabase state persistence

## 2. Onboarding Modal & Spotlight Component

- [x] 2.1 Build `OnboardingWelcomeModal` with prominent primary CTA ("Ver Tour Express ⚡") and attractive, low-friction "Omitir por ahora" (Skip) action
- [x] 2.2 Build `SpotlightTourOverlay` component with backdrop blur overlay, target element positioning, glassmorphism tooltip, progress indicator, and Next/Prev/Skip actions
- [x] 2.3 Add smooth scroll-into-view behavior for highlighted DOM targets

## 3. Profile Integration & Manual Replay

- [x] 3.1 Add "Ver tutorial de inicio" trigger button to User Profile / Settings page to allow manual tour replay
- [x] 3.2 Add completion celebration modal with micro-animations when tour reaches step 6

## 4. Programmatic Modal Open & Clean-up

- [x] 4.1 Implement step enter/exit callbacks in tour overlay to automatically expand TripDetailModal on steps 3/4 and PublishModal on step 5
- [x] 4.2 Auto-close modals when exiting tour or moving to other steps

## 5. Non-Overlapping Tooltip & Backdrop Layering Fixes

- [x] 5.1 Add `isModalStep` detection and non-overlapping positioning (bottom dock on mobile, side offset on desktop) for steps 4 and 5
- [x] 5.2 Suppress double backdrop blur and adjust z-index layering when modals are open during tour

## 6. Pointer-Events & Unblocked Tour Advancement

- [x] 6.1 Set `pointer-events-none` on modal backdrop wrappers when `isTourActive` is true so clicks pass to tour controls
- [x] 6.2 Elevate `SpotlightTourOverlay` root and tooltip card to `z-[200]` to guarantee instant 1-tap Next advancement

## 7. Modal Layer Elevation Above Tour Backdrop

- [x] 7.1 Elevate modal wrappers (`TripDetailModal` and `PublishModal`) to `z-[220]` when `isTourActive` is true so they render above the tour backdrop
- [x] 7.2 Skip rendering the SVG dark backdrop mask in `SpotlightTourOverlay` during modal steps so the modal content is 100% bright and clear
