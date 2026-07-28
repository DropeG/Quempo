'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Mountain, LogIn, LogOut, User as UserIcon, ChevronDown } from 'lucide-react';
import ProfileModal from './ProfileModal';
import UserAvatar from './UserAvatar';

interface NavbarProps {
  onRestartTour?: () => void;
}

export default function Navbar({ onRestartTour }: NavbarProps) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    // Fetch initial user state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await supabase.auth.signOut();
  };

  const handleOpenProfile = () => {
    setIsMenuOpen(false);
    setIsProfileModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-transparent">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-3">
          {/* Brand Logo & Integrated Tagline */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center shadow-md border border-white/40 shrink-0 backdrop-blur-xs">
                <Mountain className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <span className="font-black text-2xl sm:text-3xl tracking-tight text-white flex items-center gap-0.5 leading-none drop-shadow-md">
                Faredeo
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-white/90 font-medium mt-1 drop-shadow-sm">
              Conecta viajes a Farellones, El Colorado, La Parva y Valle Nevado en segundos
            </p>
          </div>

          {/* User Profile / Auth */}
          <div className="flex items-center gap-3 shrink-0">
            {loading ? (
              <div className="w-28 h-12 rounded-2xl bg-white/20 animate-pulse border border-white/30" />
            ) : user ? (
              <div className="relative" ref={menuRef}>
                {/* Trigger Button */}
                <button
                  data-tour="user-profile"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/40 p-1.5 pl-2.5 pr-2 rounded-2xl shadow-md backdrop-blur-md transition cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <UserAvatar
                      src={user.user_metadata?.avatar_url}
                      name={user.user_metadata?.full_name}
                      email={user.email}
                      size="sm"
                    />
                    <div className="hidden sm:block text-left pr-1">
                      <div className="text-xs font-bold text-white truncate max-w-[100px] drop-shadow-xs">
                        {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                      </div>
                      <div className="text-[10px] font-semibold text-sky-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse" /> Activo
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Submenu Dropdown */}
                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-[#091a2c]/95 backdrop-blur-xl border border-white/30 shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1 text-white">
                    <div className="px-3 py-2.5 border-b border-white/20 rounded-xl bg-white/5">
                      <p className="text-xs font-black text-white truncate drop-shadow-xs">
                        {user.user_metadata?.full_name || 'Usuario'}
                      </p>
                      <p className="text-[11px] font-medium text-sky-200 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>

                    <button
                      onClick={handleOpenProfile}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-extrabold text-white hover:bg-white/15 transition cursor-pointer text-left group"
                    >
                      <UserIcon className="w-4 h-4 text-[#38BDF8] group-hover:scale-110 transition-transform" />
                      <span>Mi perfil</span>
                    </button>

                    <div className="h-px bg-white/20 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-extrabold text-rose-300 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 transition cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <LogOut className="w-4 h-4 text-rose-400" />
                        <span>Cerrar sesión</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 bg-white/20 hover:bg-white text-white hover:text-[#0F2942] text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-xl border border-white/50 backdrop-blur-md transition cursor-pointer shadow-md active:scale-95 group"
              >
                <LogIn className="w-4 h-4 text-white group-hover:text-[#0F2942] stroke-[2.5] transition-colors" />
                <span>Entrar</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* User Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onRestartTour={onRestartTour}
      />
    </>
  );
}
