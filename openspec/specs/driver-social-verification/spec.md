# driver-social-verification Specification

## Purpose
TBD - created by archiving change add-instagram-driver-profile. Update Purpose after archive.
## Requirements
### Requirement: Captura de Instagram al Publicar Viaje
El formulario de publicar viaje (`PublishModal`) NO SHALL incluir un campo de entrada para el usuario de Instagram. En su lugar, el sistema MUST obtener y asociar automáticamente el `instagram_handle` registrado en el perfil del usuario (`profiles.instagram_handle`) al insertar o actualizar un viaje en la base de datos.

#### Scenario: Publicación de viaje por usuario con Instagram en su perfil
- **WHEN** un usuario que tiene su Instagram registrado en su perfil guarda un nuevo viaje
- **THEN** el viaje se registra asignando automáticamente su `instagram_handle` desde el perfil sin mostrar ningún campo de Instagram en el modal.

#### Scenario: Publicación de viaje por usuario sin Instagram en su perfil
- **WHEN** un usuario que no tiene su Instagram registrado en su perfil guarda un nuevo viaje
- **THEN** el viaje se registra con `instagram_handle` en nulo sin solicitar información de Instagram en el formulario.

### Requirement: Visualización de Instagram en el Modal de Detalle
El modal de detalles del viaje (`TripDetailModal`) SHALL mostrar el ícono de Instagram a la derecha del nombre del conductor únicamente si el viaje posee un `instagram_handle` válido registrado.

#### Scenario: Conductor con Instagram registrado
- **WHEN** un usuario abre el modal de detalles de un viaje cuyo conductor proporcionó su Instagram
- **THEN** el ícono de Instagram es visible a la derecha de su nombre.

#### Scenario: Conductor sin Instagram registrado
- **WHEN** un usuario abre el modal de detalles de un viaje sin Instagram registrado
- **THEN** el ícono de Instagram NO se muestra en el modal.

### Requirement: Hover Card y Enlace Directo a Instagram
Al interactuar con el ícono de Instagram, el sistema SHALL desplegar una tarjeta flotante de vista previa (Hover Card) en escritorio y permitir redirigir a `https://instagram.com/{handle}` en una pestaña nueva al hacer clic.

#### Scenario: Hover sobre el icono de Instagram
- **WHEN** un usuario pasa el mouse sobre el icono de Instagram en el modal de detalles
- **THEN** se despliega un Hover Card con la insignia del usuario `@handle` y la opción de visitar su perfil.

### Requirement: Unobscured Instagram Hover Preview Tooltip
The Instagram profile hover preview card in `TripDetailModal` SHALL render with proper z-index layering (`z-50` / `z-20`) so it displays unclipped above sibling elements.

#### Scenario: User hovers Instagram icon in TripDetailModal
- **WHEN** the user hovers over the driver's Instagram icon
- **THEN** the preview card SHALL pop up on top of all modal sections without being overlapped by "Detalles de la Ruta".
