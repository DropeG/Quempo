## Context

Actualmente en `src/app/page.tsx`, el panel de filtro de Ruta de Viaje renderiza texto estático en los títulos de Origen y Destino:
- Mobile: `📍 Origen` y `🏔️ Destino`
- Desktop: `📍 Origen (Salida)` y `🏔️ Destino (Llegada)`

Cuando `selectedDirection` se cambia de `SUBIDA` (Santiago ➔ Centro de Ski) a `BAJADA` (Centro de Ski ➔ Santiago), la ubicación de Santiago pasa al cuadro de Destino y la del Centro de Ski pasa al cuadro de Origen. Sin embargo, al no cambiar los emojis de los encabezados, Santiago quedaba bajo la etiqueta `🏔️ Destino` y Centro de Ski bajo `📍 Origen`.

## Goals / Non-Goals

**Goals:**
- Hacer que los emojis de los títulos de Origen y Destino sean dinámicos según `selectedDirection`.
- Si `selectedDirection === 'SUBIDA'`, Origen usa `📍` y Destino usa `🏔️`.
- Si `selectedDirection === 'BAJADA'`, Origen usa `🏔️` y Destino usa `📍`.

**Non-Goals:**
- Modificar la lógica del estado de dirección (`toggleDirectionSwap`, `selectedDirection`).
- Modificar el flujo o comportamiento del selector desplegable de centros de ski.

## Decisions

### Decisión 1: Condicionar los emojis en los elementos JSX de encabezado

En `src/app/page.tsx`, actualizar las etiquetas `<span>` de los encabezados tanto para la vista Mobile como Desktop:
- Mobile Origen: `{selectedDirection === 'SUBIDA' ? '📍' : '🏔️'} Origen`
- Mobile Destino: `{selectedDirection === 'SUBIDA' ? '🏔️' : '📍'} Destino`
- Desktop Origen: `{selectedDirection === 'SUBIDA' ? '📍' : '🏔️'} Origen (Salida)`
- Desktop Destino: `{selectedDirection === 'SUBIDA' ? '🏔️' : '📍'} Destino (Llegada)`

*Alternativa considerada*: Crear variables helper `originEmoji` y `destinationEmoji`. Condicionar inline en JSX es directo, claro y evita variables de estado redundantes.

## Risks / Trade-offs

Ningún riesgo significativo. Cambio puro de renderizado UI que no afecta props ni lógica de backend/servicios.
