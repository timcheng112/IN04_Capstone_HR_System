import React, { useEffect, useState } from "react";
import BoardingComponent from "../components/onboarding/BoardingComponent";
import api from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnboardingScreen = () => {
  const [taskListItems, setTaskListItems] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const setId = async () => {
      try {
        const response = await AsyncStorage.getItem("userId");
        setUserId(response);
      } catch (err) {
        console.warn(err);
      };
    }
    setId();
   }, []);

  // useEffect(() => {
  //   setRefreshing(true);
  //   api
  //     .getOnboardingTaskListItemsByEmployee(7)
  //     .then((response) => {
  //       setTaskListItems(response.data);
  //       setRefreshing(false);
  //       console.log("Successfully fetched task list items");
  //     })
  //     .catch(() => console.log("Error trying to fetch task list items"));
  // }, [refreshKey]);

  return (
    userId  &&
    <BoardingComponent
      // taskListItems={taskListItems}
      // setTaskListItems={setTaskListItems}
      //refreshKeyHandler={() => setRefreshKey((oldKey) => oldKey + 1)}
      // refreshing={refreshing}
      userId = {userId}
    />
  );
};

export default OnboardingScreen;
