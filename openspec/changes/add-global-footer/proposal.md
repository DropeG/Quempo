## Why

La plataforma carece de un pie de página (footer) global que unifique el cierre del sitio, proporcione enlaces institucionales y de comunidad (como el grupo oficial de WhatsApp y redes sociales), y establezca un descargo de responsabilidad (liability disclaimer) sobre el carácter P2P y sin comisiones del servicio.

## What Changes

- Se agregará un footer global en la parte inferior de la página principal (`src/app/page.tsx`), estructurado para que se alinee al final de la página.
- El diseño del footer será simple y centrado (Opción A), utilizando la estética de diseño "Clean Alpine Frost & Sky Glass" de la aplicación.
- Contendrá enlaces clave: enlace al grupo comunitario de WhatsApp, enlaces legales / de seguridad, y un descargo de responsabilidad sobre la naturaleza del servicio.
- Asegura la visualización responsiva en dispositivos móviles y de escritorio.

## Capabilities

### New Capabilities
- `global-footer`: Capacidad que define la estructura y contenido del pie de página global, incluyendo la información de la comunidad y descargos de responsabilidad legales.

### Modified Capabilities

## Impact

- `src/app/page.tsx`: Se modificará para incluir el nuevo componente de footer al final de la estructura flex principal.
