'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, HelpCircle, FileText, Bug } from 'lucide-react';
import FeedbackModal from './FeedbackModal';

const COMMUNITY_WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL ||
  'https://chat.whatsapp.com/HSYkGEhRxGgCpPsd6S4Rid';
const ADMIN_WHATSAPP_URL =
  'https://wa.me/56959365527?text=Hola%20Quempo,%20tengo%20una%20consulta';

interface FooterProps {
  onOpenFeedback?: () => void;
}

export default function Footer({ onOpenFeedback }: FooterProps) {
  const pathname = usePathname();

  // Do not render footer on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <footer className="w-full mt-auto bg-[#071321]/80 backdrop-blur-xl border-t border-white/15 text-white py-6 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/logo_quempo.svg"
            alt="Quempo Logo"
            className="h-7 w-auto object-contain shrink-0 drop-shadow-sm"
          />
          <span className="font-jakarta font-extrabold text-lg text-white tracking-tight">
            Quempo
          </span>
        </div>

        {/* Links Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-300">
          <a
            href={COMMUNITY_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-sky-300 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-sky-400" />
            <span>Grupo de WhatsApp</span>
          </a>

          <a
            href={ADMIN_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-sky-300 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-sky-400" />
            <span>Contacto</span>
          </a>

          <button
            type="button"
            onClick={() => {
              if (onOpenFeedback) onOpenFeedback();
              window.dispatchEvent(new CustomEvent('open-quempo-feedback'));
            }}
            className="flex items-center gap-1.5 hover:text-sky-300 transition-colors cursor-pointer"
          >
            <Bug className="w-4 h-4 text-sky-400" />
            <span>Reportar Problema</span>
          </button>

          <Link
            href="/terminos"
            className="flex items-center gap-1.5 hover:text-sky-300 transition-colors"
          >
            <FileText className="w-4 h-4 text-sky-400" />
            <span>Términos y Privacidad</span>
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-[11px] sm:text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Quempo. Hecho para la montaña ❄️</p>
        </div>
      </div>
    </footer>
    <FeedbackModal />
    </>
  );
}
