import React, {useContext} from 'react';
import { Navigation } from './navigation/index.js';
import { AuthenticationContextProvider } from './services/AuthenticationContext.js';
import { BoozeOfferContextProvider } from './services/BoozeOfferContext.js';
import { LocationContextProvider } from './services/LocationContext.js';

export default function App() {

  return (
    <LocationContextProvider>
      <AuthenticationContextProvider>
          <BoozeOfferContextProvider>
            <Navigation />
          </BoozeOfferContextProvider>
      </AuthenticationContextProvider>
    </LocationContextProvider>
    
  ); 
  
}
