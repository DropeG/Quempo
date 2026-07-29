## Context

El aside de `page.tsx` tiene un wrapper interno (`lg:sticky` div) que usa `flex flex-col gap-4`. En desktop eso es correcto — las cards se apilan verticalmente en la columna izquierda. En mobile, ese mismo stack genera una longitud de ~380-420px que consume >85% del viewport de un teléfono promedio (390px de alto), empujando Viajes Disponibles fuera de la pantalla.

El Panel 1 (Ruta de Viaje) tiene: título, box de origen, botón de swap, box de destino. El Panel 2 (Conduces) tiene: título, párrafo descriptivo, botón CTA. Ambos son candidates ideales para un layout de 2 columnas: cada uno tiene un CTA o interacción principal clara que funciona en mitad de ancho.

## Goals / Non-Goals

**Goals:**
- En mobile, Panel 1 y Panel 2 aparecen lado a lado (2 columnas, `grid-cols-2`)
- Viajes Disponibles queda inmediatamente visible debajo de esa fila sin scroll
- Cada card es funcional y legible en el espacio reducido (≈50% del ancho)
- Desktop sin cambio visual

**Non-Goals:**
- No rediseñar los panels en desktop
- No cambiar la lógica de filtros ni de estado
- No eliminar ningún elemento — solo ocultar el texto descriptivo del Panel 2 en mobile para que quepa

## Decisions

### D1 — Grid 2 columnas en el wrapper interno del aside

**Decisión**: El `<div className="lg:sticky lg:top-20 min-h-[calc(100vh-120px)] flex flex-col ...">` pasa a ser `grid grid-cols-2 gap-3 lg:flex lg:flex-col lg:sticky lg:top-20 ...` en mobile. Esto pone P1 y P2 lado a lado.

**Por qué**: Un grid de 2 columnas es la solución más limpia — no requiere duplicar componentes, no rompe la accesibilidad, y es fácil de hacer responsive con prefijos `lg:`.

**Alternativas descartadas**:
- **Scroll horizontal con cards**: Oculta contenido, mala UX
- **Accordion/collapse**: Requiere estado extra y JS adicional
- **Cards más pequeñas con overflow scroll vertical**: No soluciona el problema raíz

### D2 — Ocultar texto descriptivo del Panel 2 en mobile

**Decisión**: El `<p>` de "Publica tus asientos libres en 30 segundos..." añade `hidden lg:block` para ocultarse en mobile.

**Por qué**: En mitad del ancho disponible (~175px en iPhone 14), ese párrafo de 3 líneas rompería el layout. El CTA "Publicar Mi Viaje" es suficientemente claro sin la descripción.

### D3 — Padding compacto en mobile

**Decisión**: Ambas cards cambian `p-5` → `p-3 lg:p-5` y `space-y-3.5` → `space-y-2.5 lg:space-y-3.5`.

**Por qué**: 20px de padding en cada lado dejaría muy poco espacio para el contenido en columna de ~175px.

## Risks / Trade-offs

- **[Riesgo bajo] Panel 1 en espacio reducido**: El dropdown de resort (cuando dirección es BAJADA) puede quedar apretado. → Mitigación: el dropdown ya usa `w-full`, se adapta al contenedor.
- **[Riesgo bajo] Botón "Publicar Mi Viaje" en mobile**: El texto debe caber en ~160px. "Publicar Mi Viaje" son 15 chars, a `text-sm` (14px) entra bien.
- **[Ninguno] Desktop**: Las clases `lg:` restauran exactamente el comportamiento anterior.
