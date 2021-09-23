import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, Button, TouchableOpacity, FlatList} from 'react-native';
import * as Location from 'expo-location';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.booze_type, textColor]}>{item.booze_type} for {item.price} Euros</Text>
    </TouchableOpacity>
  );

export default function AutomaticLocationDisplay({ navigation }) {
    const [selectedId, setSelectedId] = useState(null);
    const [boozeOffers, setboozeOffers] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);    

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            // TODO: man kann auch Location.getCurrentPositionAsync nehmen, dann genauer aber langsamer
            let location = await Location.getLastKnownPositionAsync({});
            setLocation(location);
            getBoozeOffers();
        })();
    }, []);

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
                    location : location,
                })
        }).then(response => response.json())
        .then(data => setboozeOffers(data))
        .then(booze => console.log("Recieved data: " + booze))
        .catch(error => console.log(error))
        .then(l => {return l});
      }

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
      <SafeAreaView style={styles.container}>
        <Text>
          {text}
        </Text>
        <FlatList
        data={boozeOffers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
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
