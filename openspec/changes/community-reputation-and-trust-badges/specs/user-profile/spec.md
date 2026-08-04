## ADDED Requirements

### Requirement: Exhibición de Insignias y Stats de Reputación en Mi Perfil
El modal de "Mi Perfil" (`ProfileModal`) SHALL incluir una sección dedicada a "Reputación & Badges" donde el usuario puede visualizar su calificación promedio, total de reseñas recibidas, las insignias que ha desbloqueado (🏔️ Conductor Frecuente, ⛓️ Experto con Cadenas, ✅ Verificación Social Completa) y los badges pendientes de desbloquear.

#### Scenario: Visualización de reputación en Mi Perfil
- **WHEN** un usuario abre el modal "Mi Perfil"
- **THEN** se despliega el resumen de su reputación con sus estrellas promediadas, conteo de evaluaciones recibidas y la grilla de badges activos e inactivos con su estado de progreso.
