## ADDED Requirements

### Requirement: Browse Rides List
The system SHALL display active trips in a responsive list sorted by date and departure time.

#### Scenario: User opens home page
- **WHEN** user visits the application
- **THEN** system fetches and renders cards for active future trips displaying direction, driver info, origin, destination, seats left, price, meeting point, and mountain badges (4x4, cadenas, parrilla).

### Requirement: Direction Swap Filter (Surfari UX)
The system SHALL allow users to toggle travel direction instantly using a single 1-tap swap button.

#### Scenario: User toggles travel direction
- **WHEN** user clicks the swap button (`⇆`) in the direction bar
- **THEN** system instantly switches the active route between "Subida ⬆️ (Santiago ➔ Cordillera)" and "Bajada ⬇️ (Cordillera ➔ Santiago)" and updates the trip list.

### Requirement: Quick Date Chips Filter
The system SHALL display horizontal quick-select chips for date filtering.

#### Scenario: User clicks a date chip
- **WHEN** user selects a date chip ("Hoy", "Mañana", or specific day)
- **THEN** system filters and renders trips corresponding strictly to that selected date.

#### Scenario: User clicks calendar option
- **WHEN** user selects the "📅 Más" chip
- **THEN** system opens a date picker allowing the user to select any future date.
