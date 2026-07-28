---
target: src/components/PublishModal.tsx
total_score: 22
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 4
timestamp: 2026-07-28T20-57-33Z
slug: src-components-publishmodal-tsx
---
# Critique Report: src/components/PublishModal.tsx

Method: dual-agent (A: be6eac19-1eec-40f1-852d-cf739925f229 · B: f1237fbb-14e3-4512-9a42-c1b3cce34816)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | Carga silenciosa de perfil; el error no usa `role="alert"` ni `aria-live` |
| 2 | Match System / Real World | 3/4 | Lenguaje de dominio (Subida, Bajada, Cadenas, Parrilla, resorts de montaña) |
| 3 | User Control and Freedom | 2/4 | Botón de cierre sin `aria-label`, faltan tecla `Escape` y alerta de cambios sin guardar |
| 4 | Consistency and Standards | 2/4 | Alternar `Subida` / `Bajada` cambia la ubicación física de inputs en la grilla |
| 5 | Error Prevention | 2/4 | Permite fechas pasadas; `Number("")` en inputs produce `0` o `NaN` en estado |
| 6 | Recognition Rather Than Recall | 2/4 | Sin accesos rápidos a puntos frecuentes de Santiago (Cantagallo, Mall Sport) |
| 7 | Flexibility and Efficiency | 2/4 | Alta fricción de escritura en móvil; sin opciones predeterminadas de horario ni accesos rápidos |
| 8 | Aesthetic and Minimalist Design | 3/4 | Estética Alpine Frost cuidada; 5 violaciones de contraste (`gray-on-color` en `text-slate-500` sobre `sky-50`) |
| 9 | Error Recovery | 2/4 | Banner rojo genérico arriba sin `aria-live` ni scroll al campo defectuoso |
| 10 | Help and Documentation | 2/4 | Ayuda corta para Instagram, falta guía de precio sugerido por asiento y contexto G-245 |
| **Total** | | **22/40** | **Acceptable** |

## Design Specificity Verdict

**Evaluación de Diseño (LLM)**: Conectado con la cultura de montaña chilena mediante badges de equipamiento (🚙 4x4, ⛓️ Cadenas, 🎿 Parrilla) y destinos cordilleranos. Sin embargo, carece de accesos rápidos para puntos de encuentro clásicos de Santiago (Cantagallo, Mall Sport, Metro Escuela Militar) y precio de aporte sugerido.

**Escaneo Determinista (Detector B)**: 5 hallazgos de regla `gray-on-color` (`text-slate-500` sobre `bg-sky-50` en botones deseleccionados y cerrado con contraste ~3.8:1 vs 4.5:1 exigido por WCAG AA). Además, auditoría técnica detectó etiquetas sin vínculo `htmlFor`/`id`, botones sin `aria-pressed`/`aria-checked`, banner de error sin `role="alert"`, instanciación de `createClient()` dentro del render loop y falta de trampeo de foco.

## Overall Impression

El modal posee una sólida apariencia visual Alpine Frost (`bg-white/95 border-white shadow-2xl backdrop-blur-md`), pero sufre de fricción de uso y accesibilidad: contraste insuficiente en toggles deseleccionados, inputs sin etiquetas vinculadas, falta de validación de fechas pasadas y reordenamiento del formulario al alternar sentido.

## What's Working

1. **Badges de Equipamiento de Montaña**: Selectores nativos interactivos para 4x4/AWD, Cadenas y Parrilla alineados con las necesidades reales de subida a centros de esquí.
2. **Auto-completado de Contactos**: Carga automática de WhatsApp e Instagram desde Supabase para conductores frecuentes.
3. **Estética Alpine Frost Cohesiva**: Cristal traslúcido estilizado con paleta `#0F2942` y `#38BDF8`.

## Priority Issues

- **[P1] Falta de Accesibilidad y Control de Teclado (ARIA / Focus / ESC / htmlFor)**:
  - *Por qué importa*: Ningún `<label>` está vinculado por `id`/`htmlFor` a sus inputs, el modal carece de `role="dialog"`, `aria-modal="true"`, atajo `Escape` y los toggles no informan estado `aria-pressed`.
  - *Solución*: Vincular labels, agregar atributos ARIA de diálogo/toggles y trampear foco.
  - *Comando sugerido*: `npx impeccable adapt src/components/PublishModal.tsx`
- **[P1] Contraste insuficiente en botones deseleccionados (`gray-on-color`)**:
  - *Por qué importa*: `text-slate-500` sobre `bg-sky-50` entrega 3.8:1 (falla WCAG AA 4.5:1), dificultando la lectura.
  - *Solución*: Cambiar texto deseleccionado a `text-slate-600` (`#475569`) o `text-slate-700`.
  - *Comando sugerido*: `npx impeccable colorize src/components/PublishModal.tsx`
- **[P1] Selección de fechas pasadas permitida**:
  - *Por qué importa*: Conduce a la publicación de viajes vencidos.
  - *Solución*: Agregar `min={new Date().toISOString().split('T')[0]}` al input de fecha.
  - *Comando sugerido*: `npx impeccable harden src/components/PublishModal.tsx`
- **[P1] Ausencia de accesos rápidos para puntos de encuentro en Santiago**:
  - *Por qué importa*: Exige escribir la dirección completa en móvil para lugares ultra-comunes (Cantagallo, Mall Sport, Metro Escuela Militar).
  - *Solución*: Agregar chips de selección rápida de 1-tap.
  - *Comando sugerido*: `npx impeccable clarify src/components/PublishModal.tsx`
- **[P2] Instanciación de `createClient()` en cuerpo del render**:
  - *Por qué importa*: Ejecutar `createClient()` en cada ciclo de renderizado genera desperdicio de memoria y llamadas innecesarias.
  - *Solución*: Mover la creación fuera del componente o envolver en `useMemo`.
  - *Comando sugerido*: `npx impeccable harden src/components/PublishModal.tsx`

## Persona Red Flags

- **Alex (Power User)**: Sin atajos de teclado (`Esc`, `Enter`). No hay chips de punto de salida rápido ni clonación de viajes.
- **Jordan (Primerizo Conductor)**: Sin referencia de precio justo ni alerta visual accesible cuando ocurren errores.
- **Casey (Usuario Móvil Distraído)**: Formulario de 12+ campos con baja relación de contraste en botones no seleccionados bajo luz solar.
- **Sam (Accesibilidad)**: Imposibilidad de navegar por voz o teclado debido a etiquetas desconectadas e incapacidad de cerrar el modal con `Escape`.

## Minor Observations

- `createClient()` se invoca dentro de `PublishModal` en cada render en lugar de estar memoizado o fuera del scope del componente.
- `if (isOpen !== prevIsOpen)` en el cuerpo del render fuerza un re-renderizado síncrono secundario de React.

## Questions to Consider

- ¿Qué pasaría si la salida en Santiago tuviera chips de selección rápida (Cantagallo, Mall Sport, Metro Escuela Militar) para publicar en 1 tap?
- ¿Debería corregirse el contraste de los toggles deseleccionados usando `text-slate-600` para cumplir la norma WCAG AA?
- ¿Podríamos dividir el formulario en 2 pasos ligeros (1. Ruta y Fecha, 2. Equipamiento y Contacto) en móviles para reducir la carga cognitiva?
