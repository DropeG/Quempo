## Why

Actualmente la página principal Home (`/`) implementa el sistema de diseño **"Clean Alpine Frost & Sky Glass"** documentado en `DESIGN.md` (tarjetas translúcidas con desenfoque de nieve `backdrop-filter: blur(26px)`, bordes especulares cristalinos, paleta en celeste `#38BDF8`, blanco y azul marino `#0F2942`). Sin embargo, las experiencias secundarias esenciales —el modal de **Publicar Mi Viaje**, el **Tutorial de Onboarding** y el modal de **Mi Perfil**— aún conservan inconsistencias de diseño, contraste o estilos opacos/clásicos. Rediseñar y alinear estas pantallas garantiza una experiencia unificada, estética de alta gama ("out-of-distribution craft") y responsividad perfecta en Desktop y Mobile.

## What Changes

- **Rediseño del modal 'Publicar Mi Viaje' (`PublishModal.tsx`)**: Transformar la estructura y estilos del modal con contenedores Frosted Snow Glass, bordes cristalinos `border-white/30`, acentos en celeste alpino `#38BDF8`, botones CTA de alto contraste y soporte de scroll suave en escritorio/móvil.
- **Rediseño del tour 'El Tutorial' (`SpotlightTourOverlay.tsx` y `OnboardingWelcomeModal.tsx`)**: Estilizar las tarjetas de tooltip del tour paso a paso, modales de bienvenida y finalización con estética de cristal helado, botones celestes, tipografía bold en DM Sans y sombras difusas profundas.
- **Rediseño del modal 'Mi Perfil' (`ProfileModal.tsx`)**: Refactorizar la presentación de datos del usuario (avatar, nombre, WhatsApp, Instagram, viajes publicados) aplicando tarjetas esmeriladas, badges en celeste e insignias de verificación brillantes.
- **Alineación responsiva completa**: Asegurar padding, tipografía escalable (`clamp` / utilidades Tailwind), comportamientos táctiles y legibilidad impecable tanto en dispositivos móviles como en pantallas Desktop anchas.

## Capabilities

### New Capabilities

*(No se introducen nuevas capacidades funcionales; se trata de una alineación visual y estética de capacidades existentes).*

### Modified Capabilities

- `trip-publishing`: Actualizar los requerimientos de diseño del modal de publicación para cumplir rigurosamente con los tokens de `DESIGN.md`.
- `onboarding-tour`: Actualizar la interfaz y overlays del tutorial con estética de cristal helado y tipografía `font-black`.
- `user-profile`: Actualizar el diseño del modal de perfil de usuario para coincidir con los tokens de refracción, bordes cristalinos y tipografía del Home.

## Impact

- **Componentes modificados**: `src/components/PublishModal.tsx`, `src/components/ProfileModal.tsx`, `src/components/onboarding/OnboardingWelcomeModal.tsx`, `src/components/onboarding/SpotlightTourOverlay.tsx`.
- **Estilos / Design Tokens**: Uso de clases globales de `src/app/globals.css` (`.glass-card`, `.accent-bg`, etc.) y tokens definidos en `DESIGN.md`.
- **APIs & Supabase**: Sin cambios en contratos de API ni base de datos; preservación del 100% de la funcionalidad actual.
