'use client';

import { useState, useEffect, useRef } from 'react';
import { Trip } from '@/types/trip';
import { X, Sparkles, MessageCircle, ExternalLink, Check, Share2, MapPin, Calendar, Clock, Users } from 'lucide-react';

interface PublishSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip | null;
  whatsappGroupUrl?: string;
}

const DESTINATION_NAMES: Record<string, string> = {
  FARELLONES: 'Farellones',
  EL_COLORADO: 'El Colorado',
  LA_PARVA: 'La Parva',
  VALLE_NEVADO: 'Valle Nevado',
};

// Default Official WhatsApp Group link for Quempo community
const DEFAULT_WHATSAPP_GROUP_URL = process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL || 'https://chat.whatsapp.com/HSYkGEhRxGgCpPsd6S4Rid';

export default function PublishSuccessModal({
  isOpen,
  onClose,
  trip,
  whatsappGroupUrl = DEFAULT_WHATSAPP_GROUP_URL,
}: PublishSuccessModalProps) {
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Keyboard controls: Escape to close & Tab focus trap
  useEffect(() => {
    if (!isOpen) return;

    const focusables = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables && focusables.length > 0) {
      focusables[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const currentFocusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!currentFocusables || currentFocusables.length === 0) return;
        const first = currentFocusables[0];
        const last = currentFocusables[currentFocusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !trip) return null;

  const destName = DESTINATION_NAMES[trip.destination] || trip.destination;
  const isBajada = trip.direction === 'BAJADA';
  const originText = isBajada ? destName : trip.origin;
  const destinationText = isBajada ? trip.origin : destName;
  const routeString = `${originText} ➔ ${destinationText}`;

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(Number(trip.price_per_seat) || 0);

  const getShareUrl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const baseUrl = (origin && !origin.includes('localhost') && !origin.includes('127.0.0.1'))
      ? origin
      : (process.env.NEXT_PUBLIC_APP_URL || 'https://quempo.tech');
    return `${baseUrl}/v/${trip.id}`;
  };

  const handleCopyLink = async () => {
    if (typeof window === 'undefined') return;
    const shareUrl = getShareUrl();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShareToGroup = async () => {
    if (typeof window === 'undefined') return;
    const shareUrl = getShareUrl();
    const formattedTime = (trip.departure_time || '07:00').slice(0, 5);
    const directionEmoji = isBajada ? '⬇️' : '⬆️';
    const shareText = `🏔️ *¡Viaje disponible a la cordillera en Quempo!*\n\n${directionEmoji} *Ruta:* ${routeString}\n📅 *Fecha:* ${trip.departure_date}\n🕒 *Hora:* ${formattedTime} hrs\n💺 *Cupos:* ${trip.seats_available} asientos libres\n💰 *Aporte:* ${formattedPrice} CLP\n\n👉 *Ver viaje y coordinar:* ${shareUrl}`;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareText);
      }
    } catch (e) {
      console.error('Error copying share text:', e);
    }

    // Standard WhatsApp share endpoint that pre-fills the message text for any group/chat
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[230] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="publish-success-modal-title"
        className="glass-card w-full max-w-md rounded-3xl overflow-hidden relative shadow-2xl border border-white/30 text-white p-5 sm:p-6 space-y-4 max-h-[90vh] flex flex-col pointer-events-auto"
      >
        {/* Header with celebration theme */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-sky-400/20 border border-sky-300/40 text-[#38BDF8] shadow-xs">
              <Sparkles className="w-6 h-6 text-[#38BDF8] drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" aria-hidden="true" />
            </div>
            <div>
              <h2 id="publish-success-modal-title" className="text-base sm:text-lg font-black text-white flex items-center gap-1.5 drop-shadow-xs">
                ¡Viaje Publicado con Éxito! 🎉
              </h2>
              <p className="text-xs text-sky-200 font-medium">
                Tu publicación ya está visible en Quempo.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal de éxito"
            className="p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition cursor-pointer border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable body content */}
        <div className="space-y-3.5 overflow-y-auto custom-scrollbar flex-1 pr-1">
          {/* Trip Summary Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 space-y-2">
            <div className="flex items-center justify-between text-xs font-black text-white">
              <span className="flex items-center gap-1.5 truncate mr-2" title={routeString}>
                <MapPin className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" aria-hidden="true" />
                <span className="truncate">{routeString}</span>
              </span>
              <span className="text-sky-300 text-xs font-black shrink-0">{formattedPrice}</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-200 font-semibold pt-1.5 border-t border-white/10 flex-wrap sm:flex-nowrap">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-sky-300 shrink-0" aria-hidden="true" /> {trip.departure_date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-300 shrink-0" aria-hidden="true" /> {(trip.departure_time || '07:00').slice(0, 5)} hrs
              </span>
              <span className="flex items-center gap-1 sm:ml-auto text-sky-200 font-bold">
                <Users className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" aria-hidden="true" /> {trip.seats_available} cupos
              </span>
            </div>
          </div>

          {/* Promotion / WhatsApp Section */}
          <div className="bg-gradient-to-br from-emerald-500/15 via-sky-500/10 to-transparent p-4 rounded-2xl border border-emerald-400/30 space-y-3">
            <div>
              <h3 className="text-xs font-black text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
                📢 Consigue Pasajeros en la Comunidad
              </h3>
              <p className="text-xs text-slate-200 mt-1 font-medium leading-relaxed">
                Difunde tu viaje directamente en el Grupo Oficial de WhatsApp para llenar tus cupos más rápido.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {/* Step 1: Join Group if not in it */}
              <a
                href={whatsappGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-3.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-400/40 text-emerald-100 text-xs font-bold transition flex items-center justify-between cursor-pointer group active:scale-95 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping motion-reduce:animate-none" aria-hidden="true"></span>
                  <span>1. Unirme al Grupo Oficial de WhatsApp</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-300 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </a>

              {/* Step 2: Share formatted message to Group */}
              <button
                onClick={handleShareToGroup}
                className="w-full py-3 px-3.5 rounded-xl bg-[#38BDF8] hover:bg-[#0284C7] text-[#0F2942] hover:text-white font-black text-xs transition flex items-center justify-between cursor-pointer active:scale-95 shadow-md border border-white/40 group focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 fill-[#0F2942] text-[#38BDF8] group-hover:fill-white transition-colors" aria-hidden="true" />
                  <span>2. Difundir mi Viaje en WhatsApp</span>
                </div>
                <Share2 className="w-3.5 h-3.5 text-[#0F2942] group-hover:text-white transition-colors" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Quick Copy Link Option */}
          <button
            onClick={handleCopyLink}
            className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-slate-200 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" /> : <Share2 className="w-4 h-4 text-sky-300" aria-hidden="true" />}
            <span>{copied ? '¡Enlace copiado al portapapeles!' : 'Copiar Enlace del Viaje'}</span>
          </button>
        </div>

        {/* Footer Action */}
        <div className="pt-2 border-t border-white/15">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition cursor-pointer border border-white/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          >
            Continuar al Home
          </button>
        </div>
      </div>
    </div>
  );
}

