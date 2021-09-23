import React, {useState, useEffect} from 'react';
import { StyleSheet, TextInput, Text, View, Button, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import ManualLocationSearch from '../components/ManualLocationSearch';
import AutomaticLocationDisplay from '../components/AutomaticLocationDispay';
import ToggleSwitch from 'toggle-switch-react-native'


export default function HomeScreen({ navigation }) {
    const [toggleButtonPressed, setToggleButtonPressed] = React.useState(false);
    return (
    <SafeAreaView style={styles.maincontainer}>
        <View>
            <ToggleSwitch
            style={styles.button}
            isOn={toggleButtonPressed}
            onColor="green"
            offColor="red"
            label="Manual Location"
            labelStyle={{ color: "black", fontWeight: "900" }}
            size="large"
            onToggle={isOn => {
                console.log("changed to : ", isOn);
                setToggleButtonPressed(!toggleButtonPressed);
                }}
            /> 
        </View>
        <View style={styles.container}>
        {toggleButtonPressed ? <ManualLocationSearch /> : <AutomaticLocationDisplay />}
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
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center' 
    },
    button: {
        right: 5,
        top: 5,
    },
});
