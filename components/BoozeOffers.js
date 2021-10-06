import React, { useState } from 'react';
import {FlatList, SafeAreaView, StatusBar,TouchableOpacity,Text, StyleSheet, Button} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BoozeDisplay from './BoozeDisplay';

const DATA = [
    {
      id: "0",
      title: "First Item",
    },
    {
      id: "1",
      title: "Second Item",
    },
    {
      id: "2",
      title: "Third Item",
    },
  ];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
<TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
</TouchableOpacity>
);

const ListView = ({ navigation, route }) => {
    const [selectedId, setSelectedId] = useState(null);
  
    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
      const color = item.id === selectedId ? 'white' : 'black';
  
      return (
        <Item
          item={item}
          onPress={() => {
              setSelectedId(item.id);
              navigation.navigate('Profile', { name: item.title });
          }}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    );
  };





const Stack = createNativeStackNavigator();

const NavigableList = (
    data,
    renderItem,
    renderItemScreen,
    listScreenOptions,
    itemScreenOptions
) => {

    return (
          <Stack.Navigator>
            <Stack.Screen
              name="List"
              component={ListView}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Profile" component={BoozeDisplay} />
          </Stack.Navigator>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });

export default NavigableList;