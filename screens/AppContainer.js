import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import AddBoozeScreen from './AddBoozeScreen';
import { LocationContext } from '../services/LocationContext';
import LocationRequestScreen from './LocationRequestScreen';
import { Ionicons } from '@expo/vector-icons';
import MoreScreen from './MoreScreen';
import Notifications from './Notifications';
// https://ionic.io/ionicons

const Tab = createBottomTabNavigator();

export default function AppContainer() {

  const {gotLocation, requestLocation} = useContext(LocationContext);

  useEffect(() => {
      requestLocation();
  }, []);

  if(gotLocation){
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'md-home'
                : 'md-home-outline';
            } else if (route.name === 'More') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Notifications') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="More" component={MoreScreen}
        options={{ headerShown: false }}
         />
      </Tab.Navigator>
    </NavigationContainer>
  );
  } else {
    return(
    <LocationRequestScreen />
    )
  }
}