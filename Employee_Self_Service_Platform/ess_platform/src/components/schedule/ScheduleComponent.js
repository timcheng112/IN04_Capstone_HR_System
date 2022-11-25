import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Divider, Text } from "react-native-paper";
import { format, addDays } from "date-fns";
import { FlatList, View } from "react-native";
import ShiftBlock from "./ShiftBlock";
import api from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const ScheduleComponent = () => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [myShiftListItem, setMyShiftListItem] = useState(null);
  const [shiftListItems, setShiftListItems] = useState(null);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    console.log("SELECTED DATE: " + selectedDate);
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

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
    if (user !== null) {
      if (user.teams.length > 0) {
        setShiftListItems(null);
        setMyShiftListItem(null);
        api
          .getShiftListItemByDateAndTeam(
            format(date, "yyyy-MM-dd"),
            user.teams[0].teamId
          )
          .then((response) => {
            console.log(response.data);
            let myShiftListItemId = null;
            for (let i = 0; i < response.data.length; i++) {
              console.log("Finding my shift list item");
              console.log(response.data[i].user.userId === user.userId);
              if (response.data[i].user.userId === user.userId) {
                console.log("Found my shift list item");
                console.log("My Shift List Item: " + response.data[i]);
                setMyShiftListItem(response.data[i]);
                myShiftListItemId = response.data[i].shiftListItemId;
                break;
              }
            }
            console.log("Test");
            console.log(
              "FILTER: " +
                response.data.filter(
                  (shiftListItem) =>
                    shiftListItem.shiftListItemId !== myShiftListItemId
                )
            );
            console.log("My shift list item: " + myShiftListItem);
            if (myShiftListItemId !== null) {
              setShiftListItems(
                response.data.filter(
                  (shiftListItem) =>
                    shiftListItem.shiftListItemId !== myShiftListItemId
                )
              );
            } else {
              setShiftListItems(response.data);
            }
          })
          .catch((error) =>
            console.log(
              "Error retrieving shift list items for date: " +
                date +
                " and team ID: " +
                user.teams[0].teamId
            )
          );
      }
    }
  }, [user, userId, date]);

  return (
    // <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: "4%" }}>
    <View style={{ flex: 1, padding: "4%" }}>
      <Button
        onPress={() => setShow(true)}
        mode="contained"
        style={{
          alignSelf: "center",
          borderRadius: 10,
          backgroundColor: "#ffffff",
          marginBottom: 10,
          elevation: 10,
          shadowColor: "#000000",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Poppins_700Bold",
            textAlign: "center",
            // color: "white"
          }}
        >
          {format(date, "E MMM dd, yyyy")}
        </Text>
      </Button>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          //   is24Hour={true}
          onChange={onChange}
        />
      )}
      <View style={{ flex: 2, alignItems: "center" }}>
        <Avatar.Image
          source={{
            uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
        />
        <Text style={{ marginTop: 10 }}>
          Employee: {user && user.firstName + " " + user.lastName}
          {"\n"}
          Team:{" "}
          {user && user.teams.length > 0 ? user.teams[0].teamName : "No Team"}
        </Text>
      </View>
      <Divider/>
      <View
        style={{
          // borderTopColor: "#616161",
          // borderTopWidth: 1,
          paddingTop: "2%",
          flex: 2,
          marginBottom: 10,
        }}
      >
        <Text style={{ marginBottom: 10 }}>My Shift: </Text>
        {myShiftListItem !== null ? (
          <ShiftBlock user={user} shiftListItem={myShiftListItem} />
        ) : (
          <Card
            style={{
              flex: 1,
              borderRadius: 20,
              paddingLeft: 10,
              paddingRight: 10,
              //   elevation: 10,
              //   shadowColor: "#000000",
              justifyContent: "center",
            }}
          >
            <Card.Content
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="bed-outline"
                size={40}
                color="black"
              />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Poppins_700Bold",
                }}
              >
                No shift for this date!
              </Text>
            </Card.Content>
          </Card>
        )}
      </View>
      <Divider/>
      <View
        style={{
          // borderTopColor: "#616161",
          // borderTopWidth: 1,
          paddingTop: "2%",
          flex: 4,
        }}
      >
        <Text style={{ marginBottom: 10 }}>Team Members' Shifts: </Text>
        {shiftListItems && shiftListItems.length > 0 ? (
          <View>
            <FlatList
              data={shiftListItems}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 10 }}>
                  <ShiftBlock user={item.user} shiftListItem={item} />
                </View>
              )}
              ListFooterComponent={() => <View style={{ marginBottom: 10 }} />}
            />
          </View>
        ) : (
          <Card
            style={{
              flex: 1,
              borderRadius: 20,
              paddingLeft: 10,
              paddingRight: 10,
              //   elevation: 10,
              //   shadowColor: "#000000",
              justifyContent: "center",
            }}
          >
            <Card.Content
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="bunk-bed-outline"
                size={40}
                color="black"
              />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Poppins_700Bold",
                }}
              >
                No shifts for this date!
              </Text>
            </Card.Content>
          </Card>
        )}
      </View>
    </View>
  );
};

export default ScheduleComponent;
