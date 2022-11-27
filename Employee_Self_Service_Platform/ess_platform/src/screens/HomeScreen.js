import React, { useEffect } from "react";
import { IconButton, Text } from "react-native-paper";
import HomeComponent from "../components/home/HomeComponent";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="bell-outline"
          size={25}
          color="white"
          onPress={() => {
            navigation.navigate("Notifications");
          }}
        />
      ),
    });
  }, [navigation]);

  return <HomeComponent />;
}
