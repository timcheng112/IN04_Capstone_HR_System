import React, { useState } from "react";
import { View } from "react-native";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Paragraph,
  Title,
} from "react-native-paper";

function TaskList({ taskListItems, showModal, setTask }) {
  console.log(taskListItems);
  // const [taskListItems, setTaskListItems] = useState([
  //   {
  //     id: 1,
  //     name: "Task 1",
  //     description: "This is Task 1.",
  //     category: "IT",
  //   },
  //   {
  //     id: 2,
  //     name: "Task 2",
  //     description: "This is Task 2.",
  //     category: "New Hire Paperwork",
  //   },
  //   {
  //     id: 3,
  //     name: "Task 3",
  //     description: "This is Task 3.",
  //     category: "Culture Orientation",
  //   },
  // ]);
  const [checked, setChecked] = useState(false);
  const [selectedTaskListItem, setSelectedTaskListItem] = useState([]);

  function onClickHandler(taskListItem) {
    setTaskListItems(
      taskListItems.filter((item) => item.name !== taskListItem.name)
    );
  }

  return (
    <View>
      {/* Render List Items of Task */}
      {taskListItems !== undefined &&
        taskListItems.map((taskListItem, index) => (
          <Card
            style={{
              borderRadius: 10,
              width: "96%",
              alignSelf: "center",
              margin: "1%",
            }}
            onPress={() => {
              showModal();
              setTaskListItem(taskListItem);
            }}
            key={index}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox
                status={
                  selectedTaskListItem.includes(taskListItem)
                    ? "checked"
                    : "unchecked"
                }
                value={taskListItem.task.taskName}
                onPress={() => {
                  !selectedTaskListItem.includes(taskListItem)
                    ? setSelectedTaskListItem([
                        ...selectedTaskListItem,
                        taskListItem,
                      ])
                    : console.log("Task List Item already checked");
                }}
                disabled={selectedTaskListItem.includes(taskListItem)}
              />
              <View style={{ padding: 10 }}>
                <Title>{taskListItem.task.name}</Title>
                <Badge
                  style={{ paddingHorizontal: 10, alignSelf: "flex-start" }}
                >
                  {taskListItem.task.category.name}
                </Badge>
              </View>
            </View>
            {selectedTaskListItem.includes(taskListItem) && (
              <Button
                mode="contained"
                style={{ margin: 10 }}
                onPress={(e) => {
                  e.stopPropagation();
                  onClickHandler(taskListItem);
                }}
              >
                Clear
              </Button>
            )}
          </Card>
        ))}
    </View>
  );
}

export default TaskList;
