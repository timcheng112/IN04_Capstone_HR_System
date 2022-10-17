import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View,StyleSheet } from "react-native";
import {
  Divider,
  DataTable
} from "react-native-paper";
import api from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function LeaveList() {
  const [userId, setUserId] = useState();
  const leaves = [
    { id: 1, appliedDate: '2022-08-15', type: 'ANL', status: 'Created' },
    { id: 2, appliedDate: '2022-08-17', type: 'MCL', status: 'Created' },
  ]
  useEffect(() => {
    const setId = async () => {
      try {
        const response = await AsyncStorage.getItem("userId");
        setUserId(response);
      } catch (err) {
        console.warn(err);
      };
    }
    setId();
  }, []);

  return (
    <DataTable>
      <DataTable.Header >
        <DataTable.Title >Leave Type</DataTable.Title>
        <DataTable.Title >Applied Date</DataTable.Title>
        <DataTable.Title >Status</DataTable.Title>
      </DataTable.Header>
      
      {leaves.map((leave) => (
        <DataTable.Row>
          <DataTable.Cell>{leave.type}</DataTable.Cell>
          <DataTable.Cell>{leave.appliedDate}</DataTable.Cell>
          <DataTable.Cell>{leave.status}</DataTable.Cell>
        </DataTable.Row>)
      )}
    </DataTable>
  );
}