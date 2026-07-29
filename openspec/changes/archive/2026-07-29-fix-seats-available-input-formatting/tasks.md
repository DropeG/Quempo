## 1. Actualización de Manejo de Estado en PublishModal

- [x] 1.1 Cambiar el estado `seatsAvailable` en `PublishModal.tsx` a `number | string`.
- [x] 1.2 Actualizar el handler `onChange` del input `publish-seats` para usar `parseInt(e.target.value, 10)` o almacenar cadena vacía en caso de borrado.
- [x] 1.3 Agregar un handler `onBlur` en el input `publish-seats` para clamp/sanitizar el valor dentro del rango válido de 1 a 8.
- [x] 1.4 Asegurar que la inserción/edición (`seats_available`) use `Number(seatsAvailable) || 1`.

## 2. Verificación Manual

- [x] 2.1 Verificar en el formulario de publicar que al escribir `2` se muestra directamente `2` y no `02`.
- [x] 2.2 Comprobar que borrar el número y presionar `2` funciona limpiamente sin ceros acumulados.
- [x] 2.3 Verificar que al perder el foco (`onBlur`) un campo vacío se corrige a `1`.
