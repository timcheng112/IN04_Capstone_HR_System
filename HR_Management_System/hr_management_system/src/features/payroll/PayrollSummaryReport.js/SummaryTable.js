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

const SummaryTable = ({ invoice }) => (
  <View style={styles.tableContainer}>
    <SummaryTableHeader />
    <SummaryTableRow items={invoice.items} />
    <SummaryTableFooter items={invoice.items} />
  </View>
);

export default SummaryTable;
