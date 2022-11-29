import React, { useEffect, useState } from "react";
import PayrollCard from "../../features/payroll/PayrollCard";
import api from "../../utils/api";

// const pastPayroll = [
//   {
//     date: "October 2022",
//     submissionDate: "30 October 2022",
//     numOfEmployees: "10",
//     gross: "$130,239.00",
//   },
//   {
//     date: "September 2022",
//     submissionDate: "28 September 2022",
//     numOfEmployees: "9",
//     gross: "$123,239.00",
//   },
//   {
//     date: "August 2022",
//     submissionDate: "31 August 2022",
//     numOfEmployees: "9",
//     gross: "$123,239.00",
//   },
//   {
//     date: "July 2022",
//     submissionDate: "29 July 2022",
//     numOfEmployees: "8",
//     gross: "$110,239.00",
//   },
//   {
//     date: "June 2022",
//     submissionDate: "28 June 2022",
//     numOfEmployees: "8",
//     gross: "$110,239.00",
//   },
// ];

function formatDate(dateString) {
  //change from "2019-09-01" to "June 2022"
  let year = dateString.substring(0, 4);
  let month = Number(dateString.substring(5, 7)) - 1;

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return "" + months[month] + " " + year;
}

function formatSubmissionString(dateString) {
  //change from "2019-09-01" to "28 June 2022"
  let year = dateString.substring(0, 4);
  let month = Number(dateString.substring(5, 7)) - 1;
  let day = Number(dateString.substring(8));

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return "" + day + " " + months[month] + " " + year;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PayrollHistory = ({
  openSummaryReport,
  closeSummaryReport,
  employees,
}) => {
  const [pastPayroll, setPastPayroll] = useState([]);

  useEffect(() => {
    console.log("payroll history sorting shit");
    api.getAllPayslips().then((res) => {
      if (res.data != null) {
        let payslips = res.data;
        payslips.sort(function (a, b) {
          return new Date(b.dateGenerated) - new Date(a.dateGenerated);
        });
        let payroll = [];
        let numEmployees = 0;
        let submissionDate = "";
        let date = "";
        let gross = 0;
        let temp = payslips[0].dateGenerated;
        let currMo = temp.substring(0, 8);
        for (let i = 0; i < payslips.length; i++) {
          // console.log("i = " + i);
          if (
            payslips[i].dateGenerated.includes(currMo) &&
            i + 1 == payslips.length
          ) {
            // console.log("same & last");
            //if last:
            //increment
            //push last
            numEmployees++;
            submissionDate = formatSubmissionString(payslips[i].dateGenerated);
            date = formatDate(payslips[i].dateGenerated);
            gross += payslips[i].grossSalary;
            console.log("gross + " + payslips[i].grossSalary);
            console.log("date:" + date + " gross:" + gross);
            payroll.push({
              date: date,
              submissionDate: submissionDate,
              numOfEmployees: numEmployees,
              gross: gross,
            });
          } else if (
            !payslips[i].dateGenerated.includes(currMo) &&
            i + 1 == payslips.length
          ) {
            // console.log("diff & last");
            //last & diff
            //push prev
            // reset
            //push last
            console.log("date:" + date + " gross:" + gross);
            payroll.push({
              date: date,
              submissionDate: submissionDate,
              numOfEmployees: numEmployees,
              gross: gross,
            });

            numEmployees = 1;
            submissionDate = formatSubmissionString(payslips[i].dateGenerated);
            date = formatDate(payslips[i].dateGenerated);
            gross = payslips[i].grossSalary;
            console.log("gross + " + payslips[i].grossSalary);
            currMo = payslips[i].dateGenerated.substring(0, 8);

            console.log("date:" + date + " gross:" + gross);
            payroll.push({
              date: date,
              submissionDate: submissionDate,
              numOfEmployees: numEmployees,
              gross: gross,
            });
          } else if (payslips[i].dateGenerated.includes(currMo)) {
            // console.log("same");
            //same month as last & not last.
            //increment
            numEmployees++;
            submissionDate = formatSubmissionString(payslips[i].dateGenerated);
            date = formatDate(payslips[i].dateGenerated);
            gross += payslips[i].grossSalary;
            console.log("gross + " + payslips[i].grossSalary);
          } else {
            // console.log("diff");
            //diff month as last & not last
            //push prev
            //reset
            console.log("date:" + date + " gross:" + gross);
            payroll.push({
              date: date,
              submissionDate: submissionDate,
              numOfEmployees: numEmployees,
              gross: gross,
            });
            numEmployees = 1;
            submissionDate = formatSubmissionString(payslips[i].dateGenerated);
            date = formatDate(payslips[i].dateGenerated);
            gross = payslips[i].grossSalary;
            console.log("gross + " + payslips[i].grossSalary);
            currMo = payslips[i].dateGenerated.substring(0, 8);
          }
        }
        setPastPayroll(payroll);
      }
    });
  }, [employees]);

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 grid grid-cols-3 gap-6">
          {pastPayroll.map((payroll) => (
            <PayrollCard info={payroll} openSummaryReport={openSummaryReport} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayrollHistory;
