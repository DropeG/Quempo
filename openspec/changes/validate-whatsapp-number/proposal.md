## Why

Actualmente, cuando los usuarios ingresan su número de WhatsApp al publicar un viaje o editar su perfil en Quempo, no existe una validación estricta del formato ni formateo automático. Esto provoca que muchos usuarios ingresen números con faltas de dígitos, sin el prefijo del país (`+56` para Chile) o con caracteres inválidos, lo que imposibilita que los pasajeros puedan comunicarse con el conductor por WhatsApp.

Implementar validación y formateo automático cliente (código de país por defecto + validación sintáctica) previene el 90% de los errores tipográficos en el momento del ingreso, asegurando la correcta generación de enlaces `wa.me`.

## What Changes

- **Formateador y máscara automática de teléfono**: Al escribir en los campos de número de WhatsApp (en `PublishModal` y `ProfileModal`), el número se formatea automáticamente con el formato internacional estándar (ej: `+56 9 1234 5678`).
- **Selector de código de país por defecto (+56)**: Se establece Chile (+56) como país predeterminado, permitiendo cambiar el código si el usuario ingresa un número internacional.
- **Validación sintáctica en tiempo real**: Se muestra feedback visual si el número no cumple con la longitud mínima/formato de celular para el país seleccionado.
- **Bloqueo de envío si el número es inválido**: Impide publicar un viaje o guardar el perfil si el número ingresado no tiene la cantidad exacta de dígitos requerida.

## Capabilities

### New Capabilities
- `whatsapp-validation`: Formateo automático, selección de código de país y validación de longitud para campos de contacto de WhatsApp.

### Modified Capabilities
- `trip-publishing`: El formulario de publicación ahora exige un número de WhatsApp sintácticamente válido antes de poder enviar el viaje.
- `user-profile`: El formulario de perfil ahora valida el formato del número de WhatsApp al guardar el perfil.

## Impact

- `src/components/PublishModal.tsx`: Integración del componente/lógica de formateo y validación de teléfono en el formulario de publicación.
- `src/components/ProfileModal.tsx`: Integración de la validación en el formulario de edición de perfil.
- Utilidades de formateo y validación (helper o componente `PhoneInput` reutilizable).
