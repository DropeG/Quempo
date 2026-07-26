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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0e292b]/80 backdrop-blur-md animate-fadeIn">
      <div
        className="glass-card w-full max-w-md rounded-3xl border border-[#2a575a] shadow-2xl overflow-hidden relative bg-[#163F41] text-[#EFEEEC] p-6 space-y-6 text-center animate-zoomIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button (Fast Skip) */}
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#0e292b]/80 hover:bg-[#0e292b] text-[#6B8B86] hover:text-[#F0CDC4] border border-[#2a575a] transition cursor-pointer"
          title="Omitir tutorial"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#DAAF9E]/20 via-[#DAAF9E]/30 to-[#F0CDC4]/20 border border-[#DAAF9E]/40 flex items-center justify-center shadow-lg relative group">
          <Mountain className="w-8 h-8 text-[#DAAF9E] stroke-[2.5]" />
          <Sparkles className="w-4 h-4 text-[#F0CDC4] absolute -top-1 -right-1 animate-pulse" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <span className="text-[11px] font-extrabold text-[#DAAF9E] uppercase tracking-widest bg-[#DAAF9E]/15 px-3 py-1 rounded-full border border-[#DAAF9E]/30 inline-flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#DAAF9E] fill-[#DAAF9E]" /> Tu primera vez en Faredeo
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#EFEEEC] leading-snug">
            {firstName ? `¡Hola, ${firstName}! 🏔️` : '¡Bienvenido a la Montaña! 🏔️'}
          </h2>
          <p className="text-xs sm:text-sm text-[#F0CDC4] leading-relaxed max-w-xs mx-auto">
            ¿Te gustaría ver un recorrido ultra-rápido de <strong className="text-[#DAAF9E]">45 segundos</strong> para aprovechar todas las funciones de la app?
          </p>
        </div>

        {/* Feature Highlights Badges */}
        <div className="grid grid-cols-3 gap-2 text-[10px] font-bold text-[#F0CDC4]">
          <div className="p-2 rounded-xl bg-[#0e292b] border border-[#2a575a] space-y-1">
            <span className="text-sm block">⬆️⬇️</span>
            <span>Subida / Bajada</span>
          </div>
          <div className="p-2 rounded-xl bg-[#0e292b] border border-[#2a575a] space-y-1">
            <span className="text-sm block">💬</span>
            <span>WhatsApp $0</span>
          </div>
          <div className="p-2 rounded-xl bg-[#0e292b] border border-[#2a575a] space-y-1">
            <span className="text-sm block">🚙</span>
            <span>4x4 & Equipamiento</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Primary CTA */}
          <button
            onClick={onStartTour}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#DAAF9E] hover:bg-[#C79987] text-[#163F41] font-black text-sm py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-[#DAAF9E]/20 transition-all cursor-pointer group active:scale-95"
          >
            <span>Ver Tour Express (45s)</span>
            <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Attractive & Frictionless Skip Button */}
          <button
            onClick={onSkip}
            className="w-full text-xs font-semibold text-[#6B8B86] hover:text-[#DAAF9E] py-2 px-4 rounded-xl hover:bg-[#0e292b]/60 transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Ir directo a la app (Omitir)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
