"use client";

import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

export interface Destination {
  id: string;
  name: string;
  hours: string;
  rating: number;
  stopsAway: number;
  walkingMinutes: number;
  isFavorite: boolean;
}

interface DestinationCardStackProps {
  routeId: string;
  walkingDistance: string;
  operatingHours: string;
  destinationType: string;
  onDestinationSelect: (destinationId: string) => void;
}

export function DestinationCardStack({
  routeId,
  walkingDistance,
  operatingHours,
  destinationType,
  onDestinationSelect
}: DestinationCardStackProps) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real application, this would fetch data from the Google Maps API
    // For now, we'll use mock data
    setTimeout(() => {
      try {
        // This would be replaced with actual API calls in the final implementation
        const mockDestinations: Destination[] = [
          {
            id: "d1",
            name: "Blue Bottle Coffee",
            hours: "Open until 7:00 PM",
            rating: 4.7,
            stopsAway: 2,
            walkingMinutes: 3,
            isFavorite: true
          },
          {
            id: "d2",
            name: "Ferry Building Marketplace",
            hours: "Open until 8:00 PM",
            rating: 4.6,
            stopsAway: 3,
            walkingMinutes: 5,
            isFavorite: false
          },
          {
            id: "d3",
            name: "Trader Joe's",
            hours: "Open until 9:00 PM",
            rating: 4.5,
            stopsAway: 1,
            walkingMinutes: 4,
            isFavorite: false
          },
          {
            id: "d4",
            name: "Sightglass Coffee",
            hours: "Open until 6:00 PM",
            rating: 4.8,
            stopsAway: 2,
            walkingMinutes: 6,
            isFavorite: true
          },
        ];
        
        // Sort first by favorite status and then by walking distance
        const sortedDestinations = [...mockDestinations].sort((a, b) => {
          if (a.isFavorite !== b.isFavorite) {
            return a.isFavorite ? -1 : 1;
          }
          return a.walkingMinutes - b.walkingMinutes;
        });
        
        setDestinations(sortedDestinations);
        setLoading(false);
      } catch (err) {
        setError("Failed to load destinations. Please try again.");
        setLoading(false);
      }
    }, 1500);
  }, [routeId, walkingDistance, operatingHours, destinationType]);

  if (loading) {
    return (
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-3">Destinations</h2>
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-3">Destinations</h2>
        <div className="p-4 text-center text-red-500 dark:text-red-400 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-3">Destinations</h2>
        <div className="p-4 text-center text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p>No destinations found that match your criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-3">Destinations</h2>
      <div className="space-y-4">
        {destinations.map((destination) => (
          <div 
            key={destination.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onDestinationSelect(destination.id)}
          >
            <div className="flex justify-between">
              <div>
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold mr-2">{destination.name}</h3>
                  {destination.isFavorite && <FaStar className="text-yellow-400" size={16} />}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{destination.hours}</p>
                <div className="flex items-center mt-1">
                  <div className="flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded text-xs font-medium">
                    Rating: {destination.rating}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {destination.stopsAway} stop{destination.stopsAway !== 1 ? 's' : ''} away
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {destination.walkingMinutes} min walk
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
