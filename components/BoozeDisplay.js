import React, { useContext } from "react";
import { View, Text} from "react-native";
import { AuthenticationContext } from "../services/AuthenticationContext";

const BoozeDisplay = () => {

  const { user } = useContext(AuthenticationContext);

  return (
    <View>
      <Text>
        Your Booze will be displayed here
      </Text>
    </View>
  );
}

export default BoozeDisplay;