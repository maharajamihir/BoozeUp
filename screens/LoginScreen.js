import React, { useContext } from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthenticationContext } from '../services/AuthenticationContext';
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
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);
  return (

    <NativeBaseProvider>
      <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          Welcome to BoozeUp
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
                fontSize: 'xs',
                fontWeight: 500,
              }} >
              Email ID
            </FormControl.Label>
            <Input autoCapitalize='none' onChangeText={setEmail} />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
                fontSize: 'xs',
                fontWeight: 500,
              }}>
              Password
            </FormControl.Label>
            <Input type="password" onChangeText={setPassword} />
            <Link
              _text={{ fontSize: 'xs', fontWeight: '500', color: 'indigo.500' }}
              alignSelf="flex-end"
              mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" _text={{ color: 'white' }} onPress={() => onLogin(email.trim(), password.trim())}>
            {isLoading ? <ActivityIndicator size="large" color="#ffffff" /> : <Text style={{ color: 'white'}}> Sign In </Text>}
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="muted.700" fontWeight={400}>
              {(error && error[1] == 400) ? <Text>User not found! Please check your login credentials.</Text> : <Text> </Text>}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </NativeBaseProvider>

  );
}
