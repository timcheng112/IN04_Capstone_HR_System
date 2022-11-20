import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
    fontSize: 10,
  },
  employee: {
    width: "30%",
    textAlign: "left",
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

const SummaryTableRow = ({ items }) => {
  const rows = items.map((item) => (
    <View style={styles.row} key={item.sno.toString()}>
      <Text style={styles.employee}>{item.desc}</Text>
      <Text style={styles.basic}>{item.qty}</Text>
      <Text style={styles.additions}>{item.rate}</Text>
      <Text style={styles.deductions}>{(item.qty * item.rate).toFixed(2)}</Text>
      <Text style={styles.gross}>{(item.qty * item.rate).toFixed(2)}</Text>
      <Text style={styles.net}>{(item.qty * item.rate).toFixed(2)}</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default SummaryTableRow;
