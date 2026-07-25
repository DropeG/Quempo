## Context

Actualmente en el Direction Swap Bar se usa la etiqueta "Cordillera" para hacer referencia al extremo de montaña. El usuario solicitó reemplazar este término por "Centro de Ski" y permitir seleccionar desde un sub-menú desplegable qué centro específico (El Colorado, La Parva, Valle Nevado o Farellones) es el origen o destino según el sentido del viaje (`Subida ⬆️` vs `Bajada ⬇️`).

## Goals / Non-Goals

**Goals:**
- Reemplazar completamente la palabra "Cordillera" por "Centro de Ski".
- Implementar un sub-menú selector claro en la barra de permuta (Direction Swap) que permita elegir entre "Todos los Centros", "El Colorado", "La Parva", "Valle Nevado", o "Farellones".
- Mantener "📍 Santiago" como la constante urbana sin sub-menús en la búsqueda principal.
- Pre-llenar el formulario de creación de viaje con el centro específico seleccionado cuando el usuario presiona "+ Publicar viaje".

**Non-Goals:**
- Modificar la estructura de tablas de Supabase (el campo `destination` enum `FARELLONES | EL_COLORADO | LA_PARVA | VALLE_NEVADO` se mantiene).

## Decisions

### Decision 1: Reemplazo del Label "Cordillera" por "Centro de Ski"
- **Elección**: Reemplazar todo texto en UI que diga "Cordillera" por "Centro de Ski".
- **Razonamiento**: Otorga mayor claridad semántica al usuario.

### Decision 2: Sub-menú Desplegable Integrado en el Nodo de Centro de Ski
- **Elección**: Cuando el nodo derecho o izquierdo según el sentido (`SUBIDA` o `BAJADA`) corresponde al Centro de Ski, integrar un `<select>` o menú emergente compacto con las opciones:
  - Todos los Centros
  - El Colorado
  - La Parva
  - Valle Nevado
  - Farellones
- **Razonamiento**: Permite al usuario filtrar con 1 toque el centro específico de bajada o subida sin saturar la pantalla.
