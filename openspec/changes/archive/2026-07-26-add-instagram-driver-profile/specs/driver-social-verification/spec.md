## ADDED Requirements

### Requirement: Captura de Instagram al Publicar Viaje
El formulario de publicar viaje (`PublishModal`) SHALL incluir un campo opcional para ingresar el usuario de Instagram del conductor. El sistema MUST sanitizar la entrada removiendo el símbolo `@` inicial, espacios y cualquier prefijo de URL `https://instagram.com/`.

#### Scenario: Usuario ingresa handle con @ o URL completa
- **WHEN** el conductor ingresa `@pedro_skier` o `https://www.instagram.com/pedro_skier/` en el campo de Instagram
- **THEN** el sistema debe almacenar únicamente `pedro_skier` en la base de datos de Supabase.

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
