import { StackScreenProps } from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from '../types';

export default function NotFoundScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'Root'>) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [text, setText] = useState("please log in");

  if(isLoggedIn){
    navigation.replace('App');
  }

  const loginHandler = () => {
    setText("User wants to log in!");
  };

  const signupHandler = () => {
    setText("User wants to sign up!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Login to BoozeUp</Text>
        <Button onPress={loginHandler} title="Log in"/>
        <Button onPress={signupHandler} title="Sign up"/>
      
      <TouchableOpacity onPress={() => navigation.replace('App')} style={styles.link}>
        <Text style={styles.linkText}>Skip Login!</Text>
      </TouchableOpacity>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
