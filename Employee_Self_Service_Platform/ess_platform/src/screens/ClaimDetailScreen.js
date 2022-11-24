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

const ClaimDetailScreen = ({ navigation}) => {

  const route = useRoute();
  const [userId, setUserId] = useState();
  const [claim, setClaim] = useState();


  useEffect(() => {
    setClaim(route.params.claim);
    console.log(route.params.claim);
  }, []);

  function withdraw(){
    api.withdrawClaim(claim.claimId)
      .then(() => {
        alert("Successfully withdrawn.");
        setOpen(false);
        })
    .catch((error) => setError(error));
  }


  return (
    claim && <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.inline}>
          <Text style={styles.title}>BenefitPlan Name:    </Text>
          <Text>{claim.benefitPlanInstance.benefitPlan.planName}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.title}>Remarks:    </Text>
          <Text>{claim.remarks}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.title}>Claim Amount:    $ </Text>
          <Text>{claim.claimAmount}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.title}>Claim Date:    </Text>
          <Text>{claim.claimDate}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.title}>Incident Date:    </Text>
          <Text>{claim.incidentDate}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.title}>Claim Status:    </Text>
          <Text>{claim.claimStatus}</Text>
        </View>

        <View style={styles.button}>
          <Button
            mode="contained"
            color="#daa520"
            onPress={() => navigation.navigate('Claims')}>
            Back
          </Button>
          <Button
            mode="contained"
            color="#ffd700"
            onPress={() => withdraw()}>
            Withdraw
          </Button>
        </View>
      </View>

    </SafeAreaView>
  )
};

export default ClaimDetailScreen;