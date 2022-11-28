import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { View } from "react-native";
import { Drawer, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../login/Context";

const DrawerContent = (props) => {
  const { signOut } = React.useContext(AuthContext);
  const { state } = props;
  const { routes, index } = state;
  const focusedRoute = routes[index].name;

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
          <Drawer.Section
            style={{
              borderBottomColor: "#f4f4f4",
              borderBottomWidth: 1,
            }}
          >
            <DrawerItem label="Admin"></DrawerItem>
          </Drawer.Section>
          <Drawer.Section style={{ marginTop: 15 }}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="seatbelt"
                  size={size}
                  color={focusedRoute === "Onboarding" ? "black" : color}
                />
              )}
              style={
                focusedRoute === "Onboarding" && {
                  backgroundColor: "#c4b5fd",
                  borderRadius: 20,
                }
              }
              labelStyle={focusedRoute === "Onboarding" && { color: "black" }}
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
                  color={focusedRoute === "Offboarding" ? "black" : color}
                />
              )}
              style={
                focusedRoute === "Offboarding" && {
                  backgroundColor: "#c4b5fd",
                  borderRadius: 20,
                }
              }
              labelStyle={focusedRoute === "Offboarding" && { color: "black" }}
              label="Offboarding"
              onPress={() => {
                props.navigation.navigate("Offboarding");
              }}
            ></DrawerItem>
            <DrawerItem
              icon={({ color, size }) => (
                <AntDesign
                  name="flag"
                  size={size}
                  color={focusedRoute === "Leave" ? "black" : color}
                />
              )}
              style={
                focusedRoute === "Leave" && {
                  backgroundColor: "#c4b5fd",
                  borderRadius: 20,
                }
              }
              labelStyle={focusedRoute === "Leave" && { color: "black" }}
              label="Leave"
              onPress={() => {
                props.navigation.navigate("Leave");
              }}
            ></DrawerItem>
            {/* <DrawerItem
              icon={({ color, size }) => (
                <AntDesign
                  name="flag"
                  size={size}
                  color={color}
                />
              )}
              label="Apply"
              onPress={() => {
                props.navigation.navigate("Apply");
              }}
            ></DrawerItem> */}
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

export default DrawerContent;
