import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { Text, Title } from "react-native-paper";
import TabNavigator from "../../navigation/TabNavigator";
import TaskList from "./TaskList";
import ViewTaskModal from "./ViewTaskModal";

function OnboardingComponent() {
  const [task, setTask] = useState(null);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TaskList setTask={setTask} showModal={showModal} />
      <ViewTaskModal
        visible={visible}
        hideModal={hideModal}
        task={task !== null ? task : null}
      />
    </SafeAreaView>
  );
}

export default OnboardingComponent;
