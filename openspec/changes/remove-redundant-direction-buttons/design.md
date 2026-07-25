## Context

El usuario solicitó eliminar la botonera redundante de dirección (`[ ⬆️ Subida ] [ ⬇️ Bajada ] [ 🔄 Ambos ]`) ubicada bajo el Direction Swap Bar.

## Goals / Non-Goals

**Goals:**
- Remover la barra inferior de botones de dirección en `src/app/page.tsx`.
- Depender únicamente del botón de permuta `⇆` para conmutar la dirección entre `SUBIDA` y `BAJADA`.
- Mantener la estética limpia y con alto espacio en pantalla en dispositivos móviles.

## Decisions

### Decision 1: Eliminación de la Botonera Redundante
- **Elección**: Remover el bloque JSX `<div className="flex items-center gap-1 bg-slate-900/90 ...">...</div>`.
- **Razonamiento**: El botón `⇆` satisface el 100% de la funcionalidad de cambio de sentido en 1 toque.
