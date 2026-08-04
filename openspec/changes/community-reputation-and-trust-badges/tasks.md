## 1. Base de Datos & Supabase Setup

- [x] 1.1 Crear script de migración SQL para la tabla `reviews` con claves foráneas (`trip_id`, `reviewer_id`, `driver_id`), estrellas, tags y comentario.
- [x] 1.2 Configurar políticas de RLS en Supabase para permitir a los pasajeros insertar reseñas solo en sus viajes completados.
- [x] 1.3 Crear la función RPC o helper de consulta en Supabase para calcular rating promedio, conteo de tags y badges ganados por un conductor.

## 2. Componentes de UI de Reputación e Insignias

- [x] 2.1 Crear componente `TrustBadgeList` para renderizar visualmente las insignias (🏔️ Conductor Frecuente, ⛓️ Experto con Cadenas, ✅ Verificación Social Completa) con sus respectivos tooltips descriptivos.
- [x] 2.2 Crear el modal `ReviewModal` con selección de 1-5 estrellas, grilla de chips para selección rápida de tags y validación de texto obligatorio para calificaciones ≤ 3 estrellas.

## 3. Integración en la Aplicación

- [x] 3.1 Integrar la cápsula de reputación y badges compacta en `TripCard`.
- [x] 3.2 Extender `TripDetailModal` para incluir la tarjeta de reputación del conductor con sus badges y los 3 tags más comunes.
- [x] 3.3 Actualizar `ProfileModal` añadiendo la sección "Reputación & Badges" con el progreso del usuario.
- [x] 3.4 Conectar la acción de reseñar post-viaje en la gestión de viajes completados ("Mis Viajes").

## 4. Verificación y Cierre

- [x] 4.1 Validar que las reseñas de 1 a 3 estrellas exijan comentario y que las de 4-5 estrellas sean opcionales.
- [x] 4.2 Probar el otorgamiento automático de los 3 badges de confianza al cumplir sus condiciones.
