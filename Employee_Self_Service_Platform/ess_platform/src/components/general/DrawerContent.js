import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { View } from "react-native";
import { Drawer } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DrawerContent = (props) => {
  return (
    <View
      style={{
        flex: 1,
        elevation: 16,
        backgroundColor: "#ffffff",
      }}
    >
      <DrawerContentScrollView {...props}>
        <View style={{ flex: 1, elevation: 16 }}>
          <Drawer.Section style={{ marginTop: 15 }}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="seatbelt"
                  size={size}
                  color={color}
                />
              )}
              label="Onboarding"
              onPress={() => {
                props.navigation.navigate("Onboarding");
              }}
            ></DrawerItem>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="seat-outline"
                  size={size}
                  color={color}
                />
              )}
              label="Offboarding"
              onPress={() => {
                props.navigation.navigate("Offboarding");
              }}
            ></DrawerItem>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section
        style={{
          marginBottom: 15,
          borderTopColor: "#f4f4f4",
          borderTopWidth: 1,
        }}
      >
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
        ></DrawerItem>
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;
