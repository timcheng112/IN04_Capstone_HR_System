import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import ScheduleScreen from "../screens/ScheduleScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ScheduleDrawerContent from "../components/schedule/ScheduleDrawerContent";
import IndicatePreferencesScreen from "../screens/IndicatePreferencesScreen";
import SwapRequestScreen from "../screens/SwapRequestScreen";
import MyAttendanceScreen from "../screens/MyAttendanceScreen"

const ScheduleDrawerNavigator = () => {
  const ScheduleDrawer = createDrawerNavigator();

  return (
    <ScheduleDrawer.Navigator
      minSwipeDistance={10}
      initialRouteName="My Schedule"
      screenOptions={{
        activeBackgroundColor: "#5cbbff",
        activeTintColor: "#ffffff",
      }}
      drawerContent={(props) => <ScheduleDrawerContent {...props} />}
    >
      <ScheduleDrawer.Screen
        name="My Schedule"
        component={ScheduleScreen}
        options={{
          headerStyle: { backgroundColor: "#3949ab" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "white",
          unmountOnBlur: true,
        }}
      />
      <ScheduleDrawer.Screen
        name="Indicate Preferences"
        component={IndicatePreferencesScreen}
        options={{
          headerStyle: { backgroundColor: "#3949ab" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "white",
          unmountOnBlur: true,
        }}
      />
      <ScheduleDrawer.Screen
        name="Swap Request"
        component={SwapRequestScreen}
        options={{
          headerStyle: { backgroundColor: "#3949ab" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "white",
          unmountOnBlur: true,
        }}
      />
      <ScheduleDrawer.Screen
        name="Clock in/out"
        component={MyAttendanceScreen}
        options={{
          headerStyle: { backgroundColor: "#3949ab" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "white",
          unmountOnBlur: true,
        }}
      />
    </ScheduleDrawer.Navigator>
  );
};

export default ScheduleDrawerNavigator;
