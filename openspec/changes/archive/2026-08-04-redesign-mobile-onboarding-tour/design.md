## Context

Actualmente `SpotlightTourOverlay.tsx` renderiza las tarjetas paso a paso calculando coordenadas flotantes de la ventana (`getBoundingClientRect()`). En dispositivos móviles (Smartphones con anchos de 375px a 428px), esta técnica falla debido a:
1. Las tarjetas flotantes cubren los elementos destacados en pantallas angostas.
2. Los desplazamientos con `scrollIntoView({ block: 'center' })` producen saltos bruscos.
3. El dinamismo de la barra de navegación del navegador (iOS Safari / Chrome Mobile) descoloca las posiciones fijas en `px`.
4. Los Pasos 4 y 5 abren modales enteros, superponiendo capas oscuras con blur y rompiendo el scroll.

## Goals / Non-Goals

**Goals:**
- Diseñar y construir una experiencia de tutorial **exclusiva para Celulares** con **Bottom Sheet anclada** (`fixed bottom-0 z-[220] pb-safe`).
- Garantizar que la tarjeta de instrucciones NUNCA obstruya el elemento destacado en pantalla.
- Utilizar scroll auto-enfocado a la parte superior (`block: 'start'`) dejando libre el visor central.
- Aplicar tokens visuales de alta calidad *Clean Alpine Frost & Sky Glass* (`#0F2942`, `#38BDF8`, bordes especulares `border-white/30`, botones celestes).
- Asegurar objetivos táctiles de tamaño adecuado ($\ge 48\times 48\text{px}$) y soporte intuitivo de gestos táctiles y botón de descarte ("Omitir").

**Non-Goals:**
- No se mantendrá la lógica de tarjetas flotantes Desktop ni bifurcaciones de coordenadas complejas. El tutorial estará concebido 100% Mobile First.
- No se alterará el flujo de autenticación ni los datos almacenados de Supabase/localStorage de la versión de onboarding.

## Decisions

1. **Decisión: Bottom Sheet Fijo Inferior vs Tarjetas Flotantes**
   - *Elección*: Anclar la tarjeta de instrucciones a la parte inferior de la pantalla (`bottom-0`) con bordes redondeados superiores `rounded-t-[32px]` y espacio para safe-area (`env(safe-area-inset-bottom)`).
   - *Alternativas consideradas*: Tarjetas flotantes dinámicas (descartadas por cubrir contenido en mobile) o modales centrados en pantalla (descartados por bloquear la visión de la app).

2. **Decisión: Scroll hacia arriba (`block: 'start'`) con offset**
   - *Elección*: Al cambiar de paso, desplazar suavemente la página hacia el elemento objetivo colocándolo cerca de la parte superior (con offset de ~80px para dar respiro al header).
   - *Alternativas consideradas*: `block: 'center'` (descartado por dejar el elemento justo detrás de la tarjeta inferior).

3. **Decisión: Máscara SVG Spotlight con Recorte Redondeado**
   - *Elección*: Renderizar una máscara SVG translúcida (`rgba(9, 26, 44, 0.8)`) con cutout redondeado (`rx="16"`) y borde resplandeciente en celeste `#38BDF8` rodeando el elemento activo.

4. **Decisión: Integración Suave de Pasos de Modal (Pasos 4 y 5)**
   - *Elección*: En lugar de abrir modales a pantalla completa que dupliquen overlays y bloqueen el scroll del tutorial, enfocar los elementos clave en el layout principal (o simular la vista previa de forma limpia dentro del bottom sheet).

## Risks / Trade-offs

- **[Riesgo]** Variaciones extremas de tamaño de pantalla mobile (p. ej. iPhone SE de 375px vs iPhone Pro Max de 430px).
  - *Mitigación*: Uso de `w-[94%] max-w-md mx-auto` y padding adaptativo con `env(safe-area-inset-bottom)`.
- **[Riesgo]** Scroll bloqueado si el usuario intenta deslizar la pantalla durante el tour.
  - *Mitigación*: Mantener `pointer-events-none` en la máscara translúcida y `pointer-events-auto` solo en la Bottom Sheet para permitir navegación sin congelar el navegador.
