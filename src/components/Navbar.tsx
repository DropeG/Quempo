'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { Mountain, LogIn, LogOut } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand Logo & Integrated Tagline */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/25 font-bold border border-emerald-400/40 shrink-0">
              <Mountain className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <span className="font-black text-2xl sm:text-3xl tracking-tight text-white flex items-center gap-0.5 leading-none drop-shadow-md">
              Fare<span className="text-emerald-400">deo</span>
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1 drop-shadow-sm">
            Conecta viajes a Farellones, El Colorado, La Parva y Valle Nevado en segundos
          </p>
        </div>

        {/* User Profile / Auth (Opción C: Píldora de Perfil Encapsulada) */}
        <div className="flex items-center gap-3 shrink-0">
          {loading ? (
            <div className="w-28 h-12 rounded-2xl bg-zinc-800 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-2 bg-zinc-900/90 border border-emerald-500/30 p-1.5 pl-2.5 rounded-2xl shadow-xl">
              <div className="flex items-center gap-2">
                {user.user_metadata?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata.full_name || 'User'}
                    className="w-10 h-10 rounded-xl ring-2 ring-emerald-500/60 object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-sm ring-2 ring-emerald-400/50">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="hidden sm:block text-left pr-1">
                  <div className="text-xs font-bold text-white truncate max-w-[100px]">
                    {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                  </div>
                  <div className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Activo
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Cerrar Sesión"
                className="text-zinc-400 hover:text-rose-400 p-2 rounded-xl hover:bg-zinc-800/80 transition cursor-pointer border-l border-zinc-800/80 ml-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border border-emerald-500/40 transition cursor-pointer shadow-md active:scale-95"
            >
              <LogIn className="w-4 h-4 text-emerald-400" />
              <span>Entrar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
