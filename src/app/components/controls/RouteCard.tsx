"use client";

import React from "react";

interface RouteData {
  id: string;
  routeNumber: string;
  routeName: string;
  routeDirection: string;
  nearestStopLocation: string;
  eta: string; // in minutes
  destinationCount: number;
}

interface RouteCardProps {
  route: RouteData;
  onClick: (routeId: string) => void;
}

export function RouteCard({ route, onClick }: RouteCardProps) {
  return (
    <div 
      className="cursor-pointer p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-3 hover:shadow-lg transition-shadow"
      onClick={() => onClick(route.id)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">
            <span className="mr-2 bg-blue-600 text-white px-2 py-1 rounded-md">{route.routeNumber}</span>
            {route.routeName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{route.routeDirection}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Nearest stop: {route.nearestStopLocation}</p>
        </div>
        <div className="text-right">
          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full font-medium">
            ETA: {route.eta} min
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {route.destinationCount} destination{route.destinationCount !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
