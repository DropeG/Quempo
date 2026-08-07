## 1. Modificación de PublishModal

- [x] 1.1 Eliminar el estado `instagramHandle`, su setter y lógica de limpieza en `src/components/PublishModal.tsx`.
- [x] 1.2 Remover el input JSX del campo de Instagram en el formulario de `src/components/PublishModal.tsx`.
- [x] 1.3 Actualizar la lógica de guardado (insert/update) en `src/components/PublishModal.tsx` para obtener e incluir el `instagram_handle` directamente desde `profiles` sin pedirlo en la interfaz.

## 2. Verificación

- [x] 2.1 Probar la publicación de un viaje y verificar que no se muestra el campo de Instagram.
- [x] 2.2 Verificar que `TripDetailModal.tsx` mantiene el badge de Instagram para usuarios que tengan su perfil configurado.
- [x] 2.3 Ejecutar `npm run build` para asegurar la compilación del proyecto.
