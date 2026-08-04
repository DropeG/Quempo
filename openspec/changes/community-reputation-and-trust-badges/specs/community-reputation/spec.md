## ADDED Requirements

### Requirement: Registro de Reseñas Post-Viaje por Pasajeros
El sistema SHALL permitir a los pasajeros calificar al conductor de un viaje completado enviando una evaluación de 1 a 5 estrellas, tags contextuales de selección rápida y un comentario.

#### Scenario: Pasajero envía reseña positiva (4 o 5 estrellas)
- **WHEN** el pasajero selecciona 4 o 5 estrellas, elige los tags "Manejo seguro en nieve" y "Puntual", y presiona "Enviar Reseña"
- **THEN** el sistema guarda la reseña en la base de datos de Supabase, actualiza la reputación del conductor y cierra el modal con notificación de éxito.

#### Scenario: Pasajero envía reseña baja (1 a 3 estrellas) sin comentario
- **WHEN** el pasajero selecciona 1, 2 o 3 estrellas e intenta enviar la reseña sin ingresar un texto en el comentario
- **THEN** el sistema bloquea el envío y muestra un mensaje indicando que el comentario explicativo es obligatorio para calificaciones de 3 estrellas o menos.

#### Scenario: Pasajero envía reseña baja (1 a 3 estrellas) con comentario
- **WHEN** el pasajero selecciona 2 estrellas, escribe la razón en el campo de comentario y presiona "Enviar Reseña"
- **THEN** el sistema valida el texto y guarda la reseña exitosamente.

### Requirement: Recálculo de Badges de Confianza del Conductor
El sistema MUST otorgar dinámicamente insignias de confianza al conductor basadas en su actividad verificada y en la acumulación de tags de su comunidad.

#### Scenario: Otorgamiento de Badge Conductor Frecuente
- **WHEN** un conductor alcanza 10 o más viajes publicados y completados con éxito en la plataforma
- **THEN** el sistema le asigna automáticamente la insignia 🏔️ **Conductor Frecuente**.

#### Scenario: Otorgamiento de Badge Experto con Cadenas
- **WHEN** un conductor acumula 10 o más tags de "Experto con cadenas" otorgados por pasajeros en sus reseñas
- **THEN** el sistema le asigna automáticamente la insignia ⛓️ **Experto con Cadenas**.

### Requirement: Despliegue Visual de Reputación en Feed y Modales
El sistema SHALL mostrar la calificación promedio, el total de reseñas y las insignias activas del conductor en la `TripCard` del feed principal y en el `TripDetailModal`.

#### Scenario: Conductor con reseñas e insignias en TripCard
- **WHEN** un usuario navega por el feed principal de viajes
- **THEN** cada tarjeta de viaje muestra la puntuación del conductor (ej. `★ 4.9 (12)`) y las insignias activas (🏔️ ⛓️ ✅).

#### Scenario: Detalle extendido de reputación en TripDetailModal
- **WHEN** un usuario abre el modal de detalles de un viaje
- **THEN** el modal despliega la tarjeta del conductor con su desglose de estrellas, badges activos y los 3 tags más repetidos por sus pasajeros.
