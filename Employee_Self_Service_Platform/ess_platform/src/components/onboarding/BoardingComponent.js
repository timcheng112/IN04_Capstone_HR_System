import React, { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, StatusBar } from "react-native";
import { Text, Title } from "react-native-paper";
import TabNavigator from "../../navigation/TabNavigator";
import api from "../../utils/api";
import TaskList from "./TaskList";
import ViewTaskModal from "./ViewTaskModal";
import axios from "axios";

function BoardingComponent({
  taskListItems,
  setTaskListItems,
  refreshKeyHandler,
  refreshing,
}) {
  const [taskListItem, setTaskListItem] = useState(null);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // function getOnboardingTaskListItemsByEmployee() {}

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TaskList
        taskListItems={taskListItems}
        showModal={showModal}
        setTaskListItem={setTaskListItem}
        refreshKeyHandler={refreshKeyHandler}
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

export default BoardingComponent;
