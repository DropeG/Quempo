## Why

En una plataforma de carpooling de montaña (Faredeo/Quempo) donde los usuarios comparten vehículos con desconocidos llevando equipamiento costoso por caminos de nieve/hielo, generar un alto nivel de confianza es el factor determinante para la adopción. Actualmente no existe un mecanismo para que los pasajeros evalúen la experiencia de viaje ni un sistema visual de insignias (badges) que certifique la experiencia del conductor en montaña y su verificación social.

## What Changes

- **Flujo de Reseñas Post-Viaje**: Permitir a los pasajeros calificar al conductor (1 a 5 estrellas) con tags de selección rápida ("Puntual", "Manejo seguro en nieve", "Espacio para tablas/skis", etc.).
- **Comentario Obligatorio en Calificaciones Bajas**: Si la calificación es de 1 a 3 estrellas, se exige un comentario en texto para justificar la puntuación. Para 4 y 5 estrellas, el texto es opcional.
- **Badges de Conductor Automáticos & Ganados**:
  - 🏔️ **Conductor Frecuente**: Se otorga automáticamente al completar 10+ viajes como conductor.
  - ⛓️ **Experto con Cadenas**: Se otorga automáticamente al recibir 10 tags de "Experto con cadenas" otorgados por pasajeros post-viaje.
  - ✅ **Verificación Social Completa**: Se enciende automáticamente cuando el usuario completa su perfil con Google Auth, WhatsApp verificado e Instagram registrado.
- **Visualización de Reputación**: Integrar la calificación promedio, el total de reseñas y las insignias de confianza en la `TripCard` (feed principal), `TripDetailModal` (vista previa de viaje) y `ProfileModal` (perfil de usuario).

## Capabilities

### New Capabilities
- `community-reputation`: Sistema de calificación (reviews 1-5 estrellas, tags contextuales post-viaje) y otorgamiento dinámico de insignias de confianza (badges).

### Modified Capabilities
- `user-profile`: Muestra las insignias obtenidas, calificación promedio acumulada y desglose de tags recibidos en el perfil del usuario.
- `driver-social-verification`: Expande la verificación social integrando la regla del badge `✅ Verificación Social Completa` al consolidar Google, WhatsApp e Instagram.

## Impact

- **Base de Datos (Supabase)**:
  - Nueva tabla `reviews` (guardando `trip_id`, `reviewer_id`, `driver_id`, `rating`, `tags`, `comment`).
  - Nueva tabla o estructura para acumular estadísticas/badges en `profiles` (o `user_badges`).
- **Componentes UI**:
  - `TripCard`: Renderizado de badge compacto y estrellas.
  - `TripDetailModal`: Bloque extendido de reputación y badges del conductor.
  - `ProfileModal`: Pestaña/sección de "Reputación & Badges".
  - Nuevo modal `ReviewModal`: Trigger post-viaje para que el pasajero califique al conductor.
