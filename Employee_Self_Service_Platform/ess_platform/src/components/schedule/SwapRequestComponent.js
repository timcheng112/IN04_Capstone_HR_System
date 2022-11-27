import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AnimatedFAB,
  Button,
  DataTable,
  Provider,
  Text,
  ToggleButton,
} from "react-native-paper";
import api from "../../utils/api";
import SwapRequestModal from "./SwapRequestModal";
import { Feather } from "@expo/vector-icons";
import DeleteRequestModal from "./DeleteRequestModal";
import LottieView from "lottie-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ViewRequestModal from "./ViewRequestModal";
import RejectionDialog from "./RejectionDialog";
import CounterProposingModal from "./CounterProposingModal";

const SwapRequestComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [retrevingSwapRequests, setRetrievingSwapRequests] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [shiftListItems, setShiftListItems] = useState(null);
  const [mySwapRequests, setMySwapRequests] = useState([]);
  const [myCompletedSwapRequests, setMyCompletedSwapRequests] = useState([]);
  const [incomingSwapRequests, setIncomingSwapRequests] = useState([]);
  const [teamSwapRequests, setTeamSwapRequests] = useState([]);

  const [viewModalVisible, setViewModalVisible] = useState(false);
  const showViewModal = () => setViewModalVisible(true);
  const hideViewModal = () => setViewModalVisible(false);

  const [counterProposingModalVisible, setCounterProposingModalVisible] =
    useState(false);
  const showCounterProposingModal = () => setCounterProposingModalVisible(true);
  const hideCounterProposingModal = () =>
    setCounterProposingModalVisible(false);

  const [value, setValue] = useState("My Requests");

  const [isDeleteVisible, setIsDeleteVisible] = useState({});
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const showDeleteModal = () => setDeleteModalVisible(true);
  const hideDeleteModal = () => setDeleteModalVisible(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  const [isExtended, setIsExtended] = useState(true);

  const isIOS = Platform.OS === "ios";

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  //   const fabStyle = { [animateFrom]: 16 };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // TO RETRIEVE LOGGED IN USER's ID
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

  // TO RETRIEVE EMPLOYEES IN LOGGED IN USER's TEAM
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

  // TO RETRIEVE SHIFT LIST ITEMS OF LOGGED IN USER's TEAM
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

  // TO RETRIEVE SWAP REQUESTS OF LOGGED IN USER's TEAM
  useEffect(() => {
    if (user !== null) {
      setIsLoading(true);
      api
        .getSwapRequestsByTeamId(user.teams[0].teamId)
        .then((response) => {
          const pendingSwapRequests = response.data.filter(
            (item) => item.status === "PENDING"
          );
          const tempTeamSwapRequests = pendingSwapRequests.filter(
            (item) => item.requestor.userId !== user.userId
          );
          const tempAllMySwapRequests = response.data.filter(
            (item) => item.requestor.userId === user.userId
          );
          const tempReviewingSwapRequests = response.data.filter(
            (item) => item.status === "REVIEWING"
          );
          const tempMyCurrentSwapRequests = tempAllMySwapRequests.filter(
            (item) => item.status !== "COMPLETED"
          );
          const tempMyCompletedSwapRequests = tempAllMySwapRequests.filter(
            (item) => item.status === "COMPLETED"
          );
          const tempIncomingSwapRequests = response.data.filter(
            (item) => item.receiver.userId === user.userId
          );
          setTeamSwapRequests(tempReviewingSwapRequests);
          setMySwapRequests(tempMyCurrentSwapRequests);
          setMyCompletedSwapRequests(tempMyCompletedSwapRequests);
          setIncomingSwapRequests(tempIncomingSwapRequests);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error in retrieving user's swap requests!");
          setIsLoading(false);
        });
    }
  }, [user, retrevingSwapRequests]);

  const clearSwapRequestHandler = (swapRequestId) => {
    api
      .clearSwapRequest(swapRequestId)
      .then((response) => {
        alert(
          "Successfully cleared Swap Request with ID: " + swapRequestId + "!"
        );
        setRetrievingSwapRequests(!retrevingSwapRequests);
      })
      .catch((err) => {
        alert("Error in clearing Swap Request with ID: " + swapRequestId + "!");
      });
  };

  const deleteSwapRequestHandler = (swapRequestId) => {
    api
      .deleteSwapRequestById(swapRequestId)
      .then((response) => {
        alert(
          "Successfully deleted Swap Request with ID: " + swapRequestId + "!"
        );
        setRetrievingSwapRequests(!retrevingSwapRequests);
        hideDeleteModal();
      })
      .catch((err) => {
        alert("Error in deleting Swap Request with ID: " + swapRequestId + "!");
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
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "4%",
            }}
          >
            <ToggleButton.Row
              onValueChange={(value) => setValue(value)}
              style={{ width: "96%" }}
            >
              <ToggleButton
                icon={() => <Feather name="user" size={24} color="black" />}
                value="My Requests"
                style={[
                  { width: "50%", borderRadius: 20, borderWidth: 1 },
                  value === "My Requests" && { backgroundColor: "#818cf8" },
                ]}
              />
              {user && user.userRole === "EMPLOYEE" ? (
                <ToggleButton
                  icon={() => (
                    <MaterialCommunityIcons
                      name="history"
                      size={24}
                      color="black"
                    />
                  )}
                  value="History"
                  style={[
                    { width: "50%", borderRadius: 20, borderWidth: 1 },
                    value === "History" && { backgroundColor: "#818cf8" },
                  ]}
                />
              ) : (
                <ToggleButton
                  icon={() => <Feather name="users" size={24} color="black" />}
                  value="Employees' Requests"
                  style={[
                    { width: "50%", borderRadius: 20, borderWidth: 1 },
                    value === "Employees' Requests" && {
                      backgroundColor: "#818cf8",
                    },
                  ]}
                />
              )}
            </ToggleButton.Row>
          </View>
          {shiftListItems && users && (
            <SwapRequestModal
              visible={visible}
              hideModal={hideModal}
              users={users}
              shiftListItems={shiftListItems}
              user={user}
              onRefresh={() =>
                setRetrievingSwapRequests(!retrevingSwapRequests)
              }
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
          ) : value === "My Requests" ? (
            <>
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
                <Text
                  style={{ fontFamily: "Poppins_600SemiBold", margin: "4%" }}
                >
                  My Swap Requests
                </Text>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title style={{ flex: 1 }}>ID</DataTable.Title>
                    <DataTable.Title style={{ flex: 3 }}>
                      My Shift
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 3 }}>
                      Employee's Shift
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 2 }}>
                      Status
                    </DataTable.Title>
                  </DataTable.Header>
                  {mySwapRequests.map((swapRequest, index) =>
                    !isDeleteVisible[index] ? (
                      <DataTable.Row
                        key={index}
                        onPress={
                          swapRequest.status === "APPROVED" ||
                          swapRequest.status === "REJECTED" ||
                          swapRequest.status === "REVIEWING"
                            ? showDialog
                            : () => console.log("")
                        }
                        onLongPress={() => {
                          setIsDeleteVisible({
                            ...isDeleteVisible,
                            [index]: true,
                          });
                        }}
                      >
                        <RejectionDialog
                          hideDialog={hideDialog}
                          visible={dialogVisible}
                          swapRequest={swapRequest}
                        />
                        <DeleteRequestModal
                          visible={deleteModalVisible}
                          hideDeleteModal={hideDeleteModal}
                          swapRequestId={swapRequest.swapRequestId}
                          onRefresh={() =>
                            setRetrievingSwapRequests(!retrevingSwapRequests)
                          }
                        />
                        <CounterProposingModal
                          visible={counterProposingModalVisible}
                          hideModal={hideCounterProposingModal}
                          users={users}
                          shiftListItems={shiftListItems}
                          user={user}
                          onRefresh={() =>
                            setRetrievingSwapRequests(!retrevingSwapRequests)
                          }
                          counterProposingSwapRequest={swapRequest}
                        />
                        <DataTable.Cell style={{ flex: 1 }}>
                          {swapRequest.swapRequestId}
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 3 }}>
                          {swapRequest.requestorShiftListItem.shift.startTime.slice(
                            5,
                            10
                          )}{" "}
                          {swapRequest.requestorShiftListItem.shift.shiftTitle.replace(
                            " Shift",
                            ""
                          )}
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 3 }}>
                          {swapRequest.receiverShiftListItem.shift.startTime.slice(
                            5,
                            10
                          )}{" "}
                          {swapRequest.receiverShiftListItem.shift.shiftTitle.replace(
                            " Shift",
                            ""
                          )}
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2 }}>
                          {swapRequest.status}
                        </DataTable.Cell>
                      </DataTable.Row>
                    ) : (
                      <DataTable.Row style={{ padding: 4 }} key={index}>
                        {swapRequest.status === "REJECTED" && (
                          <DataTable.Cell
                            style={{
                              backgroundColor: "#fdba74",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 20,
                              marginRight: 5,
                              flex: 2,
                              elevation: 6,
                            }}
                            // onPress={}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                showCounterProposingModal();
                                setIsDeleteVisible({
                                  ...isDeleteVisible,
                                  [index]: false,
                                });
                              }}
                            >
                              <Text style={{ fontFamily: "Poppins_500Medium" }}>
                                Counter Propose
                              </Text>
                            </TouchableOpacity>
                          </DataTable.Cell>
                        )}
                        <DataTable.Cell
                          style={{
                            backgroundColor: "#fca5a5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 20,
                            marginRight: 5,
                            elevation: 6,
                          }}
                        >
                          <TouchableOpacity
                            onPress={
                              swapRequest.status !== "APPROVED"
                                ? () => {
                                    showDeleteModal();
                                    setIsDeleteVisible({
                                      ...isDeleteVisible,
                                      [index]: false,
                                    });
                                  }
                                : () => {
                                    setIsDeleteVisible({
                                      ...isDeleteVisible,
                                      [index]: false,
                                    });
                                    clearSwapRequestHandler(
                                      swapRequest.swapRequestId
                                    );
                                  }
                            }
                          >
                            <Text style={{ fontFamily: "Poppins_500Medium" }}>
                              {swapRequest.status !== "APPROVED"
                                ? "Delete"
                                : "Clear"}
                            </Text>
                          </TouchableOpacity>
                          {/* <Feather name="trash" size={18} color="black" /> */}
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
                            elevation: 6,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              setIsDeleteVisible({
                                ...isDeleteVisible,
                                [index]: false,
                              })
                            }
                          >
                            {/* <Feather name="x-circle" size={16} color="black" /> */}
                            <Text style={{ fontFamily: "Poppins_500Medium" }}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </DataTable.Cell>
                      </DataTable.Row>
                    )
                  )}
                </DataTable>
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 20,
                  marginBottom: "4%",
                  marginLeft: "2%",
                  marginRight: "2%",
                  elevation: 10,
                  paddingBottom: "4%",
                }}
              >
                <Text
                  style={{ fontFamily: "Poppins_600SemiBold", margin: "4%" }}
                >
                  Received Swap Requests
                </Text>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title style={{ flex: 1 }}>ID</DataTable.Title>
                    <DataTable.Title style={{ flex: 3 }}>
                      My Shift
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 3 }}>
                      Employee's Shift
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 2 }}>
                      Status/Action
                    </DataTable.Title>
                  </DataTable.Header>
                  {incomingSwapRequests.map((swapRequest, index) => (
                    <DataTable.Row key={index}>
                      <ViewRequestModal
                        visible={viewModalVisible}
                        hideModal={hideViewModal}
                        swapRequest={swapRequest}
                        onRefresh={() =>
                          setRetrievingSwapRequests(!retrevingSwapRequests)
                        }
                        isPending
                      />
                      <DataTable.Cell style={{ flex: 1 }}>
                        {swapRequest.swapRequestId}
                      </DataTable.Cell>
                      <DataTable.Cell style={{ flex: 3 }}>
                        {swapRequest.receiverShiftListItem.shift.startTime.slice(
                          5,
                          10
                        )}{" "}
                        {swapRequest.receiverShiftListItem.shift.shiftTitle.replace(
                          " Shift",
                          ""
                        )}
                      </DataTable.Cell>
                      <DataTable.Cell style={{ flex: 3 }}>
                        {swapRequest.requestorShiftListItem.shift.startTime.slice(
                          5,
                          10
                        )}{" "}
                        {swapRequest.requestorShiftListItem.shift.shiftTitle.replace(
                          " Shift",
                          ""
                        )}
                      </DataTable.Cell>
                      {swapRequest.status !== "PENDING" ? (
                        <DataTable.Cell style={{ flex: 2 }}>
                          {swapRequest.status}
                        </DataTable.Cell>
                      ) : (
                        <DataTable.Cell style={{ flex: 2 }}>
                          <TouchableOpacity onPress={showViewModal}>
                            <MaterialCommunityIcons
                              name="file-eye-outline"
                              size={24}
                              color="black"
                            />
                          </TouchableOpacity>
                        </DataTable.Cell>
                      )}
                    </DataTable.Row>
                  ))}
                </DataTable>
              </View>
            </>
          ) : value === "Employees' Requests" ? (
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
                Employee's Swap Requests
              </Text>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>ID</DataTable.Title>
                  <DataTable.Title style={{ flex: 2 }}>
                    Requestor's Shift
                  </DataTable.Title>
                  <DataTable.Title style={{ flex: 2 }}>
                    Receiver's Shift
                  </DataTable.Title>
                  <DataTable.Title numeric>Actions</DataTable.Title>
                </DataTable.Header>
                {teamSwapRequests.map((swapRequest, index) => (
                  <DataTable.Row key={index}>
                    <ViewRequestModal
                      visible={viewModalVisible}
                      hideModal={hideViewModal}
                      swapRequest={swapRequest}
                      onRefresh={() =>
                        setRetrievingSwapRequests(!retrevingSwapRequests)
                      }
                    />
                    <DataTable.Cell>{swapRequest.swapRequestId}</DataTable.Cell>
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
                    <DataTable.Cell numeric>
                      <TouchableOpacity onPress={showViewModal}>
                        <MaterialCommunityIcons
                          name="file-eye-outline"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </View>
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
                Swap Request History
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
                  <DataTable.Title numeric>Actions</DataTable.Title>
                </DataTable.Header>
                {myCompletedSwapRequests.map((swapRequest, index) => (
                  <DataTable.Row key={index}>
                    <ViewRequestModal
                      visible={viewModalVisible}
                      hideModal={hideViewModal}
                      swapRequest={swapRequest}
                      onRefresh={() =>
                        setRetrievingSwapRequests(!retrevingSwapRequests)
                      }
                      isCompleted
                    />
                    <DeleteRequestModal
                      visible={deleteModalVisible}
                      hideDeleteModal={hideDeleteModal}
                      swapRequestId={swapRequest.swapRequestId}
                      onRefresh={() =>
                        setRetrievingSwapRequests(!retrevingSwapRequests)
                      }
                    />
                    <DataTable.Cell>{swapRequest.swapRequestId}</DataTable.Cell>
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
                    <DataTable.Cell numeric>
                      <TouchableOpacity onPress={showViewModal}>
                        <MaterialCommunityIcons
                          name="file-eye-outline"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          deleteSwapRequestHandler(swapRequest.swapRequestId);
                        }}
                      >
                        <MaterialCommunityIcons
                          name="trash-can-outline"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
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
