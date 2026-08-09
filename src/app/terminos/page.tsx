import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Users, Lock, Mountain, HeartHandshake } from 'lucide-react';

export const metadata = {
  title: 'Términos y Privacidad | Quempo',
  description: 'Conoce los principios de transparencia, responsabilidad P2P y privacidad de la comunidad Quempo.',
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1E36] via-[#091728] to-[#050C15] text-white flex flex-col">
      {/* Sticky Dedicated Glassmorphism Header */}
      <header className="sticky top-0 z-50 bg-[#091a2c]/85 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo/logo_quempo.svg"
              alt="Quempo Logo"
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-md shrink-0 transition-transform group-hover:scale-105"
            />
            <span className="font-jakarta font-extrabold text-xl sm:text-2xl tracking-tight text-white flex items-center gap-0.5 leading-none drop-shadow-md">
              Quempo
            </span>
          </Link>

          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-bold text-white transition-all backdrop-blur-md active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span>Volver a Quempo</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 sm:py-12 w-full">


        {/* Hero Card */}
        <div className="bg-[#091a2c]/90 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Transparencia P2P</span>
            </div>
            <h1 className="font-jakarta font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              Términos de Servicio y Privacidad
            </h1>
            <p className="text-slate-300 text-sm sm:text-base font-medium mt-2 leading-relaxed">
              Quempo es una plataforma comunitaria creada para conectar esquiadores y snowboarders que suben o bajan de los centros de ski de Santiago.
            </p>
          </div>

          {/* Section 1: Plataforma Neutral P2P */}
          <div className="flex gap-4 items-start">
            <div className="p-3 rounded-2xl bg-sky-500/20 border border-sky-400/30 shrink-0 text-sky-300">
              <Mountain className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h2 className="font-jakarta font-bold text-lg text-white">
                1. Plataforma Neutral P2P
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Quempo opera exclusivamente como un directorio de contacto directo entre particulares. Quempo <span className="text-sky-300 font-semibold">no cobra comisiones</span>, no procesa pagos en la plataforma ni actúa como empresa de transporte ni intermediario financiero.
              </p>
            </div>
          </div>

          {/* Section 2: Responsabilidad de los Usuarios */}
          <div className="flex gap-4 items-start">
            <div className="p-3 rounded-2xl bg-sky-500/20 border border-sky-400/30 shrink-0 text-sky-300">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h2 className="font-jakarta font-bold text-lg text-white">
                2. Acuerdos y Responsabilidad de los Viajes
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                El monto compartido por el combustible, los horarios, el punto de encuentro y la confirmación del equipamiento del vehículo (cadenas, tracción 4x4, porta-ski) son acordados libremente entre conductor y pasajero. Cada participante es responsable de su seguridad y de verificar las condiciones del viaje antes de subir a la montaña.
              </p>
            </div>
          </div>

          {/* Section 3: Privacidad y Uso de Datos */}
          <div className="flex gap-4 items-start">
            <div className="p-3 rounded-2xl bg-sky-500/20 border border-sky-400/30 shrink-0 text-sky-300">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h2 className="font-jakarta font-bold text-lg text-white">
                3. Privacidad y Protección de Datos
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Únicamente solicitamos los datos indispensables para habilitar el contacto directo (nombre, número de WhatsApp e Instagram). Tu número solo se muestra en las publicaciones de viajes que decidas crear o en tu perfil público. <span className="text-sky-300 font-semibold">Jamás vendemos ni compartimos tus datos</span> con empresas de terceros.
              </p>
            </div>
          </div>

          {/* Section 4: Normas de la Comunidad */}
          <div className="flex gap-4 items-start">
            <div className="p-3 rounded-2xl bg-sky-500/20 border border-sky-400/30 shrink-0 text-sky-300">
              <Users className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h2 className="font-jakarta font-bold text-lg text-white">
                4. Convivencia y Normas Comunitarias
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                La comunidad Quempo se sostiene en el respeto mutuo, la puntualidad y la honestidad. El uso indebido de los datos de contacto, spam o conductas inapropiadas resultará en la eliminación permanente de la cuenta.
              </p>
            </div>
          </div>

          {/* Footer inside Card */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} Quempo. Transparencia y comunidad en la montaña.</p>
            <Link
              href="/"
              className="text-sky-400 hover:text-sky-300 font-semibold transition-colors"
            >
              Ir a buscar viajes →
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
