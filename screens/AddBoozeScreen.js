import React, { useContext } from 'react';
import { StyleSheet, TextInput, Text, View , Button, ScrollView, RefreshControl} from 'react-native';
import { BoozeOfferContext } from '../services/BoozeOfferContext';
import { AuthenticationContext } from '../services/AuthenticationContext';
import { LocationContext } from '../services/LocationContext';
import SelectDropdown from 'react-native-select-dropdown'
import { BoozeUpButton } from '../styles/ButtonStyles';

export default function AddBoozeScreen({ navigation }) {
  const {user} = useContext(AuthenticationContext);
  const {uploadOffer,userOffers, error} = useContext(BoozeOfferContext);

  const {location } = React.useContext(LocationContext);
  const [booze, setBooze] = React.useState();
  const [price, setPrice] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [uploaded, setUploaded] = React.useState(false);

  const items=["Beer", "Wine", "Vodka", "Martini", "Whiskey", "Gin"];

  const onRefresh = () => {
    setBooze(null);
    setPrice(null);
    setName(null);
    setDescription(null);
    setUploaded(false);
  }

  if(!uploaded){
    return (
      <View style={styles.container}>  

        <SelectDropdown
            onSelect={(value) => {
              setBooze(value);
              console.log(value);
              console.log(booze);
            }}
            value={booze}
           // placeholder={{ label: 'Select a type of Booze', value: null }}
            
            
            data={items}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
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
        <BoozeUpButton
        title="Upload Offer"
        onPress={() => {
          uploadOffer(user, booze, price, location,name, description);
          setUploaded(true);
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
           <ScrollView
         refreshControl={
              <RefreshControl
                refreshing={!uploaded}
                onRefresh={onRefresh}
              />
            }
          >
           {error ? 
           <View>
              <Text>An Error occured: {JSON.stringify(error)}</Text>
              {<Button 
                title="Try again"
                onPress={onRefresh}
              />}
           </View>: 
           <View style={styles.container}>
              <Text>Your offer was successfully uploaded!</Text>
              {<Button 
                title="Upload another offer"
                onPress={onRefresh}
              />}
           </View>
           }  
           </ScrollView>
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