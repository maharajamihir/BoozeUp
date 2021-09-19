import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
    let userLocation = '';
    const setLocation = (loc) => {
        userLocation = loc;
        changeLocation();
    }
    const [boozeOffers, setboozeOffers] = React.useState(null);
    const changeLocation = () => {
        const url = 'https://boozeup.herokuapp.com/browse?'
        fetch(url, {
            method: 'POST',
            headers: {    
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
              },  
            body: JSON.stringify({
                    location : userLocation,
                })
        }).then(response => response.json())
        .then(data => setboozeOffers(data))
        .then(booze => console.log(booze))
        .catch(error => console.log(error))
        .then(l => {return l});
    }
    return (
      <View style={styles.container}>
        <TextInput 
            style={styles.input}
            onChangeText={setLocation}
            placeholder="Enter your location"
        />      
        <Text>{!boozeOffers ? changeLocation() : boozeOffers}</Text>                  
      </View>
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