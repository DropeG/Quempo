## Why

On mobile screens, having both the "Mis viajes" button and the User Profile button side-by-side in the top header creates visual clutter and tight layout spacing. Moving "Mis viajes" into the profile dropdown menu simplifies the header, improves touch target spacing, and creates a cleaner user interface across all devices.

## What Changes

- Remove the standalone "Mis viajes" header button from the primary navigation bar.
- Add "Mis viajes" as a primary option inside the User Profile dropdown submenu (above "Mi perfil").
- Maintain full functionality of opening the `MyTripsDrawer` when "Mis viajes" is tapped.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `user-navigation`: Move the "Mis viajes" trigger from the top header into the profile dropdown submenu.

## Impact

- `src/components/Navbar.tsx`: Navbar layout and dropdown menu structure.
