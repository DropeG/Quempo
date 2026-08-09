## Why

Al abrir el modal de publicación de viaje (`PublishModal`) o el perfil (`ProfileModal`) estando autenticado, el número de WhatsApp guardado previamente en la cuenta no se refleja inmediatamente en el componente `PhoneInput`. Esto ocurre porque los datos del perfil se cargan de forma asíncrona desde Supabase después de que `PhoneInput` ya inicializó su estado interno bloqueado con una cadena vacía. Al cerrar y reabrir el modal, el número sí aparece correctamente en verde porque los datos ya residen en la memoria local del componente padre.

## What Changes

- **Sincronización Asíncrona en `PhoneInput`**: Actualizar la lógica del componente `PhoneInput.tsx` para responder adecuadamente a cambios asíncronos en el prop `value` provenientes del componente padre, parseando y actualizando el número local y código de país cuando el prop difiera del estado interno actual.
- **Auto-rellenado reactivo en `PublishModal` y `ProfileModal`**: Garantizar que el número cargado desde `public.profiles` se refleje de manera instantánea y transparente en la primera apertura sin requerir cerrar y volver a abrir la ventana modal.

## Capabilities

### New Capabilities

*(Ninguna)*

### Modified Capabilities

- `whatsapp-country-selector`: Permitir la actualización y sincronización reactiva del prop `value` recibido asíncronamente desde la base de datos o estado superior.
- `contact-autofill`: Garantizar que la precarga asíncrona de WhatsApp se muestre de inmediato en la primera renderización del formulario.

## Impact

- `src/components/PhoneInput.tsx`: Actualización del ciclo de vida (`useEffect`) para sincronizar el estado local cuando `value` cambia desde el componente padre.
- `src/components/PublishModal.tsx` y `src/components/ProfileModal.tsx`: Sincronización limpia al recibir datos del usuario sin comportamientos erráticos ni cierres de modal requeridos.
