import React from "react";
import { View } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";
import api from "../../utils/api";

const DeleteRequestModal = ({ visible, hideDeleteModal, swapRequestId }) => {
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    height: 200,
    width: "80%",
    alignSelf: "center",
    borderRadius: 20,
  };

  const submitHandler = () => {
    api
      .deleteSwapRequestById(swapRequestId)
      .then((response) => {
        alert(
          "Successfully deleted Swap Request with ID: " + swapRequestId + "!"
        );
        hideDeleteModal();
      })
      .catch((err) => {
        alert("Error in deleting Swap Request with ID: " + swapRequestId + "!");
      });
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideDeleteModal}
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
          Delete Swap Request
        </Text>
        <Text
          style={{
            textAlign: "center",
            // fontFamily: "Poppins_400Regular",
            color: "grey",
            fontSize: 18,
          }}
        >
          Are you sure you want to delete swap request with ID {swapRequestId}?
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Button
            mode="contained"
            style={{ marginRight: 5, borderRadius: 10 }}
            onPress={submitHandler}
          >
            Delete
          </Button>
          <Button
            mode="outlined"
            style={{ marginLeft: 5, borderWidth: 1, borderRadius: 10 }}
            onPress={hideDeleteModal}
          >
            Cancel
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default DeleteRequestModal;
