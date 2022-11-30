import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View, StyleSheet } from "react-native";
import {
  Divider,
  DataTable,
  Button,
} from "react-native-paper";
import api from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function LeaveList({ userId, navigation }) {
  // const leaves = [
  //   { id: 1, appliedDate: '2022-08-15', type: 'ANL', status: 'Created' },
  //   { id: 2, appliedDate: '2022-08-17', type: 'MCL', status: 'Created' },
  // ]
  const [leaves, setLeaves] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    loadEmployeeLeaves();
  }, []);

  const loadEmployeeLeaves = () => {
    api
      .getEmployeeLeaves(userId)
      .then((response) => {
        setRefreshing(false);
        setLeaves(response.data);
        console.log("Successfully fetched Employee Leaves");
      })
      .catch(() => console.log("Error trying to fetch Employee Leaves"));
  }


  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadEmployeeLeaves} />
      }
    >
      <DataTable>
        <DataTable.Header >
          <DataTable.Title >Leave Type</DataTable.Title>
          <DataTable.Title >Applied Date</DataTable.Title>
          <DataTable.Title >Status</DataTable.Title>
          <DataTable.Title >Option</DataTable.Title>
        </DataTable.Header>

        {leaves.map((leave) => (
          <DataTable.Row>
            <DataTable.Cell>{leave.leaveType}</DataTable.Cell>
            <DataTable.Cell>{leave.applicationDate}</DataTable.Cell>
            <DataTable.Cell>{leave.status}</DataTable.Cell>
            <DataTable.Cell>
              <Button
                icon="eye"
                color="#1e90ff"
                onPress={() => navigation.navigate('LeaveDetail', { leave })}>
                Detail
              </Button>
            </DataTable.Cell>
          </DataTable.Row>)
        )}
      </DataTable>
    </ScrollView>
  );
}