## Why

Actualmente, cada vez que un usuario publica un viaje en Faredeo, debe reingresar manualmente su número de WhatsApp e Instagram. Esto genera fricción y desacelera la creación de viajes. Además, el Header solo cuenta con una foto/avatar y un botón básico de salida, sin una vista dedicada donde el usuario pueda consultar su información de perfil (como WhatsApp predeterminado, Instagram y el número de viajes publicados en la plataforma).

## What Changes

- **Guardado inteligente de contacto**: Al publicar un viaje o editar el perfil, el número de WhatsApp y el Instagram del usuario se guardan persistentemente en una nueva tabla `public.profiles` en Supabase.
- **Auto-completado en formulario de publicación**: Al abrir el modal para publicar un viaje (`PublishModal`), los campos de WhatsApp e Instagram se completan automáticamente con la información guardada.
- **Submenú desplegable en el Header**: Al hacer clic sobre el avatar/perfil en el `Navbar`, se despliega un submenú flotante que ofrece acceso a "Mi perfil" y a "Cerrar sesión" (con un botón contrastado en tono rojo suave con borde sutil).
- **Modal de "Mi perfil"**: Una nueva sección modal donde el usuario puede ver su foto de Google, su nombre, editar su WhatsApp e Instagram, y consultar el contador total de viajes que ha publicado.

## Capabilities

### New Capabilities
- `user-profile`: Gestión del perfil del usuario (WhatsApp, Instagram, avatar, viajes publicados) con menú desplegable en el navbar y modal de edición.
- `contact-autofill`: Persistencia y auto-completado inteligente de información de contacto (WhatsApp e Instagram) al crear viajes.

### Modified Capabilities
- `trip-publishing`: Actualización del flujo de publicación para guardar automáticamente el perfil del usuario al enviar un viaje.

## Impact

- **Base de datos (Supabase)**: Creación de la tabla `public.profiles` con RLS y disparadores/políticas para lectura/escritura del perfil.
- **Componentes Frontend**:
  - `Navbar.tsx`: Integración del menú desplegable y disparador del modal de perfil.
  - `PublishModal.tsx`: Auto-completado de campos de contacto y actualización del perfil en Supabase al publicar.
  - `ProfileModal.tsx`: Nuevo componente para la gestión del perfil y visualización de estadísticas de viajes.
