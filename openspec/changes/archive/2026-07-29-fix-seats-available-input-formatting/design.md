## Context

En `PublishModal.tsx`, el campo `Asientos Disponibles` utiliza un `<input type="number">` enlazado al estado `seatsAvailable`. Cuando el usuario edita el campo o lo limpia, el manejador `onChange` hace `Number(e.target.value)`, lo que convierte cadenas vacías en `0`. Esto hace que al tipear `2` después de limpiar o sobre un `0`, la entrada pueda retener cadenas formateadas con ceros a la izquierda (`02`).

## Goals / Non-Goals

**Goals:**
- Asegurar que el estado `seatsAvailable` acepte un tipo flexible (`number | string`) durante la edición.
- Parsear las entradas con `parseInt(val, 10)` para eliminar ceros a la izquierda antes de guardarlos en el estado.
- Permitir al usuario borrar temporalmente el valor del input sin forzar un `0` inmediato que provoque un prefijo `02` al presionar una tecla.
- Validar mediante `onBlur` que el valor final esté contenido entre `1` y `8` asientos.

**Non-Goals:**
- Modificar el tipo en la base de datos Supabase (`seats_available` sigue siendo numérico `number`).
- Alterar otros campos numéricos que ya tengan su propio flujo validado.

## Decisions

- **Decisión 1: Manejar `seatsAvailable` como `number | string`**:
  Permite que el valor sea `''` durante la escritura activa para que el usuario pueda borrar y presionar `2` sin que se concatene a un `0` previo.
  
- **Decisión 2: Usar `parseInt(e.target.value, 10)` en lugar de `Number(...)`**:
  `parseInt('02', 10)` retorna `2`, eliminando inmediatamente cualquier cero inicial.

- **Decisión 3: Validación en `onBlur`**:
  Al desenfocar el campo, si el usuario dejó la entrada vacía o fuera de rango (menor a 1 o mayor a 8), se reajusta automáticamente al rango permitido (mínimo 1, máximo 8).

## Risks / Trade-offs

- *Riesgo*: Si el usuario envía el formulario dejando el campo vacío, podría causar un error en la API.
- *Mitigación*: En la función de envío (`handleSubmit`), se utiliza `Number(seatsAvailable) || 1` como resguardo.
