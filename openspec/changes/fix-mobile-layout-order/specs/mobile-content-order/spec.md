## ADDED Requirements

### Requirement: Mobile content order — Viajes Disponibles primero
En viewports menores a 1024px, la sección de **Viajes Disponibles** SHALL renderizarse visualmente antes que el aside de controles (Ruta de Viaje, Publicar Viaje, Estado Ruta G-21).

#### Scenario: Usuario en mobile ve los viajes primero
- **WHEN** el usuario accede a la página principal desde un dispositivo con viewport < 1024px
- **THEN** la sección "🔍 Viajes Disponibles" aparece en la parte superior del contenido principal, antes del selector de ruta y del botón de publicar

#### Scenario: Desktop no se ve afectado
- **WHEN** el usuario accede desde un viewport ≥ 1024px
- **THEN** el layout de dos columnas se mantiene idéntico: aside en la izquierda (col-4), sección de viajes en la derecha (col-8)
