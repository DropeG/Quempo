'use client';

import { useState, useEffect, useMemo, useRef, TouchEvent } from 'react';
import { ChevronLeft, ChevronRight, X, Sparkles, CheckCircle2, MessageCircle, PlusCircle } from 'lucide-react';

export interface TourStep {
  targetAttr: string;
  title: string;
  description: string;
  icon: string;
  badgeText?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    targetAttr: 'direction-switch',
    title: '1. Sentido del Viaje (Subida ⬆️ / Bajada ⬇️)',
    description: 'Elige si buscas o publicas viajes para subir a los centros de ski (Santiago ➔ Cordillera) o bajar a la ciudad.',
    icon: '📍',
    badgeText: 'Filtro Principal',
  },
  {
    targetAttr: 'date-filters',
    title: '2. Filtros Rápidos de Fecha 📅',
    description: 'Filtra inmediatamente viajes para Hoy ⚡, Mañana ☀️, o el Fin de Semana 🏂 sin vueltas.',
    icon: '📅',
    badgeText: '1-Tap Filter',
  },
  {
    targetAttr: 'trip-card',
    title: '3. Detalles del Viaje 🚙',
    description: 'Toca cualquier tarjeta en el Home para ver equipamiento de montaña (4x4, Cadenas ⛓️, Porta-skis 🎿).',
    icon: '🚙',
    badgeText: 'Equipamiento',
  },
  {
    targetAttr: 'trip-card',
    title: '4. Conexión Directa por WhatsApp 💬',
    description: 'Coordinación 100% directa P2P a $0 comisión. El mensaje se abre pre-llenado listo para enviar al conductor.',
    icon: '💬',
    badgeText: '$0 Comisión',
  },
  {
    targetAttr: 'publish-btn',
    title: '5. Publica tu Viaje (Conductores) 🚘',
    description: '¿Conduces a la nieve? Publica tus asientos libres en 30 segundos y comparte gastos de combustible con la comunidad.',
    icon: '✨',
    badgeText: 'Para Conductores',
  },
  {
    targetAttr: 'user-profile',
    title: '6. Mi Perfil & Redes 📸',
    description: 'Conecta tu cuenta de Instagram para mayor confianza y gestiona tus publicaciones desde tu perfil.',
    icon: '👤',
    badgeText: 'Verificación',
  },
];

interface SpotlightTourOverlayProps {
  isActive: boolean;
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  onFinish: () => void;
  isCompleted: boolean;
  onCloseCompleted: () => void;
  onStepChange?: (stepIndex: number) => void;
}

export default function SpotlightTourOverlay({
  isActive,
  currentStep,
  onNext,
  onPrev,
  onSkip,
  onFinish,
  isCompleted,
  onCloseCompleted,
  onStepChange,
}: SpotlightTourOverlayProps) {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    if (isActive && onStepChange) {
      onStepChange(currentStep);
    }
  }, [isActive, currentStep, onStepChange]);

  const step = useMemo(() => TOUR_STEPS[currentStep] || TOUR_STEPS[0], [currentStep]);

  // Smooth Scroll ONCE per step & Throttled Rect Tracking
  useEffect(() => {
    if (!isActive || !step) return;

    let timer: NodeJS.Timeout;
    let animFrameId: number;

    const el = document.querySelector(`[data-tour="${step.targetAttr}"]`);
    if (el) {
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetTop = rect.top + scrollTop - 85;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      });

      const updateTargetRect = () => {
        const freshRect = el.getBoundingClientRect();
        setTargetRect(freshRect);
      };

      updateTargetRect();
      timer = setTimeout(updateTargetRect, 350);

      const handlePassiveScrollOrResize = () => {
        cancelAnimationFrame(animFrameId);
        animFrameId = requestAnimationFrame(() => {
          setTargetRect(el.getBoundingClientRect());
        });
      };

      window.addEventListener('scroll', handlePassiveScrollOrResize, { passive: true });
      window.addEventListener('resize', handlePassiveScrollOrResize, { passive: true });

      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(animFrameId);
        window.removeEventListener('scroll', handlePassiveScrollOrResize);
        window.removeEventListener('resize', handlePassiveScrollOrResize);
      };
    } else {
      setTargetRect(null);
    }
  }, [isActive, step]);

  // Touch Swipe Gesture Handlers for Mobile
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      if (currentStep < TOUR_STEPS.length - 1) onNext();
      else onFinish();
    } else if (isRightSwipe && currentStep > 0) {
      onPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (isCompleted) {
    return (
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
        <div className="glass-card w-full max-w-sm rounded-3xl border border-white/30 shadow-2xl text-white p-6 text-center space-y-5 animate-zoomIn">
          <div className="w-16 h-16 rounded-2xl bg-sky-400/20 text-[#38BDF8] border border-sky-300/40 flex items-center justify-center mx-auto shadow-md backdrop-blur-xs">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xl font-black text-white drop-shadow-xs">¡Todo listo para la nieve! ⛷️</h3>
            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              Ya conoces las funciones principales de Quempo en tu celular. ¡Nos vemos en la cordillera!
            </p>
          </div>
          <button
            onClick={onCloseCompleted}
            className="w-full h-12 bg-[#38BDF8] hover:bg-[#0284C7] active:scale-98 text-[#0F2942] hover:text-white font-black text-sm px-4 rounded-2xl shadow-lg transition-all duration-200 cursor-pointer border border-white/40 flex items-center justify-center"
          >
            Explorar Rutas
          </button>
        </div>
      </div>
    );
  }

  if (!isActive || !step) return null;

  const isLastStep = currentStep === TOUR_STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden h-[100dvh] w-full">
      {/* Background Dimmed Overlay with Spotlight Cutout */}
      {targetRect ? (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 will-change-transform">
          <defs>
            <mask id="spotlight-mask-mobile">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect
                x={targetRect.left - 6}
                y={targetRect.top - 6}
                width={targetRect.width + 12}
                height={targetRect.height + 12}
                rx="16"
                fill="black"
              />
            </mask>
          </defs>

          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(9, 26, 44, 0.78)"
            mask="url(#spotlight-mask-mobile)"
          />

          <rect
            x={targetRect.left - 6}
            y={targetRect.top - 6}
            width={targetRect.width + 12}
            height={targetRect.height + 12}
            rx="16"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3"
            className="animate-pulse"
          />
        </svg>
      ) : (
        <div className="absolute inset-0 bg-[#0F2942]/75 backdrop-blur-xs pointer-events-none" />
      )}

      {/* FLOATING OVERLAY GLASS CARD (Thumb Zone) */}
      <div
        className="fixed bottom-3 inset-x-0 z-[300] p-3 sm:p-4 w-[94%] max-w-md mx-auto pointer-events-auto pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="glass-card rounded-3xl p-4 sm:p-5 border border-white/40 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-white space-y-3.5 relative bg-[#0F2942]/95 backdrop-blur-2xl animate-slideUp">
          {/* Top Drag Indicator Line */}
          <div className="w-12 h-1 bg-white/30 rounded-full mx-auto -mt-1 mb-1" />

          {/* Header Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{step.icon}</span>
              {step.badgeText && (
                <span className="text-[10px] font-black text-[#0F2942] bg-[#38BDF8] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {step.badgeText}
                </span>
              )}
            </div>
            <button
              onClick={onSkip}
              className="min-h-[44px] min-w-[44px] text-xs font-extrabold text-slate-300 hover:text-white transition cursor-pointer flex items-center justify-center gap-1.5 bg-white/10 active:bg-white/20 px-3 py-1.5 rounded-full border border-white/20"
              aria-label="Omitir tutorial"
            >
              <span>Omitir</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="space-y-1.5">
            <h4 className="text-base sm:text-lg font-black text-white drop-shadow-xs">{step.title}</h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">{step.description}</p>
          </div>

          {/* Option 1: Interactive Mini-Demo for Step 4 (WhatsApp Direct) */}
          {currentStep === 3 && (
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-2 text-xs animate-fadeIn">
              <div className="flex items-center justify-between font-bold text-sky-200">
                <span>🏔️ Farellones / Valle Nevado</span>
                <span className="text-[10px] bg-sky-400/20 text-[#38BDF8] px-2 py-0.5 rounded-full border border-sky-300/40 font-black">⚡ $0 Comisión</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-200 font-medium">
                <span>✅ 4x4</span>
                <span>•</span>
                <span>⛓️ Cadenas</span>
                <span>•</span>
                <span>🎿 Porta-Skis</span>
              </div>
              <div className="w-full py-2 px-3 rounded-xl bg-[#38BDF8] text-[#0F2942] font-black text-center text-xs flex items-center justify-center gap-1.5 shadow-sm">
                <MessageCircle className="w-3.5 h-3.5 fill-[#0F2942]" />
                <span>Contactar Conductor por WhatsApp</span>
              </div>
            </div>
          )}

          {/* Option 1: Interactive Mini-Demo for Step 5 (Driver Publish) */}
          {currentStep === 4 && (
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-2 text-xs animate-fadeIn">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-1.5 font-black">
                  <PlusCircle className="w-3.5 h-3.5 text-[#38BDF8]" /> Publica tu Viaje
                </span>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-300/40 font-extrabold">Publica en 30s</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-200 font-medium">
                <div className="p-2 rounded-xl bg-white/10 border border-white/10">📍 Santiago ➔ Cordillera</div>
                <div className="p-2 rounded-xl bg-white/10 border border-white/10">💺 3 Asientos Libres</div>
              </div>
              <p className="text-[10px] text-sky-200 font-medium">Comparte gastos de combustible directamente con otros esquiadores.</p>
            </div>
          )}

          {/* Footer Navigation & Touch Controls */}
          <div className="flex items-center justify-between pt-3 border-t border-white/20">
            {/* Progress Counter & Dots */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-sky-300">
                {currentStep + 1}/{TOUR_STEPS.length}
              </span>
              <div className="flex items-center gap-1">
                {TOUR_STEPS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentStep
                        ? 'w-5 bg-[#38BDF8]'
                        : idx < currentStep
                        ? 'w-2 bg-[#38BDF8]/60'
                        : 'w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Prev / Next Touch Buttons (Min 48px height) */}
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={onPrev}
                  className="min-h-[48px] min-w-[48px] rounded-2xl bg-white/10 text-slate-200 hover:text-white active:bg-white/20 active:scale-95 border border-white/20 transition cursor-pointer flex items-center justify-center"
                  title="Anterior"
                  aria-label="Paso anterior"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>
              )}

              {isLastStep ? (
                <button
                  onClick={onFinish}
                  className="min-h-[48px] px-5 inline-flex items-center justify-center gap-2 bg-[#38BDF8] hover:bg-[#0284C7] active:scale-95 text-[#0F2942] hover:text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all duration-200 cursor-pointer border border-white/40"
                >
                  <span>Finalizar</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onNext}
                  className="min-h-[48px] px-5 inline-flex items-center justify-center gap-2 bg-[#38BDF8] hover:bg-[#0284C7] active:scale-95 text-[#0F2942] hover:text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all duration-200 cursor-pointer border border-white/40"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
