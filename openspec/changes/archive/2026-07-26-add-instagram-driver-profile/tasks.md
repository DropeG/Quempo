## 1. Actualización de Tipos y Schema

- [x] 1.1 Agregar `instagram_handle?: string;` a la interfaz `Trip` en `src/types/trip.ts`.
- [x] 1.2 Ejecutar migración o alter table en Supabase para agregar la columna `instagram_handle text` a la tabla `trips`.

## 2. Captura en Formulario de Publicación

- [x] 2.1 Agregar el campo opcional de Instagram en `PublishModal.tsx` con icono de Instagram e instruir la regla de usuario `@usuario`.
- [x] 2.2 Implementar sanitización automática para limpiar `@` o prefijos `https://instagram.com/` antes de enviar el payload a Supabase.

## 3. Visualización y Hover Card en Modal de Detalle

- [x] 3.1 Importar el icono de Instagram (de `lucide-react`) en `TripDetailModal.tsx`.
- [x] 3.2 Renderizar el icono únicamente si `trip.instagram_handle` está presente.
- [x] 3.3 Construir la tarjeta emergente (Hover Card / Tooltip Glassmorphism) que muestre el usuario `@handle` y enlace activo a `https://instagram.com/{handle}`.
