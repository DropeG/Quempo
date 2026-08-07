# Proposal: Fix iOS Safari Native Time Input Capsule Overlap

## Why

En iOS Safari (WebKit nativo en iPhone), el campo `<input type="time">` renderiza una cápsula/óvalo nativo alrededor del valor del tiempo (ej: `7:00 a.m.`). Este óvalo nativo de WebKit se posiciona hacia la izquierda con su propio margen interno, traslapándose directamente encima del icono celeste de reloj (`Clock`) ubicado en `PublishModal.tsx`.

## What Changes

- Desactivar la apariencia nativa del botón de cápsula WebKit en `<input type="time">` y `<input type="date">` mediante `-webkit-appearance: none; appearance: none;`.
- Eliminar el fondo, margen y padding de `::-webkit-date-and-time-value` en `src/app/globals.css` para que el texto de la hora se despliegue plano y transparente, alineado limpiamente junto al icono Lucide sin traslapes visuales.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `trip-publishing`: Eliminación del traslape de la cápsula nativa de tiempo en iOS Safari WebKit en el modal de publicación.

## Impact

- `src/app/globals.css`: Adición de reglas CSS globales para `-webkit-appearance: none` y reseteo de `::-webkit-date-and-time-value`.
