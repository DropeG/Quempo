## Context

Actualmente en `PublishModal.tsx`, los conductores pueden seleccionar entre "SUBIDA", "BAJADA" e "ROUND_TRIP". El diseño previo mostraba siempre un input de texto de origen y un select de centro de esquí como destino, lo cual causaba inconsistencias conceptuales al publicar un viaje de Bajada (donde la montaña es el origen y la ciudad el destino). Además, el listado de checkboxes/badges de equipamiento se desplegaba con `flex-wrap`, provocando que el último elemento "Parrilla" cayera a una segunda línea en pantallas reducidas. Por último, la cabecera contenía un subtítulo redundante.

## Goals / Non-Goals

**Goals:**
- Simplificar el selector de dirección a solo `SUBIDA` y `BAJADA`.
- Cambiar dinámicamente el rol y etiqueta de los campos Origen y Destino según la dirección seleccionada (Subida: Origen=Ciudad/Input, Destino=Montaña/Select; Bajada: Origen=Montaña/Select, Destino=Ciudad/Input).
- Distribuir las 3 opciones de equipamiento en `grid grid-cols-3` alineadas en una sola fila horizontal.
- Eliminar la bajada de texto en el header del modal.

**Non-Goals:**
- Modificar el esquema de la base de datos Supabase en `trips` (la columna `direction` mantendrá la compatibilidad backend aunque la UI solo envíe `SUBIDA` o `BAJADA`).

## Decisions

1. **Inversión Dinámica de UI (Origen / Destino)**:
   - Al seleccionar `SUBIDA`, se renderiza:
     - Selector `destination` (Farellones, El Colorado, etc.)
     - Input `origin` (Punto de salida en la ciudad)
   - Al seleccionar `BAJADA`, se renderiza:
     - Selector `origin` (Centro de Esquí) reutilizando `destination` como el centro seleccionado o mapeándolo al campo `origin` de la base de datos.
     - Input `destination` (Punto de llegada en la ciudad) mapeado al campo `origin` / `destination` correspondiente al guardar en Supabase.

2. **Diseño de Equipamiento (3 columnas)**:
   - Reemplazar `flex flex-wrap gap-2` por `grid grid-cols-3 gap-2`.
   - Acortar los textos de las etiquetas (`🚙 4x4 / AWD`, `⛓️ Cadenas`, `🎿 Parrilla`) manteniendo los iconos para asegurar un fit horizontal limpio en cualquier pantalla.

## Risks / Trade-offs

- **[Riesgo]** Mapeo de datos en Supabase: Al insertar en `trips`, asegurar que `origin` y `destination` guarden los valores correctos dependiendo de si es subida o bajada para que los filtros de búsqueda sigan operando sin romper la compatibilidad.
  - **Mitigación**: Revisar `handleSubmit` en `PublishModal.tsx` para garantizar que `origin` y `destination` se asignen de forma limpia antes del `insert`.
