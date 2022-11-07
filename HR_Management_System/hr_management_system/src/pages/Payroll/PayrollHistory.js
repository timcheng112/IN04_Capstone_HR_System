import React from "react";
import PayrollCard from "../../features/payroll/PayrollCard";

const pastPayroll = [
  {
    date: "October 2022",
    submissionDate: "30 October 2022",
    numOfEmployees: "10",
    gross: "$130,239.00",
  },
  {
    date: "September 2022",
    submissionDate: "28 September 2022",
    numOfEmployees: "9",
    gross: "$123,239.00",
  },
  {
    date: "August 2022",
    submissionDate: "31 August 2022",
    numOfEmployees: "9",
    gross: "$123,239.00",
  },
  {
    date: "July 2022",
    submissionDate: "29 July 2022",
    numOfEmployees: "8",
    gross: "$110,239.00",
  },
  {
    date: "June 2022",
    submissionDate: "28 June 2022",
    numOfEmployees: "8",
    gross: "$110,239.00",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PayrollHistory = () => {

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 grid grid-cols-3 gap-6">
          {pastPayroll.map((payroll) => (
            <PayrollCard info={payroll} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayrollHistory;
