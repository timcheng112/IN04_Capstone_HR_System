import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import BenefitScreen from "../screens/BenefitScreen";
import ClaimScreen from "../screens/ClaimScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WDrawerContent from "../components/general/WDrawerContent";

const WelfareDrawerNavigator = () => {
  const WelfareDrawer = createDrawerNavigator();

  return (
    <WelfareDrawer.Navigator
      minSwipeDistance={10}
      initialRouteName="Onboarding"
      drawerContent={(props) => <WDrawerContent {...props} />}
    >
      <WelfareDrawer.Screen name="Benefits" component={BenefitScreen} />
      <WelfareDrawer.Screen name="Claims" component={ClaimScreen} />
    </WelfareDrawer.Navigator>
  );
};

export default WelfareDrawerNavigator;
