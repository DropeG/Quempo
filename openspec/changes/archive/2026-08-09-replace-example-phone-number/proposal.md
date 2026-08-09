## Why

Actualmente, el número real del desarrollador/administrador aparece como placeholder por defecto y texto de ejemplo al interactuar con el selector de teléfono (`PhoneInput.tsx`, `phoneUtils.ts`). Es necesario cambiar únicamente esos textos de ejemplo por un número ficticio (ej: `9 1234 5678`), manteniendo intactos los enlaces reales de contacto en el pie de página.

## What Changes

- **Reemplazo de Placeholders de Entrada**: Cambiar las constantes de marcador de posición y ejemplos en `src/lib/phoneUtils.ts` (objeto `CL`) de `9 5936 5527` a un número de ejemplo neutro `9 1234 5678`.
- **Texto de Ayuda en Formulario**: Actualizar la sugerencia de ejemplo en `src/components/PhoneInput.tsx` a `(ej: 9 1234 5678)`.
- **Especificaciones**: Actualizar los escenarios de ejemplo en `whatsapp-country-selector`.

## Capabilities

### New Capabilities
- Ninguna.

### Modified Capabilities
- `whatsapp-country-selector`: Los textos de ejemplo y placeholders del selector de país deben utilizar un número neutro no personal (`9 1234 5678`).

## Impact

- **Código fuente**: `src/lib/phoneUtils.ts`, `src/components/PhoneInput.tsx`.
- **Footer y Enlaces de Contacto**: Permanecen sin cambios.
