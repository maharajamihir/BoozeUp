import React, { useState, useContext, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList, RefreshControl, Switch, ScrollView, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LocationContext } from '../services/LocationContext';
import BoozeDisplay from './BoozeDisplay';
import { textStyles } from '../styles/TextStyles';
import { BoozeOfferContext } from '../services/BoozeOfferContext';
import { Ionicons } from '@expo/vector-icons';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.box, backgroundColor]}>
    <Text style={[styles.booze_type, textColor]}>{item.booze_type} for {item.price}€</Text>
    <Text style={[styles.booze_type, textColor]}>Check it out now!</Text>

  </TouchableOpacity>
);

export const MapButton = ({ text, onPress, style, icon}) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Text style={{textAlign: "center", fontSize: 20,}}>
    <Ionicons name={icon} size={36} color="black"/>
    </Text>
  </TouchableOpacity>
);

const ListView = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [boozeOffers, setboozeOffers] = useState(null);
  const { location, error } = useContext(LocationContext);
  const { toggleButton, toggleButtonPressed } = useContext(BoozeOfferContext);

  const renderItem = ( { item }) => {
    const backgroundColor = item.id === selectedId ? "#000000" : "#ffffff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          navigation.navigate('Booze', { item: item });
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

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

  const onRefresh = () => {
    setboozeOffers(null);
    getBoozeOffers();
  }

  if (boozeOffers) {
    return (
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={!boozeOffers}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={{ flexDirection: 'row', alignContent: 'center' }}>
            <Text style={textStyles.title}>Booze in your Area</Text>

            <MapButton
              style={styles.button}
              value={toggleButtonPressed}
              onPress={toggleButton}
              icon="map-outline"
            />

          </View>
          <FlatList
            data={boozeOffers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#000000" />
      </SafeAreaView>
    );
  }
}

const Stack = createNativeStackNavigator();

const NavigableList = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        component={ListView}
      //options={{ headerShown: false }}
      />
      <Stack.Screen name="Booze" component={BoozeDisplay} />
    </Stack.Navigator>
  );
}

export default NavigableList;

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  input: {
    height: 50,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  input: {
    height: 50,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  list: {
    // marginBottom: 75,
  },
  button: {
    position: 'absolute',
    right: 5,
    top: 5,
  },

});
