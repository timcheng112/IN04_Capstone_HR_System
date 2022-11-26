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
      <WelfareDrawer.Screen name="Benefits" component={BenefitScreen}
        options={{
          title: "Benefits",
          headerTitle: "Benefits",
//          unmountOnBlur: true,
        }}
      />
      <WelfareDrawer.Screen name="Claims" component={ClaimScreen}
        options={{
          title: "Claims",
          headerTitle: "Claims",
//          unmountOnBlur: true,
        }}
      />
      <WelfareDrawer.Screen name="PlanDetail" component={PlanDetailScreen}
       options={{
           title: "PlanDetail",
           headerTitle: "PlanDetail",
           unmountOnBlur: true,
         }}
       />
      <WelfareDrawer.Screen name="ClaimDetail" component={ClaimDetailScreen}
        options={{
           title: "ClaimDetail",
           headerTitle: "ClaimDetail",
           unmountOnBlur: true,
         }}
      />
      <WelfareDrawer.Screen name="NewClaim" component={NewClaimScreen}
        options={{
           title: "NewClaim",
           headerTitle: "NewClaim",
//           unmountOnBlur: true,
         }}
      />
    </WelfareDrawer.Navigator>
  );
};

export default WelfareDrawerNavigator;
