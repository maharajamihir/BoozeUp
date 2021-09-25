import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, SafeAreaView, View, Dimensions} from 'react-native';
import { LocationContext } from '../services/LocationContext';
import MapView, { Marker } from 'react-native-maps';

export default function MapViewComponent({ navigation }) {
    const {location, error} = useContext(LocationContext);  

    let text = 'Waiting..';
    if (error) {
        text = error;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <View>
            {location ?
            <View>
                <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.004757,
                    longitudeDelta: 0.006866,
                }}
                >
                  <Marker
                    coordinate={{ latitude : location.coords.latitude, longitude : location.coords.longitude }}
                  />
                </MapView>
            {/*
                <Text>Latitude: {location.coords.latitude}</Text>
                <Text>Longitude: {location.coords.latitude}</Text>

            */}
            </View>
            : <Text>Loading...</Text>}
        </View>
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
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});
