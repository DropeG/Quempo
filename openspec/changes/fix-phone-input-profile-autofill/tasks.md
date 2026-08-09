## 1. Sincronización Reactiva en PhoneInput

- [x] 1.1 Actualizar `PhoneInput.tsx` para sincronizar el estado interno (`localNumber` y `selectedCountryCode`) cuando el prop `value` cambia asíncronamente desde el padre.
- [x] 1.2 Notificar a través del callback `onChange` el nuevo estado parseado y su validez inmediatamente al actualizar `value`.

## 2. Verificación en Modales y Formularios

- [x] 2.1 Probar la apertura directa de `PublishModal.tsx` con sesión iniciada y verificar que el número de teléfono del perfil se muestre inmediatamente en verde sin requerir cerrar/reabrir el modal.
- [x] 2.2 Probar la apertura de `ProfileModal.tsx` y confirmar que el auto-rellenado funcione instantáneamente.
- [x] 2.3 Ejecutar validación de compilación del proyecto (`npm run build` o equivalente) para asegurar ausencia de regresiones de tipos.
