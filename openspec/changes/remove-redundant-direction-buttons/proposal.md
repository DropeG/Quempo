## Why

La barra de permuta (Direction Swap Bar) con el botón `⇆` ya permite alternar directa e intuitivamente el sentido de la ruta entre `Subida ⬆️` y `Bajada ⬇️`. Mantener los botones redundantes "Subida", "Bajada" y "Ambos" debajo de la barra genera ruido visual innecesario y satura la pantalla móvil.

## What Changes

- **Eliminación de la botonera redundante de sentido**: Eliminar el bloque de botones `[ ⬆️ Subida ] [ ⬇️ Bajada ] [ 🔄 Ambos ]` ubicado debajo de la barra de origen/destino.
- **Simplificación visual**: Toda la conmutación de dirección se realiza 100% mediante el botón de intercambio `⇆` del Direction Swap Bar.

## Capabilities

### Modified Capabilities
- `trip-discovery`: Interfaz simplificada sin botones redundantes de dirección.

## Impact

- **Frontend**: Limpieza en `src/app/page.tsx` para eliminar la botonera redundante y dejar una vista ultra-limpia y directa.
