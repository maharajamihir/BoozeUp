import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View, Text } from '../components/Themed';
 
import useColorScheme from '../hooks/useColorScheme';
import LoginScreen from '../screens/LoginScreen';
import { LoginParamList } from '../types';
 
 const LoginStack = createStackNavigator<LoginParamList>();
 
 export default function LoginScreenNavigator() {
   const colorScheme = useColorScheme();
 
   return (
    <LoginStack.Navigator>
    <LoginStack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ headerTitle: 'Tab One Title' }}
    />
  </LoginStack.Navigator>
   );
 }
 