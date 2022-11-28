import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Badge, Drawer, List, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../login/Context";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../utils/api";

const DrawerContent = (props) => {
  const { signOut } = React.useContext(AuthContext);
  const { state } = props;
  const { routes, index } = state;
  const focusedRoute = routes[index].name;
  const [openDropdown, setOpenDropdown] = useState(false);
  const [numRequests, setNumRequests] = useState(null);
  const [userId, setUserId] = useState(null);

  // TO RETRIEVE LOGGED IN USER's ID
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
      api
        .getNumberOfPendingIncomingSwapRequestsByUser(userId)
        .then((response) => setNumRequests(response.data))
        .catch((error) =>
          console.log("Error retrieving pending incoming swap requests")
        );
    }
  });

  return (
    <View
      style={{
        flex: 1,
        elevation: 16,
        backgroundColor: "#ffffff",
      }}
    >
      <DrawerContentScrollView {...props}>
        <View style={{ flex: 1, elevation: 16 }}>
          <Drawer.Section
            style={{
              borderBottomColor: "#f4f4f4",
              borderBottomWidth: 1,
            }}
          >
            <Drawer.Item label="Scheduling"></Drawer.Item>
          </Drawer.Section>
          <Drawer.Section {...props} style={{ marginTop: 15 }}>
            <Drawer.Item
              {...props}
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="calendar-account-outline"
                  size={size}
                  color={focusedRoute === "Leave" ? "black" : color}
                />
              )}
              style={
                focusedRoute === "My Schedule" && {
                  backgroundColor: "#c4b5fd",
                  borderRadius: 20,
                }
              }
              labelStyle={focusedRoute === "My Schedule" && { color: "black" }}
              label="My Schedule"
              onPress={() => {
                props.navigation.navigate("My Schedule");
              }}
            />
            <Drawer.Item
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  size={size}
                  color={focusedRoute === "Leave" ? "black" : color}
                />
              )}
              style={
                focusedRoute === "Indicate Preferences" && {
                  backgroundColor: "#c4b5fd",
                  borderRadius: 20,
                }
              }
              labelStyle={
                focusedRoute === "Indicate Preferences" && { color: "black" }
              }
              label="Indicate Preferences"
              onPress={() => {
                props.navigation.navigate("Indicate Preferences");
              }}
            />
            <Drawer.Item
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="swap-horizontal"
                  size={size}
                  color={focusedRoute === "Leave" ? "black" : color}
                />
              )}
              style={
                focusedRoute === "Swap Request" && {
                  backgroundColor: "#c4b5fd",
                  borderRadius: 20,
                }
              }
              labelStyle={focusedRoute === "Swap Request" && { color: "black" }}
              label="Swap Request"
              onPress={() => {
                props.navigation.navigate("Swap Request");
              }}
              right={() => (
                <View>
                  <Badge>{numRequests}</Badge>
                </View>
              )}
            />
            {/* <Drawer.Item
              style={
                focusedRoute === "Swap Request" && {
                  backgroundColor: "#c4b5fd",
                  borderRadius: 20,
                }
              }
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="swap-horizontal"
                  size={size}
                  color={focusedRoute === "Leave" ? "black" : color}
                />
              )}
              label="Swap Request"
              labelStyle={focusedRoute === "Swap Request" && { color: "black" }}
              right={() =>
                openDropdown ? (
                  <MaterialCommunityIcons
                    name="chevron-up"
                    size={24}
                    color="black"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={24}
                    color="black"
                  />
                )
              }
              onPress={() => {
                setOpenDropdown(!openDropdown);
              }}
            /> */}
            {/* {openDropdown && (
              <Drawer.Item
                icon={({ color, size }) => (
                  <Entypo name="flow-line" size={size} color={color} />
                )}
                label="My Swap Requests"
                style={
                  focusedRoute === "Swap Request" && {
                    backgroundColor: "#c4b5fd",
                    borderRadius: 20,
                  }
                }
              />
            )} */}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section
        style={{
          marginBottom: 15,
          borderTopColor: "#f4f4f4",
          borderTopWidth: 1,
        }}
      >
        <Drawer.Item
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => signOut()}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;
