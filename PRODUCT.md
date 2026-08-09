# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Conductores** — esquiadores o dueños de vehículos aptos para la cordillera (4x4, cadenas, porta-ski) que suben con asientos vacíos y quieren amortizar el costo de combustible. Publican el viaje en segundos desde el celular, antes o durante el ascenso.

**Pasajeros / Esquiadores / Snowboarders** — deportistas sin vehículo apto o que prefieren no conducir en caminos nevados. Necesitan encontrar cupo de forma rápida, frecuentemente el mismo día o la noche anterior.

Ambos perfiles son usuarios móviles, en un contexto de frío, apuro y poca batería. La fricción cero es obligatoria.

## Product Purpose

Quempo conecta a conductores con asientos disponibles y pasajeros que necesitan subir o bajar de los centros de ski de Santiago (Farellones, El Colorado, La Parva, Valle Nevado) mediante una interfaz de match ultrarrápida. El éxito se mide en segundos hasta el primer contacto por WhatsApp, no en transacciones mediadas.

## Positioning

La única plataforma de carpooling de nieve de Santiago que permite encontrar y contactar a un conductor en menos de 2 segundos, sin registro para pasajeros, con conexión directa P2P a WhatsApp y verificación social por Google + Instagram — sin comisiones ni intermediarios.

Ningún vecino directo combina: especialización en rutas de cordillera + datos de equipamiento (4x4, cadenas, porta-ski) + contacto WhatsApp sin fricción + sistema de reputación entre la comunidad esquiadora.

## Operating Context

- Uso típico: mañana de día de ski, entre 6–8am, en el teléfono mientras se despierta o se prepara.
- Conexión de datos variable o baja en partes del camino; la app debe ser rápida en carga inicial.
- La coordinación real ocurre en WhatsApp: Quempo es el directorio de confianza, no el canal de comunicación.
- Temporada de ski en Santiago: julio–octubre. Uso fuera de temporada es esporádico.
- Los centros de ski son el destino siempre — el origen varía (Metro Los Dominicos, Providencia, Las Condes, Ñuñoa, etc.).
- Existe un grupo de WhatsApp comunitario oficial de Quempo como canal de difusión paralelo.

## Capabilities and Constraints

**Confirmadas:**
- Publicación de viajes: dirección (subida/bajada), origen libre, destino de los 4 centros, fecha, hora, cupos, precio/asiento, equipamiento (4x4, cadenas, porta-ski), contacto WhatsApp, handle de Instagram, notas opcionales.
- Filtros: por dirección (Subida/Bajada), fecha rápida (Hoy/Mañana/días) y destino.
- Contacto vía WhatsApp pre-llenado con detalles del viaje.
- Login con Google (conductores únicamente, para publicar).
- Sistema de reputación: reseñas post-viaje (1–5★ + tags + comentario obligatorio en ≤3★), badges de conductor (🏔️ Conductor Frecuente ≥10 viajes, ⛓️ Experto con Cadenas ≥10 tags confirmados por pasajeros, ✅ Verificación Social = WhatsApp + Instagram).
- Gestión de viajes propios: editar, eliminar.
- Bajadas urgentes: flujo especial para publicar bajadas de emergencia de la montaña.
- Viralidad / compartir viaje: integración social.

**Pendiente de decisión:**
- Evaluación bidireccional (pasajero califica conductor): *no por ahora*.
- Blind reviews: *descartado*, se prefiere feedback inmediato y público.
- Notificaciones push: no implementadas.
- Monetización: sin comisiones actualmente; modelo P2P puro.

**Tecnología:**
- Next.js (App Router), TypeScript, Supabase (PostgreSQL + Auth + Storage + RPC), Tailwind CSS.

## Brand Commitments

- **Nombre del producto:** Quempo (internamente también referido como "Faredeo" en partes del codebase — Quempo es el nombre de cara al usuario).
- **Tono:** Confiable, ágil, entusiasta de la montaña ("Alpine Fast"), directo al grano. No corporativo, no genérico.
- **Identidad visual comprometida:** "Clean Alpine Frost & Sky Glass" — fondo fotográfico del Cerro Plomo, paneles de cristal esmerilado helado, acento celeste alpino `#38BDF8`. Ver DESIGN.md para el sistema completo.
- **Emoji de montaña 🏔️** usado como parte del vocabulario visual en la interfaz.

## Evidence on Hand

- Codebase completo en `/Users/pedro/Documents/Pedro/projects/quempo/` con todos los componentes implementados.
- Foto de fondo real del Cerro Plomo: `/public/plomo/desktop/plomoDesktop2.webp`.
- Base de datos Supabase activa con viajes reales y sistema de reseñas operativo.
- Grupo de WhatsApp comunitario activo: `https://chat.whatsapp.com/HSYkGEhRxGgCpPsd6S4Rid`.
- No hay testimonios de usuarios, métricas de uso ni press disponibles actualmente.

## Product Principles

1. **Fricción cero en el momento crítico.** El pasajero que busca cupo a las 6am no puede perder tiempo en registros o pasos intermedios. Cada tap de más es un cupo perdido.
2. **La confianza se gana entre pares, no se declara.** Los badges y reseñas emergen del comportamiento real de la comunidad esquiadora, no de verificaciones corporativas. El sistema amplifica la reputación que ya se construye naturalmente entre conocidos.
3. **La cordillera manda el contexto.** Cada decisión de diseño y de producto parte del escenario real: frío, apuro, celular en mano, condiciones de nieve variables. La interfaz debe sentirse tan ágil como un remontador bien aceitado.
4. **P2P puro, plataforma neutral.** Quempo no intermedia pagos ni coordina viajes — conecta y se aparta. La negociación, el precio y el acuerdo son entre conductor y pasajero.
5. **Comunidad de nicho sobre masa.** El valor del producto crece con la densidad de conductores confiables, no con el volumen bruto de usuarios. La reputación y la especialización son la ventaja competitiva.

## Accessibility & Inclusion

Sin requisito formal establecido. Mobile-first y contraste alto (texto blanco sobre cristal oscuro) son parte del diseño base. Pendiente de auditoría formal.
