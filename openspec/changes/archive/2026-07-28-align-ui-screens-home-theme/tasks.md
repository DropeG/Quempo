## 1. Rediseño del Modal 'Publicar Mi Viaje'

- [x] 1.1 Estilizar el contenedor modal y overlay de `PublishModal.tsx` con la clase `.glass-card`, desenfoque de nieve `backdrop-filter: blur(26px)` y telón oscuro `bg-slate-950/70 backdrop-blur-md`
- [x] 1.2 Actualizar tipografía, campos de entrada (`inputs`/`selects`) con fondos translúcidos `bg-white/10`, bordes cristalinos y anillos de enfoque celeste `#38BDF8`
- [x] 1.3 Adaptar el botón CTA principal "Publicar Viaje" con el token `button-primary` (fondo celeste `#38BDF8`, texto azul marino `#0F2942`, font-black y hover `#0284C7`)
- [x] 1.4 Asegurar responsividad completa con scroll interno suave (`max-h-[85vh] overflow-y-auto`) tanto en Mobile como en Desktop

## 2. Rediseño de la Experiencia 'El Tutorial' (Onboarding)

- [x] 2.1 Refactorizar `OnboardingWelcomeModal.tsx` aplicando la estética `Clean Alpine Frost & Sky Glass`, bordes brillantes `border-white/30`, botón primario celeste y acción "Omitir por ahora" amigable
- [x] 2.2 Estilizar las tarjetas de tooltip y contenedores de paso de `SpotlightTourOverlay.tsx` con tarjetas de cristal helado, insignias de progreso celestes y z-index correcto
- [x] 2.3 Ajustar la elevación de z-index y legibilidad durante la apertura de modales en los pasos 4 (Detalle de Viaje) y 5 (Publicar Viaje)

## 3. Rediseño del Modal 'Mi Perfil'

- [x] 3.1 Estilizar la tarjeta modal de `ProfileModal.tsx` con contenedor glassmorphic `.glass-card`, bordes especulares de luz y botón de cierre flotante
- [x] 3.2 Refactorizar la cabecera de usuario (avatar con anillo `ring-2 ring-white/70`, badge celeste de viajes publicados e información de Google)
- [x] 3.3 Estilizar los campos de formulario de WhatsApp e Instagram, botón "Guardar Perfil" y acción para reiniciar el tutorial ("Ver tutorial de inicio")

## 4. Verificación Visual & Responsividad

- [x] 4.1 Validar que las tres pantallas cumplan con los tokens de color, tipografía y sombras especificados en `DESIGN.md`
- [x] 4.2 Probar legibilidad, jerarquía de contraste y comportamientos táctiles en resoluciones Desktop (1024px+) y Mobile (<640px)
