import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { View } from "react-native";
import { Drawer } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../login/Context";

const WDrawerContent = (props) => {
  const { signOut } = React.useContext(AuthContext);

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
              label="Benefits"
              onPress={() => {
                props.navigation.navigate("Benefits");
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
              label="Claims"
              onPress={() => {
                props.navigation.navigate("Claims");
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
          onPress={() => signOut()}
        ></DrawerItem>
      </Drawer.Section>
    </View>
  );
};

export default WDrawerContent;