import React, {useState, useEffect} from 'react';
import { StyleSheet, TextInput, Text, SafeAreaView, Button, FlatList, TouchableOpacity} from 'react-native';
import BoozeOffers from './BoozeOffers';
import * as Location from 'expo-location';



export default function ManualLocationSearch({ navigation }) {

    const [userLocation, setUserLocation] = useState(null);

    return (
      <SafeAreaView style={styles.container}>
        <TextInput 
            style={styles.input}
            onChangeText={setUserLocation}
            placeholder="Enter your location (PLZ)"
            autoCompleteType="postal-code"
            keyboardType="number-pad"
        />
        
        <BoozeOffers location={userLocation}/>

      </SafeAreaView>
    );
  }
  
const styles = StyleSheet.create({
    container:
    {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center' 
    },
    input: {
        height: 50,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
