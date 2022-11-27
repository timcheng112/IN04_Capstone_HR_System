import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Paragraph,
  Text,
  Title,
} from "react-native-paper";
import api from "../../utils/api";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import {
  Image,
  ImageBackground,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../login/Context";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { format, subDays } from "date-fns";
import LottieView from "lottie-react-native";

const HomeComponent = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const { signOut } = React.useContext(AuthContext);

  const leftContent = (props) => (
    <Avatar.Icon
      {...props}
      icon="logout"
      backgroundColor="white"
      color="black"
    />
  );

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  useEffect(() => {
    const setId = async () => {
      try {
        const response = await AsyncStorage.getItem("userId");
        setUserId(response);
      } catch (err) {
        console.warn(err);
      }
    };
    setId();
  }, []);

  useEffect(() => {
    if (userId !== null) {
      api
        .getUser(userId)
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
        })
        .catch((error) =>
          console.log("Error retrieving user with ID: " + userId)
        );
    }
  }, [userId]);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <LottieView
        source={require("../../../assets/ess-loading.json")}
        autoPlay
        // style={{ height: height, width: width}}
        resizeMode="cover"
      />
    );
  }

  return (
    <View
      style={{
        padding: "4%",
        // paddingLeft: "4%",
        // paddingRight: "4%",
        flex: 1,
      }}
    >
      {/* <StatusBar
          backgroundColor="#fff"
          barStyle="dark-content" // Here is where you change the font-color
        /> */}
      {/* <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          }}
          blurRadius={8}
          style={{
            flex: 1,
            justifyContent: "center",
            resizeMode: "cover",
            marginBottom: 10
          }}
          imageStyle={{
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins_700Bold",
              fontSize: 30,
              lineHeight: 40,
              textAlign: "center",
              // backgroundColor: "#000000c0",
            }}
          >
            Libro ESS
          </Text>
        </ImageBackground> */}
      {/* <Image
          source={require("../../../assets/libro-logo.png")}
          style={{
            flex: 1,
            resizeMode: "contain",
            alignSelf: "center",
            marginBottom: 20,
          }}
          alt="Libro Logo"
        /> */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_700Bold",
              fontSize: 24,
              lineHeight: 30,
            }}
          >
            Hello 👋{"\n"}
            <Text
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 30,
                color: "#3949ab",
                // lineHeight: 35,
              }}
            >
              {user !== null && user.firstName}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
          }}
        >
          <Avatar.Image
            size={56}
            source={{
              uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
        </View>
      </View>
      <View style={{ flex: 4 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <TouchableOpacity
            style={{
              elevation: 10,
              borderRadius: 20,
              shadowColor: "#000000",
              marginBottom: 10,
              marginRight: 5,
              flex: 1,
            }}
            onPress={() => {
              navigation.navigate("Schedule", { screen: "My Schedule" });
            }}
          >
            <Card
              style={{
                flex: 1,
                borderRadius: 20,
              }}
              // onPress={() => {
              //   navigation.navigate("Schedule", { screen: "My Schedule" });
              // }}
            >
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Card.Content>
                  <Feather
                    name="calendar"
                    size={40}
                    color="black"
                    style={{ textAlign: "center" }}
                  />
                </Card.Content>
                <Card.Title
                  title="My Schedule"
                  titleStyle={{ fontSize: 16, textAlign: "center" }}
                  subtitle={format(new Date(), "yyyy-MM-dd")}
                  subtitleStyle={{ textAlign: "center" }}
                />
              </View>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              elevation: 10,
              borderRadius: 20,
              shadowColor: "#000000",
              marginBottom: 10,
              marginLeft: 5,
              flex: 1,
            }}
            // onPress={() => {
            //   navigation.navigate("Schedule", { screen: "My Schedule" });
            // }}
          >
            <Card
              style={{
                flex: 1,
                borderRadius: 20,
              }}
            >
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Card.Content>
                  <Feather
                    name="dollar-sign"
                    size={40}
                    color="black"
                    style={{ textAlign: "center" }}
                  />
                </Card.Content>
                <Card.Title
                  title="My Pay"
                  titleStyle={{ fontSize: 16, textAlign: "center" }}
                  subtitle={format(subDays(new Date(), 7), "MMMM yyyy")}
                  subtitleStyle={{ textAlign: "center" }}
                />
              </View>
            </Card>
          </TouchableOpacity>
        </View>
        <View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <TouchableOpacity
            style={{
              elevation: 10,
              borderRadius: 20,
              shadowColor: "#000000",
              marginBottom: 10,
              marginRight: 5,
              flex: 1,
            }}
            onPress={() => {
              navigation.navigate("Admin", { screen: "Onboarding" });
            }}
          >
            <Card
              style={{
                flex: 1,
                borderRadius: 20,
              }}
            >
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Card.Content>
                  <Octicons
                    name="checklist"
                    size={40}
                    color="black"
                    style={{ textAlign: "center" }}
                  />
                </Card.Content>
                <Card.Title
                  title="Boarding"
                  titleStyle={{ fontSize: 16, textAlign: "center" }}
                  subtitle={
                    user !== null && user.taskListItems.length + " tasks"
                  }
                  subtitleStyle={{ textAlign: "center" }}
                />
              </View>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              elevation: 10,
              borderRadius: 20,
              shadowColor: "#000000",
              marginBottom: 10,
              marginLeft: 5,
              flex: 1,
            }}
            onPress={() => {
              navigation.navigate("Admin", { screen: "Leave" });
            }}
          >
            <Card
              style={{
                flex: 1,
                borderRadius: 20,
              }}
            >
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Card.Content>
                  <MaterialCommunityIcons
                    name="calendar-clock-outline"
                    size={40}
                    color="black"
                    style={{ textAlign: "center" }}
                  />
                </Card.Content>
                <Card.Title
                  title="Leaves"
                  titleStyle={{ fontSize: 16, textAlign: "center" }}
                  subtitle={user !== null && user.leaves.length + " leaves"}
                  subtitleStyle={{ textAlign: "center" }}
                />
              </View>
            </Card>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Card
          style={{
            elevation: 10,
            // shadowColor: "#52006A",
            shadowColor: "#000000",
            borderRadius: 10,
          }}
          onPress={() => signOut()}
        >
          <View
            style={{
              // flexDirection: "row",
              // justifyContent: "center",
              // alignItems: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar.Icon icon="logout" backgroundColor="white" color="black" />
            <Card.Title title="Sign out" />
          </View>
        </Card>
      </View>
    </View>
  );
};

export default HomeComponent;
