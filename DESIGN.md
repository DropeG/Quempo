# DESIGN.md — Sistema de Diseño Impeccable para Faredeo ❄️🏔️

Este documento define el Sistema de Diseño Visual **Impeccable** oficial para **Faredeo**, bajo el concepto **"Alpine Spruce & Terracotta Blush"**.

---

## 1. Concepto Visual & Estética ("Alpine Spruce & Terracotta Blush")

Faredeo adopta una estética atemporal inspirada en los valles alpinos y refugios patagónicos: fondo grafito pino abeto (`#163F41`), tarjetas con profundidad de bosque helado, texto en tiza nieve (`#EFEEEC`), acentos cálidos en **Terracota Coral** (`#DAAF9E`) para precios y acciones principales ⬆️, e **Hielo Rosado / Blush** (`#F0CDC4`) y **Gris Abeto Muteado** (`#6B8B86`) para subtítulos, etiquetas y detalles secundarios.

---

## 2. Paleta de Colores y Tokens

### 2.1 Colores Principales

| Categoría | Nombre | Hex / Valor | Uso / Propósito |
| :--- | :--- | :--- | :--- |
| **Background / Base** | Deep Spruce Night | `#0e292b` | Fondo principal profundo de bosque alpine |
| **Surface / Card** | Alpine Spruce Card | `#163F41` | Tarjetas y contenedores con contraste natural |
| **Primary Accent** | Terracotta Coral | `#DAAF9E` | Botones CTA principales, precios y subida ⬆️ |
| **Primary Hover** | Deep Coral Sand | `#C79987` | Estado hover de acciones primarias |
| **Secondary Accent** | Soft Blush Snow | `#F0CDC4` | Badges de bajada ⬇️, detalles cálidos e iconos |
| **Text Primary** | Crisp Chalk White | `#EFEEEC` | Títulos y datos de máxima legibilidad |
| **Text Secondary** | Muted Spruce Sage | `#6B8B86` | Subtítulos y etiquetas secundarias |
| **Borders & Lines** | Spruce Slate Line | `#2a575a` | Bordes discretos de 1px |

### 2.2 Variables CSS (`globals.css`)

```css
:root {
  --background: #0e292b;
  --foreground: #EFEEEC;
  --card-bg: #163F41;
  --border-color: #2a575a;
  --accent-primary: #DAAF9E;
  --accent-primary-hover: #C79987;
  --accent-blush: #F0CDC4;
  --text-secondary: #6B8B86;
}
```

---

## 3. Tipografía y Jerarquía

* **Fuente**: System-UI / Inter / Sans-serif moderna.
* **Contraste**: Texto `#EFEEEC` sobre fondo `#163F41` para legibilidad y elegancia visual.



