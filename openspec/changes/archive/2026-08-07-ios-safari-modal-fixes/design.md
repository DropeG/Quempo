# Technical Design: iOS Safari Compatibility & Publish Modal Fixes

## Context

Safari en iOS aplica comportamientos nativos específicos que no ocurren en emuladores Chrome Desktop:
1. `::-webkit-date-and-time-value` en `<input type="date">` y `<input type="time">` tiene `min-width: 120px` y `text-align: center/right` en WebKit si no se resetea explícitamente.
2. Deslizar en diagonal sobre un modal con `fixed inset-0` en iOS activa scroll elástico (rubber-band) en el viewport global.

Además, el usuario simplificó la interfaz del modal removiendo el campo manual de Instagram para heredarlo de forma transparente desde el perfil guardado del usuario en Supabase.

## Goals / Non-Goals

**Goals:**
- Resetear pseudo-elementos WebKit `input[type="date"]::-webkit-date-and-time-value` e `input[type="time"]::-webkit-date-and-time-value` en CSS global.
- Prevenir rubber-band horizontal en iOS usando `overscroll-x-none touch-pan-y` en el backdrop del modal.
- Asegurar que la herencia automática de Instagram en `PublishModal.tsx` persista correctamente en Supabase.

**Non-Goals:**
- Reemplazar los inputs nativos `<input type="date">` o `<input type="time">` por librerías de terceros (se mantienen los componentes nativos ligeros).

## Decisions

### 1. Reset de WebKit en `globals.css`
Añadir selector CSS específico:
```css
input[type="date"]::-webkit-date-and-time-value,
input[type="time"]::-webkit-date-and-time-value {
  text-align: left;
  min-height: 1em;
}
```
Esto fuerza a WebKit iOS a alinear el valor a la izquierda y respetar los paddings del input.

### 2. Prevención de Rubber-Band en Modal Backdrop
Añadir `overscroll-x-none touch-pan-y` al contenedor exterior `fixed inset-0` de `PublishModal.tsx`.
