import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthenticationContext } from "../services/AuthenticationContext";
import { BoozeOfferContext } from "../services/BoozeOfferContext";

const ProfileScreen = () => {

  const { user } = useContext(AuthenticationContext);
  const { userData, fetchUserData,error } = useContext(BoozeOfferContext);

  useEffect(() => {
    fetchUserData(user);
    console.log(user)
    console.log(userData);
  }, []);

  if(!userData){
    return (
      <View style={styles.container}>
        <Text>
          Loading your data ...
        </Text>
      </View>
    );
  } else{
    return (
      <SafeAreaView style={styles.container}>
        <Text>Username: {userData.username}</Text>
        <Text>Email: {userData.email}</Text>
        <Text>Phone Number: {userData.phone_number}</Text>
        <Text>Token: {userData.token}</Text>
      </SafeAreaView>
    )
  }
 
}

const styles = StyleSheet.create({
  container:
  {
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center' 
  },
});

export default ProfileScreen;