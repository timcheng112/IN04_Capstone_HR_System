import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Paragraph,
  Title,
} from "react-native-paper";
import api from "../../utils/api";

function TaskList({
  taskListItems,
  showModal,
  setTaskListItem,
  refreshKeyHandler,
  refreshing,
}) {
  function onClickHandler(taskListItem) {
    api
      .markTaskListItemAsComplete(taskListItem.taskListItemId)
      .then(() => {
        console.log("Successfully checked!");
        refreshKeyHandler();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  function deleteTaskListItem(taskListItemId) {
    api
      .deleteTaskListItem(taskListItemId)
      .then(() => {
        alert("Successfully deleted!");
        refreshKeyHandler();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshKeyHandler} />
      }
    >
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
                status={taskListItem.isDone ? "checked" : "unchecked"}
                value={taskListItem.task.taskName}
                onPress={() => {
                  !taskListItem.isDone
                    ? onClickHandler(taskListItem)
                    : console.log("Task List Item already checked");
                }}
                disabled={taskListItem.isDone}
              />
              <View style={{ padding: 10 }}>
                <Title
                  style={
                    taskListItem.isDone && {
                      textDecorationStyle: "solid",
                      textDecorationLine: "line-through",
                    }
                  }
                >
                  {taskListItem.task.name}
                </Title>
                <Badge
                  style={{ paddingHorizontal: 10, alignSelf: "flex-start" }}
                >
                  {taskListItem.task.category.name}
                </Badge>
              </View>
            </View>
            {taskListItem.isDone && (
              <Button
                mode="contained"
                style={{ margin: 10 }}
                onPress={() => {
                  deleteTaskListItem(taskListItem.taskListItemId);
                }}
              >
                Clear
              </Button>
            )}
          </Card>
        ))}
    </ScrollView>
  );
}

export default TaskList;
