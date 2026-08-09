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

    return { success: true };
  } catch (err: unknown) {
    console.error('Unexpected error in submitFeedbackAction:', err);
    return {
      success: false,
      error: 'Ocurrió un error inesperado al enviar el reporte.',
    };
  }
}
