import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { getUserId, setUserSession } from "../../utils/Common";
import ComboBox from "../../components/ComboBox/ComboBox";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar/Admin";
import Tab from "../../features/jobrequest/Tab";
import api from "../../utils/api";

const tabs = [
  { name: "Overview", href: "/payroll", current: false },
  { name: "Payroll History", href: "/payroll-history", current: false },
  {
    name: "Employees Not In Payroll",
    href: "/employees-not-in-payroll",
    current: false,
  },
  {
    name: "Personal Payroll",
    href: "/employee-payroll-history",
    current: true,
  },
];

const departments = [
  {
    name: "Sales Department",
    teams: [{ name: "Sales Team A" }, { name: "Sales Team B" }],
  },
  {
    name: "Finance Department",
    teams: [{ name: "Finance Team A" }, { name: "Finance Team B" }],
  },
];

// const months = [
//   {
//     month: "January",
//     gross: "$10,310.00",
//     allowances: "+$0",
//     deductions: "-$100.31",
//     net: "$10,209.69",
//     status: "PAID",
//     payslipAvailable: true,
//   },
//   {
//     month: "Febuary",
//     gross: "$5,210.00",
//     allowances: "+$0",
//     deductions: "-$521.00",
//     net: "$4,689.99",
//     status: "PENDING",
//     payslipAvailable: false,
//   },
//   {
//     month: "March",
//     gross: "$3,120.00",
//     allowances: "+$0",
//     deductions: "-$936.00",
//     net: "$2,184.00",
//     status: "PAID",
//     payslipAvailable: true,
//   },
//   {
//     month: "April",
//     gross: "$7,500.00",
//     allowances: "+$0",
//     deductions: "-$2,250.00",
//     net: "$5250.00",
//     status: "UNPAID",
//     payslipAvailable: false,
//   },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const EmployeePayrollHistory = () => {
  const userId = getUserId();
  const [months, setMonths] = useState([]);

  useEffect(() => {
    console.log("personal payroll history sorting stuff");
    api.findUserPayslip(userId).then((res) => {
      if (res.data != null) {
        let payslips = res.data;
        payslips.sort(function (a, b) {
          return new Date(b.dateGenerated) - new Date(a.dateGenerated);
        });
        let months = [];
        for (let i = 0; i < payslips.length; i++) {
          let payslip = payslips[i];
          let monthList = [
            "",
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
          let monthStr = monthList[payslip.monthOfPayment];
          let allowancesStr = "+$0";
          if (payslip.allowance != null) {
            allowancesStr = "+$" + payslip.allowance;
          }
          let deductionsStr = "-$0";
          if (payslip.deduction != null) {
            deductionsStr = "-$" + payslip.deduction;
          }
          let basicStr = "$0";
          if (payslip.basicSalary != null) {
            basicStr = "$" + payslip.basicSalary;
          }

          let month = {
            month: monthStr,
            gross: basicStr,
            allowances: allowancesStr,
            deductions: deductionsStr,
            net: "$" + payslip.grossSalary,
            status: "PAID",
            payslipAvailable: true,
          };

          months.push(month);
        }
        setMonths(months);
      }
    });
  }, [userId]);

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Month
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Basic Salary
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Allowances
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Deductions
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Net Salary
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Payslip
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {months.map((month, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                          {month.month}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                          {month.gross}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-green-600">
                          {month.allowances}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-red-600">
                          {month.deductions}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                          {month.net}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                          <div
                            className={classNames(
                              "rounded-xl w-1/2 text-center font-bold",
                              month.status === "PAID" &&
                                "bg-green-200 text-green-700",
                              month.status === "PENDING" &&
                                "bg-yellow-200 text-yellow-700",
                              month.status === "UNPAID" &&
                                "bg-red-200 text-red-700"
                            )}
                          >
                            {month.status}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                          {month.payslipAvailable ? (
                            <a
                              className="text-indigo-500"
                              href="/employee-payslip"
                            >
                              View Payslip
                            </a>
                          ) : (
                            <p className="text-gray-400">View Payslip</p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePayrollHistory;
