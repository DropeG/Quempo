## Context

Al compartir o difundir un viaje en WhatsApp desde `PublishSuccessModal.tsx` o `TripDetailModal.tsx`, se genera un mensaje de texto plano con los detalles del viaje y una llamada a la acción con el enlace al viaje en la plataforma.
Actualmente el texto al final del mensaje de difusión en `PublishSuccessModal.tsx` dice:
`👉 *Reservar o contactar:* ${shareUrl}`

Dado que Quempo no maneja un sistema de reservas pagadas ni cobro de comisiones, la frase "Reservar o contactar" puede confundir a los usuarios. Se actualizará para que indique "Ver viaje en:" (o "Ver detalles y contactar en:").

## Goals / Non-Goals

**Goals:**
- Cambiar la frase `Reservar o contactar:` por `Ver viaje en:` en `PublishSuccessModal.tsx`.
- Mantener alineado y consistente el texto generado en `TripDetailModal.tsx` si aplica.
- Preservar la estructura del mensaje formateado con emojis (`🏔️`, `🚗`, `📅`, `🕒`, `💺`, `💰`, `👉`).

**Non-Goals:**
- Modificar el flujo de copia al portapapeles o redirección a la API de WhatsApp.
- Alterar otros campos o emojis del resumen del viaje.

## Decisions

### Decision 1: Formato final de la línea CTA en el mensaje compartido
Cambiar la línea final del mensaje generado por:
`👉 *Publicado en:* ${shareUrl}`

**Alternativas consideradas:**
- `👉 *Por:* ${shareUrl}`: Demasiado breve o ambiguo.
- `👉 *Ver detalles y contactar:* ${shareUrl}`: Más largo, pero `Ver viaje en:` es directo y limpio como solicitó el usuario.

## Risks / Trade-offs

Ninguno. Es un cambio exclusivamente de texto en el string del mensaje de difusión de WhatsApp.
