import React from "react";
import { StyleSheet, PDFViewer } from "@react-pdf/renderer";
import PayslipDocument from "./PayslipDocument";

// Create styles
const styles = StyleSheet.create({
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

// Create Document Component
const PayslipDocumentViewer = () => {
  return (
    <PDFViewer style={styles.viewer}>
      <PayslipDocument />
    </PDFViewer>
  );
};
export default PayslipDocumentViewer;
