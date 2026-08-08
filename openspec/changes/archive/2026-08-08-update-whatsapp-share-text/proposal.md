## Why

El texto generado al compartir un viaje en WhatsApp en el modal post-publicación (`PublishSuccessModal`) y en el modal de detalle del viaje (`TripDetailModal`) utiliza la frase "Reservar o contactar:". Dado que Quempo es una plataforma de carpooling directo P2P sin sistema de reservas con pago ni comisiones, la palabra "Reservar" resulta confusa. Se necesita actualizar la etiqueta de la URL compartida para indicar "Ver viaje:" o "Contactar por:" de forma limpia y directa hacia la URL de la plataforma.

## What Changes

- **Modificación en el texto de difusión de WhatsApp (`PublishSuccessModal.tsx`)**: Cambiar `👉 *Reservar o contactar:* ${shareUrl}` por `👉 *Ver viaje en:* ${shareUrl}`.
- **Unificación opcional en `TripDetailModal.tsx`**: Asegurar consistencia en la llamada a la acción del enlace compartido (`👉 *Ver viaje en:* ${shareUrl}`).

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `share-trip`: Actualización del formato del texto promocional generado para compartir viajes en WhatsApp y redes.

## Impact

- Componentes afectados: `src/components/PublishSuccessModal.tsx` y `src/components/TripDetailModal.tsx`.
- Sin impacto en APIs backend o esquema de base de datos.
