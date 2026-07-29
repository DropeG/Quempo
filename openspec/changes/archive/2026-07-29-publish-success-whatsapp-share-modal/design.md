## Context

Los conductores que publican viajes en Quempo necesitan difundir sus cupos de inmediato en la comunidad de WhatsApp de ski/snowboard para asegurar la reserva de sus asientos.

## Goals / Non-Goals

**Goals:**
- Presentar una pantalla de éxito inmediata tras guardar la publicación en Supabase.
- Mantener la estética visual premium de Quempo (tarjeta glassmorphic `#091a2c`, gradientes celestes/azules, bordes suaves y bordes con glow).
- Proporcionar 2 llamadas a la acción claras:
  1. **"1. Unirme al Grupo Oficial de WhatsApp"**: Abre el link de invitación oficial del grupo de WhatsApp en una nueva pestaña.
  2. **"2. Difundir Viaje en el Grupo"**: Abre WhatsApp con la tarjeta del viaje y el enlace `/v/id` pre-cargado.
- Permitir al usuario cerrar o ir al Home cuando lo desee.

**Non-Goals:**
- Forzar la instalación de bots de terceros o automatizaciones complejas que requieran servidores extra.

## Decisions

### 1. Componente `PublishSuccessModal.tsx`
- Se crea como componente flotante estilizado con las mismas clases Tailwind y tokens visuales que `PublishModal.tsx` y `TripDetailModal.tsx`.
- Recibe el viaje recién creado (`trip: Trip`) para mostrar la micro-tarjeta del viaje dentro del modal de éxito.

### 2. Integración en `PublishModal.tsx`
- En lugar de llamar solo a `onClose()` tras publicar en Supabase, `PublishModal` disparará la apertura de `PublishSuccessModal` enviándole la información del viaje recién creado.

## Risks / Trade-offs

- **[Risk]**: Bloqueo de ventanas emergentes (pop-ups) en navegadores móviles al hacer clic en un enlace de WhatsApp.
  - **Mitigación**: Usar hipervínculos `<a href="..." target="_blank">` nativos en los botones para que el navegador ejecute la apertura directa sin ser bloqueado por pop-up blockers.
