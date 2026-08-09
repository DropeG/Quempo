## Why

When users interact with form input fields (such as origin, destination, date, or phone fields in the trip publishing modal) on mobile devices—specifically iOS Safari—the browser automatically zooms in on the input field because its CSS `font-size` is smaller than 16px (e.g. `text-xs` / 12px or `text-sm` / 14px). This unexpected auto-zoom shifts the viewport layout and disrupts the user experience.

## What Changes

- Add a global CSS media query rule targeting mobile viewports (`@media (max-width: 768px)`) in `globals.css` to enforce a minimum `font-size: 16px` for all `<input>`, `<select>`, and `<textarea>` elements.
- Maintain visual harmony and touch target legibility across mobile forms without restricting manual user zoom or violating web accessibility guidelines.

## Capabilities

### New Capabilities
- `mobile-input-zoom-prevention`: Establishes mobile form control styling guidelines enforcing a minimum 16px font-size on viewports <= 768px to prevent automatic mobile browser zoom.

### Modified Capabilities

## Impact

- `src/app/globals.css`: Global CSS addition targeting input form elements on mobile viewports (`<= 768px`).
- Form components (`PublishModal`, `PhoneInput`, `ProfileModal`, etc.): Inputs will retain 16px text size on mobile viewports, preventing iOS auto-zoom while maintaining desktop styles.
