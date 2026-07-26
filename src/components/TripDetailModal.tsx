'use client';

import { Trip } from '@/types/trip';
import { User } from '@supabase/supabase-js';
import { X, MapPin, Calendar, Clock, Users, ShieldCheck, Trash2, MessageCircle, Car, ArrowRight, ExternalLink } from 'lucide-react';

const InstagramIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface TripDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip | null;
  currentUser: User | null;
  onDeleteTrip: (tripId: string) => void;
  isTourActive?: boolean;
}

const DESTINATION_NAMES: Record<string, string> = {
  FARELLONES: 'Farellones',
  EL_COLORADO: 'El Colorado',
  LA_PARVA: 'La Parva',
  VALLE_NEVADO: 'Valle Nevado',
};

const DIRECTION_BADGES: Record<string, { label: string; color: string }> = {
  SUBIDA: { label: '⬆️ Subida a la Cordillera', color: 'bg-sky-500/15 border-sky-400/40 text-[#0284C7]' },
  BAJADA: { label: '⬇️ Bajada a Santiago', color: 'bg-blue-600/15 border-blue-500/40 text-blue-900' },
  ROUND_TRIP: { label: '🔄 Ida y Vuelta', color: 'bg-cyan-500/15 border-cyan-400/40 text-cyan-900' },
};

export default function TripDetailModal({
  isOpen,
  onClose,
  trip,
  currentUser,
  onDeleteTrip,
  isTourActive,
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
    <div className={`fixed inset-0 flex items-center justify-center p-3 animate-fadeIn ${isTourActive ? 'z-[220] bg-transparent pointer-events-none' : 'z-50 bg-[#0c2340]/40 backdrop-blur-md'}`}>
      <div
        data-tour="trip-detail-modal"
        className="glass-card w-full max-w-lg rounded-3xl overflow-hidden relative max-h-[90vh] flex flex-col text-[#0F2942] pointer-events-auto shadow-2xl bg-white/95 border border-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-sky-100 flex items-center justify-between bg-white/90 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${DIRECTION_BADGES[trip.direction]?.color}`}>
              {DIRECTION_BADGES[trip.direction]?.label}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-sky-50 text-slate-500 hover:text-[#0F2942] hover:bg-sky-100 transition cursor-pointer border border-sky-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto custom-scrollbar flex-1">
          {/* Driver Card Info */}
          <div className="flex items-center justify-between bg-sky-50/60 backdrop-blur-xs p-3.5 rounded-2xl border border-sky-100 shadow-xs">
            <div className="flex items-center gap-3">
              {trip.driver_avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={trip.driver_avatar}
                  alt={trip.driver_name}
                  className="w-12 h-12 rounded-full ring-2 ring-[#38BDF8]/60 object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#38BDF8] text-[#0F2942] flex items-center justify-center font-black text-base shadow-xs">
                  {trip.driver_name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="font-extrabold text-sm text-[#0F2942] flex items-center gap-1.5 flex-wrap">
                  {trip.driver_name}
                  <span title="Verificado con Google">
                    <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
                  </span>

                  {trip.instagram_handle && (
                    <div className="relative group inline-block ml-1">
                      <a
                        href={`https://instagram.com/${trip.instagram_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 rounded-full bg-white hover:bg-sky-100 text-[#0284C7] border border-sky-200 transition flex items-center justify-center cursor-pointer"
                        title={`@${trip.instagram_handle} en Instagram`}
                      >
                        <InstagramIcon className="w-3.5 h-3.5" />
                      </a>

                      {/* Hover Card Preview */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:flex flex-col items-center bg-white border border-sky-200 p-3 rounded-2xl shadow-xl z-30 min-w-[210px] text-center animate-fadeIn pointer-events-none group-hover:pointer-events-auto">
                        {/* Arrow */}
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-sky-200 rotate-45"></div>

                        <div className="flex items-center gap-2 mb-2 w-full text-left">
                          <div className="p-2 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shrink-0">
                            <InstagramIcon className="w-4 h-4" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-xs font-bold text-[#0F2942] truncate">@{trip.instagram_handle}</p>
                            <p className="text-[10px] text-slate-500">Perfil de Instagram</p>
                          </div>
                        </div>

                        <a
                          href={`https://instagram.com/${trip.instagram_handle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-full text-center bg-[#38BDF8] hover:bg-[#0284C7] text-[#0F2942] hover:text-white font-black text-[11px] py-1.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5"
                        >
                          Ver en Instagram <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </h3>
                <p className="text-xs text-[#0284C7] flex items-center gap-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8] inline-block animate-pulse"></span>
                  Conductor Verificado
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-black text-[#0F2942]">{formattedPrice}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">por cupo</div>
            </div>
          </div>

          {/* Route Box */}
          <div className="bg-white rounded-2xl p-4 border border-sky-200 space-y-3 shadow-xs">
            <div className="text-xs font-bold text-[#0F2942] uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" /> Detalles de la Ruta
            </div>

            <div className="flex items-center justify-between gap-2 bg-sky-50/70 p-3 rounded-xl border border-sky-100 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-medium">Origen</span>
                <span className="font-extrabold text-[#0F2942] text-sm">{trip.origin}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase block font-medium">Destino</span>
                <span className="font-black text-[#0F2942] text-sm">{destName}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="bg-sky-50/70 p-2.5 rounded-xl border border-sky-100 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#38BDF8]" />
                <div>
                  <span className="text-[9px] text-slate-500 block font-medium">Fecha</span>
                  <span className="font-bold text-[#0F2942]">{trip.departure_date}</span>
                </div>
              </div>

              <div className="bg-sky-50/70 p-2.5 rounded-xl border border-sky-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#38BDF8]" />
                <div>
                  <span className="text-[9px] text-slate-500 block font-medium">Hora Salida</span>
                  <span className="font-black text-[#0F2942]">{trip.departure_time.slice(0, 5)} hrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seats & Equipment */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#0F2942] uppercase tracking-wider flex items-center justify-between">
              <span>Equipamiento de Montaña</span>
              <span className="text-[#0284C7] text-xs font-extrabold flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#38BDF8]" /> {trip.seats_available} cupo{trip.seats_available > 1 ? 's' : ''} libre{trip.seats_available > 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className={`p-2.5 rounded-xl border ${trip.has_4x4 ? 'bg-sky-50 border-sky-200 text-[#0F2942] font-bold' : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'}`}>
                <Car className="w-4 h-4 mx-auto mb-1 text-[#38BDF8]" />
                <span className="text-[10px] font-bold block">🚙 4x4 / AWD</span>
                <span className="text-[9px]">{trip.has_4x4 ? 'Sí incluye' : 'No'}</span>
              </div>

              <div className={`p-2.5 rounded-xl border ${trip.has_chains ? 'bg-sky-50 border-sky-200 text-[#0F2942] font-bold' : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'}`}>
                <span className="text-base block mb-0.5">⛓️</span>
                <span className="text-[10px] font-bold block">Cadenas</span>
                <span className="text-[9px]">{trip.has_chains ? 'Sí lleva' : 'No'}</span>
              </div>

              <div className={`p-2.5 rounded-xl border ${trip.has_rack ? 'bg-sky-50 border-sky-200 text-[#0F2942] font-bold' : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'}`}>
                <span className="text-base block mb-0.5">🎿</span>
                <span className="text-[10px] font-bold block">Porta-ski</span>
                <span className="text-[9px]">{trip.has_rack ? 'Sí tiene' : 'No'}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {trip.notes && (
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Comentarios del Conductor</span>
              <div className="bg-sky-50/60 p-3 rounded-2xl border border-sky-100 text-xs text-[#0F2942] leading-relaxed italic font-medium">
                &quot;{trip.notes}&quot;
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 border-t border-sky-100 bg-white flex items-center justify-between gap-3">
          {isOwner ? (
            <button
              onClick={() => {
                onDeleteTrip(trip.id);
                onClose();
              }}
              className="px-4 py-3 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 transition text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Eliminar</span>
            </button>
          ) : (
            <span className="text-[10px] text-slate-500 font-medium">Coordinación 100% directa P2P</span>
          )}

          <a
            data-tour="whatsapp-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#38BDF8] hover:bg-[#0284C7] text-[#0F2942] hover:text-white font-black text-sm py-3 px-5 rounded-2xl shadow-md border border-sky-300/40 active:scale-95 transition-all cursor-pointer group"
          >
            <MessageCircle className="w-4 h-4 fill-[#0F2942] group-hover:fill-white text-[#38BDF8] group-hover:text-[#0284C7] transition-colors" />
            <span>Contactar por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
