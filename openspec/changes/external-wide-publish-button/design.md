## Context

Mover el botón de publicar viaje fuera del contenedor Hero como una barra ancha/larga y remover el botón de publicar del Navbar.

## Goals / Non-Goals

**Goals:**
- Posicionar un botón `+ Publicar Viaje` ancho (`w-full`), elevado y llamativo directamente debajo de la tarjeta Hero.
- Remover el botón de publicar de `src/components/Navbar.tsx`.
- Mantener la respuesta modal al hacer click en el nuevo botón.

## Decisions

### Decision 1: Botón Ancho (Wide CTA Bar) fuera de la tarjeta Hero
- **Elección**: Crear un bloque `<div className="w-full">` con un botón `w-full py-4 text-base rounded-2xl` con gradiente y sombra intensa.
- **Razonamiento**: Facilita un objetivo táctil rápido en dispositivos móviles y destaca como acción principal.

### Decision 2: Navbar Limpio
- **Elección**: Remover el `<button>` de `Navbar.tsx`.
- **Razonamiento**: Evita duplicar llamados a la acción en la pantalla principal.
