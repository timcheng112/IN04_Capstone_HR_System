import { useTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image } from "react-native";
import { Appbar } from "react-native-paper";
import { useFonts } from "expo-font";

const Header = ({ scene, previous, navigation, statusBarHeight }) => {
  const theme = useTheme();
  const openMenu = () => {
    navigation.openDrawer();
  };

  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  // const [loaded] = useFonts({
  //   MontserratLight: require("../../../../assets/fonts/Montserrat-Light.ttf"),
  //   MontserratBold: require("../../../../assets/fonts/Montserrat-Bold.ttf"),
  //   PoppinsMedium: require("../../../../assets/fonts/Poppins-Medium.ttf"),
  //   PoppinsBold: require("../../../../assets/fonts/Poppins-Bold.ttf"),
  //   PoppinsLight: require("../../../../assets/fonts/Poppins-Light.ttf"),
  //   PoppinsThin: require("../../../../assets/fonts/Poppins-Thin.ttf"),
  //   PoppinsRegular: require("../../../../assets/fonts/Poppins-Regular.ttf"),
  // });
  // if (!loaded) {
  //   return null;
  // }
  return (
    <Appbar.Header statusBarHeight={statusBarHeight} style={{ elevation: 4 }}>
      <StatusBar style={theme.dark ? "light" : "dark"} />
      {previous ? (
        <Appbar.BackAction
          onPress={() => navigation.pop()}
          color={theme.dark ? theme.colors.primary : theme.colors.onPrimary}
        />
      ) : (
        <Appbar.Action
          icon="menu"
          onPress={openMenu}
          color={theme.dark ? theme.colors.primary : theme.colors.onPrimary}
        />
      )}
      <Appbar.Content
        // title={title}
        titleStyle={{
          // fontFamily: "PoppinsMedium",
          fontSize: 19,
          bottom: -2,
        }}
        color={theme.dark ? theme.colors.primary : theme.colors.onPrimary}
      />
    </Appbar.Header>
  );
};

export default Header;
