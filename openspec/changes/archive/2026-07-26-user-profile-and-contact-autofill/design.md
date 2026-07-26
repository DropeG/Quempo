## Context

Faredeo permite a conductores publicar viajes y a pasajeros conectarse con ellos. Actualmente, el número de WhatsApp e Instagram se ingresan en cada publicación de viaje sin persistencia. Además, el avatar del usuario en el navbar carece de un menú desplegable para acceder al perfil o cerrar sesión con una interfaz cuidada.

## Goals / Non-Goals

**Goals:**
- Crear la tabla `public.profiles` en Supabase con RLS para almacenar `id`, `full_name`, `avatar_url`, `whatsapp_number`, e `instagram_handle`.
- Crear el componente `ProfileModal.tsx` que muestra la foto de Google, nombre, email, contador de viajes publicados, y campos editables para WhatsApp e Instagram.
- Crear el submenú flotante desplegable en `Navbar.tsx` con accesos a "Mi perfil" y un botón de "Cerrar sesión" diferenciado en todo rojo suave con borde sutil.
- Auto-cargar los datos de perfil (WhatsApp e Instagram) en `PublishModal.tsx` al abrir el formulario, y actualizar la tabla de perfiles al enviar un nuevo viaje.

**Non-Goals:**
- Sistema completo de calificación o reseñas de conductores (será abordado en otra etapa).
- Cambio de correo o autenticación nativa por password (el login se mantiene exclusivamente con Google OAuth).

## Decisions

1. **Persistencia en Supabase `public.profiles` (Opción A)**:
   - *Decisión*: Se creará la migración SQL `20260726_create_profiles.sql` en `supabase/migrations`.
   - *Razón*: Mantiene la estructura limpia en PostgreSQL con políticas RLS (`public` puede leer perfiles básicos si es necesario, `authenticated` solo modifica su propio perfil).
   - *Alternativa descartada*: Guardar solo en `user_metadata` de Supabase Auth (menos flexible para futuras relaciones en la base de datos).

2. **Diseño del Submenú Desplegable en `Navbar.tsx`**:
   - *Decisión*: Al hacer clic en el contenedor del usuario en la barra de navegación, se alterna el estado `isMenuOpen`. El menú se posiciona flotante con `absolute right-0 mt-2 w-56`.
   - *Botón "Cerrar sesión"*: Fondo `bg-rose-500/10`, texto `text-rose-300`, borde `border border-rose-500/20`, hover `hover:bg-rose-500/20`.

3. **Cálculo dinámico de Viajes Publicados**:
   - *Decisión*: Al abrir `ProfileModal`, se consulta `supabase.from('trips').select('id', { count: 'exact', head: true }).eq('user_id', user.id)`.

## Risks / Trade-offs

- **[Risk] Usuarios existentes sin perfil registrado en Supabase**:
  - *Mitigación*: En el modal de publicación y en el modal de perfil, si la consulta a `profiles` no devuelve fila, se realiza un `UPSERT` automático al momento de guardar o publicar, utilizando la metadata del usuario de Google Auth (`full_name`, `avatar_url`).
