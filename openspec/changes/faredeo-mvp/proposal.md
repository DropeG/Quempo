## Why

Subir a esquiar o hacer snowboard a los centros de ski en Santiago (Farellones, El Colorado, La Parva, Valle Nevado) es logísticamente complejo, peligroso y costoso para personas sin vehículo 4x4 o apto para la cordillera. Por otro lado, muchos conductores suben solos o con asientos vacíos y buscan compartir los gastos de gasolina y peaje.

Faredeo resuelve esta problemática conectando conductores y pasajeros para viajes compartidos de subida y bajada a los centros de ski de Santiago, ofreciendo una solución segura, rápida, bi-direccional y 100% gratuita de operar (usando Vercel, Supabase y WhatsApp).

Inspirándonos en la simplicidad de plataformas referentes como `surfari.cl`, la experiencia de usuario prioriza la **búsqueda y navegación instantánea en menos de 2 segundos**: selector de sentido de 1 tap, chips de fechas inmediatas (Hoy, Mañana, Fin de semana) y tarjetas compactas con contacto directo por WhatsApp.

## What Changes

- **Selector de sentido instantáneo 1-tap**: Botón `⇆` para alternar inmediatamente entre `Subida ⬆️ (Santiago ➔ Cordillera)` y `Bajada ⬇️ (Cordillera ➔ Santiago)`.
- **Chips horizontales de fechas inmediatas**: Selección directa en 1 toque para `[ Hoy ]`, `[ Mañana ]`, `[ Próximo día ]` y botón `[ 📅 Más ]` para fechas futuras.
- **Autenticación con Google**: Inicio de sesión en 1 clic para obtener nombre, email verificado y foto de perfil para transmitir confianza a bajo costo.
- **Publicación de viajes optimizada**: Modal/Drawer que pre-llena automáticamente la ruta y fecha seleccionadas en la pantalla principal.
- **Cartelera y filtros responsivos (Mobile-First)**: Tarjetas compactas con horario destacado, precio por cupo, badges de montaña (4x4, cadenas, parrilla) y punto de encuentro.
- **Conexión directa por WhatsApp**: Botón de contacto que genera un enlace dinámico `wa.me` pre-llenado para coordinar directamente con el conductor a $0 costo.

## Capabilities

### New Capabilities
- `user-auth`: Autenticación rápida con Google OAuth mediante Supabase Auth para la gestión de sesiones y perfiles de usuarios.
- `trip-publishing`: Permite a los conductores crear, editar y eliminar publicaciones de viajes con detalles específicos de montaña y equipamiento.
- `trip-discovery`: Visualización y filtrado en tiempo real de viajes activos por dirección (Subida/Bajada), fecha rápida (Hoy/Mañana/Calendario), destino y capacidad de equipo.
- `whatsapp-contact`: Generación de enlaces de contacto directo P2P vía WhatsApp con mensajes pre-formateados.

### Modified Capabilities
*(Ninguna, es un proyecto nuevo).*

## Impact

- **Frontend**: Aplicación web responsiva (Next.js / React) alojada en Vercel con un diseño ultra-simple inspirada en Surfari.
- **Backend / Database**: Proyecto de Supabase con PostgreSQL y políticas de Row Level Security (RLS) para proteger los datos de usuario.
- **Costos**: $0/mes en infraestructura usando layers gratuitos perpetuos.
