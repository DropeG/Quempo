'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { TripDirection, SkiResort } from '@/types/trip';
import { X, Calendar, Clock, MapPin, DollarSign, Users, ShieldCheck, Car, Check, LogIn } from 'lucide-react';

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
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Sync defaults when opening modal
  useEffect(() => {
    if (isOpen) {
      setDirection(defaultDirection);
      if (defaultDestination) setDestination(defaultDestination);
      if (defaultDate) setDepartureDate(defaultDate);
    }
  }, [isOpen, defaultDirection, defaultDestination, defaultDate]);

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
      });

      if (insertError) {
        throw insertError;
      }

      onTripPublished();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al publicar el viaje. Intenta nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 my-8 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Car className="w-5 h-5 text-sky-400" /> Publicar Viaje
            </h2>
            <p className="text-xs text-slate-400">Comparte tu auto y amortiza los costos de subida/bajada</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Require Auth State */}
        {!user ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-sky-500/10 text-sky-400 mx-auto flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Inicia sesión para publicar</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                Por seguridad de la comunidad, necesitamos verificar tu perfil con Google antes de permitir publicaciones.
              </p>
            </div>
            <button
              onClick={handleLoginGoogle}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition shadow-lg shadow-sky-500/25 active:scale-95"
            >
              <LogIn className="w-4 h-4" /> Iniciar Sesión con Google
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {error && (
              <div className="p-3 text-xs bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl">
                {error}
              </div>
            )}

            {/* Dirección del Viaje */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Tipo de Viaje
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'SUBIDA', label: '⬆️ Subida' },
                  { id: 'BAJADA', label: '⬇️ Bajada' },
                  { id: 'ROUND_TRIP', label: '🔄 Ida y Vuelta' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDirection(item.id as TripDirection)}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border transition ${
                      direction === item.id
                        ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Destino y Origen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Destino</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value as SkiResort)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="FARELLONES">Farellones</option>
                  <option value="EL_COLORADO">El Colorado</option>
                  <option value="LA_PARVA">La Parva</option>
                  <option value="VALLE_NEVADO">Valle Nevado</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Punto de Salida / Encuentro
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Ej: Cantagallo, Mall Sport, Metro Escuela Militar"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Fecha y Hora */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Fecha</label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Hora de Salida</label>
                <div className="relative">
                  <Clock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Asientos y Precio */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Asientos Disponibles</label>
                <div className="relative">
                  <Users className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={seatsAvailable}
                    onChange={(e) => setSeatsAvailable(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Precio por Asiento (CLP)</label>
                <div className="relative">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="number"
                    step="500"
                    min="0"
                    placeholder="10000"
                    value={pricePerSeat}
                    onChange={(e) => setPricePerSeat(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Badges de Montaña */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Equipamiento y Vehículo</label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setHas4x4(!has4x4)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition ${
                    has4x4
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400'
                  }`}
                >
                  {has4x4 && <Check className="w-3.5 h-3.5" />} 🚙 Vehículo 4x4 / AWD
                </button>

                <button
                  type="button"
                  onClick={() => setHasChains(!hasChains)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition ${
                    hasChains
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400'
                  }`}
                >
                  {hasChains && <Check className="w-3.5 h-3.5" />} ⛓️ Lleva Cadenas
                </button>

                <button
                  type="button"
                  onClick={() => setHasRack(!hasRack)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition ${
                    hasRack
                      ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400'
                  }`}
                >
                  {hasRack && <Check className="w-3.5 h-3.5" />} 🎿 Parrilla / Porta-esquís
                </button>
              </div>
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Número de WhatsApp (para coordinar)
              </label>
              <input
                type="tel"
                placeholder="+56912345678"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Notas opcionales */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Notas / Detalles adicionales</label>
              <textarea
                rows={2}
                placeholder="Ej: Salgo puntual a las 7:00 AM. Espacio para botas en maletero."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 disabled:opacity-50 text-white font-semibold text-sm py-2.5 rounded-xl shadow-lg shadow-sky-500/25 transition active:scale-95 cursor-pointer"
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
