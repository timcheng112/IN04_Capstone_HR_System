import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    fontStyle: "bold",
  },
  description: {
    width: "72%",
  },
  total: {
    width: "14%",
  },
});

const SummaryTableFooter = ({ payslips }) => {
  // const total = payslips
  //   .map((item) => item.qty * item.rate)
  //   .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return (
    <View style={styles.row}>
      <Text style={styles.description}></Text>
      <Text style={styles.total}>TOTAL</Text>
      <Text style={styles.total}>
        {payslips &&
          "$" +
            payslips
              .reduce((accumulator, object) => {
                return accumulator + object.grossSalary;
              }, 0)
              .toLocaleString()}
      </Text>
    </View>
  );
};

export default SummaryTableFooter;
