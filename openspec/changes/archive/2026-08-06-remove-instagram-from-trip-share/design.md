## Context

En `TripDetailModal.tsx`, la sección "Compartir & Difundir Viaje" contiene tres botones: "En Grupo WhatsApp", "Copiar Link" y "Story 9:16". El botón "Story 9:16" genera una imagen canvas para publicar historias en Instagram. Se busca simplificar esta sección eliminando la funcionalidad de la historia de Instagram y manteniendo únicamente los dos accesos directos principales.

## Goals / Non-Goals

**Goals:**
- Eliminar el botón "Story 9:16" y la lógica de generación de canvas `handleDownloadStory` en `TripDetailModal.tsx`.
- Ajustar la grilla de la sección "Compartir & Difundir Viaje" a `grid-cols-1 sm:grid-cols-2`.
- Mantener limpios y optimizados los componentes de compartir.

**Non-Goals:**
- Eliminar la verificación o perfil de Instagram del conductor (`instagram_handle`) que se muestra junto al nombre del conductor en el modal de detalle o en otros componentes.

## Decisions

### Decisión 1: Eliminar `handleDownloadStory` de `TripDetailModal.tsx`
- **Razón**: Al remover el botón de Story 9:16, la función helper que construye el canvas HTML5 de 1080x1920 con degradados, montañas y copos de nieve ya no es requerida en este componente. Eliminarla reduce el tamaño del bundle del componente modal y elimina código innecesario.

### Decisión 2: Ajuste a grilla de 2 columnas en la sección de compartir
- **Razón**: Con dos botones ("En Grupo WhatsApp" y "Copiar Link"), una grilla de 2 columnas en pantallas pequeñas/medianas (`grid-cols-1 sm:grid-cols-2`) distribuye de manera equilibrada y uniforme ambos botones.

## Risks / Trade-offs

- Ningún riesgo técnico relevante. El botón de copia de enlace y el botón de compartir por grupo de WhatsApp seguirán operando de forma 100% independiente.
