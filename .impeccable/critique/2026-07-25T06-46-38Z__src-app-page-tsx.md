---
target: src/app/page.tsx - Viewport Density Focus
total_score: 29
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
timestamp: 2026-07-25T06-46-38Z
slug: src-app-page-tsx
---
# Design Health Score (Enfoque Densidad de Primera Vista / Above-The-Fold)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Buenos estados de carga, pero los viajes quedan ocultos bajo el pliegue inicial |
| 2 | Match System / Real World | 4 | Excelente modelo mental de montaña (Subida ⬆️ / Bajada ⬇️) |
| 3 | User Control and Freedom | 3 | Filtros funcionales, pero requieren scroll para verificar el resultado |
| 4 | Consistency and Standards | 3 | Estética esmeralda unificada |
| 5 | Error Prevention | 3 | Guardar filtros funciona correctamente |
| 6 | Recognition Rather Than Recall | 3 | Chips de fecha inmediatos |
| 7 | Flexibility and Efficiency | 2 | **Baja densidad de pantalla inicial**: Requiere scroll obligatorio para ver viajes disponibles |
| 8 | Aesthetic and Minimalist Design | 2 | **Exceso de padding vertical**: El Hero + Botón gigante + Card de Ruta ocupan >500px |
| 9 | Error Recovery | 3 | Recuperación estándar |
| 10 | Help and Documentation | 3 | Navegación clara |
| **Total** | | **29/40** | **Good (72.5%)** |

## Design Specificity Verdict (Densidad & Jerarquía Espacial)

**LLM Assessment**: La interfaz actual distribuye sus elementos verticalmente en bloques apilados de gran tamaño (Hero grande + Botón de publicación de 64px + Tarjeta de ruta de 140px + Chips de fecha). Esto consume más de 500px verticales antes de mostrar el primer viaje. 
A diferencia de benchmarks como **Surfari**, donde la primera vista muestra 3 viajes y el control de publicación simultáneamente, Faredeo obliga al usuario a scrollear para saber si hay viajes disponibles.

**Deterministic Scan**: No disponible en esta corrida.

**Visual Overlays**: No inyectados.

## Overall Impression

La aplicación es estéticamente atractiva con la paleta Esmeralda, pero su diseño espacial es de "baja densidad informacional". En dispositivos móviles se pierde la visibilidad inmediata del contenido principal (los viajes disponibles), lo que incrementa el trabajo mental del usuario al forzar navegación por scroll antes de obtener respuesta.

## What's Working

- **1-Tap Swap**: El botón de intercambio de sentido funciona muy bien.
- **Identidad Esmeralda**: Excelente contraste sobre fondo oscuro.
- **Acción destacada de publicación**: Es imposible pasar por alto el botón de publicar.

## Priority Issues

- **[P1] Exceso de consumo de espacio vertical arriba del pliegue (Above the Fold)**:
  - **Por qué importa**: En móviles sólo se ve 0 o 1 viaje sin scrollear. En Desktop requiere scroll para ver más de 1 viaje.
  - **Solución**: Unificar el Hero, el selector de Sentido/Centro y las fechas en una **Barra Compacta de Control (Toolbar / Command Bar)** de 1 o 2 filas delgadas, permitiendo que la lista de viajes empiece en el primer tercio superior de la pantalla.
  - **Comando recomendado**: `/impeccable layout`

- **[P1] Integración del botón "Publicar Viaje" en la cabecera**:
  - **Por qué importa**: Ocupa una fila completa dedicada solo a 1 botón de gran tamaño.
  - **Solución**: Integrar "Publicar Viaje" en el Navbar superior o en la barra compacta de acciones rápidas.
  - **Comando recomendado**: `/impeccable layout`

- **[P2] Formato compacto de Tarjetas de Viaje (Cards Density)**:
  - **Por qué importa**: Las tarjetas de viaje actuales miden ~220px de alto cada una.
  - **Solución**: Diseñar una vista de tarjetas compactas o vista tipo lista comprimida (donde quepan 3 tarjetas simultáneas en móviles).
  - **Comando recomendado**: `/impeccable adapt`

## Persona Red Flags

- **Casey (Usuario móvil en la cordillera)**: Debe scrollear repetidamente con 1 mano para ver si hay viajes a Farellones o Valle Nevado hoy.
- **Alex (Power User / Esquiador frecuente)**: Quiere entrar y ver instantáneamente los 3 viajes del día en 1 segundo sin scroll.

## Questions to Consider

- *¿Qué tal si comprimimos el Hero en un título limpio de 1 sola línea dentro del Navbar?*
- *¿Qué tal si creamos una Toolbar unificada donde el filtro de fecha, sentido de ruta y botón de publicar quepan en solo 2 filas delgadas?*
