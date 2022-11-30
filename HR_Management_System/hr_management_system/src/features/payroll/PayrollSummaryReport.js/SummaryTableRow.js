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

const SummaryTableRow = ({ payslips }) => {
  const rows =
    payslips &&
    payslips.map((item) => (
      <View style={styles.row} key={item.payslipId}>
        <Text style={styles.employee}>
          {item.employee.firstName + " " + item.employee.lastName}
        </Text>
        <Text style={styles.basic}>
          {"$" + item.basicSalary.toLocaleString()}
        </Text>
        <Text style={styles.additions}>
          {"$" + item.allowance.toLocaleString()}
        </Text>
        <Text style={styles.deductions}>
          {"$" + item.deduction.toLocaleString()}
        </Text>
        <Text style={styles.gross}>
          {"$" + (item.basicSalary - item.deduction).toLocaleString()}
        </Text>
        <Text style={styles.net}>
          {"$" + item.grossSalary.toLocaleString()}
        </Text>
      </View>
    ));
  return <Fragment>{rows}</Fragment>;
};

export default SummaryTableRow;
