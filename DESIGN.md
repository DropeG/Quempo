# DESIGN.md — Sistema de Diseño Impeccable para Faredeo ❄️🏔️

Este documento define el Sistema de Diseño Visual **Impeccable** oficial para **Faredeo**, bajo el concepto **"Clean Alpine Frost & Sky Glass"**.

---

## 1. Concepto Visual & Estética ("Clean Alpine Frost & Sky Glass")

Faredeo adopta una estética alpina moderna, limpia y fría inspirada en las cumbres nevadas de los Andes:
- **Base Nieve & Cielo**: Tonos blanco nieve purísimos (`#F0F4F9`) y degradados translúcidos helados.
- **Imagen de Montaña sin Capa Verde**: Fondo fotográfico del Cerro Plomo 100% nítido, sin capas de opacidad ni filtros verdosos oscuros.
- **Efecto Snow Glass**: Tarjetas y contenedores translúcidos con elevado desenfoque (`backdrop-filter: blur(20px)`), bordes cristalinos en blanco tiza (`rgba(255, 255, 255, 0.85)`) y sombras frías profundas.
- **Títulos Azul Oscuro**: Títulos, encabezados y nombres en azul marino profundo (`#0F2942`) para máxima jerarquía visual y contraste impecable.
- **Acciones & Botones Celeste**: Botones CTA principales y acentos interactivos en celeste azulado vibrante (`#38BDF8`), con estado hover en azul celeste profundo (`#0284C7`).

---

## 2. Paleta de Colores y Tokens

### 2.1 Colores Principales

| Categoría | Nombre | Hex / Valor | Uso / Propósito |
| :--- | :--- | :--- | :--- |
| **Background / Base** | Snow Peak White | `#F0F4F9` | Fondo principal limpio de nieve helada |
| **Surface / Card** | Frosted Snow Glass | `rgba(255, 255, 255, 0.75)` | Tarjetas translúcidas con efecto cristal helado |
| **Primary Accent** | Sky Celeste | `#38BDF8` | Botones CTA principales, acentos y selecciones |
| **Primary Hover** | Deep Celestial Blue | `#0284C7` | Estado hover de acciones y botones |
| **Titles / Headings** | Deep Navy Blue | `#0F2942` | Títulos y datos principales de máxima legibilidad |
| **Text Secondary** | Muted Cold Slate | `#475569` | Subtítulos y etiquetas secundarias |
| **Borders & Lines** | Crystal Ice Line | `rgba(255, 255, 255, 0.85)` / `rgba(186, 230, 253, 0.4)` | Bordes sutiles de cristal |

### 2.2 Variables CSS (`globals.css`)

```css
:root {
  --font-primary: var(--font-dm-sans), system-ui, sans-serif;
  --background: #F0F4F9;
  --foreground: #0F2942;
  --card-bg: rgba(255, 255, 255, 0.75);
  --card-bg-solid: #FFFFFF;
  --border-color: rgba(255, 255, 255, 0.85);
  --glass-shadow: rgba(15, 41, 66, 0.08);
  --accent-primary: #38BDF8;
  --accent-primary-hover: #0284C7;
  --title-color: #0F2942;
  --text-secondary: #475569;
}
```

---

## 3. Tipografía y Jerarquía

* **Fuente**: DM Sans / System-UI moderna.
* **Contraste**: Títulos en Azul Oscuro (`#0F2942`) sobre cristal blanco/celeste para máxima legibilidad y jerarquía premium.




