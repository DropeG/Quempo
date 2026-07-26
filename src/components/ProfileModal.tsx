'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { X, Car, Phone, Check, AlertCircle, Loader2, Sparkles } from 'lucide-react';

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
  onRestartTour?: () => void;
}

export default function ProfileModal({ isOpen, onClose, user, onRestartTour }: ProfileModalProps) {
  const supabase = createClient();

  const [whatsappNumber, setWhatsappNumber] = useState('');
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

    // Clean phone number
    const cleanPhone = whatsappNumber.replace(/[^0-9+]/g, '');

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

      setSuccessMessage('¡Perfil actualizado con éxito!');
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-[#163F41] border border-[#2a575a] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#2a575a] flex items-center justify-between bg-[#113335]">
          <h2 className="text-xl font-black text-[#EFEEEC] tracking-tight">Mi Perfil</h2>
          <button
            onClick={onClose}
            className="p-2 text-[#F0CDC4]/70 hover:text-[#EFEEEC] hover:bg-[#163F41] rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* User Info Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0e292b] border border-[#2a575a]">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={fullName}
                className="w-16 h-16 rounded-2xl ring-2 ring-[#DAAF9E] object-cover shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-[#DAAF9E] text-[#163F41] flex items-center justify-center font-black text-xl ring-2 ring-[#DAAF9E] shrink-0">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-[#EFEEEC] truncate">{fullName}</h3>
              <p className="text-xs text-[#F0CDC4]/80 truncate mt-0.5">{user.email}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#DAAF9E]/15 text-[#DAAF9E] border border-[#DAAF9E]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DAAF9E] animate-pulse" /> Google OAuth
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="p-4 rounded-2xl bg-[#0e292b]/60 border border-[#2a575a] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#DAAF9E]/15 text-[#DAAF9E] flex items-center justify-center border border-[#DAAF9E]/30">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#F0CDC4]">Viajes Publicados</div>
                <div className="text-xs text-[#F0CDC4]/60">Histórico en Faredeo</div>
              </div>
            </div>
            <div className="text-2xl font-black text-[#EFEEEC]">
              {loading ? (
                <span className="text-xs text-[#F0CDC4]/50">...</span>
              ) : (
                tripsCount ?? 0
              )}
            </div>
          </div>

          {/* Contact Edit Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#EFEEEC] mb-1.5">
                Número de WhatsApp (Contacto)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#F0CDC4]/60">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="+56 9 1234 5678"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0e292b] border border-[#2a575a] text-[#EFEEEC] placeholder-[#F0CDC4]/40 text-sm focus:outline-none focus:border-[#DAAF9E] transition"
                  required
                />
              </div>
              <p className="text-[11px] text-[#F0CDC4]/60 mt-1">
                Se guardará para rellenarse automáticamente al publicar nuevos viajes.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#EFEEEC] mb-1.5">
                Instagram <span className="text-[#F0CDC4]/60 font-normal">(Opcional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#F0CDC4]/60">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={instagramHandle}
                  onChange={(e) => setInstagramHandle(e.target.value)}
                  placeholder="@tu_usuario"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0e292b] border border-[#2a575a] text-[#EFEEEC] placeholder-[#F0CDC4]/40 text-sm focus:outline-none focus:border-[#DAAF9E] transition"
                />
              </div>
            </div>

            {/* Alert Messages */}
            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={saving || loading}
              className="w-full py-3 px-4 rounded-xl bg-[#DAAF9E] hover:bg-[#C79987] text-[#163F41] font-black text-sm transition cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <span>Guardar Perfil</span>
              )}
            </button>

            {onRestartTour && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRestartTour();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0e292b] hover:bg-[#113335] text-[#DAAF9E] border border-[#2a575a] hover:border-[#DAAF9E]/40 font-extrabold text-xs transition cursor-pointer flex items-center justify-center gap-2 mt-3"
              >
                <Sparkles className="w-4 h-4 text-[#DAAF9E]" />
                <span>Ver tutorial de inicio (Replay)</span>
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
