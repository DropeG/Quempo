# DESIGN.md — Sistema de Diseño Impeccable para Faredeo ❄️🏔️

Este documento define el Sistema de Diseño Visual **Impeccable** oficial para **Faredeo**, bajo el concepto **"Alpine Light & Studio Clean"** (Opción 1).

---

## 1. Concepto Visual & Estética ("Alpine Light")

Faredeo utiliza una estética minimalista, luminosa y orgánica inspirada en la nieve fresca bajo el sol matutino de los Andes. Se elimina el sobrecargado cristal neón y se adopta un lenguaje claro, táctil, limpio y accesible, con tarjetas blancas puras, tipografía nítida y acentos en **Verde Pino Alpino** (`#1b4332`) y **Bronce Cordillerano** (`#b45309`).

---

## 2. Paleta de Colores y Tokens

### 2.1 Colores Principales

| Categoría | Nombre | Hex / Valor | Uso / Propósito |
| :--- | :--- | :--- | :--- |
| **Background / Base** | Alpine Warm Snow | `#f8fafb` | Fondo principal fresco, claro y limpio |
| **Surface / Card** | Pure White Studio | `#ffffff` | Tarjetas y contenedores con bordes finos de 1px |
| **Primary Accent** | Forest Pine Green | `#1b4332` | Botones de acción principal, estado seleccionado, acentos clave |
| **Primary Hover** | Deep Alpine Pine | `#2d6a4f` | Estado hover de acciones primarias |
| **Secondary Accent** | Cordillera Bronze | `#b45309` | Badges de bajada, precios y destacados secundarios |
| **Text Primary** | Deep Charcoal Tinta | `#111827` | Títulos y datos principales de alto contraste |
| **Text Secondary** | Muted Alpine Slate | `#6b7280` | Subtítulos, etiquetas y horas |
| **Borders & Lines** | Crisp Minimal Line | `#e5e7eb` | Bordes limpios de 1px sin resplandores sintéticos |

### 2.2 Variables CSS (`globals.css`)

```css
:root {
  --background: #f8fafb;
  --foreground: #111827;
  --card-bg: #ffffff;
  --border-color: #e5e7eb;
  --accent-primary: #1b4332;
  --accent-primary-hover: #2d6a4f;
  --accent-bronze: #b45309;
}
```

---

## 3. Tipografía y Jerarquía

* **Fuente**: System-UI / Inter / Sans-serif moderna.
* **Contraste**: Texto `#111827` sobre fondo `#ffffff` para legibilidad óptima en exteriores bajo luz solar directa.
