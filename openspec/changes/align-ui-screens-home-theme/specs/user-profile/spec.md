# user-profile Specification

## MODIFIED Requirements

### Requirement: Modal de Mi Perfil
El sistema SHALL proveer una interfaz modal "Mi Perfil" basada en la estética "Clean Alpine Frost & Sky Glass" donde el usuario puede visualizar su avatar de Google, nombre, correo, número de viajes publicados, y modificar su WhatsApp e Instagram.

#### Scenario: Visualización del perfil y viajes publicados
- **WHEN** el usuario hace clic en "Mi perfil" dentro del submenú desplegable
- **THEN** se abre el modal con fondo de cristal esmerilado (`.glass-card`), bordes de luz helada (`border-white/30`), avatar con anillo brillante (`ring-2 ring-white/70`), badge celeste de viajes publicados y campos de texto editables estilizados.
