# Design Document: Update Official Domain References

## Context
Quempo utiliza `window.location.origin` dinámicamente cuando el código se ejecuta en el navegador del cliente. Sin embargo, existían valores de fallback hardcoded a `https://quempo-gilt.vercel.app` tanto para Server-Side Rendering (SSR) como para la generación del texto copiado/compartido a WhatsApp.

## Design Decisions

### 1. Dinamismo + Fallback Oficial
En `PublishSuccessModal.tsx` y `TripDetailModal.tsx`:
```ts
const getShareUrl = () => {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const baseUrl = (origin && !origin.includes('localhost') && !origin.includes('127.0.0.1'))
    ? origin
    : (process.env.NEXT_PUBLIC_APP_URL || 'https://quempo.tech');
  return `${baseUrl}/v/${trip.id}`;
};
```

### 2. Plantilla de Mensaje de WhatsApp
En lugar de fijar la URL del dominio antiguo en la cadena de texto, se utilizará `${baseUrl}` o `https://quempo.tech/` directamente:
```ts
const shareText = `🏔️ *¡Viaje disponible a la cordillera en Quempo!*\n\n🚗 *Ruta:* ${trip.origin} ➔ ${destName}\n📅 *Fecha:* ${trip.departure_date}\n🕒 *Hora:* ${trip.departure_time.slice(0, 5)} hrs\n💺 *Cupos:* ${trip.seats_available} asientos libres\n💰 *Aporte:* ${formattedPrice} CLP\n\n👉 *Publicado en:* ${baseUrl}/`;
```

De este modo, si el usuario navega en `https://www.quempo.tech` o `https://quempo.tech`, la URL compartida siempre coincidirá exactamente con su origen actual.
