import React, { useCallback } from 'react';
import Map from './Map';
import SearchBar from './SearchBar';
import LoginButton from './LoginButton';
import { RegisterButton } from './RegisterButton';
import { searchLocations } from '../utils/googleMaps';

const MainView: React.FC = () => {
  const handleSearch = useCallback(async (query: string) => {
    await searchLocations(query);
  }, []);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <LoginButton />
      <RegisterButton />
      Main View
      <Map latitude={37.7749} longitude={-122.4194} />
    </div>
  );
};

export default MainView;