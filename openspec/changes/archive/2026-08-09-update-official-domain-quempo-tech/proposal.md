# Change Proposal: Update Official Domain to quempo.tech

## Why
El proyecto Quempo cuenta ahora con el dominio oficial `quempo.tech` (y `www.quempo.tech`). Para ofrecer una imagen de marca coherente, profesional y transmitir máxima confianza al compartir viajes por WhatsApp y redes sociales, es necesario actualizar todas las referencias de fallback y plantillas de texto de `quempo-gilt.vercel.app` hacia `https://quempo.tech`.

## What Changes
- **Fallback URL en Modales de Compartir**: Actualizar el fallback predeterminado de la URL base a `https://quempo.tech` en `PublishSuccessModal.tsx` y `TripDetailModal.tsx`.
- **Plantilla de Mensaje de WhatsApp**: Actualizar el texto pre-llenado que se copia o envía a WhatsApp para utilizar `${baseUrl}` o `https://quempo.tech/` en lugar del dominio anterior `.vercel.app`.
- **Documentación / Spec de Trip Sharing**: Reflejar el dominio oficial en las especificaciones del sistema.

## Impact
- **Usuarios**: Al recibir enlaces de viajes compartidos por WhatsApp, verán `https://quempo.tech/v/[id]`, reforzando la marca oficial.
- **Riesgo**: Ninguno. La funcionalidad de compartir se mantiene idéntica, utilizando dinámicamente `window.location.origin` cuando está disponible en navegador.
