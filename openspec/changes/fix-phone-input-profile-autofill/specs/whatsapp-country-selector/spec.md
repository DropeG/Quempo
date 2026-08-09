## MODIFIED Requirements

### Requirement: Selector de País con Banderas y Opción Manual
El sistema SHALL proveer un componente de entrada de teléfono con selector de país desplegable que incluya banderas, códigos de área y una opción manual "🌐 Otro país", desglosando y sincronizando reactivamente cualquier número existente guardado o cargado asíncronamente desde el servidor.

#### Scenario: Selección predeterminada de Chile
- **WHEN** el usuario abre un formulario con el campo de teléfono sin datos previos
- **THEN** el sistema SHALL seleccionar automáticamente `🇨🇱 Chile (+56)` y mostrar el input preparado para ingresar los 9 dígitos locales con el placeholder `9 1234 5678`.

#### Scenario: Selección de opción manual "Otro país"
- **WHEN** el usuario hace clic en el desplegable y selecciona `🌐 Otro país`
- **THEN** el sistema SHALL permitir escribir libremente el número completo en el campo de texto (incluyendo el signo `+` y el código internacional).

#### Scenario: Desglose de número existente guardado
- **WHEN** el usuario abre su perfil, edita un viaje o carga asíncronamente un número de teléfono `+56912345678` desde Supabase
- **THEN** el selector SHALL desglosar la bandera `🇨🇱 (+56)`, colocar únicamente `912345678` en la caja de texto y marcar la entrada como válida en verde.
