## Why

En las tarjetas de viajes (`TripCard.tsx` y `TripCardAccordion.tsx`), la etiqueta que indica el sentido del viaje (ej. "⬆️ Subida") se corta a "Subi" en pantallas móviles y contenedores reducidos debido a la propiedad CSS `truncate` heredada de los contenedores Flex.

## What Changes

- Ajustar el diseño Flexbox y las clases de CSS en `TripCard.tsx` y `TripCardAccordion.tsx` agregando `shrink-0` a los badges de dirección ("⬆️ Subida", "⬇️ Bajada", "🔄 Ida y Vuelta").
- Permitir que el nombre del centro de ski se acorte si el espacio es reducido, preservando intacto el badge de dirección visible y legible.

## Capabilities

### New Capabilities
- Ninguna capability nueva.

### Modified Capabilities
- Ninguna capability de spec modificada.

## Impact

- **UI / Componentes**: `TripCard.tsx`, `TripCardAccordion.tsx`.
