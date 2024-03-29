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

const PlanDetailScreen = ({ navigation}) => {

  const route = useRoute();
  const [userId, setUserId] = useState();
  const [plan, setPlan] = useState();


  useEffect(() => {
    setUserId(route.params.userId);
    setPlan(route.params.plan);
    console.log(route.params.plan);
  }, []);
  useEffect(() => {
    console.log(route.params);
  }, []);


  return (
    plan && <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.inline}>
          <Text style={styles.title}>Benefit Plan Name:    </Text>
          <Text>{plan.benefitPlan.planName}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.title}>Description:     </Text>
          <Text>{plan.benefitPlan.description}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.title}>Plan Type:    </Text>
          <Text>{plan.benefitPlan.planType}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.title}>Remaining Amount:    $ </Text>
          <Text>{plan.remainingAmount}</Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.title}>Enrolled Date:    </Text>
          <Text>{plan.enrolDate}</Text>
        </View>
        <View style={styles.inline}>
          {plan.isActive &&<Text style={styles.title}>Plan Is Active    </Text>}
          {!plan.isActive &&<Text style={styles.title}>Plan Is Inactive    </Text>}
        </View>

        <View style={styles.button}>
          <Button
            mode="contained"
            color="#1e90ff"
            onPress={() => navigation.navigate('Benefits')}>
            Back
          </Button>
          {plan.isActive === true &&<Button
            mode="contained"
            color="#0000cd"
            onPress={() => navigation.navigate('NewClaim', { userId, plan })}>
            Claim
          </Button>}
        </View>
      </View>

    </SafeAreaView>
  )
};

export default PlanDetailScreen;