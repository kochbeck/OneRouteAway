"use client";

// Default San Francisco coordinates (Union Square) as fallback
const DEFAULT_LATITUDE = 37.7879;
const DEFAULT_LONGITUDE = -122.4075;

// Options for geolocation API - increase timeout to 15 seconds
const GEO_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 15000, // Increased from 5000ms to 15000ms (15 seconds)
  maximumAge: 0
};

export async function requestLocationPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    return false;
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      () => {
        resolve(true);
      },
      (error) => {
        console.warn("Location permission error:", error.message);
        resolve(false);
      },
      GEO_OPTIONS
    );
  });
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  error?: string;
  usingDefault: boolean;
  addressName?: string; // Name of the address if set manually
}

export async function getUserLocation(): Promise<UserLocation> {
  // Check if geolocation is supported
  if (typeof window === 'undefined' || !navigator.geolocation) {
    return {
      latitude: DEFAULT_LATITUDE,
      longitude: DEFAULT_LONGITUDE,
      error: "Geolocation is not supported by your browser",
      usingDefault: true
    };
  }
  
  // Try to get the user's location
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          usingDefault: false
        });
      },
      (error) => {
        console.warn("Geolocation error:", error.message, "(code: " + error.code + ")");
        let errorMessage = "";
        
        // Provide more user-friendly error messages
        switch(error.code) {
          case 1: // PERMISSION_DENIED
            errorMessage = "Location access was denied";
            break;
          case 2: // POSITION_UNAVAILABLE
            errorMessage = "Location information is unavailable";
            break;
          case 3: // TIMEOUT
            errorMessage = "Location request timed out - please try again";
            break;
          default:
            errorMessage = error.message;
        }
        
        resolve({
          latitude: DEFAULT_LATITUDE,
          longitude: DEFAULT_LONGITUDE,
          error: errorMessage,
          usingDefault: true
        });
      },
      GEO_OPTIONS
    );
  });
}

// Geocode a user-entered address to coordinates using Google Maps Geocoding API
export async function geocodeAddress(address: string): Promise<UserLocation | null> {
  try {
    // Add "San Francisco, CA" to the address if it doesn't already contain it
    if (!address.toLowerCase().includes('san francisco') && 
        !address.toLowerCase().includes('sf,')) {
      address = `${address}, San Francisco, CA`;
    }

    // Use the browser's fetch API to call our server endpoint
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 'OK' || !data.results || data.results.length === 0) {
      console.warn('Geocoding returned no results for address:', address);
      return null;
    }

    // Extract the coordinates from the first result
    const location = data.results[0].geometry.location;
    const formattedAddress = data.results[0].formatted_address;
    
    // Check if the address is actually in San Francisco
    const isSanFrancisco = data.results[0].address_components.some((component: any) => {
      return (
        component.types.includes('locality') && 
        component.long_name.toLowerCase().includes('san francisco')
      );
    });

    if (!isSanFrancisco) {
      console.warn('Address is not in San Francisco:', formattedAddress);
      // Still return the coordinates but with a flag
      return {
        latitude: location.lat,
        longitude: location.lng,
        usingDefault: false,
        addressName: formattedAddress,
        error: 'Note: This address may not be in San Francisco'
      };
    }

    return {
      latitude: location.lat,
      longitude: location.lng,
      usingDefault: false,
      addressName: formattedAddress
    };
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
}