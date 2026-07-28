# user-profile Specification

## Purpose
Gestión del perfil de usuario, datos de contacto y estadísticas en Faredeo.
## Requirements
### Requirement: Despliegue de submenú de usuario en Navbar
El sistema SHALL mostrar un submenú desplegable al presionar el perfil del usuario autenticado en la barra superior (`Navbar`), incluyendo las opciones "Mi perfil" y "Cerrar sesión".

#### Scenario: Abrir submenú de perfil
- **WHEN** el usuario autenticado hace clic en su avatar/nombre en el Navbar
- **THEN** se despliega el submenú flotante con la opción "Mi perfil" y el botón "Cerrar sesión" destacado en todo rojo suave con borde sutil.

### Requirement: Modal de Mi Perfil
El sistema SHALL proveer una interfaz modal "Mi Perfil" basada en la estética "Clean Alpine Frost & Sky Glass" donde el usuario puede visualizar su avatar de Google, nombre, correo, número de viajes publicados, y modificar su WhatsApp e Instagram.

#### Scenario: Visualización del perfil y viajes publicados
- **WHEN** el usuario hace clic en "Mi perfil" dentro del submenú desplegable
- **THEN** se abre el modal con fondo de cristal esmerilado (`.glass-card`), bordes de luz helada (`border-white/30`), avatar con anillo brillante (`ring-2 ring-white/70`), badge celeste de viajes publicados y campos de texto editables estilizados.

#### Scenario: Guardar cambios en el perfil
- **WHEN** el usuario modifica su número de WhatsApp o su usuario de Instagram y presiona "Guardar Perfil"
- **THEN** el sistema actualiza los datos en la tabla `public.profiles` y cierra el modal con notificación de éxito.

