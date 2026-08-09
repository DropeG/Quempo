'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { X, Car, Phone, Check, AlertCircle, Loader2, Sparkles, Bug } from 'lucide-react';
import UserAvatar from './UserAvatar';
import PhoneInput from './PhoneInput';

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
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

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onProfileUpdated?: () => void;
  onOpenFeedback?: () => void;
}

export default function ProfileModal({ isOpen, onClose, user, onProfileUpdated, onOpenFeedback }: ProfileModalProps) {
  const supabase = createClient();

  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [instagramHandle, setInstagramHandle] = useState('');
  const [tripsCount, setTripsCount] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen || !user) return;

    let isMounted = true;

    const timer = setTimeout(() => {
      if (isMounted) {
        setSuccessMessage('');
        setErrorMessage('');
        setLoading(true);
      }
    }, 0);

    const loadProfileData = async () => {
      try {
        // 1. Fetch Profile (.maybeSingle prevents PGRST116 errors on new accounts)
        const { data: profile } = await supabase
          .from('profiles')
          .select('whatsapp_number, instagram_handle')
          .eq('id', user.id)
          .maybeSingle();

        if (isMounted && profile) {
          setWhatsappNumber(profile.whatsapp_number || '');
          setInstagramHandle(profile.instagram_handle || '');
        }

        // 2. Fetch Trips Count
        const { count } = await supabase
          .from('trips')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (isMounted) {
          setTripsCount(count ?? 0);
        }
      } catch (err) {
        console.error('Error loading profile data:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProfileData();

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [isOpen, user, supabase]);

  if (!isOpen || !user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!whatsappNumber.trim() || !isPhoneValid) {
      setErrorMessage('Por favor ingresa un número de WhatsApp válido.');
      return;
    }

    const cleanPhone = whatsappNumber;

    // Clean instagram handle
    const cleanInstagram = instagramHandle
      .trim()
      .replace(/^https?:\/\/(www\.)?instagram\.com\//i, '')
      .replace(/^instagram\.com\//i, '')
      .replace(/^@+/, '')
      .split('/')[0]
      .split('?')[0];

    setSaving(true);

    try {
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario',
        avatar_url: user.user_metadata?.avatar_url || null,
        whatsapp_number: cleanPhone,
        instagram_handle: cleanInstagram || null,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      // Update all published trips for this user so instagram handle & whatsapp stay in sync
      await supabase
        .from('trips')
        .update({
          whatsapp_number: cleanPhone,
          instagram_handle: cleanInstagram || null,
        })
        .eq('user_id', user.id);

      if (onProfileUpdated) {
        onProfileUpdated();
      }

      setSuccessMessage('¡Perfil y viajes actualizados con éxito!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: unknown) {
      console.error('Profile save error:', err);
      const msg =
        typeof err === 'object' && err !== null && 'message' in err
          ? String((err as { message?: string }).message)
          : err instanceof Error
          ? err.message
          : 'No se pudo guardar el perfil.';
      setErrorMessage(msg);
    } finally {
      setSaving(false);
    }
  };

  const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario';
  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="glass-card w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] text-white border border-white/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/20 flex items-center justify-between bg-white/10 backdrop-blur-md shrink-0">
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight drop-shadow-xs">Mi Perfil</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-2 text-slate-300 hover:text-white hover:bg-white/20 bg-white/10 rounded-xl transition cursor-pointer border border-white/20"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 custom-scrollbar flex-1">
          {/* User Info Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xs">
            <UserAvatar
              src={avatarUrl}
              name={fullName}
              email={user.email}
              size="xl"
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-black text-white truncate drop-shadow-xs">{fullName}</h3>
              <p className="text-xs text-sky-200 truncate mt-0.5 font-medium">{user.email}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-sky-400/20 text-sky-200 border border-sky-300/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" /> Google OAuth
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-400/20 text-[#38BDF8] flex items-center justify-center border border-sky-300/40">
                <Car className="w-5 h-5 text-[#38BDF8]" />
              </div>
              <div>
                <div className="text-xs font-black text-white">Viajes Publicados</div>
                <div className="text-xs text-sky-200 font-medium">Histórico en Quempo</div>
              </div>
            </div>
            <div className="text-2xl font-black text-white drop-shadow-xs">
              {loading ? (
                <span className="text-xs text-slate-400">...</span>
              ) : (
                tripsCount ?? 0
              )}
            </div>
          </div>


          {/* Contact Edit Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-sky-200 mb-1.5">
                Número de WhatsApp (Contacto)
              </label>
              <PhoneInput
                id="profile-whatsapp"
                value={whatsappNumber}
                onChange={(normalized, isValid) => {
                  setWhatsappNumber(normalized);
                  setIsPhoneValid(isValid);
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-sky-200 mb-1.5">
                Instagram <span className="text-slate-300 font-normal">(Opcional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <InstagramIcon className="w-4 h-4 text-[#38BDF8]" />
                </div>
                <input
                  type="text"
                  value={instagramHandle}
                  onChange={(e) => setInstagramHandle(e.target.value)}
                  placeholder="@tu_usuario"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/30 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 transition font-bold"
                />
              </div>
            </div>

            {/* Alert Messages */}
            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2 font-bold">
                <Check className="w-4 h-4 shrink-0 text-emerald-300" />
                <span>{successMessage}</span>
              </div>
            )}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-300" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={saving || loading}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#38BDF8] hover:bg-[#0284C7] text-[#0F2942] hover:text-white font-black text-sm transition-all duration-200 cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-2 mt-2 border border-white/40 active:scale-95"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#0F2942]" />
                  <span>Guardando...</span>
                </>
              ) : (
                <span>Guardar Perfil</span>
              )}
            </button>
          </form>

          {/* Feedback Section */}
          <div className="pt-2 border-t border-white/15">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Bug className="w-4 h-4 text-sky-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">¿Encontraste un problema?</div>
                  <div className="text-[11px] text-sky-200">Envíanos tu feedback o reporte de error</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenFeedback) onOpenFeedback();
                  window.dispatchEvent(new CustomEvent('open-quempo-feedback'));
                }}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-sky-300 border border-sky-300/30 transition cursor-pointer shrink-0"
              >
                Reportar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
