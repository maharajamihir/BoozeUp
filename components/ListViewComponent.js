import React, {useState, useContext} from 'react';
import { ActivityIndicator, StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList, RefreshControl} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { LocationContext } from '../services/LocationContext';
import BoozeDisplay from './BoozeDisplay';
import { textStyles } from '../styles/TextStyles';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.box, backgroundColor]}>
    <Text style={[styles.booze_type, textColor]}>{item.booze_type} for {item.price}€</Text>
    <Text style={[styles.booze_type, textColor]}>Check it out now!</Text>
   
  </TouchableOpacity>
);

const ListView = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
    const [boozeOffers, setboozeOffers] = useState(null);
    const {location, error} = useContext(LocationContext);  

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#000000" : "#ffffff";
        const color = item.id === selectedId ? 'white' : 'black';
    
        return (
          <Item
            item={item}
            onPress={() => {
              setSelectedId(item.id);
              navigation.navigate('Booze', { item: item});
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
                    latitude : location.coords.latitude,
                    longitude : location.coords.longitude,
                })
        }).then(response => response.json())
        .then(data => setboozeOffers(data))
        .then(booze => console.log("Received data for Booze List: " + JSON.stringify(booze)))
        .catch(error => console.log(error))
        .then(l => {return l});
      }

      if(location && !boozeOffers){
        getBoozeOffers();
    }

    const onRefresh = () => {
      setboozeOffers(null);
      getBoozeOffers();
    }

    if(boozeOffers){
        return (
        <SafeAreaView style={styles.list}>
        <Text style={textStyles.title}>Booze in your Area</Text>
            <FlatList
            refreshControl={
                <RefreshControl
                  refreshing={!boozeOffers}
                  onRefresh={onRefresh}
                />
              }
            data={boozeOffers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            />
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

const NavigableList = (
  data,
  renderItem,
  renderItemScreen,
  listScreenOptions,
  itemScreenOptions
) => {

  return (
        <Stack.Navigator>
          <Stack.Screen
            name="List"
            component={ListView}
            options={{ headerShown: false }}
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
    list: {
      marginBottom: 75,
    }
});
