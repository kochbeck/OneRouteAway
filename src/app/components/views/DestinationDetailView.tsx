"use client";

import React, { useState, useEffect } from "react";
import { FaTimes, FaStar, FaRegStar } from "react-icons/fa";
import { Destination } from "../controls/DestinationCardStack";

interface DestinationDetailViewProps {
  destinationId: string;
  onClose: () => void;
}

interface DetailedDestination extends Destination {
  address: string;
  phone: string;
  website: string;
  description: string;
  reviews: {
    author: string;
    rating: number;
    text: string;
  }[];
  photos: string[];
}

export function DestinationDetailView({ destinationId, onClose }: DestinationDetailViewProps) {
  const [destination, setDestination] = useState<DetailedDestination | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // In a real application, this would fetch data from the Google Places API
    // For now, we'll use mock data
    setTimeout(() => {
      // Mock data - would be replaced with API call
      const mockDestination: DetailedDestination = {
        id: destinationId,
        name: destinationId === "d1" ? "Blue Bottle Coffee" : 
              destinationId === "d2" ? "Ferry Building Marketplace" :
              destinationId === "d3" ? "Trader Joe's" : "Sightglass Coffee",
        hours: destinationId === "d1" ? "Open until 7:00 PM" : 
                destinationId === "d2" ? "Open until 8:00 PM" :
                destinationId === "d3" ? "Open until 9:00 PM" : "Open until 6:00 PM",
        rating: destinationId === "d1" ? 4.7 : 
                destinationId === "d2" ? 4.6 :
                destinationId === "d3" ? 4.5 : 4.8,
        stopsAway: destinationId === "d1" ? 2 : 
                  destinationId === "d2" ? 3 :
                  destinationId === "d3" ? 1 : 2,
        walkingMinutes: destinationId === "d1" ? 3 : 
                      destinationId === "d2" ? 5 :
                      destinationId === "d3" ? 4 : 6,
        isFavorite: destinationId === "d1" || destinationId === "d4",
        address: destinationId === "d1" ? "66 Mint Street, San Francisco, CA 94103" : 
                destinationId === "d2" ? "1 Ferry Building, San Francisco, CA 94111" :
                destinationId === "d3" ? "555 9th St, San Francisco, CA 94103" : "270 7th Street, San Francisco, CA 94103",
        phone: "(415) 555-" + (1000 + parseInt(destinationId.substring(1))),
        website: "https://www.example.com/" + destinationId,
        description: `This is a detailed description of ${destinationId === "d1" ? "Blue Bottle Coffee" : 
                      destinationId === "d2" ? "Ferry Building Marketplace" :
                      destinationId === "d3" ? "Trader Joe's" : "Sightglass Coffee"}. It would include information about the business, its history, and what makes it special.`,
        reviews: [
          {
            author: "John Doe",
            rating: 5,
            text: "Great place! Highly recommend."
          },
          {
            author: "Jane Smith",
            rating: 4,
            text: "Very nice experience, would visit again."
          }
        ],
        photos: [
          "https://via.placeholder.com/400x300?text=Photo+1",
          "https://via.placeholder.com/400x300?text=Photo+2"
        ]
      };
      
      setDestination(mockDestination);
      setIsFavorite(mockDestination.isFavorite);
      setLoading(false);
    }, 1000);
  }, [destinationId]);

  const toggleFavorite = () => {
    // In a real application, this would update the database
    setIsFavorite(!isFavorite);
  };

  const openGoogleMapsDirections = () => {
    if (destination) {
      // Open Google Maps with transit directions to the destination
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination.address)}&travelmode=transit`,
        "_blank"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-30 transition-transform transform translate-x-0 overflow-y-auto">
      <div className="max-w-xl mx-auto p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Destination Details</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-pulse space-y-4 w-full">
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </div>
          </div>
        ) : destination ? (
          <div className="flex-1 overflow-y-auto">
            {destination.photos.length > 0 && (
              <div className="mb-4 overflow-x-auto whitespace-nowrap flex space-x-2 pb-2">
                {destination.photos.map((photo, index) => (
                  <img 
                    key={index} 
                    src={photo} 
                    alt={`${destination.name} photo ${index + 1}`}
                    className="h-64 w-auto rounded-lg inline-block"
                  />
                ))}
              </div>
            )}

            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">{destination.name}</h1>
              <button 
                onClick={toggleFavorite}
                className="p-2"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? (
                  <FaStar className="text-yellow-400" size={28} />
                ) : (
                  <FaRegStar className="text-yellow-400" size={28} />
                )}
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">{destination.hours}</p>
              <div className="flex items-center mt-1">
                <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm font-medium">
                  Rating: {destination.rating}
                </div>
                <span className="mx-2 text-gray-600 dark:text-gray-400">•</span>
                <span className="text-gray-600 dark:text-gray-400">{destination.stopsAway} stop{destination.stopsAway !== 1 ? 's' : ''} away</span>
                <span className="mx-2 text-gray-600 dark:text-gray-400">•</span>
                <span className="text-gray-600 dark:text-gray-400">{destination.walkingMinutes} min walk</span>
              </div>
            </div>

            <button
              onClick={openGoogleMapsDirections}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg mb-6 transition-colors flex items-center justify-center"
            >
              Get Directions
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 mb-6">
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{destination.description}</p>
              
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400"><strong>Address:</strong> {destination.address}</p>
                <p className="text-gray-600 dark:text-gray-400"><strong>Phone:</strong> {destination.phone}</p>
                <p className="text-gray-600 dark:text-gray-400">
                  <strong>Website:</strong> 
                  <a href={destination.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                    {destination.website}
                  </a>
                </p>
              </div>
            </div>

            {destination.reviews.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 mb-6">
                <h3 className="text-lg font-semibold mb-2">Reviews</h3>
                <div className="space-y-4">
                  {destination.reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center mb-1">
                        <p className="font-medium">{review.author}</p>
                        <div className="ml-2 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={i < review.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}
                              size={14} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p>Destination not found</p>
          </div>
        )}
      </div>
    </div>
  );
}
