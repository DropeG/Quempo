## Why

Currently, drivers who publish trips on Faredeo do not have a dedicated interface to view, edit, pause, or delete their active or past trips. Adding a dedicated "Mis Viajes" drawer/modal accessed from the Navbar and user menu allows drivers to manage their published trips, adjust available seats, and update trip details seamlessly.

## What Changes

- Add a "Mis Viajes" option in the Navbar user menu and a direct trigger for logged-in users.
- Create a `MyTripsDrawer` component displaying the logged-in user's published trips categorized into Active and Past trips.
- Provide quick actions inside `MyTripsDrawer`: Edit trip details, adjust seat count (+/-), toggle trip status (Active/Full/Paused), and cancel/delete trip.
- Upgrade `PublishModal` to support edit mode (auto-filling trip data and handling Supabase `UPDATE` queries).

## Capabilities

### New Capabilities
- `my-trips-management`: Dedicated drawer interface and management logic for a user's published trips.

### Modified Capabilities
- `trip-publishing`: Extend publishing workflow to support editing and updating existing trip details.

## Impact

- `src/components/Navbar.tsx`: Add "Mis Viajes" item to user dropdown and navigation triggers.
- `src/components/PublishModal.tsx`: Support editing existing trips (`tripToEdit` prop).
- `src/components/MyTripsDrawer.tsx`: [NEW] Drawer/modal component listing user's published trips with quick management actions.
- `src/app/page.tsx`: Handle state synchronization when trips are edited or deleted.
