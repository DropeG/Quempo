## Why

La coordinación y difusión de viajes a Farellones y centros de ski ocurre principalmente en grupos de WhatsApp y redes sociales como Instagram Stories. Proveer herramientas que:
1. Generen un enlace limpio y corto (`/v/id`) que al pegarlo en WhatsApp genere una tarjeta Open Graph (OG) rica con el origen, destino, cupos y precio del viaje.
2. Permitan descargar un banner vertical en formato imagen (9:16) listo para subir como Instagram Story con los datos del viaje.
Esto impulsará la viralidad, aumentará las visitas y facilitará la difusión de los conductores.

## What Changes

- Crear una ruta dinámica de servidor `/v/[id]/page.tsx` que recupere el viaje de la base de datos de Supabase, inyecte metaetiquetas Open Graph personalizadas en el HTML y ejecute una redirección meta/cliente hacia `/?trip=id`.
- Añadir botones de acción "Compartir" en `TripDetailModal.tsx` que ofrezcan:
  - Copiar enlace rápido (o compartir nativo mediante Web Share API).
  - Generar y descargar una imagen de Story de Instagram (canvas estilizado 9:16 con temática alpina de Faredeo).

## Capabilities

### New Capabilities
- `share-trip-link`: Enlace dinámico con metadatos enriquecidos y redirección automática.
- `share-instagram-story-card`: Generación y descarga de tarjetas gráficas verticales optimizadas para Instagram Stories.

## Impact

- `src/app/v/[id]/page.tsx`: [NEW] Página de servidor con tags Open Graph dinámicos y redirección.
- `src/components/TripDetailModal.tsx`: Integración de panel de compartir, copia de enlace y generación de Canvas de Instagram Story.
