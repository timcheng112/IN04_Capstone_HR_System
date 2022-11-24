import React, { useEffect } from "react";
import { IconButton, Text } from "react-native-paper";
import HomeComponent from "../components/home/HomeComponent";

export default function HomeScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="bell"
          size={25}
          onPress={() => {
            navigation.navigate("Notifications");
          }}
        />
      ),
    });
  }, [navigation]);

  return <HomeComponent />;
}
