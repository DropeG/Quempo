## Why

Al presionar el botón de intercambio (swap) de dirección (Santiago <-> Centro de Ski), los emojis del encabezado de Origen (`📍`) y Destino (`🏔️`) permanecían estáticos. Esto provocaba una inconsistencia visual donde Santiago aparecía etiquetado con el emoji de cordillera (`🏔️`) al estar en Destino, y el Centro de Ski con la chincheta de ubicación (`📍`) al estar en Origen.

## What Changes

- Hacer que los emojis de los encabezados de Origen y Destino (tanto en la vista mobile ultra-compacta como en la vista desktop vertical) sean dinámicos según el sentido seleccionado (`SUBIDA` vs `BAJADA`).
- En sentido `SUBIDA`: Origen es Santiago (`📍 Origen`), Destino es Centro de Ski (`🏔️ Destino`).
- En sentido `BAJADA`: Origen es Centro de Ski (`🏔️ Origen`), Destino es Santiago (`📍 Destino`).

## Capabilities

### Modified Capabilities
- `mobile-aside-compact-row`: Actualizar el comportamiento visual de los encabezados de Origen y Destino en la card de Ruta de Viaje para que los emojis `📍` y `🏔️` reflejen dinámicamente el tipo de lugar (Ciudad vs Montaña) al permutar el sentido de la ruta.

## Impact

- `src/app/page.tsx`: Modificación de las plantillas JSX de los contenedores de Origen y Destino (Mobile y Desktop) para renderizar emojis dependientes del estado `selectedDirection`.
