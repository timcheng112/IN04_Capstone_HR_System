import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import OffboardingScreen from "../screens/OffboardingScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import LeaveScreen from "../screens/LeaveScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../components/general/DrawerContent";

const AdminDrawerNavigator = () => {
  const AdminDrawer = createDrawerNavigator();

  return (
    <AdminDrawer.Navigator
      minSwipeDistance={10}
      initialRouteName="Onboarding"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <AdminDrawer.Screen name="Onboarding" component={OnboardingScreen} />
      <AdminDrawer.Screen name="Offboarding" component={OffboardingScreen} />
      <AdminDrawer.Screen name="Leave" component={LeaveScreen} />
    </AdminDrawer.Navigator>
  );
};

export default AdminDrawerNavigator;
