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
  }
});

const LeaveScreen = ({navigation}) => {
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headlines}>Application History</Text>
        <Button
          icon="plus"
          mode="contained"
          color="#ffd700"
          onPress={() => navigation.navigate('LeaveApplication')}>
          Apply for Leave
        </Button>

      </View>
    </SafeAreaView>
  )
};


export default LeaveScreen;
