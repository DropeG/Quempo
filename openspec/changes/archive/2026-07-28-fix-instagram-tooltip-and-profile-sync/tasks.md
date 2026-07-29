## 1. Instagram Tooltip Stacking Context Fix

- [x] 1.1 Update `src/components/TripDetailModal.tsx` layering: add `relative z-20` to Driver Info card and `z-50` to Instagram hover preview box

## 2. Profile Sync Across All Trips

- [x] 2.1 Update `src/components/ProfileModal.tsx` to execute a multi-row update on `trips` (`user_id = user.id`) when profile changes are saved
- [x] 2.2 Add `onProfileUpdated` callback prop to `ProfileModal.tsx` and `Navbar.tsx`
- [x] 2.3 Wire `onProfileUpdated` in `src/app/page.tsx` to refetch trips immediately on profile save
