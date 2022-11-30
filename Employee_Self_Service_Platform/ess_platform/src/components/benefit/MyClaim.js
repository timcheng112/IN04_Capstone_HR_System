import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View, StyleSheet } from "react-native";
import {
  Divider,
  DataTable,
  Button,
} from "react-native-paper";
import api from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function MyClaims({ navigation, userId }) {
  const [claims, setClaims] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    loadClaims();
  }, []);

  const loadClaims = () => {
    api
      .getEmployeeClaims(userId)
      .then((response) => {
        setRefreshing(false);
        setClaims(response.data);
        console.log("Successfully fetched Employee claims");
      })
      .catch(() => console.log("Error trying to fetch Employee claims"));
  }


  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadClaims} />
      }
    >
      <DataTable>
        <DataTable.Header >
          <DataTable.Title >Plan</DataTable.Title>
          <DataTable.Title >Claim Amount</DataTable.Title>
          <DataTable.Title >Status</DataTable.Title>
          <DataTable.Title >Option</DataTable.Title>
        </DataTable.Header>

        {claims.map((claim) => (
          <DataTable.Row key={claim.claimId}>
            <DataTable.Cell>{claim.benefitPlanInstance.benefitPlan.planName}</DataTable.Cell>
            <DataTable.Cell>$ {claim.claimAmount}</DataTable.Cell>
            <DataTable.Cell>{claim.claimStatus}</DataTable.Cell>
            <DataTable.Cell>
              <Button
                icon="eye"
                color="#1e90ff"
                onPress={() => navigation.navigate('ClaimDetail', { claim })}>
                Detail
              </Button>
            </DataTable.Cell>
          </DataTable.Row>)
        )}
      </DataTable>
    </ScrollView>
  );
}