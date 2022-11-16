import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { IconButton } from "react-native-paper";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";

const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerRight: () => {
            <IconButton icon="bell" size={25} />;
          },
        }}
      />
      {/* <HomeStack.Screen name="Profile" component={ProfileScreen} /> */}
      <HomeStack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarLabel: "Notifications",
          headerRight: () => {
            <IconButton icon="bell" size={25} />;
          },
        }}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          headerRight: () => {
            <IconButton icon="human" size={25} />;
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
