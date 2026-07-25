'use client';

import { Trip } from '@/types/trip';
import { User } from '@supabase/supabase-js';
import { MapPin, Calendar, Clock, Users, ShieldCheck, Trash2, MessageCircle } from 'lucide-react';

interface TripCardProps {
  trip: Trip;
  currentUser: User | null;
  onDeleteTrip: (tripId: string) => void;
}

const DESTINATION_NAMES: Record<string, string> = {
  FARELLONES: 'Farellones',
  EL_COLORADO: 'El Colorado',
  LA_PARVA: 'La Parva',
  VALLE_NEVADO: 'Valle Nevado',
};

const DIRECTION_BADGES: Record<string, { label: string; color: string }> = {
  SUBIDA: { label: '⬆️ Subida', color: 'bg-sky-500/15 border-sky-400/40 text-sky-300' },
  BAJADA: { label: '⬇️ Bajada', color: 'bg-amber-500/15 border-amber-400/40 text-amber-300' },
  ROUND_TRIP: { label: '🔄 Ida y Vuelta', color: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300' },
};

export default function TripCard({ trip, currentUser, onDeleteTrip }: TripCardProps) {
  const isOwner = currentUser?.id === trip.user_id;

  // Format currency CLP
  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(trip.price_per_seat);

  // Generate WhatsApp deep link
  const directionText =
    trip.direction === 'SUBIDA'
      ? 'subida'
      : trip.direction === 'BAJADA'
      ? 'bajada'
      : 'ida y vuelta';
  
  const destName = DESTINATION_NAMES[trip.destination] || trip.destination;

  const defaultMsg = `Hola ${trip.driver_name}! Vi tu viaje de ${directionText} a ${destName} en Faredeo para el ${trip.departure_date}. ¿Aún tienes cupo disponible?`;
  const encodedMsg = encodeURIComponent(defaultMsg);
  
  // Format clean phone for whatsapp
  const cleanPhone = trip.whatsapp_number.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  return (
    <div className="glass-card rounded-3xl p-5 hover:border-white/30 transition-all duration-300 shadow-xl flex flex-col justify-between border border-zinc-800 relative overflow-hidden">
      <div>
        {/* Top Header: Time Badge & Direction Tag */}
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-xs font-bold text-white bg-zinc-900 border border-zinc-700 px-3 py-1 rounded-xl shadow-sm flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            {trip.departure_time.slice(0, 5)} hrs
          </span>

          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${DIRECTION_BADGES[trip.direction]?.color}`}>
            {DIRECTION_BADGES[trip.direction]?.label}
          </span>
        </div>

        {/* Driver Profile Bar */}
        <div className="flex items-center justify-between gap-3 mb-3.5 bg-zinc-900/90 p-2.5 rounded-2xl border border-zinc-800">
          <div className="flex items-center gap-2.5">
            {trip.driver_avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={trip.driver_avatar}
                alt={trip.driver_name}
                className="w-9 h-9 rounded-full ring-2 ring-white/20 object-cover"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-black text-xs shadow-sm">
                {trip.driver_name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="font-bold text-xs text-white flex items-center gap-1">
                {trip.driver_name}
                <span title="Verificado con Google">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                </span>
              </h3>
              <p className="text-[10px] text-zinc-400">Conductor Verificado</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm font-black text-white">{formattedPrice}</div>
            <div className="text-[10px] text-zinc-400">por cupo</div>
          </div>
        </div>

        {/* Route Details */}
        <div className="space-y-2 mb-3 bg-zinc-950/80 rounded-2xl p-3 border border-zinc-800/80">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" /> Salida:
            </span>
            <span className="font-semibold text-zinc-200">{trip.origin}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400" /> Destino:
            </span>
            <span className="font-bold text-white">{destName}</span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1.5 border-t border-zinc-800">
            <span className="text-zinc-300 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" /> {trip.departure_date}
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
              <Users className="w-3 h-3" /> {trip.seats_available} cupo{trip.seats_available > 1 ? 's' : ''} libre{trip.seats_available > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Mountain Equipment Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {trip.has_4x4 && (
            <span className="text-[10px] font-semibold bg-zinc-900 text-zinc-200 border border-zinc-700 px-2.5 py-0.5 rounded-lg">
              🚙 4x4 / AWD
            </span>
          )}
          {trip.has_chains && (
            <span className="text-[10px] font-semibold bg-zinc-900 text-zinc-200 border border-zinc-700 px-2.5 py-0.5 rounded-lg">
              ⛓️ Cadenas
            </span>
          )}
          {trip.has_rack && (
            <span className="text-[10px] font-semibold bg-zinc-900 text-zinc-200 border border-zinc-700 px-2.5 py-0.5 rounded-lg">
              🎿 Porta-esquís
            </span>
          )}
        </div>

        {/* Notes */}
        {trip.notes && (
          <p className="text-xs text-zinc-400 italic mb-3 line-clamp-2 bg-zinc-950/60 p-2 rounded-xl border border-zinc-800/60">
            &quot;{trip.notes}&quot;
          </p>
        )}
      </div>

      {/* Action Footer: WhatsApp Button */}
      <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
        {isOwner ? (
          <button
            onClick={() => onDeleteTrip(trip.id)}
            title="Eliminar Viaje"
            className="p-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 border border-transparent transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        ) : (
          <div className="text-[11px] text-zinc-400">Coordinación 100% directa</div>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-emerald-600/20 active:scale-95 cursor-pointer border border-emerald-500/30"
        >
          <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
          <span>Contactar por WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
