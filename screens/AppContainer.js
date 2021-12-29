import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import AddBoozeScreen from './AddBoozeScreen';
import { LocationContext } from '../services/LocationContext';
import LocationRequestScreen from './LocationRequestScreen';
import { Ionicons } from '@expo/vector-icons';
import MoreScreen from './MoreScreen';
import Notifications from './Notifications';
// https://ionic.io/ionicons

const Drawer = createDrawerNavigator();

export default function AppContainer() {

  const {gotLocation, requestLocation} = useContext(LocationContext);

  useEffect(() => {
      requestLocation();
  }, []);

  if(gotLocation){
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Drawer.Screen name="Notifications" component={Notifications} />
        <Drawer.Screen name="More" component={MoreScreen}
         />
      </Drawer.Navigator>
    </NavigationContainer>
  );
  } else {
    return(
    <LocationRequestScreen />
    )
  }
}
