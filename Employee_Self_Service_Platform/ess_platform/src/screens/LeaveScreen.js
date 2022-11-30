import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Alert,
} from "react-native";
import api from "../utils/api";
import Constants from "expo-constants";
import { Button } from "react-native-paper";
import LeaveList from "../components/leave/LeaveList";
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
});



const LeaveScreen = ({ navigation }) => {

  const [userId, setUserId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const setId = async () => {
      try {
        const response = await AsyncStorage.getItem("userId");
        setUserId(response);
        //console.log(response);
      } catch (err) {
        console.warn(err);
      };
    }
    setId();
  }, []);

  return (
    userId &&
    <SafeAreaView style={styles.container}>
      <View style={styles.inline}>
        <Text style={styles.headlines}>Application History</Text>
        <Button
          icon="plus"
          mode="contained"
          color="#0000cd"
          onPress={() => navigation.navigate('LeaveApplication', { userId })}>
          Apply
        </Button>
      </View>
      <LeaveList userId={userId} navigation ={navigation}/>

    </SafeAreaView>
  )
};


export default LeaveScreen;
