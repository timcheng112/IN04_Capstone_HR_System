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

function TaskList({ showModal, setTask }) {
  const [taskListItems, setTaskListItems] = useState([
    {
      id: 1,
      name: "Task 1",
      description: "This is Task 1.",
      category: "IT",
    },
    {
      id: 2,
      name: "Task 2",
      description: "This is Task 2.",
      category: "New Hire Paperwork",
    },
    {
      id: 3,
      name: "Task 3",
      description: "This is Task 3.",
      category: "Culture Orientation",
    },
  ]);
  const [checked, setChecked] = useState(false);
  const [selectedTask, setSelectedTask] = useState([]);

  function onClickHandler(taskListItem) {
    setTaskListItems(
      taskListItems.filter((item) => item.name !== taskListItem.name)
    );
  }

  return (
    <View>
      {/* Render List Items of Task */}
      {taskListItems.map((task, index) => (
        <Card
          style={{
            borderRadius: 10,
            width: "96%",
            alignSelf: "center",
            margin: "1%",
          }}
          onPress={() => {
            showModal();
            setTask(task);
          }}
          key={index}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              status={selectedTask.includes(task) ? "checked" : "unchecked"}
              value={task.name}
              onPress={() => {
                !selectedTask.includes(task)
                  ? setSelectedTask([...selectedTask, task])
                  : console.log("Task already checked");
              }}
              disabled={selectedTask.includes(task)}
            />
            <View style={{ padding: 10 }}>
              <Title>{task.name}</Title>
              <Badge style={{ paddingHorizontal: 10, alignSelf: "flex-start" }}>
                {task.category}
              </Badge>
            </View>
          </View>
          {selectedTask.includes(task) && (
            <Button
              mode="contained"
              style={{ margin: 10 }}
              onPress={(e) => {
                e.stopPropagation();
                onClickHandler(task);
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
