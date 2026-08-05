## Why

En la vista móvil de la aplicación, las tarjetas de Origen y Destino están dispuestas una al lado de la otra horizontalmente. Sin embargo, el botón de intercambio utiliza un icono de flechas verticales (`ArrowUpDown`), lo cual genera una inconsistencia visual y una mala jerarquía de dirección para el usuario en dispositivos móviles. En la vista desktop, al estar las tarjetas apiladas de forma vertical, el icono de flechas verticales resulta adecuado.

## What Changes

- Reemplazar el icono de intercambio en el layout móvil (`lg:hidden`) por flechas horizontales (`ArrowLeftRight` de `lucide-react`).
- Mantener la rotación animada de 180° al hacer tap en el botón de intercambio en móvil.
- Mantener intacto el icono de intercambio vertical (`ArrowUpDown`) en la vista desktop (`hidden lg:block`).

## Capabilities

### New Capabilities

N/A

### Modified Capabilities

- `trip-discovery`: Actualizar los requerimientos visuales del botón de intercambio de dirección en vista móvil para especificar el uso de flechas horizontales.

## Impact

- `src/app/page.tsx`: Modificación de los imports de `lucide-react` para incluir `ArrowLeftRight` y actualización de la sección responsiva móvil.
