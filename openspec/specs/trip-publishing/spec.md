# Trip Publishing Spec

## Purpose
Permitir a los conductores publicar viajes compartidos a la cordillera.
## Requirements
### Requirement: Dynamic direction selection and origin/destination behavior
The trip publishing form SHALL allow selecting only between SUBIDA and BAJADA directions, dynamically updating the origin and destination inputs based on the selected direction.

#### Scenario: User selects Subida
- **WHEN** the driver selects "Subida"
- **THEN** the origin input represents the departure location in the city and the destination selector defaults to Farellones/ski resort.

#### Scenario: User selects Bajada
- **WHEN** the driver selects "Bajada"
- **THEN** the origin selector represents the departure ski resort and the destination input represents the arrival location in the city.

#### Scenario: Absence of Round Trip option
- **WHEN** the driver views the trip publishing form
- **THEN** the "Ida y Vuelta" button is not visible.

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
