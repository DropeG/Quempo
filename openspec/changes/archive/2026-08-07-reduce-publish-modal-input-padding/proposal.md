# Proposal: Reduce Input Padding in Publish Modal

## Why

En el formulario de publicación de viajes (`PublishModal.tsx`), los campos de entrada (`Fecha`, `Hora de Salida`, `Asientos`, `Precio`) tienen un padding izquierdo excesivo (`pl-7 sm:pl-8`, equivalente a 28px-32px). En dispositivos móviles, este padding desplaza el texto del campo demasiado hacia la derecha, provocando que los placeholders nativos del navegador (`dd/mm/aaaa`, `--:--`) choquen contra el borde derecho del input.

## What Changes

- Reducir el padding izquierdo de los campos con icono de `pl-7 sm:pl-8` a `pl-6 sm:pl-7` (o `pl-6` uniforme en móvil) sin alterar la posición de los iconos.
- Ajustar levemente el padding derecho (`pr-1.5`) para maximizar el área útil de lectura en los campos de entrada de la grilla doble.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `trip-publishing`: Ajuste de padding de campos de entrada en el modal de publicación de viajes para evitar que el texto colisione con el borde derecho en pantallas móviles.

## Impact

- `src/components/PublishModal.tsx`: Modificación de clases Tailwind de padding en los inputs de fecha, hora, asientos y precio.
