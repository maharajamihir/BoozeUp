import React, {useContext} from 'react';
import { Navigation } from './navigation/index.js';
import { AuthenticationContextProvider } from './services/AuthenticationContext.js';
import { BoozeOfferContextProvider } from './services/BoozeOfferContext.js';

export default function App() {

  return (
    <AuthenticationContextProvider>
        <BoozeOfferContextProvider>
          <Navigation />
        </BoozeOfferContextProvider>
    </AuthenticationContextProvider>
    
  ); 
  
}
