## Why

Para lograr un layout aún más limpio, el botón principal para "Publicar Viaje" debe ubicarse fuera de la tarjeta del Hero (colocado entre la sección Hero y la barra de ruta/sentido), ocupando un diseño ancho y prominente (full-width o barra ancha). Asimismo, se requiere eliminar el botón redundante de "Publicar Viaje" ubicado en el Navbar (superior derecho al lado del perfil de usuario).

## What Changes

- **Reposicionamiento del Botón de Publicar Viaje**:
  - Extraer el botón de dentro de la tarjeta Hero y ubicarlo inmediatamente debajo de ella, como una barra ancha/larga y destacada (`w-full` / max-w-xl).
- **Limpieza en Navbar**:
  - Eliminar el botón "Publicar Viaje" presente en el componente `Navbar.tsx` para dejar únicamente la foto/perfil y login en la esquina superior derecha.

## Capabilities

### Modified Capabilities
- `trip-publishing`: Botón de acción principal amplio situado entre Hero y Filtros de Ruta; Navbar simplificado.

## Impact

- **Frontend**: Ajustes en `src/app/page.tsx` para ubicar el botón fuera de la sección `<section>` del Hero, y edición de `src/components/Navbar.tsx` para remover el botón redundante.
