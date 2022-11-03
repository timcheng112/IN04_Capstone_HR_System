import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View, Alert, Image,Text } from "react-native";
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
  onRefresh,
  refreshing
}) {
  const [selectedTask, setSelectedTask] = useState([]);
  const [open, setOpen] = useState(false);

  function onClickHandler() {
    console.log(selectedTask)
    selectedTask.map((taskListItem) => (
      api
        .markTaskListItemAsComplete(taskListItem.taskListItemId)
        .then(() => {
          alert("Successfully checked!");
          //refreshKeyHandler();
        })
        .catch((error) => {
          alert(error.response.data.message);
        })));
  }
  const showAlert = () =>
    Alert.alert(
      "Check Tasks",
      "Are you sure you have finished all the selected tasks?",
      [
        {
          text: "Cancel"
        },
        {
          text: "Yes",
          onPress: () => onClickHandler(),
        },
      ]
    );


  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {(taskListItems !== undefined && taskListItems.length === 0) ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require("../../../assets/puddingdog.png")}
          />
          <Text style={{fontSize: 20}}>
            No remaining tasks
          </Text>
        </View>
      ) : (
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
                status={(selectedTask.includes(taskListItem) || taskListItem.isDone) ? "checked" : "unchecked"}
                value={taskListItem.taskListItemId}
                onPress={(e) => {
                  if (e.target.status === "checked" && !taskListItem.isDone) { setSelectedTask([...selectedTask, taskListItem]); e.target.status = "unchecked" }
                  else { setSelectedTask(selectedTask.filter((p) => p !== taskListItem)); e.target.status = "checked" }
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
          </Card>
        )))}
      {taskListItems !== undefined && taskListItems.length !== 0 &&
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
          <Button
            mode="contained"
            color="#ffd700"
            onPress={() => showAlert()}
          >
            Check selected tasks
          </Button>
        </View>}
    </ScrollView>
  );
}

export default TaskList;
