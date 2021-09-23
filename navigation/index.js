import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationContext } from '../services/AuthenticationContext';
import AppContainer from '../screens/AppContainer';
import LoginContainer from '../screens/LoginContainer';

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  /*Uncomment this for quick development purposes */
  //const isAuthenticated = true;
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppContainer /> : <LoginContainer />}
    </NavigationContainer>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> 72a096e440613d958db332518c88b7b97ae2fd76
