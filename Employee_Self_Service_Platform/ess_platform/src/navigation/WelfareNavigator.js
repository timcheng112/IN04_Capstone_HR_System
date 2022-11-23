import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import BenefitScreen from "../screens/BenefitScreen"
import ClaimScreen from "../screens/ClaimScreen";

const WelfareNavigator = () => {
  const theme = useTheme();
  const WelfareStack = createNativeStackNavigator();
  const openMenu = () => {
      navigation.openDrawer();
    };

  return (
    <WelfareStack.Navigator
      initialRouteName="BenefitScreen">

      <WelfareStack.Screen
        name="Benefits"
        component={BenefitScreen}
        options={{
//          tabBarLabel: "Benefits",
          title: "Benefits",
          headerTitle: "Benefits",
        }}
      />
      <WelfareStack.Screen
        name="Claims"
        component={ClaimScreen}
        options={{
//          tabBarLabel: "Claims",
          title: "Claims",
          headerTitle: "Claims",
        }}
      />
    </WelfareStack.Navigator>
  );
};

export default WelfareNavigator;
