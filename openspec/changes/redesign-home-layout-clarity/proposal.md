## Why

La pantalla principal actual combina la selección de origen/destino, los filtros de fecha y la acción de publicar viaje de forma ambigua, haciendo que los usuarios se confundan entre qué parte es para filtrar viajes y cuál para publicar. Además, el diseño debe estar altamente optimizado para pantallas móviles (donde se consumirá la mayor parte del tráfico) y adaptarse limpiamente a desktop mediante un layout de 2 columnas.

## What Changes

- **Rediseño de Navegación y Jerarquía Visual en Mobile**:
  - El selector de ruta (Origen: Santiago ⇆ Destino: Centro Ski) permanece en la parte superior.
  - Justo abajo de la ruta se incorpora de forma prominente e inconfundible el bloque/botón de **Publicar Mi Viaje** ($0 costo).
  - La sección inferior se delimita claramente como **Buscar Viajes Disponibles**, separando los filtros por día (Chips de fecha) de la parrilla de viajes.
  - Se optimiza la densidad visual de las tarjetas (`TripCard`) en mobile para garantizar que se vean al menos 3 viajes en el primer plano sin scroll excesivo.
- **Rediseño de Maqueta Responsiva para Desktop**:
  - Layout de 2 columnas en pantallas `≥ 1024px`:
    - **Columna Izquierda (Sidebar Fijo/Sticky)**: Selector de Ruta, Botón Prominente de Publicar Viaje y Filtro por Días.
    - **Columna Derecha**: Parrilla de resultados de viajes disponibles en 2-3 columnas.

## Capabilities

### New Capabilities
- `home-layout-clarity`: Rediseño de la interfaz principal separando de forma clara la acción de publicar viaje del buscador y visualización de viajes disponibles, optimizando la densidad mobile y el layout responsivo de 2 columnas en desktop.

### Modified Capabilities

## Impact

- Modificación de `src/app/page.tsx` para reestructurar la jerarquía visual y el layout responsivo (`grid` / `flex`).
- Ajustes en el componente `TripCard.tsx` para soportar vista compacta de alta densidad en mobile.
- Eliminación del FAB (Floating Action Button) flotante fijo para integrarlo orgánicamente en el panel superior/lateral sin bloquear la visualización de tarjetas.
