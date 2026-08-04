# mobile-aside-compact-row Specification

## MODIFIED Requirements

### Requirement: Aside panels en fila compacta y selector ultra-compacto en mobile
En viewports menores a 1024px, el Panel 1 (Ruta de Viaje) y el Panel 2 (Conduces a la cordillera) SHALL mostrarse apilados en filas verticales (`flex flex-col`), y el Panel 1 SHALL integrar los controles de Origen y Destino en un selector horizontal ultra-compacto de reducida altura vertical.

#### Scenario: Layout en filas apiladas y Ruta de Viaje ultra-compacta en mobile
- **WHEN** el usuario carga la página en un dispositivo con viewport < 1024px
- **THEN** la card de Ruta de Viaje muestra Origen, Botón Swap y Destino en una sola estructura horizontal ultradelgada de ~60px de alto

#### Scenario: Viajes Disponibles adecuadamente posicionado
- **WHEN** el usuario navega en mobile
- **THEN** la sección "🔍 Viajes Disponibles" aparece visible de inmediato en la pantalla sin requerir scroll excesivo

#### Scenario: Desktop sin cambio
- **WHEN** el usuario accede desde un viewport ≥ 1024px
- **THEN** el Panel 1 conserva las dos cajas verticales grandes apiladas (Origen arriba, Destino abajo) con el separador animado central
