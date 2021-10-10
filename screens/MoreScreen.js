import React, {useState, useContext} from 'react';
import {StyleSheet, Text, SafeAreaView, TouchableOpacity,ScrollView, View} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';
import Settings from './Settings';
import MyAccount from './MyAccount';
import MyOffers from './MyOffers';
import AddBoozeScreen from './AddBoozeScreen';
import { textStyles } from '../styles/TextStyles';
import { Ionicons } from '@expo/vector-icons';


const Item = ({ text, onPress, style, icon}) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Text style={{textAlign: "center", fontSize: 20,}}>
    <Ionicons name={icon} size={32} color="black"/>
    </Text>
    <Text style={{textAlign: "center", fontSize: 20, color: "#000000"}}>
       {text}
    </Text>  
  </TouchableOpacity>
);

const ListView = ({ navigation }) => {
  return(
 <SafeAreaView>
   <ScrollView>
     <ProfileScreen />
     <View style={styles.container}>
      <View style={styles.item_container}>
      <Item 
        text="My Account"
        style={styles.item}
        onPress={() => navigation.navigate("My Account")}
        icon="person"
      />
      <Item 
        text="My Offers"
        style={styles.item}
        onPress={() => navigation.navigate("My Offers")}
        icon="list"
      />
      </View>
      <View style={styles.item_container}>
      <Item 
        text="Upload Offer"
        style={styles.item}
        onPress={() => navigation.navigate("Upload Offer")}
        icon="add-circle"
      />
      <Item 
        text="Settings"
        style={styles.item}
        onPress={() => navigation.navigate("Settings")}
        icon="settings"
      />
      </View>
     </View>
   </ScrollView>
 </SafeAreaView>
  );
       
}

const Stack = createNativeStackNavigator();

const MoreScreen = () => {

  return (
        <Stack.Navigator>
          <Stack.Screen
            name="More"
            component={ListView}
            //options={{ headerShown: false }}
          />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="My Account" component={MyAccount} />
          <Stack.Screen name="My Offers" component={MyOffers} />
          <Stack.Screen name="Upload Offer" component={AddBoozeScreen} />
        </Stack.Navigator>
    );
}

export default MoreScreen;
  
const styles = StyleSheet.create({
    container:
    {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center' 
    },
    item: {
      width:180,
      height: 180,
      margin: 12,
      borderWidth: 5,
      padding: 10,
      borderRadius: 10,
      justifyContent: 'center',
  },
    item_container: {
        flexDirection: 'row', 
        alignContent: 'center',
        margin: 12,
        padding: 10,
    },
});
