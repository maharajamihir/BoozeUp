import React, { useContext } from "react";
import { View, Text, InteractionManager} from "react-native";
import { AuthenticationContext } from "../services/AuthenticationContext";

const BoozeDisplay = ({ route, navigation }) => {

  const { user } = useContext(AuthenticationContext);
  const { item } = route.params;
  return (
    <View>
      <Text>
        {item.booze_type}
      </Text>
    </View>
  );
}

export default BoozeDisplay;