import { Alert, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Text,
} from "react-native-paper";
import { Appbar } from "react-native-paper";
import { Dialog, Portal } from "react-native-paper";
import HomeScreen from "../../screens/HomeScreen";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../utils/api";
// import CardContent from "react-native-paper/lib/typescript/components/Card/CardContent";

// //go to list of attendance maybe..
// const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const CheckInOut = () => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const [attended, setAttended] = useState(0);
  const [allShifts, setAllShifts] = useState(0);

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

  // TO RETRIEVE LOGGED IN USER
  useEffect(() => {
    if (userId !== null) {
      api
        .getUser(userId)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) =>
          console.log("Error retrieving user with ID: " + userId)
        );
    }
  }, [userId]);

  useEffect(() => {
    if (userId !== null) {
      api
        .getUserAttendedShiftsMonthly(userId)
        .then((response) => {
          console.log("Attendance: " + response.data)
          setAttended(response.data);
        })
        .catch((error) =>
          console.log("Error retrieving attended shifts for user ID: " + userId)
        );

      api
        .getUserShiftItemsMonthly(userId)
        .then((response) => {
          console.log("All Shifts: " + response.data)
          setAllShifts(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [userId]);

  // const checkin = (props) => {
  //     api.checkin(userId).then((response) => {
  //       console.log(response.data);
  //       setChecked(true);
  //     })
  //     .catch((error) =>
  //       console.log("Error checking in with ID: " + userId)
  //     );
  //   }
  // , []};

  function checkin() {
    // console.log("user id " + userId);
    api
      .checkin(userId)
      .then((response) => {
        console.log(response.data);
        setChecked(true);
        alert("You have successfully clocked in.");
      })
      .catch((error) => {
        // console.log("Error checking in with ID: " + userId);
        console.log(error);
        alert("You have no shifts to clock out to.");
      });
  }

  function checkout() {
    // console.log("user id " + userId);

    api
      .checkout(userId)
      .then((response) => {
        console.log(response.data);
        setChecked(false);
        alert("You have successfully clocked out.");
      })
      .catch((error) => {
        // console.log("Error checking out with ID: " + userId);
        console.log(error);
        alert("You have no shifts to clock out to.");
      });
  }

  return (
    // attended &&
    // allShifts && 
    (
      <>
  <Card>
          <Card.Content>
            <Card.Title
              style={{ textAlign: "center", padding: 12 }}
              title="ATTENDANCE"
              subtitle="Monthly overview"
            />
            <Title style={{ textAlign: "center", padding: 12 }}>
              Completed Shifts / Total Shifts
            </Title>

            <Card style={{ backgroundColor: "beige" }}>
              <Title style={{ textAlign: "center", padding: 12 }}>
                Current Progress: {attended} / {allShifts}
              </Title>
            </Card>
          </Card.Content>
        </Card>


        <Card>
          {/* <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        left={LeftContent}
      /> */}
          <Card.Content>
           
            <Card.Title
              style={{ textAlign: "center", padding: 12 }}
              title="CLOCK IN/OUT"
              subtitle="Please clock-in and clock-out at your work place."
            />

          </Card.Content>
          <Card.Cover
            style={{ marginVertical: 24 }}
            source={{
              uri: "https://cdn.stocksnap.io/img-thumbs/960w/home-office_YODJNTOBN9.jpg",
            }}
          />

          <View style={{ flexDirection: "row", margin: 10 }}>
            {!checked ? (
              <View style={{ flex: 1 }}>
                <Button
                  icon="clock"
                  mode="contained"
                  buttonColor="blue"
                  onPress={() => {
                    // actionCheckIn()
                    console.log("Clock-in");
                    checkin();
                  }}
                >
                  Check in
                </Button>
              </View>
            ) : (
              <Text></Text>
            )}

            {checked ? (
              <View style={{ flex: 10 }}>
                <Button
                  icon="clock"
                  mode="contained"
                  onPress={() => {
                    console.log("Clock-out");
                    checkout();
                  }}
                >
                  Check out
                </Button>
              </View>
            ) : (
              <Text> </Text>
            )}
          </View>
        </Card>

        
      </>
    )
  );
};

export default CheckInOut;
