## ADDED Requirements

### Requirement: Footer global en la página principal
La aplicación principal SHALL incluir un footer global en el extremo inferior de la vista.

#### Scenario: Visualización del footer global
- **WHEN** el usuario navega a la página de inicio `/` y se desplaza al final de la página
- **THEN** el sistema SHALL renderizar un footer centrado que contenga el logotipo/marca, los enlaces clave (WhatsApp Comunitario, Términos de Uso, Instagram) y el descargo de responsabilidad legal.

### Requirement: Enlace al grupo de WhatsApp comunitario
El footer SHALL proveer un botón o enlace de llamada a la acción (CTA) directo al grupo oficial de WhatsApp de la comunidad.

#### Scenario: Redirección al WhatsApp comunitario
- **WHEN** el usuario hace clic en el botón de WhatsApp Comunitario
- **THEN** el sistema SHALL abrir en una pestaña nueva la URL `https://chat.whatsapp.com/ESElGo2ZznuJoFw66kmp4r`.

### Requirement: Descargo de responsabilidad legal (Disclaimer)
El footer SHALL mostrar un texto visible de descargo de responsabilidad sobre el carácter P2P y gratuito del servicio.

#### Scenario: Visibilidad del descargo
- **WHEN** el usuario visualiza el footer
- **THEN** el sistema SHALL mostrar de manera legible el texto que indica que Quempo es una plataforma de contacto P2P y que la seguridad y el acuerdo son responsabilidad de los usuarios.
