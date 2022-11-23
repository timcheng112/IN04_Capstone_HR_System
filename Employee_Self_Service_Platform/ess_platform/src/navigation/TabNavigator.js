import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import * as React from "react";
import HomeNavigator from "./HomeNavigator";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AdminDrawerNavigator from "./AdminDrawerNavigator";
import TrainingNavigator from "./TrainingNavigator";
import WelfareNavigator from "./WelfareNavigator";

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
      <Tab.Screen
        name="Training"
        component={TrainingNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="book" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Welfare"
        component={WelfareNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="smile-circle" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
