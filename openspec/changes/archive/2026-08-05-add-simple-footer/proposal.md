## Why

Quempo carece actualmente de un pie de página (footer) que proporcione accesos de contacto directo, comunidad y transparencia legal. Al ser una plataforma P2P neutral sin comisiones ni intermediación de pagos, es esencial contar con un footer ultra simple, responsive (mobile, tablet/iPad, desktop) y liviano que entregue confianza y accesos rápidos sin recargar la experiencia móvil de los usuarios en la cordillera.

## What Changes

- **Nuevo componente Footer**: Implementar `src/components/Footer.tsx` con estética Clean Alpine Frost & Sky Glass (`backdrop-blur-md`, bordes translúcidos).
- **Página de Términos y Privacidad**: Implementar `src/app/terminos/page.tsx` con un resumen claro en 4 puntos sobre la naturaleza P2P neutral de la plataforma, responsabilidad de los usuarios, privacidad de datos y convivencia comunitaria.
- **Canales de Contacto Directo**:
  - Enlace al Grupo Oficial de WhatsApp de la comunidad Quempo.
  - Enlace directo de soporte a WhatsApp Admin (`+56959365527`).
- **Integración global en Layout**: Incluir el componente `<Footer />` en `src/app/layout.tsx` para que esté presente de forma responsive en toda la aplicación.

## Capabilities

### New Capabilities
- `simple-footer`: Pie de página ultra liviano y responsive para Quempo con marca, enlaces comunitarios de WhatsApp, contacto directo y legal.
- `legal-terms`: Página accesible de Términos y Privacidad (`/terminos`) enfocada en la neutralidad P2P del servicio.

### Modified Capabilities
*Ninguna.*

## Impact

- **Frontend**: Creación de `src/components/Footer.tsx` y `src/app/terminos/page.tsx`. Modificación de `src/app/layout.tsx`.
- **Rendimiento y UX**: Impacto mínimo en peso, optimizado con clases de Tailwind CSS y diseño mobile-first.
