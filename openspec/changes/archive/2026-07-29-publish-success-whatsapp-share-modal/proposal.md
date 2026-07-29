## Why

Cuando un conductor publica un viaje en Quempo, el objetivo inmediato es conseguir pasajeros rápidamente. La mayor parte de la coordinación de carpooling a los centros de ski de Santiago ocurre en grupos oficiales de WhatsApp. Mostrar un modal de éxito al publicar con 1-clic para unirse al grupo de WhatsApp y compartir el viaje maximiza el alcance y facilita la adopción.

## What Changes

- Crear un modal/pantalla de éxito tras publicar un viaje (`PublishSuccessModal.tsx`) con el estilo visual alpino frosted-glass de Quempo.
- Presentar 2 acciones claras y guiadas al conductor:
  1. **Unirme al Grupo Oficial de WhatsApp** (si aún no es miembro).
  2. **Difundir mi Viaje en el Grupo** (abre WhatsApp con el mensaje enriquecido y link `/v/id`).
- Conectar este modal automáticamente al completar la publicación desde `PublishModal.tsx`.

## Capabilities

### New Capabilities
- `publish-success-whatsapp-modal`: Modal de éxito tras la publicación con acciones directas para unirse al grupo oficial de WhatsApp y difundir el viaje.

### Modified Capabilities
- N/A

## Impact

- `src/components/PublishSuccessModal.tsx`: [NEW] Componente modal de éxito con estética alpina frosted glass.
- `src/components/PublishModal.tsx`: Disparar el flujo de éxito al completar el submit.
