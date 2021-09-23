import React, { useContext } from "react";
import { View, Text} from "react-native";
import { AuthenticationContext } from "../services/AuthentificationContext";

const ProfileScreen = () => {

  const { user } = useContext(AuthenticationContext);

  return (
    <View>
      <Text>
        Your current Token: {user}
      </Text>
    </View>
  );
}

export default ProfileScreen;