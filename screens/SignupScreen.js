import React, { useContext } from 'react';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native';
import { AuthenticationContext } from '../services/AuthenticationContext';
import { RadioButton } from 'react-native-paper';


export default function LoginScreen() {
  const [username, setUsername] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [number, setNumber] = React.useState(null);
  const [password, setPassword] = React.useState('');
  const [doesPasswordMatch, setDoesPasswordMatch] = React.useState(false);
  const { onRegister, error, isLoading } = useContext(AuthenticationContext);

  const [checked, setChecked] = React.useState(false);

  const repeatPassword = (repeatedPassword) => {
    if (repeatedPassword === password && password !== '') {
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
         <View style={{ flexDirection: 'row', alignContent: 'center' }}>
        <RadioButton
          status={checked === true ? 'checked' : 'unchecked'}
          onPress={() => checked === false ? setChecked(true) : setChecked(false)}
        />
        <View style={{ alignSelf: 'center' }}>
          <Text>I hereby confirm, that I am 18+ years old</Text>
        </View>
      </View>
        {isLoading ? <Text>Logging in... Please wait...</Text> : null}
        {(error && error[1] == 400) ? <Text>User with this email already exists.</Text> : null}
      </View>{(doesPasswordMatch && checked) ?
        <Button
          title="Signup"
          onPress={() => onRegister(username.trim(), number, email.trim(), password.trim())}
        /> :
        <Text>Please fill out all the fields</Text>
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
