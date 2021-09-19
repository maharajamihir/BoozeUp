import React, {useContext} from 'react';
import { Navigation } from './navigation/index.js';
import { AuthenticationContextProvider } from './services/AuthentificationContext.js';

export default function App() {

  return (
    <AuthenticationContextProvider>
        <Navigation />
    </AuthenticationContextProvider>
    
  ); 
  
}
