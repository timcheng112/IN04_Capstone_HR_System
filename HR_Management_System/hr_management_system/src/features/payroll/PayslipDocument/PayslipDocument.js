import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import LibroLogo from "../../../assets/libro-transparent-logo.png";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
  },
  section: {
    flexDirection: "row",
    margin: 10,
    padding: 10,
    fontSize: 10,
  },
  image: {
    // marginVertical: 15,
    // marginHorizontal: 200,
    marginHorizontal: 50,
    marginVertical: 10
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  subsection: {
    margin: 10,
    padding: 10,
    backgroundColor: "#212124",
    color: "white",
    fontSize: 10,
  },
  innerSubsection: {
    marginLeft: 14,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 10,
  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "#212124",
    color: "white",
    fontSize: 10,
  },
  itemHeader: {
    width: "60%",
    padding: 10,
  },
  amountHeader: {
    width: "40%",
    padding: 10,
  },
  itemSubHeader: {
    backgroundColor: "#D3D3D3",
    padding: 10,
    width: "60%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    borderBottom: 1,
    fontSize: 10,
  },
  item: {
    width: "60%",
    padding: 10,
  },
  amount: {
    width: "40%",
    padding: 10,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

// Create Document Component
const PayslipDocument = () => {
  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
          {/* Title */}
          <View style={styles.section}>
            <View style={{width: "40%"}}>
              <Image style={styles.image} src={LibroLogo} />
            </View>
            <View style={{width: "60%"}}>
              <Text style={styles.title}>Libro Technologies</Text>
              <Text style={styles.title}>
                Company Headquarters. Libro Technologies Ltd 1 Ubi Link, Libro
                TecHub, Singapore 408553
              </Text>
              <Text style={styles.subtitle}>
                Payslip for _Date_ to _Employer_
              </Text>
            </View>
          </View>

          {/* Name of Employer Header */}
          <View style={styles.subsection}>
            <Text>Name of Employer</Text>
          </View>
          <View style={styles.innerSubsection}>
            <Text style={styles.paragraph}>Employer's Name</Text>
          </View>

          {/* Name of Employee Header */}
          <View style={styles.subsection}>
            <Text>Name of Employee</Text>
          </View>
          <View style={styles.innerSubsection}>
            <Text style={styles.paragraph}>Employee's Name</Text>
          </View>

          {/* Item Table */}
          <View style={styles.rowHeader}>
            <Text style={styles.itemHeader}>Item</Text>
            <Text style={styles.amountHeader}>Amount</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.itemSubHeader}>Basic Salary (A)</Text>
            <Text style={styles.amount}>$1,000</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.itemSubHeader}>
              <Text>Total Allowances (B)</Text>
              <Text>(Breakdown shown below)</Text>
            </View>
            <Text style={styles.amount}>$100</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.item}></Text>
            <Text style={styles.amount}></Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.item}></Text>
            <Text style={styles.amount}></Text>
          </View>
          <View style={styles.row}>
            <View style={styles.itemSubHeader}>
              <Text>Total Deductions (C)</Text>
              <Text>(Breakdown shown below)</Text>
            </View>
            <Text style={styles.amount}>$100</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.item}>CPF Deduction:</Text>
            <Text style={styles.amount}></Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.item}>SHG Deduction:</Text>
            <Text style={styles.amount}></Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.item}></Text>
            <Text style={styles.amount}></Text>
          </View>

          {/* Date of Payment */}
          <View style={styles.subsection}>
            <Text>Date of Payment</Text>
          </View>
          <View style={styles.innerSubsection}>
            <Text style={styles.paragraph}>Date</Text>
          </View>

          {/* Mode of Payment */}
          <View style={styles.subsection}>
            <Text>Mode of Payment</Text>
          </View>
          <View style={styles.innerSubsection}>
            <Text style={styles.paragraph}>Bank Deposit</Text>
          </View>

          {/* Overtime Details */}
          <View style={styles.rowHeader}>
            <Text style={styles.itemHeader}>Overtime Details</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.itemSubHeader}>Overtime Payment Period(s)</Text>
            <Text style={styles.amount}></Text>
          </View>
          <View style={styles.row}>
            <View style={styles.itemSubHeader}>
              <Text>Overtime Hours Worked</Text>
            </View>
            <Text style={styles.amount}></Text>
          </View>
          <View style={styles.row}>
            <View style={styles.itemSubHeader}>
              <Text>Total Overtime Pay (D)</Text>
            </View>
            <Text style={styles.amount}></Text>
          </View>

          {/* Item Table for Additional Payments */}
          <View style={styles.rowHeader}>
            <Text style={styles.itemHeader}>Item</Text>
            <Text style={styles.amountHeader}>Amount</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.itemSubHeader}>
              Other Additional Payments (D)
            </Text>
            <Text style={styles.amount}></Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.item}></Text>
            <Text style={styles.amount}></Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.item}></Text>
            <Text style={styles.amount}></Text>
          </View>

          {/* Net Pay */}
          <View style={styles.rowHeader}>
            <Text style={styles.itemHeader}>Final</Text>
            <Text style={styles.amountHeader}>Amount</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.itemSubHeader}>Net Pay (A+B-C+D+E)</Text>
            <Text style={styles.amount}></Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
export default PayslipDocument;
