## Context

En Quempo, cuando un usuario difunde un viaje por WhatsApp des del modal de éxito tras publicar (`PublishSuccessModal.tsx`) o desde la vista ampliada de un viaje (`TripDetailModal.tsx`), se compone una plantilla `shareText` que incluye los detalles del viaje. Actualmente, el mensaje termina con:
`👉 *Ver viaje:* ${shareUrl}`

El usuario solicitó simplificar esta línea para que diga exactamente:
`Publicado en: https://www.quempo.tech`

## Goals / Non-Goals

**Goals:**
- Actualizar la plantilla de mensaje preformateado `shareText` en `PublishSuccessModal.tsx` y `TripDetailModal.tsx`.
- Cambiar la llamada a la acción final a `Publicado en: https://www.quempo.tech`.

**Non-Goals:**
- Modificar el comportamiento de la acción "Copiar Link" (que copia la URL del viaje individual al portapapeles).
- Cambiar otros datos del mensaje (ruta, fecha, hora, cupos, aporte).

## Decisions

- **Modificación en `PublishSuccessModal.tsx` y `TripDetailModal.tsx`**:
  Reemplazar `\n\n👉 *Ver viaje:* ${shareUrl}` por `\n\nPublicado en: https://www.quempo.tech`.

## Risks / Trade-offs

- Ningún riesgo técnico. El cambio se circunscribe estrictamente al string de la plantilla de mensaje enviado a WhatsApp.
