## 1. Actualización de Helpers y Configuración de Países

- [x] 1.1 Definir lista de países (`COUNTRIES`) en `src/lib/phoneUtils.ts` con banderas emojis, nombres, códigos telefónicos (`+56`, `+55`, `+54`, `+1`, etc.) y la opción especial `🌐 Otro país (Manual)`.
- [x] 1.2 Implementar la función `parseStoredPhone(rawPhone)` para desglosar números almacenados E.164 en país seleccionado y número local.

## 2. Creación del Componente Reutilizable `PhoneInput.tsx`

- [x] 2.1 Crear el componente `src/components/PhoneInput.tsx` con el selector desplegable con banderas y el campo de número local.
- [x] 2.2 Agregar soporte para cerrar el desplegable al hacer clic fuera ("Click Outside") y mediante la tecla Escape.
- [x] 2.3 Incluir la opción `🌐 Otro país` en el desplegable que habilite el ingreso manual completo con `+`.
- [x] 2.4 Mostrar estado e indicativo de validaciones sintácticas en tiempo real.

## 3. Integración en Modales de Publicación y Perfil

- [x] 3.1 Reemplazar el input plano de WhatsApp en `PublishModal.tsx` por el nuevo componente `<PhoneInput />`.
- [x] 3.2 Reemplazar el input plano de WhatsApp en `ProfileModal.tsx` por el nuevo componente `<PhoneInput />`.

## 4. Verificación de UI y UX

- [x] 4.1 Probar la selección de Chile 🇨🇱 e ingresar 9 dígitos locales (ej: `959365527`), verificando que se guarde como `+56959365527`.
- [x] 4.2 Probar la selección de `🌐 Otro país` e ingresar un número internacional completo con `+` (ej: `+61412345678`).
- [x] 4.3 Verificación de typecheck (`npx tsc --noEmit`).
