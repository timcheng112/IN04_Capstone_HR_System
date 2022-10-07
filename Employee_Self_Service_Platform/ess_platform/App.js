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

      // api
      //   .login(email, password)
      const conn = axios.create({ baseURL: "http://localhost:9191", proxy: false });

      conn
        .get(
          `http://localhost/api/user/login/loginHRMS?workEmail=leem@libro.com&password=password`
        )
        .then((response) => {
          console.log("userId = " + response.data);
          try {
            userToken = response.data;
            AsyncStorage.setItem("userToken", userToken);
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
          {loginState.userToken === null ? <TabNavigator /> : <LoginScreen />}
        </PaperProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
