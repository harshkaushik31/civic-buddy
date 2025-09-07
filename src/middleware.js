import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname
  
  const isPublicPath = path === '/login' || 
                      path === '/signup' || 
                      path === '/verify-email' || 
                      path === '/contact' || 
                      path === '/privacy' || 
                      path === '/about';
  
  const isProtectedPath = path === '/user-profile' || 
                         path === '/dashboard' || 
                         path.startsWith('/admin');
  
  const token = request.cookies.get("token")?.value;
  
  if (isPublicPath && token && (path === '/login' || path === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url))
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