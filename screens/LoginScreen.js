import React, { useContext } from 'react';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native';
import { AuthenticationContext } from '../services/AuthentificationContext';


export default function LoginScreen() {
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const { onLogin } = useContext(AuthenticationContext);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       
                <Text>Please Login to BoozeUp!</Text>
                <View>
                    
                    <Text>Email:</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={setEmail}
                        />
                        <Text>Password:</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                        
                </View>
                <Button
                title="Login"
                onPress={() => onLogin(email,password)}
                />
      </View>
    );
  }


  const styles = StyleSheet.create({
    input: {
      height: 50,
      width: 300,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });