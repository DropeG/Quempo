## Context

Actualmente en Faredeo los conductores publican sus viajes especificando su nombre, número de WhatsApp y detalles del trayecto. Para brindar un nivel de confianza social adicional, permitiremos a los conductores agregar su usuario de Instagram.

## Goals / Non-Goals

**Goals:**
- Permitir ingresar opcionalmente el usuario de Instagram al publicar un viaje.
- Sanitizar automáticamente cualquier entrada (removiendo `@`, prefijos de URL de Instagram o espacios innecesarios).
- Mostrar el ícono oficial de Instagram en `TripDetailModal` a la derecha del nombre del conductor.
- Implementar una tarjeta desplegable (Hover Card) elegante estilo Glassmorphism al pasar el mouse por el ícono con el usuario, foto de perfil y enlace directo al perfil de Instagram (`https://instagram.com/{handle}`).
- Garantizar buen comportamiento en pantallas táctiles de móviles (tap directo al enlace de Instagram).

**Non-Goals:**
- Embeber la cuadrícula o feed de imágenes de Instagram mediante iFrames (debido a limitaciones técnicas de la API de Meta, CORS y autenticación).
- Obligar al usuario a conectar via OAuth de Instagram.

## Decisions

### Decisión 1: Guardar el handle limpio (`instagram_handle`) en `trips`
- **Razón**: Al almacenar únicamente la cadena limpia del usuario (ejemplo `pedrogonzalez` en lugar de la URL completa), garantizamos consistencia en la base de datos y facilitamos la construcción flexible de la URL final o del handle `@pedrogonzalez` en la interfaz.

### Decisión 2: Hover Card Nativo en lugar de Embed/iFrame
- **Razón**: Los iFrames de Instagram sufren de bloqueos por CORS, políticas de cookies y redirección a login en navegadores móviles/desktop. Un Hover Card nativo estilizado en la aplicación brinda cero latencia, total congruencia estética con Faredeo y acceso inmediato a Instagram en una nueva pestaña.

## Risks / Trade-offs

- **[Riesgo]**: El usuario ingresa un handle inexistente o mal escrito.
  - *Mitigación*: Se aplica sanitización en tiempo real al escribir en el formulario (se limpian caracteres inválidos y prefijos). Al hacer clic en el link, la URL abre directamente la página oficial de Instagram para ese handle.
- **[Riesgo]**: En pantallas táctiles no funciona el evento hover.
  - *Mitigación*: En dispositivos móviles el ícono de Instagram responde al toque (tap) directamente redirigiendo al perfil o mostrando un popover adaptado.
