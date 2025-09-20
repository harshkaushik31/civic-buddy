import { NextResponse } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname
  
  const isPublicPath = path === '/login' || 
                      path === '/signup' || 
                      path === '/verify-email' || 
                      path === '/contact' || 
                      path === '/privacy' || 
                      path === '/' ||
                      path === '/about';
  
  const isProtectedPath = path === '/user-profile' || 
                         path === '/dashboard' || 
                         path.startsWith('/admin');
  
  const token = request.cookies.get("token")?.value;
  
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/user-profile', request.url))
  }
  
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/login", 
    "/signup",
    "/verify-email",
    "/user-profile",
    "/contact",
    "/privacy", 
    "/about",
    "/dashboard/:path*",
    "/admin/:path*"
  ],
}