'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { Trip } from '@/types/trip';
import { X, Car, Calendar, Clock, MapPin, DollarSign, Users, Trash2, Edit3, Plus, Minus, Loader2, AlertCircle } from 'lucide-react';

interface MyTripsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onEditTrip: (trip: Trip) => void;
  onTripUpdated: () => void;
}

export default function MyTripsDrawer({
  isOpen,
  onClose,
  user,
  onEditTrip,
  onTripUpdated,
}: MyTripsDrawerProps) {
  const supabase = createClient();

  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingTripId, setDeletingTripId] = useState<string | null>(null);
  const [updatingSeatsId, setUpdatingSeatsId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const todayStr = (() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  })();

  const fetchMyTrips = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setErrorMessage('');

    try {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('user_id', user.id)
        .order('departure_date', { ascending: false })
        .order('departure_time', { ascending: false });

      if (error) throw error;
      setTrips(data || []);
    } catch (err) {
      console.error('Error fetching my trips:', err);
      setErrorMessage('No se pudieron cargar tus viajes.');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    if (isOpen && user) {
      fetchMyTrips();
    }
  }, [isOpen, user, fetchMyTrips]);

  if (!isOpen || !user) return null;

  const activeTrips = trips.filter((t) => t.departure_date >= todayStr);
  const pastTrips = trips.filter((t) => t.departure_date < todayStr);

  const handleUpdateSeats = async (trip: Trip, delta: number) => {
    const newSeats = trip.seats_available + delta;
    if (newSeats < 0 || newSeats > 8) return;

    setUpdatingSeatsId(trip.id);
    try {
      const { error } = await supabase
        .from('trips')
        .update({ seats_available: newSeats })
        .eq('id', trip.id)
        .eq('user_id', user.id);

      if (error) throw error;

      setTrips((prev) =>
        prev.map((t) => (t.id === trip.id ? { ...t, seats_available: newSeats } : t))
      );
      onTripUpdated();
    } catch (err) {
      console.error('Error updating seats:', err);
      setErrorMessage('No se pudieron actualizar los cupos.');
    } finally {
      setUpdatingSeatsId(null);
    }
  };

  const handleDeleteTrip = async (tripId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este viaje publicado?')) return;

    setDeletingTripId(tripId);
    try {
      const { error } = await supabase
        .from('trips')
        .delete()
        .eq('id', tripId)
        .eq('user_id', user.id);

      if (error) throw error;

      setTrips((prev) => prev.filter((t) => t.id !== tripId));
      onTripUpdated();
    } catch (err) {
      console.error('Error deleting trip:', err);
      setErrorMessage('No se pudo eliminar el viaje.');
    } finally {
      setDeletingTripId(null);
    }
  };

  const formatResortName = (resort: string) => {
    switch (resort) {
      case 'FARELLONES':
        return 'Farellones';
      case 'EL_COLORADO':
        return 'El Colorado';
      case 'LA_PARVA':
        return 'La Parva';
      case 'VALLE_NEVADO':
        return 'Valle Nevado';
      default:
        return resort;
    }
  };

  const formatDateDisplay = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex justify-end bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#091a2c]/95 backdrop-blur-2xl border-l border-white/20 h-full shadow-2xl flex flex-col text-white overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-white/20 flex items-center justify-between bg-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center border border-[#38BDF8]/40 shadow-xs">
              <Car className="w-5 h-5 text-[#38BDF8]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight drop-shadow-xs">
                Mis Viajes Publicados
              </h2>
              <p className="text-[11px] font-medium text-sky-200">
                Gestiona tus cupos y viajes activos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar panel"
            className="p-2 text-slate-300 hover:text-white hover:bg-white/20 bg-white/10 rounded-xl transition cursor-pointer border border-white/20"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 custom-scrollbar">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs flex items-center gap-2 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-300" />
              <span>{errorMessage}</span>
            </div>
          )}

          {loading ? (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-7 h-7 animate-spin text-[#38BDF8] mx-auto" />
              <p className="text-xs text-sky-200 font-medium">Cargando tus viajes...</p>
            </div>
          ) : trips.length === 0 ? (
            <div className="py-16 text-center space-y-4 px-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-sky-300 mx-auto flex items-center justify-center border border-white/20">
                <Car className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">Aún no has publicado viajes</h3>
                <p className="text-xs text-sky-200 mt-1 font-medium leading-relaxed">
                  Cuando publiques un viaje para subir o bajar de la cordillera, podrás editarlo y administrar tus cupos desde aquí.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Active Trips Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Viajes Activos ({activeTrips.length})
                  </h3>
                </div>

                {activeTrips.length === 0 ? (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center text-xs text-slate-300 font-medium">
                    No tienes viajes activos programados.
                  </div>
                ) : (
                  activeTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 shadow-md space-y-3 relative group"
                    >
                      {/* Badge Header */}
                      <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                        <span
                          className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
                            trip.direction === 'SUBIDA'
                              ? 'bg-sky-500/20 text-sky-200 border-sky-400/40'
                              : 'bg-indigo-500/20 text-indigo-200 border-indigo-400/40'
                          }`}
                        >
                          {trip.direction === 'SUBIDA' ? '⬆️ SUBIDA' : '⬇️ BAJADA'}
                        </span>
                        <div className="text-xs font-black text-sky-200 flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-[#38BDF8]" />
                          <span>${trip.price_per_seat.toLocaleString('es-CL')} / asiento</span>
                        </div>
                      </div>

                      {/* Route & Schedule Info */}
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center gap-2 text-white font-bold">
                          <MapPin className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                          <span className="truncate">
                            {trip.direction === 'SUBIDA'
                              ? `${trip.origin} ➔ ${formatResortName(trip.destination)}`
                              : `${formatResortName(trip.destination)} ➔ ${trip.origin}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-slate-200 text-[11px] font-medium pl-5">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-sky-300" />
                            <span>{formatDateDisplay(trip.departure_date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-sky-300" />
                            <span>{trip.departure_time} hrs</span>
                          </div>
                        </div>
                      </div>

                      {/* Inline Seats Adjuster & Actions */}
                      <div className="pt-2 border-t border-white/15 flex items-center justify-between gap-2">
                        {/* Seats Control */}
                        <div className="flex items-center gap-2 bg-slate-900/60 p-1 rounded-xl border border-white/20">
                          <span className="text-[11px] font-extrabold text-sky-200 pl-1.5 flex items-center gap-1">
                            <Users className="w-3 h-3 text-[#38BDF8]" />
                            <span>Cupos:</span>
                          </span>

                          <button
                            type="button"
                            disabled={trip.seats_available <= 0 || updatingSeatsId === trip.id}
                            onClick={() => handleUpdateSeats(trip, -1)}
                            className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white flex items-center justify-center transition cursor-pointer border border-white/20"
                            aria-label="Disminuir cupo"
                          >
                            <Minus className="w-3 h-3" />
                          </button>

                          <span className="text-xs font-black text-white px-1">
                            {updatingSeatsId === trip.id ? '...' : trip.seats_available}
                          </span>

                          <button
                            type="button"
                            disabled={trip.seats_available >= 8 || updatingSeatsId === trip.id}
                            onClick={() => handleUpdateSeats(trip, 1)}
                            className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white flex items-center justify-center transition cursor-pointer border border-white/20"
                            aria-label="Aumentar cupo"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Edit / Delete Action Buttons */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onEditTrip(trip);
                            }}
                            className="px-2.5 py-1.5 rounded-xl bg-[#38BDF8]/20 hover:bg-[#38BDF8]/30 border border-[#38BDF8]/40 text-[#38BDF8] text-xs font-extrabold flex items-center gap-1 transition cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Editar</span>
                          </button>

                          <button
                            type="button"
                            disabled={deletingTripId === trip.id}
                            onClick={() => handleDeleteTrip(trip.id)}
                            className="p-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-300 transition cursor-pointer disabled:opacity-50"
                            aria-label="Eliminar viaje"
                          >
                            {deletingTripId === trip.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Past Trips Section */}
              {pastTrips.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-white/20">
                  <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider">
                    Histórico ({pastTrips.length})
                  </h3>

                  {pastTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 opacity-75 hover:opacity-100 transition"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                        <span className="truncate">
                          {trip.direction === 'SUBIDA'
                            ? `${trip.origin} ➔ ${formatResortName(trip.destination)}`
                            : `${formatResortName(trip.destination)} ➔ ${trip.origin}`}
                        </span>
                        <span className="text-[11px] text-slate-300">{formatDateDisplay(trip.departure_date)}</span>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-300">
                        <span>${trip.price_per_seat.toLocaleString('es-CL')} / asiento</span>
                        <button
                          type="button"
                          disabled={deletingTripId === trip.id}
                          onClick={() => handleDeleteTrip(trip.id)}
                          className="text-rose-400 hover:text-rose-300 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Eliminar del historial</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
