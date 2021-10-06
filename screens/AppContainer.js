import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';
import AddBoozeScreen from './AddBoozeScreen';
import { LocationContext } from '../services/LocationContext';
import LocationRequestScreen from './LocationRequestScreen';

const Tab = createBottomTabNavigator();

export default function AppContainer() {

  const {gotLocation, requestLocation} = useContext(LocationContext);

  useEffect(() => {
      requestLocation();
  }, []);

  if(gotLocation){
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add Booze" component={AddBoozeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
  } else {
    return(
    <LocationRequestScreen />
    )
  }
}