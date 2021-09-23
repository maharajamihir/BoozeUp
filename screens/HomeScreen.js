import React, {useState} from 'react';
import { StyleSheet, TextInput, View} from 'react-native';
import BoozeOffers from '../components/BoozeOffers';



export default function HomeScreen({ navigation }) {
    const [userLocation, setLocation] = useState(null);

    return (
      <View style={styles.container}>
        <TextInput 
            style={styles.input}
            onChangeText={setLocation}
            placeholder="Enter your location (PLZ)"
            autoCompleteType="postal-code"
            keyboardType="number-pad"
        />     
        <BoozeOffers location={userLocation}/>

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