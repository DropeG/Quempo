## Context

La página de términos (`src/app/terminos/page.tsx`) utilizaba previamente el componente general `Navbar`, el cual tiene `bg-transparent` y una barra con menús de usuario y perfiles. Al hacer scroll vertical en `/terminos`, el texto largo se desplazaba hacia arriba pasando debajo de los iconos y botones del header, creando una colisión visual e ilegibilidad.

## Goals / Non-Goals

**Goals:**
- Crear una experiencia de encabezado dedicada en `/terminos` que elimine elementos innecesarios (perfil de usuario, menús de sesión) y ofrezca un botón claro de "Volver a Quempo".
- Implementar un diseño Glassmorphism fijado arriba (`sticky top-0 z-50 bg-[#091a2c]/85 backdrop-blur-xl border-b border-white/10 shadow-lg`) para impedir que el contenido scrolleado perturbe la visibilidad.
- Remover el botón duplicado de retorno dentro del cuerpo principal de la página.

**Non-Goals:**
- Modificar el comportamiento de `Navbar.tsx` en la página principal (`/`).
- Alterar los contenidos ni la redacción del documento legal de Términos y Privacidad.

## Decisions

### 1. Reemplazar `Navbar` en `terminos/page.tsx` por un Header simplificado
- **Decisión**: En lugar de modificar `Navbar.tsx` con props condicionales complejas, implementamos una cabecera limpia directamente en `src/app/terminos/page.tsx` (o un subcomponente liviano) adaptada a páginas de soporte/legales.
- **Razón**: Mantener `Navbar.tsx` enfocado en la aplicación principal y evitar inflar la lógica del Navbar global para casos particulares.

### 2. Estilo Glassmorphism Oscuro con Desenfoque
- **Decisión**: Utilizar `bg-[#091a2c]/85 backdrop-blur-xl border-b border-white/10 shadow-lg`.
- **Razón**: Es la misma paleta y estética utilizada en otras áreas nítidas de la aplicación (como `AdminDashboardClient.tsx`), ofreciendo coherencia estética y garantizando que el texto en movimiento quede borroso tras la barra.

## Risks / Trade-offs

- [Borde visible en dispositivos muy pequeños] → Mitigación: Probar con padding horizontal responsivo (`px-4 sm:px-6`) e iconos adaptables.
