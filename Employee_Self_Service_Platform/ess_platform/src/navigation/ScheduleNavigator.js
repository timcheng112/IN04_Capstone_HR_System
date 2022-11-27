import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton } from "react-native-paper";
import NotificationScreen from "../screens/NotificationScreen";
import ScheduleScreen from "../screens/ScheduleScreen";

const ScheduleStack = createNativeStackNavigator();

const ScheduleNavigator = () => {
  return (
    <ScheduleStack.Navigator>
      <ScheduleStack.Screen
        name="My Schedule"
        component={ScheduleScreen}
        options={{
          headerStyle: { backgroundColor: "#3949ab" },
          headerTitleStyle: { color: "white" },
        }}
      />
    </ScheduleStack.Navigator>
  );
};

export default ScheduleNavigator;
