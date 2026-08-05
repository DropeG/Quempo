## Context

Quempo es una aplicación web Next.js (App Router) con un diseño visual "Clean Alpine Frost & Sky Glass". Requiere un pie de página ultra simple pero pulido que no obstaculice la navegación ni los botones flotantes de la versión móvil, mientras proyecta confianza y profesionalismo en iPad y Desktop.

## Goals / Non-Goals

**Goals:**
- Crear un componente React `Footer.tsx` ligero y completamente responsive (mobile, tablet, desktop).
- Incluir la marca `Quempo 🏔️`, enlace a Grupo WhatsApp Oficial, enlace a WhatsApp Admin (+56959365527) y enlace a `/terminos`.
- Crear la página de términos P2P en `src/app/terminos/page.tsx`.
- Mantener la línea estética Glassmorphism (`backdrop-blur-md`, bordes helados, texto blanco/slate).

**Non-Goals:**
- Formularios de contacto complejos o sistemas de soporte por ticket.
- Documentos legales extensos de 20 páginas; se privilegia la claridad y concisión P2P.

## Decisions

### 1. Componente `<Footer />` global en `src/app/layout.tsx`
- **Decisión**: Colocar `<Footer />` dentro del `body` del layout raíz, inmediatamente después del contenedor de `children`.
- **Alternativas consideradas**: Ponerlo en páginas individuales. Se descartó para evitar duplicación de código y garantizar consistencia.

### 2. Contacto directo por WhatsApp
- **Decisión**: El enlace de "Contacto" usa la URL `https://wa.me/56959365527?text=Hola%20Quempo...`.
- **Alternativas consideradas**: Correo `mailto:`. Se prefirió WhatsApp por alinearse con el flujo sin fricción ("Alpine Fast") de Quempo.

### 3. Página de Términos `/terminos`
- **Decisión**: Implementar `/terminos` como una Server Page en Next.js App Router con un diseño en contenedor de cristal translúcido y botón de retorno al inicio.

## Risks / Trade-offs

- **[Risk] Botones flotantes móviles tapan el footer**: En celulares, el footer podría colisionar con botones sticky (ej. publicar viaje).
  - *Mitigación*: Asegurar padding inferior adecuado (`pb-20 sm:pb-8`) en mobile si hay barra flotante.
