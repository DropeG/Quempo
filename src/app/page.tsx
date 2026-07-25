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
    <select
      value={selectedResort}
      onChange={(e) => setSelectedResort(e.target.value as any)}
      className="bg-slate-950/90 text-emerald-300 font-bold text-xs border border-emerald-500/40 rounded-md px-1.5 py-0.5 focus:outline-none focus:border-emerald-400 cursor-pointer"
    >
      <option value="ALL">🏔️ Todos</option>
      <option value="EL_COLORADO">El Colorado</option>
      <option value="LA_PARVA">La Parva</option>
      <option value="VALLE_NEVADO">Valle Nevado</option>
      <option value="FARELLONES">Farellones</option>
    </select>
  );

  return (
    <div className="min-h-screen flex flex-col pb-28 sm:pb-20 relative">
      {/* Navigation */}
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-4 pt-3 space-y-3">
        {/* Barra de Control Unificada Compacta (Ruta 1-Tap + Fechas en 1 solo panel) */}
        <section className="glass-card rounded-2xl p-2.5 sm:p-3 space-y-2 border border-emerald-500/20 shadow-xl">
          {/* Fila 1: Selector de Sentido 1-Tap */}
          <div className="flex items-center justify-between gap-2 bg-zinc-950/90 p-1.5 rounded-xl border border-zinc-800">
            {/* Origen */}
            <div className="flex-1 text-center py-1 px-2 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-center gap-1.5 min-h-[38px]">
              <span className="text-[10px] text-zinc-400 uppercase font-medium">Origen:</span>
              {selectedDirection === 'SUBIDA' ? (
                <span className="text-xs font-bold text-white">📍 Santiago</span>
              ) : selectedDirection === 'BAJADA' ? (
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-amber-300">🏔️ Centro</span>
                  {renderResortDropdown()}
                </div>
              ) : (
                <span className="text-xs font-bold text-zinc-200">Santiago / Centro</span>
              )}
            </div>

            {/* Switch 1-Tap */}
            <button
              onClick={toggleDirectionSwap}
              title="Cambiar sentido (Subida ⬆️ / Bajada ⬇️)"
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white border border-emerald-500/40 shadow-sm transition-transform active:scale-90 cursor-pointer"
            >
              <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
            </button>

            {/* Destino */}
            <div className="flex-1 text-center py-1 px-2 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-center gap-1.5 min-h-[38px]">
              <span className="text-[10px] text-zinc-400 uppercase font-medium">Destino:</span>
              {selectedDirection === 'SUBIDA' ? (
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-emerald-400">🏔️ Centro</span>
                  {renderResortDropdown()}
                </div>
              ) : selectedDirection === 'BAJADA' ? (
                <span className="text-xs font-bold text-white">📍 Santiago</span>
              ) : (
                <span className="text-xs font-bold text-zinc-200">Centro / Santiago</span>
              )}
            </div>
          </div>

          {/* Fila 2: Chips de Fecha Rápida */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-0.5">
            <button
              onClick={() => {
                setFilterDate('');
                setShowDatePicker(false);
              }}
              className={`px-3 py-1 rounded-xl text-[11px] font-semibold whitespace-nowrap transition cursor-pointer ${
                filterDate === '' && !showDatePicker
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              Todos los días
            </button>

            {quickDates.map((item) => {
              const isSelected = filterDate === item.dateStr;
              return (
                <button
                  key={item.dateStr}
                  onClick={() => {
                    setFilterDate(item.dateStr);
                    setShowDatePicker(false);
                  }}
                  className={`px-3 py-1 rounded-xl text-[11px] font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1 ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  {item.label}
                </button>
              );
            })}

            <div className="relative">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className={`px-3 py-1 rounded-xl text-[11px] font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1 ${
                  showDatePicker || (filterDate && !quickDates.some((q) => q.dateStr === filterDate))
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <CalendarIcon className="w-3 h-3" />
                {filterDate && !quickDates.some((q) => q.dateStr === filterDate)
                  ? filterDate
                  : '📅 Más'}
              </button>
            </div>
          </div>

          {/* Custom Date Input expander */}
          {showDatePicker && (
            <div className="p-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3">
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-emerald-500"
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

        {/* Trips Grid / List - Alta Densidad (3 columnas en Desktop, compacto en mobile) */}
        <section className="pt-1">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Viajes Disponibles ({trips.length})
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

      {/* Floating Action Button (FAB) de Publicar Viaje - Destacado al 100%, Flotando al alcance del pulgar */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xs">
        <button
          onClick={() => setIsPublishModalOpen(true)}
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-slate-950 font-black text-sm py-3.5 px-5 rounded-full shadow-2xl shadow-emerald-500/50 border border-emerald-300/60 hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-emerald-500/20"
        >
          <Plus className="w-5 h-5 stroke-[3]" />
          <span>Publicar Viaje</span>
          <span className="bg-slate-950/15 text-slate-900 text-[10px] uppercase font-black px-2 py-0.5 rounded-full ml-1 border border-slate-950/10">
            $0 costo
          </span>
        </button>
      </div>



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
