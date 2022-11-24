import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Alert,
} from "react-native";
import api from "../utils/api";
import Constants from "expo-constants";
import { TextInput, RadioButton, Button } from "react-native-paper";
import DatePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  headlines: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 50,
    color: "#000000",
  },
  text:{
    lineHeight: 30,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  }
});

const NewClaimScreen = ({ navigation }) => {
  const [amount, setAmount] = useState(0)
  const [remarks, setRemarks] = useState("")
  const [incidentDate, setIncidentDate] = useState(new Date());
  const [claimDate, setClaimDate] = useState(new Date());
  const [showStart, setShowStart] = React.useState(false);
  const [fileResponse, setFileResponse] = useState();
  const [userId, setUserId] = useState();
  const [error, setError] = useState();
  const route = useRoute();

  const pickDocument = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true });
      console.log("AAA")
      console.log(response);
      if (response.type == 'success') {
        setFileResponse(response);
      } else {
        console.log("error uploading file")
      }

    } catch (err) {
      console.warn(err);
    }
  }, []);


  useEffect(() => {
    setIncidentDate(new Date());
    setClaimDate(new Date());
    setAmount(0);
    setRemarks("");
    setFileResponse(null);
  }, []);

  useEffect(() => {
    setUserId(route.params.userId);
    console.log(route.params.userId);
  }, []);



  // function newClaim({ navigation }) {
  //   console.log("submit button pressed");
  //   let formDataPayload = new FormData();

  //   if (fileResponse != null) {
  //     let docProperties = {
  //       uri: fileResponse.uri,
  //       type: fileResponse.mimeType,
  //       name: fileResponse.name,
  //     }

  //     formDataPayload.append('document', {
  //       uri: docProperties.uri,
  //       name: docProperties.name,
  //       type: docProperties.type,
  //     });
  //   }

  //   formDataPayload.append('employeeId', userId);
  //   console.log(userId);
  //   formDataPayload.append('leaveType', type);
  //   console.log(type);

  //   formDataPayload.append('startDate', startDate.toISOString().slice(0, 10));
  //   console.log(startDate);

  //   formDataPayload.append('endDate', endDate.toISOString().slice(0, 10));
  //   console.log(endDate);

  //   formDataPayload.append('remark', remarks);
  //   console.log(remarks);

  //   api.createLeave(formDataPayload)
  //     .then(() => {
  //       console.log("Successfully applied!");
  //       navigation.navigate('Leave')
  //     })
  //     .catch((error) => {
  //       alert(error.response.data.message);
  //     });
  // }



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.inline}>
          <Button
            mode="contained"
            color="#ffd700"
            onPress={() => setShowStart(true)}>
            Select Incident Date
          </Button>
          <Text>Incident on:  {incidentDate.toISOString().slice(0, 10)}</Text>
          {showStart &&
            <DatePicker
              mode='date'
              value={incidentDate}
              positiveButtonLabel="Confirm"
              negativeButtonLabel="Cancel"
              display='calendar'
              onChange={(event, selectedDate) => {
                setIncidentDate(selectedDate);
                setShowStart(false);
              }}
            />}
        </View>
        <View style={styles.text}>
        <TextInput
          label="Claim Amount"
          mode="outlined"
          value={amount}
          onChangeText={amount => setAmount(amount)}
        />
        </View>
        
        <TextInput
          label="Remark"
          mode="outlined"
          value={remarks}
          multiline
          onChangeText={remarks => setRemarks(remarks)}
        />
      
        <View style={styles.content}>
          <Button
            icon="plus"
            mode="contained"
            color="#ffd700"
            onPress={pickDocument}>
            Upload Document
          </Button>
          <Text>
            {fileResponse?.uri}
          </Text>
        </View>
        <View style={styles.inline}>
          <Button
            mode="contained"
            color="#daa520"
            onPress={() => navigation.navigate('Benefits')}>
            Back
          </Button>
          <Button
            mode="contained"
            color="#ffd700"
            >
            Submit
          </Button>
        </View>
      </View>

    </SafeAreaView>
  )
};

export default NewClaimScreen;