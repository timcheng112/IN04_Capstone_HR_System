import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import PayrollCard from "../../features/payroll/PayrollCard";
import api from "../../utils/api";

function formatDate(dateString) {
  //change from "2019-09-01" to "June 2022"
  // 2022-05-22
  let daySubString = dateString.substring(8);
  let dayNum = Number(daySubString);

  let subString = dateString;
  if (dayNum < 7) {
    //change subString to the previous month
    let monthSubString = dateString.substring(5, 7);
    let monthNum = Number(monthSubString);
    let yearSubString = dateString.substring(0, 4);
    let yearNum = Number(yearSubString);

    if (monthNum === 1) {
      monthNum = 12;
      yearNum--;
    } else {
      monthNum--;
    }
    subString = format(new Date(yearNum, monthNum - 1, 1), "yyyy-MM-dd");
  }

  let year = subString.substring(0, 4);
  let month = Number(subString.substring(5, 7)) - 1;

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

function formatSubmissionString(subString) {
  //change from "2019-09-01" to "28 June 2022"
  let year = subString.substring(0, 4);
  let month = Number(subString.substring(5, 7)) - 1;
  let day = Number(subString.substring(8));

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
  viewSummaryReportHandler,
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
        let emails = [];
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
            emails.push(payslips[i].employee.workEmail);
            // console.log("gross + " + payslips[i].grossSalary);
            // console.log("date:" + date + " gross:" + gross);
            payroll.push({
              date: date,
              submissionDate: submissionDate,
              numOfEmployees: numEmployees,
              gross: gross,
              emails: emails,
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
            // console.log("date:" + date + " gross:" + gross);
            payroll.push({
              date: date,
              submissionDate: submissionDate,
              numOfEmployees: numEmployees,
              gross: gross,
              emails: emails,
            });

            numEmployees = 1;
            submissionDate = formatSubmissionString(payslips[i].dateGenerated);
            date = formatDate(payslips[i].dateGenerated);
            gross = payslips[i].grossSalary;
            console.log("gross + " + payslips[i].grossSalary);
            currMo = payslips[i].dateGenerated.substring(0, 8);
            emails = [payslips[i].employee.workEmail];

            // console.log("date:" + date + " gross:" + gross);
            payroll.push({
              date: date,
              submissionDate: submissionDate,
              numOfEmployees: numEmployees,
              gross: gross,
              emails: emails,
            });
          } else if (payslips[i].dateGenerated.includes(currMo)) {
            // console.log("same");
            //same month as last & not last.
            //increment
            numEmployees++;
            submissionDate = formatSubmissionString(payslips[i].dateGenerated);
            date = formatDate(payslips[i].dateGenerated);
            gross += payslips[i].grossSalary;
            emails.push(payslips[i].employee.workEmail);
            // console.log("gross + " + payslips[i].grossSalary);
          } else {
            // console.log("diff");
            //diff month as last & not last
            //push prev
            //reset
            // console.log("date:" + date + " gross:" + gross);
            payroll.push({
              date: date,
              submissionDate: submissionDate,
              numOfEmployees: numEmployees,
              gross: gross,
              emails: emails,
            });
            numEmployees = 1;
            submissionDate = formatSubmissionString(payslips[i].dateGenerated);
            date = formatDate(payslips[i].dateGenerated);
            gross = payslips[i].grossSalary;
            console.log("gross + " + payslips[i].grossSalary);
            currMo = payslips[i].dateGenerated.substring(0, 8);
            emails = [payslips[i].employee.workEmail];
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
            <PayrollCard
              info={payroll}
              openSummaryReport={openSummaryReport}
              viewSummaryReportHandler={() =>
                viewSummaryReportHandler(new Date(payroll.submissionDate))
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayrollHistory;
