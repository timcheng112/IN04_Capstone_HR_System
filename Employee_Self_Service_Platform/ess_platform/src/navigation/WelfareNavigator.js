import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import BenefitScreen from "../screens/BenefitScreen"
import ClaimScreen from "../screens/ClaimScreen";
import PlanDetailScreen from "../screens/PlanDetailScreen";
import ClaimDetailScreen from "../screens/ClaimDetailScreen";
import NewClaimScreen from "../screens/NewClaimScreen";
import RewardScreen from "../screens/RewardScreen"
import RewardDetailScreen from "../screens/RewardDetailScreen"

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
          unmountOnBlur: true,
        }}
      />
      <WelfareStack.Screen
        name="Claims"
        component={ClaimScreen}
        options={{
//          tabBarLabel: "Claims",
          title: "Claims",
          headerTitle: "Claims",
          unmountOnBlur: true,
        }}
      />
      <WelfareStack.Screen
        name="PlanDetail"
        component={PlanDetailScreen}
        options={{
          title: "PlanDetail",
          headerTitle: "PlanDetail",
          unmountOnBlur: true,
        }}
      />
      <WelfareStack.Screen
        name="ClaimDetail"
        component={ClaimDetailScreen}
        options={{
          title: "ClaimDetail",
          headerTitle: "ClaimDetail",
          unmountOnBlur: true,
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
      <WelfareStack.Screen
        name="Rewards"
        component={RewardScreen}
        options={{
          title: "Rewards",
          headerTitle: "Rewards",
          unmountOnBlur: true,
        }}
      />
      <WelfareStack.Screen
        name="RewardDetail"
        component={RewardDetailScreen}
        options={{
          title: "RewardDetail",
          headerTitle: "RewardDetail",
          unmountOnBlur: true,
        }}
      />
    </WelfareStack.Navigator>
  );
};

export default WelfareNavigator;
