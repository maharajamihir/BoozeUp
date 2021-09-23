import React, { useContext, useEffect } from "react";
import { View, Text} from "react-native";
import { AuthenticationContext } from "../services/AuthenticationContext";
import { BoozeOfferContext } from "../services/BoozeOfferContext";

const ProfileScreen = () => {

  const { user } = useContext(AuthenticationContext);
  const { userData, fetchUserData,error } = useContext(BoozeOfferContext);

  useEffect(() => {
    fetchUserData(user);
    console.log(userData);
  }, []);

  return (
    <View>
      <Text>
        Your current Token: {user}
      </Text>
      <Text>{error}</Text>
      {(!userData) ? <Text>Loading...</Text> : <Text>{userData.username}</Text>}
    </View>
  );
}

export default ProfileScreen;