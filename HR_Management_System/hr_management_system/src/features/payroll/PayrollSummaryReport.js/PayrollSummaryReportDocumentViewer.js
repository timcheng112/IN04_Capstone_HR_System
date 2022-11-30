import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import PayrollSummaryReportDocument from "./PayrollSummaryReportDocument";

const styles = StyleSheet.create({
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

const PayrollSummaryReportDocumentViewer = ({ payslips }) => {
  return (
    <PDFViewer style={styles.viewer}>
      <PayrollSummaryReportDocument payslips={payslips} />
    </PDFViewer>
  );
};

export default PayrollSummaryReportDocumentViewer;
