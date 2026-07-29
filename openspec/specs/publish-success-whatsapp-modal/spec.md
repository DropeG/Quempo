# publish-success-whatsapp-modal Specification

## Purpose
TBD - created by archiving change publish-success-whatsapp-share-modal. Update Purpose after archive.
## Requirements
### Requirement: Modal de éxito tras la publicación de un viaje
El sistema SHALL mostrar un modal flotante de éxito (`PublishSuccessModal`) inmediatamente después de que un conductor publica o guarda un viaje con éxito.

#### Scenario: Publicación exitosa de viaje
- **WHEN** el conductor completa el formulario en `PublishModal` y presiona "Publicar Viaje" con éxito
- **THEN** el sistema cierra el formulario de publicación y abre el modal `PublishSuccessModal` mostrando el viaje publicado.

### Requirement: Acciones de integración con grupo de WhatsApp
El modal `PublishSuccessModal` SHALL incluir 2 botones de acción directa: uno para unirse al grupo oficial de WhatsApp y otro para difundir el viaje.

#### Scenario: Unirse al grupo de WhatsApp
- **WHEN** el usuario presiona "Unirme al Grupo Oficial"
- **THEN** el navegador abre el enlace del grupo oficial de WhatsApp en una nueva pestaña.

#### Scenario: Difundir viaje en el grupo de WhatsApp
- **WHEN** el usuario presiona "Difundir en Grupo de WhatsApp"
- **THEN** el sistema abre WhatsApp con el mensaje estructurado pre-cargado y la URL `/v/id`.

