'use server';

import { createClient } from '@/lib/supabase/server';

export interface SubmitFeedbackParams {
  category: 'bug' | 'suggestion' | 'other';
  message: string;
  contact?: string;
  pageUrl?: string;
  userAgent?: string;
  screenSize?: string;
}

async function sendTelegramNotification(params: {
  category: string;
  message: string;
  contact?: string;
  userEmail?: string;
  pageUrl?: string;
  screenSize?: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('Telegram env vars (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID) missing.');
    return;
  }

  const categoryLabel =
    params.category === 'bug' ? '🐛 BUG' : params.category === 'suggestion' ? '💡 SUGERENCIA' : '❓ OTRO';

  const text = `🚨 *Nuevo Reporte en Quempo* (${categoryLabel})\n\n` +
    `📝 *Mensaje:* ${params.message}\n` +
    (params.contact ? `📞 *Contacto:* \`${params.contact}\`\n` : '') +
    (params.userEmail ? `👤 *Usuario:* \`${params.userEmail}\`\n` : '') +
    (params.pageUrl ? `📍 *URL:* ${params.pageUrl}\n` : '') +
    (params.screenSize ? `📱 *Pantalla:* ${params.screenSize}\n` : '');

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Telegram API error:', res.status, errText);
    }
  } catch (err) {
    console.error('Error sending Telegram notification:', err);
  }
}

export async function submitFeedbackAction(params: SubmitFeedbackParams) {
  try {
    if (!params.message || params.message.trim().length < 5) {
      return {
        success: false,
        error: 'El mensaje debe tener al menos 5 caracteres.',
      };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from('feedback_reports').insert({
      category: params.category,
      message: params.message.trim(),
      contact: params.contact?.trim() || null,
      user_id: user?.id || null,
      page_url: params.pageUrl || null,
      user_agent: params.userAgent || null,
      screen_size: params.screenSize || null,
    });

    if (error) {
      console.error('Error in submitFeedbackAction:', error);
      return {
        success: false,
        error: 'No se pudo guardar el reporte. Por favor reintenta.',
      };
    }

    // Await Telegram notification so Vercel Serverless doesn't kill execution prematurely
    await sendTelegramNotification({
      category: params.category,
      message: params.message.trim(),
      contact: params.contact?.trim(),
      userEmail: user?.email,
      pageUrl: params.pageUrl,
      screenSize: params.screenSize,
    });

    return { success: true };
  } catch (err: unknown) {
    console.error('Unexpected error in submitFeedbackAction:', err);
    return {
      success: false,
      error: 'Ocurrió un error inesperado al enviar el reporte.',
    };
  }
}
