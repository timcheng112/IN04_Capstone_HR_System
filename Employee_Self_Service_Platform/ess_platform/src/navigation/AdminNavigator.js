import * as React from "react";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import OffboardingScreen from "../screens/OffboardingScreen";
import Header from "../components/general/Header";
import { Appbar, Button } from "react-native-paper";
import { StatusBar } from "react-native";
import { Entypo } from "@expo/vector-icons";
import DrawerContent from "../components/general/DrawerContent";

const AdminNavigator = () => {
  const theme = useTheme();
  const AdminStack = createNativeStackNavigator();
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <AdminStack.Navigator
      initialRouteName="OnboardingScreen"
      // screenOptions={{
      //   header: ({ scene, previous, navigation }) => (
      //     <Appbar.Header style={{ marginTop: StatusBar.currentHeight }}>
      //       <Appbar.Action
      //         icon="menu"
      //         onPress={openMenu}
      //         color={theme.dark ? theme.colors.primary : theme.colors.onPrimary}
      //       />
      //       <Appbar.Content title="Admin" />
      //     </Appbar.Header>
      //   ),
      // }}
    >
      <AdminStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{
          title: "My Onboarding Tasks",
          headerTitle: "Onboarding",
        }}
      />
      <AdminStack.Screen
        name="Offboarding"
        component={OffboardingScreen}
        options={{
          title: "My Offboarding Tasks",
          headerTitle: "Offboarding",
        }}
      />
    </AdminStack.Navigator>
  );
};

export default AdminNavigator;
