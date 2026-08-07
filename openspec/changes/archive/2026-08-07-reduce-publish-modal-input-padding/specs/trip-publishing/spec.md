# Delta Spec: Reduced Input Padding in Publish Modal

## MODIFIED Requirements

### Requirement: Horizontal overflow containment in Publish Modal
The trip publishing modal container and form elements SHALL strictly prevent horizontal scrolling and content clipping on mobile viewports down to 320px screen width. Form inputs WITH leading icons (Fecha, Hora de Salida, Asientos, Precio) SHALL use compact left padding (`pl-6 sm:pl-7`) ensuring native date and time picker placeholders render cleanly without clipping or touching right element borders.

#### Scenario: Rendering PublishModal on narrow mobile screens
- **WHEN** a user opens the publish modal on a mobile screen width between 320px and 400px
- **THEN** the modal form fits within 100% of the viewport width without triggering horizontal scrollbars, equipment options shrink or wrap cleanly using `min-w-0`, form inputs adapt fluidly, and date/time input placeholders render without right-side overflow or text collision.
