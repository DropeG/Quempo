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
      onClick={() => onSelectTrip && onSelectTrip(trip)}
      className="glass-card rounded-2xl p-3.5 sm:p-4 hover:border-[#DAAF9E]/50 transition-all duration-300 border border-[#2a575a] flex items-center justify-between gap-3 sm:gap-4 cursor-pointer group bg-[#163F41]"
    >
      {/* Driver Avatar & Essential Header */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {trip.driver_avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={trip.driver_avatar}
            alt={trip.driver_name}
            className="w-10 h-10 rounded-full ring-2 ring-[#DAAF9E]/50 object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#DAAF9E] text-[#163F41] flex items-center justify-center font-black text-sm shadow-xs flex-shrink-0">
            {trip.driver_name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm sm:text-base text-[#EFEEEC] truncate max-w-[120px] sm:max-w-[160px] group-hover:text-[#DAAF9E] transition-colors">
              {trip.driver_name}
            </span>
            <span title="Verificado con Google" className="flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#F0CDC4]" />
            </span>
            <span className="text-xs font-semibold text-[#F0CDC4] bg-[#0e292b] border border-[#2a575a] px-2 py-0.5 rounded-md flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#DAAF9E]" />
              {trip.departure_time.slice(0, 5)} hrs
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#6B8B86] min-w-0">
            <span className="font-bold text-[#EFEEEC] truncate">🏔️ {destName}</span>
          </div>
        </div>
      </div>

      {/* Price + Seats + Arrow */}
      <div className="flex items-center gap-3 flex-shrink-0 text-right">
        <div>
          <div className="text-base sm:text-lg font-black text-[#DAAF9E]">{formattedPrice}</div>
          <div className="text-xs font-semibold text-[#F0CDC4] flex items-center justify-end gap-1">
            <Users className="w-3 h-3 text-[#6B8B86]" />
            {trip.seats_available} cupo{trip.seats_available > 1 ? 's' : ''}
          </div>
        </div>

        <div className="p-2 rounded-xl bg-[#0e292b] text-[#F0CDC4] group-hover:text-[#DAAF9E] group-hover:bg-[#DAAF9E]/15 border border-[#2a575a] group-hover:border-[#DAAF9E]/40 transition-all">
          <ChevronRight className="w-5 h-5 transition-colors" />
        </div>
      </div>
    </div>
  );
}
