import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BenefitScreen from "../screens/BenefitScreen"
import ClaimScreen from "../screens/ClaimScreen";

const WelfareStack = createNativeStackNavigator();

const WelfareNavigator = () => {
  return (
    <WelfareStack.Navigator
    initialRouteName="BenefitScreen">

      <WelfareStack.Screen
        name="Benefits"
        component={BenefitScreen}
        options={{
          tabBarLabel: "Benefits",
        }}
      />
      <WelfareStack.Screen
        name="Claims"
        component={ClaimScreen}
        options={{
          tabBarLabel: "Claims",
        }}
      />
    </WelfareStack.Navigator>
  );
};

export default WelfareNavigator;
