import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  IconButton,
  Text,
} from "react-native-paper";
import {
  format,
  addDays,
  getDate,
  eachDayOfInterval,
  endOfYear,
  isSameDay,
} from "date-fns";
import { Dimensions, FlatList, View } from "react-native";
import ShiftBlock from "./ShiftBlock";
import api from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ScheduleComponent = () => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [myShiftListItem, setMyShiftListItem] = useState(null);
  const [shiftListItems, setShiftListItems] = useState(null);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const windowWidth = Dimensions.get("window").width;
  const [currWeekDates, setCurrWeekDates] = useState(
    eachDayOfInterval({
      start: date,
      end: addDays(date, 7),
    })
  );

  const onChange = (event, selectedDate) => {
    console.log("SELECTED DATE: " + selectedDate);
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setCurrWeekDates(
      eachDayOfInterval({
        start: currentDate,
        end: addDays(currentDate, 7),
      })
    );
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
      <Card
        style={{
          margin: "-4%",
          flex: 2.5,
          elevation: 10,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <Card.Title
          title={format(date, "dd MMMM yyyy")}
          titleStyle={{ fontFamily: "Poppins_600SemiBold" }}
          // left={(props) => (
          //   <TouchableOpacity onPress={() => setShow(true)}>
          //     <Feather name="calendar" size={24} color="black" />
          //   </TouchableOpacity>
          // )}
          right={(props) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                style={{ width: 100 }}
                onPress={() => {
                  setDate(new Date());
                  setCurrWeekDates(
                    eachDayOfInterval({
                      start: new Date(),
                      end: addDays(new Date(), 7),
                    })
                  );
                }}
              >
                Today
              </Button>
              <TouchableOpacity onPress={() => setShow(true)}>
                <Feather name="calendar" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
          rightStyle={{ padding: "4%" }}
        />
        <FlatList
          data={currWeekDates}
          horizontal
          renderItem={({ item }) => (
            <View style={{ width: (windowWidth - 40) / 5 }}>
              <Text
                style={{ fontFamily: "Poppins_300Light", textAlign: "center" }}
              >
                {format(item, "E")}
              </Text>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View>
                  <Badge
                    size={30}
                    style={
                      isSameDay(item, date)
                        ? { backgroundColor: "indigo" }
                        : { backgroundColor: "white" }
                    }
                    onPress={() => setDate(item)}
                  >
                    {getDate(item)}
                  </Badge>
                </View>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: "100%",
                  width: 10,
                }}
              />
            );
          }}
        />
        <Card.Content>
          <Text style={{ fontFamily: "Poppins_300Light" }}>
            Team:{" "}
            {user && user.teams.length > 0 ? user.teams[0].teamName : "No Team"}
          </Text>
        </Card.Content>
      </Card>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          //   is24Hour={true}
          onChange={onChange}
        />
      )}
      {/* <View style={{ flex: 2, alignItems: "center" }}>
        <Avatar.Image
          source={{
            uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
          style={{ elevation: 10 }}
        />
        <Text style={{ marginTop: 10 }}>
          Employee: {user && user.firstName + " " + user.lastName}
          {"\n"}
          Team:{" "}
          {user && user.teams.length > 0 ? user.teams[0].teamName : "No Team"}
        </Text>
      </View>
      <Divider /> */}
      <View
        style={{
          // borderTopColor: "#616161",
          // borderTopWidth: 1,
          paddingTop: "2%",
          flex: 2,
          marginTop: "5%",
          marginBottom: 10,
          // margin: "-4%",
          // padding: "-4%",
          // backgroundColor: "white"
        }}
      >
        <Text style={{ marginBottom: "4%", fontFamily: "Poppins_600SemiBold" }}>
          My Shift:{" "}
        </Text>
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
                  fontFamily: "Poppins_500Medium",
                }}
              >
                No shift for this date!
              </Text>
            </Card.Content>
          </Card>
        )}
      </View>
      <Divider />
      <View
        style={{
          // borderTopColor: "#616161",
          // borderTopWidth: 1,
          paddingTop: "2%",
          flex: 4,
        }}
      >
        <Text style={{ marginBottom: "4%", fontFamily: "Poppins_600SemiBold" }}>
          Team Members' Shifts:{" "}
        </Text>
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
                  fontFamily: "Poppins_500Medium",
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
