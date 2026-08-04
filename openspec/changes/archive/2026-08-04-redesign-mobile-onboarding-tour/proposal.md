## Why

El tutorial actual fue diseñado con la lógica de un tour Spotlight flotante estilo Desktop. En dispositivos móviles (celulares), este enfoque falla gravemente: las tarjetas flotantes tapan los elementos resaltados, los despliegues de pantalla saltan de manera brusca, y la apertura de modales genera colisiones de capas `z-index` y bloqueos de scroll. Dado que Quempo está enfocado principalmente en usuarios de celular, es fundamental rediseñar el tutorial exclusivamente para mobile con una arquitectura nativa, limpia y de excelente ergonomía táctil.

## What Changes

- **Rediseño Exclusivo Mobile de Spotlight Tour (`SpotlightTourOverlay.tsx`)**: Reemplazar las tarjetas flotantes con coordenadas fijas por una **Bottom Sheet** anclada en la parte inferior de la pantalla (`fixed bottom-0 z-[220] pb-safe`), con bordes especulares helados, barra de progreso con dots y áreas táctiles de al menos 48px.
- **Desplazamiento Suave Inteligente**: Auto-scroll que centra los objetivos en la mitad superior del visor (`block: 'start'`), asegurando que la tarjeta inferior NUNCA tape el elemento destacado.
- **Manejo Nativo de Vistas Previas**: Evitar colisiones de modales en pantalla completa durante los Pasos 4 y 5 mediante resaltado focalizado y vistas previas integradas en la interfaz de usuario de celular.
- **Gestión de Viewport Dinámico (`100dvh` & Safe Areas)**: Ajustar la superposición a `100dvh` y padding adaptativo `env(safe-area-inset-bottom)` para evitar recortes por barras de navegación en iOS Safari y Android Chrome.
- **Soporte de Gestos y Acceso Rápido**: Incorporar soporte para avance/retroceso táctil y mantener siempre accesible el botón "Omitir".

## Capabilities

### New Capabilities
- Ninguna (se modifica la capacidad existente).

### Modified Capabilities
- `onboarding-tour`: Rediseño exclusivo para celular de la experiencia del tutorial paso a paso con arquitectura Bottom Sheet anclada, scroll suave a la zona superior y controles de ergonomía móvil.

## Impact

- Componentes afectados: `src/components/onboarding/SpotlightTourOverlay.tsx`, `src/components/onboarding/OnboardingWelcomeModal.tsx`, `src/components/onboarding/useOnboardingTour.ts` y `src/app/page.tsx`.
- Estilos y Layout: Inclusión de utilidades `pb-safe`, `dvh` y tokens de cristal helado (*Clean Alpine Frost & Sky Glass*).
