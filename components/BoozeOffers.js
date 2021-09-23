import React, { useState } from "react";
import { Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";



const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.booze_type, textColor]}>{item.booze_type} for {item.price} Euros</Text>
  </TouchableOpacity>
);

const BoozeOffers = (props) => {
  const [selectedId, setSelectedId] = useState(null);
  const [boozeOffers, setboozeOffers] = useState(null);

  const data = () => {
    const url = 'https://boozeup.herokuapp.com/browse?'
    //const url  = 'http://localhost:5000/browse?'
    fetch(url, {
        method: 'POST',
        headers: {    
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json; charset=utf-8'
          },  
        body: JSON.stringify({
                location : props.location,
            })
    }).then(response => response.json())
    .then(data => setboozeOffers(data))
    .then(booze => console.log("Recieved data: " + booze))
    .catch(error => console.log(error))
    .then(l => {return l});
  }
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#000000" : "#ffffff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
            title="Search"
            onPress={() => data()}
      />
      <Text>Searching for results in: {props.location}</Text>   
      <FlatList
        data={boozeOffers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

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
  booze_type: {
    fontSize: 20,
  },
});

export default BoozeOffers;