## Why

En la vista detallada de un viaje (`TripDetailModal`), la sección "Compartir & Difundir Viaje" incluía una opción para generar y descargar una imagen de historia 9:16 para Instagram. Con el fin de simplificar las acciones de difusión y enfocar el flujo en la interacción directa por WhatsApp y copiado de enlace, se elimina la opción de Instagram Story en esa sección.

## What Changes

- Eliminar el botón "Story 9:16" con el icono de Instagram dentro del bloque "Compartir & Difundir Viaje" en `TripDetailModal.tsx`.
- Eliminar la función `handleDownloadStory` y la lógica asociada de generación de canvas 9:16 para la historia.
- Rediseñar el layout de los botones de compartir a 2 columnas (`grid-cols-1 sm:grid-cols-2`) para "En Grupo WhatsApp" y "Copiar Link".

## Capabilities

### New Capabilities
- `trip-sharing`: Define los métodos de difusión y compartido de un viaje desde el modal de detalle (Grupo WhatsApp y Copiar Link).

### Modified Capabilities
<!-- None -->

## Impact

- `src/components/TripDetailModal.tsx`: Limpieza del código de descarga de historias y actualización de la sección visual de compartir.
