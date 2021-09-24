import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, View} from 'react-native';
import * as Location from 'expo-location';

export default function MapViewComponent({ navigation }) {
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
        {location ? 
        <View>
            <Text>Latitude: {location.coords.latitude}</Text>
            <Text>Longitude: {location.coords.latitude}</Text>
        </View>
         : <Text>Loading...</Text>}
      </SafeAreaView>
    );
  }
  
const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        marginTop: 100, 
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