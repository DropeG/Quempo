## Why
Queremos simplificar el producto eliminando el tutorial actual en todas sus versiones (Mobile, iPad y Desktop). Esto permitirá lanzar una versión más limpia, evaluar si la aplicación es lo suficientemente intuitiva por sí sola y reducir la fricción inicial para los nuevos usuarios. 

## What Changes
- Eliminar componentes de UI asociados al onboarding (`OnboardingWelcomeModal.tsx`, `SpotlightTourOverlay.tsx`).
- Eliminar el estado y lógica del modo tutorial de la página principal (`src/app/page.tsx`).
- Remover el botón de "Ver tutorial de inicio (Replay)" del Perfil de Usuario (`src/components/ProfileModal.tsx`).

## Capabilities

### New Capabilities

### Modified Capabilities

## Impact
- Componentes de UI de onboarding serán eliminados.
- Se simplifica `src/app/page.tsx` al remover la lógica de tutorial.
- Se simplifica `src/components/ProfileModal.tsx` al remover el botón de replay de tutorial.
