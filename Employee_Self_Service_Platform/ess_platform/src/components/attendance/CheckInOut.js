import { Alert, View } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { Dialog, Portal } from "react-native-paper";
import HomeScreen from "../../screens/HomeScreen";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../utils/api";

// //go to list of attendance maybe..
// const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const CheckInOut = () => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

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
    console.log("user id " + userId);
    api
      .checkin(userId)
      .then((response) => {
        console.log(response.data);
        setChecked(true);
        alert("You have successfully checked in.");
      })
      .catch((error) => {
        console.log("Error checking in with ID: " + userId);
        console.log(error);
        alert("You have no shifts to clock in to.")
      });
  }

  function checkout() {
    console.log("user id " + userId);
    api
      .checkout(userId)
      .then((response) => {
        console.log(response.data);
        setChecked(false);
        alert("You have successfully clocked out.");
      })
      .catch((error) => {
        console.log("Error checking out with ID: " + userId);
        console.log(error);
        alert("You have no shifts to clock out to.")
      });
  }

  

  return (
    <Card>
      {/* <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        left={LeftContent}
      /> */}
      <Card.Content>
        <Title style={{ textAlign: "center", padding: 12 }}>CLOCK IN/OUT</Title>

        <Paragraph>Please clock-in and clock-out at your work place if your nfc is not working.</Paragraph>
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
          ""
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
          ""
        )}
      </View>
    </Card>
  );
};

// const dialog = () => {
//   const [visible, setVisible] = React.useState(false);

//   const hideDialog = () => setVisible(false);

//   return (
//     <Portal>
//       <Dialog visible={visible} onDismiss={hideDialog}>
//         <Dialog.Actions>
//           <Button onPress={() => console.log("Cancel")}>Cancel</Button>
//           <Button onPress={() => console.log("Ok")}>Confirm</Button>
//         </Dialog.Actions>
//       </Dialog>
//     </Portal>
//   );
// };

// const actionCheckIn = (props) => (
//   <Card.Actions>
//     <Button>Cancel</Button>
//     <Button>Ok</Button>
//   </Card.Actions>
// );

// const CheckInOut = () => {
//   const [userId, setUserId] = useState(null);
//   <>

//     {  useEffect(() => {

//     const setId = async () => {
//       try {
//         const response = await AsyncStorage.getItem("userId");
//         setUserId(response);
//       } catch (err) {
//         console.warn(err);
//       }
//     };
//     setId();
//   }, []);

//   }

//     <Card>
//       {/* <Card.Title
//         title="Card Title"
//         subtitle="Card Subtitle"
//         left={LeftContent}
//       /> */}
//       <Card.Content>
//         <Title style={{ textAlign: "center", padding: 12 }}>CHECK IN/OUT</Title>

//         <Paragraph>Please check-in and out at your work place.</Paragraph>
//       </Card.Content>
//       <Card.Cover
//         style={{ marginVertical: 24 }}
//         source={{
//           uri: "https://cdn.stocksnap.io/img-thumbs/960w/home-office_YODJNTOBN9.jpg",
//         }}
//       />

//       <View style={{ flexDirection: "row", margin: 10 }}>
//         <View style={{ flex: 1 }}>
//           <Button
//             icon="clock"
//             mode="contained"
//             buttonColor="blue"
//             onPress={() => {
//               // actionCheckIn()
//               console.log("Clock-in");

//             }}
//           >
//             Check in
//           </Button>
//         </View>
//         <View style={{ flex: 1 }}>
//           <Button
//             icon="clock"
//             mode="outlined"
//             onPress={() => console.log("Clock-out")}
//           >
//             Check out
//           </Button>
//         </View>
//       </View>
//     </Card>
//   </>
// };

export default CheckInOut;
