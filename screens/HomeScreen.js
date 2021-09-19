import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
    var dict = {
        "location": ''
    };
    const setLocation = (loc) => {
        dict["location"] = loc;
        changeLocation();
    }
    const [boozeOffers, setboozeOffers] = React.useState(null);
    const changeLocation = () => {
        fetch('http://localhost:5000/browse?', {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
                },
            body: JSON.stringify(dict)
        }).then(response => response.json())
        .then(data => setboozeOffers(data))
        .then(booze => console.log(booze))
        .catch(error => console.log(error));
    }
    return (
      <View style={styles.container}>
        <TextInput 
            style={styles.input}
            onChangeText={setLocation}
            placeholder="Enter your location"
        />      
                          
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