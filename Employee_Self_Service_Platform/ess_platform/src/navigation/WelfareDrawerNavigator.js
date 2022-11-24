import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import BenefitScreen from "../screens/BenefitScreen";
import ClaimScreen from "../screens/ClaimScreen";
import PlanDetailScreen from "../screens/PlanDetailScreen";
import ClaimDetailScreen from "../screens/ClaimDetailScreen";
import NewClaimScreen from "../screens/NewClaimScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WDrawerContent from "../components/general/WDrawerContent";


const WelfareDrawerNavigator = () => {
  const WelfareDrawer = createDrawerNavigator();

  return (
    <WelfareDrawer.Navigator
      minSwipeDistance={10}
      initialRouteName="Welfare"
      drawerContent={(props) => <WDrawerContent {...props} />}
    >
      <WelfareDrawer.Screen name="Benefits" component={BenefitScreen} />
      <WelfareDrawer.Screen name="Claims" component={ClaimScreen} />
      <WelfareDrawer.Screen name="PlanDetail" component={PlanDetailScreen} />
      <WelfareDrawer.Screen name="ClaimDetail" component={ClaimDetailScreen} />
      <WelfareDrawer.Screen name="NewClaim" component={NewClaimScreen} />
    </WelfareDrawer.Navigator>
  );
};

export default WelfareDrawerNavigator;
