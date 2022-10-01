import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import OffboardingScreen from "../screens/OffboardingScreen";

const AdminStack = createNativeStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{
          title: "Welcome to Onboarding",
        }}
      />
      <AdminStack.Screen
        name="OffboardingScreen"
        component={OffboardingScreen}
        options={{ title: "Welcome to Offboarding" }}
      />
    </AdminStack.Navigator>
  );
};

export default AdminNavigator;
