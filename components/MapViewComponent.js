import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Dimensions, Switch } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LocationContext } from '../services/LocationContext';
import MapView, { Marker } from 'react-native-maps';
import { BoozeOfferContext } from '../services/BoozeOfferContext';
import { MapButton } from './ListViewComponent';

const MapViewScreen = ({ navigation }) => {
  const { location, error } = useContext(LocationContext);
  const { toggleButton, toggleButtonPressed } = useContext(BoozeOfferContext);
  const [boozeOffers, setboozeOffers] = useState(null);

  const getBoozeOffers = () => {
    const url = 'https://boozeup.herokuapp.com/browse?'
    //const url  = 'http://localhost:5000/browse?'
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        //location : location,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    }).then(response => response.json())
      .then(data => setboozeOffers(data))
      .then(booze => console.log("Received data for Booze List: " + JSON.stringify(boozeOffers[0])))
      .catch(error => console.log(error))
      .then(l => { return l });
  }

  useEffect(() => {
    getBoozeOffers();
  }, []);
  return (
    <View>
      {(location && boozeOffers) ?
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
              coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
            />
            {boozeOffers.map((marker) => (
              <Marker
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.title}
                description={marker.description}
              />
            ))}
          </MapView>
          {/*
                <Text>Latitude: {location.coords.latitude}</Text>
                <Text>Longitude: {location.coords.latitude}</Text>

            */}

            <MapButton
              style={styles.button}
              value={toggleButtonPressed}
              onPress={toggleButton}
              icon="map"
            />

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
  },

  button: {
    position: 'absolute', 
    right: 5,
    top: 5,
 
  }
});
