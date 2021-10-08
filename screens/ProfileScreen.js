import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthenticationContext } from "../services/AuthenticationContext";
import { BoozeOfferContext } from "../services/BoozeOfferContext";
import { textStyles } from "../styles/TextStyles";

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
        <Text style={textStyles.paragraph}>Welcome back</Text>
        <Text style={textStyles.title}>{userData.username}!</Text>
        <View style={styles.box}>
          <Text style={textStyles.paragraph}> 📧 {userData.email}</Text>
          <Text style={textStyles.paragraph}> 📱 {userData.phone_number}</Text>
        </View>
      </SafeAreaView>
    )
  }
 
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
  }
});

export default ProfileScreen;