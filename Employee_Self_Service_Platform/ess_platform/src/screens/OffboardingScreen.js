import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import BoardingComponent from "../components/onboarding/BoardingComponent";
import api from "../utils/api";
// import OnboardingComponent from "../components/onboarding/OnboardingComponent";

const OffboardingScreen = () => {
  const [taskListItems, setTaskListItems] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRefreshing(true);
    api
      .getOffboardingTaskListItemsByEmployee(7)
      .then((response) => {
        setTaskListItems(response.data);
        setRefreshing(false);
        console.log("Successfully fetched task list items");
      })
      .catch(() => console.log("Error trying to fetch task list items"));
  }, [refreshKey]);

  return (
    <BoardingComponent
      taskListItems={taskListItems}
      setTaskListItems={setTaskListItems}
      refreshKeyHandler={() => setRefreshKey((oldKey) => oldKey + 1)}
      refreshing={refreshing}
    />
  );
};

export default OffboardingScreen;
