# trip-sharing Specification

## Purpose
TBD - created by archiving change remove-instagram-from-trip-share. Update Purpose after archive.
## Requirements
### Requirement: Simplified Trip Sharing Options
El sistema SHALL proveer opciones simplificadas de compartir viaje y generar un mensaje formateado para WhatsApp que use "Publicado en:" antes del enlace del sitio oficial.

#### Scenario: Display share options in trip detail modal
- **WHEN** un usuario difunde un viaje a WhatsApp desde el modal de éxito o detalle de viaje
- **THEN** el mensaje generado incluye la llamada a la acción con el formato `👉 *Publicado en:* https://quempo-gilt.vercel.app/` en lugar de "Reservar o contactar"
- **THEN** la sección "Compartir & Difundir Viaje" muestra los botones "En Grupo WhatsApp" y "Copiar Link" en un diseño responsivo sin marcas ni descargas de Instagram Story

### Requirement: Official Domain Link Generation
The system MUST use `https://quempo.tech` (or `window.location.origin` when available) as the primary base URL when generating shareable trip links.

#### Scenario: User shares trip link on WhatsApp
- **GIVEN** a published trip
- **WHEN** the user copies or shares the trip link to WhatsApp
- **THEN** the generated share text MUST contain `https://quempo.tech` or the active production domain URL instead of legacy `.vercel.app` domains.

