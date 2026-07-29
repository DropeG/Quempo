## Context

In `TripDetailModal`, hovering over the Instagram icon displays a preview card. However, because the sibling container "Detalles de la Ruta" uses `backdrop-blur-md`, it creates a CSS stacking context that paints over the hover preview card.
Additionally, when a driver updates their Instagram handle in `ProfileModal`, the changes are saved to the `profiles` table, but existing trips in the `trips` table retain their original `instagram_handle` values (or `null` if published prior to profile completion).

## Goals / Non-Goals

**Goals:**
- Fix the CSS stacking context in `TripDetailModal.tsx` so the Instagram hover preview card floats above all modal elements without being covered or clipped.
- Cascade profile updates from `ProfileModal.tsx` to all `trips` records associated with `user.id` in Supabase upon saving.
- Trigger trip refetching in `page.tsx` when profile changes are saved.

**Non-Goals:**
- DB migration altering `trips` table constraints or schema.

## Decisions

### 1. Stacking Context Fix in `TripDetailModal.tsx`
- Add `relative z-20` to the Driver Card Info wrapper element, and set `z-50` on the hover preview card.
- Set `relative z-10` on the subsequent "Detalles de la Ruta" card to ensure clear hierarchy.

### 2. Cascading Profile Updates to Trips Table
- In `ProfileModal.tsx`'s `handleSave`, after upserting into `profiles`, execute:
  ```typescript
  await supabase
    .from('trips')
    .update({
      whatsapp_number: cleanPhone,
      instagram_handle: cleanInstagram || null,
    })
    .eq('user_id', user.id);
  ```
- Pass an `onProfileUpdated` callback through `Navbar.tsx` to `page.tsx` so `fetchTrips()` is triggered immediately after saving the profile.

## Risks / Trade-offs

- **[Risk]**: RLS policy blocking multi-row updates on `trips`.
  - **Mitigation**: The `trips` table policy `"Users can update own trips"` checks `auth.uid() = user_id`, allowing bulk updates for all trips belonging to that driver.

## Migration Plan

1. Adjust z-indexes in `src/components/TripDetailModal.tsx`.
2. Add multi-row update in `src/components/ProfileModal.tsx` and pass `onProfileUpdated` callback.
3. Wire callback in `src/components/Navbar.tsx` and `src/app/page.tsx` to refresh trips list.
