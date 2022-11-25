import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import * as React from "react";
import HomeNavigator from "./HomeNavigator";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import AdminDrawerNavigator from "./AdminDrawerNavigator";
import TrainingNavigator from "./TrainingNavigator";
import ScheduleNavigator from "./ScheduleNavigator";
import ScheduleDrawerNavigator from "./ScheduleDrawerNavigator";

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      // activeColor="#101820FF"
      activeColor="white"
      shifting={false}
      // sceneAnimationEnabled={true}
      barStyle={{ backgroundColor: "#3949ab", elevation: 8 }}
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
        name="Schedule"
        component={ScheduleDrawerNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="calendar" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Admin"
        component={AdminDrawerNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="book-open" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Training"
        component={TrainingNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="book" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
