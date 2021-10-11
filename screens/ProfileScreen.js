import React, { useContext, useEffect } from "react";
import { ActivityIndicator,View, Text, StyleSheet, ScrollView, RefreshControl} from "react-native";
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

  const onRefresh = () => {
    fetchUserData(user);
    console.log(user)
    console.log(userData);
  }

  if(!userData){
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  } else{
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
         refreshControl={
              <RefreshControl
                refreshing={!userData}
                onRefresh={onRefresh}
              />
            }
          >
          <Text style={textStyles.paragraph}>Welcome back</Text>
          <Text style={textStyles.title}>{userData.username}!</Text>
          <View style={styles.box}>
            <Text style={textStyles.paragraph}> 📧 {userData.email}</Text>
            <Text style={textStyles.paragraph}> 📱 {userData.phone_number}</Text>
          </View>
        </ScrollView>
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
    //borderTopWidth: 5,
     //borderColor: 
  },
  center:{
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  }
});

export default ProfileScreen;