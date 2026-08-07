# Delta Spec: iOS Safari Compatibility & Clean Publish Modal

## MODIFIED Requirements

### Requirement: Horizontal overflow containment in Publish Modal
The trip publishing modal container and form elements SHALL strictly prevent horizontal scrolling and content clipping on mobile viewports down to 320px screen width. On iOS WebKit (Safari Mobile), native date and time input shadow DOM elements (`::-webkit-date-and-time-value`) SHALL align to the left without enforcing internal min-width clipping, and modal backdrop overlays SHALL suppress horizontal rubber-band touch gestures (`overscroll-x-none touch-pan-y`).

#### Scenario: Rendering PublishModal on Safari Mobile (iOS)
- **WHEN** a user opens the publish modal in Mobile Safari on iOS
- **THEN** native date and time picker values render without internal WebKit clipping, and diagonal touch dragging on the backdrop overlay does not trigger horizontal page rubber-banding.

### Requirement: Auto-completado de información de contacto al publicar viaje
The trip publishing form SHALL auto-fill WhatsApp contact information from the user profile and SHALL inherit the user profile Instagram handle without displaying a manual Instagram input field inside the publish modal.

#### Scenario: Publishing trip with profile Instagram handle
- **WHEN** an authenticated user opens PublishModal to create a trip
- **THEN** the system inherits their profile Instagram handle automatically without rendering a separate manual Instagram text input in the publish form.
