import React, { useEffect, useState } from "react";
import { Button, Text } from "react-native-paper";
import { TouchableHighlight } from "react-native";
import api from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";

export default function NotificationScreen({ navigation }) {
  const [read, setRead] = useState([]);
  const [unread, setUnread] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    uId().catch(console.error);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      api
        .getUserUnreadNotifications(userId)
        .then((response) => {
          setUnread(response.data);
          console.log(response.data);
        })
        .then(() => {
          api
            .getUserReadNotifications(userId)
            .then((response) => {
              setRead(response.data);
              console.log(response.data);
              var allNotifications = unread.concat(response.data);
              setNotifications(allNotifications);
            })
            .finally(() => {
              console.log("refresh dependency");
              setRefreshing(false);
              console.log("notif ");
              console.log(notifications);
            });
        });
    }, 5000);
    return () => clearTimeout(timer);
  }, [refreshing]);

  useEffect(() => {
    const notificationInterval = setInterval(() => {
      //console.log('refresh')
      setRefreshing(true);
    }, 7000);
    return () => clearInterval(notificationInterval);
  }, []);

  const uId = async () => {
    setRefreshing(true);
    const userId = await AsyncStorage.getItem("userId");
    console.log("userId " + userId);
    setUserId(userId);

    api
      .getUserUnreadNotifications(userId)
      .then((response) => {
        setUnread(response.data);
        //console.log(response.data);
      })
      .then(() => {
        api
          .getUserReadNotifications(userId)
          .then((response) => {
            setRead(response.data);
            //console.log(response.data);
            var allNotifications = unread.concat(response.data);
            setNotifications(allNotifications);
          })
          .finally(() => {
            //console.log("finally");
            //console.log(notifications);
            setRefreshing(false);
          });
      });
  };

  function deleteAllNotifications() {
    api.deleteAllNotifications(userId).then((response) => {
      setUnread([]);
      setRead([]);
      setRefreshing(true);
      Alert.alert(response.data);
    });
  }

  function markAsRead(notificationId) {
    console.log("user id " + userId);
    api.markNotificationAsRead(notificationId, userId).then((response) => {
      //console.log(response.data);
      setRefreshing(true);
    });
  }

  // const renderNotifications = ({ item }, rowMap) => {
  //   console.log("item " + item.notificationId);
  //   if (
  //     read.find(
  //       (readNotification) =>
  //         readNotification.notificationId === item.notificationId
  //     )
  //   ) {
  //     return (
  //       <SwipeRow>
  //         <View
  //           style={{
  //             marginVertical: 10,
  //             marginHorizontal: 20,
  //             backgroundColor: "#ffff",
  //           }}
  //         >
  //           <View>
  //             <Text
  //               style={{
  //                 paddingTop: 20,
  //                 paddingLeft: 10,
  //                 fontSize: 20,
  //                 fontWeight: "600",
  //               }}
  //             >
  //               {item.title}
  //             </Text>
  //             <Text style={{ paddingVertical: 15, paddingLeft: 10 }}>
  //               {item.description}
  //             </Text>
  //           </View>
  //         </View>
  //       </SwipeRow>
  //     );
  //   } else {
  //     return (
  //       <TouchableOpacity
  //         onPress={() => {
  //           markAsRead(item.notificationId);
  //         }}
  //       >
  //         <View
  //           style={{
  //             marginVertical: 10,
  //             marginHorizontal: 20,
  //             backgroundColor: "#ffff",
  //             borderRadius: 4,
  //             borderLeftColor: "#fbb344",
  //             borderLeftWidth: 4,
  //           }}
  //         >
  //           <View>
  //             <Text
  //               style={{
  //                 paddingTop: 30,
  //                 paddingLeft: 10,
  //                 fontSize: 20,
  //                 fontWeight: "600",
  //               }}
  //             >
  //               {item.title}
  //             </Text>
  //             <Text style={{ padding: 10 }}>{item.description}</Text>
  //           </View>
  //         </View>
  //       </TouchableOpacity>
  //     );
  //   }
  // };

  const deleteRow = (rowMap, rowKey, notificationId) => {
    console.log("notification id " + notificationId);
    api.deleteANotification(notificationId, userId).then((response) => {
      setRefreshing(true);
      Alert.alert(response.data);
      closeRow(rowMap, rowKey);
    });
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderSwipeable = (data, rowMap) => (
    <SwipeRow
      rightOpenValue={-75}
      style={{
        marginVertical: 5,
        borderWidth: 4,
        borderLeftColor: "#fbb344",
        borderRightColor: "#ffff",
        borderTopColor: "#ffff",
        borderBottomColor: "#ffff",
      }}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#ffff",
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingLeft: 15,
          paddingVertical: 20,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            bottom: 0,
            justifyContent: "center",
            position: "absolute",
            top: 0,
            width: 75,
            backgroundColor: "#FF0000",
          }}
          onPress={() =>
            deleteRow(rowMap, data.item.key, data.item.notificationId)
          }
        >
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ color: "#ffff" }}>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableHighlight
        onPress={() => markAsRead(data.item.notificationId)}
        style={{
          alignItems: "flex-start",
          backgroundColor: "#ffff",
          justifyContent: "flex-start",
        }}
        underlayColor="#bbb"
      >
        <View style={{ paddingVertical: 20 }}>
          <Text
            style={{
              paddingLeft: 30,
              fontSize: 20,
              fontWeight: "800",
            }}
          >
            {data.item.title}
          </Text>
          <Text
            style={{
              paddingLeft: 30,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {data.item.description}
          </Text>
        </View>
      </TouchableHighlight>
    </SwipeRow>
  );

  const renderReadSwipeable = (data, rowMap) => (
    <SwipeRow
      rightOpenValue={-75}
      style={{ marginVertical: 5, backgroundColor: "#ffff" }}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#ffff",
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingLeft: 15,
          paddingVertical: 20,
          borderWidth: 4,
          borderColor: "#ffff",
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            bottom: 0,
            justifyContent: "center",
            position: "absolute",
            top: 0,
            width: 75,
            backgroundColor: "#ff0000",
          }}
          onPress={() =>
            deleteRow(rowMap, data.item.key, data.item.notificationId)
          }
        >
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ color: "#ffff" }}>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableHighlight
        onPress={() => console.log("You touched me")}
        style={{
          alignItems: "flex-start",
          backgroundColor: "#ffff",
          justifyContent: "flex-start",
        }}
        underlayColor="#ffff"
      >
        <View style={{ paddingVertical: 20 }}>
          <Text
            style={{
              paddingLeft: 30,
              fontSize: 20,
              fontWeight: "800",
            }}
          >
            {data.item.title}
          </Text>
          <Text
            style={{
              paddingLeft: 30,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {data.item.description}
          </Text>
        </View>
      </TouchableHighlight>
    </SwipeRow>
  );

  return (
    notifications && (
      <>
        <SafeAreaView>
          <View>
            {notifications.length === 0 ? (
              <>
                <Text
                  style={{
                    textAlign: "center",
                    textAlignVertical: "center",
                    alignContent: "center",
                    alignItems: "center",
                    fontSize: 28,
                    marginTop: 155,
                    marginBottom: 50,
                  }}
                >
                  No Notifications
                </Text>
                <Button onPress={uId}>Refresh</Button>
              </>
            ) : (
              <View style={{ maxHeight:"73%" }}>
                <Button
                  color="#ffff"
                  onPress={() => deleteAllNotifications()}
                  style={{
                    marginTop: 10,
                    backgroundColor: "#fbb344",
                    marginHorizontal: 25,
                  }}
                >
                  Delete All
                </Button>
                <Text
                  style={{
                    alignContent: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    marginTop: 15,
                    fontSize: 20,
                  }}
                >
                  Unread ({unread.length})
                </Text>
                <View>
                  <SwipeListView
                    style={{ marginTop: 20, marginHorizontal: 20 }}
                    data={unread}
                    renderItem={renderSwipeable}
                  ></SwipeListView>
                </View>
                <Text
                  style={{
                    alignContent: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    marginTop: 15,
                    fontSize: 20,
                  }}
                >
                  Read ({read.length})
                </Text>
                <View>
                  <SwipeListView
                    style={{ marginTop: 20, marginHorizontal: 20 }}
                    data={read}
                    renderItem={renderReadSwipeable}
                  ></SwipeListView>
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
      </>
    )
  );
}
