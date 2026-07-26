## ADDED Requirements

### Requirement: Despliegue de submenú de usuario en Navbar
El sistema SHALL mostrar un submenú desplegable al presionar el perfil del usuario autenticado en la barra superior (`Navbar`), incluyendo las opciones "Mi perfil" y "Cerrar sesión".

#### Scenario: Abrir submenú de perfil
- **WHEN** el usuario autenticado hace clic en su avatar/nombre en el Navbar
- **THEN** se despliega el submenú flotante con la opción "Mi perfil" y el botón "Cerrar sesión" destacado en todo rojo suave con borde sutil.

### Requirement: Modal de Mi Perfil
El sistema SHALL proveer una interfaz modal "Mi Perfil" donde el usuario puede visualizar su avatar de Google, nombre, correo, número de viajes publicados, y modificar su WhatsApp e Instagram.

#### Scenario: Visualización del perfil y viajes publicados
- **WHEN** el usuario hace clic en "Mi perfil" dentro del submenú desplegable
- **THEN** se abre el modal mostrando su avatar, nombre, correo, el conteo exacto de viajes publicados y los campos editables de WhatsApp e Instagram.

#### Scenario: Guardar cambios en el perfil
- **WHEN** el usuario modifica su número de WhatsApp o su usuario de Instagram y presiona "Guardar Perfil"
- **THEN** el sistema actualiza los datos en la tabla `public.profiles` y cierra el modal con notificación de éxito.
