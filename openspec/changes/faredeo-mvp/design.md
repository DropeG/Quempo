## Context

Faredeo es una aplicación web de carpooling bi-direccional orientada a los viajes hacia los centros de ski de Santiago, Chile (Farellones, El Colorado, La Parva, Valle Nevado). El objetivo principal es ofrecer una solución gratuita de operar ($0/mes), con una interfaz ultra-simple e intuitiva inspirada en la UX de `surfari.cl` (Mobile-First, selector de sentido 1-tap, selección rápida de fecha) y alta confianza mediante autenticación con Google y contacto directo vía WhatsApp.

## Goals / Non-Goals

**Goals:**
- Operación 100% gratuita utilizando Vercel (Hosting), Supabase (PostgreSQL DB + Auth), y WhatsApp Deep Links (`wa.me`).
- Experiencia de usuario ultra intuitiva y rápida: navegación e inspección de viajes en menos de 2 segundos.
- Selector de sentido 1-tap `Santiago ⇄ Centros de Ski` (`Subida ⬆️` vs `Bajada ⬇️`).
- Chips horizontales de fecha rápida (`Hoy`, `Mañana`, `Días siguientes`, `📅 Más`).
- Autenticación segura y rápida con Google OAuth para capturar foto de perfil y nombre verificado.
- Filtros específicos de montaña: 4x4/AWD, cadenas de nieve, portaesquís/parrilla, capacidad de equipaje.

**Non-Goals:**
- Procesamiento de pagos in-app (Transbank, Webpay, MercadoPago). El pago/coordinación es 100% directo entre conductor y pasajero.
- Registro de ubicaciones en tiempo real por GPS / Geofencing.
- Sistema complejo de reseñas/estrellas en la primera versión.

## Decisions

### Decision 1: Stack Tecnológico (Next.js + Supabase + Vercel)
- **Elección**: Frontend en Next.js (App Router / React) desplegado en Vercel, con Supabase como backend BaaS.
- **Razonamiento**: Vercel + Supabase es la combinación más sólida para prototipado rápido, performance móvil y costo $0 garantizado.

### Decision 2: Autenticación con Google OAuth vía Supabase Auth
- **Elección**: Login único con Google OAuth.
- **Razonamiento**: Google OAuth provee inicio de sesión en 1 clic y extrae la foto y nombre del usuario, maximizando la confianza percibida sin costo alguno.

### Decision 3: Contacto Directo vía WhatsApp Deep Link (`wa.me`)
- **Elección**: Al presionar "Contactar por WhatsApp", se abre WhatsApp con un mensaje estructurado.
- **Razonamiento**: WhatsApp es la app de mensajería estándar en Chile. Usar enlaces profundos no tiene costo de infraestructura y permite coordinar directamente.

### Decision 4: Modelo de Datos de Viajes en PostgreSQL (Supabase)
Tabla `trips`:
- `id` (uuid, primary key)
- `user_id` (foreign key a `auth.users`)
- `driver_name` (text)
- `driver_avatar` (text)
- `direction` (enum: 'SUBIDA', 'BAJADA', 'ROUND_TRIP')
- `origin` (text: ej. Cantagallo, Mall Sport, Metro Escuela Militar)
- `destination` (enum: 'FARELLONES', 'EL_COLORADO', 'LA_PARVA', 'VALLE_NEVADO')
- `departure_date` (date)
- `departure_time` (time)
- `seats_available` (int)
- `price_per_seat` (int, en CLP)
- `has_4x4` (boolean)
- `has_chains` (boolean)
- `has_rack` (boolean, parrilla/porta-esquís)
- `notes` (text)
- `whatsapp_number` (text)
- `created_at` (timestamp)

### Decision 5: UX Simplificada Estilo Surfari (Direction Swap & Date Chips)
- **Elección**:
  - **Barra Header de Sentido**: `[ Santiago ] ⇆ [ Valle Nevado / Todos ]`. Al presionar `⇆` invierte el origen/destino y conmuta la dirección entre `Subida ⬆️` y `Bajada ⬇️`.
  - **Chips de Fechas**: Fila horizontal con `[ Hoy ] [ Mañana ] [ Día X ] [ 📅 Más ]`.
  - **Formulario de Publicación Pre-llenado**: Al abrir el modal "+ Publicar viaje", el sentido y la fecha se heredan de la vista activa para minimizar la tipeo.
- **Razonamiento**: Elimina menús desplegables innecesarios y reduce la fricción de navegación a 1 toque.

## Risks / Trade-offs

- **[Riesgo] Cancelaciones o falsas publicaciones** → *Mitigación*: Exigir autenticación con Google antes de publicar.
- **[Riesgo] Pérdida de señal en la montaña (Ruta G-21)** → *Mitigación*: Diseñar la web como PWA liviana con cache básico.
- **[Riesgo] Límite de dominios gratis** → *Mitigación*: Utilizar el GitHub Student Developer Pack para vincular un dominio `.me`.
