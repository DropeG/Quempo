'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Mountain, LogIn, LogOut, User as UserIcon, ChevronDown } from 'lucide-react';
import ProfileModal from './ProfileModal';

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
      <header className="sticky top-0 z-50 glass-nav">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-3">
          {/* Brand Logo & Integrated Tagline */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#DAAF9E]/15 text-[#DAAF9E] flex items-center justify-center shadow-xs border border-[#DAAF9E]/30 shrink-0">
                <Mountain className="w-5 h-5 text-[#DAAF9E] stroke-[2.5]" />
              </div>
              <span className="font-black text-2xl sm:text-3xl tracking-tight text-[#EFEEEC] flex items-center gap-0.5 leading-none">
                Fare<span className="text-[#DAAF9E]">deo</span>
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#F0CDC4] font-medium mt-1">
              Conecta viajes a Farellones, El Colorado, La Parva y Valle Nevado en segundos
            </p>
          </div>

          {/* User Profile / Auth */}
          <div className="flex items-center gap-3 shrink-0">
            {loading ? (
              <div className="w-28 h-12 rounded-2xl bg-[#163F41] animate-pulse border border-[#2a575a]" />
            ) : user ? (
              <div className="relative" ref={menuRef}>
                {/* Trigger Button */}
                <button
                  data-tour="user-profile"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 bg-[#163F41] hover:bg-[#1c4b4d] border border-[#2a575a] p-1.5 pl-2.5 pr-2 rounded-2xl shadow-xs transition cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {user.user_metadata?.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.user_metadata.avatar_url}
                        alt={user.user_metadata.full_name || 'User'}
                        className="w-9 h-9 rounded-xl ring-2 ring-[#DAAF9E]/50 object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-[#DAAF9E] text-[#163F41] flex items-center justify-center font-black text-sm ring-2 ring-[#DAAF9E]/50">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="hidden sm:block text-left pr-1">
                      <div className="text-xs font-bold text-[#EFEEEC] truncate max-w-[100px]">
                        {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                      </div>
                      <div className="text-[10px] font-semibold text-[#F0CDC4] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DAAF9E] animate-pulse" /> Activo
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#F0CDC4]/70 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Submenu Dropdown */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#113335] border border-[#2a575a] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
                    <div className="px-3 py-2 border-b border-[#2a575a]/60">
                      <p className="text-xs font-bold text-[#EFEEEC] truncate">
                        {user.user_metadata?.full_name || 'Usuario'}
                      </p>
                      <p className="text-[11px] text-[#F0CDC4]/70 truncate">
                        {user.email}
                      </p>
                    </div>

                    <button
                      onClick={handleOpenProfile}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-[#EFEEEC] hover:bg-[#163F41] transition cursor-pointer text-left"
                    >
                      <UserIcon className="w-4 h-4 text-[#DAAF9E]" />
                      <span>Mi perfil</span>
                    </button>

                    <div className="h-px bg-[#2a575a]/60 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition cursor-pointer text-left"
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
                className="flex items-center gap-2 bg-[#DAAF9E] hover:bg-[#C79987] text-[#163F41] text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-xl border border-transparent transition cursor-pointer shadow-xs active:scale-95"
              >
                <LogIn className="w-4 h-4 text-[#163F41] stroke-[2.5]" />
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
