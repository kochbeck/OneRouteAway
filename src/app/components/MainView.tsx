import React, { useCallback, useState, useEffect } from 'react';
import { AuthButton } from './AuthButton';
import { WalkingDistanceDropdown } from './controls/WalkingDistanceDropdown';
import { OperatingHoursDropdown } from './controls/OperatingHoursDropdown';
import { DestinationTypeDropdown } from './controls/DestinationTypeDropdown';
import { RouteSelectionCardStack } from './controls/RouteSelectionCardStack';
import { RouteDetailView } from './views/RouteDetailView';
import { DestinationDetailView } from './views/DestinationDetailView';
import { LoginView } from './views/LoginView';
import { getUserLocation, requestLocationPermission, UserLocation } from '../utils/location';
import { AddressInputModal } from './AddressInputModal';

const MainView: React.FC = () => {
  // State for filter values
  const [walkingDistance, setWalkingDistance] = useState('10'); // default to 10 min
  const [operatingHours, setOperatingHours] = useState('now'); // default to open now
  const [destinationType, setDestinationType] = useState('food_drink'); // default to food & drink
  
  // State for view management
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);
  const [showLoginView, setShowLoginView] = useState(false);
  
  // Location state
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // Request location permission and get user location on component mount
  useEffect(() => {
    const initLocation = async () => {
      setLocationLoading(true);
      const hasPermission = await requestLocationPermission();
      setPermissionRequested(true);
      
      if (hasPermission) {
        const location = await getUserLocation();
        setUserLocation(location);
        setShowLocationPrompt(false);
      } else {
        setShowLocationPrompt(true);
      }
      setLocationLoading(false);
    };
    
    initLocation();
  }, []);

  // Handle retry for location permission
  const handleRetryLocation = async () => {
    setLocationLoading(true);
    const hasPermission = await requestLocationPermission();
    
    if (hasPermission) {
      const location = await getUserLocation();
      setUserLocation(location);
      setShowLocationPrompt(false);
    }
    setLocationLoading(false);
  };

  // Handle opening the address input modal
  const handleOpenAddressModal = () => {
    setShowAddressModal(true);
  };

  // Handle address submission
  const handleAddressSubmit = (location: UserLocation) => {
    setUserLocation(location);
    setShowLocationPrompt(false);
  };

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
      {/* Location permission dialog */}
      {showLocationPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Location Access Required</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              This application requires location services to operate properly. Please enable location access to continue.
            </p>
            <div className="flex flex-col space-y-2">
              <button
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                onClick={handleRetryLocation}
                disabled={locationLoading}
              >
                {locationLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Getting Location...
                  </>
                ) : (
                  'Grant Location Access'
                )}
              </button>
              <button
                className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                onClick={handleOpenAddressModal}
                disabled={locationLoading}
              >
                Enter Address Instead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Address input modal */}
      {showAddressModal && (
        <AddressInputModal 
          onClose={() => setShowAddressModal(false)} 
          onAddressSubmit={handleAddressSubmit} 
        />
      )}

      {/* Header with auth button */}
      <header className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold">One Route Away</h1>
        <div className="flex space-x-2">
          <AuthButton onClick={handleLogin} />
        </div>
      </header>

      {/* Display status when using default location due to error */}
      {userLocation?.usingDefault && !showLocationPrompt && (
        <div className="bg-yellow-100 dark:bg-yellow-900 p-3 text-sm text-yellow-800 dark:text-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Using approximate location in San Francisco.</p>
              {userLocation?.error && <p className="text-xs mt-1">{userLocation.error}</p>}
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleRetryLocation}
                className="px-3 py-1 text-xs bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded hover:bg-yellow-300 dark:hover:bg-yellow-700 transition-colors flex items-center"
                disabled={locationLoading}
              >
                {locationLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-1 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Retrying...
                  </>
                ) : (
                  'Try Again'
                )}
              </button>
              <button 
                onClick={handleOpenAddressModal}
                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
              >
                Enter Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display location name when using manual address */}
      {userLocation?.addressName && !userLocation.usingDefault && !showLocationPrompt && (
        <div className="bg-green-100 dark:bg-green-900 p-3 text-sm text-green-800 dark:text-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Using location: {userLocation.addressName}</p>
              {userLocation?.error && <p className="text-xs mt-1">{userLocation.error}</p>}
            </div>
            <button 
              onClick={handleOpenAddressModal}
              className="px-3 py-1 text-xs bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded hover:bg-green-300 dark:hover:bg-green-700 transition-colors"
            >
              Change Address
            </button>
          </div>
        </div>
      )}

      {/* Loading indicator when getting location */}
      {locationLoading && !userLocation && !showLocationPrompt && (
        <div className="bg-blue-100 dark:bg-blue-900 p-3 text-sm text-blue-800 dark:text-blue-200 flex items-center justify-center space-x-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Getting your location...</span>
        </div>
      )}

      {/* Filter controls */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-900">
        <WalkingDistanceDropdown onChange={setWalkingDistance} />
        <OperatingHoursDropdown onChange={setOperatingHours} />
        <DestinationTypeDropdown onChange={setDestinationType} />
      </div>

      {/* Main content - shows route selection */}
      <div className="flex-1 overflow-y-auto p-4">
        <RouteSelectionCardStack 
          onRouteSelect={handleRouteSelect}
          walkingDistance={walkingDistance}
          operatingHours={operatingHours}
          destinationType={destinationType}
          userLocation={userLocation || undefined}
        />
      </div>

      {/* Slide-over views */}
      {selectedRouteId && (
        <RouteDetailView 
          routeId={selectedRouteId}
          onClose={handleCloseRouteDetailView}
          walkingDistance={walkingDistance}
          operatingHours={operatingHours}
          destinationType={destinationType}
          onDestinationSelect={handleDestinationSelect}
          userLocation={userLocation || undefined}
        />
      )}

      {selectedDestinationId && (
        <DestinationDetailView 
          destinationId={selectedDestinationId}
          onClose={handleCloseDestinationDetailView}
          userLocation={userLocation || undefined}
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