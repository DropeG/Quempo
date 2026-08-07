# Technical Design: Reduce Input Padding in Publish Modal

## Context

En `PublishModal.tsx`, los campos de `Fecha`, `Hora de Salida`, `Asientos` y `Precio` utilizan `pl-7 sm:pl-8` (28px a 32px) para dar espacio al icono Lucide. En celulares estrechos (320px-360px), las columnas tienen un ancho aproximado de 135px. Un padding de 28px consume más del 20% del ancho del campo, comprimiendo el espacio restante y provocando que el texto nativo de la fecha (`dd/mm/aaaa`) o la hora se corte o choque con el borde derecho.

## Goals / Non-Goals

**Goals:**
- Ajustar el padding izquierdo de los campos con icono a `pl-6 sm:pl-7` (24px en móvil), ganando 4px-8px de espacio interno útil.
- Mantener la posición e integridad visual de los iconos Lucide (`left-2.5 sm:left-3`).
- Garantizar que los placeholders nativos de fecha y hora se lean cómodamente sin chocar contra el borde derecho.

**Non-Goals:**
- Cambiar la estructura o nombre de los labels (`Hora de Salida`, `Fecha`).
- Mover de posición los iconos Lucide.

## Decisions

### 1. Ajuste de Padding
- Modificar la clase `pl-7 sm:pl-8` por `pl-6 sm:pl-7` en los elementos `<input id="publish-date">`, `<input id="publish-time">`, `<input id="publish-seats">` y `<input id="publish-price">`.
- Mantener el icono en `left-2.5 sm:left-3`. El espacio entre el icono (14px) y el inicio del texto (24px) será de 10px, suficiente para legibilidad sin desperdiciar ancho útil.
