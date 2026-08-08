## 1. Helper de Validación y Formateo de Teléfono

- [x] 1.1 Crear `src/lib/phoneUtils.ts` con funciones para formatear, limpiar e inferir el prefijo chileno `+56` si el número ingresado tiene 9 dígitos.
- [x] 1.2 Agregar pruebas/casos de validaciones de longitud (exactamente 9 dígitos para Chile, entre 8 y 15 para internacional con `+`).

## 2. Integración en Formulario de Publicación (`PublishModal`)

- [x] 2.1 Integrar `phoneUtils.ts` en `PublishModal.tsx` para formatear el número de WhatsApp dinámicamente en el input.
- [x] 2.2 Agregar mensaje de feedback de error en tiempo real debajo del campo si el número es incompleto o inválido.
- [x] 2.3 Bloquear la sumisión del formulario de viaje en `handleSubmit` si el teléfono formateado no es válido.

## 3. Integración en Formulario de Perfil (`ProfileModal`)

- [x] 3.1 Integrar `phoneUtils.ts` en `ProfileModal.tsx` para la edición de teléfono de WhatsApp del perfil.
- [x] 3.2 Bloquear el guardado del perfil si el número ingresado no cumple con el formato E.164 o la cantidad de dígitos.

## 4. Verificación de UI y UX

- [x] 4.1 Probar manualmente la publicación con un número corto (ej. `9123456`), verificando que se muestre el error.
- [x] 4.2 Probar con `912345678` y verificar que se guarde correctamente como `+56912345678` produciendo un enlace `wa.me` funcional.
