import React, { useState, createContext } from 'react';
import * as Location from 'expo-location';

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const requestLocation = () => {
    setIsLoading(true);
    setError(null);
    setLocation(null);

    (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setError('Permission to access location was denied');
            return;
        }

        // TODO: man kann auch Location.getCurrentPositionAsync nehmen, dann genauer aber langsamer
        let location = await Location.getLastKnownPositionAsync({});
        setLocation(location);
        
    })();
    setIsLoading(false);
      
  };


  return (
    <LocationContext.Provider
      value={{
        gotLocation: !!location,
        isLoading,
        location,
        error,
        requestLocation
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};