## Context

Quempo/Faredeo es una plataforma de carpooling para viajes a centros de esquí (Farellones, Valle Nevado, La Parva, El Colorado). La confianza es el motor principal para que los usuarios decidan compartir auto con extraños. Se requiere implementar un sistema de reputación basado en reseñas post-viaje y un sistema de insignias (badges) de confianza para destacar a conductores frecuentes, expertos en cadenas de nieve y usuarios completamente verificados.

## Goals / Non-Goals

**Goals:**
- Implementar tabla `reviews` en Supabase con restricciones de validación (comentario obligatorio para calificaciones ≤ 3 estrellas).
- Calcular y exponer en tiempo real 3 insignias (badges) clave:
  1. 🏔️ **Conductor Frecuente**: 10+ viajes completados como conductor.
  2. ⛓️ **Experto con Cadenas**: 10+ tags de "Experto con cadenas" recibidos de pasajeros.
  3. ✅ **Verificación Social Completa**: Triada de Google Auth + WhatsApp registrado + Instagram handle enlazado.
- Crear el componente modal `ReviewModal` para el flujo de evaluación simple y rápido post-viaje.
- Integrar indicadores de reputación e insignias en `TripCard`, `TripDetailModal` y `ProfileModal`.

**Non-Goals:**
- Evaluaciones bidireccionales (el conductor calificando al pasajero está fuera de alcance por ahora).
- Sistema de disputas avanzadas o moderación compleja de comentarios en esta fase.
- Sistema de reseñas a oscuras (blind reviews); las reseñas son públicas inmediatamente tras ser enviadas.

## Decisions

### 1. Modelo de Datos en Supabase (Tabla `reviews` + Campos en `profiles`)
- **Decisión**: Crear una tabla `reviews` para almacenar cada evaluación individual y mantener agregados en la vista/tabla `profiles` (o función RPC/trigger) para rápida lectura sin joins costosos en cada render.
- **Estructura `reviews`**:
  - `id` (uuid, PK)
  - `trip_id` (uuid, FK a `trips`)
  - `reviewer_id` (uuid, FK a `profiles` - pasajero)
  - `driver_id` (uuid, FK a `profiles` - conductor)
  - `rating` (integer, 1 a 5)
  - `tags` (text[], e.g., `['cadenas', 'puntual', 'manejo_seguro', 'espacio_equipos', 'buena_onda']`)
  - `comment` (text, opcional si rating >= 4, obligatorio si rating <= 3)
  - `created_at` (timestamptz)

### 2. Cálculo Dinámico vs Almacenamiento de Badges
- **Decisión**: Calcular las insignias mediante una función helper o consulta RPC en Supabase (`get_user_reputation(user_id)`), devolviendo:
  - `rating_avg`: Promedio de estrellas.
  - `rating_count`: Cantidad total de reseñas recibidas.
  - `tags_count`: Conteo por cada tag recibido.
  - `badges`: Array de insignias activas `['frecuente', 'experto_cadenas', 'verificado_completo']`.
- **Alternativas consideradas**: Guardar flags booleanos estáticos en `profiles`. Se descartó porque requiere triggers complejos de sync cada vez que se publica un viaje o cambia el perfil.

### 3. Experiencia de Usuario (UI/UX) & Validaciones
- **Modal de Reseñas (`ReviewModal`)**:
  - Selección de estrellas (1-5). Si se presiona 1, 2 o 3, el campo de texto se marca como `required` con mensaje descriptivo ("Por favor indícanos qué se puede mejorar").
  - Grilla de chips clicables para selección rápida de tags.
- **Integración Visual**:
  - `TripCard`: Mini cápsula con `★ 4.9 (14)` y chips reducidos con tooltip.
  - `TripDetailModal`: Tarjeta de reputación del conductor con sus badges destacados y los 3 tags más comunes.
  - `ProfileModal`: Pestaña dedicada a mostrar la reputación del usuario.

## Risks / Trade-offs

- **[Riesgo] Spam de reseñas por viajes no realizados** → **Mitigación**: Validar mediante política de RLS en Supabase que sólo pasajeros con reserva confirmada en un viaje completado puedan insertar un registro en `reviews`.
- **[Riesgo] Performance de conteos al escalar** → **Mitigación**: Si la cantidad de reseñas aumenta significativamente, se creará una vista materializada o tabla resumen de stats por conductor.
