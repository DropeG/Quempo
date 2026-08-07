## 1. ENV & Server Actions Auth Setup

- [x] 1.1 Configurar variables por defecto para `ADMIN_USERNAME` y `ADMIN_PASSWORD` en el código con soporte para `.env.local`.
- [x] 1.2 Crear Server Actions (`loginAdminAction` y `logoutAdminAction`) en `/src/app/admin/actions.ts` para gestionar cookies de sesión.

## 2. Route Protection & Login Interface

- [x] 2.1 Actualizar la pantalla de login `/admin/login` para llamar a la Server Action de inicio de sesión con usuario y contraseña.
- [x] 2.2 Actualizar la verificación de cookie `quempo_admin_session` en `src/proxy.ts` y en el Server Component `/admin/page.tsx`.

## 3. Dashboard Interface & User Directory

- [x] 3.1 Actualizar `/admin/page.tsx` para cargar directamente los usuarios y métricas desde Supabase usando las credenciales de servidor.
- [x] 3.2 Actualizar el botón de cierre de sesión en `AdminDashboardClient` para llamar a `logoutAdminAction`.
