"use client";

import React, { useState, useEffect } from "react";
import { RouteCard } from "./RouteCard";

// This would come from your API call to 511.org in a real implementation
export interface RouteData {
  id: string;
  routeNumber: string;
  routeName: string;
  routeDirection: string;
  nearestStopLocation: string;
  eta: string; // in minutes
  destinationCount: number;
}

interface RouteSelectionCardStackProps {
  onRouteSelect: (routeId: string) => void;
  walkingDistance: string; // in minutes
  operatingHours: string;
  destinationType: string;
}

export function RouteSelectionCardStack({ 
  onRouteSelect, 
  walkingDistance, 
  operatingHours, 
  destinationType 
}: RouteSelectionCardStackProps) {
  const [loading, setLoading] = useState(true);
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Mock data - in a real app, this would be fetched from the 511.org API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      try {
        // This would be replaced with actual API calls in the final implementation
        const mockRoutes: RouteData[] = [
          {
            id: "1",
            routeNumber: "N",
            routeName: "N-Judah",
            routeDirection: "Outbound to Ocean Beach",
            nearestStopLocation: "Powell St & Market St",
            eta: "3",
            destinationCount: 8,
          },
          {
            id: "2",
            routeNumber: "30",
            routeName: "Stockton",
            routeDirection: "Northbound to Marina",
            nearestStopLocation: "Stockton St & Sutter St",
            eta: "6",
            destinationCount: 12,
          },
          {
            id: "3",
            routeNumber: "F",
            routeName: "Market & Wharves",
            routeDirection: "Outbound to Fisherman's Wharf",
            nearestStopLocation: "Market St & 5th St",
            eta: "4",
            destinationCount: 15,
          },
        ];
        
        setRoutes(mockRoutes);
        setLoading(false);
      } catch (err) {
        setError("Failed to load routes. Please try again.");
        setLoading(false);
      }
    }, 1500); // Simulate network delay

    // Setup update interval for ETAs (every 60 seconds per requirements)
    const updateInterval = setInterval(() => {
      setRoutes(currentRoutes => {
        return currentRoutes.map(route => {
          // Simulate ETA updates - in real app would fetch from API
          const newEta = Math.max(parseInt(route.eta) - 1, 1).toString();
          return { ...route, eta: newEta };
        });
      });
    }, 60000); // Update every 60 seconds as specified in the README

    return () => clearInterval(updateInterval);
  }, [walkingDistance, operatingHours, destinationType]);

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
          </div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading routes near you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500 dark:text-red-400">
        <p>{error}</p>
        <button 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (routes.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600 dark:text-gray-400">
        <p>No routes found that match your criteria.</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-3">Available Routes Near You</h2>
      <div className="space-y-3">
        {routes.map((route) => (
          <RouteCard 
            key={route.id} 
            route={route} 
            onClick={onRouteSelect} 
          />
        ))}
      </div>
    </div>
  );
}
