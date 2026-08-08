## ADDED Requirements

### Requirement: Selector de País con Banderas y Opción Manual
El sistema SHALL proveer un componente de entrada de teléfono con selector de país desplegable que incluya banderas, códigos de área y una opción manual "🌐 Otro país".

#### Scenario: Selección predeterminada de Chile
- **WHEN** el usuario abre un formulario con el campo de teléfono sin datos previos
- **THEN** el sistema SHALL seleccionar automáticamente `🇨🇱 Chile (+56)` y mostrar el input preparado para ingresar los 9 dígitos locales.

#### Scenario: Selección de opción manual "Otro país"
- **WHEN** el usuario hace clic en el desplegable y selecciona `🌐 Otro país`
- **THEN** el sistema SHALL permitir escribir libremente el número completo en el campo de texto (incluyendo el signo `+` y el código internacional).

#### Scenario: Desglose de número existente guardado
- **WHEN** el usuario abre su perfil o edita un viaje que ya tiene guardado el número `+56959365527`
- **THEN** el selector SHALL desglosar la bandera `🇨🇱 (+56)` y colocar únicamente `959365527` en la caja de texto.

### Requirement: Validación y Normalización E.164
El sistema SHALL validar que el número ingresado cumpla la longitud del país seleccionado y normalizarlo a formato E.164 antes de guardar.

#### Scenario: Validación de celular chileno
- **WHEN** el usuario selecciona `🇨🇱 +56` e ingresa menos de 9 dígitos (ej: `912345`)
- **THEN** el sistema SHALL mostrar una alerta de error indicando que faltan dígitos para completar los 9 requeridos.
