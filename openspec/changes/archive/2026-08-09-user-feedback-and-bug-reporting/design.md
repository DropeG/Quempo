## Context

Quempo es una plataforma de carpooling de nieve móvil (P2P). Para garantizar una respuesta ágil a fallas tras la publicación, los usuarios necesitan una vía simple e in-app para reportar problemas técnicos o enviar retroalimentación.

## Goals / Non-Goals

**Goals:**
- Proveer un modal responsivo `FeedbackModal` con diseño Glassmorphic ("Clean Alpine Frost").
- Permitir el acceso tanto desde `ProfileModal.tsx` / `Navbar.tsx` (usuarios logueados) como desde `Footer.tsx` (usuarios sin sesión).
- Almacenar los reportes en Supabase en una tabla `feedback_reports` con RLS habilitado.
- Capturar metadata técnica automática: URL, User-Agent, screen width/height, user ID.

**Non-Goals:**
- Crear un panel complejo de gestión de feedback en esta primera iteración (se gestiona directamente desde Supabase dashboard).
- Implementar notificaciones push o integraciones con sistemas externos de ticketing (Jira/Linear).

## Decisions

### Decision 1: Tabla de Supabase con inserción anónima (RLS public insert)
- **Rationale**: Los pasajeros que no inician sesión deben poder enviar reportes sin fricción.
- **Estructura de la tabla `feedback_reports`**:
  - `id`: `uuid` DEFAULT `gen_random_uuid()` PRIMARY KEY
  - `category`: `text` NOT NULL (`'bug'`, `'suggestion'`, `'other'`)
  - `message`: `text` NOT NULL
  - `contact`: `text` NULL (email o teléfono opcional)
  - `user_id`: `uuid` NULL (FK a `auth.users`)
  - `page_url`: `text` NULL
  - `user_agent`: `text` NULL
  - `screen_size`: `text` NULL
  - `created_at`: `timestamptz` DEFAULT `now()`
- **Alternativas consideradas**:
  - *Guardar solo localmente o enviar vía email con mailto*: Descartado por depender del cliente de correo del usuario.
  - *Exigir inicio de sesión*: Descartado para no romper la regla de cero fricción para pasajeros.

### Decision 2: Estado global o compartido para el modal (`isFeedbackModalOpen`)
- **Rationale**: Para poder gatillar el modal desde `Footer.tsx`, `ProfileModal.tsx` o `Navbar.tsx`, podemos manejar un estado o prop en el layout / página principal o un hook liviano de React context/state.

## Risks / Trade-offs

- **Spam en la tabla `feedback_reports`** → Mitigación: Rate limiting básico en frontend (deshabilitar botón tras envío) y validación de longitud mínima de mensaje (≥ 10 caracteres).
