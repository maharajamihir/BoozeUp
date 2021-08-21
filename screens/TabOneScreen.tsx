import React, {useEffect, useState} from "react";
import { Button, PermissionsAndroid, StatusBar, StyleSheet, Text, View } from "react-native";
import Geolocation from 'react-native-geolocation-service';


export default function TabOneScreen() {
  const [hasPermission, setPermission] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);


  const requestLocationPermission = async () => {
    try {
      const granted_fine = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      const granted_coarse = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
      if (granted_fine === PermissionsAndroid.RESULTS.GRANTED && granted_coarse === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
        setPermission(true);
      } else {
        console.log("Location permission denied");
        setPermission(false);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
      Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
  };

  if(!hasPermission){
      return (
      <View style={styles.container}>
        <Text style={styles.item}>Try permissions</Text>
        <Button title="request permissions" onPress={requestLocationPermission} />
      </View>
    );
      } else{
        return (
        <View style={styles.container}>
        <Text style={styles.item}>We have your location hahaha</Text> 
        <Text style={styles.item}> latitude: {latitude} longitude: {longitude}</Text>
        <Button title="print location" onPress={getLocation} />
      </View>
        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});

