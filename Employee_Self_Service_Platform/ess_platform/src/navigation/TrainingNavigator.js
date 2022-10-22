import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import ModuleScreen from "../screens/ModuleScreen";
import VideoScreen from "../screens/VideoScreen";
import TrainingScreen from "../screens/TrainingScreen";

const TrainingStack = createNativeStackNavigator();

const TrainingNavigator = () => {
  return (
    <TrainingStack.Navigator>
      <TrainingStack.Screen
        name="Training"
        component={TrainingScreen}
        options={{
          tabBarLabel: "Training",
        }}
      />
      <TrainingStack.Screen
        name="Module"
        component={ModuleScreen}
        options={{
          tabBarLabel: "Module",
        }}
      />
      <TrainingStack.Screen
        name="Video"
        component={VideoScreen}
        options={{
          tabBarLabel: "Video",
        }}
      />
    </TrainingStack.Navigator>
  );
};

export default TrainingNavigator;
