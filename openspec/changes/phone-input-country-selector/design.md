## Context

Actualmente en Quempo, al editar el perfil o publicar un viaje, el usuario debe lidiar manualmente con el prefijo internacional (`+56`), lo que genera confusión e ingreso de formatos ambiguos. La experiencia óptima requiere un componente visual con selector de banderas de países y la capacidad de ingresar un número libre ("🌐 Otro país").

## Goals / Non-Goals

**Goals:**
- Crear un componente React reutilizable `<PhoneInput />` que combine:
  - Un botón selector de país con bandera, código prefijado y flecha desplegable (`▼`).
  - Un menú popover desplegable para elegir rápidamente entre países frecuentes de esquí (Chile 🇨🇱, Brasil 🇧🇷, Argentina 🇦🇷, EE.UU. 🇺🇸, Perú 🇵🇪, etc.).
  - Una opción **"🌐 Otro país"** para ingresar libremente cualquier número con signo `+`.
  - Un campo numérico local limpio donde el usuario solo ingresa sus 9 dígitos sin escribir prefijos.
- Desglosar automáticamente cualquier string guardado en Supabase (ej: `+56959365527`) en su respectivo país (`+56`) y número local (`959365527`).
- Emitir la versión normalizada E.164 limpia hacia el componente padre (`onChange(normalizedNumber, isValid)`).

**Non-Goals:**
- Validaciones SMS/OTP vía servicios de terceros.

## Decisions

### Decision 1: Estructura del Componente `PhoneInput`
- El componente manejará su estado interno de `selectedCountry` (por defecto `+56`) y `localNumber`.
- Al cambiar `localNumber` o `selectedCountry`, computa el valor final E.164:
  - Si el país es Chile 🇨🇱 (`+56`): fuerza o valida 9 dígitos locales y emite `+56` + `localNumber`.
  - Si es "🌐 Otro país": permite formato libre con `+` y valida que tenga entre 8 y 15 dígitos.
- Cierra el menú desplegable al hacer clic fuera (Click Outside) o seleccionar una opción.

### Decision 2: Lista de Países Frecuentes
- `COUNTRIES` array en `phoneUtils.ts`:
  - Chile `🇨🇱 +56` (Predeterminado)
  - Brasil `🇧🇷 +55`
  - Argentina `🇦🇷 +54`
  - Estados Unidos / Canadá `🇺🇸 +1`
  - Perú `🇵🇪 +51`
  - México `🇲🇽 +52`
  - España `🇪🇸 +34`
  - Francia `🇫🇷 +33`
  - Alemania `🇩🇪 +49`
  - Reino Unido `🇬🇧 +44`
  - Otro país `🌐 manual`

## Risks / Trade-offs

- **[Riesgo] Formatos antiguos guardados en la BD sin `+`** → *Mitigación*: La función de desglose `parsePhoneNumber` analizará si comienza con `569`, `9`, o `+` para mapearlo sin romper números de perfiles existentes.
