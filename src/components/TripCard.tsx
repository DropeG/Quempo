'use client';

import { Trip } from '@/types/trip';
import { User } from '@supabase/supabase-js';
import { Clock, Users, ShieldCheck, ChevronRight } from 'lucide-react';

interface TripCardProps {
  trip: Trip;
  currentUser: User | null;
  onDeleteTrip: (tripId: string) => void;
  onSelectTrip?: (trip: Trip) => void;
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

export default function TripCard({ trip, onSelectTrip }: TripCardProps) {
  // Format currency CLP
  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(trip.price_per_seat);

  const destName = DESTINATION_NAMES[trip.destination] || trip.destination;

  return (
    <div
      onClick={() => onSelectTrip && onSelectTrip(trip)}
      className="glass-card rounded-2xl p-3.5 sm:p-4 hover:border-emerald-500/60 hover:bg-zinc-900/90 transition-all duration-300 shadow-md border border-zinc-800/90 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer group"
    >
      {/* Driver Avatar & Essential Header */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {trip.driver_avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={trip.driver_avatar}
            alt={trip.driver_name}
            className="w-10 h-10 rounded-full ring-2 ring-emerald-500/40 object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-md flex-shrink-0">
            {trip.driver_name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm sm:text-base text-white truncate max-w-[120px] sm:max-w-[160px] group-hover:text-emerald-300 transition-colors">
              {trip.driver_name}
            </span>
            <span title="Verificado con Google" className="flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </span>
            <span className="text-xs font-bold text-zinc-200 bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
              <Clock className="w-3 h-3 text-emerald-400" />
              {trip.departure_time.slice(0, 5)} hrs
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-300 truncate">
            <span className="font-extrabold text-emerald-400">🏔️ {destName}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400 font-medium">{DIRECTION_BADGES[trip.direction]?.label}</span>
          </div>
        </div>
      </div>

      {/* Price + Seats + Arrow */}
      <div className="flex items-center gap-3 flex-shrink-0 text-right">
        <div>
          <div className="text-base sm:text-lg font-black text-emerald-400">{formattedPrice}</div>
          <div className="text-xs font-semibold text-zinc-400 flex items-center justify-end gap-1">
            <Users className="w-3 h-3 text-emerald-400" />
            {trip.seats_available} cupo{trip.seats_available > 1 ? 's' : ''}
          </div>
        </div>

        <div className="p-2 rounded-xl bg-zinc-800/80 text-zinc-400 group-hover:text-white group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 border border-transparent transition-all">
          <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400" />
        </div>
      </div>
    </div>
  );
}
