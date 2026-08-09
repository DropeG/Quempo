## MODIFIED Requirements

### Requirement: Accessible Legal Terms Page
The system SHALL provide a dedicated `/terminos` page detailing the terms of service and privacy practices of Quempo with a dedicated glassmorphism sticky header that includes a button to return to the main page and prevents text scroll overlap.

#### Scenario: User navigates to /terminos
- **WHEN** a user visits `/terminos`
- **THEN** the system displays a sticky header with glassmorphism (`bg-[#091a2c]/85 backdrop-blur-xl border-b border-white/10 shadow-lg`), Quempo branding, and a "Volver a Quempo" button.
- **AND** when the user scrolls down, the content of the terms document passes smoothly underneath the header without visual text collision or overlapping clutter.
