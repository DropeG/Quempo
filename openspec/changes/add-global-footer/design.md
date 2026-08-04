## Context

La página principal (`src/app/page.tsx`) utiliza un contenedor flexible con dirección de columna (`flex flex-col min-h-screen`) y un área de contenido principal (`<main className="flex-1 ...">`). Actualmente, no existe un pie de página (footer) global al final de la página, dejando la parte inferior vacía o terminando directamente tras el feed de viajes.

## Goals / Non-Goals

**Goals:**
- Implementar un footer global que calce visualmente con el diseño alpino de Quempo (Cerro Plomo de fondo).
- Utilizar la Opción A (limpia y centrada) para mantener la minimalismo y evitar peso visual en móvil y desktop.
- Enlazar la comunidad oficial de WhatsApp, la cuenta de Instagram y proveer un descargo de responsabilidad legal visible.
- Asegurar que el footer siempre se sitúe en el extremo inferior del viewport (en caso de feeds vacíos o cortos) mediante posicionamiento flexbox (`mt-auto`).

**Non-Goals:**
- Crear subpáginas legales complejas para los términos de uso en esta fase.
- Crear una estructura de footer con múltiples columnas o mapas de sitio extensos.

## Decisions

### 1. Ubicación y Estructura en el Layout
El footer se ubicará directamente al final de la estructura JSX principal de `src/app/page.tsx`, inmediatamente después del cierre de la etiqueta `</main>` y antes de las definiciones de modales y drawers.
* **Razón:** El elemento contenedor principal del archivo tiene la clase `flex flex-col min-h-screen`. Al colocar la etiqueta `<footer>` después del `<main>` (que tiene `flex-1`), flexbox empujará automáticamente el footer al fondo de la pantalla incluso si el contenido del feed es corto o está vacío.

### 2. Estilo Visual Alpino y Contrastes
El footer tendrá un fondo oscuro translúcido muy ligero (`bg-black/10`), un borde superior especular (`border-t border-white/10`) y un desenfoque de fondo menor (`backdrop-blur-xs`).
* **Razón:** Sigue la pauta visual del sistema de diseño en `DESIGN.md` (Clean Alpine Frost & Sky Glass). Permite que la imagen de fondo fija del Cerro Plomo siga siendo visible a través del footer sin perder legibilidad en los enlaces.
* **Tipografía:** Textos en blanco y gris frío (`text-slate-400` y `text-white`) con tamaños pequeños (`text-xs` y `text-[10px]`) para mantener la elegancia.

## Risks / Trade-offs

- **[Riesgo] Interferencia con botones de acción flotantes en móvil:** En móviles, la interfaz puede tener elementos flotantes o barras de acción.
  - *Mitigación:* Se agregará margen y espaciado vertical ergonómico (`py-8 mt-auto`), asegurando que no se superponga con los elementos del Feed.
