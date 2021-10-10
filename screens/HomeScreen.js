import React, {useState, useContext} from 'react';
import { StyleSheet, Switch, Text, View, Button, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import MapViewComponent from '../components/MapViewComponent';
import NavigableList from '../components/ListViewComponent';
import { BoozeOfferContext } from '../services/BoozeOfferContext';


export default function HomeScreen({ navigation }) {
   // const [toggleButtonPressed, setToggleButtonPressed] = React.useState(false);
   // const toggleButton = () => {
   //     setToggleButtonPressed(!toggleButtonPressed);
   // }

   const {toggleButton, toggleButtonPressed} = useContext(BoozeOfferContext);

    if(toggleButtonPressed){
        return (
            <SafeAreaView style={styles.maincontainer}>
                    <MapViewComponent />
            </SafeAreaView>
            );
    } else {
        return (
            <SafeAreaView style={styles.maincontainer}>
                <NavigableList />
            </SafeAreaView>
            );
    }
    
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
