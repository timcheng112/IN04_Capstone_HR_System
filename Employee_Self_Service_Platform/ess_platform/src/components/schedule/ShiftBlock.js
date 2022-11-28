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

const ShiftBlock = ({ user, shiftListItem }) => {
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
      {/* <Card.Title
        title="Janice Sim"
        subtitleNumberOfLines={2}
        subtitle="08:00 - 16:00"
        left={() => (
          <Avatar.Image
            size={40}
            source={{
              uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
        )}
        style={{flex: 1}}
      /> */}
      <Card.Content style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          {/* <Avatar.Image
            // size={44}
            source={{
              uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
            style={{ backgroundColor: "green" }}
          /> */}
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
              <Text style={{fontFamily: "Poppins_500Medium", fontSize: 14}}>{shiftListItem && shiftListItem.shift.shiftTitle}</Text>
            </Text>
            <Text style={{ fontFamily: "Poppins_300Light", fontSize: 12 }}>
              {shiftListItem && shiftListItem.positionType}
            </Text>
            <Text style={{ fontFamily: "Poppins_300Light", fontSize: 12 }}>
              {shiftListItem &&
                shiftListItem.shift.startTime.slice(11, 16) +
                  " - " +
                  shiftListItem.shift.endTime.slice(11, 16)}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ShiftBlock;
