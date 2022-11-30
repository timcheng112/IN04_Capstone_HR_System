import {
  Cog8ToothIcon,
  DocumentMagnifyingGlassIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { format, subDays } from "date-fns";
import React, { useEffect, useState } from "react";
import RunPayRollDialog from "../../features/payroll/RunPayrollDialog";
import api from "../../utils/api";
import EditPayInformationForm from "./EditPayInformationForm";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Overview = ({
  searchFilteredEmployees,
  isEditPayInformationFormOpen,
  openEditPayInformationForm,
  closeEditPayInformationForm,
  openPayslip,
  onChangeHandler,
}) => {
  const date = format(subDays(new Date(), 7), "MMMM yyyy");
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [isRunPayrollDialogOpen, setIsRunPayrollDialogOpen] = useState(false);

  const [totalAllowance, setTotalAllowance] = useState(0);

  // function findTotalAllowance(userId, dateString) {
  //   api
  //     .findUserAllowanceByMonth(userId, dateString)
  //     .then((res) => {
  //       if (res.data != null) {
  //         let allowances = res.data;
  //         let total = 0;
  //         for (let i = 0; i < allowances.length; i++) {
  //           console.log("getAmount: " + allowances[i].getAmount);
  //           total += allowances[i].amount;
  //         }
  //         console.log("total: " + total);
  //         return total;
  //       } else {
  //         console.info("No allowances found.");
  //         return 0;
  //       }
  //     })
  //     .catch((error) => {
  //       let message = error.request.response;
  //       console.log(message);
  //       if (message.includes("annot find allowance")) {
  //         console.log("no allowances.");
  //         return 0;
  //       } else {
  //         console.error("unknown error occured in find allowance by month.");
  //         return 0;
  //       }
  //     });
  // }

  // useEffect(() => {
  //   let val = findTotalAllowance(1, "2022-11-11");
  //   console.log("use effect called in overview. val =" + val);
  //   setTotalAllowance(val);
  // });
  function calculateUserMonthlyAllowance(employee, dateString) {
    let allowanceList = employee.currentPayInformation.allowance;
    let subString = dateString.substring(0, 8);
    let sum = 0;
    for (let i = 0; i < allowanceList.length; i++) {
      if (allowanceList[i].date.includes(subString)) {
        sum += allowanceList[i].amount;
      }
    }
    return sum;
  }

  function calculateUserMonthlyDeduction(employee, dateString) {
    let deductionList = employee.currentPayInformation.deduction;
    let subString = dateString.substring(0, 8);
    let sum = 0;
    for (let i = 0; i < deductionList.length; i++) {
      //   console.log("deduction found!");
      //   console.log("deduction date:" + deductionList[i].date);
      //   console.log("substring: " + subString);
      if (deductionList[i].date.includes(subString)) {
        sum += deductionList[i].amount;
      }
    }
    return sum;
  }

  function employeeStatusForMonth(employee, dateString) {
    let payslipList = employee.payslips;
    let subString = dateString.substring(0, 8);
    for (let i = 0; i < payslipList.length; i++) {
      if (payslipList[i].dateOfPayment.includes(subString)) {
        //found payslip for month
        return "PAID";
      }
    }
    return "UNPAID";
  }
  return (
    <div>
      {isRunPayrollDialogOpen && (
        <RunPayRollDialog
          open={isRunPayrollDialogOpen}
          onClose={() => setIsRunPayrollDialogOpen(false)}
          onChangeHandler={onChangeHandler}
        />
      )}
      {isEditPayInformationFormOpen ? (
        <EditPayInformationForm
          employee={selectedEmployee}
          closeEditPayInformationForm={closeEditPayInformationForm}
        />
      ) : (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flex flex-col">
            <div className="flex justify-between mb-4">
              <h1 className="text-start text-2xl mb-2">Payroll for {date}</h1>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                onClick={() => setIsRunPayrollDialogOpen(true)}
              >
                <Cog8ToothIcon
                  className="-ml-1 mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                Run Payroll
              </button>
            </div>
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
                          Employee Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Basic
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
                          Net Salary*
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
                        />
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {searchFilteredEmployees.map((employee, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                            {employee.firstName} {employee.lastName}
                            <p className="whitespace-nowrap text-left text-sm text-gray-500">
                              {employee.currentPosition.positionName}
                            </p>
                            <p className="whitespace-nowrap text-left text-sm text-gray-500">
                              {employee.email}
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                            {/* $10,310.00 */}$
                            {employee.currentPayInformation.basicSalary
                              ? employee.currentPayInformation.basicSalary.toLocaleString(
                                  "en-US"
                                ) + "/mth"
                              : employee.currentPayInformation.basicHourlyPay.toLocaleString(
                                  "en-US"
                                ) + "/hr"}
                            {/* {employee.gross} */}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-green-600">
                            {/* +$0 */}
                            +$
                            {calculateUserMonthlyAllowance(employee, todayStr)}
                            {/* {employee.allowances} */}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-red-600">
                            {/* -$100.31 */}
                            -$
                            {calculateUserMonthlyDeduction(employee, todayStr)}
                            {/* {employee.deductions} */}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                            {/* $10,209.69 */}$
                            {employee.currentPayInformation.basicSalary
                              ? employee.currentPayInformation.basicSalary +
                                calculateUserMonthlyAllowance(
                                  employee,
                                  todayStr
                                ) -
                                calculateUserMonthlyDeduction(
                                  employee,
                                  todayStr
                                )
                              : employee.currentPayInformation.basicHourlyPay *
                                  243 +
                                calculateUserMonthlyAllowance(
                                  employee,
                                  todayStr
                                ) -
                                calculateUserMonthlyDeduction(
                                  employee,
                                  todayStr
                                )}
                            {/* {employee.net} */}
                          </td>
                          <td
                            colSpan={2}
                            className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500"
                          >
                            <div
                              id="paidStatus"
                              className={classNames(
                                "rounded-xl w-1/2 text-center font-bold",
                                employeeStatusForMonth(employee, todayStr) ===
                                  "PAID" && "bg-green-200 text-green-700",
                                employeeStatusForMonth(employee, todayStr) ===
                                  "PENDING" && "bg-yellow-200 text-yellow-700",
                                employeeStatusForMonth(employee, todayStr) ===
                                  "UNPAID" && "bg-red-200 text-red-700"
                              )}
                            >
                              {/* PAID */}
                              {employeeStatusForMonth(employee, todayStr)}
                              {/* {employee.status} */}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                            <button
                              type="button"
                              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                              onClick={() => {
                                setSelectedEmployee(employee);
                                openEditPayInformationForm();
                              }}
                            >
                              <PencilIcon
                                className="-ml-1 mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                              Edit
                            </button>
                            <button
                              type="button"
                              className="ml-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                              // disabled
                              onClick={openPayslip}
                            >
                              <DocumentMagnifyingGlassIcon
                                className="-ml-1 mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                              View Payslip
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-500 float-right text-xs mt-4 mb-3 mr-5">
                  *please note that for employees paid hourly, net salary is
                  only an <br />
                  estimate considering a 5 day work week with 8 hours a day.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
