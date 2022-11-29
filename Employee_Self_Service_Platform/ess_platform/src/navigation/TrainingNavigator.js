import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModuleScreen from "../screens/ModuleScreen";
import VideoScreen from "../screens/VideoScreen";
import TrainingScreen from "../screens/TrainingScreen";

const TrainingStack = createNativeStackNavigator();

const TrainingNavigator = () => {
  return (
    <TrainingStack.Navigator>
      <TrainingStack.Screen
        name="My Training"
        component={TrainingScreen}
        options={{
          tabBarLabel: "Training",
          headerStyle: { backgroundColor: "#3949ab" },
          headerTitleStyle: { color: "white" },
        }}
      />
      <TrainingStack.Screen
        name="Module"
        component={ModuleScreen}
        options={{
          tabBarLabel: "Module",
          headerStyle: { backgroundColor: "#3949ab" },
          headerTitleStyle: { color: "white" },
        }}
      />
      <TrainingStack.Screen
        name="Video"
        component={VideoScreen}
        options={{
          tabBarLabel: "Video",
          headerStyle: { backgroundColor: "#3949ab" },
          headerTitleStyle: { color: "white" },
        }}
      />
    </TrainingStack.Navigator>
  );
};

export default TrainingNavigator;
