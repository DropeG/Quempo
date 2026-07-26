'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

export interface TourStep {
  targetAttr: string;
  title: string;
  description: string;
  icon: string;
  badgeText?: string;
  isModalStep?: boolean;
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
    description: 'Toca una tarjeta para desplegar el viaje y revisar tracción 4x4, Cadenas ⛓️ y Porta-skis 🎿.',
    icon: '🚙',
    badgeText: 'Equipamiento',
  },
  {
    targetAttr: 'whatsapp-btn',
    title: '4. Conexión Directa por WhatsApp 💬',
    description: 'Coordinación 100% directa P2P a $0 comisión. El mensaje se abre pre-llenado listo para enviar al conductor.',
    icon: '💬',
    badgeText: '$0 Comisión',
    isModalStep: true,
  },
  {
    targetAttr: 'publish-modal-content',
    title: '5. Publica tu Viaje (Conductores) 🚘',
    description: '¿Conduces a la nieve? Publica tus asientos libres en 30 segundos y comparte gastos de bencina y peajes.',
    icon: '✨',
    badgeText: 'Para Conductores',
    isModalStep: true,
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

  useEffect(() => {
    if (isActive && onStepChange) {
      onStepChange(currentStep);
    }
  }, [isActive, currentStep, onStepChange]);

  const step = useMemo(() => TOUR_STEPS[currentStep] || TOUR_STEPS[0], [currentStep]);
  const isModalStep = Boolean(step?.isModalStep);

  const cardStyle = useMemo<React.CSSProperties>(() => {
    if (isModalStep) {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        return {
          position: 'fixed',
          top: '50%',
          right: '2rem',
          transform: 'translateY(-50%)',
        };
      }
      return {
        position: 'fixed',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
      };
    }

    if (targetRect) {
      const spaceBelow = window.innerHeight - targetRect.bottom;
      const topPos = spaceBelow < 220 ? Math.max(16, targetRect.top - 210) : targetRect.bottom + 16;
      return {
        position: 'fixed',
        top: `${topPos}px`,
        left: '50%',
        transform: 'translateX(-50%)',
      };
    }

    return {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  }, [isModalStep, targetRect]);

  useEffect(() => {
    if (!isActive || !step) return;

    let timer: NodeJS.Timeout;
    const handleUpdate = () => {
      const el = document.querySelector(`[data-tour="${step.targetAttr}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        timer = setTimeout(() => {
          setTargetRect(el.getBoundingClientRect());
        }, 250);
      } else {
        setTargetRect(null);
      }
    };

    const animationFrameId = requestAnimationFrame(handleUpdate);
    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate);
    };
  }, [isActive, step]);

  if (isCompleted) {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#0e292b]/85 backdrop-blur-md animate-fadeIn">
        <div className="glass-card w-full max-w-sm rounded-3xl border border-[#2a575a] shadow-2xl bg-[#163F41] text-[#EFEEEC] p-6 text-center space-y-5 animate-zoomIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xl font-black text-white">¡Todo listo para la nieve! ⛷️</h3>
            <p className="text-xs text-[#F0CDC4]">
              Ya conoces las herramientas clave de Faredeo. ¡Nos vemos en la cordillera!
            </p>
          </div>
          <button
            onClick={onCloseCompleted}
            className="w-full bg-[#DAAF9E] hover:bg-[#C79987] text-[#163F41] font-black text-sm py-3 px-4 rounded-2xl shadow-md transition cursor-pointer"
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
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
      {/* Background Dimmed Overlay with Hole / Spotlight */}
      {targetRect && !isModalStep ? (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <mask id="spotlight-mask">
              {/* White background */}
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {/* Black hole cutout with padding */}
              <rect
                x={targetRect.left - 8}
                y={targetRect.top - 8}
                width={targetRect.width + 16}
                height={targetRect.height + 16}
                rx="20"
                fill="black"
              />
            </mask>
          </defs>

          {/* Dark backdrop with blur */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(14, 41, 43, 0.82)"
            mask="url(#spotlight-mask)"
          />

          {/* Neon Ring around target */}
          <rect
            x={targetRect.left - 8}
            y={targetRect.top - 8}
            width={targetRect.width + 16}
            height={targetRect.height + 16}
            rx="20"
            fill="none"
            stroke="#DAAF9E"
            strokeWidth="3"
            className="animate-pulse"
          />
        </svg>
      ) : (
        <div className="absolute inset-0 bg-[#0e292b]/80 backdrop-blur-xs pointer-events-none" />
      )}

      {/* Floating Glassmorphism Tooltip Card */}
      <div
        className={`fixed z-[210] w-[92%] max-w-sm transition-all duration-300 pointer-events-auto ${
          isModalStep ? 'lg:max-w-xs' : 'max-w-sm'
        }`}
        style={cardStyle}
      >
        <div className="glass-card rounded-3xl p-5 border border-[#DAAF9E]/40 shadow-2xl bg-[#163F41] text-[#EFEEEC] space-y-4 relative">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">{step.icon}</span>
              {step.badgeText && (
                <span className="text-[10px] font-extrabold text-[#DAAF9E] bg-[#DAAF9E]/20 border border-[#DAAF9E]/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {step.badgeText}
                </span>
              )}
            </div>
            <button
              onClick={onSkip}
              className="text-[11px] font-semibold text-[#6B8B86] hover:text-[#DAAF9E] transition cursor-pointer flex items-center gap-1 bg-[#0e292b]/80 px-2.5 py-1 rounded-full border border-[#2a575a]"
            >
              <span>Omitir</span>
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-1">
            <h4 className="text-base font-extrabold text-[#EFEEEC]">{step.title}</h4>
            <p className="text-xs text-[#F0CDC4] leading-relaxed">{step.description}</p>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-[#2a575a]/60">
            {/* Progress Dots & Step Count */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-[#6B8B86] mr-1">
                {currentStep + 1}/{TOUR_STEPS.length}
              </span>
              {TOUR_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentStep
                      ? 'w-5 bg-[#DAAF9E]'
                      : idx < currentStep
                      ? 'w-1.5 bg-[#DAAF9E]/50'
                      : 'w-1.5 bg-[#2a575a]'
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next CTAs */}
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={onPrev}
                  className="p-2 rounded-xl bg-[#0e292b] text-[#F0CDC4] hover:text-white border border-[#2a575a] transition cursor-pointer"
                  title="Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              {isLastStep ? (
                <button
                  onClick={onFinish}
                  className="inline-flex items-center gap-1.5 bg-[#DAAF9E] hover:bg-[#C79987] text-[#163F41] font-black text-xs px-4 py-2 rounded-xl shadow-md transition cursor-pointer"
                >
                  <span>Finalizar</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#163F41]" />
                </button>
              ) : (
                <button
                  onClick={onNext}
                  className="inline-flex items-center gap-1 bg-[#DAAF9E] hover:bg-[#C79987] text-[#163F41] font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-md transition cursor-pointer"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
