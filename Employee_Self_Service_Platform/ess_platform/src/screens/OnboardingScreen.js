import React, { useEffect, useState } from "react";
import BoardingComponent from "../components/onboarding/BoardingComponent";
import api from "../utils/api";

const OnboardingScreen = () => {
  const [taskListItems, setTaskListItems] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRefreshing(true);
    api
      .getOnboardingTaskListItemsByEmployee(7)
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

export default OnboardingScreen;
