import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import SummaryTableHeader from "./SummaryTableHeader";
import SummaryTableRow from "./SummaryTableRow";
import SummaryTableFooter from "./SummaryTableFooter";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    padding: 10,
    // borderWidth: 1,
    // borderColor: '#bff0fd',
  },
});

const SummaryTable = ({ payslips }) => (
  <View style={styles.tableContainer}>
    <SummaryTableHeader />
    <SummaryTableRow payslips={payslips} />
    <SummaryTableFooter payslips={payslips} />
  </View>
);

export default SummaryTable;
