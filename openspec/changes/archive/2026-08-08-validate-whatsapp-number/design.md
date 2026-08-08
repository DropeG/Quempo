## Context

En Quempo, el medio principal de comunicación entre pasajeros y conductores es WhatsApp. Actualmente, los componentes `PublishModal` y `ProfileModal` utilizan una limpieza básica de caracteres no numéricos (`replace(/[^0-9+]/g, '')`), lo que permite ingresar números incompletos (ej. `9123456`), sin código de país (ej. `987654321` en vez de `+56987654321`) o con formato erróneo.

Esto falla cuando la App intenta generar enlaces a `https://wa.me/<numero>`, arrojando un error de WhatsApp diciendo que el número no existe.

## Goals / Non-Goals

**Goals:**
- Crear una utilidad/componente de formateo y validación de teléfono con soporte nativo para Chile (`+56`) y formato internacional.
- Auto-completar el prefijo de país `+56` si el usuario solo ingresa los 9 dígitos locales de Chile (ej: `9 1234 5678` ➔ `+56 9 1234 5678`).
- Validar la cantidad exacta de dígitos requerida antes de permitir enviar el formulario.
- Normalizar el almacenamiento en Supabase a formato E.164 limpio (`569XXXXXXXX` o `+569XXXXXXXX`) para garantizar enlaces `wa.me` 100% funcionales.
- Integrar la validación y el feedback en tiempo real en `PublishModal.tsx` y `ProfileModal.tsx`.

**Non-Goals:**
- Enviar códigos de verificación SMS u OTP por WhatsApp (Meta API / Twilio) en esta etapa.
- Requerir autenticación telefónica para registrarse en la plataforma.

## Decisions

### Decision 1: Lógica de Formateo y Normalización en `src/lib/phoneUtils.ts`
- **Alternativas consideradas**:
  - *Librería pesada libphonenumber-js completo*: Aumenta el bundle size (~150kb).
  - *Lógica ligera con Regex + helper `phoneUtils.ts` (Recomendada)*: Soporta +56 Chile por defecto y formato internacional genérico E.164 sin sobrecargar el bundle.
- **Formato Estándar Chile**:
  - Si el usuario ingresa 9 dígitos comenzando con `9` (ej: `987654321`), se formatea a `+56 9 8765 4321` y se almacena como `+56987654321`.
  - Si el usuario incluye `+` u otro código de país (ej: `+54911...`), se respeta el código internacional.
  - Validación de longitud: En Chile, el número móvil debe constar exactamente de 9 dígitos tras el prefijo `+56`.

### Decision 2: Feedback en Tiempo Real en `PublishModal` y `ProfileModal`
- Mostrar un estado con texto indicativo debajo del input (ej: *"Formato válido: +56 9 1234 5678"* en verde o *"Ingresa un número de 9 dígitos (ej: 9 1234 5678)"* en rojo).
- Deshabilitar o bloquear el envío del formulario si el campo de WhatsApp contiene un número con formato sintácticamente inválido.

## Risks / Trade-offs

- **[Riesgo] Usuarios internacionales de otros países (ej: Argentina/Brasil)** → *Mitigación*: Permitir que si el usuario escribe un signo `+` al inicio (ej: `+549...`), el helper no fuerce el `+56` y valide como formato internacional general (entre 8 y 15 dígitos).
