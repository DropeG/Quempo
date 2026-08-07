# Delta Spec: Trip Publishing Mobile Optimization

## MODIFIED Requirements

### Requirement: Dynamic direction selection and origin/destination behavior
The trip publishing form SHALL allow selecting only between SUBIDA and BAJADA directions, dynamically updating the origin and destination inputs based on the selected direction. In mobile viewports (< 640px / sm breakpoint), direction buttons SHALL render compact labels ("⬆️ Subida" and "⬇️ Bajada") omitting full route subtitles to optimize horizontal space.

#### Scenario: User selects Subida
- **WHEN** the driver selects "Subida"
- **THEN** the origin input represents the departure location in the city and the destination selector defaults to Farellones/ski resort.

#### Scenario: User selects Bajada
- **WHEN** the driver selects "Bajada"
- **THEN** the origin selector represents the departure ski resort and the destination input represents the arrival location in the city.

#### Scenario: Absence of Round Trip option
- **WHEN** the driver views the trip publishing form
- **THEN** the "Ida y Vuelta" button is not visible.

#### Scenario: Mobile direction button label compactness
- **WHEN** the driver views the trip publishing form on mobile viewports (< 640px)
- **THEN** the Subida and Bajada buttons display simplified text ("⬆️ Subida" and "⬇️ Bajada") without trailing "(Santiago ➔ Ski)" route subtitles.

## ADDED Requirements

### Requirement: Horizontal overflow containment in Publish Modal
The trip publishing modal container and form elements SHALL strictly prevent horizontal scrolling and content clipping on mobile viewports down to 320px screen width.

#### Scenario: Rendering PublishModal on narrow mobile screens
- **WHEN** a user opens the publish modal on a mobile screen width between 320px and 400px
- **THEN** the modal form fits within 100% of the viewport width without triggering horizontal scrollbars, equipment options shrink or wrap cleanly using `min-w-0`, and form inputs adapt fluidly.
