import React, {useContext, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, Button} from 'react-native';
import { LocationContext } from '../services/LocationContext';

export default function LocationRequestScreen({ navigation }) {

    const { requestLocation } = useContext(LocationContext);

    return (
      <SafeAreaView style={styles.container}>
        <Text>Hello. Welcome to BoozeUp! To recieve exciting offers in your Area you need to enable your location.</Text>
        <Button
            title="Enable Location"
            onPress={() => requestLocation()}
        />
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