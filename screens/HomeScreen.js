import React, {useState, useEffect} from 'react';
import { StyleSheet, Switch, Text, View, Button, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import MapViewComponent from '../components/MapViewComponent';
import AutomaticLocationDisplay from '../components/ListViewComponent';
import NavigableList from '../components/BoozeOffers';


export default function HomeScreen({ navigation }) {
    const [toggleButtonPressed, setToggleButtonPressed] = React.useState(false);
    const toggleButton = () => {
        setToggleButtonPressed(!toggleButtonPressed);
    }
    return (
    <SafeAreaView style={styles.maincontainer}>

            <Switch
                style={styles.button}
                value={toggleButtonPressed}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={toggleButtonPressed ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleButton}
            /> 

        <View style={styles.container}>
        {toggleButtonPressed ? <MapViewComponent /> : <NavigableList />}
        </View>
    </SafeAreaView>
    );
  }
  
const styles = StyleSheet.create({
    maincontainer:
    {
        flex: 1, 
    },
    container:
    {
        flex: 0, 
        justifyContent: 'center',
        //alignItems: 'center' 
    },
    button: {
        right: 5,
        top: 5,
    },
});
