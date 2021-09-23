import React, { useContext } from 'react';
import { StyleSheet, TextInput, Text, View , Button} from 'react-native';
import { BoozeOfferContext } from '../services/BoozeOfferContext';
import { AuthenticationContext } from '../services/AuthenticationContext';

export default function AddBoozeScreen({ navigation }) {
  const {user} = useContext(AuthenticationContext);
  const {uploadOffer, userOffers, error} = useContext(BoozeOfferContext);

  const [location, setLocation] = React.useState(null);
  const [booze, setBooze] = React.useState(null);
  const [price, setPrice] = React.useState(null);


  if(!userOffers && !error){
    return (
      <View style={styles.container}>
        <TextInput 
            style={styles.input}
            onChangeText={setLocation}
            placeholder="Enter your location (PLZ)"
            autoCompleteType="postal-code"
            keyboardType="number-pad"
        />  
        <TextInput 
            style={styles.input}
            onChangeText={setBooze}
            placeholder="Enter Booze-Type"
        />
        <TextInput 
            style={styles.input}
            onChangeText={setPrice}
            placeholder="Enter Price (Integer!)"
            keyboardType="number-pad"
        />
        {(location && booze && price) ? 
        <Button
        title="Upload Offer"
        onPress={() => uploadOffer(user, booze, price, location)}
        /> : 
        <Text>Please fill out all the fields to upload an offer</Text>
        }             
      </View>
    );
      }
      else {
        return (
          <View style={styles.container}>
           Your offer was successfully uploaded!  
          </View>
        );
      }
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