import React, { useCallback, useState } from 'react';
import Map from './Map';
import LoginButton from './LoginButton';
import { RegisterButton } from './RegisterButton';
import { WalkingDistanceDropdown } from './controls/WalkingDistanceDropdown';
import { OperatingHoursDropdown } from './controls/OperatingHoursDropdown';
import { DestinationTypeDropdown } from './controls/DestinationTypeDropdown';
import { RouteSelectionCardStack } from './controls/RouteSelectionCardStack';
import { RouteDetailView } from './views/RouteDetailView';
import { DestinationDetailView } from './views/DestinationDetailView';
import { LoginView } from './views/LoginView';

const MainView: React.FC = () => {
  // State for filter values
  const [walkingDistance, setWalkingDistance] = useState('10'); // default to 10 min
  const [operatingHours, setOperatingHours] = useState('now'); // default to open now
  const [destinationType, setDestinationType] = useState('food_drink'); // default to food & drink
  
  // State for view management
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);
  const [showLoginView, setShowLoginView] = useState(false);

  // Handler functions
  const handleRouteSelect = (routeId: string) => {
    setSelectedRouteId(routeId);
  };

  const handleDestinationSelect = (destinationId: string) => {
    setSelectedDestinationId(destinationId);
  };

  const handleCloseRouteDetailView = () => {
    setSelectedRouteId(null);
    setSelectedDestinationId(null); // Also close destination view if open
  };

  const handleCloseDestinationDetailView = () => {
    setSelectedDestinationId(null);
  };

  const handleLogin = () => {
    setShowLoginView(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginView(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Header with login/register buttons */}
      <header className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold">One Route Away</h1>
        <div className="flex space-x-2">
          <LoginButton onClick={handleLogin} />
          <RegisterButton />
        </div>
      </header>

      {/* Filter controls */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-900">
        <WalkingDistanceDropdown onChange={setWalkingDistance} />
        <OperatingHoursDropdown onChange={setOperatingHours} />
        <DestinationTypeDropdown onChange={setDestinationType} />
      </div>

      {/* Main content - shows map and route selection */}
      <div className="flex-1 overflow-y-auto p-4">
        <RouteSelectionCardStack 
          onRouteSelect={handleRouteSelect}
          walkingDistance={walkingDistance}
          operatingHours={operatingHours}
          destinationType={destinationType}
        />
      </div>

      {/* Map at the bottom */}
      <div className="h-48 md:h-64 relative">
        <Map latitude={37.7749} longitude={-122.4194} />
      </div>

      {/* Slide-over views */}
      {selectedRouteId && (
        <RouteDetailView 
          routeId={selectedRouteId}
          onClose={handleCloseRouteDetailView}
          walkingDistance={walkingDistance}
          operatingHours={operatingHours}
          destinationType={destinationType}
        />
      )}

      {selectedDestinationId && (
        <DestinationDetailView 
          destinationId={selectedDestinationId}
          onClose={handleCloseDestinationDetailView}
        />
      )}

      {/* Login view */}
      {showLoginView && (
        <LoginView onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default MainView;