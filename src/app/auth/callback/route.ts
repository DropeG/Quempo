import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const errorParam = requestUrl.searchParams.get('error_description') || requestUrl.searchParams.get('error');

  if (errorParam) {
    console.error('Auth callback error from provider:', errorParam);
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error('Error exchanging code for session:', error);
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}`);
}
