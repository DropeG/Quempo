## 1. Edit Mode in PublishModal

- [x] 1.1 Add `tripToEdit?: Trip | null` prop to `PublishModal.tsx` and populate form state when editing
- [x] 1.2 Handle Supabase `UPDATE` query when `tripToEdit` is present, updating existing trip details

## 2. MyTripsDrawer Component

- [x] 2.1 Create `src/components/MyTripsDrawer.tsx` to display active and past published trips of the authenticated user
- [x] 2.2 Add quick actions in `MyTripsDrawer`: inline seat count modifier (+/-), delete trip confirmation, and edit trip button

## 3. Navbar Integration & State Synchronization

- [x] 3.1 Update `src/components/Navbar.tsx` to add "Mis Viajes" trigger in user dropdown and top navbar
- [x] 3.2 Wire state in `src/app/page.tsx` to open `MyTripsDrawer`, pass `tripToEdit` to `PublishModal`, and refresh trip list on mutation
