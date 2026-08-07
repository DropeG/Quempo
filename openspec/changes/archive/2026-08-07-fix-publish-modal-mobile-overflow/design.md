# Technical Design: Fix Publish Modal Mobile Overflow

## Context

El modal de publicación de viajes (`PublishModal.tsx`) exhibe un comportamiento de scroll horizontal involuntario en navegadores móviles (especialmente en dispositivos con anchos de pantalla entre 320px y 375px). El problema principal proviene de etiquetas fijas extensas sin truncado o adecuación responsiva, el uso de CSS Grid con `min-width: auto` implícito en los elementos hijos, y la falta de contención explícita `overflow-x-hidden` a nivel de formulario.

## Goals / Non-Goals

**Goals:**
- Eliminar completamente el scroll horizontal en `PublishModal.tsx` en dispositivos móviles (hasta 320px).
- Simplificar las etiquetas de los botones de dirección en pantallas pequeñas (omitir `(Santiago ➔ Ski)` en móvil).
- Aplicar utilidades responsivas Tailwind (`min-w-0`, `text-[10px] sm:text-xs`, `p-4 sm:p-6`, `overflow-x-hidden`) de forma limpia y mantenible.

**Non-Goals:**
- Rediseñar el flujo de publicación o cambiar la lógica de validación/guardado en Supabase.
- Modificar el comportamiento o la apariencia del modal en pantallas de escritorio (`sm` / `md` / `lg`), donde las etiquetas extendidas siguen viéndose bien.

## Decisions

### 1. Etiquetas de Subida y Bajada Responsivas
- **Decisión**: Usar formato responsivo o span condicional para las etiquetas de tipo de viaje.
  - En móviles: `⬆️ Subida` / `⬇️ Bajada`.
  - En pantallas medianas+: `⬆️ Subida (Santiago ➔ Ski)` / `⬇️ Bajada (Ski ➔ Santiago)`.
- **Razón**: Ahorra más de 20px por botón en móvil, evitando que la grilla `grid-cols-2` fuerce un ancho superior a 300px.

### 2. Ajustes de CSS Grid y Contención de Overflow
- **Decisión**:
  - Agregar `min-w-0` a todos los contenedores hijos de grillas de 2 y 3 columnas (`radiogroup`, equipamiento, fecha/hora).
  - Agregar `overflow-x-hidden max-w-full` al elemento `<form>`.
  - Reducir el padding de la tarjeta del modal en móvil a `p-4 sm:p-6`.
- **Razón**: CSS Grid asigna por defecto `min-width: auto` a sus hijos, lo que les impide achicarse por debajo del contenido intrínseco de texto o inputs. Con `min-w-0`, CSS Grid permite encoger el contenido dentro del contenedor padre sin desbordar.

## Risks / Trade-offs

- **[Riesgo] Visibilidad reducida del sentido en conductores nuevos en móvil**: Al omitir `(Santiago ➔ Ski)`, un usuario podría dudar de qué significa Subida.
  - **Mitigación**: Mantener los emojis `⬆️` y `⬇️` y mantener el texto completo en desktop (`hidden sm:inline`). Además, los campos de origen/destino cambian dinámicamente sus etiquetas ("Punto de Salida" vs "Destino"), lo que refuerza el contexto.
