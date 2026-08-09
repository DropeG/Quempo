## 1. Supabase Schema & Backend

- [x] 1.1 Crear script de migración SQL para la tabla `feedback_reports` con política RLS de inserción pública y select restringido.
- [x] 1.2 Ejecutar la migración o aplicar la tabla en Supabase.
- [x] 1.3 Crear Server Action o helper en `src/app/actions/feedback.ts` para recibir y procesar el reporte con captura de metadata.

## 2. Componente de UI (FeedbackModal)

- [x] 2.1 Crear el componente `src/components/FeedbackModal.tsx` con diseño Alpine Frost (Glassmorphism), selector de categoría (Error, Sugerencia, Otro), textarea de mensaje y campo opcional de contacto.
- [x] 2.2 Implementar captura automática de metadata (URL, User-Agent, pantalla, User ID).
- [x] 2.3 Manejar estados de carga, éxito y error con retroalimentación visual clara.

## 3. Integración en Navegación y Perfil

- [x] 3.1 Integrar sección/botón de feedback en `src/components/ProfileModal.tsx` ("Mi Perfil").
- [x] 3.2 Añadir opción "Reportar error / Feedback" en el menú desplegable de usuario en `src/components/Navbar.tsx`.
- [x] 3.3 Añadir enlace "Reportar Problema" en `src/components/Footer.tsx`.
- [x] 3.4 Conectar el estado de apertura global/vía callback para el modal `FeedbackModal`.

## 4. Verificación & Pruebas

- [x] 4.1 Probar envío de reportes como usuario autenticado (conductor) y validar captura de `user_id`.
- [x] 4.2 Probar envío de reportes como pasajero (sin sesión) desde el Footer.
- [x] 4.3 Verificar el correcto almacenamiento en Supabase.
