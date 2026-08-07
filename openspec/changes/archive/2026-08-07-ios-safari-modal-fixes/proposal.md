# Proposal: iOS Safari Compatibility & Publish Modal Cleanup

## Why

En dispositivos Apple (Safari Mobile iOS), el renderizado interno de WebKit impone restricciones de alineación y min-width en `<input type="date">` y `<input type="time">` (`::-webkit-date-and-time-value`), así como scroll elástico (rubber-band) al deslizar sobre overlays fijos (`fixed inset-0`). Además, el usuario simplificó la captura de Instagram en `PublishModal.tsx` para heredarlo automáticamente del perfil sin solicitarlo de nuevo en el formulario de publicación.

## What Changes

- **Reset WebKit para Date/Time en iOS Safari**: Agregar estilos globales en `src/app/globals.css` para `input[type="date"]::-webkit-date-and-time-value` y `input[type="time"]::-webkit-date-and-time-value` (`text-align: left`, `min-height: 1em`, padding ajustado) previniendo que WebKit en iOS imponga min-width interno.
- **Desactivar Scroll Elástico (Rubber-band) en Modal**: Aplicar `overscroll-x-none touch-pan-y` en la capa de fondo fija (`backdrop`) del `PublishModal.tsx` para evitar que gestos táctiles diagonales en iPhone activen el rebote de pantalla de Safari.
- **Formulario de Publicación Limpio (Heredar Instagram)**: Confirmar la eliminación del campo redundante de Instagram en `PublishModal.tsx` heredando el handle automáticamente desde el perfil del usuario.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `trip-publishing`: Ajustes de compatibilidad nativa con iOS Safari WebKit y simplificación de campos de contacto en el formulario de publicación.

## Impact

- `src/app/globals.css`: Adición de reglas de reseteo para pseudo-elementos `::-webkit-date-and-time-value`.
- `src/components/PublishModal.tsx`: Adición de clases de contención de gestos táctiles e integración de la simplificación de Instagram.
