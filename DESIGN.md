# DESIGN.md — Sistema de Diseño Impeccable para Faredeo ❄️🏔️

Este documento define el Sistema de Diseño Visual **Impeccable** oficial para **Faredeo**, bajo el concepto **"Deep Andes Emerald & Solar Gold"**.

---

## 1. Concepto Visual & Estética ("Deep Andes Emerald")

Faredeo utiliza una estética inspirada en la naturaleza viva de la cordillera de los Andes, las aguas glaciales de vertiente y los rayos de sol matutinos. Combina una base profunda **Azul Pizarra Cordillerano** (`#0a1118`) con cristales traslúcidos y acentos vibrantes de **Verde Esmeralda Glaciar** (`#00c9a7`) y **Dorado Solar** (`#f7b731`).

---

## 2. Paleta de Colores y Tokens

### 2.1 Colores Principales

| Categoría | Nombre | Hex / Valor | Uso / Propósito |
| :--- | :--- | :--- | :--- |
| **Background / Base** | Deep Andes Slate | `#0a1118` | Fondo principal profundo y elegante |
| **Surface / Card** | Emerald Frost Glass | `rgba(14, 22, 32, 0.85)` | Tarjetas de cristal traslúcido con blur |
| **Primary Accent** | Glacier Emerald | `#00c9a7` | Botones de acción principal, estado Subida ⬆️, badges de verificación |
| **Secondary Accent** | Solar Gold | `#f7b731` | Precios por cupo y estado Bajada ⬇️ |
| **Text Primary** | Pure Snow White | `#f8fafc` | Títulos y datos principales |
| **Text Secondary** | Muted Slate | `#94a3b8` | Subtítulos y etiquetas secundarias |
| **Borders & Glass** | Emerald Glow Border | `rgba(0, 201, 167, 0.22)` | Bordes sutiles con resplandor esmeralda |

### 2.2 Variables CSS (`globals.css`)

```css
:root {
  --background: #0a1118;
  --foreground: #f8fafc;
  --card-bg: rgba(14, 22, 32, 0.85);
  --border-color: rgba(0, 201, 167, 0.22);
  --accent-primary: #00c9a7;
  --accent-primary-hover: #00e0b8;
  --accent-gold: #f7b731;
}
```

---

## 3. Tipografía y Jerarquía

* **Fuente**: System-UI / Inter / Sans.
* **Contraste**: Texto `#f8fafc` sobre cristal `#0a1118` para máxima legibilidad táctil en smartphones bajo el sol de la montaña.

