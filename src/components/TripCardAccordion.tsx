'use client';

import { useState } from 'react';
import { Trip } from '@/types/trip';
import { User } from '@supabase/supabase-js';
import { MapPin, Calendar, Clock, Users, ShieldCheck, Trash2, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

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



export default function TripCardAccordion({ trip, currentUser, onDeleteTrip }: TripCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
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
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={`glass-card rounded-2xl p-2.5 sm:p-3 hover:border-emerald-500/50 transition-all duration-300 shadow-md border border-zinc-800/90 relative overflow-hidden text-xs cursor-pointer ${
        isExpanded ? 'ring-1 ring-emerald-500/30 bg-zinc-900/95' : 'hover:bg-zinc-900/80'
      }`}
    >
      {/* 1. Header Compacto (Siempre Visible) */}
      <div className="flex items-center justify-between gap-2">
        {/* Conductor + Hora + Destino */}
        <div className="flex items-center gap-2 min-w-0">
          {trip.driver_avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={trip.driver_avatar}
              alt={trip.driver_name}
              className="w-7 h-7 rounded-full ring-2 ring-emerald-500/40 object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-[10px] shadow-sm flex-shrink-0">
              {trip.driver_name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-[12px] text-white truncate max-w-[100px] sm:max-w-[130px]">
                {trip.driver_name}
              </span>
              <span title="Verificado con Google" className="flex-shrink-0">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
              </span>
              <span className="text-[10px] font-bold text-emerald-300 bg-zinc-950 border border-zinc-800 px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5 text-emerald-400" />
                {trip.departure_time.slice(0, 5)}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[10px] text-zinc-300 min-w-0">
              <span className="font-semibold text-emerald-400 truncate">🏔️ {destName}</span>
            </div>
          </div>
        </div>

        {/* Precio + Cupos + Chevron toggle */}
        <div className="flex items-center gap-2 flex-shrink-0 text-right">
          <div>
            <div className="text-xs font-black text-emerald-400">{formattedPrice}</div>
            <div className="text-[9px] font-semibold text-zinc-400 flex items-center justify-end gap-0.5">
              <Users className="w-2.5 h-2.5 text-emerald-400" />
              {trip.seats_available} cupo{trip.seats_available > 1 ? 's' : ''}
            </div>
          </div>

          <div className="p-1 rounded-lg bg-zinc-800/80 text-zinc-400 hover:text-white transition-colors">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-emerald-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            )}
          </div>
        </div>
      </div>

      {/* 2. Sección Detallada (Divulgación Progresiva - Expandible) */}
      {isExpanded && (
        <div
          onClick={(e) => e.stopPropagation()} // Permite interactuar con los botones sin cerrar la tarjeta
          className="mt-3 pt-2.5 border-t border-zinc-800 space-y-2.5 animate-fadeIn"
        >
          {/* Origen y Destino Completo */}
          <div className="grid grid-cols-2 gap-2 bg-zinc-950/80 rounded-xl p-2 border border-zinc-800/80 text-[11px]">
            <div>
              <span className="text-[9px] text-zinc-400 uppercase font-medium block">Punto de Salida:</span>
              <span className="font-semibold text-zinc-200 flex items-center gap-1 truncate">
                <MapPin className="w-3 h-3 text-zinc-400 flex-shrink-0" /> {trip.origin}
              </span>
            </div>
            <div>
              <span className="text-[9px] text-zinc-400 uppercase font-medium block">Destino:</span>
              <span className="font-bold text-white flex items-center gap-1 truncate">
                <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" /> {destName}
              </span>
            </div>
          </div>

          {/* Fecha y Equipamiento de Montaña */}
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <span className="text-[10px] text-zinc-300 flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-lg">
              <Calendar className="w-3 h-3 text-zinc-400" /> {trip.departure_date}
            </span>

            <div className="flex items-center gap-1">
              {trip.has_4x4 && (
                <span className="text-[9px] font-semibold bg-zinc-900 text-zinc-200 border border-zinc-700 px-1.5 py-0.5 rounded-md">
                  🚙 4x4
                </span>
              )}
              {trip.has_chains && (
                <span className="text-[9px] font-semibold bg-zinc-900 text-zinc-200 border border-zinc-700 px-1.5 py-0.5 rounded-md">
                  ⛓️ Cadenas
                </span>
              )}
              {trip.has_rack && (
                <span className="text-[9px] font-semibold bg-zinc-900 text-zinc-200 border border-zinc-700 px-1.5 py-0.5 rounded-md">
                  🎿 Porta-ski
                </span>
              )}
            </div>
          </div>

          {/* Notas del Conductor */}
          {trip.notes && (
            <p className="text-[10px] text-zinc-300 italic bg-zinc-950/60 p-2 rounded-xl border border-zinc-800/60 leading-relaxed">
              &quot;{trip.notes}&quot;
            </p>
          )}

          {/* Footer de Acción: WhatsApp & Eliminar */}
          <div className="pt-1 flex items-center justify-between gap-2">
            {isOwner ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTrip(trip.id);
                }}
                title="Eliminar Viaje"
                className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition cursor-pointer flex items-center gap-1 text-[11px]"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar</span>
              </button>
            ) : (
              <span className="text-[9px] text-zinc-500">Contacto directo P2P</span>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold py-2 px-3 rounded-xl transition shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer border border-emerald-500/30"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
