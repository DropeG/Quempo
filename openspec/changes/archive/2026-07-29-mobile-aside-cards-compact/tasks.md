## 1. Wrapper interno del aside — layout 2 columnas en mobile

- [x] 1.1 En el `<div className="lg:sticky lg:top-20 min-h-[calc(100vh-120px)] flex flex-col justify-start gap-4">` (línea ~326), cambiar a `grid grid-cols-2 gap-3 lg:flex lg:flex-col lg:sticky lg:top-20 lg:min-h-[calc(100vh-120px)] lg:justify-start lg:gap-4` para activar el layout de 2 columnas en mobile

## 2. Panel 1 — Ruta de Viaje (ajuste de padding mobile)

- [x] 2.1 En el `<div data-tour="direction-switch" className="glass-card rounded-3xl p-5 space-y-3.5">`, cambiar a `p-3 lg:p-5` y `space-y-2.5 lg:space-y-3.5`

## 3. Panel 2 — Conduces a la cordillera (ajuste de padding + ocultar descripción)

- [x] 3.1 En el `<div className="glass-card rounded-3xl p-5 space-y-3.5">` del Panel 2, cambiar a `p-3 lg:p-5` y `space-y-2.5 lg:space-y-3.5`
- [x] 3.2 En el `<p className="text-xs text-slate-200 ...">` (párrafo descriptivo del Panel 2), añadir `hidden lg:block` para ocultarlo en mobile

## 4. Verificación

- [x] 4.1 Verificar en DevTools (viewport < 1024px) que ambas cards aparecen lado a lado en una fila
- [x] 4.2 Verificar que "🔍 Viajes Disponibles" es visible sin scroll inmediatamente debajo de las cards
- [x] 4.3 Verificar en DevTools (viewport ≥ 1024px) que el layout desktop es idéntico al estado anterior
- [x] 4.4 Verificar que el botón "Publicar Mi Viaje" es legible y funcional en el espacio reducido de mobile
