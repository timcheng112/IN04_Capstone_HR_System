import React from "react";
import { View } from "react-native";
import { Avatar, Card, Paragraph, Text, Title } from "react-native-paper";
import { format } from "date-fns";

const colours = [
  "#3949ab",
  "#d81b60",
  "#e53935",
  "#1e88e5",
  "#00acc1",
  "#43a047",
  "#c0ca33",
  "#fdd835",
  "#ffb300",
  "#fb8c00",
  "#6d4c41",
];

const LeaveBlock = ({ user, leave }) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const colour = colours[getRandomInt(colours.length)];

  return (
    <Card
      style={{
        flex: 1,
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        // elevation: 10,
        shadowColor: "#000000",
        justifyContent: "center",
      }}
    >
      <Card.Content style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Avatar.Text
            label={user && user.firstName[0] + user.lastName[0]}
            size={40}
            style={{
              // backgroundColor: "#3949ab",
              backgroundColor: colour,
              alignSelf: "flex-start",
              margin: 10,
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16 }}>
              {user !== null && user.firstName + " " + user.lastName}
              {"\n"}
              <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 14 }}>
                {leave && leave.leaveType}
              </Text>
            </Text>
            <Text style={{ fontFamily: "Poppins_300Light", fontSize: 12 }}>
              {leave && leave.status}
            </Text>
            <Text style={{ fontFamily: "Poppins_300Light", fontSize: 12 }}>
              {leave && leave.startDate + " - " + leave.endDate}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default LeaveBlock;
