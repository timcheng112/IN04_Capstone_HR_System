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

const LeaveScreen = ({navigation}) => {
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inline}>
        <Text style={styles.headlines}>Application History</Text>
        <Button
          icon="plus"
          mode="contained"
          color="#ffd700"
          onPress={() => navigation.navigate('LeaveApplication')}>
          Apply 
        </Button>
        </View>
        <LeaveList />
      
    </SafeAreaView>
  )
};


export default LeaveScreen;
