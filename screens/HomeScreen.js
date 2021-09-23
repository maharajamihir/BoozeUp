import React, {useState, useEffect} from 'react';
import { StyleSheet, TextInput, Text, View, Button, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import BoozeOffers from '../components/BoozeOffers';
import * as Location from 'expo-location';



export default function HomeScreen({ navigation }) {
    const [location, setLocation] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getLastKnownPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
      <View style={styles.container}>
        <Text>
          {text}
        </Text>
        <TextInput 
            style={styles.input}
            onChangeText={setUserLocation}
            placeholder="Enter your location (PLZ)"
            keyboardType="number-pad"
        />
        {/* TODO: Needs fixing. I don't know about this stuff @mihir
        <BoozeOffers location={userLocation}/>
         */}
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
