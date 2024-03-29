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
  isWithinInterval,
} from "date-fns";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import ShiftBlock from "./ShiftBlock";
import api from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import LeaveBlock from "./LeaveBlock";

const ScheduleComponent = () => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState(null);
  const [leaves, setLeaves] = useState(null);
  const [leave, setLeave] = useState(null);
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

  // TO RETRIEVE USERID OF LOGGED IN USER
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

  // TO RETRIEVE LOGGED IN USER
  useEffect(() => {
    if (userId !== null) {
      api
        .getUser(userId)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) =>
          console.log("Error retrieving user with ID: " + userId)
        );
    }
  }, [userId]);

  // TO RETRIEVE SHIFT LIST ITEMS OF TEAM BY DATE
  useEffect(() => {
    if (user !== null) {
      if (user.teams.length > 0) {
        setIsLoading(true);
        if (user.teams.length > 0) {
          setShiftListItems(null);
          setMyShiftListItem(null);
          api
            .getShiftListItemByDateAndTeam(
              format(date, "yyyy-MM-dd"),
              user.teams[0].teamId
            )
            .then((response) => {
              let myShiftListItemId = null;
              for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].user.userId === user.userId) {
                  setMyShiftListItem(response.data[i]);
                  myShiftListItemId = response.data[i].shiftListItemId;
                  break;
                }
              }
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
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(
                "Error retrieving shift list items for date: " +
                  date +
                  " and team ID: " +
                  user.teams[0].teamId
              );
              setIsLoading(false);
            });
        }
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [user, userId, date, refresh]);

  useEffect(() => {
    if (userId !== null) {
      api
        .getEmployeeLeaves(userId)
        .then((response) => setLeaves(response.data))
        .catch((error) => console.log(error.response.data.message));
    }
  }, [userId]);

  useEffect(() => {
    if (leaves !== null) {
      setLeave(
        leaves.find((item) => {
          const startDate = new Date(
            item.startDate.slice(0, 4),
            Number(item.startDate.slice(5, 7)) - 1,
            item.startDate.slice(8)
          );
          const endDate = new Date(
            item.endDate.slice(0, 4),
            Number(item.endDate.slice(5, 7)) - 1,
            item.endDate.slice(8)
          );
          if (
            isWithinInterval(date, {
              start: startDate,
              end: endDate,
            })
          ) {
            return item;
          }
        })
      );
    }
  }, [date]);

  const VirtualizedList = ({ children }) => {
    return (
      <FlatList
        data={[]}
        keyExtractor={() => "key"}
        renderItem={null}
        ListHeaderComponent={<>{children}</>}
      />
    );
  };

  return (
    // <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: "4%" }}>
    // <VirtualizedList>
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: "4%" }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => setRefresh(!refresh)}
        />
      }
    >
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
          titleStyle={{ fontFamily: "Poppins_600SemiBold", fontSize: 18}}
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
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ width: (windowWidth - 40) / 5 }}>
              <Text
                style={{
                  fontFamily: "Poppins_300Light",
                  textAlign: "center",
                }}
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
        <Card.Content style={{ marginTop: "4%" }}>
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
        {isLoading ? (
          <LottieView
            source={require("../../../assets/loading.json")}
            autoPlay
            style={{
              height: "60%",
              width: "60%",
              alignSelf: "center",
              justifyContent: "center",
            }}
            resizeMode="contain"
          />
        ) : myShiftListItem !== null ? (
          <ShiftBlock user={user} shiftListItem={myShiftListItem} />
        ) : leave && leave !== undefined ? (
          <LeaveBlock user={user} leave={leave} />
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
        {isLoading ? (
          <LottieView
            source={require("../../../assets/loading.json")}
            autoPlay
            style={{
              height: "60%",
              width: "60%",
              alignSelf: "center",
              justifyContent: "center",
            }}
            resizeMode="contain"
          />
        ) : shiftListItems && shiftListItems.length > 0 ? (
          <View>
            {/* <FlatList
              data={shiftListItems}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 10 }}>
                  <ShiftBlock user={item.user} shiftListItem={item} />
                </View>
              )}
              ListHeaderComponent={() => <View />}
              ListFooterComponent={() => <View style={{ marginBottom: 10 }} />}
            /> */}
            {shiftListItems.map((item, index) => {
              return (
                <View style={{ marginBottom: 10 }} key={index}>
                  <ShiftBlock user={item.user} shiftListItem={item} />
                </View>
              );
            })}
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
    </ScrollView>
    // </VirtualizedList>
  );
};

export default ScheduleComponent;
