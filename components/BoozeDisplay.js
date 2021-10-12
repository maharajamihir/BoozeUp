import React, { useContext, useRef, useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions} from "react-native";
import { LocationContext } from "../services/LocationContext";
import { textStyles } from "../styles/TextStyles";
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from "react-native-safe-area-context";
import { BoozeUpButton } from "../styles/ButtonStyles";

const BoozeDisplay = ({ route, navigation }) => {

  const [requestStatus, setRequestStatus] = useState('viewing');

  const {location, requestLocation} = useContext(LocationContext);  

  const { item , dis} = route.params;

  const markers = [
    //{ name:"user", key: 0, id: "0", latitude: location.coords.latitude, longitude: location.coords.longitude },
    { name: item.name, key: 1,id: "1", latitude: item.latitude, longitude: item.longitude }
  ];

  useEffect(() => {
    requestLocation();
  }, []);

  const ref = useRef();

  // effects
  const onMapReadyHandler = useCallback(() => {
    if (Platform.OS === 'ios') {
      ref?.current?.fitToElements(false);
    } else {
      ref?.current?.fitToCoordinates([{latitude: location.coords.latitude, longitude: location.coords.longitude}, {latitude: markers[0].latitude, longitude: markers[0].longitude}], {
        animated: true,
        edgePadding: {
          top: 150,
          right: 50,
          bottom: 50,
          left: 50,
        },
      });
    }
  }, [ref]);


  const RenderMapView = () => {
    return(
      <MapView
            ref={ref}
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.004757,
              longitudeDelta: 0.006866,
            }}
            onMapReady={onMapReadyHandler}
            showsUserLocation={true}
          >

            {/*<Marker
              coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
            />
            <Marker
              coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            />*/}
            {markers.map((marker) => (
              <Marker
                coordinate={{ 
                latitude: marker.latitude,
                longitude: marker.longitude
                }}
                identifier={marker.id}
                key={marker.key}
              />
            ))}
      </MapView>
    );
  }

  const RequestBoozeComponent = () => {
    if(requestStatus === 'viewing'){
      return(
        <View style={styles.center}>
        <BoozeUpButton 
          title="Request Booze"
          onPress={(() => setRequestStatus('approved'))} //actually should be requested
        />
        </View>
      );
    } else if(requestStatus === 'requested'){
      return(
        <View style={styles.center}>
        <BoozeUpButton 
          style={styles.center}
          title="Cancel Request"
          onPress={(() => setRequestStatus('viewing'))}
        />
        </View>
      );
      }
  }

  return (
    <SafeAreaView style={styles.main_container}>
      <View style={styles.container}>
        <Text style={textStyles.title}>
          {item.booze_type} for {item.price}€
        </Text>
        {dis<1000 ? <Text style={textStyles.paragraph}>{dis}m away</Text> : <Text style={textStyles.paragraph}>{dis/1000} km away</Text>}
          <View style={styles.box}>
          {item.name !== 'None' ?<Text style={{fontSize: 25}}>{item.name}</Text> : null}
          {item.description !== 'None'?<Text style={textStyles.paragraph}>{item.description}</Text> : null}
          </View>
      </View>
      {requestStatus === 'approved' ? <RenderMapView /> : <RequestBoozeComponent />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main_container:
  {
      flex: 1, 
      //justifyContent: 'center',
      //alignItems: 'center' 
  },
  container:
  {
      //justifyContent: 'center',
      //alignItems: 'center' 
      paddingHorizontal: 20
  },
  box:{
    borderTopWidth: 5,
    paddingHorizontal: 20
  },
  center:{
    flex: 1, 
    alignItems: 'center',
    paddingHorizontal: 20
  },
  map: {
    flex: 2
    //width: Dimensions.get('window').width,
    //height: 300,
  }
});

export default BoozeDisplay;