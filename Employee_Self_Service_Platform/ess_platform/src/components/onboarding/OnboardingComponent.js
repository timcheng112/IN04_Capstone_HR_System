import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { Text } from "react-native-paper";
import TabNavigator from "../../navigation/TabNavigator";
import TaskList from "./TaskList";

function OnboardingComponent() {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <Text variant="headlineMedium">My Onboarding Tasks</Text>
      <TaskList />
    </SafeAreaView>
  );
}

export default OnboardingComponent;
