## MODIFIED Requirements

### Requirement: Auto-completado de información de contacto al publicar viaje
El sistema SHALL precargar automáticamente el número de WhatsApp y la cuenta de Instagram guardados previamente en el perfil del usuario al abrir el formulario de publicación de viajes, reflejándolo de manera inmediata en la interfaz sin requerir interacción manual o reapertura del modal.

#### Scenario: Precargar contacto en formulario de publicación
- **WHEN** un usuario autenticado abre el modal de publicación de viaje (`PublishModal`)
- **THEN** el sistema consulta el perfil del usuario y autorrellena los campos de WhatsApp e Instagram si existen datos previos, mostrándolos en pantalla de inmediato.
