# Share Trip & Social Sharing Specification

## Purpose
Increase growth and convenience by allowing drivers to share their trips with rich previews on WhatsApp and stylized banners on Instagram Stories.

## Requirements

### Requirement: Open Graph Metadata Preview Route
The route `/v/[id]` SHALL render dynamic Open Graph tags (`og:title`, `og:description`, `og:image`) detailing the specific trip and redirect user browsers to `/?trip=id`.

#### Scenario: WhatsApp scraper crawls the preview route
- **WHEN** a user pastes `https://faredeo.cl/v/abc-123` into a WhatsApp chat
- **THEN** the scraper SHALL read the HTML head containing the trip's custom metadata and show a preview card (e.g. "Rumbo a Valle Nevado - Faredeo. Mateo ofrece 3 cupos...").

### Requirement: Share Button & Clipboard Copy
The `TripDetailModal` SHALL include a "Compartir" action menu. When clicked, it SHALL attempt to invoke `navigator.share()` on mobile devices, or copy a beautifully formatted text card and link to the clipboard.

#### Scenario: User copies sharing link
- **WHEN** the user clicks "Copiar Enlace" on desktop
- **THEN** the system copies a message (Ruta, Date, Time, Price, Link) and displays a success notification.

### Requirement: Dynamic Instagram Story Canvas Generator
The system SHALL provide a button to generate and download a vertical (9:16) image containing the trip details and branding.

#### Scenario: Driver generates Instagram Story image
- **WHEN** a driver clicks "Descargar para Instagram" in the share menu
- **THEN** the system renders a canvas with an alpine gradient background, the trip's details in high-contrast legible typography, and triggers a download of a PNG file.
