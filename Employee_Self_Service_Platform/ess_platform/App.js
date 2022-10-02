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

export default function Main() {
  const initialLoginState = {
    isLoading: true,
    email: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "SIGNIN":
        return {
          ...prevState,
          email: action.email,
          isLoading: false,
        };
      case "SIGNOUT":
        return { ...prevState, isLoading: false, email: null, userToken: null };
    }
  };

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
        .login(email, password)
        .then((response) => {
          console.log(response.data);
          try {
            userToken = "token";
            AsyncStorage.setItem("userToken", userToken);
            console.log("user token = " + userToken);
            dispatch({ type: "SIGNIN", id: email, token: userToken });
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => {
          console.log(error);
          userToken = null;
        });
    },
    signOut: async () => {
      await AsyncStorage.removeItem("userToken");
      dispatch({ type: "SIGNOUT" });
    },
  }));
  React.useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (error) {
        console.log(error);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
      console.log("user token = " + userToken);
    }, 100);
  }, []);

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
          {loginState.userToken !== null ? <TabNavigator /> : <LoginScreen />}
        </PaperProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
