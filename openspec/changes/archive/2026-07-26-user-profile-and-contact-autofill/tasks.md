## 1. Migración de Base de Datos Supabase

- [x] 1.1 Crear el archivo de migración `supabase/migrations/20260726_create_profiles.sql` para definir la tabla `public.profiles` (id UUID, full_name TEXT, avatar_url TEXT, whatsapp_number TEXT, instagram_handle TEXT, updated_at TIMESTAMPTZ) con políticas RLS para lectura y actualización.

## 2. Componente de Perfil de Usuario y Submenú en Navbar

- [x] 2.1 Crear el componente `ProfileModal.tsx` con soporte para visualizar el avatar de Google, el nombre, correo, número total de viajes publicados, y edición de WhatsApp e Instagram.
- [x] 2.2 Modificar `Navbar.tsx` para agregar el estado del submenú desplegable flotante al hacer clic en el perfil, incorporando las opciones "Mi perfil" y el botón de "Cerrar sesión" con estilo contrastado rojo suave (`bg-rose-500/10 text-rose-300 border-rose-500/20`).

## 3. Auto-completado y Persistencia en Formulario de Publicación

- [x] 3.1 Actualizar `PublishModal.tsx` para consultar `public.profiles` al abrirse y precargar automáticamente WhatsApp e Instagram si existen.
- [x] 3.2 Actualizar el envío de viajes en `PublishModal.tsx` para realizar un upsert automático en `public.profiles` con los datos de contacto ingresados.

## 4. Verificación y Pruebas

- [x] 4.1 Verificar la compilación del proyecto (`npm run build`).
- [x] 4.2 Probar manualmente el flujo de despliegue del menú de usuario, apertura del modal de perfil, persistencia de datos y auto-rellenado en la publicación de viajes.
