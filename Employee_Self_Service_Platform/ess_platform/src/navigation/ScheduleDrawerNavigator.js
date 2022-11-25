import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import ScheduleScreen from "../screens/ScheduleScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ScheduleDrawerContent from "../components/schedule/ScheduleDrawerContent";
import IndicatePreferencesScreen from "../screens/IndicatePreferencesScreen";

const ScheduleDrawerNavigator = () => {
  const ScheduleDrawer = createDrawerNavigator();

  return (
    <ScheduleDrawer.Navigator
      minSwipeDistance={10}
      initialRouteName="My Schedule"
      drawerContent={(props) => <ScheduleDrawerContent {...props} />}
    >
      <ScheduleDrawer.Screen
        name="My Schedule"
        component={ScheduleScreen}
        options={{
          headerStyle: { backgroundColor: "#3949ab" },
          headerTitleStyle: { color: "white" },
        }}
      />
      <ScheduleDrawer.Screen
        name="Indicate Preferences"
        component={IndicatePreferencesScreen}
        options={{
          headerStyle: { backgroundColor: "#3949ab" },
          headerTitleStyle: { color: "white" },
        }}
      />
    </ScheduleDrawer.Navigator>
  );
};

export default ScheduleDrawerNavigator;
