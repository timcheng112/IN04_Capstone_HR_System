import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
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
import AppLoading from "expo-app-loading";
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
import { Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../login/Context";

const HomeComponent = () => {
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

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View
        style={{
          padding: "4%",
          flex: 1,
        }}
      >
        <Image
          source={require("../../../assets/libro-logo.png")}
          style={{
            flex: 1,
            resizeMode: "contain",
            alignSelf: "center",
            marginBottom: 20,
          }}
          alt="Libro Logo"
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 20,
            }}
          >
            Welcome back,
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_700Bold",
              fontSize: 20,
            }}
          >
            {user !== null && user.firstName}!
          </Text>
        </View>
        <View style={{ flex: 4 }}>
          <Card
            style={{ elevation: 20, shadowColor: "#52006A", marginBottom: 10 }}
            onPress={() => {
              navigation.navigate("Admin", { screen: "Onboarding" });
            }}
          >
            <Card.Title
              title="Onboarding & Offboarding"
              subtitle={
                user !== null &&
                "You have " + user.taskListItems.length + " tasks"
              }
            />
          </Card>
          <Card
            style={{ elevation: 20, shadowColor: "#52006A", marginBottom: 10 }}
            // onPress={() => navigation.navigate("Leave")}
            onPress={() => {
              navigation.navigate("Admin", { screen: "Leave" });
            }}
          >
            <Card.Title
              title="Leaves"
              subtitle={
                user !== null &&
                "You have applied for " + user.leaves.length + " leaves"
              }
            />
          </Card>
        </View>
        <View style={{ flex: 1 }}>
          <Card
            style={{ elevation: 20, shadowColor: "#52006A", marginBottom: 10 }}
            onPress={() => signOut()}
          >
            <Card.Title title="Sign out" left={leftContent} />
          </Card>
        </View>
      </View>
    );
  }
};

export default HomeComponent;
