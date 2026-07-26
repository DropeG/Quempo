## Context

En pantallas móviles, el contenedor del badge de dirección en `TripCard.tsx` y `TripCardAccordion.tsx` comparte fila Flex con la ubicación de destino. Debido a la propiedad `truncate` genérica en el div padre, el texto "⬆️ Subida" se trunca a "⬆️ Subi...".

## Goals / Non-Goals

**Goals:**
- Asegurar que la etiqueta de dirección ("⬆️ Subida", "⬇️ Bajada", "🔄 Ida y Vuelta") nunca se trunque ni se corte.
- Aplicar `shrink-0` y la propiedad `whitespace-nowrap` a la insignia de dirección.

**Non-Goals:**
- Cambiar la información mostrada en la tarjeta.

## Decisions

### Decisión 1: Aplicar `shrink-0 whitespace-nowrap` en el badge de dirección
- **Razón**: Al marcar la insignia como `shrink-0` y `whitespace-nowrap`, Flexbox priorizará mantener completa la etiqueta ("Subida") y solo recortará textos secundarios de ser estrictamente necesario en pantallas ultraniveladas.
