import React, { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, StatusBar } from "react-native";
import { Text, Title } from "react-native-paper";
import TabNavigator from "../../navigation/TabNavigator";
import api from "../../utils/api";
import TaskList from "./TaskList";
import ViewTaskModal from "./ViewTaskModal";
import axios from "axios";

function OffboardingComponent({userId}) {
  const [taskListItem, setTaskListItem] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(true);
  const [visible, setVisible] = useState(false);
  const [taskListItems, setTaskListItems] = useState([]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const getOffboardingTasks = () =>{
    api
      .getOffboardingTaskListItemsByEmployee(userId)
      .then((response) => {
        setRefreshing(false);
        setTaskListItems(response.data);
        console.log("Successfully fetched task list items");
      })
      .catch(() => console.log("Error trying to fetch task list items"));
  }

  useEffect(() => {
    getOffboardingTasks();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TaskList
        taskListItems={taskListItems}
        showModal={showModal}
        setTaskListItem={setTaskListItem}
        onRefresh={getOffboardingTasks}
        refreshing={refreshing}
      />
      <ViewTaskModal
        visible={visible}
        hideModal={hideModal}
        taskListItem={taskListItem !== null ? taskListItem : null}
      />
    </SafeAreaView>
  );
}

export default OffboardingComponent;
