## Context

La página principal (`src/app/page.tsx`) usa un contenedor con clases `lg:grid lg:grid-cols-12`. En desktop (≥1024px) el grid pone el `<aside>` (col-4) y la `<section>` (col-8) lado a lado. En mobile el grid se desactiva y el navegador apila los elementos en orden DOM: primero el `<aside>` (que contiene los controles del conductor y el Estado de Ruta G-21), luego la `<section>` (Viajes Disponibles). El contenido primario para la mayoría de usuarios —la lista de viajes— queda desplazado hacia abajo.

## Goals / Non-Goals

**Goals:**
- En mobile/tablet, los Viajes Disponibles deben aparecer primero en el viewport
- El aside (Ruta de Viaje, Publicar Viaje, Estado G-21) queda debajo en mobile
- Desktop mantiene el layout de dos columnas sin ningún cambio visual

**Non-Goals:**
- No refactorizar el layout completo
- No cambiar la lógica de negocio ni el estado
- No alterar estilos del aside ni de la section más allá del reordenamiento

## Decisions

### D1 — CSS `order` con `flex flex-col` en mobile

**Decisión**: Cambiar el contenedor de `lg:grid` puro a `flex flex-col lg:grid`. Luego aplicar `order-2 lg:order-1` al `<aside>` y `order-1 lg:order-2` a la `<section>`.

**Por qué**: La propiedad CSS `order` solo funciona dentro de un contexto flex o grid. En mobile, el contenedor no tenía ninguno de los dos activos. Agregar `flex flex-col` como base activa el flex context para mobile, sin afectar el grid de desktop que se activa en `lg:`.

**Alternativas consideradas**:
- **Duplicar `MountainStatusPill`** con visibilidad condicional (`lg:hidden` / `hidden lg:block`): Genera doble renderizado y doble fetch, descartado.
- **Mover el `MountainStatusPill` fuera del aside**: Cambia la semántica del DOM para desktop también, más disruptivo.

## Risks / Trade-offs

- **[Riesgo bajo] Breakpoint intermedio (md)**: Entre 768px y 1024px el layout sigue siendo columna única y el `order` se aplica correctamente, sin riesgo.
- **[Ninguno] Desktop**: Las clases `lg:order-*` anulan las de mobile; visualmente idéntico al estado actual.
