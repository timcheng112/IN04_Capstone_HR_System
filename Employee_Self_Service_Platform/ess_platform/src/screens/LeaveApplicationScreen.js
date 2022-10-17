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

const LeaveApplicationScreen = ({ navigation }) => {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [remarks, setRemarks] = React.useState("");
  const [type, setType] = React.useState();
  const [showStart, setShowStart] = React.useState(false);
  const [showEnd, setShowEnd] = React.useState(false);
  const [fileResponse, setFileResponse] = useState();
  const [userId, setUserId] = useState();

  const pickDocument = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({type: "*/*", copyToCacheDirectory: true});
      console.log("AAA")
      console.log(response);
      if (response.type == 'success') {
//         let nameParts = response.name.split('.');
//         let fileType = nameParts[nameParts.length - 1];
//
//         var fileToUpload = {
//             name: response.name,
//             size: response.size,
//             uri: response.uri,
//             type: "application/" + fileType
//         };
//         console.log("fileToUpload")
//        console.log(fileToUpload);
//
//        const formData = new FormData();
//        formData.append('file', {
//            uri: response.uri,
//            type: "application/" + fileType,
//            name: response.name,
//            size: response.size
//        });
//
//        console.log("formdata");
//        console.log(formData)
         setFileResponse(response);
      } else {
        console.log("error uploading file")
      }

    } catch (err) {
      console.warn(err);
    }
  }, []);
  
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

  // const pickDocument = async () => {
  //   let result = await DocumentPicker.getDocumentAsync({});
  //   console.log(result.uri);
  //   console.log(result);
  // };

  function applyLeave({ navigation }) {
    console.log("submit button pressed");
    let formDataPayload = new FormData();

    if (fileResponse != null) {
        let docProperties = {
            uri: fileResponse.uri,
            type: fileResponse.mimeType,
            name: fileResponse.name,
        }

        formDataPayload.append('document', {
            uri: docProperties.uri,
            name: docProperties.name,
            type: docProperties.type,
        });
    }

    formDataPayload.append('employeeId', userId);
    console.log(userId);
    formDataPayload.append('leaveType', type);
    console.log(type);

    formDataPayload.append('startDate', startDate.toISOString().slice(0, 10));
    console.log(startDate);

    formDataPayload.append('endDate', endDate.toISOString().slice(0, 10));
    console.log(endDate);

    formDataPayload.append('remark', remarks);
    console.log(remarks);

    api.createLeave(formDataPayload)
      .then(() => {
        console.log("Successfully applied!");
        navigation.navigate('Leave')
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  // function myFunction({ navigation }) {
  //   setId().catch(console.error);
  //   applyLeave({ navigation });
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headlines}>Leave Application</Text>
        <RadioButton.Group onValueChange={type => setType(type)} value={type} >
          <RadioButton.Item label="Annual Leave" value="ANL" />
          <RadioButton.Item label="Medical Leave" value="MCL" />
        </RadioButton.Group>
        <View style={styles.inline}>
          <Button
            mode="contained"
            color="#ffd700"
            onPress={() => setShowStart(true)}>
            Select Start Date
          </Button>
          <Text>Start From:  {startDate.toISOString().slice(0, 10)}</Text>
          {showStart &&
            <DatePicker
              mode='date'
              value={startDate}
              positiveButtonLabel="Confirm"
              negativeButtonLabel="Cancel"
              display='calendar'
              onChange={(event, selectedDate) => {
                setStartDate(selectedDate);
                setShowStart(false);
              }}
            />}
        </View>
        <View style={styles.inline}>
          <Button
            mode="contained"
            color="#ffd700"
            onPress={() => setShowEnd(true)}>
            Select End Date
          </Button>
          <Text>End On:  {endDate.toISOString().slice(0, 10)}</Text>
          {showEnd &&
            <DatePicker
              mode='date'
              value={endDate}
              positiveButtonLabel="Confirm"
              negativeButtonLabel="Cancel"
              display='calendar'
              onChange={(event, selectedDate) => {
                setEndDate(selectedDate);
                setShowEnd(false);
              }}
            />}
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
          onPress={() => navigation.navigate('Leave')}>
          Back
        </Button>
        <Button
          mode="contained"
          color="#ffd700"
          onPress={() => applyLeave({ navigation })}>
          Submit
        </Button>
        </View>
      </View>

    </SafeAreaView>
  )
};

export default LeaveApplicationScreen;