import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View, StyleSheet } from "react-native";
import {
  Divider,
  DataTable,
  Button,
} from "react-native-paper";
import api from "../../utils/api";
import ViewPlanButton from "./ViewPlanButton";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function BenefitPlan({ navigation, userId }) {
  const [plans, setPlans] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    loadBenefitPlans();
  }, []);

  const loadBenefitPlans = () => {
    api
      .getAllBenefitPlanInstancesByEmployeeId(userId)
      .then((response) => {
        setRefreshing(false);
        setPlans(response.data);
        console.log("Successfully fetched Employee plans");
      })
      .catch(() => console.log("Error trying to fetch Employee plans"));
  }


  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadBenefitPlans} />
      }
    >
      <DataTable>
        <DataTable.Header >
          <DataTable.Title >Name</DataTable.Title>
          <DataTable.Title >Remain Amount</DataTable.Title>
          <DataTable.Title >Enroll Date</DataTable.Title>
          <DataTable.Title >Option</DataTable.Title>
        </DataTable.Header>

        {plans.map((plan) => (
          <DataTable.Row>
            <DataTable.Cell>{plan.benefitPlan.planName}</DataTable.Cell>
            <DataTable.Cell>$ {plan.remainingAmount}</DataTable.Cell>
            <DataTable.Cell>{plan.enrolDate}</DataTable.Cell>
            <DataTable.Cell>
              <ViewPlanButton navigation={navigation} plan={plan} userId={userId}/>
            </DataTable.Cell>
          </DataTable.Row>)
        )}
      </DataTable>
    </ScrollView>
  );
}