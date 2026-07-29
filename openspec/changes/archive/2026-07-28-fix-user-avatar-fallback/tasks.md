## 1. Crear Componente Unificado UserAvatar

- [x] 1.1 Crear `src/components/UserAvatar.tsx` con soporte para `src`, `name`, `email`, variaciones de tamaño (`sm`, `md`, `lg`, `xl`), `referrerPolicy="no-referrer"` y manejador `onError` que conmuta a la letra inicial.

## 2. Refactorizar Avatares en Componentes de Home y Modales

- [x] 2.1 Reemplazar renderizado de avatar en `Navbar.tsx` usando `<UserAvatar />`.
- [x] 2.2 Reemplazar renderizado de avatar en `TripCard.tsx` y `TripCardAccordion.tsx` usando `<UserAvatar />`.
- [x] 2.3 Reemplazar renderizado de avatar en `TripDetailModal.tsx` y `ProfileModal.tsx` usando `<UserAvatar />`.

## 3. Verificación

- [x] 3.1 Validar que la inicial "P" aparezca limpia y estilizada en Home (Navbar y tarjetas de viaje) cuando falle o no exista la foto de Google.
