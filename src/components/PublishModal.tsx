'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { TripDirection, SkiResort } from '@/types/trip';
import { X, Calendar, Clock, MapPin, DollarSign, Users, ShieldCheck, Car, Check, LogIn } from 'lucide-react';

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

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onTripPublished: () => void;
  defaultDirection?: TripDirection;
  defaultDestination?: SkiResort;
  defaultDate?: string;
}

export default function PublishModal({
  isOpen,
  onClose,
  user,
  onTripPublished,
  defaultDirection = 'SUBIDA',
  defaultDestination = 'FARELLONES',
  defaultDate = '',
}: PublishModalProps) {
  const supabase = createClient();

  const [direction, setDirection] = useState<TripDirection>(defaultDirection);
  const [destination, setDestination] = useState<SkiResort>(defaultDestination);
  const [origin, setOrigin] = useState('');
  const [departureDate, setDepartureDate] = useState(defaultDate);
  const [departureTime, setDepartureTime] = useState('07:00');
  const [seatsAvailable, setSeatsAvailable] = useState(3);
  const [pricePerSeat, setPricePerSeat] = useState(10000);
  const [has4x4, setHas4x4] = useState(false);
  const [hasChains, setHasChains] = useState(true);
  const [hasRack, setHasRack] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  // Sync defaults when modal opens
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setDirection(defaultDirection);
      if (defaultDestination) setDestination(defaultDestination);
      if (defaultDate) setDepartureDate(defaultDate);
    }
  }

  if (!isOpen) return null;

  const handleLoginGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError('');

    if (!origin.trim()) {
      setError('Por favor indica el punto de salida.');
      return;
    }
    if (!departureDate) {
      setError('Por favor selecciona la fecha del viaje.');
      return;
    }
    if (!whatsappNumber.trim()) {
      setError('Por favor ingresa tu número de WhatsApp.');
      return;
    }

    // Clean phone number (keep digits and optional plus)
    const cleanPhone = whatsappNumber.replace(/[^0-9+]/g, '');

    // Clean instagram handle (remove @, url prefixes, query params)
    const cleanInstagram = instagramHandle
      .trim()
      .replace(/^https?:\/\/(www\.)?instagram\.com\//i, '')
      .replace(/^instagram\.com\//i, '')
      .replace(/^@+/, '')
      .split('/')[0]
      .split('?')[0];

    setSubmitting(true);

    try {
      const { error: insertError } = await supabase.from('trips').insert({
        user_id: user.id,
        driver_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Conductor',
        driver_avatar: user.user_metadata?.avatar_url || null,
        direction,
        destination,
        origin: origin.trim(),
        departure_date: departureDate,
        departure_time: departureTime,
        seats_available: Number(seatsAvailable),
        price_per_seat: Number(pricePerSeat),
        has_4x4: has4x4,
        has_chains: hasChains,
        has_rack: hasRack,
        notes: notes.trim() || null,
        whatsapp_number: cleanPhone,
        instagram_handle: cleanInstagram || null,
      });

      if (insertError) {
        throw insertError;
      }

      onTripPublished();
      onClose();
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : 'Error al publicar el viaje. Intenta nuevamente.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0e292b]/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#163F41] border border-[#2a575a] rounded-2xl shadow-xl p-6 my-8 text-[#EFEEEC]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2a575a]">
          <div>
            <h2 className="text-xl font-bold text-[#EFEEEC] flex items-center gap-2">
              <Car className="w-5 h-5 text-[#DAAF9E]" /> Publicar Viaje
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#F0CDC4] hover:text-white p-1 rounded-lg hover:bg-[#0e292b] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Require Auth State */}
        {!user ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#DAAF9E]/20 text-[#DAAF9E] mx-auto flex items-center justify-center border border-[#DAAF9E]/40">
              <ShieldCheck className="w-6 h-6 text-[#DAAF9E]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#EFEEEC]">Inicia sesión para publicar</h3>
              <p className="text-xs text-[#F0CDC4] max-w-xs mx-auto mt-1">
                Por seguridad de la comunidad, necesitamos verificar tu perfil con Google antes de permitir publicaciones.
              </p>
            </div>
            <button
              onClick={handleLoginGoogle}
              className="inline-flex items-center gap-2 bg-[#DAAF9E] hover:bg-[#C79987] text-[#163F41] font-bold text-sm px-5 py-2.5 rounded-xl transition shadow-xs active:scale-95"
            >
              <LogIn className="w-4 h-4" /> Iniciar Sesión con Google
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {error && (
              <div className="p-3 text-xs bg-rose-950/60 border border-rose-800/80 text-rose-300 rounded-xl font-medium">
                {error}
              </div>
            )}

            {/* Dirección del Viaje */}
            <div>
              <label className="block text-xs font-semibold text-[#F0CDC4] uppercase tracking-wider mb-2">
                Tipo de Viaje
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'SUBIDA', label: '⬆️ Subida' },
                  { id: 'BAJADA', label: '⬇️ Bajada' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDirection(item.id as TripDirection)}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border transition ${
                      direction === item.id
                        ? 'bg-[#DAAF9E] border-[#DAAF9E] text-[#163F41] font-bold'
                        : 'bg-[#0e292b] border-[#2a575a] text-[#F0CDC4] hover:bg-[#163F41]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Destino y Origen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {direction === 'SUBIDA' ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#F0CDC4] mb-1">
                      Punto de Salida (Ciudad)
                    </label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-[#6B8B86] absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Ej: Cantagallo, Mall Sport, Metro Escuela Militar"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="w-full bg-[#0e292b] border border-[#2a575a] rounded-xl pl-8 pr-3 py-2 text-xs text-[#EFEEEC] placeholder-[#6B8B86] focus:outline-none focus:border-[#DAAF9E] font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#F0CDC4] mb-1">Destino (Montaña)</label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value as SkiResort)}
                      className="w-full bg-[#0e292b] border border-[#2a575a] rounded-xl px-3 py-2 text-xs text-[#EFEEEC] focus:outline-none focus:border-[#DAAF9E] font-medium"
                    >
                      <option value="FARELLONES">Farellones</option>
                      <option value="EL_COLORADO">El Colorado</option>
                      <option value="LA_PARVA">La Parva</option>
                      <option value="VALLE_NEVADO">Valle Nevado</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#F0CDC4] mb-1">Origen (Montaña)</label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value as SkiResort)}
                      className="w-full bg-[#0e292b] border border-[#2a575a] rounded-xl px-3 py-2 text-xs text-[#EFEEEC] focus:outline-none focus:border-[#DAAF9E] font-medium"
                    >
                      <option value="FARELLONES">Farellones</option>
                      <option value="EL_COLORADO">El Colorado</option>
                      <option value="LA_PARVA">La Parva</option>
                      <option value="VALLE_NEVADO">Valle Nevado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#F0CDC4] mb-1">
                      Punto de Llegada (Ciudad)
                    </label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-[#6B8B86] absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Ej: Cantagallo, Mall Sport, Metro Escuela Militar"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="w-full bg-[#0e292b] border border-[#2a575a] rounded-xl pl-8 pr-3 py-2 text-xs text-[#EFEEEC] placeholder-[#6B8B86] focus:outline-none focus:border-[#DAAF9E] font-medium"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Fecha y Hora */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#F0CDC4] mb-1">Fecha</label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-[#6B8B86] absolute left-3 top-2.5" />
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full bg-[#0e292b] border border-[#2a575a] rounded-xl pl-8 pr-3 py-2 text-xs text-[#EFEEEC] focus:outline-none focus:border-[#DAAF9E] font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F0CDC4] mb-1">Hora de Salida</label>
                <div className="relative">
                  <Clock className="w-3.5 h-3.5 text-[#6B8B86] absolute left-3 top-2.5" />
                  <input
                    type="time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full bg-[#0e292b] border border-[#2a575a] rounded-xl pl-8 pr-3 py-2 text-xs text-[#EFEEEC] focus:outline-none focus:border-[#DAAF9E] font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Asientos y Precio */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#F0CDC4] mb-1">Asientos Disponibles</label>
                <div className="relative">
                  <Users className="w-3.5 h-3.5 text-[#6B8B86] absolute left-3 top-2.5" />
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={seatsAvailable}
                    onChange={(e) => setSeatsAvailable(Number(e.target.value))}
                    className="w-full bg-[#0e292b] border border-[#2a575a] rounded-xl pl-8 pr-3 py-2 text-xs text-[#EFEEEC] focus:outline-none focus:border-[#DAAF9E] font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F0CDC4] mb-1">Precio por Asiento (CLP)</label>
                <div className="relative">
                  <DollarSign className="w-3.5 h-3.5 text-[#6B8B86] absolute left-3 top-2.5" />
                  <input
                    type="number"
                    step="500"
                    min="0"
                    placeholder="10000"
                    value={pricePerSeat}
                    onChange={(e) => setPricePerSeat(Number(e.target.value))}
                    className="w-full bg-[#0e292b] border border-[#2a575a] rounded-xl pl-8 pr-3 py-2 text-xs text-[#EFEEEC] placeholder-[#6B8B86] focus:outline-none focus:border-[#DAAF9E] font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Badges de Montaña */}
            <div>
              <label className="block text-xs font-semibold text-[#F0CDC4] mb-2">Equipamiento y Vehículo</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setHas4x4(!has4x4)}
                  className={`py-2 px-1 rounded-xl text-xs font-medium border flex items-center justify-center gap-1 transition ${
                    has4x4
                      ? 'bg-[#DAAF9E]/20 border-[#DAAF9E]/50 text-[#DAAF9E] font-semibold'
                      : 'bg-[#0e292b] border-[#2a575a] text-[#6B8B86]'
                  }`}
                >
                  {has4x4 && <Check className="w-3.5 h-3.5 shrink-0" />} 🚙 4x4 / AWD
                </button>

                <button
                  type="button"
                  onClick={() => setHasChains(!hasChains)}
                  className={`py-2 px-1 rounded-xl text-xs font-medium border flex items-center justify-center gap-1 transition ${
                    hasChains
                      ? 'bg-[#F0CDC4]/20 border-[#F0CDC4]/50 text-[#F0CDC4] font-semibold'
                      : 'bg-[#0e292b] border-[#2a575a] text-[#6B8B86]'
                  }`}
                >
                  {hasChains && <Check className="w-3.5 h-3.5 shrink-0" />} ⛓️ Cadenas
                </button>

                <button
                  type="button"
                  onClick={() => setHasRack(!hasRack)}
                  className={`py-2 px-1 rounded-xl text-xs font-medium border flex items-center justify-center gap-1 transition ${
                    hasRack
                      ? 'bg-teal-500/20 border-teal-500/50 text-teal-200 font-semibold'
                      : 'bg-[#0e292b] border-[#2a575a] text-[#6B8B86]'
                  }`}
                >
                  {hasRack && <Check className="w-3.5 h-3.5 shrink-0" />} 🎿 Parrilla
                </button>
              </div>
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-xs font-semibold text-[#F0CDC4] mb-1">
                Número de WhatsApp (para coordinar)
              </label>
              <input
                type="tel"
                placeholder="+56912345678"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full bg-[#0e292b] border border-[#2a575a] rounded-xl px-3 py-2 text-xs text-[#EFEEEC] placeholder-[#6B8B86] focus:outline-none focus:border-[#DAAF9E] font-medium"
              />
            </div>

            {/* Instagram (Opcional) */}
            <div>
              <label className="block text-xs font-semibold text-[#F0CDC4] mb-1 flex items-center gap-1.5">
                <InstagramIcon className="w-3.5 h-3.5 text-[#DAAF9E]" /> Usuario de Instagram <span className="text-[#6B8B86] font-normal">(Opcional - da mayor confianza)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs text-[#6B8B86] font-semibold">@</span>
                <input
                  type="text"
                  placeholder="usuario_instagram"
                  value={instagramHandle}
                  onChange={(e) => setInstagramHandle(e.target.value)}
                  className="w-full bg-[#0e292b] border border-[#2a575a] rounded-xl pl-7 pr-3 py-2 text-xs text-[#EFEEEC] placeholder-[#6B8B86] focus:outline-none focus:border-[#DAAF9E] font-medium"
                />
              </div>
            </div>

            {/* Notas opcionales */}
            <div>
              <label className="block text-xs font-semibold text-[#F0CDC4] mb-1">Notas / Detalles adicionales</label>
              <textarea
                rows={2}
                placeholder="Ej: Salgo puntual a las 7:00 AM. Espacio para botas en maletero."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#0e292b] border border-[#2a575a] rounded-xl px-3 py-2 text-xs text-[#EFEEEC] placeholder-[#6B8B86] focus:outline-none focus:border-[#DAAF9E] font-medium"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#DAAF9E] hover:bg-[#C79987] disabled:opacity-50 text-[#163F41] font-bold text-sm py-2.5 rounded-xl shadow-xs transition active:scale-95 cursor-pointer"
              >
                {submitting ? 'Publicando viaje...' : 'Publicar Viaje'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
