import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, SafeAreaView, View} from 'react-native';
import { LocationContext } from '../services/LocationContext';

export default function MapViewComponent({ navigation }) {
    const {location, error} = useContext(LocationContext);  

    let text = 'Waiting..';
    if (error) {
        text = error;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
      <SafeAreaView style={styles.container}>
        <Text>
          {text}
        </Text>
        {location ? 
        <View>
            <Text>Latitude: {location.coords.latitude}</Text>
            <Text>Longitude: {location.coords.latitude}</Text>
        </View>
         : <Text>Loading...</Text>}
      </SafeAreaView>
    );
  }
  
const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        marginTop: 100, 
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