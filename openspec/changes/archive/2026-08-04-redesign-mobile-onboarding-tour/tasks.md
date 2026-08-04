## 1. Rediseño del Layout & Bottom Sheet en `SpotlightTourOverlay.tsx`

- [x] 1.1 Transformar la superposición a la arquitectura **Mobile Bottom Sheet** (`fixed bottom-0 inset-x-0 z-[220] pb-safe`) con estilo *Clean Alpine Frost & Sky Glass*.
- [x] 1.2 Implementar máscara SVG de Spotlight con recorte redondeado y anillo de luz neón `#38BDF8` rodeando el elemento objetivo sin bloquear la visión del resto de la app.
- [x] 1.3 Configurar auto-scroll suave a la parte superior (`block: 'start'` con offset de respiro) para que el elemento destacado nunca sea tapado por la Bottom Sheet inferior.

## 2. Optimización de Ergonomía Táctil y Gestos

- [x] 2.1 Ajustar todos los botones de acción (*Anterior*, *Siguiente*, *Omitir*, *Finalizar*) a objetivos de toque de mínimo 48x48px con respuesta táctil y estados `:active`.
- [x] 2.2 Agregar barra de indicadores de progreso con dots celestes y contador en formato compacto ("1/6").
- [x] 2.3 Garantizar soporte para descarte rápido ("Omitir") e integración nativa de gestos de deslizamiento (*Swipe*) entre pasos en pantallas táctiles.

## 3. Coordinación en `page.tsx` y Modales Mobile

- [x] 3.1 Actualizar el callback `handleTourStepChange` en `page.tsx` para evitar que se abran modales pesados a pantalla completa durante los pasos del tour, manteniendo el foco en el flujo principal de celular.
- [x] 3.2 Almacenar y actualizar correctamente el estado de finalización en `localStorage` (`quempo_onboarding_completed_v1`) y metadatos de Supabase.

## 4. Verificación y Pruebas en Entorno Celular (Mobile Viewports)

- [x] 4.1 Probar y verificar la experiencia en resoluciones mobile estándar (iPhone SE 375px, iPhone 14/15 390px, Android 412-428px).
- [x] 4.2 Comprobar la responsividad con viewport dinámico `100dvh` y padding `env(safe-area-inset-bottom)` en Safari Mobile e in-app browsers.
- [x] 4.3 Ejecutar verificación visual de cero colisiones de texto o bloqueos de scroll antes de entregar al usuario.
