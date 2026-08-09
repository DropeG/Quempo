'use client';

import { useState, useEffect } from 'react';
import { X, Bug, Lightbulb, HelpCircle, Check, AlertCircle, Loader2, Send } from 'lucide-react';
import { submitFeedbackAction } from '@/app/actions/feedback';

interface FeedbackModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultContact?: string;
}

type FeedbackCategory = 'bug' | 'suggestion' | 'other';

export default function FeedbackModal({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  defaultContact = '',
}: FeedbackModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [category, setCategory] = useState<FeedbackCategory>('bug');
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState(defaultContact);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isControlled = typeof externalIsOpen === 'boolean';
  const open = isControlled ? externalIsOpen : internalIsOpen;

  const handleClose = () => {
    if (externalOnClose) {
      externalOnClose();
    }
    setInternalIsOpen(false);
  };

  useEffect(() => {
    const handleOpenEvent = () => {
      setCategory('bug');
      setMessage('');
      setContact(defaultContact);
      setSuccess(false);
      setErrorMessage('');
      setInternalIsOpen(true);
    };

    window.addEventListener('open-quempo-feedback', handleOpenEvent);
    return () => window.removeEventListener('open-quempo-feedback', handleOpenEvent);
  }, [defaultContact]);

  useEffect(() => {
    if (open) {
      setCategory('bug');
      setMessage('');
      setContact(defaultContact);
      setSuccess(false);
      setErrorMessage('');
    }
  }, [open, defaultContact]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!message.trim() || message.trim().length < 5) {
      setErrorMessage('Por favor describe lo que encontraste (mínimo 5 caracteres).');
      return;
    }

    setLoading(true);

    try {
      // Automatic technical metadata capture
      const pageUrl = typeof window !== 'undefined' ? window.location.href : undefined;
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;
      const screenSize = typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : undefined;

      const res = await submitFeedbackAction({
        category,
        message,
        contact,
        pageUrl,
        userAgent,
        screenSize,
      });

      if (!res.success) {
        setErrorMessage(res.error || 'Ocurrió un error al enviar el reporte.');
      } else {
        setSuccess(true);
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch (err) {
      console.error('Feedback submit error:', err);
      setErrorMessage('Ocurrió un problema de conexión. Por favor reintenta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="glass-card w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white border border-white/30 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/20 flex items-center justify-between bg-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-400/20 text-[#38BDF8] flex items-center justify-center border border-sky-300/40">
              <Bug className="w-5 h-5 text-[#38BDF8]" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight drop-shadow-xs">Feedback & Errores</h2>
              <p className="text-[11px] text-sky-200 font-medium">Ayúdanos a mejorar Quempo ❄️</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            aria-label="Cerrar modal"
            className="p-2 text-slate-300 hover:text-white hover:bg-white/20 bg-white/10 rounded-xl transition cursor-pointer border border-white/20"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          {success ? (
            <div className="py-8 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center mx-auto shadow-md">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-base font-black text-white">¡Muchas gracias por tu reporte!</h3>
              <p className="text-xs text-sky-200 font-medium max-w-xs mx-auto">
                Revisaremos lo que nos enviaste para que la experiencia en la montaña sea perfecta.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold text-sky-200 mb-2">
                  ¿Qué deseas reportar?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCategory('bug')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center gap-1 transition cursor-pointer border ${
                      category === 'bug'
                        ? 'bg-rose-500/30 text-rose-200 border-rose-400/60 shadow-sm scale-[1.02]'
                        : 'bg-white/5 text-slate-300 border-white/15 hover:bg-white/10'
                    }`}
                  >
                    <Bug className="w-4 h-4 text-rose-400" />
                    <span>Error / Bug</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory('suggestion')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center gap-1 transition cursor-pointer border ${
                      category === 'suggestion'
                        ? 'bg-amber-500/30 text-amber-200 border-amber-400/60 shadow-sm scale-[1.02]'
                        : 'bg-white/5 text-slate-300 border-white/15 hover:bg-white/10'
                    }`}
                  >
                    <Lightbulb className="w-4 h-4 text-amber-300" />
                    <span>Sugerencia</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory('other')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center gap-1 transition cursor-pointer border ${
                      category === 'other'
                        ? 'bg-sky-500/30 text-sky-200 border-sky-400/60 shadow-sm scale-[1.02]'
                        : 'bg-white/5 text-slate-300 border-white/15 hover:bg-white/10'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4 text-sky-300" />
                    <span>Otro</span>
                  </button>
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-xs font-bold text-sky-200 mb-1.5">
                  Descripción del problema o idea
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    category === 'bug'
                      ? 'Cuéntanos qué ocurrió, qué estabas haciendo o qué botón falló...'
                      : 'Cuéntanos qué te gustaría ver en Quempo...'
                  }
                  className="w-full p-3 rounded-xl bg-slate-900/70 border border-white/30 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 transition font-medium resize-none"
                />
              </div>

              {/* Optional Contact Input */}
              <div>
                <label className="block text-xs font-bold text-sky-200 mb-1.5">
                  Contacto para responderte <span className="text-slate-400 font-normal">(Opcional)</span>
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Email o WhatsApp (+569...)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-white/30 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 transition font-medium"
                />
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-300" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#38BDF8] hover:bg-[#0284C7] text-[#0F2942] hover:text-white font-black text-sm transition-all duration-200 cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-2 border border-white/40 active:scale-95"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#0F2942]" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar Reporte</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
