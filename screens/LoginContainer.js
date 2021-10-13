import React, { createContext } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './SignupScreen'
import LoginScreen from './LoginScreen'
import { BoozeUpButton } from "../styles/ButtonStyles";
import { textStyles } from '../styles/TextStyles';
import { Box, Heading, Button, Center, NativeBaseProvider } from 'native-base';

function AuthentificationScreen({ navigation }) {

  return (

    <NativeBaseProvider>
      <Center flex={1}>
        <Box safeArea p="2" py="8" w="90%" mx="auto">
          <Heading size="lg" fontWeight="600" color="coolGray.800">
            Welcome to BoozeUp!
        </Heading>
          <Button mt="4" py="3" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => navigation.navigate('Login')}>
            Login
        </Button>
          <Button mt="5" py="3" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => navigation.navigate('Signup')}>
            Signup
        </Button>
        </Box>
      </Center>
    </NativeBaseProvider>

  );
}


const LoginStack = createNativeStackNavigator();

export default function LoginContainer() {
  return (
    <NavigationContainer>
      <LoginStack.Navigator initialRouteName="Please Login">
        <LoginStack.Screen name="Please Login" component={AuthentificationScreen} />
        <LoginStack.Screen name="Login" component={LoginScreen} />
        <LoginStack.Screen name="Signup" component={SignupScreen} />
      </LoginStack.Navigator>
    </NavigationContainer>
  );
}
