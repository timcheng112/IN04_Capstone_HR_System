import React, { useEffect } from "react";
import { IconButton, Text } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <><IconButton
          icon="bell"
          size={25}
          onPress={() => {
            navigation.navigate("Notifications");
          } } />
          
          <IconButton
            icon="human"
            size={25}
            onPress={() => {
              navigation.navigate("Profile");
            } } />
            </>
      ),
    });
  }, [navigation]);

  return <Text>HomeScreen</Text>;
}
