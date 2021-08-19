import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import LoginScreen from './screens/LoginScreen';



export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();



  if (!isLoadingComplete) {
    return null;
  }else if(!isLoggedIn){
    return <LoginScreen />;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
