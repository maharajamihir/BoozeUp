import React, { useContext } from "react";
import { View, Text, StyleSheet} from "react-native";
import { LocationContext } from "../services/LocationContext";
import { textStyles } from "../styles/TextStyles";

const BoozeDisplay = ({ route, navigation }) => {

  const {location, error} = useContext(LocationContext);  

  const { item , dis} = route.params;

  return (
    <View style={styles.container}>
      <Text style={textStyles.title}>
        {item.booze_type}
      </Text>
      <View style={styles.box}>
      {item.name !== 'None' ?<Text style={textStyles.paragraph}>{item.name}</Text> : null}
      {item.description !== 'None'?<Text style={textStyles.paragraph}>{item.description}</Text> : null}
      <Text style={textStyles.paragraph}>{item.price}€</Text>
      <Text style={textStyles.paragraph}>{dis/1000} km away</Text>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:
  {
      flex: 1, 
      //justifyContent: 'center',
      //alignItems: 'center' 
      paddingHorizontal: 20
  },
  box:{
    borderTopWidth: 5,
     //borderColor: 
  },
  center:{
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  }
});

export default BoozeDisplay;