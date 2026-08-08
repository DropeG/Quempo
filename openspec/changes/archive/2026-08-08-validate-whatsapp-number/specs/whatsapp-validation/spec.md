## ADDED Requirements

### Requirement: Formateo y auto-completado de código de país por defecto (+56)
El sistema SHALL formatear automáticamente los números de teléfono ingresados en los campos de WhatsApp, añadiendo el prefijo de Chile `+56` si el usuario ingresa un número móvil local de 9 dígitos.

#### Scenario: Usuario ingresa número chileno de 9 dígitos sin prefijo
- **WHEN** el usuario ingresa `912345678` en el campo de WhatsApp
- **THEN** el sistema lo transforma dinámicamente y lo almacena como `+56912345678`

#### Scenario: Usuario ingresa número internacional con signo más (+)
- **WHEN** el usuario ingresa un número que comienza con `+` (ej: `+5491112345678`)
- **THEN** el sistema respeta el prefijo internacional ingresado sin anteponer `+56`

### Requirement: Validación sintáctica de longitud de WhatsApp
El sistema SHALL validar que el número de WhatsApp tenga la longitud exacta según el código de país (para Chile: exactamente 9 dígitos tras el `+56`).

#### Scenario: Intento de guardar un número chileno con menos de 9 dígitos
- **WHEN** el usuario ingresa `9123456` (7 dígitos) e intenta publicar el viaje o guardar su perfil
- **THEN** el sistema SHALL impedir el envío y mostrar un mensaje de error claro indicando que el número de WhatsApp debe tener 9 dígitos.

#### Scenario: Ingreso de número válido de WhatsApp
- **WHEN** el usuario ingresa un número móvil válido de 9 dígitos (`9XXXXXXXX`)
- **THEN** el sistema SHALL habilitar la confirmación y guardar el viaje/perfil con la versión normalizada E.164.
