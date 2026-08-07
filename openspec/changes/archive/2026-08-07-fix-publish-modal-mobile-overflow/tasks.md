## 1. Responsiveness & Label Simplification

- [x] 1.1 Modificar las etiquetas de los botones "Subida" y "Bajada" en `src/components/PublishModal.tsx` para ocultar la ruta explicativa `(Santiago ➔ Ski)` en pantallas móviles (`<sm`), mostrando únicamente `⬆️ Subida` y `⬇️ Bajada`.
- [x] 1.2 Agregar `min-w-0` a los botones y contenedores de la grilla de selección de dirección.

## 2. Overflow Prevention & Element Sizing

- [x] 2.1 Aplicar `overflow-x-hidden max-w-full` al elemento `<form>` en `src/components/PublishModal.tsx`.
- [x] 2.2 Ajustar la grilla de equipamiento (`4x4`, `Cadenas`, `Parrilla`) agregando `min-w-0`, ajustando el tamaño de texto a `text-[10px] sm:text-xs` y reduciendo paddings en móvil.
- [x] 2.3 Ajustar la grilla de Fecha y Hora permitiendo achicar inputs con `min-w-0` y padding responsivo.
- [x] 2.4 Ajustar el padding horizontal de la tarjeta contenedora del modal en móvil de `p-5` a `p-4 sm:p-6`.

## 3. Verification

- [x] 3.1 Probar la apertura del `PublishModal` simulando dispositivos móviles estrechos (320px - 375px) y verificar ausencia total de scrollbar horizontal.
