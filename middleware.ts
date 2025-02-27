import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    '/',                // Landing page
    '/api/.*',          // Public API routes
    '/terms',           // Terms of service
    '/privacy',         // Privacy policy
    // Add any other public routes here
  ],
  
  // Routes that can be accessed by authenticated and non-authenticated users
  ignoredRoutes: [
    '/_next/static/.*', // Next.js static files
    '/favicon.ico',
    '/images/.*',       // Public images
    // Add any other ignored routes here
  ],
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};