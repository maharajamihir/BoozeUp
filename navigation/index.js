import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationContext } from '../services/AuthenticationContext';
import AppContainer from '../screens/AppContainer';
import LoginContainer from '../screens/LoginContainer';

export const Navigation = () => {
  var { isAuthenticated } = useContext(AuthenticationContext);
  /*Uncomment this for quick development purposes */
  //isAuthenticated = true;
  if(isAuthenticated){
    return (
      <AppContainer />
  );
  } else {
    return(
      <LoginContainer />
    );
  }
  
};
