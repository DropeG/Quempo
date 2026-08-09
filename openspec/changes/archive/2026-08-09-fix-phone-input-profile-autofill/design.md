## Context

Actualmente en `PhoneInput.tsx`, el estado interno (`localNumber` y `selectedCountryCode`) se inicializa mediante un `useEffect` que solo ejecuta la transformación cuando `!isInitialized` es verdadero:

```tsx
useEffect(() => {
  if (!isInitialized) {
    const parsed = parseStoredPhone(value);
    setSelectedCountryCode(parsed.countryCode);
    setLocalNumber(parsed.localNumber);
    setIsInitialized(true);
  }
}, [value, isInitialized]);
```

Debido a que `PublishModal` y `ProfileModal` inician con `whatsappNumber = ''` antes de resolver la llamada asíncrona a Supabase (`profiles.select('whatsapp_number')`), `PhoneInput` se inicializa con `''` en su primer render. Cuando la promesa de Supabase se resuelve unos milisegundos más tarde y actualiza el prop `value` a `+56912345678`, `PhoneInput` ignora el cambio porque `isInitialized` ya es `true`.

## Goals / Non-Goals

**Goals:**
- Hacer que `PhoneInput` reaccione de forma reactiva y limpia a los cambios en el prop `value` provenientes del componente padre.
- Preservar la capacidad del usuario de escribir y editar el número local sin que la edición gatille bucles infinitos de re-renderizado ni reinicie el cursor.

**Non-Goals:**
- Cambiar la estructura visual ni las reglas de validación E.164 preexistentes de `PhoneInput`.
- Modificar el backend de Supabase o la estructura de la tabla `profiles`.

## Decisions

### Decision 1: Sincronización inteligente de `PhoneInput` basada en cambios de `value`
- **Elección**: Reemplazar la bandera estricta `isInitialized` por un seguimiento del prop `value` procesado anterior (`prevValueRef` o actualización condicional de `value`). Cuando `value` entrante difiera de la versión normalizada del estado interno actual (y no sea la misma cadena generada por la edición del usuario), actualizar `selectedCountryCode` y `localNumber`.
- **Alternativa considerada**: Pasar una `key` dinámica `<PhoneInput key={whatsappNumber} />` en `PublishModal`. Se descartó porque provocaría el desmontaje y remontaje completo del DOM del input innecesariamente.

## Risks / Trade-offs

- **[Riesgo] Bucle de re-renderizado entre `onChange` y `useEffect`**: Si `onChange` entrega un formato levemente distinto al que `parseStoredPhone(value)` retorna.
  - *Mitigación*: Comparar el valor formateado resultante antes de llamar a `setLocalNumber` / `setSelectedCountryCode`, previniendo actualizaciones de estado redundantes.
