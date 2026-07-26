## Context

Faredeo is a fast carpooling app for ski resorts in Santiago. To boost user retention and feature discovery, we need a lightweight, high-performance interactive onboarding tour. The tour must be responsive, mobile-first, and feel seamless with Faredeo's dark Alpine aesthetic.

## Goals / Non-Goals

**Goals:**
- Provide an automatic first-time login trigger using `localStorage` (`faredeo_onboarding_seen`) and Supabase metadata.
- Offer an attractive "Omitir por ahora" (Skip) action that prevents user frustration and respects user choice.
- Build a 6-step Spotlight Overlay component with smooth scrolling, glassmorphism tooltips, progress dots, and Next/Previous/Skip actions.
- Programmatically trigger modal expansions (`TripDetailModal` and `PublishModal`) during tour step transitions.
- Ensure 100% bright, crisp modal form rendering by elevating the active modal wrapper's z-index to `z-[220]` (above the tour backdrop's `z-[200]`) and suppressing modal internal backdrops.
- Allow manual replay from the user profile settings.

**Non-Goals:**
- Heavy third-party driver libraries that bloat the bundle size (we build a lightweight React/Tailwind spotlight component with step hooks).

## Decisions

1. **Modal Z-Index Elevation Above Tour Backdrop**:
   - *Choice*: When `isTourActive` is true, elevate the open modals (`TripDetailModal`, `PublishModal`) outer wrapper to `z-[220]`.
   - *Rationale*: The tour backdrop is rendered at `z-[200]`. By placing the active modal at `z-[220]`, it floats completely in front of the dark overlay, rendering with 100% brightness and no overlay dimming.
   - *Choice*: Suppress modal internal backdrops (`bg-transparent` and no `backdrop-blur`) during the tour so there's zero extra dimming/blur.

2. **Smart Tooltip Position Strategy for Open Modals**:
   - *Choice*: When a step targets an element inside an open modal (step 4: `whatsapp-btn` or step 5: `publish-modal-content`), set `isModalStep = true`.
   - *Mobile Position*: Dock card at `fixed bottom-4 left-4 right-4 max-w-sm mx-auto z-[230]` so the full modal form remains 100% visible above.
   - *Desktop Position*: Shift card to `md:right-8 top-1/2 -translate-y-1/2 max-w-xs z-[230]` as a floating side assistant.

3. **High-Converting Skip UI Design**:
   - *Choice*: Place "Omitir por ahora" with a subtle ghost button style, paired with a vibrant primary button "Ver Tour Express ⚡ (45s)".
   - *Rationale*: Gives users total control and avoids the annoying "forced popup" feeling, increasing overall satisfaction.

## Risks / Trade-offs

- *Risk*: Target element inside modal not yet mounted when step transition triggers.
  - *Mitigation*: Trigger modal open state *before* measuring rect, and add a small delay (250ms-300ms) before measuring `getBoundingClientRect()` to allow CSS animations to finish.
