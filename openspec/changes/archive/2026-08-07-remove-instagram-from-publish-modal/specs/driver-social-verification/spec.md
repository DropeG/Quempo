## MODIFIED Requirements

### Requirement: Captura de Instagram al Publicar Viaje
El formulario de publicar viaje (`PublishModal`) NO SHALL incluir un campo de entrada para el usuario de Instagram. En su lugar, el sistema MUST obtener y asociar automáticamente el `instagram_handle` registrado en el perfil del usuario (`profiles.instagram_handle`) al insertar o actualizar un viaje en la base de datos.

#### Scenario: Publicación de viaje por usuario con Instagram en su perfil
- **WHEN** un usuario que tiene su Instagram registrado en su perfil guarda un nuevo viaje
- **THEN** el viaje se registra asignando automáticamente su `instagram_handle` desde el perfil sin mostrar ningún campo de Instagram en el modal.

#### Scenario: Publicación de viaje por usuario sin Instagram en su perfil
- **WHEN** un usuario que no tiene su Instagram registrado en su perfil guarda un nuevo viaje
- **THEN** el viaje se registra con `instagram_handle` en nulo sin solicitar información de Instagram en el formulario.
