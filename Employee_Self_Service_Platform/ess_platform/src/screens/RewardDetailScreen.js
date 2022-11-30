import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Alert,
  Image,
} from "react-native";
import api from "../utils/api";
import Constants from "expo-constants";
import { TextInput, RadioButton, Button } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
//import * as Sharing from "expo-sharing";

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
  },
  image: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 150,
      margin:10,
    },
});

const RewardDetailScreen = ({ navigation}) => {

  const route = useRoute();
  const [userId, setUserId] = useState();
  const [reward, setReward] = useState();
  const [userClaimed, setUserClaimed] = useState(false);
  const [claimDate, setClaimDate] = useState();
  const [img, setImg] = useState(null);

  const getImageSource = () => {
    console.log("EEE");
    console.log(img);
    api
      .getDocById(route.params.item.image.docId)
      .then((response) => {
        console.log("TEST 1");
        const fr = new FileReader();
        console.log("TEST 2");
        fr.onload = async () => {
          console.log("TEST 3");
          const fileUri = `${FileSystem.documentDirectory}${route.params.item.name}_Reward.png`;
          console.log("TEST 4");
          await FileSystem.writeAsStringAsync(
            fileUri,
            fr.result.split(",")[1],
            {
              encoding: FileSystem.EncodingType.Base64,
            }
          );
          console.log("TEST 5");
          setImg(fileUri);
          console.log(fileUri);
          return fileUri;
        };
        console.log("TEST 6");
        fr.readAsDataURL(response.data);
      })
      .catch((err) => console.log("Error in downloading"));
    };


  useEffect(() => {
    setUserId(route.params.userId);
    setReward(route.params.item);
    route.params.item.rewardInstances.forEach((instance) => {
        console.log("instance");
        console.log(instance.recipient.userId);
        if (route.params.userId == instance.recipient.userId) {
            console.log("REDEEMED");
            setUserClaimed(true);
            setClaimDate(instance.dateClaimed);
        }
    });
    console.log("DDDD");
    console.log(route.params.item.image.docId);
    getImageSource();
  }, []);

  function redeemReward() {

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
        {reward.image !== null &&<View style={styles.image}>
          <Image source={{uri : img }} style={{width:'100%', height:'100%'}} resizeMode="contain"/>
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