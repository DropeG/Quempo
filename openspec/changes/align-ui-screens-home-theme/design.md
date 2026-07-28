## Context

El sistema de diseño visual de Faredeo, documentado en `DESIGN.md`, establece el concepto **"Clean Alpine Frost & Sky Glass"**. La interfaz del Home (`/`) ya exhibe este estándar con tarjetas refractivas heladas (`backdrop-filter: blur(26px)`), bordes especulares de luz (`inset 0 1px 0 rgba(255, 255, 255, 0.28)`), acentos en celeste alpino (`#38BDF8`), texto en azul marino profundo (`#0F2942`) o blanco nieve (`#FFFFFF`), y el fondo alpino del Cerro Plomo sin filtros verdosos.

Sin embargo, las pantallas secundarias clave —el modal **Publicar Mi Viaje**, los componentes de **El Tutorial** (Spotlight Tour y Welcome Modal) y el modal **Mi Perfil**— presentan inconsistencias visuales (como fondos oscuros opacos de Tailwind por defecto, sombras no adaptadas o botones fuera del token principal). Esta propuesta define el rediseño técnico para alinear estas tres pantallas con la identidad visual del Home.

## Goals / Non-Goals

**Goals:**
- Implementar la estética **"Clean Alpine Frost & Sky Glass"** en las tres pantallas principales (`PublishModal`, `SpotlightTourOverlay` + `OnboardingWelcomeModal` y `ProfileModal`).
- Garantizar que todos los contenedores principales usen estructuras glassmorphic (`.glass-card`), bordes cristalinos (`border-white/30`), sombras difusas heladas y acentos en celeste alpino (`#38BDF8`).
- Ajustar tipografías, pesos (`font-black`, `font-extrabold`), contrastes (texto navy `#0F2942` sobre celestes) e iconos según la jerarquía establecida en `DESIGN.md`.
- Asegurar 100% de responsividad táctil en dispositivos móviles y visualización limpia en pantallas de escritorio anchas.

**Non-Goals:**
- Modificar la lógica de negocio, esquemas de Supabase o rutas de autenticación.
- Alterar la secuencia o cantidad de pasos del tutorial de onboarding.

## Decisions

### Decisión 1: Estructura de Modal Base Glassmorphic
- **Elección:** Reemplazar los fondos sólidos `bg-slate-900` u opacos por contenedores glassmorphic con `background: linear-gradient(135deg, rgba(160, 190, 215, 0.22), rgba(65, 90, 120, 0.16))` y `backdrop-filter: blur(26px) saturate(145%)`.
- **Overlay de Fondo:** Utilizar un telón de fondo oscuro translúcido `bg-slate-950/70 backdrop-blur-md` que mantenga la visibilidad de la cordillera sin sobrecargar la vista.

### Decisión 2: Sistema de Botones e Interacciones
- **Botones Primarios CTA:** Adoptar la especificación `button-primary` de `DESIGN.md`: fondo celeste `#38BDF8`, texto azul marino `#0F2942` (`font-black`), borde `border-white/40`, y estado hover `#0284C7` con texto blanco.
- **Campos de Formulario (Inputs/Selects):** Estilizar con fondos translúcidos `bg-white/10` o `bg-slate-900/60`, bordes de cristal `border-white/30`, texto blanco y anillos de enfoque en celeste `#38BDF8`.

### Decisión 3: Formato Responsivo Móvil & Desktop
- Restringir la altura máxima de modales a `max-h-[85vh]` u `88vh` en móvil con `overflow-y-auto` y scrollbar delgado para evitar desbordamientos en pantallas pequeñas.
- En Desktop, mantener modales centrados con sombras difusas profundas (`box-shadow: 0 30px 90px rgba(0,0,0,0.42)`).

## Risks / Trade-offs

- **[Riesgo]** Desbordamiento o problemas de legibilidad en pantallas móviles pequeñas debido a formularios extensos (ej. Publicar Viaje) → **Mitigación:** Usar `max-h-[85vh]` con `overflow-y-auto`, espaciados compactos (`space-y-3`) y tipografía con `clamp` / utilidades responsivas.
- **[Riesgo]** Pérdida de foco o visibilidad del Spotlight durante el Tour de Onboarding → **Mitigación:** Asegurar que los tooltips usen capas z-index elevadas (`z-50` / `z-[60]`) con bordes celestes brillantes (`border-sky-300`) y sombras de acento.
