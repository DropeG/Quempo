## Why

En la página de Términos de Servicio y Privacidad (`/terminos`), al hacer scroll hacia abajo, el contenido se solapa visualmente con la barra de navegación superior. Esto ocurre porque el componente `Navbar` utiliza un fondo 100% transparente sin desenfoque (`bg-transparent`), haciendo que el texto se superponga con el logotipo y el perfil de usuario. Además, en la página de términos no es necesario mostrar la gestión de perfil ni botones de sesión del usuario.

## What Changes

- Reemplazar el `Navbar` estándar en `/terminos` por una barra superior dedicada y simplificada.
- Incorporar al header estético la marca Quempo (logo y nombre) y un botón de navegación visible "Volver a Quempo" alineado a la derecha.
- Aplicar un estilo Glassmorphism fijo a la barra superior (`bg-[#091a2c]/85 backdrop-blur-xl border-b border-white/10 shadow-lg sticky top-0 z-50`) para evitar solapamientos al hacer scroll.
- Eliminar el botón duplicado de "Volver a Quempo" del cuerpo principal (`<main>`) de la página de términos.

## Capabilities

### New Capabilities
*(Ninguna)*

### Modified Capabilities
- `legal-terms`: Actualizar la experiencia de navegación del encabezado en `/terminos` para incluir un header sticky simplificado con glassmorphism y botón directo de retorno a la página principal.

## Impact

- `src/app/terminos/page.tsx`: Modificación en la estructura del layout y el encabezado superior.
