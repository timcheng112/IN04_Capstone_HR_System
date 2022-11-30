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
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  }
});

const LeaveDetailScreen = ({ navigation}) => {

  const route = useRoute();
  const [userId, setUserId] = useState();
  const [leave, setLeave] = useState();


  useEffect(() => {
    setLeave(route.params.leave);
    console.log(route.params.leave);
  }, []);

  function cancel(){
    api.cancelLeave(leave.leaveId)
      .then(() => {
        alert("Successfully cancel.");
        setOpen(false);
        })
    .catch((error) => setError(error));
    navigation.navigate('Leave');
  }


  return (
    leave && <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.inline}>
          <Text style={styles.title}>Leave Type:    </Text>
          <Text>{leave.leaveType}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.title}>Start Date:    </Text>
          <Text>{leave.startDate}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.title}>End Date:    </Text>
          <Text>{leave.endDate}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.title}>Remarks:    </Text>
          <Text>{leave.applicationRemarks}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.title}>Application Date:    </Text>
          <Text>{leave.applicationDate}</Text>
        </View>        
        <View style={styles.inline}>
          <Text style={styles.title}>Application Status:    </Text>
          <Text>{leave.status}</Text>
        </View>

        <View style={styles.button}>
          <Button
            mode="contained"
            color="#1e90ff"
            onPress={() => navigation.navigate('Leave')}>
            Back
          </Button>
          {leave.status === "PENDING" && <Button
            mode="contained"
            color="#0000cd"
            onPress={()=>cancel()}>
            Cancel
          </Button>}
        </View>
      </View>

    </SafeAreaView>
  )
};

export default LeaveDetailScreen;