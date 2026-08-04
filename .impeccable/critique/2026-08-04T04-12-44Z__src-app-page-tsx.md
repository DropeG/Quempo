---
target: src/app/page.tsx
total_score: 29
max_score: 36
na_heuristics: 9
p0_count: 2
p1_count: 1
timestamp: 2026-08-04T04-12-44Z
slug: src-app-page-tsx
---
### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Excelente feedback de ruta seleccionada, fechas activas y estado de carretera |
| 2 | Match System / Real World | 4 | Lenguaje cordillerano auténtico (Subida/Bajada, G-21, Farellones) |
| 3 | User Control and Freedom | 3 | Fácil cambio de ruta, aunque faltan atajos táctiles directos |
| 4 | Consistency and Standards | 3 | Los selectores personalizados rompen patrones táctiles nativos de mobile |
| 5 | Error Prevention | 4 | Restricciones lógicas adecuadas según sentido del tránsito |
| 6 | Recognition Rather Than Recall | 3 | Fechas rápidas útiles pero opacadas por alta densidad de información |
| 7 | Flexibility and Efficiency | 3 | Rápido pero exige alta precisión al tapear en pantalla pequeña |
| 8 | Aesthetic and Minimalist Design | 1 | Sobrecarga en mobile: exceso de micro-textos (`9px`), emojis y bordes |
| 9 | Error Recovery | n/a | Sin flujos de error explícitos en la vista principal |
| 10 | Help and Documentation | 4 | Excelente sistema de onboarding y tour guía |
| **Total** | | **29/36** | **Good (80.5%)** |

#### Design Specificity Verdict

**LLM assessment**: La especificidad temática es excepcional (diseño para la cordillera de Los Andes), pero la composición en móvil sufre de "complejidad de escritorio comprimida". En lugar de ser sintético, táctil y directo como Surfari.cl, el layout móvil abarrota selectores, tarjetas y filtros en espacios muy reducidos.

**Deterministic scan**: `detect.mjs` detectó 11 hallazgos en total:
- 10 advertencias de `design-system-font-size` por clases de tamaño arbitrario fuera del sistema de diseño (`text-[9px]`, `text-[11px]`) en `page.tsx`, `Navbar.tsx` y `MountainStatusPill.tsx`.
- 1 advertencia por uso de `animate-bounce` (animación obsoleta) en `MountainStatusPill.tsx`.

#### Overall Impression

La app cuenta con una propuesta funcional excelente para los esquiadores, pero en Mobile atenta contra tu objetivo de **"simple, intuitivo y grande"**. Actualmente utiliza tipografías diminutas (`9px`), tap targets apretados y un exceso de elementos decorativos (emojis, bordes dobles, etiquetas redundantes) que generan desorden en lugar de síntesis visual.

#### What's Working

1. **Relevancia del Dominio**: Términos y lógica de viajes de montaña impecables (Horarios G-21, cadenas, centros de esquí).
2. **Arquitectura de Filtros Rápidos**: La tira de fechas e intercambio de ruta en 1 tap son ideas de interacción muy potentes.
3. **Jerarquía Visual de Acción Principal**: El botón de "Publicar Mi Viaje" destaca correctamente con el color primario `#38BDF8`.

#### Priority Issues

- **[P0] Micro-texto ilegible en mobile**:
  - *Why it matters*: En pantallas móviles y con reflejo de nieve/sol, clases como `text-[9px]` y `text-[10px]` resultan inlegibles y fallan en accesibilidad.
  - *Fix*: Establecer `text-xs` (12px) como el tamaño mínimo de letra y `text-sm` (14px) para contenido regular.
  - *Suggested command*: `impeccable typeset`

- **[P0] Selector de ruta comprimido en mobile**:
  - *Why it matters*: En pantallas pequeñas, la fila horizontal comprime Origen, Botón Swap (icono 14px) y Destino, provocando misclicks y poca claridad.
  - *Fix*: Reorganizar en 2 bloques verticales limpios (Origen arriba, Destino abajo, Swap flotante en el borde) con inputs del 100% de ancho y altura de tap >= 48px.
  - *Suggested command*: `impeccable layout`

- **[P1] Ruido visual y sobrecarga en la tira de fechas**:
  - *Why it matters*: Cada botón de fecha contiene 3 líneas de texto ("⚡ Hoy", "14 Ago", "Disponible/Seleccionado"), entorpeciendo el escaneo rápido.
  - *Fix*: Simplificar a 2 líneas limpias sin emojis y guiarse por el color del contenedor para marcar el estado seleccionado.
  - *Suggested command*: `impeccable distill`

- **[P2] Saturación de emojis y bordes decorativos**:
  - *Why it matters*: Uso excesivo de emojis (📍, 🏔️, ⚡, ☀️, 🏂, 📅, ⬆️, ⬇️) y bordes translucidos dobles que restan elegancia e impiden el look limpio de Surfari.cl.
  - *Fix*: Reemplazar emojis por tipografía sólida o iconos SVG discretos (Lucide), reduciendo el 80% del ruido de viñetas.
  - *Suggested command*: `impeccable quieter`

#### Persona Red Flags

- **Alex (Power User)**: Intenta cambiar la ruta rápidamente con el pulgar mientras camina, pero el icono de swap es demasiado pequeño y requiere precisión quirúrgica.
- **Jordan (First-Timer)**: Se abruma con la cantidad de texto comprimido y cuadros de cristal superpuestos, inseguro de dónde enfocar la mirada.
- **Casey (Distracted Mobile User)**: **Alerta Roja.** Mirando el celular en la cordillera bajo el sol brillante, no logra leer los textos de 9px y abandona por fatiga visual.

#### Minor Observations

- `MountainStatusPill.tsx` utiliza `animate-bounce` en lugar de transiciones suaves.
- Tarjetas de viaje (`TripCard`) podrían aprovechar todo el ancho con precio destacado en fuente `text-xl` en lugar de competir con etiquetas secundarias.

#### Questions to Consider

- ¿Qué pasaría si el selector de ruta en Mobile se apilara en 2 tarjetas grandes (Origen arriba, Destino abajo, Swap flotante) como en Uber o Surfari?
- ¿Y si la tira de fechas fuera de 1 sola línea limpia sin textos explicativos redundantes ni emojis?
