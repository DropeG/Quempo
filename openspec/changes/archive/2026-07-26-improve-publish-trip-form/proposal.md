## Why

El formulario de publicación de viajes en el modal `PublishModal` requería mejoras de UX para simplificar el flujo del conductor, evitar confusiones entre origen y destino según el sentido del viaje (Subida vs Bajada), optimizar la distribución horizontal de accesorios del vehículo y limpiar elementos innecesarios del encabezado.

## What Changes

- **Subida / Bajada Dinámico**: Al seleccionar **Subida**, el destino por defecto se fija en Farellones (o centro de esquí) y el punto de salida en la ciudad. Al seleccionar **Bajada**, el origen y destino intercambian roles dinámicamente.
- **Remoción de Ida y Vuelta**: Se remueve la opción de dirección "Ida y Vuelta" (ROUND_TRIP) del modal de publicación.
- **Layout de Equipamiento**: La sección "Equipamiento y Vehículo" se ajusta a una grilla de 3 columnas horizontales (`4x4 / AWD`, `Cadenas`, `Parrilla`) para evitar saltos de línea indeseados en el modal.
- **Limpieza de Encabezado**: Se elimina el texto subtítulo *"Comparte tu auto y amortiza los costos de subida/bajada"*.

## Capabilities

### New Capabilities
- `trip-publishing`: Reglas de UX y captura de datos dinámicos para el formulario de publicación de viajes (Subida vs Bajada, equipamiento y selección de origen/destino).

### Modified Capabilities
*(Ninguna)*

## Impact

- Modificación del componente de UI `src/components/PublishModal.tsx`.
- Ajustes de tipos en `src/types/trip.ts` para restringir `TripDirection` en la UI de publicación si aplica.
