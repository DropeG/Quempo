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
      className={`glass-card rounded-2xl p-3 sm:p-3.5 transition-all duration-300 relative overflow-hidden text-xs cursor-pointer ${
        isExpanded ? 'ring-1 ring-white/60 shadow-lg' : ''
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
              className="w-7 h-7 rounded-full ring-2 ring-white/70 object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-white text-[#0F2942] flex items-center justify-center font-black text-[10px] shadow-xs flex-shrink-0">
              {trip.driver_name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-extrabold text-[12px] text-white truncate max-w-[100px] sm:max-w-[130px] drop-shadow-xs">
                {trip.driver_name}
              </span>
              <span title="Verificado con Google" className="flex-shrink-0">
                <ShieldCheck className="w-3 h-3 text-[#38BDF8]" />
              </span>
              <span className="text-[10px] font-bold text-sky-200 bg-white/10 border border-white/20 px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5 text-[#38BDF8]" />
                {trip.departure_time.slice(0, 5)}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[10px] text-slate-200 min-w-0">
              <span className="font-bold text-sky-300 truncate">🏔️ {destName}</span>
            </div>
          </div>
        </div>

        {/* Precio + Cupos + Chevron toggle */}
        <div className="flex items-center gap-2 flex-shrink-0 text-right">
          <div>
            <div className="text-xs font-black text-white">{formattedPrice}</div>
            <div className="text-[9px] font-semibold text-sky-200 flex items-center justify-end gap-0.5">
              <Users className="w-2.5 h-2.5 text-[#38BDF8]" />
              {trip.seats_available} cupo{trip.seats_available > 1 ? 's' : ''}
            </div>
          </div>

          <div className="p-1 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/20">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-white" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-300" />
            )}
          </div>
        </div>
      </div>

      {/* 2. Sección Detallada (Divulgación Progresiva - Expandible) */}
      {isExpanded && (
        <div
          onClick={(e) => e.stopPropagation()} // Permite interactuar con los botones sin cerrar la tarjeta
          className="mt-3 pt-2.5 border-t border-white/20 space-y-2.5 animate-fadeIn"
        >
          {/* Origen y Destino Completo */}
          <div className="grid grid-cols-2 gap-2 bg-slate-900/60 backdrop-blur-md rounded-xl p-2 border border-white/20 text-[11px] text-white">
            <div>
              <span className="text-[9px] text-sky-200/80 uppercase font-medium block">Punto de Salida:</span>
              <span className="font-bold text-white flex items-center gap-1 truncate">
                <MapPin className="w-3 h-3 text-slate-300 flex-shrink-0" /> {trip.origin}
              </span>
            </div>
            <div>
              <span className="text-[9px] text-sky-200/80 uppercase font-medium block">Destino:</span>
              <span className="font-black text-white flex items-center gap-1 truncate">
                <MapPin className="w-3 h-3 text-[#38BDF8] flex-shrink-0" /> {destName}
              </span>
            </div>
          </div>

          {/* Fecha y Equipamiento de Montaña */}
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <span className="text-[10px] text-white font-semibold flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/20 px-2 py-0.5 rounded-lg shadow-2xs">
              <Calendar className="w-3 h-3 text-[#38BDF8]" /> {trip.departure_date}
            </span>

            <div className="flex items-center gap-1">
              {trip.has_4x4 && (
                <span className="text-[9px] font-bold bg-white/10 backdrop-blur-md text-white border border-white/20 px-1.5 py-0.5 rounded-md shadow-2xs">
                  🚙 4x4
                </span>
              )}
              {trip.has_chains && (
                <span className="text-[9px] font-bold bg-white/10 backdrop-blur-md text-white border border-white/20 px-1.5 py-0.5 rounded-md shadow-2xs">
                  ⛓️ Cadenas
                </span>
              )}
              {trip.has_rack && (
                <span className="text-[9px] font-bold bg-white/10 backdrop-blur-md text-white border border-white/20 px-1.5 py-0.5 rounded-md shadow-2xs">
                  🎿 Porta-ski
                </span>
              )}
            </div>
          </div>

          {/* Notas del Conductor */}
          {trip.notes && (
            <p className="text-[10px] text-slate-200 italic bg-slate-900/60 backdrop-blur-md p-2 rounded-xl border border-white/20 leading-relaxed font-medium">
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
                className="p-2 rounded-xl text-rose-300 hover:bg-rose-500/20 border border-rose-400/40 transition cursor-pointer flex items-center gap-1 text-[11px] font-bold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar</span>
              </button>
            ) : (
              <span className="text-[9px] text-slate-300 font-medium">Contacto directo P2P</span>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#38BDF8] hover:bg-[#0284C7] text-[#0F2942] hover:text-white text-[11px] font-black py-2 px-3 rounded-xl transition shadow-sm active:scale-95 cursor-pointer border border-white/40 group"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#0F2942] group-hover:fill-white text-[#38BDF8] group-hover:text-[#0284C7] transition-colors" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
