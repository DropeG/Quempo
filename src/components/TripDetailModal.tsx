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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-[#0e292b]/80 backdrop-blur-xs animate-fadeIn">
      <div
        className="glass-card w-full max-w-lg rounded-3xl border border-[#2a575a] shadow-xl overflow-hidden relative max-h-[90vh] flex flex-col bg-[#163F41] text-[#EFEEEC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-[#2a575a] flex items-center justify-between bg-[#0e292b]">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${DIRECTION_BADGES[trip.direction]?.color}`}>
              {DIRECTION_BADGES[trip.direction]?.label}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#163F41] text-[#F0CDC4] hover:text-white hover:bg-[#0e292b] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto custom-scrollbar flex-1">
          {/* Driver Card Info */}
          <div className="flex items-center justify-between bg-[#0e292b] p-3.5 rounded-2xl border border-[#2a575a] shadow-xs">
            <div className="flex items-center gap-3">
              {trip.driver_avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={trip.driver_avatar}
                  alt={trip.driver_name}
                  className="w-12 h-12 rounded-full ring-2 ring-[#DAAF9E]/50 object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#DAAF9E] text-[#163F41] flex items-center justify-center font-black text-base shadow-xs">
                  {trip.driver_name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="font-bold text-sm text-[#EFEEEC] flex items-center gap-1.5">
                  {trip.driver_name}
                  <span title="Verificado con Google">
                    <ShieldCheck className="w-4 h-4 text-[#F0CDC4]" />
                  </span>
                </h3>
                <p className="text-xs text-[#F0CDC4] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#DAAF9E] inline-block animate-pulse"></span>
                  Conductor Verificado
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-black text-[#DAAF9E]">{formattedPrice}</div>
              <div className="text-[10px] text-[#6B8B86] uppercase tracking-wider">por cupo</div>
            </div>
          </div>

          {/* Route Box */}
          <div className="bg-[#0e292b] rounded-2xl p-4 border border-[#2a575a] space-y-3">
            <div className="text-xs font-bold text-[#F0CDC4] uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#DAAF9E]" /> Detalles de la Ruta
            </div>

            <div className="flex items-center justify-between gap-2 bg-[#163F41] p-3 rounded-xl border border-[#2a575a] text-xs">
              <div>
                <span className="text-[10px] text-[#6B8B86] uppercase block">Origen</span>
                <span className="font-semibold text-[#EFEEEC] text-sm">{trip.origin}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#DAAF9E] flex-shrink-0" />
              <div className="text-right">
                <span className="text-[10px] text-[#6B8B86] uppercase block">Destino</span>
                <span className="font-bold text-[#EFEEEC] text-sm">{destName}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="bg-[#163F41] p-2.5 rounded-xl border border-[#2a575a] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#F0CDC4]" />
                <div>
                  <span className="text-[9px] text-[#6B8B86] block">Fecha</span>
                  <span className="font-semibold text-[#EFEEEC]">{trip.departure_date}</span>
                </div>
              </div>

              <div className="bg-[#163F41] p-2.5 rounded-xl border border-[#2a575a] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#DAAF9E]" />
                <div>
                  <span className="text-[9px] text-[#6B8B86] block">Hora Salida</span>
                  <span className="font-bold text-[#EFEEEC]">{trip.departure_time.slice(0, 5)} hrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seats & Equipment */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#F0CDC4] uppercase tracking-wider flex items-center justify-between">
              <span>Equipamiento de Montaña</span>
              <span className="text-[#DAAF9E] text-xs font-bold flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {trip.seats_available} cupo{trip.seats_available > 1 ? 's' : ''} libre{trip.seats_available > 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className={`p-2.5 rounded-xl border ${trip.has_4x4 ? 'bg-[#DAAF9E]/20 border-[#DAAF9E]/40 text-[#DAAF9E] font-semibold' : 'bg-[#0e292b] border-[#2a575a] text-[#6B8B86] opacity-60'}`}>
                <Car className="w-4 h-4 mx-auto mb-1 text-[#DAAF9E]" />
                <span className="text-[10px] font-bold block">🚙 4x4 / AWD</span>
                <span className="text-[9px]">{trip.has_4x4 ? 'Sí incluye' : 'No'}</span>
              </div>

              <div className={`p-2.5 rounded-xl border ${trip.has_chains ? 'bg-[#F0CDC4]/20 border-[#F0CDC4]/40 text-[#F0CDC4] font-semibold' : 'bg-[#0e292b] border-[#2a575a] text-[#6B8B86] opacity-60'}`}>
                <span className="text-base block mb-0.5">⛓️</span>
                <span className="text-[10px] font-bold block">Cadenas</span>
                <span className="text-[9px]">{trip.has_chains ? 'Sí lleva' : 'No'}</span>
              </div>

              <div className={`p-2.5 rounded-xl border ${trip.has_rack ? 'bg-teal-500/20 border-teal-500/40 text-teal-200 font-semibold' : 'bg-[#0e292b] border-[#2a575a] text-[#6B8B86] opacity-60'}`}>
                <span className="text-base block mb-0.5">🎿</span>
                <span className="text-[10px] font-bold block">Porta-ski</span>
                <span className="text-[9px]">{trip.has_rack ? 'Sí tiene' : 'No'}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {trip.notes && (
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#6B8B86] uppercase tracking-wider">Comentarios del Conductor</span>
              <div className="bg-[#0e292b] p-3 rounded-2xl border border-[#2a575a] text-xs text-[#EFEEEC] leading-relaxed italic">
                &quot;{trip.notes}&quot;
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 border-t border-[#2a575a] bg-[#0e292b] flex items-center justify-between gap-3">
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
            <span className="text-[10px] text-[#6B8B86]">Coordinación 100% directa P2P</span>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-sm py-3 px-5 rounded-2xl shadow-sm border border-transparent active:scale-95 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950 text-[#25D366]" />
            <span>Contactar por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
