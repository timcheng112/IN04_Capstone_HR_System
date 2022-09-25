import * as React from "react";
import { AppRegistry, StatusBar, Text } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";

export default function Main() {
  return (
    <PaperProvider>
      <Text>Welcome to the ESS Platform!</Text>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
