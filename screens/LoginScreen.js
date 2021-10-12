import React, { useContext } from 'react';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native';
import { AuthenticationContext } from '../services/AuthenticationContext';
import { BoozeUpButton, buttonStyles } from '../styles/ButtonStyles';
import { textStyles } from '../styles/TextStyles';


export default function LoginScreen() {
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const { onLogin, error, isLoading } = useContext(AuthenticationContext);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       
                <Text style={textStyles.title}>Please Login to BoozeUp!</Text>
                <View>
                    
                        <TextInput 
                            style={buttonStyles.box}
                            onChangeText={setEmail}
                            autoCompleteType="email"
                            keyboardType="email-address"
                            placeholder="Email"
                            autoCapitalize = 'none'
                        />
                        <TextInput 
                             style={buttonStyles.box}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            autoCompleteType="password"
                            placeholder="Password"
                        />
                    {(error && error[1] == 400) ? <Text styles={textStyles.paragraph}>User not found! Please check your login credentials.</Text> : null}
                </View>
                {(email && password) ?
                <BoozeUpButton
                title="Login"
                onPress={() => onLogin(email.trim(),password.trim())}
                loading={isLoading}
                /> : null}
      </View>
    );
  }
