## Why

Actualmente en el Paso 4 del tutorial ("Conexión Directa por WhatsApp 💬"), solo se resalta la tarjeta exterior del viaje en el Home sin desplegar la información completa. El usuario necesita ver el detalle real del viaje (equipamiento 4x4, cadenas, porta-skis, notas del conductor y el botón de contacto directo por WhatsApp con $0 comisión) para entender exactamente el valor de la función.

## What Changes

- **Despliegue del Detalle de Viaje en Paso 4 (`handleTourStepChange`)**: Al ingresar al Paso 4, la app abrirá automáticamente el modal de detalle (`TripDetailModal`) con un viaje de muestra (`DEMO_TRIP` o el primer viaje activo).
- **Targeting Focado en Botón de WhatsApp (`whatsapp-btn`)**: El Spotlight resaltará el botón directo de contacto por WhatsApp dentro del detalle del viaje, posicionando la tarjeta Bottom Sheet en la parte inferior sin obstruir los datos.
- **Transición Suave al Paso 5**: Al avanzar al Paso 5 o retroceder al Paso 3, el modal de detalle se cerrará limpiamente y la vista retornará al Home.

## Capabilities

### New Capabilities
- Ninguna.

### Modified Capabilities
- `onboarding-tour`: Apertura automática del modal de detalle de viaje en el Paso 4 para enseñar el equipamiento y botón de WhatsApp directo.

## Impact

- Componentes afectados: `src/app/page.tsx`, `src/components/onboarding/SpotlightTourOverlay.tsx`, `src/components/TripDetailModal.tsx`.
