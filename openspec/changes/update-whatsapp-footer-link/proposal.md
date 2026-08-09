## Why

Al difundir un viaje por WhatsApp desde el modal de éxito (`PublishSuccessModal.tsx`) o el detalle del viaje (`TripDetailModal.tsx`), el mensaje termina actualmente con la llamada a la acción `👉 *Ver viaje:* ${shareUrl}` (ej. `👉 Ver viaje: https://www.quempo.tech/v/...`). 

Se requiere simplificar el cierre de la plantilla del mensaje de WhatsApp para que en lugar de un enlace directo al viaje específico con la viñeta de emoji (`👉 *Ver viaje:* ${shareUrl}`), indique de forma limpia `Publicado en: https://www.quempo.tech`.

## What Changes

- Cambiar la línea final del mensaje preformateado de WhatsApp en `PublishSuccessModal.tsx` y `TripDetailModal.tsx`.
- Reemplazar `👉 *Ver viaje:* ${shareUrl}` (y variantes con emoji/negrita) por `Publicado en: https://www.quempo.tech`.

## Capabilities

### Modified Capabilities
- `trip-sharing`: Modificar la especificación de mensaje formateado de WhatsApp para que la línea final muestre `Publicado en: https://www.quempo.tech` en vez del enlace directo por ID de viaje.

## Impact

- Componentes afectados: `src/components/PublishSuccessModal.tsx` y `src/components/TripDetailModal.tsx`.
- Cambio puramente de formato del texto copiado/compartido a WhatsApp.
