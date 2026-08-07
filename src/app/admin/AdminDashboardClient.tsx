'use client';

import { useState, useMemo } from 'react';
import {
  Users,
  Car,
  Search,
  LogOut,
  ShieldCheck,
  Phone,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { logoutAdminAction } from './actions';

const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
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

export interface AdminUserItem {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  whatsappNumber: string | null;
  instagramHandle: string | null;
  isAdmin: boolean;
  tripsCount: number;
}

interface AdminDashboardClientProps {
  adminEmail: string;
  totalUsersCount: number;
  totalTripsCount: number;
  usersList: AdminUserItem[];
}

export default function AdminDashboardClient({
  adminEmail,
  totalUsersCount,
  totalTripsCount,
  usersList,
}: AdminDashboardClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logoutAdminAction();
  };

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return usersList;
    const query = searchQuery.toLowerCase();
    return usersList.filter(
      (user) =>
        user.fullName.toLowerCase().includes(query) ||
        (user.whatsappNumber && user.whatsappNumber.includes(query)) ||
        (user.instagramHandle && user.instagramHandle.toLowerCase().includes(query)) ||
        user.id.toLowerCase().includes(query)
    );
  }, [usersList, searchQuery]);

  return (
    <div className="min-h-screen bg-[#091a2c] text-white font-sans relative overflow-x-hidden selection:bg-[#38BDF8] selection:text-[#0F2942]">
      {/* Background Subtle Ambient Glows (No photo background) */}
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#38BDF8]/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[500px] h-[400px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Top Navbar matching main page Quempo header */}
      <header className="sticky top-0 z-50 bg-[#091a2c]/80 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Logo & Admin Title */}
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/logo_quempo.svg"
              alt="Quempo Logo"
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-md shrink-0"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-jakarta font-extrabold text-xl sm:text-2xl tracking-tight text-white drop-shadow-md">
                  Quempo
                </span>
                <span className="bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40 px-2 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin
                </span>
              </div>
              <span className="text-xs text-sky-200/80 font-mono hidden sm:inline-block">
                {adminEmail}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-md backdrop-blur-md cursor-pointer disabled:opacity-50"
          >
            {loggingOut ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogOut className="w-4 h-4 text-[#38BDF8]" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 relative z-10">
        {/* Metric Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Card 1: Total Users */}
          <div className="glass-card p-6 flex flex-col justify-between relative group hover:border-[#38BDF8]/50 transition-all shadow-xl">
            <div className="absolute top-4 right-4 p-3 rounded-2xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-sky-200/80 mb-1">
                Comunidad
              </p>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Total Usuarios Registrados
              </h3>
            </div>
            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-4xl sm:text-5xl font-extrabold text-white font-jakarta tracking-tight">
                {totalUsersCount}
              </span>
              <span className="text-xs text-[#38BDF8] font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                Registrados en app
              </span>
            </div>
          </div>

          {/* Card 2: Total Trips */}
          <div className="glass-card p-6 flex flex-col justify-between relative group hover:border-[#38BDF8]/50 transition-all shadow-xl">
            <div className="absolute top-4 right-4 p-3 rounded-2xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8]">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-sky-200/80 mb-1">
                Actividad de Viajes
              </p>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Total Viajes Publicados
              </h3>
            </div>
            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-4xl sm:text-5xl font-extrabold text-white font-jakarta tracking-tight">
                {totalTripsCount}
              </span>
              <span className="text-xs text-sky-200/80 font-medium">
                Publicaciones en total
              </span>
            </div>
          </div>
        </section>

        {/* Directory Section */}
        <section className="glass-card p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-white font-jakarta flex items-center gap-2">
                <Users className="w-5 h-5 text-[#38BDF8]" /> Directorio de Usuarios
              </h2>
              <p className="text-xs text-sky-200/80 mt-1">
                Mostrando {filteredUsers.length} de {totalUsersCount} usuarios
              </p>
            </div>

            {/* Search Input Bar */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-sky-200 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, teléfono, IG..."
                className="w-full bg-[#0F2942]/80 border border-white/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-sky-200/50 focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 transition-all font-medium"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-white/20">
            <table className="w-full text-left text-sm text-slate-200">
              <thead className="bg-[#0F2942]/90 text-xs font-bold uppercase tracking-wider text-sky-200 border-b border-white/20">
                <tr>
                  <th scope="col" className="py-4 px-5">Usuario</th>
                  <th scope="col" className="py-4 px-5">Contacto</th>
                  <th scope="col" className="py-4 px-5 text-center">Viajes Publicados</th>
                  <th scope="col" className="py-4 px-5 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-[#0F2942]/30">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-sky-200/60 font-medium">
                      No se encontraron usuarios matching &quot;{searchQuery}&quot;
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      {/* User Avatar & Name */}
                      <td className="py-4 px-5 flex items-center gap-3">
                        {user.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={user.avatarUrl}
                            alt={user.fullName}
                            className="w-10 h-10 rounded-full object-cover border border-white/30 shadow-sm"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/40 text-[#38BDF8] font-extrabold flex items-center justify-center text-sm">
                            {user.fullName ? user.fullName.charAt(0).toUpperCase() : '?'}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                            {user.fullName || 'Usuario sin nombre'}
                          </div>
                          <div className="text-xs text-sky-200/50 font-mono">
                            ID: {user.id.substring(0, 8)}...
                          </div>
                        </div>
                      </td>

                      {/* Contact Info (WhatsApp & Instagram) */}
                      <td className="py-4 px-5 space-y-1">
                        {user.whatsappNumber ? (
                          <div className="flex items-center gap-1.5 text-xs text-slate-200 font-medium">
                            <Phone className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                            <span>{user.whatsappNumber}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 block font-normal">Sin WhatsApp</span>
                        )}
                        {user.instagramHandle ? (
                          <div className="flex items-center gap-1.5 text-xs text-sky-200/80 font-medium">
                            <InstagramIcon className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                            <span>@{user.instagramHandle.replace(/^@/, '')}</span>
                          </div>
                        ) : null}
                      </td>

                      {/* Trips Count */}
                      <td className="py-4 px-5 text-center">
                        <span className="inline-flex items-center gap-1.5 bg-[#38BDF8]/15 px-3 py-1 rounded-full text-xs font-bold text-[#38BDF8] border border-[#38BDF8]/30">
                          <Car className="w-3.5 h-3.5" />
                          {user.tripsCount} {user.tripsCount === 1 ? 'viaje' : 'viajes'}
                        </span>
                      </td>

                      {/* Role/Status Badge */}
                      <td className="py-4 px-5 text-center">
                        <span className="bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full font-bold border border-emerald-500/30 inline-flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-emerald-400" /> Activo
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
