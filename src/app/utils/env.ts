// Environment variable configuration

// For client-side usage
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

// For server-side API calls (in server components or API routes)
export const SERVER_GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';
