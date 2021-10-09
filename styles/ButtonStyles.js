import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

export const BoozeUpButton = ({ title, onPress, backgroundColor, textColor, loading }) => (
    <TouchableOpacity onPress={onPress} style={[buttonStyles.button, backgroundColor]}>
      {loading ? <ActivityIndicator size="large" color="#ffffff" /> : <Text style={[buttonStyles.text, textColor]}>{title}</Text>}
    </TouchableOpacity>
  );

export const buttonStyles = StyleSheet.create({
    button: {
      width: 200,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: '#000000',
      borderRadius: 100,
      },
    text:{
        textAlign: 'center',
        fontSize: 20,
        color: '#ffffff'
    },
    box: {
      height: 50,
      width: 350,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 100,
      fontSize: 20,
    },

});