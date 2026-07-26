'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Trip, TripDirection, SkiResort } from '@/types/trip';
import { User } from '@supabase/supabase-js';
import Navbar from '@/components/Navbar';
import TripCard from '@/components/TripCard';
import PublishModal from '@/components/PublishModal';
import TripDetailModal from '@/components/TripDetailModal';
import { Mountain, Plus, Sparkles, ArrowUpDown, Calendar as CalendarIcon, Check, Info } from 'lucide-react';

export default function Home() {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  // Helper to format date YYYY-MM-DD
  const getTodayStr = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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

      let tag = offset === 0 ? 'Hoy' : offset === 1 ? 'Mañana' : days[d.getDay()];
      let dayNumber = `${days[d.getDay()]} ${d.getDate()}`;
      let icon = offset === 0 ? '⚡' : offset === 1 ? '☀️' : '🏂';

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
    setLoading(true);
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
      }

      const { data, error } = await query;
      if (error) throw error;
      setTrips(data || []);
    } catch (err) {
      console.error('Error fetching trips:', err);
    } finally {
      setLoading(false);
    }
  }, [supabase, selectedDirection, selectedResort, filterDate]);

  useEffect(() => {
    // Check current user session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleDeleteTrip = async (tripId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta publicación de viaje?')) return;

    try {
      const { error } = await supabase.from('trips').delete().eq('id', tripId);
      if (error) throw error;
      setTrips((prev) => prev.filter((t) => t.id !== tripId));
    } catch (err: any) {
      alert(err.message || 'Error al eliminar el viaje.');
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
      onChange={(e) => setSelectedResort(e.target.value as any)}
      className="bg-slate-950/90 text-emerald-300 font-bold text-xs sm:text-sm border border-emerald-500/40 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-emerald-400 cursor-pointer w-full mt-1"
    >
      <option value="ALL">🏔️ Todos los Centros</option>
      <option value="EL_COLORADO">El Colorado</option>
      <option value="LA_PARVA">La Parva</option>
      <option value="VALLE_NEVADO">Valle Nevado</option>
      <option value="FARELLONES">Farellones</option>
    </select>
  );

  return (
    <div className="min-h-screen flex flex-col pb-10 relative">
      {/* Navigation */}
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-4 pt-3">
        <div className="lg:grid lg:grid-cols-12 lg:gap-6 lg:items-start space-y-4 lg:space-y-0">
          
          {/* Left Column / Control Sidebar (Sticky in Desktop) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-20 space-y-4">
            {/* Panel 1: Selector de Ruta Vertical con Animación de Intercambio */}
            <div className="glass-card rounded-3xl p-4 border border-emerald-500/30 shadow-xl space-y-3 bg-slate-950/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  📍 Ruta de Viaje
                </span>
                <span className="text-[10px] font-semibold text-zinc-300 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">
                  {selectedDirection === 'SUBIDA' ? '⬆️ Subida' : '⬇️ Bajada'}
                </span>
              </div>

              {/* Origen Box (Arriba) */}
              <div className="bg-zinc-900/90 rounded-2xl p-3 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  📍 Origen (Salida)
                </span>
                {selectedDirection === 'SUBIDA' ? (
                  <div className="text-sm font-extrabold text-white flex items-center gap-2 py-1">
                    <span>📍 Santiago (RM)</span>
                  </div>
                ) : (
                  <div className="space-y-1 pt-0.5">
                    <div className="text-xs font-semibold text-amber-300">🏔️ Centro de Ski</div>
                    {renderResortDropdown()}
                  </div>
                )}
              </div>

              {/* Central Swap Divider & Animated Button */}
              <div className="relative flex items-center justify-center my-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800/80"></div>
                </div>
                <button
                  onClick={toggleDirectionSwap}
                  title="Intercambiar Origen y Destino"
                  className="relative z-10 p-2.5 rounded-full bg-zinc-800 hover:bg-emerald-500 text-white hover:text-slate-950 border border-emerald-500/40 shadow-lg transition-all duration-300 active:scale-90 cursor-pointer group ring-2 ring-emerald-500/20"
                >
                  <ArrowUpDown
                    className="w-4 h-4 text-emerald-400 group-hover:text-slate-950 transition-transform duration-500 ease-in-out"
                    style={{ transform: `rotate(${swapRotation}deg)` }}
                  />
                </button>
              </div>

              {/* Destino Box (Abajo) */}
              <div className="bg-zinc-900/90 rounded-2xl p-3 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  🏔️ Destino (Llegada)
                </span>
                {selectedDirection === 'SUBIDA' ? (
                  <div className="space-y-1 pt-0.5">
                    <div className="text-xs font-semibold text-emerald-400">🏔️ Centro de Ski</div>
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
            <div className="glass-card rounded-3xl p-4 border border-emerald-500/30 shadow-xl bg-gradient-to-br from-emerald-950/40 via-zinc-900/90 to-zinc-950 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-200">
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <Sparkles className="w-4 h-4 text-emerald-400" /> ¿Conduces a la cordillera?
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-extrabold">
                  $0 costo
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Publica tus asientos libres en 30 segundos y comparte gastos de combustible y peajes con esquiadores de la comunidad.
              </p>
              <button
                onClick={() => setIsPublishModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-slate-950 font-black text-sm py-3.5 px-4 rounded-2xl shadow-lg shadow-emerald-500/25 border border-emerald-300/60 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer ring-2 ring-emerald-500/30"
              >
                <Plus className="w-5 h-5 stroke-[3]" />
                <span>Publicar Mi Viaje</span>
              </button>
            </div>
          </aside>

          {/* Right Column / Trips List & Filters (Pasajero) */}
          <section className="lg:col-span-8 space-y-3">
            {/* Header de la Sección & Tira de Calendario de Montaña (High Engagement Date Strip) */}
            <div className="glass-card rounded-3xl p-3 sm:p-4 border border-emerald-500/20 shadow-xl space-y-3 bg-slate-950/80">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <span>🔍 Viajes Disponibles ({trips.length})</span>
                </span>
                {filterDate && (
                  <button
                    onClick={() => setFilterDate('')}
                    className="text-[10px] font-semibold text-zinc-400 hover:text-emerald-400 transition cursor-pointer underline"
                  >
                    Ver todas las fechas
                  </button>
                )}
              </div>

              {/* Tira de Mini-Tarjetas de Fecha */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 px-0.5">
                {/* Micro-Card 1: Todos los Días */}
                <button
                  onClick={() => {
                    setFilterDate('');
                    setShowDatePicker(false);
                  }}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl min-w-[78px] sm:min-w-[86px] transition-all duration-300 cursor-pointer border ${
                    filterDate === '' && !showDatePicker
                      ? 'bg-gradient-to-br from-emerald-400 via-teal-300 to-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-500/30 scale-105 border-emerald-300 ring-2 ring-emerald-400/40'
                      : 'bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Todas</span>
                  <span className="text-xs font-black mt-0.5">🏔️ Rutas</span>
                  <span className={`text-[9px] mt-0.5 font-bold ${filterDate === '' && !showDatePicker ? 'text-slate-950' : 'text-emerald-400'}`}>
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
                          ? 'bg-gradient-to-br from-emerald-400 via-teal-300 to-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-500/30 scale-105 border-emerald-300 ring-2 ring-emerald-400/40'
                          : 'bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-0.5">
                        <span>{item.icon}</span> {item.tag}
                      </span>
                      <span className="text-xs font-black mt-0.5">{item.dayNumber}</span>
                      <span className={`text-[9px] mt-0.5 font-bold ${isSelected ? 'text-slate-950 font-extrabold' : 'text-emerald-400'}`}>
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
                      ? 'bg-gradient-to-br from-emerald-400 via-teal-300 to-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-500/30 scale-105 border-emerald-300 ring-2 ring-emerald-400/40'
                      : 'bg-zinc-900/90 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">📅 Más</span>
                  <span className="text-xs font-black mt-0.5">Fecha</span>
                  <span className={`text-[9px] mt-0.5 font-bold ${showDatePicker || (filterDate && !quickDates.some((q) => q.dateStr === filterDate)) ? 'text-slate-950' : 'text-zinc-500'}`}>
                    Calendario
                  </span>
                </button>
              </div>

              {/* Custom Date Input expander */}
              {showDatePicker && (
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center gap-3 mt-2 animate-fadeIn">
                  <span className="text-xs font-bold text-zinc-300">Seleccionar fecha específica:</span>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-400 font-bold"
                  />
                  <button
                    onClick={() => {
                      setFilterDate('');
                      setShowDatePicker(false);
                    }}
                    className="text-xs text-zinc-400 hover:text-rose-400 underline cursor-pointer"
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
            ) : trips.length === 0 ? (
              <div className="glass-card rounded-2xl p-8 text-center space-y-3 border border-slate-800">
                <Mountain className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-sm font-semibold text-white">No hay viajes disponibles para este filtro</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Sé el primero en publicar tus cupos libres para compartir los gastos de bencina.
                </p>
                <button
                  onClick={() => setIsPublishModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/25 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Publicar Viaje
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {trips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    currentUser={user}
                    onDeleteTrip={handleDeleteTrip}
                    onSelectTrip={(t) => setSelectedTrip(t)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Publish Modal with defaults pre-filled */}
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        user={user}
        onTripPublished={fetchTrips}
        defaultDirection={selectedDirection === 'ALL' ? 'SUBIDA' : selectedDirection}
        defaultDestination={selectedResort === 'ALL' ? 'FARELLONES' : selectedResort}
        defaultDate={filterDate}
      />

      {/* Trip Detail Modal (Opción B) */}
      <TripDetailModal
        isOpen={!!selectedTrip}
        onClose={() => setSelectedTrip(null)}
        trip={selectedTrip}
        currentUser={user}
        onDeleteTrip={handleDeleteTrip}
      />
    </div>
  );
}
