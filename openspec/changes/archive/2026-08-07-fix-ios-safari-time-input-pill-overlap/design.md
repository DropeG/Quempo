# Technical Design: Fix iOS Safari Time Input Capsule Overlap

## Context

En iOS Safari, WebKit envuelve el texto de `<input type="time">` (`7:00 a.m.`) en un botón nativo con apariencia de cápsula/óvalo (`::-webkit-date-and-time-value`). Este elemento posee su propio margen y fondo translúcido que, al colocarse en un contenedor con posición absoluta para el icono Lucide (`left-2.5 top-2.5`), se desplaza a la izquierda y se monta directamente sobre el icono del reloj.

## Goals / Non-Goals

**Goals:**
- Desactivar la apariencia de botón nativo de WebKit usando `-webkit-appearance: none` en `input[type="time"]` e `input[type="date"]`.
- Configurar `::-webkit-date-and-time-value` con `background: transparent; margin: 0; padding: 0; text-align: left;` en `src/app/globals.css`.
- Asegurar que el valor del tiempo se muestre como texto plano limpio sin traslapar el icono del reloj en iPhone Safari.

**Non-Goals:**
- Cambiar la librería de iconos Lucide o la estructura HTML de `PublishModal.tsx`.

## Decisions

### 1. Regla Global de WebKit en `globals.css`
Añadir el reseteo explícito:
```css
input[type="time"],
input[type="date"] {
  -webkit-appearance: none;
  appearance: none;
}

input[type="time"]::-webkit-date-and-time-value,
input[type="date"]::-webkit-date-and-time-value {
  text-align: left;
  min-height: 1em;
  background: transparent;
  margin: 0;
  padding: 0;
}
```
Esto elimina la cáscara/óvalo nativo en iOS Safari y mantiene el texto plano alineado a la izquierda.
