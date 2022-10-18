import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View,StyleSheet } from "react-native";
import {
  Divider,
  DataTable
} from "react-native-paper";
import api from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function LeaveList({userId}) {
  // const leaves = [
  //   { id: 1, appliedDate: '2022-08-15', type: 'ANL', status: 'Created' },
  //   { id: 2, appliedDate: '2022-08-17', type: 'MCL', status: 'Created' },
  // ]
  const [leaves, setLeaves] =  useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    api
    .getEmployeeLeaves(userId)
    .then((response) => {
      //setRefreshing(false);
      setLeaves(response.data);
      console.log("Successfully fetched Employee Leaves");
    })
    .catch(() => console.log("Error trying to fetch Employee Leaves"));

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
          <DataTable.Cell>{leave.leaveType}</DataTable.Cell>
          <DataTable.Cell>{leave.applicationDate}</DataTable.Cell>
          <DataTable.Cell>{leave.status}</DataTable.Cell>
        </DataTable.Row>)
      )}
    </DataTable>
  );
}