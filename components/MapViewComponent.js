import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, SafeAreaView, View, Dimensions, Switch} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LocationContext } from '../services/LocationContext';
import MapView, { Marker } from 'react-native-maps';
import { BoozeOfferContext } from '../services/BoozeOfferContext';

const MapViewScreen = ({ navigation }) => {
    const {location, error} = useContext(LocationContext);  
    const {toggleButton, toggleButtonPressed} = useContext(BoozeOfferContext);

    let text = 'Waiting..';
    if (error) {
        text = error;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <View>
            <SafeAreaView style={styles.maincontainer}>
                    <Switch
                        style={styles.button}
                        value={toggleButtonPressed}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={toggleButtonPressed ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleButton}
                    /> 
            </SafeAreaView>

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

const Stack = createNativeStackNavigator();

const MapViewComponent = () => {

    return (
          <Stack.Navigator>
            <Stack.Screen
              name="Map"
              component={MapViewScreen}
              //options={{ headerShown: false }}
            />
          </Stack.Navigator>
      );
  }
  
export default MapViewComponent;
  
const styles = StyleSheet.create({
    maincontainer:
    {
        marginTop: 10, 
    },
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
