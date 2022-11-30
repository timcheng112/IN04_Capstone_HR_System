import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import LibroLogo from "../../../assets/libro-transparent-logo.png";
import SummaryTable from "./SummaryTable";

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
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
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
  footer: {
    fontSize: 10,
    marginLeft: 10,
    marginTop: 4,
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

const invoice = {
  id: "5df3180a09ea16dc4b95f910",
  invoice_no: "201906-28",
  balance: "$2,283.74",
  company: "MANTRIX",
  email: "susanafuentes@mantrix.com",
  phone: "+1 (872) 588-3809",
  address: "922 Campus Road, Drytown, Wisconsin, 1986",
  trans_date: "2019-09-12",
  due_date: "2019-10-12",
  items: [
    {
      sno: 1,
      desc: "ad sunt culpa occaecat qui",
      qty: 5,
      rate: 405.89,
    },
    {
      sno: 2,
      desc: "cillum quis sunt qui aute",
      qty: 5,
      rate: 373.11,
    },
    {
      sno: 3,
      desc: "ea commodo labore culpa irure",
      qty: 5,
      rate: 458.61,
    },
    {
      sno: 4,
      desc: "nisi consequat et adipisicing dolor",
      qty: 10,
      rate: 725.24,
    },
    {
      sno: 5,
      desc: "proident cillum anim elit esse",
      qty: 4,
      rate: 141.02,
    },
  ],
};

const getMonthFromNumber = (number) => {
  if (number === 1) {
    return "January";
  } else if (number === 2) {
    return "February";
  } else if (number === 3) {
    return "March";
  } else if (number === 4) {
    return "April";
  } else if (number === 5) {
    return "May";
  } else if (number === 6) {
    return "June";
  } else if (number === 7) {
    return "July";
  } else if (number === 8) {
    return "August";
  } else if (number === 9) {
    return "September";
  } else if (number === 10) {
    return "October";
  } else if (number === 11) {
    return "November";
  } else {
    return "December";
  }
};

const PayrollSummaryReportDocument = ({ payslips }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={{ width: "40%" }}>
            <Image style={styles.image} src={LibroLogo} />
          </View>
          <View style={{ width: "60%" }}>
            <Text style={styles.title}>Libro Technologies</Text>
            <Text style={styles.title}>
              Company Headquarters. Libro Technologies Ltd 1 Ubi Link, Libro
              TecHub, Singapore 408553
            </Text>
          </View>
        </View>
        <View style={styles.subsection}>
          <Text>
            Payroll Summary for{" "}
            {payslips &&
              payslips.length > 0 &&
              getMonthFromNumber(payslips[0].monthOfPayment) +
                " " +
                payslips[0].yearOfPayslip}
          </Text>
        </View>
        <SummaryTable payslips={payslips} />

        <View style={styles.footer}>
          <Text>Number of Employees: {payslips && payslips.length}</Text>
        </View>
        <View style={styles.footer}>
          <Text>
            Total Employee Net Pay:{" "}
            {payslips &&
              "$" +
                payslips
                  .reduce((accumulator, object) => {
                    return accumulator + object.grossSalary;
                  }, 0)
                  .toLocaleString()}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PayrollSummaryReportDocument;
