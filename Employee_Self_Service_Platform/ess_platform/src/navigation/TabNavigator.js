import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import OnboardingScreen from "../screens/OnboardingScreen";
import HomeScreen from "../screens/HomeScreen";
import AdminNavigator from "./AdminNavigator";
import HomeNavigator from "./HomeNavigator";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AdminDrawerNavigator from "./AdminDrawerNavigator";

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#101820FF"
      shifting={true}
      sceneAnimationEnabled={false}
      barStyle={{ backgroundColor: "#FBB344", elevation: 8 }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Admin"
        component={AdminDrawerNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="admin-panel-settings"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
