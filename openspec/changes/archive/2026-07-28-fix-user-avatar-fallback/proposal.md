# Proposal: Fix User Avatar Fallback & Display in Home

## Context
When users log in via Google OAuth, `user_metadata.avatar_url` points to Google CDN (`lh3.googleusercontent.com`). In many browser environments, loading Google avatar images without `referrerPolicy="no-referrer"` results in 403 Forbidden or CORS errors. 

Because `Navbar.tsx`, `TripCard.tsx`, `TripCardAccordion.tsx`, `TripDetailModal.tsx`, and `ProfileModal.tsx` were using inline `<img>` tags without `referrerPolicy` or an `onError` fallback handler, failed image loads displayed a broken browser image icon with truncated alt text inside the avatar circle in Home.

## Proposed Changes
1. **New `UserAvatar` Component (`src/components/UserAvatar.tsx`)**:
   - Accepts `src`, `name`, `email`, `size` (`sm` | `md` | `lg` | `xl`), and `className`.
   - Sets `referrerPolicy="no-referrer"` on the `<img>` tag to prevent Google referrer blocking.
   - Listens to `onError` to automatically switch to the fallback initial letter ("P" for Pedro) styled with modern glass / frosted Alpine styling if the image URL fails to load.

2. **Unify Avatar Rendering**:
   - Replace manual `img` / fallback conditionals in `Navbar.tsx`, `TripCard.tsx`, `TripCardAccordion.tsx`, `TripDetailModal.tsx`, and `ProfileModal.tsx` with `<UserAvatar />`.

## Impact
- Ensures a clean, consistent user avatar (either photo or initial "P") across Home header, trip cards, trip detail modal, and profile modal.
- Completely eliminates broken image link icons in Home.
