import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Card } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import api from "../../utils/api";

const PayInformationComponent = ({ user }) => {
  const [img, setImg] = useState("");

  useEffect(() => {
    if (user !== null && user.profilePic !== null) {
      api
        .getDocById(user.profilePic.docId)
        .then((response) => {
          console.log("TEST 1");
          const fr = new FileReader();
          console.log("TEST 2");
          fr.onload = async () => {
            console.log("TEST 3");
            const fileUri = `${FileSystem.documentDirectory}_ProfilePic.png`;
            console.log("TEST 4");
            await FileSystem.writeAsStringAsync(
              fileUri,
              fr.result.split(",")[1],
              {
                encoding: FileSystem.EncodingType.Base64,
              }
            );
            console.log("TEST 5");
            setImg(fileUri);
            console.log(fileUri);
            // return fileUri;
          };
          console.log("TEST 6");
          fr.readAsDataURL(response.data);
        })
        .catch((err) => console.log("Error in downloading"));
    }
  }, [user]);

  return (
    <View style={{ marginTop: "4%" }}>
      <Card
        style={{
          borderRadius: 20,
          marginTop: "2%",
          //   margin: "-4%",
          textAlign: "center",
        }}
      >
        <Card.Cover
          source={{
            uri: img
              ? img
              : "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          }}
          style={{
            borderRadius: 20,
            width: "100%",
            alignSelf: "center",
          }}
        />
      </Card>
      <Card
        style={{
          marginTop: "2%",
          borderRadius: 20,
          padding: 8,
        }}
      >
        <Card.Title
          title="Personal Information"
          left={(props) => (
            <MaterialCommunityIcons
              {...props}
              name="card-account-details"
              size={24}
              color="black"
            />
          )}
          titleStyle={{
            marginLeft: "-7%",
            fontFamily: "Poppins_600SemiBold",
          }}
          style={{ marginBottom: "-8%", marginTop: "-4%" }}
        />
        <Card.Title
          title="Name"
          subtitle={user && user.firstName + " " + user.lastName}
          titleStyle={{ fontSize: 12, fontFamily: "Poppins_400Regular" }}
          subtitleStyle={{ fontSize: 16, fontFamily: "Poppins_400Regular" }}
        />
        <Card.Title
          title="Position"
          subtitle={
            user && user.currentPosition
              ? user.currentPosition.positionName
              : user.userRole !== null
              ? user.userRole
              : ""
          }
          titleStyle={{ fontSize: 12, fontFamily: "Poppins_400Regular" }}
          subtitleStyle={{ fontSize: 16, fontFamily: "Poppins_400Regular" }}
          style={{ marginTop: -10 }}
        />
      </Card>
      <Card style={{ marginTop: "2%", borderRadius: 20, padding: 8 }}>
        <Card.Title
          title="Pay Information"
          left={(props) => (
            <FontAwesome5 name="file-invoice-dollar" size={24} color="black" />
          )}
          titleStyle={{
            marginLeft: "-9%",
            fontFamily: "Poppins_600SemiBold",
          }}
          style={{ marginBottom: "-8%", marginTop: "-4%" }}
        />
        <Card.Title
          title="Basic Monthly Salary"
          subtitle={
            userPayInfo && userPayInfo.basicSalary
              ? "$" + userPayInfo.basicSalary
              : "-"
          }
          titleStyle={{ fontSize: 12, fontFamily: "Poppins_400Regular" }}
          subtitleStyle={{ fontSize: 16, fontFamily: "Poppins_400Regular" }}
        />
        <View style={{ display: "flex", flexDirection: "row", marginTop: -10 }}>
          <Card.Title
            title="Basic Hourly"
            subtitle={
              userPayInfo && userPayInfo.basicHourlyPay
                ? "$" + userPayInfo.basicHourlyPay
                : "-"
            }
            titleStyle={{ fontSize: 12, fontFamily: "Poppins_400Regular" }}
            subtitleStyle={{
              fontSize: 16,
              fontFamily: "Poppins_400Regular",
            }}
            style={{ flex: 1 }}
          />
          <Card.Title
            title="Weekend/PH Hourly"
            subtitle={
              userPayInfo && userPayInfo.basicHourlyPay
                ? "$" + userPayInfo.basicHourlyPay * 1.5
                : "-"
            }
            titleStyle={{ fontSize: 12, fontFamily: "Poppins_400Regular" }}
            subtitleStyle={{
              fontSize: 16,
              fontFamily: "Poppins_400Regular",
            }}
            style={{ flex: 1 }}
          />
        </View>
        <View style={{ display: "flex", flexDirection: "row", marginTop: -10 }}>
          <Card.Title
            title="OT Hourly"
            subtitle={
              userPayInfo && userPayInfo.basicHourlyPay
                ? "$" + userPayInfo.basicHourlyPay * 1.5
                : "-"
            }
            titleStyle={{ fontSize: 12, fontFamily: "Poppins_400Regular" }}
            subtitleStyle={{
              fontSize: 16,
              fontFamily: "Poppins_400Regular",
            }}
            style={{ flex: 1 }}
          />
          <Card.Title
            title="Commission per sale"
            subtitle="20%"
            titleStyle={{ fontSize: 12, fontFamily: "Poppins_400Regular" }}
            subtitleStyle={{
              fontSize: 16,
              fontFamily: "Poppins_400Regular",
            }}
            style={{ flex: 1 }}
          />
        </View>
      </Card>
    </View>
  );
};

export default PayInformationComponent;
