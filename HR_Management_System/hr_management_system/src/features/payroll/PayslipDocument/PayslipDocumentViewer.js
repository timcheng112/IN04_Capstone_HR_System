import React from "react";
import { StyleSheet, PDFViewer } from "@react-pdf/renderer";
import PayslipDocument from "./PayslipDocument";
import PayslipDocumentUrl from "./PayslipDocumentUrl";

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
      {/* <PayslipDocument /> */}
      <PayslipDocumentUrl />
    </PDFViewer>
  );
};
export default PayslipDocumentViewer;
