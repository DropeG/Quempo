'use client';

import { Trip } from '@/types/trip';
import { User } from '@supabase/supabase-js';
import { Clock, Users, ShieldCheck } from 'lucide-react';
import UserAvatar from './UserAvatar';

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
  const formattedPrice = `$${trip.price_per_seat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

  const destName = DESTINATION_NAMES[trip.destination] || trip.destination;

  return (
    <div
      data-tour="trip-card"
      onClick={() => onSelectTrip && onSelectTrip(trip)}
      className="glass-card rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 cursor-pointer group transition-all duration-300 hover:border-white/40 active:scale-[0.99] border border-white/20"
    >
      {/* Left: Time & Destination */}
      <div className="flex flex-col items-start gap-1 shrink-0">
        <span className="text-xs sm:text-sm font-black text-white bg-sky-400/20 text-sky-200 border border-sky-300/30 px-2 py-0.5 rounded-xl flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>{trip.departure_time.slice(0, 5)}</span>
        </span>
        <span className="text-xs font-black text-white mt-0.5 truncate max-w-[100px] sm:max-w-[120px]">
          🏔️ {destName}
        </span>
      </div>

      {/* Center: Driver Info */}
      <div className="flex items-center gap-2 min-w-0 flex-1 justify-center">
        <UserAvatar
          src={trip.driver_avatar}
          name={trip.driver_name}
          size="sm"
        />
        <div className="min-w-0 text-left">
          <div className="flex items-center gap-1">
            <span className="font-extrabold text-xs sm:text-sm text-white truncate max-w-[80px] sm:max-w-[120px] group-hover:text-sky-300 transition-colors">
              {trip.driver_name.split(' ')[0]}
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-slate-300 block leading-none">
            Conductor
          </span>
        </div>
      </div>

      {/* Right: Price & Seats */}
      <div className="flex flex-col items-end gap-0.5 shrink-0 text-right">
        <span className="text-sm sm:text-base font-black text-white leading-tight">
          {formattedPrice}
        </span>
        <span className="text-xs font-bold text-sky-200 flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>{trip.seats_available} cupo{trip.seats_available > 1 ? 's' : ''}</span>
        </span>
      </div>
    </div>
  );
}
