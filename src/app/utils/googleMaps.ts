import { getFirebase } from "./firebase";
import { getDatabase, ref, child, set, remove } from "firebase/database";

export async function searchLocations(query: string): Promise<any[]> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error("GOOGLE_MAPS_API_KEY is not set in the environment variables.");
    return [];
  }

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      const firebase = getFirebase();
      if (firebase) {
        const db = getDatabase(firebase)
        const locationsRef = ref(db, 'locations');
        data.results.forEach(async (location: any) => {
          await set(child(locationsRef, location.place_id), location);
        });
        return data.results;
      }
      else{
        return data.results;
      }
    } else {
      console.error("Error searching locations:", data.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching location data:", error);
    return [];
  }
}

export async function setFavoriteDestination(placeId: string): Promise<void> {
  const firebase = getFirebase();
  if (!firebase) {
    console.error("Firebase is not initialized.");
    return;
  }

  try {
    const db = getDatabase(firebase)
    const favoritesRef = ref(db, 'favorites');
    await set(child(favoritesRef, placeId), true)
  } catch (error) {
    console.error("Error setting favorite destination:", error);
  }
}

export async function unsetFavoriteDestination(placeId: string): Promise<void> {
  const firebase = getFirebase();
  if (!firebase) {
    console.error("Firebase is not initialized.");
    return;
  }

  try {
    const db = getDatabase(firebase)
    const favoritesRef = ref(db, 'favorites');
    await remove(child(favoritesRef, placeId))
  } catch (error) {
    console.error("Error unsetting favorite destination:", error);
  }
}

export async function getPlaceDetails(placeId: string): Promise<any> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error("GOOGLE_MAPS_API_KEY is not set in the environment variables.");
    return;
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 'OK') {
      return data.result;
    }
  } catch (error) {
    console.error("Error fetching place details:", error);
  }
}