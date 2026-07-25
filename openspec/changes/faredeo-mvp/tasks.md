## 1. Project Setup & Infrastructure

- [x] 1.1 Configurar proyecto base Next.js con TailwindCSS/CSS modular y TypeScript en la raíz del repositorio.
- [x] 1.2 Configurar cliente de Supabase (Database + Auth) y variables de entorno para desarrollo local y producción.
- [x] 1.3 Crear script de migración SQL para la tabla `trips` con Row Level Security (RLS) en Supabase.

## 2. Authentication & User Profile

- [x] 2.1 Implementar botón de login/logout con Google OAuth usando Supabase Auth.
- [x] 2.2 Crear el componente/header de perfil de usuario con foto, nombre y estado de sesión.

## 3. Trip Discovery & Filtering (Surfari-Style UI)

- [x] 3.1 Implementar la barra superior de origen/destino con botón de intercambio instantáneo (`⇆`) para conmutar `Subida ⬆️` / `Bajada ⬇️`.
- [x] 3.2 Implementar la barra horizontal de chips de fecha rápidos (`[ Hoy ]`, `[ Mañana ]`, `[ Próximos Días ]`, `[ 📅 Más ]`).
- [x] 3.3 Crear tarjetas de viaje ultra-limpias (Mobile-First) con hora destacada, precio, foto del conductor, badges de montaña y cupos disponibles.
- [x] 3.4 Conectar la consulta de Supabase para filtrar dinámicamente según sentido y fecha seleccionada.

## 4. Trip Publishing (Modal/Drawer Integrado)

- [x] 4.1 Crear modal/drawer de publicación de viajes pre-llenando la ruta y fecha activas en la pantalla principal.
- [x] 4.2 Incluir campos de especificaciones de montaña (4x4, cadenas, parrilla, punto de encuentro, cupos y precio).
- [x] 4.3 Conectar inserción de viajes con Supabase y validar sesión activa de Google.

## 5. Contact & Actions

- [x] 5.1 Implementar botón de contacto directo por WhatsApp con mensaje pre-formateado `wa.me`.
- [x] 5.2 Permitir al conductor gestionar y eliminar sus propias publicaciones.

## 6. Polish & Verification

- [x] 6.1 Revisar estética visual responsive (Mobile-First, Snow/Mountain dark mode o light mode impecable).
- [x] 6.2 Verificar flujo completo E2E: Navegar ➔ Permutar Sentido (`⇆`) ➔ Seleccionar Fecha ➔ Publicar / Contactar por WhatsApp.
