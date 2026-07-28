---
name: Faredeo
description: Plataforma de viajes compartidos a la montaña y centros de ski en Santiago de Chile
colors:
  primary: "#38BDF8"
  primary-hover: "#0284C7"
  neutral-bg: "#091a2c"
  neutral-surface: "rgba(160, 190, 215, 0.22)"
  neutral-card-solid: "#0F2942"
  neutral-text: "#FFFFFF"
  neutral-text-muted: "#94A3B8"
  accent-ice: "#E0F2FE"
typography:
  display:
    fontFamily: "var(--font-dm-sans), system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 1.875rem)"
    fontWeight: 900
    lineHeight: "1"
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "var(--font-dm-sans), system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 800
    lineHeight: "1.25"
  title:
    fontFamily: "var(--font-dm-sans), system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 900
    lineHeight: "1"
    letterSpacing: "0.05em"
  body:
    fontFamily: "var(--font-dm-sans), system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: "1.5"
  label:
    fontFamily: "var(--font-dm-sans), system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 800
    letterSpacing: "0.05em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "22px"
  2xl: "24px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-card-solid}"
    rounded: "{rounded.lg}"
    padding: "14px 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.neutral-text}"
---

# Design System: Faredeo

## Overview

**Creative North Star: "Clean Alpine Frost & Sky Glass"**

Faredeo adopta un sistema visual alpino de alta gama inspirado en la imponencia helada de los Andes. El entorno combina una fotografia hipernítida del Cerro Plomo (`/plomo/desktop/plomoDesktop2.webp`) en el fondo sin filtros verdosos ni sombras opacas, sobre la cual flotan paneles translúcidos de cristal esmerilado con refractividad de nieve (`backdrop-filter: blur(26px) saturate(145%)`).

La experiencia visual está diseñada para priorizar la rapidez y legibilidad en escritorio y móvil. La jerarquía se construye mediante textos en blanco puro (`#FFFFFF`) y azul marino profundo (`#0F2942`), acompañados por botones de acción e indicadores en celeste azulado vibrante (`#38BDF8`) que capturan el ojo instantáneamente.

**Key Characteristics:**
- Fondo fotográfico de montaña 100% nítido en capa fija (`fixed inset-0`) con orbes de brillo ambiental radial (`.ambient-glow-1`, `.ambient-glow-2`).
- Tarjetas de cristal helado con bordes especulares de luz (`inset 0 1px 0 rgba(255, 255, 255, 0.28)`).
- Acentuación dinámica en celeste alpino (`#38BDF8`) para acciones interactivas e indicadores de estado.
- Disposición de escritorio asimétrica en 12 columnas con dock de control lateral pegajoso (`sticky top-20`).

## Colors

La paleta se inspira en el contraste entre el cielo alpino sobre los picos andinos y el hielo cristalino.

### Primary
- **Sky Celeste** (`#38BDF8`): Color de acento principal. Utilizado en botones CTA ("Publicar Mi Viaje"), selecciones activas de fecha, bordes de enfoque e insignias de verificación.

### Primary Hover
- **Deep Celestial Blue** (`#0284C7`): Estado hover y activo de botones interactivos y selecciones.

### Neutral
- **Deep Alpine Night** (`#091a2c`): Color de fondo base del `body` detrás de la fotografia de montaña.
- **Frosted Snow Glass** (`rgba(160, 190, 215, 0.22)`): Fondo translúcido de las tarjetas y contenedores de cristal.
- **Deep Navy Solid** (`#0F2942`): Texto principal en botones celestes, encabezados de modales y contenedores sólidos.
- **Snow White** (`#FFFFFF`): Texto primario de títulos, nombres de conductores y precios.
- **Cold Slate / Muted Ice** (`#94A3B8` / `#E0F2FE`): Subtítulos, horas de salida y etiquetas secundarias.
- **Crystal Ice Line** (`rgba(255, 255, 255, 0.28)`): Bordes cristalinos finos de las tarjetas de vidrio.

### Named Rules
**The One Sky Accent Rule.** El acento celeste (`#38BDF8`) se reserva exclusivamente para elementos interactivos, botones de acción (CTA), estados seleccionados y marcas de verificación. Su contraste resalta inmediatamente en la pantalla.

**The High-Contrast Navy Rule.** Todo texto superpuesto sobre un contenedor o botón de fondo celeste (`#38BDF8`) DEBE utilizar azul marino profundo (`#0F2942`) con peso tipográfico `font-black` para asegurar legibilidad perfecta.

## Typography

**Display Font:** DM Sans / System-UI (`var(--font-dm-sans), system-ui, sans-serif`)
**Body Font:** DM Sans / System-UI (`var(--font-dm-sans), system-ui, sans-serif`)

**Character:** Tipografía sans-serif limpia, moderna y altamente legible, con pesos bold y black prominentes que transmiten agilidad ("Alpine Fast") y solidez.

### Hierarchy
- **Display** (`font-black (900)`, `clamp(1.5rem, 3vw, 1.875rem)` / `text-2xl sm:text-3xl`, `line-height: 1`): Logotipo de marca ("Faredeo") en la barra de navegación superior.
- **Headline** (`font-extrabold (800)`, `1rem` / `text-base`, `line-height: 1.25`): Nombres de conductores y precios destacados (`text-lg`).
- **Title** (`font-black (900)`, `0.75rem` / `text-xs`, `letter-spacing: 0.05em`, uppercase): Títulos de sección en los paneles laterales ("📍 Ruta de Viaje", "🔍 Viajes Disponibles").
- **Body** (`font-medium (500)`, `0.75rem` / `text-xs`, `line-height: 1.5`): Descripciones de viajes, notas del conductor y textos explicativos.
- **Label** (`font-extrabold (800)`, `0.625rem` / `text-[10px]`, `letter-spacing: 0.05em`, uppercase): Etiquetas de dirección ("⬆️ Subida", "⬇️ Bajada") y estados de los botones de filtro rápido.

### Named Rules
**The Mountain Crispness Rule.** Todos los encabezados principales y nombres utilizan pesos `font-black` (900) o `font-extrabold` (800) combinados con un sutil `drop-shadow-xs` para evitar desvanecimiento contra la foto de montaña.

## Layout

En pantallas Desktop (`lg:` viewports), la interfaz se organiza en un Grid de 12 columnas con distribución `max-w-6xl w-full mx-auto px-4 pt-4`:

- **Columna Izquierda / Sidebar de Control (4 Columnas - `lg:col-span-4 lg:sticky lg:top-20`):** Dock lateral flotante y fijo que contiene:
  1. Panel selector de ruta vertical con botón central de intercambio animado (`ArrowUpDown` con rotación suave de 180°).
  2. Panel destacado de publicación para conductores con botón CTA de alto impacto (`bg-[#38BDF8]`).
- **Columna Derecha / Feed de Viajes (8 Columnas - `lg:col-span-8 space-y-3`):**
  1. Cabecera con tira horizontal scrollable de mini-tarjetas de fecha ("Todas", "Hoy", "Mañana", días de la semana y calendario).
  2. Parrilla de viajes en 2 columnas (`grid grid-cols-1 sm:grid-cols-2 gap-3`) compuestas por `TripCard`.
- **Capa de Fondo & Refracción:** Imagen fija del Cerro Plomo (`/plomo/desktop/plomoDesktop2.webp`) y dos orbes de brillo ambiental difuso (`.ambient-glow-1` de 500px y `.ambient-glow-2` de 550px) para simular refracción de luz helada tras el cristal.

### Named Rules
**The Sticky Control Dock Rule.** El sidebar lateral de control en Desktop (`lg:col-span-4`) se mantiene fijo al hacer scroll (`sticky top-20`), permitiendo al conductor publicar o al pasajero cambiar de ruta en cualquier momento sin perder su posición en la lista.

## Elevation & Depth

El sistema utiliza un modelo de profundización por cristal esmerilado translúcido ("Frosted Snow Glass") en lugar de sombras opacas o tarjetas sólidas.

### Shadow Vocabulary
- **Glass Rest Shadow** (`box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35)`): Sombra difusa profunda que separa las tarjetas translúcidas de la foto de montaña.
- **Glass Hover Shadow** (`box-shadow: 0 30px 90px rgba(0, 0, 0, 0.42)`): Sombra expandida con elevación `translateY(-3px)` al pasar el cursor sobre la tarjeta.
- **Specular Border Highlight** (`inset 0 1px 0 rgba(255, 255, 255, 0.28)`): Línea de luz superior interna que imita el reflejo del sol sobre el borde de un bloque de hielo.

### Named Rules
**The Cordillera Transparency Rule.** El fondo fotográfico del Cerro Plomo se mantiene 100% visible sin capas oscurecedoras ni gradientes oscuros; la separación de capas se logra mediante desenfoque helado (`blur(26px)`) y bordes especulares brillantes.

## Shapes

- **Contenedores y Paneles:** Esquinas muy suavizadas con radio de `24px` (`rounded-3xl` / `rounded-2xl`).
- **Tarjetas de Viaje (`.glass-card`):** Radio de `22px` con borde cristalino de `1px solid rgba(255, 255, 255, 0.28)`.
- **Botones e Inputs:** Radio de `16px` (`rounded-2xl`) o `12px` (`rounded-xl`) para una sensación ergonómica y táctil.
- **Badges e Insignias:** Formas de píldora redonda (`rounded-full`).

## Components

### Buttons
- **Shape:** Rectángulo suavizado (`rounded-2xl` / `16px`).
- **Primary CTA ("Publicar Mi Viaje"):** Fondo `#38BDF8`, texto `#0F2942` (`font-black`), padding `14px 16px` (`py-3.5 px-4`), borde `1px solid rgba(255, 255, 255, 0.4)`.
- **Hover / Active:** Fondo `#0284C7`, texto `#FFFFFF`, micro-escalado `active:scale-95 transition-all duration-200`.

### Trip Card (`TripCard`)
- **Shape:** Radio de `22px` (`rounded-2xl`).
- **Fondo:** `.glass-card` (`linear-gradient(135deg, rgba(160, 190, 215, 0.22), rgba(65, 90, 120, 0.16))`) con `backdrop-filter: blur(26px) saturate(145%)`.
- **Layout:** Fila flex con alineación centrada y distribución `justify-between`. Avatar del conductor con anillo blanco (`ring-2 ring-white/70`).
- **Chevron de Acción:** Botón cuadrado de `40x40px` (`p-2.5 rounded-xl bg-white/10`) que en hover se ilumina en celeste `#38BDF8` con icono azul marino.

### Quick Date Filter Pills
- **Style:** Tarjeta vertical compacta de `78px` de ancho mínimo (`p-2.5 rounded-2xl`).
- **Estado Inactivo:** `bg-white/10 backdrop-blur-md border-white/20 text-slate-100`.
- **Estado Seleccionado:** `bg-[#38BDF8] text-[#0F2942] font-black shadow-md scale-105 border-white/60`.

### Route Switcher Panel
- **Style:** Contenedor contenedor interno (`bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20`).
- **Botón de Intercambio:** Botón circular central (`p-2.5 rounded-full bg-white/20 hover:bg-white/30 border border-white/40`) con rotación animada de 180° al hacer clic (`transition-transform duration-500 ease-in-out`).

### Navbar (`Navbar`)
- **Style:** Cabecera fija transparente (`sticky top-0 z-50 bg-transparent`), `max-w-5xl mx-auto px-4 py-3`.
- **Brand Emblem:** Cuadro de `40x40px` en `rounded-xl bg-white/20 border border-white/40 shadow-md backdrop-blur-xs` con icono de montaña.

## Do's and Don'ts

### Do:
- **Do** mantener el diseño responsivo Desktop organizado en 12 columnas con sidebar de control pegajoso (`lg:col-span-4 lg:sticky lg:top-20`).
- **Do** aplicar `backdrop-filter: blur(26px) saturate(145%)` junto a la línea de luz superior (`inset 0 1px 0 rgba(255, 255, 255, 0.28)`) en todos los paneles de vidrio.
- **Do** contrastar fondos celestes (`#38BDF8`) con tipografía azul marino profundo (`#0F2942`) y peso `font-black`.
- **Do** mantener la imagen del Cerro Plomo (`plomoDesktop2.webp`) nítida y visible detrás de la capa de vidrio en escritorio.

### Don't:
- **Don't** agregar capas oscuras de opacidad negra o verdosa sobre la fotografia de fondo de la cordillera.
- **Don't** usar tarjetas opacas de gris plano sin desenfoque de fondo; el aspecto distintivo es el cristal helado ("Frosted Snow Glass").
- **Don't** colocar texto blanco sobre botones celestes (`#38BDF8`); siempre usar azul marino (`#0F2942`) para garantizar contraste.
- **Don't** desactivar las micro-animaciones de rotación (`duration-500 ease-in-out`) ni los efectos hover táctiles (`active:scale-95`).
