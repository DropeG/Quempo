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
      data-tour="trip-card"
      onClick={() => onSelectTrip && onSelectTrip(trip)}
      className="glass-card rounded-2xl p-4 sm:p-4.5 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer group"
    >
      {/* Driver Avatar & Essential Header */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {trip.driver_avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={trip.driver_avatar}
            alt={trip.driver_name}
            className="w-10.5 h-10.5 rounded-full ring-2 ring-white/70 object-cover flex-shrink-0 shadow-sm"
          />
        ) : (
          <div className="w-10.5 h-10.5 rounded-full bg-white text-[#0F2942] flex items-center justify-center font-black text-sm shadow-xs flex-shrink-0">
            {trip.driver_name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-extrabold text-sm sm:text-base text-white truncate max-w-[120px] sm:max-w-[160px] group-hover:text-sky-300 transition-colors drop-shadow-xs">
              {trip.driver_name}
            </span>
            <span title="Verificado con Google" className="flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
            </span>
            <span className="text-xs font-bold text-sky-200 bg-white/10 border border-white/20 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#38BDF8]" />
              {trip.departure_time.slice(0, 5)} hrs
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-200 min-w-0">
            <span className="font-bold text-slate-200 truncate">🏔️ {destName}</span>
          </div>
        </div>
      </div>

      {/* Price + Seats + Arrow */}
      <div className="flex items-center gap-3 flex-shrink-0 text-right">
        <div>
          <div className="text-base sm:text-lg font-black text-white">{formattedPrice}</div>
          <div className="text-xs font-semibold text-sky-200 flex items-center justify-end gap-1">
            <Users className="w-3 h-3 text-[#38BDF8]" />
            {trip.seats_available} cupo{trip.seats_available > 1 ? 's' : ''}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-white/10 text-white group-hover:bg-[#38BDF8] group-hover:text-[#0F2942] border border-white/20 group-hover:border-white/40 transition-all shadow-xs">
          <ChevronRight className="w-5 h-5 transition-colors" />
        </div>
      </div>
    </div>
  );
}

