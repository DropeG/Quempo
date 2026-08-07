## Why

El creador/administrador de Quempo necesita un panel interno para visualizar los usuarios registrados, buscar cuentas específicas y seguir métricas clave del uso de la app (total de usuarios registrados y viajes creados) con un sistema de autenticación de admin independiente, sencillo y basado en credenciales configurables en `.env.local`.

## What Changes

- **Nueva ruta de autenticación de admin (`/admin/login`)**: Pantalla dedicada de inicio de sesión con campos de usuario y contraseña.
- **Autenticación por Credenciales Fijas (ENV)**: Verificación directa de usuario y contraseña contra `ADMIN_USERNAME` y `ADMIN_PASSWORD` en `.env.local` con sesión basada en cookie HTTP-only (`quempo_admin_session`).
- **Protección de Rutas (`/admin`)**: Verificación de cookie de sesión admin en middleware/servidor.
- **Métricas de Plataforma**: Tarjetas de resumen con Total de Usuarios Registrados y Total de Viajes Publicados.
- **Tabla de Usuarios**: Listado de usuarios con avatar, nombre, email, fecha de registro y cantidad de viajes creados, con un buscador en tiempo real.

## Capabilities

### New Capabilities
- `admin-dashboard`: Panel de administración restringido para visualizar la lista de usuarios de la plataforma, métricas globales de actividad y gestionar accesos mediante credenciales fijas de entorno.

### Modified Capabilities
*(Ninguna)*

## Impact

- **Seguridad / Auth**: Autenticación vía cookies de sesión firmadas/HTTP-only usando variables de entorno `ADMIN_USERNAME` y `ADMIN_PASSWORD`.
- **Rutas Next.js**: `/src/app/admin/page.tsx`, `/src/app/admin/login/page.tsx` y Server Action de autenticación `/src/app/admin/actions.ts`.
- **Variables de Entorno**: Agregado de `ADMIN_USERNAME` y `ADMIN_PASSWORD` en `.env.local`.
