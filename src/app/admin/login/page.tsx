'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, LogIn, AlertCircle } from 'lucide-react';
import { loginAdminAction } from '../actions';

function AdminLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const result = await loginAdminAction(formData);

    if (result.success) {
      router.push('/admin');
      router.refresh();
    } else {
      setErrorMsg(result.error || 'Credenciales incorrectas');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#091a2c] text-white font-sans flex items-center justify-center p-4 relative overflow-hidden selection:bg-[#38BDF8] selection:text-[#0F2942]">
      {/* Ambient background glows matching Quempo theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#38BDF8]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#0284C7]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md glass-card p-8 shadow-2xl relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/logo_quempo.svg"
            alt="Quempo Logo"
            className="h-16 w-auto object-contain drop-shadow-lg mb-3"
          />
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-jakarta flex items-center gap-2">
            Quempo Admin
          </h1>
          <p className="text-xs text-sky-200/80 mt-1 font-medium">
            Ingresa las credenciales para gestionar la plataforma
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-rose-500/15 border border-rose-500/30 rounded-2xl flex items-start gap-3 text-rose-200 text-xs sm:text-sm font-medium">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <p className="leading-snug">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-sky-200 mb-2">
              Usuario de Administrador
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full bg-[#0F2942]/80 border border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-sky-200/50 focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-sky-200 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#0F2942]/80 border border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-sky-200/50 focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 transition-all font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#38BDF8] hover:bg-[#0284C7] text-[#0F2942] hover:text-white font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#38BDF8]/20 disabled:opacity-50 disabled:cursor-not-allowed mt-6 cursor-pointer"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-[#0F2942] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Ingresar al Dashboard
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#091a2c] flex items-center justify-center text-sky-200">
          Cargando portal admin...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
