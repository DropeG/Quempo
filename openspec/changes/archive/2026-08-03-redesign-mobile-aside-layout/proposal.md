## Why

En viewports móviles (< 1024px), el layout anterior dividía los controles en un grid de 2 columnas apretadas. Al cambiar a filas apiladas, la card de Panel 1 ("📍 Ruta de Viaje") aún consumía una altura vertical considerable con 2 cajas apiladas. Simplificar y achicar el Panel 1 en móvil a una disposición en 1 sola fila ultra-compacta (Origen ⇄ Destino en flujo horizontal) maximizará el espacio vertical en pantallas táctiles y permitirá ver la lista de viajes sin scroll innecesario.

## What Changes

- **Rediseño Mobile Layout (Aside Contenedor)**:
  - Disposición en filas apiladas (`flex flex-col gap-3`) en móviles (< 1024px).
- **Simplificación Ultra-Compacta del Panel 1 (📍 Ruta de Viaje)**:
  - En móviles (< 1024px), integrar Origen, botón de intercambio Swap y Destino en un flujo horizontal ultra-compacto de 1 sola fila integrada, reduciendo su altura vertical en un 50%.
- **Optimización del Panel 2 (✨ ¿Conduces a la cordillera?)**:
  - Formatear la card de conductor en móvil como un banner horizontal compacto con título, badge `$0 costo` y botón CTA `Publicar Mi Viaje` de ancho completo.

## Capabilities

### Modified Capabilities
- `mobile-aside-compact-row`: Actualizar los requerimientos móviles para que el Panel 1 ("📍 Ruta de Viaje") sea ultra-compacto y horizontal en móviles (< 1024px).

## Impact

- `src/app/page.tsx`: Modificación de clases y layout de Panel 1 en mobile vs desktop.
- Preserva comportamiento desktop (viewport ≥ 1024px) sin alteraciones.
