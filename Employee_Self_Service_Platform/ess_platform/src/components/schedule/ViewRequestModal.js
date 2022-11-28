import React, { useState } from "react";
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
import api from "../../utils/api";

const ViewRequestModal = ({
  visible,
  hideModal,
  swapRequest,
  onRefresh,
  isCompleted,
  isPending,
}) => {
  const containerStyle = {
    backgroundColor: "white",
    // padding: 20,
    height: "100%",
    width: "85%",
    bottom: 10,
    alignSelf: "center",
    borderRadius: 20,
  };

  const [responseReason, setResponseReason] = useState("");

  const approveHandler = () => {
    if (isPending) {
      api
        .approvePendingSwapRequest(swapRequest.swapRequestId, responseReason)
        .then((response) => {
          alert(
            "Sucessfully approved pending Swap Request with ID: " +
              swapRequest.swapRequestId +
              "!"
          );
          onRefresh();
          hideModal();
        })
        .catch((error) =>
          alert(
            "Error in approving pending Swap Request with ID: " +
              swapRequest.swapRequestId +
              "!"
          )
        );
    } else {
      api
        .approveSwapRequest(swapRequest.swapRequestId, responseReason)
        .then((response) => {
          alert(
            "Sucessfully approved Swap Request with ID: " +
              swapRequest.swapRequestId +
              "!"
          );
          onRefresh();
          hideModal();
        })
        .catch((error) =>
          alert(
            "Error in approving Swap Request with ID: " +
              swapRequest.swapRequestId +
              "!"
          )
        );
    }
  };

  const rejectHandler = () => {
    api
      .rejectSwapRequest(swapRequest.swapRequestId, responseReason)
      .then((response) => {
        alert(
          "Sucessfully rejected Swap Request with ID: " +
            swapRequest.swapRequestId +
            "!"
        );
        onRefresh();
        hideModal();
      })
      .catch((error) =>
        alert(
          "Error in rejecting Swap Request with ID: " +
            swapRequest.swapRequestId +
            "!"
        )
      );
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
            {isCompleted ? "Viewing" : "Reviewing"} Swap Request
          </Text>
          <Text style={{ fontFamily: "Poppins_500Medium" }}>
            ID: {swapRequest.swapRequestId}
          </Text>
          <View style={{ marginBottom: "4%" }}>
            <Text style={{ fontFamily: "Poppins_500Medium" }}>Requestor:</Text>
            <Card style={{ elevation: 10, borderRadius: 10, marginTop: "2%" }}>
              <Card.Title
                title={
                  swapRequest.requestor.firstName +
                  " " +
                  swapRequest.requestor.lastName
                }
                titleStyle={{ fontFamily: "Poppins_500Medium", fontSize: 14 }}
                subtitle={swapRequest.requestorShiftListItem.shift.shiftTitle}
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
                  {swapRequest.requestorShiftListItem.shift.startTime.slice(
                    0,
                    16
                  )}
                </Text>
                <Text
                  style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}
                >
                  End Time:{" "}
                  {swapRequest.requestorShiftListItem.shift.endTime.slice(
                    0,
                    16
                  )}
                </Text>
              </Card.Content>
            </Card>
          </View>
          <View style={{ marginBottom: "4%" }}>
            <Text style={{ fontFamily: "Poppins_500Medium" }}>Receiver:</Text>
            <Card style={{ elevation: 10, borderRadius: 10, marginTop: "2%" }}>
              <Card.Title
                title={
                  swapRequest.receiver.firstName +
                  " " +
                  swapRequest.receiver.lastName
                }
                titleStyle={{ fontFamily: "Poppins_500Medium", fontSize: 14 }}
                subtitle={swapRequest.receiverShiftListItem.shift.shiftTitle}
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
                  {swapRequest.receiverShiftListItem.shift.startTime.slice(
                    0,
                    16
                  )}
                </Text>
                <Text
                  style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}
                >
                  End Time:{" "}
                  {swapRequest.receiverShiftListItem.shift.endTime.slice(0, 16)}
                </Text>
              </Card.Content>
            </Card>
          </View>
          <View style={{ marginBottom: "4%" }}>
            <Text style={{ fontFamily: "Poppins_500Medium" }}>Reason:</Text>
            <Card style={{ elevation: 10, borderRadius: 10, marginTop: "2%" }}>
              <Card.Content>
                <Paragraph
                  style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}
                >
                  {swapRequest.reason}
                </Paragraph>
              </Card.Content>
            </Card>
          </View>
          {!isCompleted && (
            <TextInput
              label="Response"
              onChangeText={(text) => setResponseReason(text)}
            />
          )}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            {isCompleted && (
              <Button
                mode="outlined"
                style={{
                  marginRight: 5,
                  borderRadius: 10,
                  borderWidth: 1,
                }}
                onPress={hideModal}
              >
                Close
              </Button>
            )}
            {!isCompleted && (
              <Button
                mode="contained"
                style={{
                  marginRight: 5,
                  borderRadius: 10,
                  backgroundColor: "#16a34a",
                }}
                onPress={approveHandler}
              >
                Approve
              </Button>
            )}
            {!isCompleted && (
              <Button
                mode="contained"
                style={{
                  marginLeft: 5,
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: "#dc2626",
                }}
                onPress={rejectHandler}
              >
                Reject
              </Button>
            )}
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default ViewRequestModal;
