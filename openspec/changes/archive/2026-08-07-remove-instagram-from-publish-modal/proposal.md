## Why

Actualmente, el formulario para publicar viaje (`PublishModal`) solicita al usuario ingresar manualmente su usuario de Instagram además de su número de WhatsApp. Esto agrega fricción innecesaria al publicar un viaje. Para agilizar la publicación sin perder la verificación social, la gestión de Instagram se trasladará exclusivamente a la configuración de Perfil de Usuario (`ProfileModal`), heredándose automáticamente en los viajes publicados si el conductor lo tiene registrado.

## What Changes

- **Eliminación del campo Instagram en Publicar Viaje**: Se elimina el campo de texto de Instagram (`instagram_handle`) del formulario `PublishModal.tsx`.
- **Herencia automática de perfil**: Al guardar/crear un viaje en `PublishModal.tsx`, el sistema obtiene automáticamente el `instagram_handle` existente en el perfil de Supabase (`profiles.instagram_handle`) y lo asigna al registro del viaje.
- **Mantener Instagram en Perfil**: El campo para ingresar/modificar el usuario de Instagram se mantiene activo en `ProfileModal.tsx`.

## Capabilities

### Modified Capabilities
- `driver-social-verification`: Modifica el requerimiento de captura de Instagram en `PublishModal`, cambiando el ingreso manual por herencia automática desde el perfil del usuario.

## Impact

- `src/components/PublishModal.tsx`: Remueve el input de Instagram del estado, JSX y validación visual. Mantiene el fetching y asignación transparente de `profiles.instagram_handle` al insertar un nuevo viaje.
- `src/components/ProfileModal.tsx`: Sin cambios estéticos requeridos, sigue sirviendo como el único punto de edición del usuario.
- `src/components/TripDetailModal.tsx`: Sigue consumiendo y desplegando `trip.instagram_handle` normalmente.
