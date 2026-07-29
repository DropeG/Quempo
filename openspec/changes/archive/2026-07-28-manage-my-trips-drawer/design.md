## Context

Drivers lack a clear mechanism to manage their published trips on Faredeo. Once a trip is published, modifying its details, adjusting available seats, or removing/canceling the trip requires manual database edits or isn't possible.

## Goals / Non-Goals

**Goals:**
- Provide a responsive "Mis Viajes" drawer/modal component accessible via the Navbar.
- Enable drivers to view their active and past published trips.
- Enable drivers to perform quick inline management: adjusting available seats (+/-), toggling active/full status, and deleting/canceling a trip.
- Support full editing of trip fields by pre-populating `PublishModal` with `tripToEdit`.

**Non-Goals:**
- In-app passenger reservation system / chat system (handled via direct WhatsApp contact).
- Multi-driver fleet management or complex recurring schedule rules.

## Decisions

### 1. Dedicated `MyTripsDrawer` Component vs Modal
- **Choice**: Implement a Slide-over Drawer on desktop and mobile bottom-sheet style (`MyTripsDrawer.tsx`).
- **Rationale**: A drawer allows fast, lightweight inspection of trips while keeping the user grounded on the main feed. On mobile, it acts as a slide-up sheet.

### 2. Extending `PublishModal.tsx` for Edit Mode
- **Choice**: Accept an optional prop `tripToEdit?: Trip | null` in `PublishModal`.
- **Rationale**: Avoids code duplication for the publishing form. When `tripToEdit` is set, the modal fills all fields, changes the header to "Editar Viaje", and performs an `.update()` call on Supabase.

### 3. State & Refetch Synchronization
- **Choice**: Pass an `onTripUpdated?: () => void` callback from `page.tsx` down to `Navbar` / `MyTripsDrawer` and `PublishModal`.
- **Rationale**: When a trip is edited or deleted, calling `onTripUpdated` causes `page.tsx` to refetch trips immediately, keeping the feed 100% in sync without full page reloads.

## Risks / Trade-offs

- **[Risk]**: User edits a trip that has already passed.
  - **Mitigation**: Filter user trips into "Activos" (departure date >= today) and "Historial" (past dates), allowing edits primarily on active trips while keeping past trips read-only or delete-only.
- **[Risk]**: Database RLS rules preventing edit/delete.
  - **Mitigation**: Ensure Supabase `trips` table has RLS policies for `UPDATE` and `DELETE` checking `auth.uid() = user_id`.

## Migration Plan

1. Create `MyTripsDrawer.tsx`.
2. Update `PublishModal.tsx` with `tripToEdit` support.
3. Update `Navbar.tsx` to add "Mis Viajes" button & dropdown item and manage state for `isMyTripsOpen`.
4. Update `page.tsx` to link drawer state and refresh callback.
