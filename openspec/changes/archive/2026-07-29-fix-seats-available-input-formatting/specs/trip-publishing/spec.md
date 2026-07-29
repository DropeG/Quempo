## ADDED Requirements

### Requirement: Clean integer input formatting for seats available
The trip publishing form SHALL ensure that the "Asientos Disponibles" input field sanitizes user entry to a clean, non-zero-padded integer representation (e.g., displaying "2" instead of "02" when 2 is typed).

#### Scenario: User types single-digit seat count
- **WHEN** the driver types single-digit numbers such as `2` into the "Asientos Disponibles" field
- **THEN** the input value renders as `2` without leading zero prefix (`02`).

#### Scenario: User clears seat input
- **WHEN** the driver clears the content of the "Asientos Disponibles" field
- **THEN** the input handles empty state gracefully without sticking at `0` or resulting in double digits upon typing next input.
