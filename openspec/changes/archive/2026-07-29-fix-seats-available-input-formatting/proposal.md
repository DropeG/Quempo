## Why

Al ingresar "2" en el campo de "Asientos Disponibles" del formulario para publicar o editar viaje, el valor se muestra como "02" en lugar de "2". Esto se debe a que la conversión o inicialización del estado y del evento `onChange` o la conversión a texto genera un formateo de relleno con ceros a la izquierda (leading zero) en la entrada numérica.

## What Changes

- Sanitización y formato limpio del valor numérico en el input de `seatsAvailable` en `PublishModal.tsx`.
- Asegurar que al escribir números de un solo dígito (ej: 2) se muestre directamente como "2" y no "02".
- Manejo correcto de valores vacíos o reseteos al borrar el input para evitar que quede atascado en `0` o genere `02`.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `trip-publishing`: El campo de entrada de asientos disponibles debe formatear y sanitizar números enteros sin ceros a la izquierda precedentes.

## Impact

- `src/components/PublishModal.tsx`: Ajuste en el manejo del estado `seatsAvailable` y la entrada de texto/número.
