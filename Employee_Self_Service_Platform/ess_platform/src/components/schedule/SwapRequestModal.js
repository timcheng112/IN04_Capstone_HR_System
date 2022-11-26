import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import api from "../../utils/api";

const SwapRequestModal = ({
  visible,
  hideModal,
  users,
  shiftListItems,
  user,
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedMyShiftListItem, setSelectedMyShiftListItem] = useState(null);
  const [selectedEmployeeShiftListItem, setSelectedEmployeeShiftListItem] =
    useState(null);
  const [reason, setReason] = useState("");
  const [filteredShiftListItems, setFilteredShiftListItems] = useState([]);

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    height: 400,
    width: "80%",
    alignSelf: "center",
    borderRadius: 20,
  };

  useEffect(() => {
    setSelectedMyShiftListItem(null);
    setSelectedEmployeeShiftListItem(null);
    setSelectedEmployee(null);
    setFilteredShiftListItems([]);
    setReason("");
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
      .addNewSwapRequest(
        reason,
        selectedEmployeeShiftListItem,
        selectedMyShiftListItem
      )
      .then((response) => {
        alert("Successfully applied for swap!");
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
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Poppins_600SemiBold",
            color: "#4f46e5",
            fontSize: 18,
          }}
        >
          Swap Request Application
        </Text>
        <View
          style={{
            backgroundColor: "white",
            elevation: 10,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => setSelectedMyShiftListItem(value)}
            items={shiftListItems
              .filter((item) => item.user.userId === user.userId)
              .map((item) => ({
                label:
                  item.shift.shiftTitle +
                  " " +
                  item.shift.startTime.slice(0, 10),
                value: item.shiftListItemId,
              }))}
            placeholder={{
              label: "Select my shift to swap...",
              color: "#9EA0A4",
              value: null,
            }}
          />
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
              onValueChange={(value) => setSelectedEmployeeShiftListItem(value)}
              items={filteredShiftListItems}
              placeholder={{
                label: "Select employee's shift...",
                color: "#9EA0A4",
                value: null,
              }}
            />
          </View>
        )}
        <TextInput
          mode="flat"
          label="Reason"
          onChangeText={(text) => setReason(text)}
        />
        <Button
          mode="contained"
          style={{ marginTop: "5%", borderRadius: 10 }}
          disabled={
            !selectedMyShiftListItem ||
            !selectedEmployee ||
            !selectedEmployeeShiftListItem ||
            reason === ""
          }
          onPress={submitHandler}
        >
          Submit
        </Button>
      </Modal>
    </Portal>
  );
};

export default SwapRequestModal;
