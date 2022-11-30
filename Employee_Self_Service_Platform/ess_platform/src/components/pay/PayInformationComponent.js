import React from "react";
import { View } from "react-native";
import { Card } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const PayInformationComponent = ({ user }) => {
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
            uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
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
          subtitle="$10,000"
          titleStyle={{ fontSize: 12, fontFamily: "Poppins_400Regular" }}
          subtitleStyle={{ fontSize: 16, fontFamily: "Poppins_400Regular" }}
        />
        <View style={{ display: "flex", flexDirection: "row", marginTop: -10 }}>
          <Card.Title
            title="Basic Hourly"
            subtitle="$14"
            titleStyle={{ fontSize: 12, fontFamily: "Poppins_400Regular" }}
            subtitleStyle={{
              fontSize: 16,
              fontFamily: "Poppins_400Regular",
            }}
            style={{ flex: 1 }}
          />
          <Card.Title
            title="Weekend/PH Hourly"
            subtitle="$28"
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
            subtitle="$28"
            titleStyle={{ fontSize: 12, fontFamily: "Poppins_400Regular" }}
            subtitleStyle={{
              fontSize: 16,
              fontFamily: "Poppins_400Regular",
            }}
            style={{ flex: 1 }}
          />
          <Card.Title
            title="Commission per sale"
            subtitle="$5"
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
