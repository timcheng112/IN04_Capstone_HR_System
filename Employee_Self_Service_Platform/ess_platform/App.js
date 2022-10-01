import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import TabNavigator from "./src/navigation/TabNavigator";
import OnboardingScreen from "./src/screens/OnboardingScreen";

export default function Main() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <TabNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);
