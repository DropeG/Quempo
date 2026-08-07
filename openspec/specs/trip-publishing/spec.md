# Trip Publishing Spec

## Purpose
Permitir a los conductores publicar viajes compartidos a la cordillera.
## Requirements
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

### Requirement: Horizontal overflow containment in Publish Modal
The trip publishing modal container and form elements SHALL strictly prevent horizontal scrolling and content clipping on mobile viewports down to 320px screen width.

#### Scenario: Rendering PublishModal on narrow mobile screens
- **WHEN** a user opens the publish modal on a mobile screen width between 320px and 400px
- **THEN** the modal form fits within 100% of the viewport width without triggering horizontal scrollbars, equipment options shrink or wrap cleanly using `min-w-0`, and form inputs adapt fluidly.

### Requirement: Single-row horizontal layout for vehicle equipment
The trip publishing form SHALL render vehicle equipment options (4x4, Chains, Rack) in a single-row 3-column grid layout without text wrapping to a second line.

#### Scenario: Displaying equipment options
- **WHEN** the driver views the equipment section in the publish modal
- **THEN** "4x4 / AWD", "Cadenas", and "Parrilla" appear aligned horizontally in 3 equal columns.

### Requirement: Clean modal header
The trip publishing form header SHALL display the modal title without additional subtitle text, styled using the "Clean Alpine Frost & Sky Glass" design system with deep navy title color or crisp snow white text.

#### Scenario: Modal header render
- **WHEN** the driver opens the publish modal
- **THEN** only "Publicar Viaje" is displayed as the header title in font-black DM Sans typography, and the container renders with a glassmorphic background (`backdrop-filter: blur(26px)`), specular border highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.28)`), and close button styled with `bg-white/10 hover:bg-white/20`.

### Requirement: Frosted Snow Glass modal container and Alpine Sky CTA
The trip publishing modal container SHALL utilize the `.glass-card` background tokens (`rgba(160, 190, 215, 0.22)`), crystalline borders (`border-white/30`), translucent form field backgrounds (`bg-white/10` / `bg-slate-900/60`), and a primary CTA button ("Publicar Viaje") in sky celeste (`#38BDF8`) with deep navy text (`#0F2942`).

#### Scenario: Displaying publish modal with alpine aesthetics
- **WHEN** a user opens the publish modal on desktop or mobile
- **THEN** the modal wrapper renders over a dark translucent backdrop (`bg-slate-950/70 backdrop-blur-md`), the form fields display crisp borders with sky-blue focus rings (`focus:ring-[#38BDF8]`), and the primary submit button features `#38BDF8` background with `#0F2942` font-black text.

### Requirement: Support edit mode in PublishModal
The trip publishing form SHALL accept an existing trip payload (`tripToEdit`) to populate all fields and update the record in Supabase upon submission.

#### Scenario: Submitting form in edit mode
- **WHEN** a user submits the PublishModal form with `tripToEdit` set
- **THEN** the system SHALL update the existing trip record in Supabase instead of inserting a new record, displaying a success confirmation message.

### Requirement: Clean integer input formatting for seats available
The trip publishing form SHALL ensure that the "Asientos Disponibles" input field sanitizes user entry to a clean, non-zero-padded integer representation (e.g., displaying "2" instead of "02" when 2 is typed).

#### Scenario: User types single-digit seat count
- **WHEN** the driver types single-digit numbers such as `2` into the "Asientos Disponibles" field
- **THEN** the input value renders as `2` without leading zero prefix (`02`).

#### Scenario: User clears seat input
- **WHEN** the driver clears the content of the "Asientos Disponibles" field
- **THEN** the input handles empty state gracefully without sticking at `0` or resulting in double digits upon typing next input.
