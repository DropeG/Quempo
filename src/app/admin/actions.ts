'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdminAction(formData: FormData) {
  const username = formData.get('username')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
  const expectedPassword = process.env.ADMIN_PASSWORD || 'quempo2026admin';

  if (
    username.trim().toLowerCase() === expectedUsername.toLowerCase() &&
    password === expectedPassword
  ) {
    const cookieStore = await cookies();
    cookieStore.set('quempo_admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true };
  }

  return { success: false, error: 'Usuario o contraseña de administrador incorrectos.' };
}

export async function logoutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete('quempo_admin_session');
  redirect('/admin/login');
}
