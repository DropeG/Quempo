## Context

La página principal (`src/app/page.tsx`) concentra actualmente la selección de origen y destino, los chips de selección de fecha y la lista de viajes en un flujo vertical compacto sin títulos de sección explícitos. Un botón flotante (FAB) de "Publicar Viaje" se fija en la parte inferior de la pantalla. Esto genera confusión entre la acción de configurar/publicar un viaje y la acción de buscar viajes.

## Goals / Non-Goals

**Goals:**
- Separar visual y conceptualmente la acción de **Publicar Viaje** (Conductor) de **Buscar Viajes Disponibles** (Pasajero).
- Reestructurar el layout de `src/app/page.tsx` para soportar:
  - Mobile (<768px): flujo limpio vertical con alta densidad visual donde al menos 3 publicaciones entran en el viewport inicial.
  - Desktop (≥1024px): layout de 2 columnas con un Sidebar fijo (sticky) a la izquierda.
- Integrar la acción de publicar de forma orgánica arriba/en el sidebar, eliminando el botón flotante inferior (FAB) para no tapar tarjetas.

**Non-Goals:**
- Alterar el funcionamiento interno del modal de publicación `PublishModal.tsx` o la integración con Supabase.
- Modificar las rutas de autenticación o los flujos de contacto por WhatsApp.

## Decisions

### Decisión 1: Reorganización del Layout en 2 Columnas para Desktop y 1 Columna para Mobile
- **Razón**: En desktop, la disposición a 2 columnas con la barra lateral izquierda `sticky` permite aprovechar el espacio horizontal, manteniendo los controles (Ruta, Publicar, Filtro Días) siempre visibles mientras se hace scroll en la lista de viajes. En mobile, se apilan verticalmente con jerarquía clara.
- **Alternativas consideradas**: Mantener barra superior horizontal en desktop. Rechazado porque dejaba demasiado espacio desperdiciado en monitores anchos y obligaba a hacer scroll de vuelta al tope para cambiar filtros.

### Decisión 2: Alta Densidad en `TripCard.tsx`
- **Razón**: Reducir el relleno vertical de cada `TripCard` y reorganizar los badges (hora, origen/destino, precio, cupos y botón de WhatsApp) para que ocupen menor altura por tarjeta en mobile.
- **Alternativas consideradas**: Usar acordeón o tarjetas colapsables. Rechazado porque oculta información clave del viaje que el pasajero necesita evaluar rápido.

## Risks / Trade-offs

- **[Riesgo]**: En pantallas móviles muy pequeñas (e.g. 320px-360px), la tarjeta compacta podría verse apretada.
  - *Mitigación*: Utilizar flexbox responsivo con fuentes de tamaño fino (`text-xs`, `text-[11px]`) y badges compactos de 1 sola línea.
