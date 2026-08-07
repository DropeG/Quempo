# Proposal: Fix Publish Modal Mobile Overflow & Simplify UI

## Why

En dispositivos móviles (pantallas pequeñas < 375px), el formulario de publicación de viajes (`PublishModal.tsx`) sufre de desbordamiento horizontal y permite scroll horizontal indeseado. Esto ocurre por etiquetas de botones extensas (ej: `⬆️ Subida (Santiago ➔ Ski)`), grillas de 3 columnas de equipamiento sin `min-w-0` o truncado responsivo, inputs con anchos mínimos intrínsecos del navegador y falta de `overflow-x-hidden` en el contenedor del formulario.

## What Changes

- **Simplificación Responsiva de Botones de Dirección**: En móviles (`<sm`), omitir los subtítulos explicativos `(Santiago ➔ Ski)` y `(Ski ➔ Santiago)` en los botones de "Subida" y "Bajada", dejando solo `⬆️ Subida` y `⬇️ Bajada` para ahorrar espacio horizontal y evitar empujar la grilla.
- **Grilla de Equipamiento y Vehículo Adaptativa**: Configurar la grilla de equipamiento (`4x4`, `Cadenas`, `Parrilla`) con `min-w-0`, textos compactos / responsivos y padding reducido en móvil para garantizar que no exceda el ancho útil del modal en pantallas pequeñas.
- **Contención de Ancho y Padding del Modal**: Agregar `min-w-0` e `inputs` con ancho flexible en grillas de fecha/hora, aplicar `overflow-x-hidden` al `<form>` del modal, y ajustar el padding móvil del modal a `p-4 sm:p-6`.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `trip-publishing`: Ajustes de layout responsivo, simplificación de etiquetas de dirección en móvil y prevención de desbordamiento horizontal en el modal de publicación.

## Impact

- `src/components/PublishModal.tsx`: Ajustes de clases CSS responsivas (Tailwind), simplificación condicional o responsiva de labels en móvil, y contención de overflow.
