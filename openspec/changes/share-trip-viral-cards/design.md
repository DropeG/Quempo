## Context

Queremos crear una experiencia de compartir fluida y viral que funcione en WhatsApp, Telegram y redes sociales sin generar demoras en el servidor.

## Goals / Non-Goals

**Goals:**
- Servir metadatos Open Graph personalizados en `/v/[id]` antes de redirigir, para que los scrapers de chat (WhatsApp, Telegram) muestren la información del viaje directamente en la previsualización del link.
- Diseñar un canvas cliente de 1080x1920 (9:16) con estética premium de Faredeo (degradado azul noche alpino, detalles del viaje en tipografías grandes e indicación de contacto).
- Soportar el API nativo `navigator.share()` en móviles y fallback de copiado al portapapeles.

**Non-Goals:**
- Generar la imagen en el servidor (con Puppeteer o Node Canvas) para evitar costos de infraestructura o cuellos de botella de rendimiento. Todo ocurre en el cliente del usuario.

## Decisions

### 1. Ruta de Servidor `/v/[id]/page.tsx`
- Recupera el viaje usando el cliente de Supabase.
- Exporta la función `generateMetadata` para inyectar los metadatos Open Graph del viaje (detalles, precio y cupos).
- Envía un HTML ligero con un tag de redirección meta:
  `<meta http-equiv="refresh" content={`0; url=/?trip=${id}`} />`
  y redirección por JS `window.location.replace('/?trip=' + id)` para asegurar que los navegadores reales vayan al Home abriendo el modal de detalles del viaje.

### 2. Generación del Canvas de Story en Cliente
- En `TripDetailModal.tsx` se agrega la función `handleDownloadStory`:
  - Dibuja un degradado `#0A1E32` a `#071524` en un `<canvas width={1080} height={1920}>`.
  - Añade elementos gráficos: un patrón de montañas estilizado en la parte inferior, copos de nieve y textos estructurados grandes.
  - Exporta a PNG y dispara la descarga en el navegador con un clic.

## Risks / Trade-offs

- **[Risk]**: Scrapers que no sigan redirecciones.
  - **Mitigation**: El uso de meta-redirect en lugar de redirección HTTP 302/307 permite que el scraper lea el cuerpo del HTML de la ruta original antes de redireccionar, capturando el título y descripción correctos de ese viaje.

## Migration Plan

1. Crear `src/app/v/[id]/page.tsx`.
2. Actualizar `src/app/page.tsx` para detectar el parámetro `?trip=id` en la URL al cargar la página y abrir el modal del viaje.
3. Actualizar `src/components/TripDetailModal.tsx` con el menú de compartir (Copiar enlace, Compartir en WhatsApp y Descargar Imagen para Stories).
