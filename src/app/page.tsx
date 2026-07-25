'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Trip, TripDirection, SkiResort } from '@/types/trip';
import { User } from '@supabase/supabase-js';
import Navbar from '@/components/Navbar';
import TripCard from '@/components/TripCard';
import PublishModal from '@/components/PublishModal';
import { Mountain, Plus, Sparkles, ArrowRightLeft, Calendar as CalendarIcon, Check } from 'lucide-react';

export default function Home() {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Filters state
  const [selectedDirection, setSelectedDirection] = useState<TripDirection | 'ALL'>('SUBIDA');
  const [selectedResort, setSelectedResort] = useState<SkiResort | 'ALL'>('ALL');
  const [filterDate, setFilterDate] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Generate quick dates (Today, Tomorrow, Day after)
  const quickDates = useMemo(() => {
    const now = new Date();
    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    const getDayLabel = (d: Date, tag: string) => {
      return `${tag} ${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
    };

    const d1 = new Date(now);
    const d2 = new Date(now);
    d2.setDate(now.getDate() + 1);
    const d3 = new Date(now);
    d3.setDate(now.getDate() + 2);

    return [
      { dateStr: formatDate(d1), label: getDayLabel(d1, 'Hoy') },
      { dateStr: formatDate(d2), label: getDayLabel(d2, 'Mañana') },
      { dateStr: formatDate(d3), label: getDayLabel(d3, days[d3.getDay()]) },
    ];
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
    <div className="mt-1">
      <select
        value={selectedResort}
        onChange={(e) => setSelectedResort(e.target.value as any)}
        className="w-full bg-slate-950/90 text-emerald-300 font-bold text-xs sm:text-sm border border-emerald-500/40 rounded-lg px-2 py-1 focus:outline-none focus:border-emerald-400 cursor-pointer text-center"
      >
        <option value="ALL">🏔️ Todos los Centros</option>
        <option value="EL_COLORADO">El Colorado</option>
        <option value="LA_PARVA">La Parva</option>
        <option value="VALLE_NEVADO">Valle Nevado</option>
        <option value="FARELLONES">Farellones</option>
      </select>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col pb-24 sm:pb-12">
      {/* Navigation */}
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 pt-6 space-y-6">
        {/* Hero Header Minimalista */}
        <section className="text-center py-4 sm:py-6 space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
            Sube y baja de la cordillera <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              sin complicaciones
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-md mx-auto drop-shadow-sm">
            Encuentra y comparte viajes a Farellones, El Colorado, La Parva y Valle Nevado en segundos.
          </p>
        </section>

        {/* Botón Principal Destacado de Publicar Viaje */}
        <div>
          <button
            onClick={() => setIsPublishModalOpen(true)}
            className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base sm:text-lg py-4 px-6 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-emerald-400/40"
          >
            <Plus className="w-6 h-6 stroke-[3]" />
            <span>Publicar Viaje</span>
          </button>
        </div>

        {/* Selector de Sentido de Ruta 1-Tap */}
        <section className="glass-card rounded-3xl p-4 sm:p-5 space-y-3 border border-emerald-500/20 shadow-2xl">
          <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest text-center">
            Sentido de la Ruta
          </div>

          <div className="flex items-center justify-between gap-2 sm:gap-4 bg-zinc-950/90 p-2 sm:p-3 rounded-2xl border border-zinc-800">
            {/* Origen */}
            <div className="flex-1 text-center py-2.5 px-3 rounded-xl bg-zinc-900/90 border border-zinc-800 min-h-[72px] flex flex-col justify-center">
              <span className="text-[10px] text-zinc-400 block uppercase font-medium">Origen</span>
              {selectedDirection === 'SUBIDA' ? (
                <span className="text-sm sm:text-base font-bold text-white mt-0.5">📍 Santiago</span>
              ) : selectedDirection === 'BAJADA' ? (
                <div>
                  <span className="text-xs font-semibold text-amber-300 block">🏔️ Centro de Ski</span>
                  {renderResortDropdown()}
                </div>
              ) : (
                <span className="text-xs font-bold text-zinc-200 mt-0.5">Santiago / Centro</span>
              )}
            </div>

            {/* Switch 1-Tap */}
            <button
              onClick={toggleDirectionSwap}
              title="Cambiar sentido (Subida ⬆️ / Bajada ⬇️)"
              className="p-3.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white border border-emerald-500/40 shadow-md transition-transform active:scale-90 cursor-pointer"
            >
              <ArrowRightLeft className="w-5 h-5 text-emerald-400" />
            </button>

            {/* Destino */}
            <div className="flex-1 text-center py-2.5 px-3 rounded-xl bg-zinc-900/90 border border-zinc-800 min-h-[72px] flex flex-col justify-center">
              <span className="text-[10px] text-zinc-400 block uppercase font-medium">Destino</span>
              {selectedDirection === 'SUBIDA' ? (
                <div>
                  <span className="text-xs font-semibold text-emerald-400 block">🏔️ Centro de Ski</span>
                  {renderResortDropdown()}
                </div>
              ) : selectedDirection === 'BAJADA' ? (
                <span className="text-sm sm:text-base font-bold text-white mt-0.5">📍 Santiago</span>
              ) : (
                <span className="text-xs font-bold text-zinc-200 mt-0.5">Centro / Santiago</span>
              )}
            </div>
          </div>
        </section>

        {/* QUICK DATE CHIPS */}
        <section className="space-y-2">
          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-1">
            Fecha del viaje
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {/* All dates chip */}
            <button
              onClick={() => {
                setFilterDate('');
                setShowDatePicker(false);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                filterDate === '' && !showDatePicker
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md border border-emerald-400'
                  : 'bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              Todos los días
            </button>

            {/* Quick date chips */}
            {quickDates.map((item) => {
              const isSelected = filterDate === item.dateStr;
              return (
                <button
                  key={item.dateStr}
                  onClick={() => {
                    setFilterDate(item.dateStr);
                    setShowDatePicker(false);
                  }}
                  className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md border border-emerald-400'
                      : 'bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  {item.label}
                </button>
              );
            })}

            {/* Custom Datepicker button */}
            <div className="relative">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  showDatePicker || (filterDate && !quickDates.some((q) => q.dateStr === filterDate))
                    ? 'bg-emerald-500 text-slate-950 font-bold border border-emerald-400'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                {filterDate && !quickDates.some((q) => q.dateStr === filterDate)
                  ? filterDate
                  : '📅 Más'}
              </button>
            </div>
          </div>

          {/* Custom Date Input expander */}
          {showDatePicker && (
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => {
                  setFilterDate('');
                  setShowDatePicker(false);
                }}
                className="text-xs text-slate-400 hover:text-rose-400 underline"
              >
                Limpiar fecha
              </button>
            </div>
          )}
        </section>

        {/* Trips Grid / List */}
        <section className="space-y-4 pt-2">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-56 glass-card rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : trips.length === 0 ? (
            <div className="glass-card rounded-2xl p-10 text-center space-y-3 border border-slate-800">
              <Mountain className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-semibold text-white">No hay viajes disponibles para este filtro</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Publica tus cupos libres para compartir los gastos de bencina y subir acompañado.
              </p>
              <button
                onClick={() => setIsPublishModalOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-emerald-500/25 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Publicar Viaje
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  currentUser={user}
                  onDeleteTrip={handleDeleteTrip}
                />
              ))}
            </div>
          )}
        </section>
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
    </div>
  );
}
