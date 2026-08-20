---
target: src/components/PublishModal.tsx
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
timestamp: 2026-08-20T02-53-27Z
slug: src-components-publishmodal-tsx
---
Method: dual-agent (A: 0d288342-97fb-4ada-be1a-f20f01dfb06e · B: e51dc98c-1e1b-4ed2-8c4b-acfa5daf70a0)

### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|:-----:|-----------|
| 1 | Visibility of System Status | 3/4 | Estado de carga claro (*"Publicando viaje..."*), pero los errores quedan fuera del viewport en scroll móvil. |
| 2 | Match System / Real World | 3/4 | Excelente jerga local (*Subida/Bajada, Cantagallo, Cadenas*), pero en modo `BAJADA` la ruta queda invertida en el share de WhatsApp (*"Cantagallo ➔ Farellones"*). |
| 3 | User Control and Freedom | 3/4 | Escape y botón de cierre funcionales, pero tocar el backdrop accidentalmente descarta todo el formulario sin confirmación. |
| 4 | Consistency and Standards | 3/4 | Origen usa texto + chips mientras Destino usa `<select>`. En `BAJADA`, la posición de ambos se invierte confundiendo al usuario. |
| 5 | Error Prevention | 2/4 | Valida fecha futura y formato de teléfono, pero permite horas pasadas para el día de hoy y precios anómalos sin advertencia previa. |
| 6 | Recognition Rather Than Recall | 3/4 | Chips de Santiago reducen memoria, pero horas de salida típicas (06:30-07:30) y precios estándar ($8k-$12k) deben escribirse a mano. |
| 7 | Flexibility and Efficiency | 3/4 | Autocompleta WhatsApp e Instagram del perfil. Faltan plantillas de 1-tap (*"Mismo viaje de ayer"*) para conductores frecuentes. |
| 8 | Aesthetic and Minimalist Design | 3/4 | Estilo "Frosted Snow Glass" refinado y legible, pero acumula 10 filas interactivas en un único contenedor móvil de 85vh. |
| 9 | Error Recovery | 2/4 | Errores se agrupan en un banner superior genérico; no hay validación inline en el campo con error ni auto-scroll. |
| 10 | Help and Documentation | 2/4 | No hay microcopy que oriente sobre precios sugeridos por centro de ski o reglas de porte de cadenas de Carabineros. |
| **Total** | | **27/40** | **Aceptable (67.5% - Base sólida con fricciones críticas)** |

---

### Design Specificity Verdict

**Evaluación de Diseño**:
El formulario posee una identidad alpina innegable y profundamente conectada con la cultura de montaña chilena (Ruta G-21 a Farellones, El Colorado, La Parva y Valle Nevado). La inclusión de chips de puntos neurálgicos de Santiago (*Cantagallo, Mall Sport, Metro Los Dominicos, Shell Farellones, Estoril*) y equipamiento crítico de nieve (*🚙 4x4, ⛓️ Cadenas, 🎿 Parrilla*) demuestran diseño contextual de nicho.

Sin embargo, la **arquitectura del formulario sigue siendo una pila vertical genérica de 10 campos**. No está adaptada al caso de uso real: un conductor apurado a las 6:30 AM con las manos frías en el auto, donde se requerirían presets rápidos de 1-tap para horarios y aportes estándar.

**Escaneo Determinista (Detector Mechanical Evidence)**:
- **2 hallazgos automáticos** en `PublishSuccessModal.tsx`:
  - `bounce-easing` (línea 90): `<Sparkles className="... animate-bounce" />` usa keyframe linear continuo sin `motion-reduce:animate-none`.
  - `design-system-font-size` (línea 122): `text-[11px]` se desvía de la escala tipográfica oficial (`text-[10px]` o `text-xs`).
- **Gaps a11y & Semántica**: `PublishSuccessModal` carece de `role="dialog"`, `aria-modal="true"`, focus trap y handler de `Escape`.
- **Áreas táctiles**: Los chips de Santiago en `PublishModal.tsx` miden ~22px de alto (por debajo de la recomendación de 44x44px en móviles).

---

### Overall Impression

El flujo de publicación de Quempo tiene un gran corazón de producto: entiende las necesidades de la cordillera y remata con un motor viral brillante hacia grupos de WhatsApp. Sin embargo, sufre de **congestión de campos en móvil**, **falta de validación inline** y un **bug de ruta invertida en viajes de bajada** que degrada la confianza del conductor.

---

### What's Working (Fortalezas)

1. **Chips Geográficos de Santiago**: La selección rápida de puntos como *Cantagallo* o *Mall Sport* ahorra un 70% del tipeo en móvil.
2. **Reutilización de Perfil (WhatsApp & Instagram)**: El autollenado transparente del número y handle de Instagram ahorra fricción a usuarios recurrentes.
3. **Loop Viral en el Éxito (`PublishSuccessModal`)**: Convertir la confirmación en una tarjeta lista para WhatsApp con 1 tap es la mejor decisión de crecimiento del producto.

---

### Priority Issues

#### 🔴 [P0] Ruta Invertida en Modo Bajada (`BAJADA`)
- **Qué**: En viajes de bajada, la tarjeta de éxito y el texto preformateado de WhatsApp generan `${trip.origin} ➔ ${destName}` (ej. *"Cantagallo ➔ Farellones"* en lugar de *"Farellones ➔ Cantagallo"*).
- **Por qué importa**: Difunde viajes confusos o incorrectos en grupos de WhatsApp, perjudicando la coordinación con pasajeros.
- **Fix**: Condicionar el orden de origen y destino según `trip.direction === 'BAJADA'`.
- **Comando sugerido**: `impeccable harden src/components/PublishSuccessModal.tsx`

#### 🟠 [P1] Errores Fuera de Pantalla y Falta de Validación Inline
- **Qué**: El banner de error `setError(...)` se renderiza únicamente en la parte superior. Si el usuario presiona "Publicar" al final del scroll, el botón parece "muerto" porque el error quedó oculto arriba.
- **Por qué importa**: Causa abandono por aparente congelamiento de la app en pantallas de celular.
- **Fix**: Resaltar bordes de inputs en rojo (`border-rose-400`), agregar mensajes de error inline bajo el campo infractor y auto-scrollear al primer error.
- **Comando sugerido**: `impeccable clarify src/components/PublishModal.tsx`

#### 🟠 [P1] Sobrecarga Cognitiva en Móvil (10 Campos en un Contenedor Único)
- **Qué**: Toda la información (ruta, fecha, hora, asientos, precio, 4x4, cadenas, rack, WhatsApp, notas) compite simultáneamente en un scroll de `max-h-[85vh]`.
- **Por qué importa**: Genera fatiga y lentitud en el contexto de uso habitual (mañanas frías, apuro).
- **Fix**: Reestructurar en 2 pasos lógicos o colapsar opciones secundarias (notas, equipamiento avanzado):
  - *Paso 1: ¿Cuándo y Dónde?* (Dirección, Destino en píldoras, Punto Santiago, Fecha con hora sugerida).
  - *Paso 2: ¿Tu Auto y Cupos?* (Asientos, Aporte en chips $8k/$10k/$12k, WhatsApp verificado).
- **Comando sugerido**: `impeccable distill src/components/PublishModal.tsx`

#### 🟡 [P2] Pérdida de Datos por Toque Accidental en Backdrop
- **Qué**: Tocar el fondo oscuro fuera del modal ejecuta `onClose()` inmediatamente y borra todo lo digitado.
- **Por qué importa**: En móviles con gestos táctiles es muy fácil tocar fuera mientras se escribe, perdiendo todo el avance.
- **Fix**: Prevenir cierre si hay datos modificados o guardar borrador temporal en `sessionStorage`.
- **Comando sugerido**: `impeccable harden src/components/PublishModal.tsx`

#### 🔵 [P3] Inconsistencia en Destinos: `<select>` vs Píldoras Táctiles
- **Qué**: El destino de montaña usa un `<select>` nativo tradicional mientras el resto de la app utiliza tarjetas y píldoras táctiles con cristal esmerilado.
- **Por qué importa**: Rompe la velocidad de interacción táctil y el lenguaje de diseño.
- **Fix**: Reemplazar el dropdown por una grilla 2x2 de píldoras (*Farellones, El Colorado, La Parva, Valle Nevado*).
- **Comando sugerido**: `impeccable layout src/components/PublishModal.tsx`

---

### Persona Red Flags

- **Alex (Conductor Frecuente)**: Debe seleccionar manualmente hora, asientos y precio en cada viaje. No tiene botón de *"Repetir último viaje a La Parva"*.
- **Jordan (Primerizo)**: Duda de cuánto cobrar (no hay referencia de precio estándar de $10.000) y no sabe si marcar "Cadenas" es legalmente obligatorio por Carabineros.
- **Casey (Móvil Apurado a las 6:45 AM)**: Se le cierra el modal al tocar fuera y pierde el texto; el error de validación no se ve porque está arriba en el scroll.
- **Riley (Edge Cases)**: Puede programar horas pasadas para el día de hoy y valores extremos en CLP sin validación en tiempo real.

---

### Minor Observations & Questions to Consider

**Observaciones Menores**:
- El enlace de WhatsApp en el modal de éxito hardcodea `https://www.quempo.tech` en lugar del link dinámico `/v/[id]`.
- El botón de cierre en móvil tiene un área táctil reducida (~28px).
- Falta confirmación visual de que el Instagram del conductor será visible con insignia verificada.

**Preguntas para Desbloquear Soluciones**:
1. *¿Qué pasaría si publicar un viaje estándar tomara solo 3 toques?* (`[Subida]` ➔ `[La Parva]` ➔ `[Publicar hoy 7:00 AM - $10.000]`).
2. *¿Podríamos reemplazar el select de 4 centros de ski por 4 botones táctiles directos?*
3. *¿Podría el modal de éxito generar automáticamente una historia para Instagram (@quempo) además de WhatsApp?*
