# contact-autofill Specification

## Purpose
Precargar y guardar automáticamente la información de contacto (WhatsApp e Instagram) del usuario al publicar viajes.
## Requirements
### Requirement: Auto-completado de información de contacto al publicar viaje
El sistema SHALL precargar automáticamente el número de WhatsApp y la cuenta de Instagram guardados previamente en el perfil del usuario al abrir el formulario de publicación de viajes, reflejándolo de manera inmediata en la interfaz sin requerir interacción manual o reapertura del modal.

#### Scenario: Precargar contacto en formulario de publicación
- **WHEN** un usuario autenticado abre el modal de publicación de viaje (`PublishModal`)
- **THEN** el sistema consulta el perfil del usuario y autorrellena los campos de WhatsApp e Instagram si existen datos previos, mostrándolos en pantalla de inmediato.

### Requirement: Actualización automática del perfil al publicar viaje
El sistema SHALL actualizar o crear el registro en `public.profiles` con el WhatsApp e Instagram ingresados al enviar un viaje.

#### Scenario: Guardado automático de contacto al publicar
- **WHEN** el usuario publica exitosamente un viaje con un número de WhatsApp e Instagram ingresados
- **THEN** dichos datos se persisten automáticamente en `public.profiles` para ser utilizados en futuras publicaciones.

