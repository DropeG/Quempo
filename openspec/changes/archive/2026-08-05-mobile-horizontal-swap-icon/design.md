## Context

En la aplicación Quempo, el selector de dirección de viaje permite cambiar el sentido del viaje entre Santiago y los Centros de Ski (Subida / Bajada).
En la vista móvil (`lg:hidden`), los contenedores de Origen y Destino están alineados horizontalmente uno al lado del otro.
En la vista desktop (`hidden lg:block`), los contenedores están apilados verticalmente uno arriba del otro.

Actualmente ambos usan el icono `ArrowUpDown` de `lucide-react`. Para mejorar la coherencia del diseño y la experiencia de usuario (UX) en móvil, reemplazaremos `ArrowUpDown` por `ArrowLeftRight` únicamente en la rama JSX correspondiente a móvil.

## Goals / Non-Goals

**Goals:**
- Reemplazar el icono de intercambio vertical (`ArrowUpDown`) por flechas horizontales (`ArrowLeftRight`) en la vista móvil (`lg:hidden`).
- Mantener la rotación suave de 180° (`swapRotation`) al activar el botón.
- Preservar la disposición y el icono vertical en la vista desktop (`hidden lg:block`).

**Non-Goals:**
- Cambiar la lógica o el estado del intercambio (`toggleDirectionSwap`).
- Cambiar el diseño del selector en desktop.

## Decisions

- **Uso de `ArrowLeftRight` de `lucide-react`**: `lucide-react` ya es la librería de iconos de la aplicación. `ArrowLeftRight` representa la dirección horizontal adecuadamente.
- **Mantener animación de `rotate`**: La propiedad CSS `transform: rotate(${swapRotation}deg)` continuará aplicándose a `ArrowLeftRight`, invirtiendo suavemente las flechas en cada clic/tap.

## Risks / Trade-offs

- Ninguno. Es una modificación estética y visual pura sin riesgo de regresión en lógica ni afectación a desktop.
