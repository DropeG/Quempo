## ADDED Requirements

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
The trip publishing form header SHALL display the modal title without additional subtitle text.

#### Scenario: Modal header render
- **WHEN** the driver opens the publish modal
- **THEN** only "Publicar Viaje" is displayed as the header title and the subtitle "Comparte tu auto..." is omitted.
