# DESIGN.md — Sistema de Diseño Impeccable para Faredeo ❄️🏔️

Este documento define el Sistema de Diseño Visual **Impeccable** para **Faredeo**, con el concepto **"Monocromático Nieve & Contraste Puro"**.

---

## 1. Concepto Visual & Estética ("Snow Crisp & Obsidian Night")

Faredeo utiliza una estética de alto contraste inspirada en aplicaciones deportivas de alta gama (Strava, Slopes, Red Bull Snow). Reemplaza los azules genéricos de plantilla por una base ultra oscura **Negro Obsidiana** (`#09090b`), tarjetas traslúcidas de blanco hielo con bordes definidos y acentos limpios de alto impacto.

---

## 2. Paleta de Colores y Tokens

### 2.1 Colores Principales

| Categoría | Nombre | Hex / Valor | Uso / Propósito |
| :--- | :--- | :--- | :--- |
| **Background / Base** | Obsidian Night | `#09090b` | Fondo principal profundo y puro |
| **Surface / Card** | Pure Snow Glass | `rgba(255, 255, 255, 0.05)` | Tarjetas traslúcidas de alto contraste |
| **Surface Hover** | Snow Glass Hover | `rgba(255, 255, 255, 0.08)` | Estado hover táctil con borde blanco nítido |
| **Primary Accent** | Electric Glacier Cyan | `#38bdf8` / `#06b6d4` | Destacados sutiles de Subida ⬆️ y estado activo |
| **Secondary Accent** | Alpine Amber Sunset | `#fb923c` | Sentido Bajada ⬇️ |
| **Text Primary** | Pure Snow White | `#ffffff` | Títulos y datos clave con contraste 100% nítido |
| **Text Secondary** | Muted Ice Slate | `#a1a1aa` | Leyendas y etiquetas secundarias |
| **Borders & Dividers** | Snow Border | `rgba(255, 255, 255, 0.15)` | Delimitadores nítidos de alta definición |

### 2.2 Variables CSS (`globals.css`)

```css
:root {
  --background: #09090b;
  --foreground: #ffffff;
  --card-bg: rgba(255, 255, 255, 0.04);
  --border-color: rgba(255, 255, 255, 0.14);
  --accent-cyan: #38bdf8;
  --accent-orange: #fb923c;
  --text-muted: #a1a1aa;
}
```

---

## 3. Tipografía y Jerarquía

* **Fuente**: Geist / System-UI.
* **Contraste**: Blanco puro `#ffffff` sobre fondos oscuros para lectura perfecta al aire libre en la nieve.
