## ADDED Requirements

### Requirement: Minimum Mobile Input Font Size
The system SHALL ensure all `<input>`, `<select>`, and `<textarea>` form controls have a computed `font-size` of at least 16px when rendered on viewports with width equal to or less than 768px.

#### Scenario: Mobile input focus prevents iOS auto-zoom
- **WHEN** a user taps or focuses any form input field in a mobile browser (viewport width <= 768px)
- **THEN** the mobile browser SHALL NOT perform an automatic zoom-in on the focused input field

#### Scenario: Desktop input font size remains unmodified
- **WHEN** a user focuses an input field on a desktop screen (viewport width > 768px)
- **THEN** the input element SHALL retain its original component font size and layout styles
