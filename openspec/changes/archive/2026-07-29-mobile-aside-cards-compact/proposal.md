## Why

En mobile, las cards de "Ruta de Viaje" y "Conduces a la cordillera" apiladas verticalmente consumen casi toda la altura del viewport, empujando "Viajes Disponibles" (el contenido primario) fuera de la pantalla y requiriendo scroll innecesario. El usuario debe ver los viajes disponibles sin tener que scrollear.

## What Changes

- En viewports menores a 1024px, las dos cards del aside (Panel 1: Ruta de Viaje, Panel 2: Conduces a la cordillera) pasan de apilarse verticalmente a mostrarse **en una fila de 2 columnas iguales** (`grid grid-cols-2 gap-3`).
- Cada card se adapta visualmente para funcionar en el espacio reducido: padding más compacto, tipografía ajustada, texto descriptivo del Panel 2 oculto en mobile.
- El contenedor `lg:sticky` del aside pasa a ser `flex flex-col` en mobile para permitir el grid de 2 columnas de los panels.
- Desktop (≥1024px): sin ningún cambio visual.

## Capabilities

### New Capabilities
- `mobile-aside-compact-row`: Las dos cards del aside se muestran en una fila horizontal de 2 columnas en mobile, reduciendo su huella vertical y poniendo Viajes Disponibles inmediatamente a la vista tras "Conduces a la cordillera".

### Modified Capabilities
<!-- Sin cambios en specs existentes -->

## Impact

- **Archivo afectado**: `src/app/page.tsx`
  - El wrapper interno del aside (`lg:sticky` div) necesita dejar de ser un stack único para permitir el grid en mobile.
  - Panel 1 y Panel 2: clases de padding y espaciado ajustadas con prefijo responsive (`sm:` / `lg:`).
  - Panel 2: el `<p>` descriptivo se oculta en mobile (`hidden sm:block`) para no romper el layout compacto.
- Sin cambios de lógica ni estado.
- Desktop: idéntico al estado actual.
