import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import OffboardingScreen from "../screens/OffboardingScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import LeaveScreen from "../screens/LeaveScreen";
import LeaveApplicationScreen from "../screens/LeaveApplicationScreen";
import LeaveDetailScreen from "../screens/LeaveDetailScreen";
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
      <AdminDrawer.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{
          headerStyle: { backgroundColor: "#3949ab" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "white",
        }}
      />
      <AdminDrawer.Screen
        name="Offboarding"
        component={OffboardingScreen}
        options={{
          headerStyle: { backgroundColor: "#3949ab" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "white",
        }}
      />
      <AdminDrawer.Screen
        name="Leave"
        component={LeaveScreen}
        options={{
          headerStyle: { backgroundColor: "#3949ab" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "white",
        }}
      />
      <AdminDrawer.Screen
        name="LeaveApplication"
        component={LeaveApplicationScreen}
        options={{
          headerStyle: { backgroundColor: "#3949ab" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "white",
        }}
      />
      <AdminDrawer.Screen
        name="LeaveDetail"
        component={LeaveDetailScreen}
        options={{
          headerStyle: { backgroundColor: "#3949ab" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "white",
        }}
      />
    </AdminDrawer.Navigator>
  );
};

export default AdminDrawerNavigator;
