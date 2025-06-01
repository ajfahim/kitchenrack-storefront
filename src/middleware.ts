import { NextRequest, NextResponse } from "next/server";

// Define protected routes that require authentication
const protectedRoutes = ["/profile", "/profile/orders", "/profile/settings"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute) {
    // Check for authentication token in cookies
    const authToken = request.cookies.get("access_token")?.value;

    // If no token is found, redirect to login page
    if (!authToken) {
      const url = new URL("/auth/login", request.url);
      // Add the original URL as a query parameter to redirect back after login
      url.searchParams.set("callbackUrl", encodeURI(pathname));
      return NextResponse.redirect(url);
    }

    // If token exists, allow the request to proceed
    // In a real implementation, you might want to validate the token here
  }

  // For non-protected routes, just proceed normally
  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    // Match all routes starting with /profile
    "/profile/:path*",
    // Add other protected routes here if needed
  ],
};
