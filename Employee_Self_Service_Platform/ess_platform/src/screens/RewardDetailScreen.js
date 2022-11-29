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

const RewardDetailScreen = ({ navigation}) => {

  const route = useRoute();
  const [userId, setUserId] = useState();
  const [reward, setReward] = useState();


  useEffect(() => {
    setUserId(route.params.userId);
    setReward(route.params.reward);
    console.log(route.params.reward);
  }, []);
  useEffect(() => {
    console.log(route.params);
  }, []);


  return (
    reward && <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.inline}>
          <Text style={styles.title}>Reward Name:    </Text>
          <Text>{reward.name}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.title}>Description:     </Text>
          <Text>{reward.description}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.title}>Points Required:     </Text>
          <Text>{reward.pointsRequired}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.title}>Expiry Date:    </Text>
          <Text>{reward.expiryDate}</Text>
        </View>

        <View style={styles.button}>
          <Button
            mode="contained"
            color="#0000cd"
            onPress={() => navigation.navigate('Rewards')}>
            Back
          </Button>
          {plan.isActive === true &&<Button
            mode="contained"
            color="#0000cd"
            onPress>
            Redeem
          </Button>}
        </View>
      </View>

    </SafeAreaView>
  )
};

export default RewardDetailScreen;