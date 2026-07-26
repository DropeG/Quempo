## ADDED Requirements

### Requirement: Layout Responsivo Dividido por Roles (Buscar vs Publicar)
La aplicación DEBE presentar una interfaz estructurada con una clara separación entre los controles de ruta/publicación y la sección de búsqueda/listado de viajes disponibles.

#### Scenario: Visualización en Dispositivos Móviles
- **WHEN** un usuario accede a la aplicación desde un dispositivo móvil (< 768px)
- **THEN** la interfaz muestra secuencialmente: 1) El selector de ruta (Santiago ⇆ Centro), 2) El botón/card prominente de Publicar Viaje, y 3) La sección explícitamente titulada "Buscar Viajes Disponibles" con sus filtros por día y la lista de viajes.

#### Scenario: Visualización en Computadores de Escritorio
- **WHEN** un usuario accede a la aplicación desde una pantalla de escritorio (≥ 1024px)
- **THEN** la interfaz se organiza en un layout de 2 columnas: la columna izquierda fija (sticky) contiene la ruta, el botón de publicar viaje y los filtros por día; la columna derecha despliega los viajes disponibles en una parrilla de 2 a 3 columnas.

### Requirement: Alta Densidad Visual de Tarjetas en Mobile
La aplicación DEBE mostrar las tarjetas de viaje (`TripCard`) en un formato compacto en móviles para asegurar la visibilidad inicial de múltiples viajes.

#### Scenario: Visibilidad de viajes sin scroll excesivo en móviles
- **WHEN** el usuario navega en la vista móvil de viajes disponibles
- **THEN** las tarjetas de viaje ocupan un alto vertical optimizado permitiendo visualizar al menos 3 publicaciones en el área visible inicial del viewport.
