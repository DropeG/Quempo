'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { Trip, TripDirection, SkiResort } from '@/types/trip';
import { X, Calendar, Clock, MapPin, DollarSign, Users, ShieldCheck, Car, Check, LogIn } from 'lucide-react';


const CITY_LOCATION_PRESETS = [
  'Shell Farellones',
  'Mall Sport',
  'Cantagallo',
  'Metro Los Dominicos',
  'Estoril',
];

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onTripPublished: (publishedTrip?: Trip) => void;
  defaultDirection?: TripDirection;
  defaultDestination?: SkiResort;
  defaultDate?: string;
  tripToEdit?: Trip | null;
}

export default function PublishModal({
  isOpen,
  onClose,
  user,
  onTripPublished,
  defaultDirection = 'SUBIDA',
  defaultDestination = 'FARELLONES',
  defaultDate = '',
  tripToEdit,
}: PublishModalProps) {
  const supabase = createClient();

  const [direction, setDirection] = useState<TripDirection>(defaultDirection);
  const [destination, setDestination] = useState<SkiResort>(defaultDestination);
  const [origin, setOrigin] = useState('');
  const [departureDate, setDepartureDate] = useState(defaultDate);
  const [departureTime, setDepartureTime] = useState('07:00');
  const [seatsAvailable, setSeatsAvailable] = useState<number | string>(3);
  const [pricePerSeat, setPricePerSeat] = useState<number | string>('');
  const [has4x4, setHas4x4] = useState(false);
  const [hasChains, setHasChains] = useState(true);
  const [hasRack, setHasRack] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [profileInstagramHandle, setProfileInstagramHandle] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // Keyboard controls: Escape to close & Tab focus trap
  useEffect(() => {
    if (!isOpen) return;

    // Focus first focusable element inside modal on open
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

  // Sync defaults or tripToEdit when modal opens
  useEffect(() => {
    if (!isOpen) return;

    if (tripToEdit) {
      setDirection(tripToEdit.direction);
      setDestination(tripToEdit.destination);
      setOrigin(tripToEdit.origin);
      setDepartureDate(tripToEdit.departure_date);
      setDepartureTime(tripToEdit.departure_time);
      setSeatsAvailable(tripToEdit.seats_available);
      setPricePerSeat(tripToEdit.price_per_seat);
      setHas4x4(tripToEdit.has_4x4);
      setHasChains(tripToEdit.has_chains);
      setHasRack(tripToEdit.has_rack);
      setWhatsappNumber(tripToEdit.whatsapp_number);
      setProfileInstagramHandle(tripToEdit.instagram_handle || null);
      setNotes(tripToEdit.notes || '');
    } else {
      setDirection(defaultDirection);
      setDestination(defaultDestination || 'FARELLONES');
      setOrigin('');
      setDepartureDate(defaultDate || '');
      setDepartureTime('07:00');
      setSeatsAvailable(3);
      setPricePerSeat('');
      setHas4x4(false);
      setHasChains(true);
      setHasRack(false);
      setNotes('');
    }
  }, [isOpen, tripToEdit, defaultDirection, defaultDestination, defaultDate]);

  // Auto-fill WhatsApp & inherit Instagram from profile when modal opens
  useEffect(() => {
    if (!isOpen || !user) return;

    const fetchProfileContact = async () => {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('whatsapp_number, instagram_handle')
          .eq('id', user.id)
          .maybeSingle();

        if (profile) {
          if (!tripToEdit && profile.whatsapp_number) setWhatsappNumber(profile.whatsapp_number);
          if (profile.instagram_handle) setProfileInstagramHandle(profile.instagram_handle);
        }
      } catch (err) {
        console.error('Error fetching profile contact:', err);
      }
    };

    fetchProfileContact();
  }, [isOpen, user, tripToEdit, supabase]);

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
    if (departureDate < todayStr && !tripToEdit) {
      setError('La fecha del viaje no puede ser en el pasado.');
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
      let savedTrip: Trip | null = null;
      const inheritedInstagram = profileInstagramHandle || tripToEdit?.instagram_handle || null;

      if (tripToEdit) {
        const { data: updatedData, error: updateError } = await supabase
          .from('trips')
          .update({
            direction,
            destination,
            origin: origin.trim(),
            departure_date: departureDate,
            departure_time: departureTime,
            seats_available: Number(seatsAvailable) || 1,
            price_per_seat: pricePerSeat !== '' ? Number(pricePerSeat) : 10000,
            has_4x4: has4x4,
            has_chains: hasChains,
            has_rack: hasRack,
            notes: notes.trim() || null,
            whatsapp_number: cleanPhone,
            instagram_handle: inheritedInstagram,
          })
          .eq('id', tripToEdit.id)
          .eq('user_id', user.id)
          .select()
          .single();

        if (updateError) throw updateError;
        savedTrip = updatedData as Trip;
      } else {
        const { data: insertedData, error: insertError } = await supabase
          .from('trips')
          .insert({
            user_id: user.id,
            driver_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Conductor',
            driver_avatar: user.user_metadata?.avatar_url || null,
            direction,
            destination,
            origin: origin.trim(),
            departure_date: departureDate,
            departure_time: departureTime,
            seats_available: Number(seatsAvailable) || 1,
            price_per_seat: pricePerSeat !== '' ? Number(pricePerSeat) : 10000,
            has_4x4: has4x4,
            has_chains: hasChains,
            has_rack: hasRack,
            notes: notes.trim() || null,
            whatsapp_number: cleanPhone,
            instagram_handle: inheritedInstagram,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        savedTrip = insertedData as Trip;
      }

      // Upsert profile data for contact auto-fill on future publishes
      await supabase.from('profiles').upsert({
        id: user.id,
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Conductor',
        avatar_url: user.user_metadata?.avatar_url || null,
        whatsapp_number: cleanPhone,
        ...(inheritedInstagram ? { instagram_handle: inheritedInstagram } : {}),
        updated_at: new Date().toISOString(),
      });

      onTripPublished(savedTrip || undefined);
      onClose();
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : 'Error al guardar el viaje. Intenta nuevamente.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 overscroll-x-none touch-pan-y flex items-center justify-center p-3 sm:p-4 overflow-y-auto z-50 bg-slate-950/70 backdrop-blur-md"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="publish-modal-title"
        className="relative w-full max-w-lg glass-card rounded-3xl shadow-2xl p-4 sm:p-6 my-auto text-white pointer-events-auto border border-white/30 max-h-[85vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/20 shrink-0">
          <div>
            <h2 id="publish-modal-title" className="text-lg sm:text-xl font-black text-white flex items-center gap-2 drop-shadow-xs">
              <Car className="w-5 h-5 text-[#38BDF8]" aria-hidden="true" /> {tripToEdit ? 'Editar Viaje' : 'Publicar Viaje'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="text-slate-300 hover:text-white p-2 rounded-xl bg-white/10 hover:bg-white/20 transition border border-white/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Require Auth State */}
        {!user ? (
          <div className="py-8 text-center space-y-4 flex-1 overflow-y-auto custom-scrollbar">
            <div className="w-12 h-12 rounded-2xl bg-sky-400/20 text-[#38BDF8] mx-auto flex items-center justify-center border border-sky-300/40 shadow-sm backdrop-blur-xs">
              <ShieldCheck className="w-6 h-6 text-[#38BDF8]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Inicia sesión para publicar</h3>
              <p className="text-xs text-slate-200 max-w-xs mx-auto mt-1 font-medium leading-relaxed">
                Por seguridad de la comunidad, necesitamos verificar tu perfil con Google antes de permitir publicaciones.
              </p>
            </div>
            <button
              onClick={handleLoginGoogle}
              className="inline-flex items-center gap-2 bg-[#38BDF8] hover:bg-[#0284C7] text-[#0F2942] hover:text-white font-black text-sm px-5 py-3 rounded-2xl transition shadow-md active:scale-95 cursor-pointer border border-white/40"
            >
              <LogIn className="w-4 h-4" /> Iniciar Sesión con Google
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto overflow-x-hidden max-w-full space-y-4 pt-3 pr-1 sm:pr-2 custom-scrollbar">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs font-bold">
                ⚠️ {error}
              </div>
            )}

            {/* Dirección del Viaje */}
            <div>
              <label className="block text-xs font-black text-white uppercase tracking-wider mb-1.5">
                Tipo de Viaje
              </label>
              <div role="radiogroup" aria-label="Tipo de Viaje" className="grid grid-cols-2 gap-2 min-w-0">
                {[
                  { id: 'SUBIDA', shortLabel: '⬆️ Subida', fullLabel: ' (Santiago ➔ Ski)' },
                  { id: 'BAJADA', shortLabel: '⬇️ Bajada', fullLabel: ' (Ski ➔ Santiago)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={direction === item.id}
                    onClick={() => setDirection(item.id as TripDirection)}
                    className={`py-2.5 px-2 sm:px-3 text-xs font-extrabold rounded-2xl border transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#38BDF8] min-w-0 truncate ${
                      direction === item.id
                        ? 'bg-[#38BDF8] border-white/60 text-[#0F2942] font-black shadow-md scale-[1.02]'
                        : 'bg-white/10 backdrop-blur-md border-white/20 text-slate-200 hover:bg-white/20 hover:border-white/40'
                    }`}
                  >
                    <span>{item.shortLabel}</span>
                    <span className="hidden sm:inline">{item.fullLabel}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Destino y Origen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
              {direction === 'SUBIDA' ? (
                <>
                  <div className="min-w-0">
                    <label htmlFor="publish-origin-subida" className="block text-xs font-bold text-sky-200 mb-1">
                      Punto de Salida
                    </label>
                    <div className="relative min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-[#38BDF8] absolute left-3 top-2.5" aria-hidden="true" />
                      <input
                        id="publish-origin-subida"
                        type="text"
                        placeholder="Ej: Cantagallo, Mall Sport"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="w-full bg-slate-900/60 border border-white/30 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 font-bold min-w-0"
                      />
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {CITY_LOCATION_PRESETS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setOrigin(origin === preset ? '' : preset)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border transition cursor-pointer ${
                            origin === preset
                              ? 'bg-[#38BDF8] border-white/60 text-[#0F2942] shadow-xs'
                              : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/20 hover:text-white'
                          }`}
                        >
                          + {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="publish-destination-subida" className="block text-xs font-bold text-sky-200 mb-1">Destino</label>
                    <select
                      id="publish-destination-subida"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value as SkiResort)}
                      className="w-full bg-slate-900/60 border border-white/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 font-bold cursor-pointer min-w-0"
                    >
                      <option value="FARELLONES" className="bg-[#0F2942] text-white">Farellones</option>
                      <option value="EL_COLORADO" className="bg-[#0F2942] text-white">El Colorado</option>
                      <option value="LA_PARVA" className="bg-[#0F2942] text-white">La Parva</option>
                      <option value="VALLE_NEVADO" className="bg-[#0F2942] text-white">Valle Nevado</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="min-w-0">
                    <label htmlFor="publish-destination-bajada" className="block text-xs font-bold text-sky-200 mb-1">Origen</label>
                    <select
                      id="publish-destination-bajada"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value as SkiResort)}
                      className="w-full bg-slate-900/60 border border-white/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 font-bold cursor-pointer min-w-0"
                    >
                      <option value="FARELLONES" className="bg-[#0F2942] text-white">Farellones</option>
                      <option value="EL_COLORADO" className="bg-[#0F2942] text-white">El Colorado</option>
                      <option value="LA_PARVA" className="bg-[#0F2942] text-white">La Parva</option>
                      <option value="VALLE_NEVADO" className="bg-[#0F2942] text-white">Valle Nevado</option>
                    </select>
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="publish-origin-bajada" className="block text-xs font-bold text-sky-200 mb-1">
                      Destino
                    </label>
                    <div className="relative min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-[#38BDF8] absolute left-3 top-2.5" aria-hidden="true" />
                      <input
                        id="publish-origin-bajada"
                        type="text"
                        placeholder="Ej: Cantagallo, Mall Sport"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="w-full bg-slate-900/60 border border-white/30 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 font-bold min-w-0"
                      />
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {CITY_LOCATION_PRESETS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setOrigin(origin === preset ? '' : preset)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border transition cursor-pointer ${
                            origin === preset
                              ? 'bg-[#38BDF8] border-white/60 text-[#0F2942] shadow-xs'
                              : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/20 hover:text-white'
                          }`}
                        >
                          + {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Fecha y Hora */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 min-w-0">
              <div className="min-w-0">
                <label htmlFor="publish-date" className="block text-xs font-bold text-sky-200 mb-1">Fecha</label>
                <div className="relative min-w-0">
                  <Calendar className="w-3.5 h-3.5 text-[#38BDF8] absolute left-2.5 sm:left-3 top-2.5" aria-hidden="true" />
                  <input
                    id="publish-date"
                    type="date"
                    min={todayStr}
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full bg-slate-900/60 border border-white/30 rounded-xl pl-6 sm:pl-7 pr-1 sm:pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 font-bold min-w-0"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <label htmlFor="publish-time" className="block text-xs font-bold text-sky-200 mb-1">Hora de Salida</label>
                <div className="relative min-w-0">
                  <Clock className="w-3.5 h-3.5 text-[#38BDF8] absolute left-2.5 sm:left-3 top-2.5" aria-hidden="true" />
                  <input
                    id="publish-time"
                    type="time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full bg-slate-900/60 border border-white/30 rounded-xl pl-6 sm:pl-7 pr-1 sm:pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 font-bold min-w-0"
                  />
                </div>
              </div>
            </div>

            {/* Asientos y Precio */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 min-w-0">
              <div className="min-w-0">
                <label htmlFor="publish-seats" className="block text-xs font-bold text-sky-200 mb-1">Asientos</label>
                <div className="relative min-w-0">
                  <Users className="w-3.5 h-3.5 text-[#38BDF8] absolute left-2.5 sm:left-3 top-2.5" aria-hidden="true" />
                  <input
                    id="publish-seats"
                    type="number"
                    min="1"
                    max="8"
                    value={seatsAvailable}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        setSeatsAvailable('');
                      } else {
                        const parsed = parseInt(val, 10);
                        setSeatsAvailable(isNaN(parsed) ? '' : parsed);
                      }
                    }}
                    onBlur={() => {
                      if (seatsAvailable === '' || isNaN(Number(seatsAvailable))) {
                        setSeatsAvailable(1);
                      } else {
                        const num = Number(seatsAvailable);
                        if (num < 1) setSeatsAvailable(1);
                        else if (num > 8) setSeatsAvailable(8);
                        else setSeatsAvailable(num);
                      }
                    }}
                    className="w-full bg-slate-900/60 border border-white/30 rounded-xl pl-6 sm:pl-7 pr-2 sm:pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 font-bold min-w-0"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <label htmlFor="publish-price" className="block text-xs font-bold text-sky-200 mb-1">
                  Precio (CLP)
                </label>
                <div className="relative min-w-0">
                  <DollarSign className="w-3.5 h-3.5 text-[#38BDF8] absolute left-2.5 sm:left-3 top-2.5" aria-hidden="true" />
                  <input
                    id="publish-price"
                    type="number"
                    step="500"
                    min="0"
                    placeholder="10000"
                    value={pricePerSeat}
                    onChange={(e) => setPricePerSeat(e.target.value)}
                    className="w-full bg-slate-900/60 border border-white/30 rounded-xl pl-6 sm:pl-7 pr-2 sm:pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 font-bold min-w-0"
                  />
                </div>
              </div>
            </div>

            {/* Badges de Montaña */}
            <div>
              <label className="block text-xs font-bold text-sky-200 mb-2">Equipamiento y Vehículo</label>
              <div role="group" aria-label="Equipamiento y Vehículo" className="grid grid-cols-3 gap-1.5 sm:gap-2 min-w-0">
                <button
                  type="button"
                  aria-pressed={has4x4}
                  onClick={() => setHas4x4(!has4x4)}
                  className={`py-2 px-1 rounded-xl text-[10px] sm:text-xs font-semibold border flex items-center justify-center gap-0.5 sm:gap-1 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#38BDF8] min-w-0 overflow-hidden ${
                    has4x4
                      ? 'bg-sky-400/25 border-[#38BDF8] text-white font-black shadow-xs'
                      : 'bg-white/10 border-white/20 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {has4x4 && <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-[#38BDF8]" aria-hidden="true" />} <span className="truncate">🚙 4x4 / AWD</span>
                </button>

                <button
                  type="button"
                  aria-pressed={hasChains}
                  onClick={() => setHasChains(!hasChains)}
                  className={`py-2 px-1 rounded-xl text-[10px] sm:text-xs font-semibold border flex items-center justify-center gap-0.5 sm:gap-1 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#38BDF8] min-w-0 overflow-hidden ${
                    hasChains
                      ? 'bg-sky-400/25 border-[#38BDF8] text-white font-black shadow-xs'
                      : 'bg-white/10 border-white/20 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {hasChains && <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-[#38BDF8]" aria-hidden="true" />} <span className="truncate">⛓️ Cadenas</span>
                </button>

                <button
                  type="button"
                  aria-pressed={hasRack}
                  onClick={() => setHasRack(!hasRack)}
                  className={`py-2 px-1 rounded-xl text-[10px] sm:text-xs font-semibold border flex items-center justify-center gap-0.5 sm:gap-1 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#38BDF8] min-w-0 overflow-hidden ${
                    hasRack
                      ? 'bg-sky-400/25 border-[#38BDF8] text-white font-black shadow-xs'
                      : 'bg-white/10 border-white/20 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {hasRack && <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-[#38BDF8]" aria-hidden="true" />} <span className="truncate">🎿 Parrilla</span>
                </button>
              </div>
            </div>

            {/* WhatsApp Number */}
            <div>
              <label htmlFor="publish-whatsapp" className="block text-xs font-bold text-sky-200 mb-1">
                Número de WhatsApp (para coordinar)
              </label>
              <input
                id="publish-whatsapp"
                type="tel"
                placeholder="+56912345678"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full bg-slate-900/60 border border-white/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 font-bold"
              />
            </div>


            {/* Notas opcionales */}
            <div>
              <label htmlFor="publish-notes" className="block text-xs font-bold text-sky-200 mb-1">Notas / Detalles adicionales</label>
              <textarea
                id="publish-notes"
                rows={2}
                placeholder="Ej: Salgo puntual a las 7:00 AM. Espacio para botas en maletero."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-900/60 border border-white/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 font-medium"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#38BDF8] hover:bg-[#0284C7] disabled:opacity-50 text-[#0F2942] hover:text-white font-black text-sm py-3.5 px-4 rounded-2xl shadow-md transition-all duration-200 active:scale-95 cursor-pointer border border-white/40"
              >
                {submitting
                  ? tripToEdit
                    ? 'Guardando cambios...'
                    : 'Publicando viaje...'
                  : tripToEdit
                  ? 'Guardar Cambios'
                  : 'Publicar Viaje'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
