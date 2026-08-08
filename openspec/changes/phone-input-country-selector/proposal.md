## Why

La experiencia de ingreso de número de WhatsApp actual requiere que el usuario piense en el formato del código de país (`+56`), lo cual no resulta intuitivo para la mayoría de los usuarios. La mejor práctica de la industria para aplicaciones móviles y web es separar la selección del código de país mediante un selector visual con banderas del campo de texto donde el usuario solo ingresa su número local.

Además, se requiere una opción manual de "🌐 Otro país" para que cualquier usuario internacional cuyo país no esté predeterminado en la lista pueda ingresar su número con código libremente.

## What Changes

- **Componente Reutilizable `PhoneInput.tsx`**: Un nuevo componente UI que integra un selector desplegable con banderas de países y un campo numérico local independiente.
- **Selector de País Frecuente con Banderas**: Prefijado en Chile (`🇨🇱 +56`), con lista desplegable rápida de países relevantes para Quempo (Brasil `🇧🇷`, Argentina `🇦🇷`, EE.UU. `🇺🇸`, Perú `🇵🇪`, etc.).
- **Opción de Ingreso Manual "🌐 Otro país"**: Permite ingresar libremente números internacionales para países que no estén en la lista rápida.
- **Detección y Separación Inteligente de Números Existentes**: Al abrir perfiles o viajes guardados, separa el código del país del número local para mostrar ambos campos limpios.
- **Integración en Modales**: Reemplaza el input plano en `PublishModal.tsx` y `ProfileModal.tsx` con `<PhoneInput />`.

## Capabilities

### New Capabilities
- `whatsapp-country-selector`: Componente UI de selección de país con banderas, opción manual y campo de número de WhatsApp local.

### Modified Capabilities
- `trip-publishing`: Formulario de publicación utiliza el componente `PhoneInput` con selector de país.
- `user-profile`: Formulario de perfil utiliza el componente `PhoneInput` con selector de país.

## Impact

- `src/components/PhoneInput.tsx`: Componente de interfaz de usuario con selector desplegable de banderas y campo de texto.
- `src/lib/phoneUtils.ts`: Lista de países definidos, utilidades de extracción de prefijo y formateo E.164.
- `src/components/PublishModal.tsx` & `src/components/ProfileModal.tsx`: Actualización de la interfaz.
