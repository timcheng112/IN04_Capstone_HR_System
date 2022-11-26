import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React, { useState } from "react";
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
            <DrawerItem label="Scheduling"></DrawerItem>
          </Drawer.Section>
          <Drawer.Section {...props} style={{ marginTop: 15 }}>
            <DrawerItem
              {...props}
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="calendar-account-outline"
                  size={size}
                  color={focusedRoute === "Leave" ? "black" : color}
                />
              )}
              style={
                focusedRoute === "My Schedule" && {
                  backgroundColor: "#c4b5fd",
                  borderRadius: 20,
                }
              }
              labelStyle={focusedRoute === "My Schedule" && { color: "black" }}
              label="My Schedule"
              onPress={() => {
                props.navigation.navigate("My Schedule");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  size={size}
                  color={focusedRoute === "Leave" ? "black" : color}
                />
              )}
              style={
                focusedRoute === "Indicate Preferences" && {
                  backgroundColor: "#c4b5fd",
                  borderRadius: 20,
                }
              }
              labelStyle={
                focusedRoute === "Indicate Preferences" && { color: "black" }
              }
              label="Indicate Preferences"
              onPress={() => {
                props.navigation.navigate("Indicate Preferences");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="swap-horizontal"
                  size={size}
                  color={focusedRoute === "Leave" ? "black" : color}
                />
              )}
              style={
                focusedRoute === "Swap Request" && {
                  backgroundColor: "#c4b5fd",
                  borderRadius: 20,
                }
              }
              labelStyle={focusedRoute === "Swap Request" && { color: "black" }}
              label="Swap Request"
              onPress={() => {
                props.navigation.navigate("Swap Request");
              }}
            />
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
