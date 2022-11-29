import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import BenefitScreen from "../screens/BenefitScreen";
import ClaimScreen from "../screens/ClaimScreen";
import PlanDetailScreen from "../screens/PlanDetailScreen";
import ClaimDetailScreen from "../screens/ClaimDetailScreen";
import NewClaimScreen from "../screens/NewClaimScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WDrawerContent from "../components/general/WDrawerContent";
import RewardScreen from "../screens/RewardScreen"
import RewardDetailScreen from "../screens/RewardDetailScreen"


const WelfareDrawerNavigator = () => {
  const WelfareDrawer = createDrawerNavigator();

  return (
    <WelfareDrawer.Navigator
      minSwipeDistance={10}
      initialRouteName="Welfare"
      drawerContent={(props) => <WDrawerContent {...props} />}
    >
      <WelfareDrawer.Screen name="Benefits" component={BenefitScreen}
        options={{
          title: "Benefits",
          headerTitle: "Benefits",
          unmountOnBlur: true,
        }}
      />
      <WelfareDrawer.Screen name="Claims" component={ClaimScreen}
        options={{
          title: "Claims",
          headerTitle: "Claims",
          unmountOnBlur: true,
        }}
      />
      <WelfareDrawer.Screen name="Rewards" component={RewardScreen}
        options={{
          title: "Rewards",
          headerTitle: "Rewards",
          unmountOnBlur: true,
        }}
      />
      <WelfareDrawer.Screen name="PlanDetail" component={PlanDetailScreen}
       options={{
           title: "Plan Details",
           headerTitle: "Plan Details",
           unmountOnBlur: true,
         }}
       />
      <WelfareDrawer.Screen name="ClaimDetail" component={ClaimDetailScreen}
        options={{
           title: "Claim Details",
           headerTitle: "Claim Details",
           unmountOnBlur: true,
         }}
      />
      <WelfareDrawer.Screen name="NewClaim" component={NewClaimScreen}
        options={{
           title: "New Claim",
           headerTitle: "New Claim",
           unmountOnBlur: true,
         }}
      />
      <WelfareDrawer.Screen name="RewardDetail" component={RewardDetailScreen}
        options={{
           title: "Reward Details",
           headerTitle: "Reward Details",
           unmountOnBlur: true,
         }}
      />
    </WelfareDrawer.Navigator>
  );
};

export default WelfareDrawerNavigator;
