## 1. Reestructuración del Layout Responsivo (`src/app/page.tsx`)

- [x] 1.1 Modificar la jerarquía visual de `src/app/page.tsx` para integrar el selector de ruta y el botón prominente de "Publicar Viaje" en un único bloque de control superior.
- [x] 1.2 Encabezar explícitamente la sección inferior como "Buscar Viajes Disponibles" integrando los chips de filtrado por día y la parrilla de viajes.
- [x] 1.3 Eliminar el botón flotante fijo (FAB) del footer mobile para integrarlo orgánicamente arriba/sidebar sin tapar contenido.
- [x] 1.4 Configurar el layout responsivo de 2 columnas para Desktop (≥1024px) con Sidebar fijo (sticky) y parrilla multicolumna de viajes a la derecha.

## 2. Optimización de Densidad Visual en Tarjetas (`src/components/TripCard.tsx`)

- [x] 2.1 Ajustar el padding vertical, tamaño de tipografía y layout interno de `TripCard.tsx` para reducir su altura vertical en pantallas móviles.
- [x] 2.2 Verificar que en vistas móviles típicas (~390px) quepan al menos 3 publicaciones en el área visible inicial del viewport.

## 3. Verificación de Interacción y Build

- [x] 3.1 Probar la apertura del modal de publicación al presionar el nuevo botón integrado de "Publicar Viaje".
- [x] 3.2 Probar los filtros por día y el switch de sentido de ruta para asegurar que la actualización de datos funcione correctamente en mobile y desktop.
