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
  const [userClaimed, setUserClaimed] = useState(false);
  const [claimDate, setClaimDate] = useState();

  useEffect(() => {
    console.log("Reward Detail Screen");
    setUserId(route.params.userId);
    setReward(route.params.item);
    console.log(route.params.item);
    console.log("Instances");
    console.log(route.params.item.rewardInstances);
    console.log(route.params.userId)
    route.params.item.rewardInstances.forEach((instance) => {
        console.log("instance");
        console.log(instance.recipient.userId);
        if (route.params.userId == instance.recipient.userId) {
            console.log("REDEEMED");
            setUserClaimed(true);
            setClaimDate(instance.dateClaimed);
        }
    });
  }, []);

  function redeemReward() {
    console.log("REDEEM REWARD");
    console.log(reward.name);

    api.redeemReward(reward.rewardId, userId)
        .then((response) => {
            console.log("response data");
            console.log(response.data);
            alert(response.data);
            navigation.navigate('Rewards')
        })
        .catch((error) => {
            console.log(error.response.data.message);
            alert(error.response.data.message);
        })
  }

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
        {!reward.name.includes("Leave") &&<View style={styles.inline}>
          <Text style={styles.title}>Expiry Date:    </Text>
          <Text>{reward.expiryDate}</Text>
        </View>}
        {userClaimed===true &&<View style={styles.inline}>
          <Text style={styles.title}>Redeemed On:    </Text>
          <Text>{claimDate}</Text>
        </View>}
        <View style={styles.button}>
          <Button
            mode="contained"
            color="#0000cd"
            onPress={() => navigation.navigate('Rewards')}>
            Back
          </Button>
          {userClaimed===false &&<Button
            mode="contained"
            color="#0000cd"
            onPress={() => redeemReward()}>
            Redeem
          </Button>}
        </View>
      </View>

    </SafeAreaView>
  )
};

export default RewardDetailScreen;