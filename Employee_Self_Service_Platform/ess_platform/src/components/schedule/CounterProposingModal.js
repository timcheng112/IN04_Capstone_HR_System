import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import {
  Button,
  Card,
  Modal,
  Paragraph,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import api from "../../utils/api";

const CounterProposingModal = ({
  visible,
  hideModal,
  users,
  shiftListItems,
  user,
  onRefresh,
  counterProposingSwapRequest,
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployeeShiftListItem, setSelectedEmployeeShiftListItem] =
    useState(null);
  const [filteredShiftListItems, setFilteredShiftListItems] = useState([]);

  const containerStyle = {
    backgroundColor: "white",
    // padding: 20,
    height: 400,
    width: "80%",
    alignSelf: "center",
    borderRadius: 20,
  };

  useEffect(() => {
    setSelectedEmployeeShiftListItem(null);
    setSelectedEmployee(null);
    setFilteredShiftListItems([]);
  }, [visible]);

  useEffect(() => {
    if (selectedEmployee !== null && shiftListItems !== null) {
      setFilteredShiftListItems(
        shiftListItems
          .filter((item) => item.user.userId === selectedEmployee)
          .map((item) => ({
            label:
              item.shift.shiftTitle + " " + item.shift.startTime.slice(0, 10),
            value: item.shiftListItemId,
          }))
      );
    }
  }, [selectedEmployee]);

  const submitHandler = () => {
    api
      .counterProposeSwapRequest(
        counterProposingSwapRequest.reason,
        counterProposingSwapRequest.swapRequestId,
        counterProposingSwapRequest.receiverShiftListItem.shiftListItemId,
        counterProposingSwapRequest.requestorShiftListItem.shiftListItemId
      )
      .then((response) => {
        alert("Successfully applied for swap!");
        onRefresh();
        hideModal();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Poppins_600SemiBold",
              color: "#4f46e5",
              fontSize: 18,
            }}
          >
            Counter Proposing Swap
          </Text>
          <View style={{ marginBottom: "4%" }}>
            <Text style={{ fontFamily: "Poppins_500Medium" }}>Requestor:</Text>
            <Card style={{ elevation: 10, borderRadius: 10, marginTop: "2%" }}>
              <Card.Title
                title={
                  counterProposingSwapRequest.requestor.firstName +
                  " " +
                  counterProposingSwapRequest.requestor.lastName
                }
                titleStyle={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 14,
                }}
                subtitle={
                  counterProposingSwapRequest.requestorShiftListItem.shift
                    .shiftTitle
                }
                subtitleStyle={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 12,
                }}
              />
              <Card.Content>
                <Text
                  style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}
                >
                  Start Time:{" "}
                  {counterProposingSwapRequest.requestorShiftListItem.shift.startTime.slice(
                    0,
                    16
                  )}
                </Text>
                <Text
                  style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}
                >
                  End Time:{" "}
                  {counterProposingSwapRequest.requestorShiftListItem.shift.endTime.slice(
                    0,
                    16
                  )}
                </Text>
              </Card.Content>
            </Card>
          </View>
          <View
            style={{
              backgroundColor: "white",
              elevation: 10,
              borderRadius: 10,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <RNPickerSelect
              onValueChange={(value) => {
                setSelectedEmployee(value);
                value === null && setSelectedEmployeeShiftListItem(value);
              }}
              items={
                users
                  ? users
                      .filter(
                        (filteredUser) => filteredUser.userId !== user.userId
                      )
                      .map((user) => ({
                        label: user.firstName + " " + user.lastName,
                        value: user.userId,
                      }))
                  : []
              }
              placeholder={{
                label: "Select an employee...",
                color: "#9EA0A4",
                value: null,
              }}
            />
          </View>
          {selectedEmployee && (
            <View
              style={{
                backgroundColor: "white",
                elevation: 10,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <RNPickerSelect
                onValueChange={(value) =>
                  setSelectedEmployeeShiftListItem(value)
                }
                items={filteredShiftListItems}
                placeholder={{
                  label: "Select employee's shift...",
                  color: "#9EA0A4",
                  value: null,
                }}
              />
            </View>
          )}
          <View style={{ marginBottom: "4%" }}>
            <Text style={{ fontFamily: "Poppins_500Medium" }}>Reason:</Text>
            <Card style={{ elevation: 10, borderRadius: 10, marginTop: "2%" }}>
              <Card.Content>
                <Paragraph
                  style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}
                >
                  {counterProposingSwapRequest.reason}
                </Paragraph>
              </Card.Content>
            </Card>
          </View>
          <Button
            mode="contained"
            style={{ marginTop: "5%", borderRadius: 10 }}
            disabled={!selectedEmployee || !selectedEmployeeShiftListItem}
            onPress={submitHandler}
          >
            Submit
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default CounterProposingModal;
