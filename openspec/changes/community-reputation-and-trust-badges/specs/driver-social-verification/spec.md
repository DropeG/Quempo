## ADDED Requirements

### Requirement: Insignia de Verificación Social Completa
El sistema SHALL encender automáticamente el badge ✅ **Verificación Social Completa** para cualquier usuario que cumpla la combinación de 3 verificaciones: cuenta creada/autenticada con Google Auth, número de WhatsApp válido registrado y handle de Instagram registrado.

#### Scenario: Usuario completa la tríada de verificación social
- **WHEN** un usuario autenticado con Google tiene guardados un WhatsApp y un Instagram handle válidos en su perfil
- **THEN** el sistema otorga la insignia ✅ **Verificación Social Completa** y la despliega junto a su perfil en el feed, detalles de viaje y perfil personal.

#### Scenario: Usuario remueve su Instagram o WhatsApp
- **WHEN** un usuario elimina su usuario de Instagram o su teléfono de WhatsApp en su perfil
- **THEN** el sistema retira temporalmente la insignia ✅ **Verificación Social Completa** hasta que vuelva a completar la tríada.
