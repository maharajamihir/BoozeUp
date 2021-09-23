import React, { useContext } from 'react';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native';
import { AuthenticationContext } from '../services/AuthenticationContext';


export default function LoginScreen() {
    const [username, setUsername] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [number, setNumber] = React.useState(null);
    const [password, setPassword] = React.useState('');
    const [doesPasswordMatch, setDoesPasswordMatch] = React.useState(false);
    const { onRegister, error, isLoading } = useContext(AuthenticationContext);

    const repeatPassword =(repeatedPassword) => {
        if(repeatedPassword === password && password !== ''){
          setDoesPasswordMatch(true);
        } else {
          setDoesPasswordMatch(false);
        }
    };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       
                <Text>Please Login to BoozeUp!</Text>
                <View>
                <Text>Username:</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={setUsername}
                  />
                  <Text>Email:</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={setEmail}
                  />
                  <Text>Phone Number:</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={setNumber}
                        keyboardType="number-pad"
                  />
                  <Text>Password:</Text>
                  <Text>(Don't use your bank password. We save in plaintext)</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                  />
                  <Text>Repeat Password:</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={repeatPassword}
                        secureTextEntry={true}
                  />
                  {isLoading ? <Text>Logging in... Please wait...</Text> : null}
                        {(error && error[1] == 400) ? <Text>User with this email already exists.</Text> : null}
                </View>{doesPasswordMatch ? 
                 <Button
                 title="Signup"
                 onPress={() => onRegister(username.trim(),number,email.trim(),password.trim())}
                 /> : 
                 <Text>Please enter a password and ensure it matches the repeated password</Text>
                 }
               
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
