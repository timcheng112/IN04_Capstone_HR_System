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
import BenefitPlan from "../components/benefit/BenefitPlan";

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



const BenefitScreen = ({navigation}) => {

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
    userId  &&
    <SafeAreaView style={styles.container}>
      <View style={styles.inline}>
        <Text style={styles.headlines}>My Benefit Plan</Text>

        </View>
        <BenefitPlan navigation={navigation} userId={userId} />

    </SafeAreaView>
  )
};

export default BenefitScreen;
