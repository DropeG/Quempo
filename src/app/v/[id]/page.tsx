import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { Trip } from '@/types/trip';
import ClientRedirect from './ClientRedirect';

interface Props {
  params: Promise<{ id: string }>;
}

const resortNames: Record<string, string> = {
  FARELLONES: 'Farellones',
  EL_COLORADO: 'El Colorado',
  LA_PARVA: 'La Parva',
  VALLE_NEVADO: 'Valle Nevado',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: trip } = await supabase
    .from('trips')
    .select('*')
    .eq('id', id)
    .single();

  if (!trip) {
    return {
      title: 'Viaje no encontrado - Quempo',
      description: 'El viaje que buscas no existe o ha sido cancelado.',
    };
  }

  const t = trip as Trip;
  const directionText = t.direction === 'SUBIDA' ? 'Subida' : 'Bajada';
  const destinationName = resortNames[t.destination] || t.destination;
  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(t.price_per_seat);

  const dateObj = new Date(t.departure_date + 'T00:00:00');
  const formattedDate = dateObj.toLocaleDateString('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const title = `🚗 ${directionText} a ${destinationName} - Quempo`;
  const description = `${t.driver_name} ofrece ${t.seats_available} cupos para el ${formattedDate} a las ${t.departure_time}. Aporte: ${formattedPrice} CLP. ¡Ver detalles y coordinar en Quempo!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://quempo.cl/v/${id}`,
      images: [
        {
          url: 'https://quempo.cl/plomo/desktop/plomoDesktop2.webp',
          width: 1200,
          height: 630,
          alt: 'Quempo - Carpooling a Farellones y centros de ski',
        },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <>
      {/* Meta Refresh redirect for crawlers/scrapers */}
      <meta httpEquiv="refresh" content={`0; url=/?trip=${id}`} />
      
      {/* JS client redirect for real browsers */}
      <ClientRedirect id={id} />

      {/* Fallback Viewport */}
      <div className="min-h-screen bg-[#091a2c] flex items-center justify-center text-white p-6 font-sans">
        <div className="max-w-md w-full text-center space-y-4 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#38BDF8] mx-auto"></div>
          <h2 className="text-xl font-bold">Redireccionando a Quempo...</h2>
          <p className="text-xs text-sky-200">
            Si no eres redirigido automáticamente en unos segundos, haz clic en el siguiente botón:
          </p>
          <a
            href={`/?trip=${id}`}
            className="inline-block bg-[#38BDF8] hover:bg-[#0284C7] text-[#0F2942] hover:text-white font-black px-6 py-3 rounded-2xl transition"
          >
            Ir a Quempo
          </a>
        </div>
      </div>
    </>
  );
}
