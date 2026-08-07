# Delta Spec: iOS Safari Time Input Styling Fix

## MODIFIED Requirements

### Requirement: Horizontal overflow containment in Publish Modal
The trip publishing modal container and form elements SHALL strictly prevent horizontal scrolling and content clipping on mobile viewports down to 320px screen width. On iOS WebKit (Safari Mobile), native date and time inputs SHALL suppress native WebKit button capsule styling (`-webkit-appearance: none; appearance: none;`) and render `::-webkit-date-and-time-value` with a transparent background, 0 margin/padding, and left text alignment, ensuring time values (e.g. `7:00 a.m.`) render cleanly without overlapping leading icon elements.

#### Scenario: Rendering native time input on iOS Safari
- **WHEN** a driver views the PublishModal on Mobile Safari in iOS
- **THEN** the time value renders as clean flat white text without a WebKit capsule/pill background overlapping the leading clock icon.
