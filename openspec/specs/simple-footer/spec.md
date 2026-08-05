# simple-footer Specification

## Purpose
TBD - created by archiving change add-simple-footer. Update Purpose after archive.
## Requirements
### Requirement: Responsive Footer Display
The system SHALL display a responsive footer component at the bottom of all application pages containing the Quempo brand name, direct WhatsApp links, and legal terms link.

#### Scenario: Rendering footer on mobile devices
- **WHEN** a user visits Quempo on a mobile screen (<640px)
- **THEN** the footer renders in a compact, centered layout with "Quempo 🏔️", links for Comunidad, Contacto, and Términos, and the P2P disclaimer

#### Scenario: Rendering footer on tablet and desktop devices
- **WHEN** a user visits Quempo on a desktop or tablet screen (>=640px)
- **THEN** the footer expands into a balanced horizontal layout with frosted glass visual styling (`backdrop-blur-md`, subtle border)

### Requirement: Direct Contact Links
The system SHALL provide working direct links to the official WhatsApp community group and to the admin WhatsApp contact (+56959365527).

#### Scenario: User clicks Contacto link
- **WHEN** a user clicks on the "Contacto" link in the footer
- **THEN** the system opens a direct WhatsApp chat window with `https://wa.me/56959365527` pre-filled with a greeting message

#### Scenario: User clicks Comunidad link
- **WHEN** a user clicks on the "Comunidad" link in the footer
- **THEN** the system redirects to the official Quempo WhatsApp group `https://chat.whatsapp.com/ESElGo2ZznuJoFw66kmp4r`

