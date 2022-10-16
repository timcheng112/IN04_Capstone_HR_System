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
import DocumentPicker from 'react-native-document-picker';

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

const LeaveApplicationScreen = () => {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [remarks, setRemarks] = React.useState("");
  const [type, setType] = React.useState();
  const [showStart, setShowStart] = React.useState(false);
  const [showEnd, setShowEnd] = React.useState(false);
  const [fileResponse, setFileResponse] = useState([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

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
        <Button
          icon="plus"
          mode="contained"
          color="#ffd700"
          onPress={() => handleDocumentSelection}>
          SELECT
        </Button>
      </View>

    </SafeAreaView>
  )
};

export default LeaveApplicationScreen;