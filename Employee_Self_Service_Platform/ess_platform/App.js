import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { AppRegistry, View } from "react-native";
import {
  ActivityIndicator,
  Provider as PaperProvider,
} from "react-native-paper";
import { name as appName } from "./app.json";
import TabNavigator from "./src/navigation/TabNavigator";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { AuthContext } from "./src/components/login/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./src/utils/api";
import axios from "axios";
import {
  initialLoginState,
  loginReducer,
} from "./src/components/login/AuthContext";
import { StatusBar } from "expo-status-bar";

export default function Main({ navigation }) {
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(() => ({
    signIn: async (email, password) => {
      let userToken;
      userToken = null;
      console.log(email);
      console.log(password);

      api
        .login(email + "@libro.com", password)
        .then((response) => {
          console.log("userId = " + response.data);
          try {
            userToken = response.data + "";
            AsyncStorage.setItem("userId", userToken);
            console.log("token = " + userToken);
            dispatch({ type: "SIGNIN", id: email, token: userToken });
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
          userToken = null;
        });
    },
    signOut: async () => {
      await AsyncStorage.removeItem("userId");
      dispatch({ type: "SIGNOUT" });
    },
  }));

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userId");
      } catch (error) {
        console.log(error);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
      //console.log("user token = " + userToken);
    }, 2500);
  });

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <PaperProvider>
          <StatusBar
            backgroundColor="#3949ab"
            // barStyle="dark-content" // Here is where you change the font-color
            style="light"
          />
          {loginState.userToken === null ? <LoginScreen /> : <TabNavigator />}
        </PaperProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
