## Why

El grupo oficial de WhatsApp previamente utilizado en Quempo correspondía a un grupo de pruebas. Se ha creado un nuevo grupo definitivo (`https://chat.whatsapp.com/HSYkGEhRxGgCpPsd6S4Rid`) para la comunidad de esquiadores y conductores. Es necesario actualizar todas las referencias, enlaces de respaldo y configuraciones de entorno del proyecto a este nuevo enlace definitivo.

## What Changes

- Actualizar la variable de entorno local `NEXT_PUBLIC_WHATSAPP_GROUP_URL` en `.env.local`.
- Actualizar la URL *fallback* del enlace de comunidad en `src/components/Footer.tsx`.
- Actualizar la URL *fallback* en el modal de éxito de publicación `src/components/PublishSuccessModal.tsx`.
- Actualizar la documentación de producto en `PRODUCT.md`.
- Actualizar la especificación delta/main en OpenSpec para reflejar el nuevo enlace oficial.

## Capabilities

### New Capabilities

*(Ninguna)*

### Modified Capabilities

- `simple-footer`: Actualizar la URL de redirección esperada al enlace del grupo oficial definitivo de WhatsApp.

## Impact

- **Frontend**: Componentes `Footer.tsx` y `PublishSuccessModal.tsx`.
- **Configuración & Entorno**: `.env.local` (y panel de variables de entorno de Vercel/Producción).
- **Documentación & Specs**: `PRODUCT.md` y `openspec/specs/simple-footer/spec.md`.
