import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
    flexGrow: 1,
    fontSize: 12,
  },
  employee: {
    width: "30%",
  },
  basic: {
    width: "14%",
  },
  additions: {
    width: "14%",
  },
  deductions: {
    width: "14%",
  },
  gross: {
    width: "14%",
  },
  net: {
    width: "14%",
  },
});

const SummaryTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.employee}>Employee</Text>
    <Text style={styles.basic}>Basic</Text>
    <Text style={styles.additions}>Additions</Text>
    <Text style={styles.deductions}>Deductions</Text>
    <Text style={styles.gross}>Gross</Text>
    <Text style={styles.net}>Net</Text>
  </View>
);

export default SummaryTableHeader;
