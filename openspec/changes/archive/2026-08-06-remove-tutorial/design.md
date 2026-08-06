## Context
La aplicación actualmente cuenta con un onboarding interactivo (tutorial) que se muestra a los usuarios nuevos para guiarles a través de la interfaz. Sin embargo, para simplificar el MVP y evaluar si la aplicación es intuitiva por sí sola, hemos decidido eliminar todo el flujo de onboarding/tutorial.

## Goals / Non-Goals

**Goals:**
- Eliminar la barrera de entrada del tutorial para los usuarios nuevos.
- Remover el código muerto asociado al tutorial (`OnboardingWelcomeModal.tsx`, `SpotlightTourOverlay.tsx`).
- Eliminar los estados y referencias al tutorial en `src/app/page.tsx` y `src/components/ProfileModal.tsx`.

**Non-Goals:**
- No se reemplazarán los componentes por otro tipo de onboarding (ej. tooltips o páginas estáticas).
- No se modificará el comportamiento de autenticación o creación de perfiles.

## Decisions
- **Eliminación limpia:** Se borrarán completamente los archivos `OnboardingWelcomeModal.tsx` y `SpotlightTourOverlay.tsx` en lugar de solo comentarlos o desactivarlos, para mantener el repositorio limpio. Si se requiere reinstaurarlos en el futuro, se pueden recuperar desde el historial de Git.

## Risks / Trade-offs
- **Riesgo:** Los usuarios podrían no saber cómo usar ciertas funcionalidades.
  - **Mitigación:** Monitorear el comportamiento de los usuarios (analíticas o feedback) y decidir si algunas funciones necesitan mejor UX o un rediseño en vez de depender de un tutorial.
