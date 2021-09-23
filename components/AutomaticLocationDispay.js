import React, {useState, useEffect} from 'react';
import { StyleSheet, TextInput, Text, SafeAreaView, Button, FlatList, TouchableOpacity} from 'react-native';
import BoozeOffers from './BoozeOffers';
import * as Location from 'expo-location';



export default function AutomaticLocationDisplay({ navigation }) {
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
        })();
    }, []);

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
