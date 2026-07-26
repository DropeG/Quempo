'use client';

import { Trip } from '@/types/trip';
import { User } from '@supabase/supabase-js';
import { X, MapPin, Calendar, Clock, Users, ShieldCheck, Trash2, MessageCircle, Car, ArrowRight } from 'lucide-react';

interface TripDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip | null;
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
  SUBIDA: { label: '⬆️ Subida a la Cordillera', color: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300' },
  BAJADA: { label: '⬇️ Bajada a Santiago', color: 'bg-amber-500/15 border-amber-400/40 text-amber-300' },
  ROUND_TRIP: { label: '🔄 Ida y Vuelta', color: 'bg-teal-500/15 border-teal-400/40 text-teal-300' },
};

export default function TripDetailModal({
  isOpen,
  onClose,
  trip,
  currentUser,
  onDeleteTrip,
}: TripDetailModalProps) {
  if (!isOpen || !trip) return null;

  const isOwner = currentUser?.id === trip.user_id;

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(trip.price_per_seat);

  const directionText =
    trip.direction === 'SUBIDA'
      ? 'subida'
      : trip.direction === 'BAJADA'
      ? 'bajada'
      : 'ida y vuelta';

  const destName = DESTINATION_NAMES[trip.destination] || trip.destination;

  const defaultMsg = `Hola ${trip.driver_name}! Vi tu viaje de ${directionText} a ${destName} en Faredeo para el ${trip.departure_date}. ¿Aún tienes cupo disponible?`;
  const encodedMsg = encodeURIComponent(defaultMsg);

  const cleanPhone = trip.whatsapp_number.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="glass-card w-full max-w-lg rounded-3xl border border-emerald-500/30 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col bg-slate-950/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${DIRECTION_BADGES[trip.direction]?.color}`}>
              {DIRECTION_BADGES[trip.direction]?.label}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto custom-scrollbar flex-1">
          {/* Driver Card Info */}
          <div className="flex items-center justify-between bg-zinc-900/90 p-3.5 rounded-2xl border border-zinc-800 shadow-sm">
            <div className="flex items-center gap-3">
              {trip.driver_avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={trip.driver_avatar}
                  alt={trip.driver_name}
                  className="w-12 h-12 rounded-full ring-2 ring-emerald-500/50 object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-base shadow-md">
                  {trip.driver_name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  {trip.driver_name}
                  <span title="Verificado con Google">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  Conductor Verificado
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-black text-emerald-400">{formattedPrice}</div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider">por cupo</div>
            </div>
          </div>

          {/* Route Box */}
          <div className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800 space-y-3">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Detalles de la Ruta
            </div>

            <div className="flex items-center justify-between gap-2 bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase block">Origen</span>
                <span className="font-semibold text-white text-sm">{trip.origin}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 uppercase block">Destino</span>
                <span className="font-bold text-emerald-300 text-sm">{destName}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800/80 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-[9px] text-zinc-400 block">Fecha</span>
                  <span className="font-semibold text-white">{trip.departure_date}</span>
                </div>
              </div>

              <div className="bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800/80 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-[9px] text-zinc-400 block">Hora Salida</span>
                  <span className="font-bold text-white">{trip.departure_time.slice(0, 5)} hrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seats & Equipment */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              <span>Equipamiento de Montaña</span>
              <span className="text-emerald-400 text-xs flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {trip.seats_available} cupo{trip.seats_available > 1 ? 's' : ''} libre{trip.seats_available > 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className={`p-2.5 rounded-xl border ${trip.has_4x4 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 opacity-60'}`}>
                <Car className="w-4 h-4 mx-auto mb-1" />
                <span className="text-[10px] font-bold block">🚙 4x4 / AWD</span>
                <span className="text-[9px]">{trip.has_4x4 ? 'Sí incluye' : 'No'}</span>
              </div>

              <div className={`p-2.5 rounded-xl border ${trip.has_chains ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 opacity-60'}`}>
                <span className="text-base block mb-0.5">⛓️</span>
                <span className="text-[10px] font-bold block">Cadenas</span>
                <span className="text-[9px]">{trip.has_chains ? 'Sí lleva' : 'No'}</span>
              </div>

              <div className={`p-2.5 rounded-xl border ${trip.has_rack ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 opacity-60'}`}>
                <span className="text-base block mb-0.5">🎿</span>
                <span className="text-[10px] font-bold block">Porta-ski</span>
                <span className="text-[9px]">{trip.has_rack ? 'Sí tiene' : 'No'}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {trip.notes && (
            <div className="space-y-1">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Comentarios del Conductor</span>
              <div className="bg-zinc-900/90 p-3 rounded-2xl border border-zinc-800 text-xs text-zinc-300 leading-relaxed italic">
                &quot;{trip.notes}&quot;
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/90 flex items-center justify-between gap-3">
          {isOwner ? (
            <button
              onClick={() => {
                onDeleteTrip(trip.id);
                onClose();
              }}
              className="px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 transition text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Eliminar</span>
            </button>
          ) : (
            <span className="text-[10px] text-zinc-400">Coordinación 100% directa P2P</span>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-sm py-3 px-5 rounded-2xl shadow-lg shadow-emerald-500/25 border border-emerald-300/50 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950 text-emerald-500" />
            <span>Contactar por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
