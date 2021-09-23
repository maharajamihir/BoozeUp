import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationContext } from '../services/AuthenticationContext';
import AppContainer from '../screens/AppContainer';
import LoginContainer from '../screens/LoginContainer';

/* TODO: revert
export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  //const isAuthenticated = true;
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppContainer /> : <LoginContainer />}
    </NavigationContainer>
  );
};
*/

export const Navigation = () => {
  //const isAuthenticated = true;
  return (
    <NavigationContainer>
      <AppContainer/>
    </NavigationContainer>
  );
};
