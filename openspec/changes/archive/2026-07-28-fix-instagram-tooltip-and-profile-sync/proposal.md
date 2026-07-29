## Why

In `TripDetailModal`, the Instagram profile hover preview card gets covered/clipped underneath the "Detalles de la Ruta" section due to CSS stacking context layering (`backdrop-blur-md`). Additionally, when a user edits their Instagram handle in `ProfileModal`, existing published trips do not reflect the new handle retroactively or in real-time across all their trips.

## What Changes

- Fix the z-index and stacking context in `TripDetailModal.tsx` so the Instagram hover preview card renders cleanly on top of all modal content elements.
- When updating profile details in `ProfileModal.tsx`, propagate the updated `instagram_handle` (and contact info) to all active/existing trips created by that `user_id` in Supabase (`UPDATE trips SET instagram_handle = ... WHERE user_id = ...`).
- In `page.tsx`, trigger trip refetching when profile information is updated so the feed immediately reflects the new Instagram handles.

## Capabilities

### Modified Capabilities
- `driver-social-verification`: Ensure Instagram preview tooltip renders above all card elements without being obscured.
- `user-profile`: Propagate profile updates (including Instagram handle) to all published trips in Supabase.

## Impact

- `src/components/TripDetailModal.tsx`: Fix z-index stacking context for Instagram preview tooltip.
- `src/components/ProfileModal.tsx`: Update all trips for `user_id` when Instagram or WhatsApp contact info changes.
- `src/components/Navbar.tsx`: Propagate profile update callback to main page.
- `src/app/page.tsx`: Refresh trips when profile is saved.
