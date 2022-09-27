import * as React from "react";
import { AppRegistry, StatusBar, Text } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import Onboarding from "./src/screens/Onboarding";

export default function Main() {
  return (
    <PaperProvider>
      <Onboarding />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
