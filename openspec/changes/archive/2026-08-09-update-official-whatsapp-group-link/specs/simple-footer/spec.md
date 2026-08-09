## MODIFIED Requirements

### Requirement: Direct Contact Links
The system SHALL provide working direct links to the official WhatsApp community group and to the admin WhatsApp contact (+56959365527).

#### Scenario: User clicks Contacto link
- **WHEN** a user clicks on the "Contacto" link in the footer
- **THEN** the system opens a direct WhatsApp chat window with `https://wa.me/56959365527` pre-filled with a greeting message

#### Scenario: User clicks Comunidad link
- **WHEN** a user clicks on the "Comunidad" or "Grupo de WhatsApp" link in the footer
- **THEN** the system redirects to the official Quempo WhatsApp group `https://chat.whatsapp.com/HSYkGEhRxGgCpPsd6S4Rid`
