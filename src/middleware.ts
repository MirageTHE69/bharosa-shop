import { NextResponse } from 'next/server';
import { edgeAuth } from '@/lib/auth-edge';

// This installed Next.js version uses the classic `middleware.ts` convention.
// Role is read straight from the JWT (no DB call) — see src/lib/auth-edge.ts.
export default edgeAuth((req) => {
  const { pathname } = req.nextUrl;
  const role = req.auth?.user?.role;

  if (pathname.startsWith('/vendor')) {
    if (!req.auth) {
      const url = req.nextUrl.clone();
      url.pathname = '/auth/sign-in';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
    if (role !== 'vendor' && role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
  }

  if (pathname.startsWith('/admin')) {
    if (!req.auth) {
      const url = req.nextUrl.clone();
      url.pathname = '/auth/sign-in';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
