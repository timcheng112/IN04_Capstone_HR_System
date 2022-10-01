import React, { useState } from "react";
import { View } from "react-native";
import { Text, Card, Checkbox, Paragraph, Title } from "react-native-paper";
import ViewTaskModal from "./ViewTaskModal";

function TaskList() {
  const [taskListItems, setTaskListItems] = useState([
    {
      name: "Task 1",
      description: "This is Task 1.",
      category: "IT",
    },
    {
      name: "Task 2",
      description: "This is Task 2.",
      category: "New Hire Paperwork",
    },
    {
      name: "Task 3",
      description: "This is Task 3.",
      category: "Culture Orientation",
    },
  ]);
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View>
      <Text variant="titleLarge">Category 1</Text>
      {/* Render List Items of Task */}
      {taskListItems.map((task) => (
        <Card
          style={{
            borderRadius: 10,
            width: "96%",
            alignSelf: "center",
            margin: "1%",
          }}
          onPress={showModal}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Card.Title title={task.name} subtitle={task.category} />
            <Text>{task.description}</Text>
          </View>
        </Card>
      ))}
      <ViewTaskModal visible={visible} hideModal={hideModal} />
    </View>
  );
}

export default TaskList;
