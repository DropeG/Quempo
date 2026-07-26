## Why

Para aumentar la confianza entre conductores y pasajeros en Faredeo, permitir a los conductores vincular opcionalmente su cuenta de Instagram. Esto permite a los pasajeros verificar la identidad del conductor y conocerlo mejor antes de reservar un cupo.

## What Changes

- Campo opcional `instagram_handle` en el formulario de publicar viaje (`PublishModal.tsx`).
- Sanitización automática del handle de Instagram al ingresar (removiendo `@` o URLs de instagram).
- Persistencia de `instagram_handle` en la base de datos Supabase (`trips`).
- Integración visual del icono de Instagram en `TripDetailModal.tsx` a la derecha del nombre del conductor.
- Tarjeta desplegable flotante (Hover Card) al pasar el mouse por el icono de Instagram con el handle, avatar y acceso directo al perfil en Instagram.

## Capabilities

### New Capabilities
- `driver-social-verification`: Permite a los conductores agregar su perfil de Instagram y a los pasajeros ver el preview/link al explorar los detalles de un viaje.

### Modified Capabilities
- Ninguna capability existente requiere modificación de specs base.

## Impact

- **Base de Datos**: Nueva columna opcional `instagram_handle` en la tabla `trips`.
- **UI / Componentes**: `TripDetailModal.tsx`, `PublishModal.tsx`, `TripCardAccordion.tsx` (si aplica).
- **Tipos**: Interfaz `Trip` en `src/types/trip.ts`.
