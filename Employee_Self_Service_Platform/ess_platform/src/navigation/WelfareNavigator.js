import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import BenefitScreen from "../screens/BenefitScreen"
import ClaimScreen from "../screens/ClaimScreen";
import PlanDetailScreen from "../screens/PlanDetailScreen";
import ClaimDetailScreen from "../screens/ClaimDetailScreen";
import NewClaimScreen from "../screens/NewClaimScreen";

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
      <WelfareStack.Screen
        name="PlanDetail"
        component={PlanDetailScreen}
        options={{
          title: "PlanDetail",
          headerTitle: "PlanDetail",
        }}
      />
      <WelfareStack.Screen
        name="ClaimDetail"
        component={ClaimDetailScreen}
        options={{
          title: "ClaimDetail",
          headerTitle: "ClaimDetail",
        }}
      />
      <WelfareStack.Screen
        name="NewClaim"
        component={NewClaimScreen}
        options={{
          title: "NewClaim",
          headerTitle: "NewClaim",
        }}
      />
    </WelfareStack.Navigator>
  );
};

export default WelfareNavigator;
