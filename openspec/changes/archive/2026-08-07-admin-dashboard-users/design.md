## Context

Para simplificar el acceso del administrador en desarrollo y producción sin depender de permisos complejos de base de datos ni proveedores OAuth externos, el panel de administración utilizará credenciales estáticas de entorno (`ADMIN_USERNAME` y `ADMIN_PASSWORD`) almacenadas en `.env.local` y validadas mediante cookies HTTP-Only de sesión.

## Goals / Non-Goals

**Goals:**
- Proteger la ruta `/admin` validando la existencia de la cookie `quempo_admin_session`.
- Proveer un login simple y directo en `/admin/login` que valide usuario y clave en servidor.
- Cargar métricas globales de Supabase (total usuarios, total viajes) y tabla de directorio con buscador interactivo.

**Non-Goals:**
- Gestión multinivel de permisos o múltiples cuentas administrativas en base de datos.
- Registro o modificación de credenciales de admin desde la UI.

## Decisions

1. **Autenticación por Credenciales de Entorno (ENV)**:
   - *Decisión*: Usar variables de entorno `ADMIN_USERNAME` y `ADMIN_PASSWORD` validadas vía Server Action. Al autenticar con éxito, se establece una cookie HTTP-Only llamada `quempo_admin_session`.
   - *Rationale*: Evita conflictos de RLS, permisos en Supabase Auth o configuraciones OAuth, garantizando acceso directo para el dueño del proyecto.

2. **Carga de Datos en Servidor**:
   - *Decisión*: El Server Component `/admin/page.tsx` utiliza el cliente de Supabase de servidor para obtener perfiles y viajes en la plataforma sin requerir roles adicionales en la tabla `profiles`.

## Risks / Trade-offs

- **[Riesgo] Falta de variables en `.env.local`**: Si no están definidas `ADMIN_USERNAME` y `ADMIN_PASSWORD`, no se podrá iniciar sesión.
  - *Mitigación*: Proveer valores por defecto de fallback (ej: `admin` / `quempo2026`) para entorno de desarrollo local.
