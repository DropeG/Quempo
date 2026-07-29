# mobile-aside-compact-row Specification

## Purpose
TBD - created by archiving change mobile-aside-cards-compact. Update Purpose after archive.
## Requirements
### Requirement: Aside panels en fila compacta de 2 columnas en mobile
En viewports menores a 1024px, el Panel 1 (Ruta de Viaje) y el Panel 2 (Conduces a la cordillera) SHALL mostrarse en un layout de 2 columnas iguales, de modo que ambas cards quepan en una sola fila visible y Viajes Disponibles aparezca inmediatamente debajo sin requerir scroll.

#### Scenario: Cards lado a lado en mobile
- **WHEN** el usuario carga la página en un dispositivo con viewport < 1024px
- **THEN** las cards de Ruta de Viaje y Conduces a la cordillera aparecen una al lado de la otra en una fila de 2 columnas

#### Scenario: Viajes Disponibles inmediatamente visible
- **WHEN** el usuario carga la página en un dispositivo con viewport < 1024px
- **THEN** la sección "🔍 Viajes Disponibles" es visible sin necesidad de scroll, inmediatamente debajo de la fila de cards

#### Scenario: Texto descriptivo oculto en mobile para Panel 2
- **WHEN** el usuario ve la card de "Conduces a la cordillera" en mobile
- **THEN** el párrafo descriptivo está oculto y solo se muestra el título y el botón CTA "Publicar Mi Viaje"

#### Scenario: Desktop sin cambio
- **WHEN** el usuario accede desde un viewport ≥ 1024px
- **THEN** el layout del aside es idéntico al estado anterior: cards apiladas verticalmente en la columna izquierda

