## Context

Quempo cuenta con múltiples puntos donde se expone o configura el enlace al grupo comunitario oficial de WhatsApp:
1. `.env.local`: Variable `NEXT_PUBLIC_WHATSAPP_GROUP_URL`.
2. `src/components/Footer.tsx`: Enlace global de la comunidad.
3. `src/components/PublishSuccessModal.tsx`: CTA para unirse al grupo de WhatsApp tras publicar un viaje.
4. `PRODUCT.md`: Documentación del producto.
5. `openspec/specs/simple-footer/spec.md`: Requisito de redirección.

El enlace anterior correspondía a un grupo de pruebas (`https://chat.whatsapp.com/ESElGo2ZznuJoFw66kmp4r`) y debe ser actualizado al enlace oficial definitivo: `https://chat.whatsapp.com/HSYkGEhRxGgCpPsd6S4Rid`.

## Goals / Non-Goals

**Goals:**
- Actualizar el valor de `NEXT_PUBLIC_WHATSAPP_GROUP_URL` en `.env.local` al nuevo enlace definitivo.
- Actualizar la URL de respaldo (fallback) en `Footer.tsx` y `PublishSuccessModal.tsx`.
- Mantener la coherencia de la documentación técnica y las especificaciones.

**Non-Goals:**
- Modificar el flujo de compartir viajes ni el generador de enlaces `wa.me` de mensajes directos.
- Crear nuevos componentes UI.

## Decisions

### Decision 1: Mantener variable de entorno + fallback consistente
- Mantener `process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL` como la fuente primaria de verdad, pero sincronizar la cadena constante por defecto en `Footer.tsx` y `PublishSuccessModal.tsx` con el enlace definitivo `https://chat.whatsapp.com/HSYkGEhRxGgCpPsd6S4Rid`.

## Risks / Trade-offs

- **[Riesgo] Cache en despliegue (Vercel)**: Las variables de entorno de Next.js que inician con `NEXT_PUBLIC_` se incrustan en tiempo de compilación (*build time*).
  - *Mitigación*: Actualizar tanto el archivo local `.env.local` como los fallbacks constantes en el código fuente para garantizar que la URL funcione incluso si la variable de entorno no estuviera presente en el build.
