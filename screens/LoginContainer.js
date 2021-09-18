import React, {createContext} from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './SignupScreen'
import LoginScreen from './LoginScreen'
  
function AuthentificationScreen({ navigation }) {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
                />
                <Button
                title="Signup"
                onPress={() => navigation.navigate('Signup')}
                />
      </View>
    );
  }


const LoginStack = createNativeStackNavigator();

export default function LoginContainer() {
    return (
      <NavigationContainer independent={true}>
        <LoginStack.Navigator>
        <LoginStack.Screen name="Please Login" component={AuthentificationScreen} />
        <LoginStack.Screen name="Login" component={LoginScreen} />
        <LoginStack.Screen name="Signup" component={SignupScreen} />
        </LoginStack.Navigator>
      </NavigationContainer>
    );
  }