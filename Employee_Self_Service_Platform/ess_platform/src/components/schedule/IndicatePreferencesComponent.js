import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addMonths,
  endOfMonth,
  format,
  getMonth,
  getYear,
  startOfMonth,
} from "date-fns";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Button, Card, Text } from "react-native-paper";
import api from "../../utils/api";

const IndicatePreferencesComponent = () => {
  const currDate = new Date();
  const initialDate = startOfMonth(addMonths(currDate, 1));
  //   const initialDate = new Date(getYear(currDate), getMonth(currDate) + 1, 1);
  const [selectedDates, setSelectedDates] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    console.log(selectedDates);
  }, [selectedDates]);

  const removeKey = (day) => {
    if (selectedDates[day.dateString].dots) {
      setSelectedDates((current) => {
        const copy = { ...current };
        copy[day.dateString].selected = false;
        return copy;
      });
    } else {
      setSelectedDates((current) => {
        // 👇️ create copy of state object
        const copy = { ...current };

        // 👇️ remove salary key from object
        delete copy[day.dateString];
        return copy;
      });
    }
  };

  useEffect(() => {
    const setId = async () => {
      try {
        const response = await AsyncStorage.getItem("userId");
        setUserId(response);
      } catch (err) {
        console.warn(err);
      }
    };
    setId();
  }, []);

  useEffect(() => {
    if (userId !== null) {
      setSelectedDates({});
      api.getPreferredDatesByUserId(userId).then((response) => {
        console.log("User's Preferred Dates: " + response.data);
        let preferredDates = {};
        for (let i = 0; i < response.data.dates.length; i++) {
          preferredDates[response.data.dates[i]] = {
            selected: true,
            selectedColor: "#171717",
            // selectedColor: "pink",
            marked: true,
            dots: [{ color: "#FBB344" }, { color: "#13AEBD" }],
          };
        }
        setSelectedDates({ ...preferredDates });
      });
    }
  }, [userId, showCalendar]);

  const submitHandler = () => {
    const asArray = Object.entries(selectedDates);
    const filtered = asArray.filter(([key, value]) => value.selected === true);
    const filteredSelectedDates = Object.fromEntries(filtered);
    const keys = Object.keys(filteredSelectedDates);
    console.log("KEYS: " + keys);
    api
      .editPreferredDates(userId, { dates: keys })
      .then((response) => {
        setSelectedDates({});
        setShowCalendar(!showCalendar);
        alert("Successfully indicated preferred dates!");
      })
      .catch((err) => console.log("Error in indicating preferred dates!"));
  };

  return (
    <View style={{ flex: 1 }}>
      <Card style={{ flex: 1, margin: "4%", borderRadius: 20 }}>
        <Text style={{marginTop: 5, marginLeft: "5%"}}>Legend</Text>
        <Card.Content
          style={{
            flex: 1,
            flexDirection: "row",
            // justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Card.Cover
            source={require("../../../assets/helptip3.png")}
            style={{ width: 30, height: 30, marginRight: 5 }}
            resizeMode="center"
          />
          <Text>Selected</Text>
        </Card.Content>
        <Card.Content
          style={{
            flex: 1,
            flexDirection: "row",
            // justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Card.Cover
            source={require("../../../assets/helptip4.png")}
            style={{ width: 30, height: 30, marginRight: 5 }}
          />
          <Text>Unselected</Text>
        </Card.Content>
        <Card.Content
          style={{
            flex: 1,
            flexDirection: "row",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card.Cover
            source={require("../../../assets/helptip.png")}
            style={{ width: 30, height: 30, marginRight: 5 }}
          />
          <Text>Submitted + Selected</Text>
        </Card.Content>
        <Card.Content
          style={{
            flex: 1,
            flexDirection: "row",
            // justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Card.Cover
            source={require("../../../assets/helptip2.png")}
            style={{ width: 30, height: 30, marginRight: 5 }}
          />
          <Text>Submitted + Unselected</Text>
        </Card.Content>
      </Card>
      <Calendar
        style={{
          margin: "4%",
          padding: "2%",
          borderRadius: 20,
          elevation: 10,
          shadowColor: "indigo",
        }}
        initialDate={format(initialDate, "yyyy-MM-dd")}
        minDate={format(initialDate, "yyyy-MM-dd")}
        maxDate={format(endOfMonth(initialDate), "yyyy-MM-dd")}
        onDayPress={(day) => {
          if (!selectedDates.hasOwnProperty(day.dateString)) {
            setSelectedDates({
              ...selectedDates,
              [day.dateString]: { selected: true, selectedColor: "#171717" },
            });
          } else if (!selectedDates[day.dateString].selected) {
            setSelectedDates((current) => {
              const copy = { ...current };
              copy[day.dateString].selected = true;
              return copy;
            });
          } else {
            removeKey(day);
          }
        }}
        markingType={"multi-dot"}
        markedDates={selectedDates}
        disableArrowLeft
        disableArrowRight
      />
      <Button
        onPress={submitHandler}
        style={{
          borderRadius: 20,
          margin: "4%",
          padding: "2%",
          backgroundColor: "#4f46e5",
        }}
        mode="contained"
      >
        Submit Preferences
      </Button>
    </View>
  );
};

export default IndicatePreferencesComponent;
