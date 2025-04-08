"use client";

import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { UserLocation } from "../../utils/location";

// Import from the controls directory with the correct relative path
import { DestinationCardStack } from "../controls";

interface RouteDetailViewProps {
  routeId: string;
  onClose: () => void;
  walkingDistance: string;
  operatingHours: string;
  destinationType: string;
  onDestinationSelect: (destinationId: string) => void;
  userLocation?: UserLocation;
}

interface RouteDetail {
  routeNumber: string;
  routeName: string;
  routeDirection: string;
  nearestStopLocation: string;
  nextArrivals: string[]; // ETAs in minutes for the next three vehicles
}

export function RouteDetailView({ 
  routeId, 
  onClose,
  walkingDistance,
  operatingHours,
  destinationType,
  onDestinationSelect,
  userLocation
}: RouteDetailViewProps) {
  const [routeDetail, setRouteDetail] = useState<RouteDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would fetch data from the 511.org API
    // For now, we'll use mock data
    setTimeout(() => {
      const mockRouteDetail: RouteDetail = {
        routeNumber: routeId === "1" ? "N" : routeId === "2" ? "30" : "F",
        routeName: routeId === "1" ? "N-Judah" : routeId === "2" ? "Stockton" : "Market & Wharves",
        routeDirection: routeId === "1" ? "Outbound to Ocean Beach" : 
                        routeId === "2" ? "Northbound to Marina" : "Outbound to Fisherman's Wharf",
        nearestStopLocation: routeId === "1" ? "Powell St & Market St" : 
                            routeId === "2" ? "Stockton St & Sutter St" : "Market St & 5th St",
        nextArrivals: routeId === "1" ? ["3", "13", "23"] : 
                     routeId === "2" ? ["6", "16", "26"] : ["4", "14", "24"],
      };
      
      setRouteDetail(mockRouteDetail);
      setLoading(false);
    }, 1000);

    // Update ETAs every 60 seconds as specified in the README
    const updateInterval = setInterval(() => {
      setRouteDetail(current => {
        if (!current) return null;
        
        // Simulate ETA updates - in real app would fetch from API
        const updatedArrivals = current.nextArrivals.map(eta => {
          const newEta = Math.max(parseInt(eta) - 1, 1).toString();
          return newEta;
        });
        
        return { ...current, nextArrivals: updatedArrivals };
      });
    }, 60000);

    return () => clearInterval(updateInterval);
  }, [routeId]);

  const handleRouteCardClick = () => {
    if (routeDetail) {
      // Open Google Maps with walking directions to the nearest stop
      // In a real application, you would use the actual coordinates
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(routeDetail.nearestStopLocation)}&travelmode=walking`,
        "_blank"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-20 transition-transform transform translate-x-0 overflow-y-auto">
      <div className="max-w-xl mx-auto p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Route Details</h2>
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
            <div className="animate-pulse space-y-4">
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
              <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
            </div>
          </div>
        ) : routeDetail ? (
          <div className="flex-1 flex flex-col">
            {/* Route Detail Card */}
            <div 
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={handleRouteCardClick}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">
                    <span className="mr-2 bg-blue-600 text-white px-2 py-1 rounded-md">{routeDetail.routeNumber}</span>
                    {routeDetail.routeName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{routeDetail.routeDirection}</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Nearest stop: {routeDetail.nearestStopLocation}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">(Tap for walking directions)</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Next arrivals:</h4>
                <div className="flex space-x-3">
                  {routeDetail.nextArrivals.map((eta, index) => (
                    <div 
                      key={index} 
                      className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full font-medium"
                    >
                      {eta} min
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Destination Card Stack */}
            <DestinationCardStack 
              routeId={routeId}
              walkingDistance={walkingDistance}
              operatingHours={operatingHours}
              destinationType={destinationType}
              onDestinationSelect={onDestinationSelect}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p>Route not found</p>
          </div>
        )}
      </div>
    </div>
  );
}
