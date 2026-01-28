import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


// This middleware checks for authentication tokens in cookies
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const token = request.cookies.get('accessToken')?.value;
  const isNamespaceAdmin = pathname.startsWith('/admin');

  
  if (isNamespaceAdmin && !token && !refreshToken) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (token && !isNamespaceAdmin) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};