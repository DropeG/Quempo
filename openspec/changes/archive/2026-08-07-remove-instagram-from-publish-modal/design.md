## Context

En el flujo actual de Quempo, el modal de publicación de viaje (`PublishModal.tsx`) cuenta con dos campos de contacto: WhatsApp e Instagram. 
Sin embargo, solicitar el handle de Instagram al publicar agrega un paso repetitivo y farragoso. El perfil de usuario (`ProfileModal.tsx`) ya permite almacenar el `whatsapp_number` y `instagram_handle` del usuario.

## Goals / Non-Goals

**Goals:**
- Eliminar el input y el estado de Instagram del formulario de `PublishModal.tsx`.
- Heredar automáticamente el `instagram_handle` guardado en la tabla `profiles` de Supabase al momento de insertar o actualizar un viaje en `PublishModal.tsx`.
- Mantener `ProfileModal.tsx` como la única interfaz de usuario donde se configura el perfil social de Instagram.

**Non-Goals:**
- No se altera la estructura de base de datos de Supabase (las columnas `trips.instagram_handle` y `profiles.instagram_handle` se conservan).
- No se modifica la visualización de Instagram ni los Hover Cards en `TripDetailModal.tsx`.

## Decisions

### Decisión 1: Remoción de controles UI e inputs en `PublishModal.tsx`
Se eliminará el bloque JSX que renderiza el campo de Instagram (incluyendo el ícono y prefijo `@`), la variable de estado `instagramHandle` y su función de sanitización en el modal de publicación.

### Decisión 2: Consulta e inserción silenciosa del perfil
Al abrir o enviar `PublishModal.tsx`, el sistema obtiene el perfil de Supabase. Durante el `insert` o `update` del viaje:
- Se enviará el `instagram_handle` proveniente de `profiles.instagram_handle` (o del estado cargado del perfil).
- No se sobreescribirá ni borrará el Instagram si el conductor ya lo tenía registrado en su perfil.

### Decisión 3: Mantener sincronización bidireccional en `ProfileModal.tsx`
`ProfileModal.tsx` ya cuenta con la lógica para actualizar los viajes existentes del usuario (`supabase.from('trips').update({ instagram_handle }).eq('user_id', user.id)`) cuando este edita su perfil. Esta lógica se mantendrá intacta para asegurar consistencia.

## Risks / Trade-offs

- **[Falta de Instagram en primer viaje]** → Si un conductor nunca ha guardado su Instagram en "Mi Perfil", sus viajes no tendrán el badge de Instagram.
  - *Mitigación*: En el modal de detalles o en el perfil, se puede seguir permitiendo al conductor actualizar su perfil en cualquier momento para activar la verificación social en todos sus viajes.
