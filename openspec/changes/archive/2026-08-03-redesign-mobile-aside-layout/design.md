## Context

En viewports móviles (< 1024px), el contenedor `<aside>` envuelve las cards de control en filas apiladas (`flex flex-col gap-3`). Sin embargo, el Panel 1 ("📍 Ruta de Viaje") presentaba 2 grandes cajas apiladas (Origen y Destino con labels superiores) que tomaban demasiado espacio vertical (~200px), empujando la lista de viajes disponibles hacia abajo.

## Goals / Non-Goals

**Goals:**
- Simplificar el Panel 1 ("📍 Ruta de Viaje") en móvil para que Origen y Destino convivan en un layout ultra-compacto en 1 sola fila o bloque ultra delgado en viewports móviles (< 1024px).
- Mantener la vista en 2 cajas apiladas verticales en pantallas desktop (≥ 1024px).
- Mantener la card de Panel 2 ("¿Conduces a la cordillera?") como banner horizontal compacto.

**Non-Goals:**
- No alterar la lógica de estado (toggleDirectionSwap, selectedDirection, renderResortDropdown).

## Decisions

### Decisión 1: Layout Dual Responsive para Panel 1 ("📍 Ruta de Viaje")

- **En Mobile (< 1024px)**:
  - Renderizar un contenedor horizontal compacto (`flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-2.5 border border-white/20`):
  - Sub-bloque Origen (izq) ⇄ Botón Swap (centro) ⇄ Sub-bloque Destino (der).
  - Reduce la altura a solo ~60px en mobile.
- **En Desktop (≥ 1024px)**:
  - Mantener las cajas apiladas de Origen (arriba) y Destino (abajo) con la barra divisora central intactas.

## Risks / Trade-offs

- *Espacio horizontal reducido en móviles muy angostos (360px)*: [Riesgo] El selector dropdown de centro de ski puede quedar ajustado si se muestra en horizontal. → [Mitigación] Usar `truncate` y clases flex flexibles (`flex-1 min-w-0`) con tipografía `text-xs font-bold` ajustada.
