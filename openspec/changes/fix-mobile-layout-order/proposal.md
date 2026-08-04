## Why

En mobile, el `<aside>` (Ruta de Viaje + Publicar Viaje + Estado Ruta G-21) se apila **antes** que la `<section>` de Viajes Disponibles, porque en pantallas pequeñas el grid de 12 columnas colapsa a una sola columna y respeta el orden del DOM. El usuario ve primero los controles del conductor y el Estado de Ruta, y solo después la lista de viajes — que es el contenido primario para la mayoría de usuarios. En desktop el layout de dos columnas oculta este problema.

## What Changes

- El contenedor principal pasa de `lg:grid` puro a `flex flex-col lg:grid` para habilitar el control de `order` en mobile.
- Se añade `order-2 lg:order-1` al `<aside>` para que quede segundo en mobile.
- Se añade `order-1 lg:order-2` a la `<section>` para que quede primero en mobile.
- El Estado Ruta G-21 (`MountainStatusPill`) dentro del aside sigue apareciendo en el lugar correcto en desktop (debajo de Publicar Viaje en la columna izquierda) y en mobile queda debajo de los Viajes Disponibles, que es lo esperado.

## Capabilities

### New Capabilities
- `mobile-content-order`: Orden correcto de bloques en mobile — Viajes Disponibles primero, controles del conductor y Estado de Ruta después.

### Modified Capabilities
<!-- No hay cambios de requisitos en specs existentes; es solo un reordenamiento visual. -->

## Impact

- **Archivo afectado**: `src/app/page.tsx` (3 líneas de clases CSS en el div contenedor, aside, y section)
- Sin cambios de lógica, estado, ni comportamiento
- Desktop: sin cambio visual alguno
- Mobile/Tablet: los Viajes Disponibles aparecen primero, mejorando la jerarquía de información para pasajeros
