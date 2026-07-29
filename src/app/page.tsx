'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Trip, TripDirection, SkiResort } from '@/types/trip';
import { User } from '@supabase/supabase-js';
import Navbar from '@/components/Navbar';
import TripCard from '@/components/TripCard';
import PublishModal from '@/components/PublishModal';
import PublishSuccessModal from '@/components/PublishSuccessModal';
import TripDetailModal from '@/components/TripDetailModal';
import MyTripsDrawer from '@/components/MyTripsDrawer';
import MountainStatusPill from '@/components/MountainStatusPill';
import { useOnboardingTour } from '@/components/onboarding/useOnboardingTour';
import OnboardingWelcomeModal from '@/components/onboarding/OnboardingWelcomeModal';
import SpotlightTourOverlay from '@/components/onboarding/SpotlightTourOverlay';
import { Mountain, Plus, Sparkles, ArrowUpDown } from 'lucide-react';

export default function Home() {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const onboarding = useOnboardingTour(user);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isMyTripsOpen, setIsMyTripsOpen] = useState(false);
  const [tripToEdit, setTripToEdit] = useState<Trip | null>(null);
  const [recentlyPublishedTrip, setRecentlyPublishedTrip] = useState<Trip | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Helper to format date YYYY-MM-DD
  const getTodayStr = useCallback(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  // Demo trip for tour walkthrough when opening details modal
  const DEMO_TRIP = useMemo<Trip>(() => ({
    id: 'demo-tour-trip',
    user_id: 'demo-driver',
    driver_name: 'Mateo (Conductor)',
    driver_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    whatsapp_number: '+56912345678',
    instagram_handle: 'mateo_skier',
    direction: 'SUBIDA',
    origin: 'Santiago (RM)',
    destination: 'FARELLONES',
    departure_date: getTodayStr(),
    departure_time: '07:30',
    price_per_seat: 8000,
    seats_available: 3,
    has_4x4: true,
    has_chains: true,
    has_rack: true,
    notes: 'Salgo temprano desde Los Domínicos. Llevo porta-skis para 4 pares y cadenas para la cordillera.',
    created_at: new Date().toISOString(),
  }), [getTodayStr]);

  const handleOpenNewPublish = useCallback(() => {
    setTripToEdit(null);
    setIsPublishModalOpen(true);
  }, []);

  // Dynamic tour step change handler to open modals during tour walkthrough
  const handleTourStepChange = useCallback((stepIndex: number) => {
    if (stepIndex === 3) {
      // Step 4 (WhatsApp & Details): Open TripDetailModal
      const targetTrip = trips.length > 0 ? trips[0] : DEMO_TRIP;
      setSelectedTrip(targetTrip);
      setIsPublishModalOpen(false);
    } else if (stepIndex === 4) {
      // Step 5 (Publish Trip): Open PublishModal
      setSelectedTrip(null);
      handleOpenNewPublish();
    } else {
      // Close open tour modals for all other steps
      setSelectedTrip(null);
      setIsPublishModalOpen(false);
    }
  }, [trips, DEMO_TRIP, handleOpenNewPublish]);

  const handleTourClose = useCallback(() => {
    setSelectedTrip(null);
    setIsPublishModalOpen(false);
    onboarding.skipTour();
  }, [onboarding]);

  const handleTourFinish = useCallback(() => {
    setSelectedTrip(null);
    setIsPublishModalOpen(false);
    onboarding.finishTour();
  }, [onboarding]);

  // Filters state (Default date is Today)
  const [selectedDirection, setSelectedDirection] = useState<TripDirection | 'ALL'>('SUBIDA');
  const [selectedResort, setSelectedResort] = useState<SkiResort | 'ALL'>('ALL');
  const [filterDate, setFilterDate] = useState<string>(getTodayStr());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [swapRotation, setSwapRotation] = useState(0);

  // Generate quick dates (5 days: Today, Tomorrow, and next 3 days)
  const quickDates = useMemo(() => {
    const now = new Date();
    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    return [0, 1, 2, 3, 4].map((offset) => {
      const d = new Date(now);
      d.setDate(now.getDate() + offset);

      const tag = offset === 0 ? 'Hoy' : offset === 1 ? 'Mañana' : days[d.getDay()];
      const dayNumber = `${days[d.getDay()]} ${d.getDate()}`;
      const icon = offset === 0 ? '⚡' : offset === 1 ? '☀️' : '🏂';

      return {
        dateStr: formatDate(d),
        tag,
        dayNumber,
        icon,
      };
    });
  }, []);

  // Fetch trips from Supabase
  const fetchTrips = useCallback(async () => {
    try {
      let query = supabase
        .from('trips')
        .select('*')
        .order('departure_date', { ascending: true })
        .order('departure_time', { ascending: true });

      if (selectedDirection !== 'ALL') {
        query = query.eq('direction', selectedDirection);
      }

      if (selectedResort !== 'ALL') {
        query = query.eq('destination', selectedResort);
      }

      if (filterDate) {
        query = query.eq('departure_date', filterDate);
      } else {
        query = query.gte('departure_date', getTodayStr());
      }

      const { data, error } = await query;
      if (error) throw error;
      setTrips(data || []);
    } catch (err) {
      console.error('Error fetching trips:', err);
    } finally {
      setLoading(false);
    }
  }, [supabase, selectedDirection, selectedResort, filterDate, getTodayStr]);

  useEffect(() => {
    const load = async () => {
      await fetchTrips();
    };
    load();
  }, [fetchTrips]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  // Handle shared trip parameter from preview link redirect (?trip=id)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const tripId = params.get('trip');
    if (!tripId) return;

    const fetchSharedTrip = async () => {
      try {
        const { data, error } = await supabase
          .from('trips')
          .select('*')
          .eq('id', tripId)
          .single();
        
        if (error) throw error;
        if (data) {
          setSelectedTrip(data as Trip);
          // Clean the query parameter from URL to keep address bar clean without reloading
          const newUrl = window.location.pathname;
          window.history.replaceState({ path: newUrl }, '', newUrl);
        }
      } catch (err) {
        console.error('Error fetching shared trip from URL param:', err);
      }
    };

    fetchSharedTrip();
  }, [supabase]);

  const handleDeleteTrip = async (tripId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta publicación de viaje?')) return;

    try {
      const { error } = await supabase.from('trips').delete().eq('id', tripId);
      if (error) throw error;
      setTrips((prev) => prev.filter((t) => t.id !== tripId));
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Error al eliminar el viaje.';
      alert(errorMsg);
    }
  };

  // 1-Tap direction swap toggle (Santiago <-> Centro de Ski)
  const toggleDirectionSwap = () => {
    setSwapRotation((prev) => prev + 180);
    if (selectedDirection === 'SUBIDA') {
      setSelectedDirection('BAJADA');
    } else if (selectedDirection === 'BAJADA') {
      setSelectedDirection('SUBIDA');
    } else {
      setSelectedDirection('SUBIDA');
    }
  };

  // Helper render for ski resort selector
  const renderResortDropdown = () => (
    <select
      value={selectedResort}
      onChange={(e) => setSelectedResort(e.target.value as SkiResort | 'ALL')}
      className="bg-white/80 text-[#0F2942] font-bold text-xs sm:text-sm border border-sky-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-sky-200 cursor-pointer w-full mt-1 shadow-xs"
    >
      <option value="ALL">🏔️ Todos los Centros</option>
      <option value="EL_COLORADO">El Colorado</option>
      <option value="LA_PARVA">La Parva</option>
      <option value="VALLE_NEVADO">Valle Nevado</option>
      <option value="FARELLONES">Farellones</option>
    </select>
  );

  return (
    <div className="min-h-screen flex flex-col pb-10 relative bg-[var(--background)] overflow-x-hidden">
      {/* Background Image Container with Responsive Desktop/Mobile switching */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Mobile Background: plomoMobile1.webp */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/plomo/mobile/plomoMobile1.webp"
          alt="Fondo Cerro Plomo Móvil"
          className="block md:hidden absolute inset-0 w-full h-full object-cover object-center opacity-100"
        />
        {/* Desktop Background: plomoDesktop2.webp */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/plomo/desktop/plomoDesktop2.webp"
          alt="Fondo Cerro Plomo Desktop"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center opacity-100"
        />
      </div>

      {/* Navigation */}
      <Navbar
        onRestartTour={onboarding.restartTour}
        onOpenMyTrips={() => setIsMyTripsOpen(true)}
        onProfileUpdated={fetchTrips}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-4 pt-4 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-6 lg:items-start space-y-4 lg:space-y-0">
          
          {/* Left Column / Control Sidebar */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-col lg:sticky lg:top-20 lg:min-h-[calc(100vh-120px)] lg:justify-start lg:gap-4">
              {/* Panel 1: Selector de Ruta Vertical con Animación de Intercambio */}
              <div data-tour="direction-switch" className="glass-card rounded-3xl p-3 lg:p-5 space-y-2.5 lg:space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5 drop-shadow-xs">
                    📍 Ruta de Viaje
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${selectedDirection === 'SUBIDA' ? 'bg-sky-400/20 border-sky-300/40 text-sky-200' : 'bg-blue-500/20 border-blue-300/40 text-blue-200'}`}>
                    {selectedDirection === 'SUBIDA' ? '⬆️ Subida' : selectedDirection === 'BAJADA' ? '⬇️ Bajada' : '🏔️ Todas'}
                  </span>
                </div>

                {/* Origen Box (Arriba) */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 space-y-1">
                  <span className="text-[10px] font-bold text-sky-200/90 uppercase tracking-wider block">
                    📍 Origen (Salida)
                  </span>
                  {selectedDirection === 'SUBIDA' ? (
                    <div className="text-sm font-extrabold text-white flex items-center gap-2 py-1">
                      <span>📍 Santiago (RM)</span>
                    </div>
                  ) : (
                    <div className="space-y-1 pt-0.5">
                      <div className="text-xs font-semibold text-sky-200">🏔️ Centro de Ski</div>
                      {renderResortDropdown()}
                    </div>
                  )}
                </div>

                {/* Central Swap Divider & Animated Button */}
                <div className="relative flex items-center justify-center my-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/30"></div>
                  </div>
                  <button
                    onClick={toggleDirectionSwap}
                    title="Intercambiar Origen y Destino"
                    className="relative z-10 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white hover:text-sky-200 border border-white/40 shadow-md backdrop-blur-md transition-all duration-300 active:scale-90 cursor-pointer group"
                  >
                    <ArrowUpDown
                      className="w-4 h-4 text-white group-hover:text-sky-200 transition-transform duration-500 ease-in-out"
                      style={{ transform: `rotate(${swapRotation}deg)` }}
                    />
                  </button>
                </div>

                {/* Destino Box (Abajo) */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 space-y-1">
                  <span className="text-[10px] font-bold text-sky-200/90 uppercase tracking-wider block">
                    🏔️ Destino (Llegada)
                  </span>
                  {selectedDirection === 'SUBIDA' ? (
                    <div className="space-y-1 pt-0.5">
                      <div className="text-xs font-semibold text-sky-200">🏔️ Centro de Ski</div>
                      {renderResortDropdown()}
                    </div>
                  ) : (
                    <div className="text-sm font-extrabold text-white flex items-center gap-2 py-1">
                      <span>📍 Santiago (RM)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Panel 2: Botón Destacado de Publicar Viaje (Conductor) */}
              <div className="glass-card rounded-3xl p-3 lg:p-5 space-y-2.5 lg:space-y-3.5">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span className="flex items-center gap-1.5 text-white font-black">
                    <Sparkles className="w-4 h-4 text-[#38BDF8]" /> ¿Conduces a la cordillera?
                  </span>
                  <span className="text-[10px] bg-sky-400/20 text-sky-200 px-2.5 py-0.5 rounded-full border border-sky-300/40 font-extrabold">
                    $0 costo
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium hidden lg:block">
                  Publica tus asientos libres en 30 segundos y comparte gastos de combustible y peajes con esquiadores de la comunidad.
                </p>
                <button
                  data-tour="publish-btn"
                  onClick={handleOpenNewPublish}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#38BDF8] hover:bg-[#0284C7] text-[#0F2942] hover:text-white font-black text-sm py-3.5 px-4 rounded-2xl shadow-md transition-all duration-200 cursor-pointer active:scale-95 border border-white/40 group"
                >
                  <Plus className="w-5 h-5 stroke-[3] text-[#0F2942] group-hover:text-white transition-colors" />
                  <span>Publicar Mi Viaje</span>
                </button>
              </div>
            </div>

            {/* Panel 3: Estado Ruta G-21 & Clima Cordillerano (Desktop sidebar only when trips > 2) */}
            {trips.length > 2 && (
              <div className="pt-2 hidden lg:block">
                <MountainStatusPill isSidebar={true} />
              </div>
            )}
          </aside>

          {/* Right Column / Trips List & Filters (Pasajero) */}
          <section className="lg:col-span-8 space-y-3">
            {/* Header de la Sección & Tira de Calendario de Montaña (High Engagement Date Strip) */}
            <div className="glass-card rounded-3xl p-3 sm:p-4 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <span>🔍 Viajes Disponibles ({trips.length})</span>
                </span>
                {filterDate && (
                  <button
                    onClick={() => setFilterDate('')}
                    className="text-[10px] font-semibold text-sky-200 hover:text-white transition cursor-pointer underline"
                  >
                    Ver todas las fechas
                  </button>
                )}
              </div>

              {/* Tira de Mini-Tarjetas de Fecha */}
              <div data-tour="date-filters" className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 px-0.5">
                {/* Micro-Card 1: Todos los Días */}
                <button
                  onClick={() => {
                    setFilterDate('');
                    setShowDatePicker(false);
                  }}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl min-w-[78px] sm:min-w-[86px] transition-all duration-300 cursor-pointer border ${
                    filterDate === '' && !showDatePicker
                      ? 'bg-[#38BDF8] text-[#0F2942] font-black shadow-md scale-105 border-white/60'
                      : 'bg-white/10 backdrop-blur-md border-white/20 text-slate-100 hover:bg-white/20 hover:border-white/40'
                  }`}
                >
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Todas</span>
                  <span className="text-xs font-black mt-0.5">🏔️ Rutas</span>
                  <span className={`text-[9px] mt-0.5 font-bold ${filterDate === '' && !showDatePicker ? 'text-[#0F2942] font-black' : 'text-sky-200'}`}>
                    Ver todo
                  </span>
                </button>

                {/* Micro-Cards de Días */}
                {quickDates.map((item) => {
                  const isSelected = filterDate === item.dateStr && !showDatePicker;
                  return (
                    <button
                      key={item.dateStr}
                      onClick={() => {
                        setFilterDate(item.dateStr);
                        setShowDatePicker(false);
                      }}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-2xl min-w-[78px] sm:min-w-[86px] transition-all duration-300 cursor-pointer border ${
                        isSelected
                          ? 'bg-[#38BDF8] text-[#0F2942] font-black shadow-md scale-105 border-white/60'
                          : 'bg-white/10 backdrop-blur-md border-white/20 text-slate-100 hover:bg-white/20 hover:border-white/40'
                      }`}
                    >
                      <span className="text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-0.5">
                        <span>{item.icon}</span> {item.tag}
                      </span>
                      <span className="text-xs font-black mt-0.5">{item.dayNumber}</span>
                      <span className={`text-[9px] mt-0.5 font-bold ${isSelected ? 'text-[#0F2942] font-extrabold' : 'text-sky-200'}`}>
                        {isSelected ? 'Seleccionado' : 'Disponible'}
                      </span>
                    </button>
                  );
                })}

                {/* Micro-Card: Elegir Fecha Personalizada */}
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl min-w-[78px] sm:min-w-[86px] transition-all duration-300 cursor-pointer border ${
                    showDatePicker || (filterDate && !quickDates.some((q) => q.dateStr === filterDate))
                      ? 'bg-[#0284C7] text-white font-black shadow-md scale-105 border-white/60'
                      : 'bg-white/10 backdrop-blur-md border-white/20 text-slate-100 hover:bg-white/20 hover:border-white/40'
                  }`}
                >
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">📅 Más</span>
                  <span className="text-xs font-black mt-0.5">Fecha</span>
                  <span className={`text-[9px] mt-0.5 font-bold ${showDatePicker || (filterDate && !quickDates.some((q) => q.dateStr === filterDate)) ? 'text-sky-100' : 'text-slate-300'}`}>
                    Calendario
                  </span>
                </button>
              </div>

              {/* Custom Date Input expander */}
              {showDatePicker && (
                <div className="p-3 bg-slate-900/60 backdrop-blur-md border border-white/30 rounded-2xl flex items-center gap-3 mt-2 animate-fadeIn shadow-sm text-white">
                  <span className="text-xs font-bold text-white">Seleccionar fecha específica:</span>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="bg-slate-800/80 border border-white/30 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#38BDF8] font-bold"
                  />
                  <button
                    onClick={() => {
                      setFilterDate('');
                      setShowDatePicker(false);
                    }}
                    className="text-xs text-slate-300 hover:text-rose-400 underline cursor-pointer"
                  >
                    Limpiar
                  </button>
                </div>
              )}
            </div>

            {/* Parrilla de Viajes */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-44 glass-card rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : trips.length === 0 && !onboarding.isTourActive ? (
              <div className="glass-card rounded-2xl p-8 text-center space-y-3 border border-white/30">
                <Mountain className="w-10 h-10 text-[#38BDF8] mx-auto" />
                <h3 className="text-sm font-bold text-white">No hay viajes disponibles para este dia</h3>
                <p className="text-xs text-slate-200 max-w-sm mx-auto font-medium">
                  Sé el primero en publicar tus cupos libres para compartir los gastos de bencina.
                </p>
                <button
                  onClick={handleOpenNewPublish}
                  className="inline-flex items-center gap-2 bg-[#38BDF8] hover:bg-[#0284C7] text-[#0F2942] hover:text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition cursor-pointer border border-white/40"
                >
                  <Plus className="w-4 h-4" /> Publicar Viaje
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {trips.length === 0 && onboarding.isTourActive && (
                  <div className="glass-card rounded-2xl p-3 text-center border border-white/30">
                    <div className="flex items-center justify-center gap-2 text-sky-200 text-xs font-bold">
                      <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                      <span>Modo Tutorial: Mostrando viaje de ejemplo</span>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(trips.length > 0 ? trips : [DEMO_TRIP]).map((trip) => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      currentUser={user}
                      onDeleteTrip={handleDeleteTrip}
                      onSelectTrip={(t) => setSelectedTrip(t)}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Mobile: Estado Ruta G-21 siempre al final (debajo de Viajes Disponibles) */}
        <div className="mt-8 block lg:hidden">
          <MountainStatusPill isSidebar={false} />
        </div>

        {/* Desktop: Estado Ruta G-21 wide card solo cuando hay pocos viajes (≤2), ya que con más va en el sidebar */}
        {trips.length <= 2 && (
          <div className="mt-8 hidden lg:block">
            <MountainStatusPill isSidebar={false} />
          </div>
        )}
      </main>

      {/* Publish Modal with defaults pre-filled */}
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => {
          setIsPublishModalOpen(false);
          setTripToEdit(null);
        }}
        user={user}
        onTripPublished={(publishedTrip) => {
          fetchTrips();
          setTripToEdit(null);
          if (publishedTrip) {
            setRecentlyPublishedTrip(publishedTrip);
            setIsSuccessModalOpen(true);
          }
        }}
        defaultDirection={selectedDirection === 'ALL' ? 'SUBIDA' : selectedDirection}
        defaultDestination={selectedResort === 'ALL' ? 'FARELLONES' : selectedResort}
        defaultDate={filterDate}
        isTourActive={onboarding.isTourActive}
        tripToEdit={tripToEdit}
      />

      {/* Publish Success Modal (WhatsApp Group Invite & Share) */}
      <PublishSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        trip={recentlyPublishedTrip}
      />

      {/* My Trips Drawer */}
      <MyTripsDrawer
        isOpen={isMyTripsOpen}
        onClose={() => setIsMyTripsOpen(false)}
        user={user}
        onEditTrip={(trip) => {
          setTripToEdit(trip);
          setIsPublishModalOpen(true);
        }}
        onTripUpdated={fetchTrips}
      />

      {/* Trip Detail Modal (Opción B) */}
      <TripDetailModal
        isOpen={!!selectedTrip}
        onClose={() => setSelectedTrip(null)}
        trip={selectedTrip}
        currentUser={user}
        onDeleteTrip={handleDeleteTrip}
        isTourActive={onboarding.isTourActive}
      />

      {/* Onboarding Welcome Prompt (First Login) */}
      <OnboardingWelcomeModal
        isOpen={onboarding.showWelcomeModal}
        onStartTour={onboarding.startTour}
        onSkip={handleTourClose}
        userName={user?.user_metadata?.full_name || user?.email}
      />

      {/* Spotlight Tour Overlay */}
      <SpotlightTourOverlay
        isActive={onboarding.isTourActive}
        currentStep={onboarding.currentStep}
        onNext={onboarding.nextStep}
        onPrev={onboarding.prevStep}
        onSkip={handleTourClose}
        onFinish={handleTourFinish}
        isCompleted={onboarding.isCompleted}
        onCloseCompleted={onboarding.closeCompletionModal}
        onStepChange={handleTourStepChange}
      />
    </div>
  );
}
