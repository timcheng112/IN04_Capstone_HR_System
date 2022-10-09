import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { Text, Title } from "react-native-paper";
import TabNavigator from "../../navigation/TabNavigator";
import api from "../../utils/api";
import TaskList from "./TaskList";
import ViewTaskModal from "./ViewTaskModal";
import axios from "axios";

function OnboardingComponent() {
  const [task, setTask] = useState(null);
  const [taskListItems, setTaskListItems] = useState();
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    api
      .getOnboardingTaskListItemsByEmployee(7)
      .then((response) => {
        setTaskListItems(response.data);
        console.log("Successfully fetched task list items");
      })
      .catch(() => console.log("Error trying to fetch task list items"));
  }, []);
  // function getOnboardingTaskListItemsByEmployee() {}

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TaskList
        taskListItems={taskListItems}
        setTask={setTask}
        showModal={showModal}
      />
      <ViewTaskModal
        visible={visible}
        hideModal={hideModal}
        task={task !== null ? task : null}
      />
    </SafeAreaView>
  );
}

export default OnboardingComponent;
