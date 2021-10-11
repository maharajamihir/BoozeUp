import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, SafeAreaView, View, Dimensions, Switch, TouchableOpacity, Button, TextInput, ScrollView, Platform, Animated } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LocationContext } from '../services/LocationContext';
import MapView, { Marker, Callout } from 'react-native-maps';
import { BoozeOfferContext } from '../services/BoozeOfferContext';
import { MapButton } from './ListViewComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 100; //220 might be most usable
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSERT = width * 0.1 - 10;

const MapViewScreen = ({ navigation }) => {
  const { location, error } = useContext(LocationContext);
  const { toggleButton, toggleButtonPressed } = useContext(BoozeOfferContext);
  const [boozeOffers, setboozeOffers] = useState(null);

  const initialMapState = {
    categories: [
      {
        name: 'Beer',
        //icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
      },
      {
        name: 'Wine',
        //icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
      },
      {
        name: 'Vodka',
        //icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,
      },
      {
        name: 'Whiskey',
        //icon: <MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18} />,
      },
      {
        name: 'Red Bull',
        //icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
      },
    ],
    //FIXME: useless:
    region: {
      latitude: 22.62938671242907,
      longitude: 88.4354486029795,
      //latitudeDelta: 0.04864195044303443,
      //longitudeDelta: 0.040142817690068,
      latitudeDelta: 0.004757,
      longitudeDelta: 0.006866,

    },
  };

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= boozeOffers.length) {
        index = boozeOffers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const coordinate = { latitude: boozeOffers[index].latitude, longitude: boozeOffers[index].longitude };
          _map.current.animateToRegion(
            {
              ...coordinate,
              //TODO: muss eine state für die Map einführen (?)
              latitudeDelta: initialMapState.region.latitudeDelta,
              longitudeDelta: initialMapState.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key - 1; //TODO: WARUM muss ich - 1 machen? Komischer hotfix
    console.log(markerID);

    let x = (markerID * CARD_WIDTH) + (markerID * 20);
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSERT;
    }

    _scrollView.current.getNode().scrollTo({x: x, y: 0, animated: true});
  }

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

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
            showsUserLocation={true}
            showPointsOfInterest={false}
            ref={_map}
          >
            {boozeOffers.map((marker, index) => (
              <Marker
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                key={index}
                onPress={(e) => onMarkerPress(e)}
              >
              </Marker>
            ))}
          </MapView>
          <View style={styles.searchBox}>
            <TextInput
              placeholder="Search here"
              placeholderTextColor='#000'
              autoCapitalize="none"
              style={{ flex: 1, padding: 0 }}
            />
            <Ionicons name='ios-search' size={20} />
          </View>
          <ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            height={50}
            style={styles.chipScrollView}
            contentInset={{ // iOS only
              top: 0,
              left: 0,
              bottom: 0,
              right: 20
            }}
            contentContainerStyle={{
              paddingRight: Platform.OS === 'android' ? 20 : 0
            }}
          >
            {initialMapState.categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.chipsItem}>
                {category.icon}
                <Text> {category.name} </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Animated.ScrollView
            ref={_scrollView}
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
            pagingEnabled
            snapToInterval={CARD_WIDTH + 20}
            snapToAlignment='center'
            contentInset={{
              top: 0,
              left: SPACING_FOR_CARD_INSERT,
              bottom: 0,
              right: SPACING_FOR_CARD_INSERT,
            }}
            contentContainerStyle={{
              paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSERT : 0
            }}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: mapAnimation,
                    }
                  },
                },
              ],
              { useNativeDriver: true }
            )}
          >
            {boozeOffers.map((marker, index) => (
              <View style={styles.card} key={index}>
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}> {marker.booze_type} </Text>
                  <Text numberOfLines={1} style={styles.cardDescription}> {marker.description} </Text>
                  <View style={styles.button}>
                    <TouchableOpacity
                      onPress={() => { }}
                      style={[styles.signIn, {
                        borderColor: '#FF6347',
                        borderWidth: 1
                      }]}
                    >
                      <Text style={[styles.textSign, {
                        color: '#ff6347'
                      }]}>
                        Booze up!
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

          </Animated.ScrollView>
          <MapButton
            style={styles.button1}
            value={toggleButtonPressed}
            onPress={toggleButton}
            icon="map"
          />
        </View>
        : <SafeAreaView style={styles.container}>
          <ActivityIndicator size="large" color="#000000" />
        </SafeAreaView>}
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
  container:
  {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Callout bubble
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Character image
  image: {
    width: 60,
    height: 40,
  },
  map: {
    height: '100%'
  },
  button1: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
});
