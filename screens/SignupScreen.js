import React, { useContext } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AuthenticationContext } from '../services/AuthenticationContext';
import { RadioButton } from 'react-native-paper';
import { BoozeUpButton, buttonStyles } from '../styles/ButtonStyles';
import { textStyles } from '../styles/TextStyles';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider,
} from 'native-base';

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

    <NativeBaseProvider >
      <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
        <Heading size="lg" color="coolGray.800" fontWeight="600">
          Welcome
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Sign up to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <Input autoCapitalize='none' onChangeText={setUsername} placeholder='Username' />
          </FormControl>

          <FormControl>
            <Input autoCapitalize='none' onChangeText={setEmail} placeholder='Email' />
          </FormControl>

          <FormControl>
            <Input onChangeText={setNumber} keyboardType='number-pad' placeholder='Phone number' />
          </FormControl>

          <FormControl>
            <Input type="password" onChangeText={setPassword} placeholder='Password'/>
          </FormControl>

          <FormControl>
            <Input type="password" onChangeText={repeatPassword} placeholder='Repeat Password' />
          </FormControl>

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

          {(doesPasswordMatch && checked) ?
            <Button mt="2" colorScheme="indigo" _text={{ color: 'white' }}
              onPress={() => onRegister(username.trim(), number, email.trim(), password.trim())}
              loading={isLoading}
            > Sign up </Button> :
            <Text>Please fill out all the fields</Text>
          }
        </VStack>
      </Box>
    </NativeBaseProvider >

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
