import * as React from "react";
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  Title,
  Badge,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

const ViewTaskModal = ({ visible, hideModal, taskListItem }) => {
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 8,
    elevation: 20,
    bottom: "10%",
  };

  return (
    <Provider>
      <Portal>
        {taskListItem !== null && (
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Badge style={{ fontWeight: "bold", paddingHorizontal: 20 }}>
                {taskListItem.task.category.name}
              </Badge>
              <TouchableOpacity onPress={hideModal}>
                <Ionicons
                  name="ios-close-outline"
                  size={24}
                  color={"#111111"}
                />
              </TouchableOpacity>
            </View>
            <Title>{taskListItem.task.name}</Title>
            <Text>{taskListItem.task.description}</Text>
          </Modal>
        )}
      </Portal>
    </Provider>
  );
};

export default ViewTaskModal;
