## Context

The current `Navbar` component renders a standalone button "Mis viajes" in the top navigation header alongside the user profile avatar button when a user is logged in. On small mobile viewports (e.g., 375px screens), having both elements in the header alongside the logo creates visual tightness and small tap targets.

## Goals / Non-Goals

**Goals:**
- Eliminate the standalone "Mis viajes" button from the header navigation row.
- Add "Mis viajes" as an interactive menu item inside the user profile dropdown sub-menu.
- Trigger `onOpenMyTrips` callback when "Mis viajes" is tapped in the dropdown, automatically closing the menu.

**Non-Goals:**
- Modifying `MyTripsDrawer` functionality or styling.
- Changing unauthenticated user navigation state.

## Decisions

### Decision: Place "Mis viajes" at the top of the user profile dropdown menu
- **Rationale:** "Mis viajes" is a high-frequency action for logged in drivers and passengers. Placing it right below the user header inside the dropdown ensures top visual hierarchy while keeping the header clean.
- **Alternatives Considered:** Keeping it separate on desktop and hidden on mobile. Rejected (Option A selected) to maintain a consistent, ultra-clean UI across all viewports.

## Risks / Trade-offs

- [Risk] Users accustomed to tapping "Mis viajes" directly in the header will take 1 extra tap (opening profile menu first).
  - *Mitigation:* The profile menu is intuitive, clearly labeled, and accessible in 1 tap from anywhere in the header.
