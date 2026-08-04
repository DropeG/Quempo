'use client';

import { useState } from 'react';
import { Trip } from '@/types/trip';
import { User } from '@supabase/supabase-js';
import { X, MapPin, Calendar, Clock, Users, ShieldCheck, Trash2, MessageCircle, Car, ArrowRight, ExternalLink, Share2, Check } from 'lucide-react';
import UserAvatar from './UserAvatar';

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
  SUBIDA: { label: '⬆️ Subida a la Cordillera', color: 'bg-sky-400/20 border-sky-300/40 text-sky-200' },
  BAJADA: { label: '⬇️ Bajada a Santiago', color: 'bg-blue-500/20 border-blue-300/40 text-blue-200' },
  ROUND_TRIP: { label: '🔄 Ida y Vuelta', color: 'bg-cyan-400/20 border-cyan-300/40 text-cyan-200' },
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

  const defaultMsg = `Hola ${trip.driver_name}! Vi tu viaje de ${directionText} a ${destName} en Quempo para el ${trip.departure_date}. ¿Aún tienes cupo disponible?`;
  const encodedMsg = encodeURIComponent(defaultMsg);

  const cleanPhone = trip.whatsapp_number.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  const [copied, setCopied] = useState(false);

  const handleShareWhatsAppGroup = async () => {
    if (typeof window === 'undefined') return;
    const shareUrl = `${window.location.origin}/v/${trip.id}`;
    const shareText = `🏔️ *¡Viaje a la cordillera en Quempo!*\n\n🚗 *Ruta:* ${trip.origin} ➔ ${destName}\n📅 *Fecha:* ${trip.departure_date}\n🕒 *Hora:* ${trip.departure_time.slice(0, 5)} hrs\n💺 *Cupos:* ${trip.seats_available} asientos disponibles\n💰 *Aporte:* ${formattedPrice} CLP\n\n👉 *Ver detalles y coordinar:* ${shareUrl}`;

    try {
      await navigator.clipboard.writeText(shareText);
    } catch (e) {
      console.error('Error copying text:', e);
    }

    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank');
  };

  const handleShareLink = async () => {
    if (typeof window === 'undefined') return;
    const shareUrl = `${window.location.origin}/v/${trip.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy link to clipboard:', err);
    }
  };

  const handleDownloadStory = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 1920);
    grad.addColorStop(0, '#0B1E31');
    grad.addColorStop(1, '#091a2c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1920);

    // Mountain vectors at the bottom
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.moveTo(0, 1920);
    ctx.lineTo(0, 1500);
    ctx.quadraticCurveTo(270, 1380, 540, 1550);
    ctx.quadraticCurveTo(810, 1720, 1080, 1450);
    ctx.lineTo(1080, 1920);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.beginPath();
    ctx.moveTo(0, 1920);
    ctx.lineTo(0, 1650);
    ctx.quadraticCurveTo(300, 1500, 600, 1700);
    ctx.quadraticCurveTo(900, 1900, 1080, 1600);
    ctx.lineTo(1080, 1920);
    ctx.closePath();
    ctx.fill();

    // Snowflakes
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    const drawSnowflake = (x: number, y: number, r: number) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };
    drawSnowflake(150, 300, 8);
    drawSnowflake(900, 450, 12);
    drawSnowflake(300, 1200, 10);
    drawSnowflake(800, 1400, 6);
    drawSnowflake(200, 800, 5);

    // Brand logo / text
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 48px sans-serif';
    ctx.fillText('Q U E M P O', 540, 220);

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('COMPARTIR AUTO A LA MONTAÑA', 540, 270);

    // Hero title badge
    const badgeText = trip.direction === 'SUBIDA' ? 'SUBIDA A LA CUMBRE ⬆️' : 'BAJADA A SANTIAGO ⬇️';
    ctx.font = 'bold 36px sans-serif';
    const textWidth = ctx.measureText(badgeText).width;
    
    ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 4;
    const badgeWidth = textWidth + 80;
    const badgeHeight = 80;
    const badgeX = 540 - badgeWidth / 2;
    const badgeY = 380;
    
    ctx.beginPath();
    ctx.roundRect?.(badgeX, badgeY, badgeWidth, badgeHeight, 40);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38BDF8';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, 540, badgeY + badgeHeight / 2);
    ctx.textBaseline = 'alphabetic'; // reset

    // Trip details card box (glassmorphic box)
    const boxX = 100;
    const boxY = 540;
    const boxW = 880;
    const boxH = 920;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect?.(boxX, boxY, boxW, boxH, 48);
    ctx.fill();
    ctx.stroke();

    // Draw route inside card box
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText('RUTA DE VIAJE', boxX + 60, boxY + 100);

    // Origin ➔ Destination
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 64px sans-serif';
    const originDest = `${trip.origin} ➔ ${destName}`;
    ctx.fillText(originDest, boxX + 60, boxY + 190);

    // Underline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.moveTo(boxX + 60, boxY + 250);
    ctx.lineTo(boxX + boxW - 60, boxY + 250);
    ctx.stroke();

    // Date
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText('FECHA Y HORA', boxX + 60, boxY + 330);

    // Date value
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 48px sans-serif';
    ctx.fillText(`📅 ${trip.departure_date}`, boxX + 60, boxY + 410);
    ctx.fillText(`🕒 ${trip.departure_time.slice(0, 5)} hrs`, boxX + 60, boxY + 480);

    // Divider
    ctx.beginPath();
    ctx.moveTo(boxX + 60, boxY + 540);
    ctx.lineTo(boxX + boxW - 60, boxY + 540);
    ctx.stroke();

    // Seats & Cost
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText('DETALLES DE RESERVA', boxX + 60, boxY + 620);

    // Seats and cost text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText(`💺 ${trip.seats_available} asientos libres`, boxX + 60, boxY + 700);

    ctx.fillStyle = '#38BDF8';
    ctx.font = '900 56px sans-serif';
    ctx.fillText(`💰 Aporte: ${formattedPrice} CLP`, boxX + 60, boxY + 790);

    // Draw Footer Promo block
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText('¿Quieres coordinar o reservar un asiento?', 540, boxY + boxH + 110);

    ctx.fillStyle = '#38BDF8';
    ctx.font = '900 48px sans-serif';
    ctx.fillText('Entra en quempo.cl', 540, boxY + boxH + 190);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('Busca y coordina directo por WhatsApp', 540, boxY + boxH + 250);

    // Trigger PNG file download
    const link = document.createElement('a');
    link.download = `quempo-viaje-${trip.origin.slice(0, 10)}-${destName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex items-center justify-center p-3 sm:p-4 animate-fadeIn ${
        isTourActive ? 'z-[210] bg-transparent pointer-events-none' : 'z-50 bg-slate-950/70 backdrop-blur-md'
      }`}
    >
      <div
        data-tour="trip-detail-modal"
        className="glass-card w-full max-w-lg rounded-3xl overflow-hidden relative flex flex-col text-white pointer-events-auto shadow-2xl border border-white/30 max-h-[82vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-white/20 flex items-center justify-between bg-white/10 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${DIRECTION_BADGES[trip.direction]?.color}`}>
              {DIRECTION_BADGES[trip.direction]?.label}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition cursor-pointer border border-white/20"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto custom-scrollbar flex-1">
          {/* Driver Card Info */}
          <div className="relative z-20 flex flex-col gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserAvatar
                  src={trip.driver_avatar}
                  name={trip.driver_name}
                  size="lg"
                />
                <div>
                  <h3 className="font-black text-sm sm:text-base text-white flex items-center gap-1.5 flex-wrap drop-shadow-xs">
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
                          className="p-1 rounded-full bg-white/20 hover:bg-white text-sky-200 hover:text-[#0F2942] border border-white/30 transition flex items-center justify-center cursor-pointer"
                          title={`@${trip.instagram_handle} en Instagram`}
                        >
                          <InstagramIcon className="w-3.5 h-3.5" />
                        </a>

                        {/* Hover Card Preview */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:flex flex-col items-center bg-[#0F2942] border border-sky-300/40 p-3 rounded-2xl shadow-2xl z-50 min-w-[210px] text-center animate-fadeIn pointer-events-none group-hover:pointer-events-auto">
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0F2942] border-t border-l border-sky-300/40 rotate-45"></div>

                          <div className="flex items-center gap-2 mb-2 w-full text-left">
                            <div className="p-2 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shrink-0">
                              <InstagramIcon className="w-4 h-4" />
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-xs font-bold text-white truncate">@{trip.instagram_handle}</p>
                              <p className="text-[10px] text-sky-200">Perfil de Instagram</p>
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

                  {/* Rating & Conductor Verificado */}
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-sky-200 flex items-center gap-1 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#38BDF8] inline-block animate-pulse"></span>
                      Conductor Verificado
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-base sm:text-lg font-black text-white">{formattedPrice}</div>
                <div className="text-[10px] text-sky-200 uppercase tracking-wider font-extrabold">por cupo</div>
              </div>
            </div>
          </div>
          {/* Route Box */}
          <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 space-y-3 shadow-xs">
            <div className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#38BDF8]" /> Detalles de la Ruta
            </div>

            <div className="flex items-center justify-between gap-2 bg-white/10 p-3 rounded-xl border border-white/20 text-xs">
              <div>
                <span className="text-[10px] text-sky-200 uppercase block font-semibold">Origen</span>
                <span className="font-extrabold text-white text-sm">{trip.origin}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
              <div className="text-right">
                <span className="text-[10px] text-sky-200 uppercase block font-semibold">Destino</span>
                <span className="font-black text-white text-sm">{destName}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="bg-white/10 p-2.5 rounded-xl border border-white/20 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#38BDF8]" />
                <div>
                  <span className="text-[9px] text-sky-200 block font-semibold">Fecha</span>
                  <span className="font-extrabold text-white">{trip.departure_date}</span>
                </div>
              </div>

              <div className="bg-white/10 p-2.5 rounded-xl border border-white/20 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#38BDF8]" />
                <div>
                  <span className="text-[9px] text-sky-200 block font-semibold">Hora Salida</span>
                  <span className="font-black text-white">{trip.departure_time.slice(0, 5)} hrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seats & Equipment */}
          <div className="space-y-2">
            <div className="text-xs font-black text-white uppercase tracking-wider flex items-center justify-between">
              <span>Equipamiento de Montaña</span>
              <span className="text-sky-200 text-xs font-extrabold flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#38BDF8]" /> {trip.seats_available} cupo{trip.seats_available > 1 ? 's' : ''} libre{trip.seats_available > 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className={`p-2.5 rounded-xl border ${trip.has_4x4 ? 'bg-sky-400/25 border-[#38BDF8] text-white font-black' : 'bg-white/5 border-white/10 text-slate-400 opacity-60'}`}>
                <Car className="w-4 h-4 mx-auto mb-1 text-[#38BDF8]" />
                <span className="text-[10px] font-extrabold block">🚙 4x4 / AWD</span>
                <span className="text-[9px] font-medium">{trip.has_4x4 ? 'Sí incluye' : 'No'}</span>
              </div>

              <div className={`p-2.5 rounded-xl border ${trip.has_chains ? 'bg-sky-400/25 border-[#38BDF8] text-white font-black' : 'bg-white/5 border-white/10 text-slate-400 opacity-60'}`}>
                <span className="text-base block mb-0.5">⛓️</span>
                <span className="text-[10px] font-extrabold block">Cadenas</span>
                <span className="text-[9px] font-medium">{trip.has_chains ? 'Sí lleva' : 'No'}</span>
              </div>

              <div className={`p-2.5 rounded-xl border ${trip.has_rack ? 'bg-sky-400/25 border-[#38BDF8] text-white font-black' : 'bg-white/5 border-white/10 text-slate-400 opacity-60'}`}>
                <span className="text-base block mb-0.5">🎿</span>
                <span className="text-[10px] font-extrabold block">Porta-ski</span>
                <span className="text-[9px] font-medium">{trip.has_rack ? 'Sí tiene' : 'No'}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {trip.notes && (
            <div className="space-y-1">
              <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">Comentarios del Conductor</span>
              <div className="bg-white/10 p-3 rounded-2xl border border-white/20 text-xs text-slate-100 leading-relaxed italic font-medium">
                &quot;{trip.notes}&quot;
              </div>
            </div>
          )}

          {/* Share & Promote Actions */}
          <div className="bg-white/10 p-3.5 sm:p-4 rounded-2xl border border-white/20 space-y-2.5">
            <span className="text-xs font-black text-white uppercase tracking-wider block">
              📢 Compartir & Difundir Viaje
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={handleShareWhatsAppGroup}
                className="py-2.5 px-3 rounded-xl bg-emerald-500/25 hover:bg-emerald-500/35 border border-emerald-400/40 text-xs font-bold text-emerald-100 transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                <span>En Grupo WhatsApp</span>
              </button>
              <button
                onClick={handleShareLink}
                className="py-2.5 px-3 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-bold text-white transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-sky-300" />}
                <span>{copied ? '¡Copiado!' : 'Copiar Link'}</span>
              </button>
              <button
                onClick={handleDownloadStory}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-rose-500/20 hover:from-purple-500/35 hover:to-rose-500/35 border border-purple-400/40 hover:border-rose-400/40 text-xs font-bold text-white transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <InstagramIcon className="w-4 h-4 text-rose-300" />
                <span>Story 9:16</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 border-t border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-between gap-3 shrink-0">
          {isOwner ? (
            <button
              onClick={() => {
                onDeleteTrip(trip.id);
                onClose();
              }}
              className="px-4 py-3 rounded-xl text-rose-300 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 transition text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Eliminar</span>
            </button>
          ) : (
            <span className="text-[10px] text-sky-200 font-bold">Coordinación 100% directa P2P</span>
          )}

          <a
            data-tour="whatsapp-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#38BDF8] hover:bg-[#0284C7] text-[#0F2942] hover:text-white font-black text-sm py-3.5 px-5 rounded-2xl shadow-md border border-white/40 active:scale-95 transition-all duration-200 cursor-pointer group"
          >
            <MessageCircle className="w-4 h-4 fill-[#0F2942] group-hover:fill-white text-[#38BDF8] group-hover:text-[#0284C7] transition-colors" />
            <span>Contactar por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
