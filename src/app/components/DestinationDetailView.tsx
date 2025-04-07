"use client";
import { useState, useEffect } from "react";
import { getPlaceDetails, setFavoriteDestination, unsetFavoriteDestination } from "../utils/googleMaps";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const gold = "#FFD700";
const DestinationDetailView = () => {
  const [placeDetails, setPlaceDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [placeId, setPlaceId] = useState("ChIJN1t_tDeuEmsRUsoyG83frY4"); // Example place ID

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      if (!placeId) return;
      try {
        const details = await getPlaceDetails(placeId);
        setPlaceDetails(details);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setPlaceDetails(null);
      }
    };

    fetchPlaceDetails();
  }, [placeId]);

  const openGoogleMaps = () => {
    if (placeDetails?.geometry?.location) {
      const { lat, lng } = placeDetails.geometry.location;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=transit`;
      window.open(url, "_blank");
    } else {
      setError("Could not get location.");
    }
  };
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const toggleFavorite = async () => {
    if (isFavorite) {
      await unsetFavoriteDestination(placeId);
    } else {
      await setFavoriteDestination(placeId);
    }
    setIsFavorite(!isFavorite);
  };


  return (
    <div>
      <h2>Destination Detail View</h2>
      {error && <p>Error: {error}</p>}
      {placeDetails ? (
        <div>
          <h3>{placeDetails.name}</h3>
          <button onClick={toggleFavorite}>
            {isFavorite ? (
              <FaStar color={gold} size={30} />
            ) : (
              <FaRegStar color={gold} size={30} />
            )}
          </button>

          <p>Address: {placeDetails.formatted_address}</p>
          <p>Rating: {placeDetails.rating}</p>
          <button onClick={openGoogleMaps}>Open in Google Maps</button>
          {/* Display other relevant details */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DestinationDetailView;