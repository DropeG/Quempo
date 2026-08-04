## 1. Reordenamiento Mobile en page.tsx

- [x] 1.1 En el `div` contenedor del grid (línea ~322), cambiar `lg:grid lg:grid-cols-12 lg:gap-6 lg:items-start space-y-4 lg:space-y-0` → agregar `flex flex-col` al inicio: `flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 lg:items-start space-y-4 lg:space-y-0`
- [x] 1.2 En el `<aside>` (línea ~325), añadir `order-2 lg:order-1` a sus clases
- [x] 1.3 En el `<section>` de viajes (línea ~423), añadir `order-1 lg:order-2` a sus clases

## 2. Verificación

- [x] 2.1 Verificar en DevTools (viewport < 1024px) que "🔍 Viajes Disponibles" aparece antes del aside
- [x] 2.2 Verificar en DevTools (viewport ≥ 1024px) que el layout de dos columnas es idéntico al estado anterior
- [x] 2.3 Verificar que `MountainStatusPill` dentro del aside sigue visible correctamente en ambos viewports
