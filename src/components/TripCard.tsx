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
  SUBIDA: { label: '⬆️ Subida', color: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300' },
  BAJADA: { label: '⬇️ Bajada', color: 'bg-amber-500/15 border-amber-400/40 text-amber-300' },
  ROUND_TRIP: { label: '🔄 Ida y Vuelta', color: 'bg-teal-500/15 border-teal-400/40 text-teal-300' },
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
    <div className="glass-card rounded-2xl p-3.5 hover:border-emerald-500/40 transition-all duration-300 shadow-lg flex flex-col justify-between border border-zinc-800 relative overflow-hidden text-xs">
      <div className="space-y-2.5">
        {/* Top Header: Time Badge & Direction Tag */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-white bg-zinc-900 border border-zinc-700 px-2.5 py-0.5 rounded-lg shadow-sm flex items-center gap-1">
            <Clock className="w-3 h-3 text-emerald-400" />
            {trip.departure_time.slice(0, 5)} hrs
          </span>

          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${DIRECTION_BADGES[trip.direction]?.color}`}>
            {DIRECTION_BADGES[trip.direction]?.label}
          </span>
        </div>

        {/* Driver Profile Bar */}
        <div className="flex items-center justify-between gap-2 bg-zinc-900/90 p-2 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-2">
            {trip.driver_avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={trip.driver_avatar}
                alt={trip.driver_name}
                className="w-7 h-7 rounded-full ring-2 ring-emerald-500/40 object-cover"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-[10px] shadow-sm">
                {trip.driver_name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="font-bold text-[11px] text-white flex items-center gap-1">
                {trip.driver_name}
                <span title="Verificado con Google">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                </span>
              </h3>
              <p className="text-[9px] text-zinc-400">Verificado</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-black text-emerald-400">{formattedPrice}</div>
            <div className="text-[9px] text-zinc-400">por cupo</div>
          </div>
        </div>

        {/* Route Details */}
        <div className="space-y-1.5 bg-zinc-950/80 rounded-xl p-2.5 border border-zinc-800/80">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-zinc-400" /> Salida:
            </span>
            <span className="font-semibold text-zinc-200 truncate max-w-[110px]">{trip.origin}</span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" /> Destino:
            </span>
            <span className="font-bold text-white truncate max-w-[110px]">{destName}</span>
          </div>

          <div className="flex items-center justify-between text-[10px] pt-1 border-t border-zinc-800">
            <span className="text-zinc-300 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-zinc-400" /> {trip.departure_date}
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1 text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-500/20">
              <Users className="w-2.5 h-2.5" /> {trip.seats_available} cupo{trip.seats_available > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Mountain Equipment Badges */}
        <div className="flex flex-wrap gap-1">
          {trip.has_4x4 && (
            <span className="text-[9px] font-semibold bg-zinc-900 text-zinc-200 border border-zinc-700 px-2 py-0.5 rounded-md">
              🚙 4x4
            </span>
          )}
          {trip.has_chains && (
            <span className="text-[9px] font-semibold bg-zinc-900 text-zinc-200 border border-zinc-700 px-2 py-0.5 rounded-md">
              ⛓️ Cadenas
            </span>
          )}
          {trip.has_rack && (
            <span className="text-[9px] font-semibold bg-zinc-900 text-zinc-200 border border-zinc-700 px-2 py-0.5 rounded-md">
              🎿 Porta-ski
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
