'use client';

import { Mountain, Sparkles, X, ArrowRight, Zap } from 'lucide-react';

interface OnboardingWelcomeModalProps {
  isOpen: boolean;
  onStartTour: () => void;
  onSkip: () => void;
  userName?: string;
}

export default function OnboardingWelcomeModal({
  isOpen,
  onStartTour,
  onSkip,
  userName,
}: OnboardingWelcomeModalProps) {
  if (!isOpen) return null;

  const firstName = userName ? userName.split(' ')[0] : '';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div
        className="glass-card w-full max-w-md rounded-3xl border border-white/30 shadow-2xl overflow-hidden relative text-white p-6 sm:p-7 space-y-6 text-center animate-zoomIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button (Fast Skip) */}
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/20 transition cursor-pointer"
          title="Omitir tutorial"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-sky-400/20 border border-white/30 flex items-center justify-center shadow-lg relative group backdrop-blur-xs">
          <Mountain className="w-8 h-8 text-[#38BDF8] stroke-[2.5]" />
          <Sparkles className="w-4 h-4 text-sky-200 absolute -top-1 -right-1 animate-pulse" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <span className="text-[11px] font-black text-sky-200 uppercase tracking-widest bg-sky-400/20 px-3 py-1 rounded-full border border-sky-300/40 inline-flex items-center gap-1.5 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-[#38BDF8] fill-[#38BDF8]" /> Tu primera vez en Faredeo
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug drop-shadow-xs">
            {firstName ? `¡Hola, ${firstName}! 🏔️` : '¡Bienvenido a la Montaña! 🏔️'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xs mx-auto font-medium">
            ¿Te gustaría ver un recorrido ultra-rápido de <strong className="text-[#38BDF8] font-black">45 segundos</strong> para aprovechar todas las funciones de la app?
          </p>
        </div>

        {/* Feature Highlights Badges */}
        <div className="grid grid-cols-3 gap-2.5 text-[10px] font-extrabold text-white">
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1 shadow-xs">
            <span className="text-sm block">⬆️⬇️</span>
            <span>Subida / Bajada</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1 shadow-xs">
            <span className="text-sm block">💬</span>
            <span>WhatsApp $0</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1 shadow-xs">
            <span className="text-sm block">🚙</span>
            <span>4x4 & Equipamiento</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-1">
          {/* Primary CTA */}
          <button
            onClick={onStartTour}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#38BDF8] hover:bg-[#0284C7] text-[#0F2942] hover:text-white font-black text-sm py-3.5 px-6 rounded-2xl shadow-md transition-all duration-200 cursor-pointer group active:scale-95 border border-white/40"
          >
            <span>Ver Tour Express (45s)</span>
            <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Frictionless Skip Button */}
          <button
            onClick={onSkip}
            className="w-full text-xs font-bold text-slate-300 hover:text-white py-2 px-4 rounded-xl hover:bg-white/10 transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Ir directo a la app (Omitir)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
