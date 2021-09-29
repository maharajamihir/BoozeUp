import React, {useState, useContext} from 'react';
import { StyleSheet, Text, SafeAreaView, Button, TouchableOpacity, FlatList} from 'react-native';
import { LocationContext } from '../services/LocationContext';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.box, backgroundColor]}>
    <Text style={[styles.booze_type, textColor]}>{item.booze_type} for {item.price}€</Text>
   {item.distance ? 
   <Text style={[styles.booze_type, textColor]}>only {item.distance} away!</Text> :
   <Text style={[styles.booze_type, textColor]}>Check it out now!</Text>
   }
  </TouchableOpacity>
);

export default function AutomaticLocationDisplay({ navigation }) {
    const [selectedId, setSelectedId] = useState(null);
    const [boozeOffers, setboozeOffers] = useState(null);
    const {location, error} = useContext(LocationContext);  

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#000000" : "#ffffff";
        const color = item.id === selectedId ? 'white' : 'black';
    
        return (
          <Item
            item={item}
            onPress={() => setSelectedId(item.id)}
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
        .then(booze => console.log("Received data: " + booze))
        .catch(error => console.log(error))
        .then(l => {return l});
      }

      if(location && !boozeOffers){
        getBoozeOffers();
    }

    let text = 'Waiting..';
    if (error) {
        text = error;
    } else if (location) {
        text = JSON.stringify(location);
    }

    if(boozeOffers){
        return (
        <SafeAreaView>
            <Text>
            Booze in Your Area:
            </Text>
            <FlatList
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
                <Text>
               Loading...
                </Text>
            </SafeAreaView>
            );
    }
  }
  
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
});
