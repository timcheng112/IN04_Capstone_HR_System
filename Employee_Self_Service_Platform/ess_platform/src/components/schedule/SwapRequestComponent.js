import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, View } from "react-native";
import {
  AnimatedFAB,
  Button,
  DataTable,
  Provider,
  Text,
} from "react-native-paper";
import api from "../../utils/api";
import SwapRequestModal from "./SwapRequestModal";
import { Feather } from "@expo/vector-icons";
import DeleteRequestModal from "./DeleteRequestModal";
import LottieView from "lottie-react-native";

const SwapRequestComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [retrevingSwapRequests, setRetrievingSwapRequests] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [shiftListItems, setShiftListItems] = useState(null);
  const [mySwapRequests, setMySwapRequests] = useState([]);
  const [isDeleteVisible, setIsDeleteVisible] = useState({});
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const showDeleteModal = () => setDeleteModalVisible(true);
  const hideDeleteModal = () => setDeleteModalVisible(false);

  const [isExtended, setIsExtended] = React.useState(true);

  const isIOS = Platform.OS === "ios";

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  //   const fabStyle = { [animateFrom]: 16 };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
          setUser(response.data);
        })
        .catch((error) =>
          console.log("Error retrieving user with ID: " + userId)
        );
    }
  }, [userId]);

  useEffect(() => {
    if (user !== null && user.teams.length > 0) {
      api
        .getEmployeesByTeam(user.teams[0].teamId)
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
        })
        .catch((err) =>
          console.log("Error retrieving team for User with ID: " + user.userId)
        );
    }
  }, [user]);

  useEffect(() => {
    if (user !== null && user.teams.length > 0) {
      api
        .getShiftListItemByTeam(user.teams[0].teamId)
        .then((response) => {
          console.log(response.data);
          setShiftListItems(response.data);
        })
        .catch((err) => console.log(err.response.data.message));
    }
  }, [user]);

  useEffect(() => {
    if (userId !== null) {
      setIsLoading(true);
      api
        .getSwapRequestsByUserId(userId)
        .then((response) => {
          setMySwapRequests(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error in retrieving user's swap requests!");
          setIsLoading(false);
        });
    }
  }, [userId, deleteModalVisible, visible, retrevingSwapRequests]);

  const clearSwapRequestHandler = (swapRequestId) => {
    api
      .deleteSwapRequestById(swapRequestId)
      .then((response) => {
        alert(
          "Successfully cleared Swap Request with ID: " + swapRequestId + "!"
        );
        hideDeleteModal();
      })
      .catch((err) => {
        alert("Error in clearing Swap Request with ID: " + swapRequestId + "!");
      });
  };

  return (
    <Provider>
      <SafeAreaView style={{ flexGrow: 1 }}>
        <ScrollView
          onScroll={onScroll}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() =>
                setRetrievingSwapRequests(!retrevingSwapRequests)
              }
            />
          }
        >
          {shiftListItems && users && (
            <SwapRequestModal
              visible={visible}
              hideModal={hideModal}
              users={users}
              shiftListItems={shiftListItems}
              user={user}
            />
          )}

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
          ) : (
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                marginTop: "4%",
                marginBottom: "4%",
                marginLeft: "2%",
                marginRight: "2%",
                elevation: 10,
                paddingBottom: "4%",
              }}
            >
              <Text style={{ fontFamily: "Poppins_600SemiBold", margin: "4%" }}>
                My Swap Requests
              </Text>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>ID</DataTable.Title>
                  <DataTable.Title style={{ flex: 2 }}>
                    My Shift
                  </DataTable.Title>
                  <DataTable.Title style={{ flex: 2 }}>
                    Employee's Shift
                  </DataTable.Title>
                  <DataTable.Title>Status</DataTable.Title>
                </DataTable.Header>
                {mySwapRequests.map((swapRequest, index) =>
                  !isDeleteVisible[index] ? (
                    <DataTable.Row
                      key={index}
                      onPress={() => {
                        setIsDeleteVisible({
                          ...isDeleteVisible,
                          [index]: true,
                        });
                      }}
                    >
                      <DeleteRequestModal
                        visible={deleteModalVisible}
                        hideDeleteModal={hideDeleteModal}
                        swapRequestId={swapRequest.swapRequestId}
                      />
                      <DataTable.Cell>
                        {swapRequest.swapRequestId}
                      </DataTable.Cell>
                      <DataTable.Cell style={{ flex: 2 }}>
                        {swapRequest.requestorShiftListItem.shift.startTime.slice(
                          5,
                          10
                        )}{" "}
                        {swapRequest.requestorShiftListItem.shift.shiftTitle.replace(
                          " Shift",
                          ""
                        )}
                      </DataTable.Cell>
                      <DataTable.Cell style={{ flex: 2 }}>
                        {swapRequest.receiverShiftListItem.shift.startTime.slice(
                          5,
                          10
                        )}{" "}
                        {swapRequest.receiverShiftListItem.shift.shiftTitle.replace(
                          " Shift",
                          ""
                        )}
                      </DataTable.Cell>
                      <DataTable.Cell>
                        {swapRequest.status[0] +
                          swapRequest.status.slice(1).toLowerCase()}
                      </DataTable.Cell>
                    </DataTable.Row>
                  ) : (
                    <DataTable.Row>
                      <DataTable.Cell
                        style={{
                          backgroundColor: "#fca5a5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 20,
                          marginRight: 5,
                        }}
                        onPress={
                          swapRequest.status !== "APPROVED" ||
                          swapRequest.status !== "REJECTED"
                            ? () => {
                                showDeleteModal();
                                setIsDeleteVisible({
                                  ...isDeleteVisible,
                                  [index]: false,
                                });
                              }
                            : clearSwapRequestHandler
                        }
                      >
                        <Feather name="trash" size={18} color="black" />
                        <Text style={{ fontFamily: "Poppins_500Medium" }}>
                          {swapRequest.status !== "APPROVED" ||
                          swapRequest.status !== "REJECTED"
                            ? "Delete"
                            : "Clear"}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{
                          display: "flex",
                          //   flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: 5,
                          borderRadius: 20,
                          backgroundColor: "#d6d3d1",
                        }}
                        onPress={() =>
                          setIsDeleteVisible({
                            ...isDeleteVisible,
                            [index]: false,
                          })
                        }
                      >
                        <Feather name="x-circle" size={16} color="black" />
                        <Text style={{ fontFamily: "Poppins_500Medium" }}>
                          Cancel
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  )
                )}
              </DataTable>
            </View>
          )}
        </ScrollView>
        <AnimatedFAB
          icon={"plus"}
          label={"Apply"}
          extended={isExtended}
          onPress={showModal}
          visible={!visible}
          animateFrom={"right"}
          iconMode={"static"}
          style={{
            bottom: "5%",
            right: 10,
            position: "absolute",
            //   backgroundColor: "#FBB344",
          }}
        />
      </SafeAreaView>
    </Provider>
  );
};

export default SwapRequestComponent;
