## Why

Al lanzar Quempo a producción en temporada de ski, ocurrirán errores imprevistos en dispositivos y navegadores reales. Permitir a los usuarios (conductores y pasajeros) enviar reportes de errores (bugs) y sugerencias de manera rápida y sin salir de la app facilitará detectar y resolver problemas de inmediato sin frustrar la experiencia de uso.

## What Changes

- **Nuevo Modal de Feedback (`FeedbackModal.tsx`)**: Modal liviano con formulario simple (tipo de reporte: Error/Sugerencia/Otro, mensaje descriptivo, contacto opcional) y captura automática de metadata técnica (URL, User-Agent, pantalla, usuario logueado).
- **Acceso desde "Mi Perfil" (`ProfileModal.tsx` y Dropdown en `Navbar.tsx`)**: Nueva sección en el modal de perfil y opción en el menú desplegable del Navbar para usuarios autenticados.
- **Acceso desde el Footer (`Footer.tsx`)**: Enlace global "Reportar Problema" en el pie de página para que pasajeros no autenticados también puedan enviar reportes.
- **Tabla de Almacenamiento Supabase (`feedback_reports`)**: Nueva tabla en PostgreSQL para guardar los reportes enviados con RLS para inserción pública.
- **Notificación por Webhook / Email (Opcional)**: Endpoint API / Server Action en Next.js para despachar la notificación en tiempo real.

## Capabilities

### New Capabilities
- `feedback-and-bug-reporting`: Modal interactivo y tabla en Supabase para captura de errores y sugerencias de usuarios con o sin sesión activa.

### Modified Capabilities
- `user-profile`: Incorporación del botón/sección para lanzar el modal de feedback desde Mi Perfil.
- `simple-footer`: Incorporación del enlace a feedback en la barra del pie de página.

## Impact

- **Frontend**: `src/components/FeedbackModal.tsx` (nuevo), `src/components/ProfileModal.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`.
- **Backend / DB**: Nueva tabla `feedback_reports` en Supabase y Server Action en `src/app/actions/feedback.ts`.
- **Compatibilidad**: Sin breaking changes en APIs o flujos existentes.
