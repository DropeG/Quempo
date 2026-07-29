## 1. Dynamic Preview Route Implementation

- [x] 1.1 Create Dynamic Preview Route `src/app/v/[id]/page.tsx` retrieving trip from Supabase, rendering custom OG tags, and executing meta-redirect.
- [x] 1.2 Update `src/app/page.tsx` to read the `?trip=id` query parameter on mount and open the matching `TripDetailModal`.

## 2. Share Actions & Canvas Generator

- [x] 2.1 Update `src/components/TripDetailModal.tsx` to add the "Compartir Viaje" action panel.
- [x] 2.2 Add clipboard copying / Web Share API trigger with formatted text snippet.
- [x] 2.3 Implement the HTML5 Canvas drawing function to generate and download a vertical 9:16 Instagram Story image with custom winter branding.
