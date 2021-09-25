import React, { useContext } from 'react';
import { StyleSheet, TextInput, Text, View , Button} from 'react-native';
import { BoozeOfferContext } from '../services/BoozeOfferContext';
import { AuthenticationContext } from '../services/AuthenticationContext';
import { LocationContext } from '../services/LocationContext';
import RNPickerSelect from 'react-native-picker-select';

export default function AddBoozeScreen({ navigation }) {
  const {user} = useContext(AuthenticationContext);
  const {uploadOffer,userOffers,setUserOffers, error} = useContext(BoozeOfferContext);

  const {location } = React.useContext(LocationContext);
  const [booze, setBooze] = React.useState();
  const [price, setPrice] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [description, setDescription] = React.useState(null);

  if(!userOffers){
    return (
      <View style={styles.container}>  

        <RNPickerSelect
            style={{ inputAndroid: { color: 'black' } }}
            onValueChange={(value) => {
              setBooze(value);
              console.log(value);
              console.log(booze);
            }}
            value={booze}
           // placeholder={{ label: 'Select a type of Booze', value: null }}
            items={[
                { label: 'Beer', value: 'Beer' },
                { label: 'Wine', value: 'Wine' },
                { label: 'Vodka', value: 'Vodka' },
                { label: 'Martini', value: 'Martini' },
                { label: 'Whiskey', value: 'Whiskey' },
                { label: 'Gin', value: 'Gin' },
            ]}
        />
        <TextInput 
            style={styles.input}
            onChangeText={setPrice}
            placeholder="Price *"
            keyboardType="number-pad"
        />
        <TextInput 
            style={styles.input}
            onChangeText={(name) => setName(name)}
            placeholder="Name"
        />
        <TextInput 
            multiline
            numberOfLines={5}
            style={{
              padding: 10,
              borderWidth: 1,
              width: 300,
              }}
            onChangeText={(description) => setDescription(description)}
            placeholder="Description"
        />

        {(location && booze && price) ? 
        <Button
        title="Upload Offer"
        onPress={() => {
          uploadOffer(user, booze, price, location,name, description);
        }}
        /> : 
        <Text>Please fill out all the required fields to upload an offer</Text>
        }             
      </View>
    );
      }
      else {
        return (
          <View style={styles.container}>
           {error ? 
           <View>
              <Text>An Error occured: {JSON.stringify(error)}</Text>
              {/*<Button 
                title="Try again"
                onPress={setUserOffers(null)}
              />*/}
           </View>: 
           <View>
              <Text>Your offer was successfully uploaded!</Text>
              {/*<Button 
                title="Upload another offer"
                onPress={setUserOffers(null)}
              />*/}
           </View>
           }  
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