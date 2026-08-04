## Context

El usuario solicitó explícitamente que durante el Paso 4 del tutorial se abra el detalle del viaje para visualizar los campos completos (tracción 4x4, cadenas, porta-skis) y el botón verde de coordinación por WhatsApp sin comisiones.

## Goals / Non-Goals

**Goals:**
- En el Paso 4 (`stepIndex === 3`), llamar `setSelectedTrip(targetTrip)` para abrir `TripDetailModal`.
- Configurar `data-tour="whatsapp-btn"` para que el Spotlight enmarque el botón de WhatsApp dentro del modal desplegado.
- Garantizar que la Bottom Sheet del tutorial permanezca con `z-[250]`, sobre la capa del modal `z-[100]` o `z-[150]`, sin superponerse a la información clave.
- Cerrar `TripDetailModal` al avanzar al Paso 5 o salir del tour.

**Non-Goals:**
- No alterar la experiencia fluida ni reintroducir loops de scroll.

## Decisions

1. **Apertura controlada en `page.tsx`**:
   - `stepIndex === 3` setea `selectedTrip` con el primer viaje o `DEMO_TRIP`.
   - `stepIndex !== 3` limpia `selectedTrip` a `null`.

2. **Z-Index Layering**:
   - `TripDetailModal` renderiza en `z-[100]`.
   - `SpotlightTourOverlay` Bottom Sheet renderiza en `z-[250]` garantizando visibilidad de los controles del tutorial.

## Risks / Trade-offs

- **[Riesgo]** Si el arreglo de viajes está vacío en la base de datos.
  - *Mitigación*: Fallback garantizado a `DEMO_TRIP` (viaje de prueba precargado).
