'use client';

import { useState, useEffect } from 'react';
import { Navigation, Clock, ShieldCheck, Thermometer, Cloud, Sun, CloudSnow, CloudRain, CloudFog, CloudLightning, ExternalLink } from 'lucide-react';

interface WeatherData {
  temp: number | null;
  weatherCode: number | null;
}

interface MountainStatusPillProps {
  isSidebar?: boolean;
}

export default function MountainStatusPill({ isSidebar = true }: MountainStatusPillProps) {
  const [mounted, setMounted] = useState(false);
  const [weather, setWeather] = useState<WeatherData>({
    temp: null,
    weatherCode: null,
  });
  const [loading, setLoading] = useState(true);

  // Compute G-21 road direction rule based on current time
  const getG21Status = () => {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 8 && hours < 13) {
      return {
        direction: 'SUBIDA',
        badge: '⬆️ Subida Exclusiva',
        schedule: '08:00 - 13:00 hrs',
        detail: 'Tránsito unidireccional exclusivo hacia Farellones',
        badgeBg: 'bg-sky-400/20 border-sky-300/40 text-sky-200',
        iconBg: 'bg-sky-400/20 text-[#38BDF8] border-sky-300/40',
        activeDot: 'bg-sky-300',
      };
    } else if (hours >= 13 && hours < 15) {
      return {
        direction: 'MAINTENANCE',
        badge: '🚧 Limpieza de Vía',
        schedule: '13:00 - 15:00 hrs',
        detail: 'Despeje de nieve y cambio de sentido en ruta G-21',
        badgeBg: 'bg-amber-500/20 border-amber-400/40 text-amber-200',
        iconBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
        activeDot: 'bg-amber-300',
      };
    } else if (hours >= 15 && hours < 20) {
      return {
        direction: 'BAJADA',
        badge: '⬇️ Bajada Exclusiva',
        schedule: '15:00 - 20:00 hrs',
        detail: 'Tránsito unidireccional exclusivo hacia Santiago',
        badgeBg: 'bg-indigo-500/20 border-indigo-400/40 text-indigo-200',
        iconBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40',
        activeDot: 'bg-indigo-300',
      };
    } else {
      return {
        direction: 'OPEN',
        badge: '🟢 Tránsito Abierto',
        schedule: 'Horario Normal',
        detail: 'Tránsito bidireccional habilitado en Ruta G-21',
        badgeBg: 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200',
        iconBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
        activeDot: 'bg-emerald-300',
      };
    }
  };

  // Convert WMO codes to clean descriptive labels and icons
  const getWeatherDetails = (code: number | null) => {
    if (code === null) return { text: 'Cargando...', icon: <Cloud className="w-5 h-5 text-sky-200" /> };
    
    // WMO Weather Codes (https://open-meteo.com/en/docs)
    if (code === 0) {
      return { text: 'Despejado', icon: <Sun className="w-5 h-5 text-amber-400" /> };
    }
    if (code >= 1 && code <= 3) {
      return { text: 'Nublado', icon: <Cloud className="w-5 h-5 text-sky-200" /> };
    }
    if (code === 45 || code === 48) {
      return { text: 'Niebla', icon: <CloudFog className="w-5 h-5 text-slate-300" /> };
    }
    if (code >= 51 && code <= 65) {
      return { text: 'Lluvia', icon: <CloudRain className="w-5 h-5 text-blue-300" /> };
    }
    if ((code >= 71 && code <= 77) || (code === 85 || code === 86)) {
      return { text: 'Nevando', icon: <CloudSnow className="w-5 h-5 text-sky-300 animate-bounce" /> };
    }
    if (code >= 80 && code <= 82) {
      return { text: 'Chubascos', icon: <CloudRain className="w-5 h-5 text-blue-300" /> };
    }
    if (code >= 95) {
      return { text: 'Tormenta', icon: <CloudLightning className="w-5 h-5 text-amber-300" /> };
    }
    
    return { text: 'Cordillera', icon: <Cloud className="w-5 h-5 text-sky-200" /> };
  };

  useEffect(() => {
    setMounted(true);
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-33.35&longitude=-70.31&current=temperature_2m,weather_code&timezone=auto'
        );
        if (!res.ok) throw new Error('Weather API fetch failed');
        const data = await res.json();

        setWeather({
          temp: data.current?.temperature_2m ?? null,
          weatherCode: data.current?.weather_code ?? null,
        });
      } catch (err) {
        console.error('Error fetching Open-Meteo weather:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const roadInfo = mounted ? getG21Status() : {
    direction: 'OPEN',
    badge: '🟢 Tránsito Abierto',
    schedule: 'Horario Normal',
    detail: 'Tránsito bidireccional habilitado en Ruta G-21',
    badgeBg: 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200',
    iconBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    activeDot: 'bg-emerald-300',
  };
  const weatherDetails = getWeatherDetails(weather.weatherCode);

  // Layout 1: Centered Wide (for few trips)
  if (!isSidebar) {
    return (
      <div className="glass-card rounded-3xl p-5 space-y-4 text-white shadow-xl border border-white/30">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/15 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/15 text-white flex items-center justify-center border border-white/30 shadow-xs shrink-0">
              <Navigation className="w-4 h-4 text-[#38BDF8]" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white tracking-tight drop-shadow-xs">
                Estado Ruta G-21 & Clima Cordillerano
              </h4>
              <p className="text-xs text-sky-200 font-medium">Información en tiempo real para subir a la cordillera</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold text-sky-200 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg border border-white/20 transition flex items-center gap-1 cursor-pointer active:scale-95"
            >
              <span>Datos Clima: Open-Meteo</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span>En Vivo</span>
            </div>
          </div>
        </div>

        {/* Horizontal Split for Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          {/* G-21 Road Status Banner */}
          <div className="md:col-span-7 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col justify-between space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between gap-2">
              <span className={`px-3 py-1 rounded-xl text-xs font-black border ${roadInfo.badgeBg} flex items-center gap-1.5 shadow-xs`}>
                {roadInfo.badge}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-sky-200 bg-white/10 px-2.5 py-1 rounded-lg border border-white/20">
                <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{roadInfo.schedule}</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-100 leading-relaxed">
              {roadInfo.detail}
            </p>
          </div>

          {/* Weather Stats */}
          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            {/* Stat 1: Temperature */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col justify-between space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-sky-200 tracking-wider">
                Temperatura
              </span>
              {loading ? (
                <div className="h-7 w-16 bg-white/20 animate-pulse rounded-lg" />
              ) : (
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white drop-shadow-xs">
                    {weather.temp !== null ? `${Math.round(weather.temp)}` : '--'}
                  </span>
                  <span className="text-xs font-black text-sky-200">°C</span>
                  <Thermometer className="w-4 h-4 text-[#38BDF8] ml-auto shrink-0" />
                </div>
              )}
            </div>

            {/* Stat 2: Weather Sky Condition */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col justify-between space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-sky-200 tracking-wider">
                Condición
              </span>
              {loading ? (
                <div className="h-7 w-16 bg-white/20 animate-pulse rounded-lg" />
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white drop-shadow-xs truncate max-w-[80px]">
                    {weatherDetails.text}
                  </span>
                  <span className="ml-auto shrink-0">{weatherDetails.icon}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Safety Alert Footer */}
        <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/10 border border-white/15 text-xs text-sky-200 font-semibold shadow-xs flex-wrap">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#38BDF8] shrink-0" />
            <span>Porte de cadenas obligatorio (Control Carabineros La Ermita).</span>
          </div>
          <span className="text-[10px] text-sky-300 font-normal">
            Horario oficial de tránsito regulado por Delegación Presidencial y Carabineros de Chile.
          </span>
        </div>
      </div>
    );
  }

  // Layout 2: Compact Sidebar (for many trips)
  return (
    <div className="glass-card rounded-3xl p-4.5 space-y-3.5 text-white shadow-xl border border-white/30">
      {/* Header Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white/15 text-white flex items-center justify-center border border-white/30 shadow-xs shrink-0">
            <Navigation className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white tracking-tight drop-shadow-xs flex items-center gap-1.5">
              <span>Estado Ruta G-21</span>
            </h4>
            <p className="text-[10px] text-sky-200 font-medium">Camino a Farellones & Ski</p>
          </div>
        </div>

        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[9px] sm:text-[10px] font-bold text-sky-200 bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-full border border-white/20 transition flex items-center gap-1 cursor-pointer active:scale-95"
          title="Ver fuente de datos meteorológicos"
        >
          <span>Open-Meteo</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>

      {/* Main Road Status Hero Card */}
      <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-xl text-xs font-black border ${roadInfo.badgeBg} flex items-center gap-1 shadow-xs`}>
              {roadInfo.badge}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-extrabold text-sky-200 bg-white/10 px-2 py-0.5 rounded-lg border border-white/20">
            <Clock className="w-3 h-3 text-[#38BDF8]" />
            <span>{roadInfo.schedule}</span>
          </div>
        </div>

        <p className="text-xs font-medium text-slate-100 leading-snug">
          {roadInfo.detail}
        </p>
      </div>

      {/* Weather & Condition Dual Stats */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Stat 1: Temperature */}
        <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col justify-between space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-sky-200 tracking-wider">
            Temp.
          </span>
          {loading ? (
            <div className="h-6 w-16 bg-white/20 animate-pulse rounded-lg" />
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-white drop-shadow-xs">
                {weather.temp !== null ? `${Math.round(weather.temp)}` : '--'}
              </span>
              <span className="text-xs font-black text-sky-200">°C</span>
              <Thermometer className="w-3.5 h-3.5 text-[#38BDF8] ml-auto shrink-0" />
            </div>
          )}
        </div>

        {/* Stat 2: Sky Condition */}
        <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col justify-between space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-sky-200 tracking-wider">
            Cielo
          </span>
          {loading ? (
            <div className="h-6 w-16 bg-white/20 animate-pulse rounded-lg" />
          ) : (
            <div className="flex items-center gap-1">
              <span className="text-xs font-black text-white truncate max-w-[50px]">
                {weatherDetails.text}
              </span>
              <span className="ml-auto shrink-0">{weatherDetails.icon}</span>
            </div>
          )}
        </div>
      </div>

      {/* Safety Alert Footer */}
      <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-white/10 border border-white/15 text-[10px] text-sky-200 font-semibold leading-tight">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
          <span>Porte de cadenas obligatorio (Control La Ermita).</span>
        </div>
      </div>
    </div>
  );
}
