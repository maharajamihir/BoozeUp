import React, { useContext } from 'react';
import { StyleSheet, TextInput, Text, View , Button, ScrollView, RefreshControl} from 'react-native';
import { BoozeOfferContext } from '../services/BoozeOfferContext';
import { AuthenticationContext } from '../services/AuthenticationContext';
import { LocationContext } from '../services/LocationContext';
import SelectDropdown from 'react-native-select-dropdown'
import { BoozeUpButton, buttonStyles } from '../styles/ButtonStyles';
import { textStyles } from '../styles/TextStyles';

export default function Notifications({ navigation }) {
  const {user} = useContext(AuthenticationContext);
  const {uploadOffer, error} = useContext(BoozeOfferContext);
    return (
      <View style={styles.container}>          
      </View>
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