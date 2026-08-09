## Context

En el selector de teléfono (`PhoneInput.tsx`) y sus utilidades (`phoneUtils.ts`), el número de teléfono del administrador aparece predeterminado en los placeholders de entrada y ejemplos visuales. El usuario solicita reemplazar únicamente estos marcadores de posición (placeholders) por un número de ejemplo ficticio (`9 1234 5678`), sin alterar los enlaces de contacto ni el resto de la aplicación.

## Goals / Non-Goals

**Goals:**
- Reemplazar el placeholder de Chile en `phoneUtils.ts` de `9 5936 5527` a `9 1234 5678`.
- Reemplazar la sugerencia de texto en `PhoneInput.tsx` de `9 5936 5527` a `9 1234 5678`.
- Actualizar los comentarios JSDoc que citan `59365527` como ejemplo.

**Non-Goals:**
- No modificar `Footer.tsx` ni alterar el enlace real de WhatsApp de administración.
- No modificar el algoritmo de desglose ni la lógica de validación de teléfonos.

## Decisions

### Decisión 1: Reemplazo en `phoneUtils.ts` y `PhoneInput.tsx`

Se modificará el objeto de configuración del país Chile (`CL`) en `src/lib/phoneUtils.ts`:
```typescript
{ code: 'CL', name: 'Chile', flag: '🇨🇱', dialCode: '+56', digitsCount: 9, placeholder: '9 1234 5678' }
```

En `src/components/PhoneInput.tsx`:
```typescript
? 'Ingresa tus 9 dígitos locales (ej: 9 1234 5678).'
```

## Risks / Trade-offs

- Ninguno. El cambio afecta exclusivamente a textos descriptivos y placeholders visuales de la interfaz de usuario.
