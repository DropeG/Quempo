## Why

El usuario requiere reposicionar el botón de "+ Publicar Viaje" para que sea altamente visible, grande y centrado justo debajo del contenedor principal del Hero ("Comparte tu viaje a los centros de ski..."), removiendo botones redundantes o flotantes. Además, se requiere eliminar el badge superior que decía "Carpooling Para la nieve estilo surfari" para tener una estética más limpia y profesional.

## What Changes

- **Limpieza del Hero Header**: Eliminar el badge con la leyenda "Carpooling Para la nieve estilo surfari".
- **Botón de Publicar Viaje Destacado y Centrado**:
  - Insertar un botón de gran tamaño y llamado a la acción destacado (`+ Publicar Viaje`) centrado directamente debajo del título del Hero.
  - Eliminar la posición anterior del botón (incluyendo el FAB flotante si es necesario).

## Capabilities

### Modified Capabilities
- `trip-publishing`: Acceso destacado de publicación desde la sección Hero principal.

## Impact

- **Frontend**: Ajustes en `src/app/page.tsx` para modificar el layout de la sección Hero.
