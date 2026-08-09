## ADDED Requirements

### Requirement: Modal de Reporte de Feedback y Bugs
El sistema DEBE proveer un modal interactivo accesible para usuarios autenticados e invitados que permita enviar reportes de errores (bugs) o sugerencias sobre Quempo.

#### Scenario: Abrir el modal desde el footer o perfil
- **WHEN** el usuario hace clic en el enlace "Reportar problema" en el Footer o en la sección de Feedback dentro de Mi Perfil
- **THEN** el sistema abre el modal de feedback sin recargar la página

#### Scenario: Selección de tipo de reporte y mensaje
- **WHEN** el usuario selecciona una categoría ("Error / Bug", "Sugerencia", "Otro") y escribe un mensaje descriptivo
- **THEN** el botón de envío se habilita

#### Scenario: Captura automática de metadata técnica
- **WHEN** el usuario envía el reporte
- **THEN** el sistema captura silenciosamente la URL actual, el User-Agent del navegador y el ID de usuario (si está autenticado) y almacena el reporte en Supabase

#### Scenario: Confirmación de envío exitoso
- **WHEN** el envío del reporte a la base de datos se completa con éxito
- **THEN** el modal muestra un mensaje de agradecimiento y se cierra automáticamente tras un breve tiempo
