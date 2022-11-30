import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Card,
  DataTable,
  Paragraph,
  Provider,
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
import LottieView from "lottie-react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import PDFReader from "rn-pdf-reader-js-improved";
import ViewPayslipModal from "./ViewPayslipModal";
import { StorageAccessFramework } from "expo-file-system";

const PayComponent = () => {
  const [toggleValue, setToggleValue] = useState("My Pay Information");
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [payslips, setPayslips] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [viewPdf, setViewPdf] = useState(false);
  const [pdfUri, setPdfUri] = useState("");
  const [userPayInfo, setUserPayInfo] = useState(null);

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

  useEffect(() => {
    if (userId !== null) {
      api
        .getUserPayInformation(userId)
        .then((response) => setUserPayInfo(response.data))
        .catch((err) =>
          console.log(
            "Error in fetching user pay information for userID: " + userId
          )
        );
    }
  }, [userId]);

  // TO RETRIEVE LOGGED IN USER's PAYSLIPS
  useEffect(() => {
    if (userId !== null) {
      setIsLoading(true);
      api
        .getPayslipByUserId(userId)
        .then((response) => {
          setPayslips(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error retrieving payslips for user with ID: " + userId);
          setIsLoading(false);
        });
    }
  }, [userId, refresh]);

  // TO VIEW PAYSLIP
  const viewHandler = (payslip) => {
    api
      .getDocById(payslip.payslipPDF.docId)
      .then((response) => {
        console.log("TEST 1");
        const fr = new FileReader();
        console.log("TEST 2");
        fr.onload = async () => {
          console.log("TEST 3");
          const fileUri = `${FileSystem.documentDirectory}/${user.firstName}_${
            user.lastName
          }_${getMonthFromNumber(payslip.monthOfPayment)}_${
            payslip.yearOfPayslip
          }_Payslip.pdf`;
          console.log("TEST 4");
          await FileSystem.writeAsStringAsync(
            fileUri,
            fr.result.split(",")[1],
            {
              encoding: FileSystem.EncodingType.Base64,
            }
          );
          console.log("TEST 5");
          setPdfUri(fileUri);
          setViewPdf(true);
        };
        console.log("TEST 6");
        fr.readAsDataURL(response.data);
      })
      .catch((err) => console.log("Error in downloading"));
  };

  // TO SHARE PAYSLIP IN OTHER APPS
  const sharingHandler = (payslip) => {
    api
      .getDocById(payslip.payslipPDF.docId)
      .then((response) => {
        console.log("TEST 1");
        const fr = new FileReader();
        console.log("TEST 2");
        fr.onload = async () => {
          console.log("TEST 3");
          const fileUri = `${FileSystem.documentDirectory}/${user.firstName}_${
            user.lastName
          }_${getMonthFromNumber(payslip.monthOfPayment)}_${
            payslip.yearOfPayslip
          }_Payslip.pdf`;
          console.log("TEST 4");
          await FileSystem.writeAsStringAsync(
            fileUri,
            fr.result.split(",")[1],
            {
              encoding: FileSystem.EncodingType.Base64,
            }
          );
          console.log("TEST 5");
          Sharing.shareAsync(fileUri);
        };
        console.log("TEST 6");
        fr.readAsDataURL(response.data);
      })
      .catch((err) => console.log("Error in downloading"));
  };

  // DOWNLOAD PAYSLIP
  const downloadHandler = (payslip) => {
    api
      .getDocById(payslip.payslipPDF.docId)
      .then((response) => {
        console.log("TEST 1");

        const fr = new FileReader();
        fr.onload = async () => {
          const fileUri = `${FileSystem.documentDirectory}/${user.firstName}_${
            user.lastName
          }_${getMonthFromNumber(payslip.monthOfPayment)}_${
            payslip.yearOfPayslip
          }_Payslip.pdf`;
          const permissions =
            await StorageAccessFramework.requestDirectoryPermissionsAsync();
          if (!permissions.granted) {
            return;
          }

          const base64Data = fr.result.split(",")[1];
          try {
            await StorageAccessFramework.createFileAsync(
              permissions.directoryUri,
              `${user.firstName}_${user.lastName}_${getMonthFromNumber(
                payslip.monthOfPayment
              )}_${payslip.yearOfPayslip}_Payslip.pdf`,
              "application/pdf"
            )
              .then(async (uri) => {
                await FileSystem.writeAsStringAsync(uri, base64Data, {
                  encoding: FileSystem.EncodingType.Base64,
                }).then(() => alert("Successfully downloaded"));
              })
              .catch((e) => {
                alert(e);
              });
          } catch (e) {
            throw new Error(e);
          }
        };
        fr.readAsDataURL(response.data);
      })
      .catch((err) => console.log("Error in downloading"));
  };

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
    <Provider>
      <ScrollView
        contentContainerStyle={{ paddingBottom: "10%", padding: "4%" }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => setRefresh(!refresh)}
          />
        }
      >
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
                toggleValue === "My Pay Slips" && {
                  backgroundColor: "#818cf8",
                },
              ]}
            />
          </ToggleButton.Row>
        </View>
        {isLoading ? (
          <LottieView
            source={require("../../../assets/loading.json")}
            autoPlay
            style={{
              height: "60%",
              width: "60%",
              alignSelf: "center",
              justifyContent: "center",
            }}
            resizeMode="contain"
          />
        ) : toggleValue === "My Pay Information" ? (
          user && (
            <PayInformationComponent
              user={user && user}
              userPayInfo={userPayInfo && userPayInfo}
            />
          )
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
                {/* <DataTable.Title style={{ flex: 4 }}>
                  Payment Date
                </DataTable.Title> */}
                <DataTable.Title style={{ flex: 3 }}>Action</DataTable.Title>
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
                      {/* <DataTable.Cell style={{ flex: 4 }}>
                        {payslip.dateOfPayment}
                      </DataTable.Cell> */}
                      <DataTable.Cell style={{ flex: 3 }}>
                        <TouchableOpacity
                          disabled={!payslip.payslipPDF}
                          onPress={() => viewHandler(payslip)}
                        >
                          <MaterialCommunityIcons
                            name="file-eye-outline"
                            size={24}
                            color="black"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          disabled={!payslip.payslipPDF}
                          onPress={() => downloadHandler(payslip)}
                        >
                          <MaterialCommunityIcons
                            name="file-download-outline"
                            size={24}
                            color="black"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          disabled={!payslip.payslipPDF}
                          onPress={() => sharingHandler(payslip)}
                        >
                          <MaterialCommunityIcons
                            name="share-outline"
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
        {pdfUri !== "" && (
          <ViewPayslipModal
            visible={viewPdf}
            hideModal={() => setViewPdf(false)}
            pdfUri={pdfUri}
          />
        )}
      </ScrollView>
    </Provider>
  );
};

export default PayComponent;
