## Why

En la vista principal de la aplicación, el término genérico "Cordillera" resulta impreciso para los usuarios que buscan o filtran viajes de bajada desde los centros de ski. Además, los usuarios necesitan filtrar viajes especificando desde qué centro de ski particular (El Colorado, La Parva, Valle Nevado o Farellones) parten los viajes de bajada, manteniendo "📍 Santiago" fijo para el tramo urbano.

## What Changes

- **Renombrar "Cordillera" a "Centro de Ski"**: En el Direction Swap Bar y en las etiquetas de la UI se descarta la palabra "Cordillera" y se utiliza formalmente "Centro de Ski".
- **Sub-menú de selección de centro origen/destino**:
  - Cuando la dirección seleccionada o invertida sitúa al "Centro de Ski" como origen o destino, se despliega un sub-menú desplegable que permite seleccionar explícitamente el centro de ski específico: **El Colorado, La Parva, Valle Nevado o Farellones** (o "Todos los Centros").
  - "📍 Santiago" permanece constante como el nodo urbano.
- **Sincronización con creación/edición de viaje**: Al abrir la creación/edición de viaje, el modal pre-llena los datos de origen/destino según la selección del sub-menú.

## Capabilities

### New Capabilities
- `resort-origin-selector`: Filtro dinámico con sub-menú selector para especificar el centro de ski de origen o destino en viajes de subida/bajada.

### Modified Capabilities
- `trip-discovery`: Actualizado para renombrar "Cordillera" a "Centro de Ski" y permitir filtrado preciso por centro de ski en ambos sentidos del viaje.

## Impact

- **Frontend**: Mejora en `src/app/page.tsx` para incorporar el sub-menú dinámico en la barra de permuta (Direction Swap Bar) y actualización del lenguaje visual.
- **Backend / Database**: Consultas a Supabase filtrando por `destination` según el centro seleccionado en el sub-menú.
