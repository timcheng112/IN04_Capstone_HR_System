import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  Card,
  DataTable,
  Paragraph,
  Text,
  ToggleButton,
} from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../utils/api";
import PayInformationComponent from "./PayInformationComponent";

const PayComponent = () => {
  const [toggleValue, setToggleValue] = useState("My Pay Information");
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [payslips, setPayslips] = useState(null);

  // TO RETRIEVE USERID OF LOGGED IN USER
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

  // TO RETRIEVE LOGGED IN USER's PAYSLIPS
  useEffect(() => {
    if (userId !== null) {
      api
        .getPayslipByUserId(userId)
        .then((response) => {
          setPayslips(response.data);
        })
        .catch((error) =>
          console.log("Error retrieving payslips for user with ID: " + userId)
        );
    }
  }, [userId]);

  const getMonthFromNumber = (number) => {
    if (number === 1) {
      return "January";
    } else if (number === 2) {
      return "February";
    } else if (number === 3) {
      return "March";
    } else if (number === 4) {
      return "April";
    } else if (number === 5) {
      return "May";
    } else if (number === 6) {
      return "June";
    } else if (number === 7) {
      return "July";
    } else if (number === 8) {
      return "August";
    } else if (number === 9) {
      return "September";
    } else if (number === 10) {
      return "October";
    } else if (number === 11) {
      return "November";
    } else if (number === 12) {
      return "December";
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: "10%", padding: "4%" }}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //   marginTop: "4%",
        }}
      >
        <ToggleButton.Row
          onValueChange={(toggleValue) => setToggleValue(toggleValue)}
          style={{ width: "100%" }}
        >
          <ToggleButton
            icon={() => <Feather name="info" size={24} color="black" />}
            value="My Pay Information"
            style={[
              { width: "50%", borderRadius: 20, borderWidth: 1 },
              toggleValue === "My Pay Information" && {
                backgroundColor: "#818cf8",
              },
            ]}
          />
          <ToggleButton
            icon={() => <Entypo name="documents" size={24} color="black" />}
            value="My Pay Slips"
            style={[
              { width: "50%", borderRadius: 20, borderWidth: 1 },
              toggleValue === "My Pay Slips" && { backgroundColor: "#818cf8" },
            ]}
          />
        </ToggleButton.Row>
      </View>
      {toggleValue === "My Pay Information" ? (
        <PayInformationComponent user={user && user} />
      ) : (
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            marginTop: "4%",
            marginBottom: "4%",
            // marginLeft: "2%",
            // marginRight: "2%",
            elevation: 10,
            paddingBottom: "4%",
          }}
        >
          <Text style={{ fontFamily: "Poppins_600SemiBold", margin: "4%" }}>
            My Payslips
          </Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ flex: 1 }}>ID</DataTable.Title>
              <DataTable.Title style={{ flex: 4 }}>Payslip</DataTable.Title>
              <DataTable.Title style={{ flex: 4 }}>
                Payment Date
              </DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>Action</DataTable.Title>
            </DataTable.Header>
            {payslips &&
              payslips.map((payslip, index) => {
                return (
                  <DataTable.Row key={index}>
                    <DataTable.Cell style={{ flex: 1 }}>
                      {payslip.payslipId}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 4 }}>
                      {getMonthFromNumber(payslip.monthOfPayment) +
                        " " +
                        payslip.yearOfPayslip}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 4 }}>
                      {payslip.dateOfPayment}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 2 }}>
                      <TouchableOpacity>
                        <MaterialCommunityIcons
                          name="file-eye-outline"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <MaterialCommunityIcons
                          name="file-download-outline"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
          </DataTable>
        </View>
      )}
    </ScrollView>
  );
};

export default PayComponent;
