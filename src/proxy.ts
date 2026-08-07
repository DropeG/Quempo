import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const adminCookie = request.cookies.get('quempo_admin_session');
  const isAuthenticatedAdmin = adminCookie?.value === 'authenticated';

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      if (isAuthenticatedAdmin) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    if (!isAuthenticatedAdmin) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
