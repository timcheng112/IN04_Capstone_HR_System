import {
  ArrowLeftIcon,
  ArrowUturnDownIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Navbar from "../../components/Navbar";
import api from "../../utils/api";

const AddToPayrollForm = ({ employee, closePayrollForm }) => {
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const [bankName, setBankName] = useState(employee.bankName);
  const [accountNumber, setAccountNumber] = useState(employee.bankAccNo);
  const [showAddAllowanceRow, setShowAddAllowanceRow] = useState(false);
  const [allowanceName, setAllowanceName] = useState();
  const [allowanceType, setAllowanceType] = useState("Bonus");
  const [allowanceAmount, setAllowanceAmount] = useState();
  const [allowanceIsFlatAmount, setAllowanceIsFlatAmount] = useState(false);
  const [allowanceIsRecurring, setAllowanceIsRecurring] = useState(false);
  const [allowanceRemarks, setAllowanceRemarks] = useState();
  const [showAddDeductionRow, setShowAddDeductionRow] = useState(false);
  const [deductionName, setDeductionName] = useState();
  const [deductionType, setDeductionType] = useState("Damages");
  const [deductionAmount, setDeductionAmount] = useState();
  const [deductionIsFlatAmount, setDeductionIsFlatAmount] = useState(false);
  const [deductionIsRecurring, setDeductionIsRecurring] = useState(false);
  const [deductionRemarks, setDeductionRemarks] = useState();
  const [allowances, setAllowances] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [isPersonalInfoVerified, setIsPersonalInfoVerified] = useState(false);
  const [isJobInfoVerified, setIsJobInfoVerified] = useState(false);
  const [isBankInfoVerified, setIsBankInfoVerified] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    console.log(allowances);
  }, [allowances]);

  useEffect(() => {
    api
      .findUserAllowanceByMonth(employee.userId, todayStr)
      .then((res) => {
        if (res.data != null) {
          let allowancesRaw = res.data;
          let allowancesObj = [];

          for (let i = 0; i < allowancesRaw.length; i++) {
            let allowance = allowancesRaw[i];
            allowancesObj.push({
              id: allowance.allowanceId,
              name: allowance.allowanceName,
              type: allowance.allowanceType,
              amount: allowance.amount,
              remarks: allowance.remarks,
              deleted: false,
            });
          }
          setAllowances([...allowances, ...allowancesObj]);
        }
      })
      .catch((error) => {
        let message = error.request.response;
        if (message.includes("Cannot find allowances")) {
          console.log("no existing allowances.");
        } else {
          // alert("Cannot find shift.");
          console.log("unknown:" + message);
        }
      });
    //not sure what to put in refresh key.
  }, [refreshKey]);

  useEffect(() => {
    api
      .findUserDeductionByMonth(employee.userId, todayStr)
      .then((res) => {
        if (res.data != null) {
          let deductionsRaw = res.data;
          let deductionsObj = [];

          for (let i = 0; i < deductionsRaw.length; i++) {
            let deduction = deductionsRaw[i];
            deductionsObj.push({
              id: deduction.deductionId,
              name: deduction.deductionName,
              type: deduction.deductionType,
              amount: deduction.amount,
              remarks: deduction.remarks,
              deleted: false,
            });
          }
          setDeductions([...deductions, ...deductionsObj]);
        }
      })
      .catch((error) => {
        let message = error.request.response;
        if (message.includes("Cannot find deduction")) {
          console.log("no existing deductions.");
        } else {
          // alert("Cannot find shift.");
          console.log("unknown:" + message);
        }
      });
    //not sure what to put in refresh key.
  }, [refreshKey]);

  const addAllowanceHandler = () => {
    if (
      allowanceName !== null &&
      allowanceAmount !== null &&
      allowanceName !== "" &&
      allowanceAmount > 0 &&
      !isNaN(allowanceAmount)
    ) {
      setAllowances([
        ...allowances,
        {
          id: null,
          name: allowanceName,
          type: allowanceType.toUpperCase(),
          amount: allowanceAmount,
          remarks:
            !allowanceRemarks || allowanceRemarks === ""
              ? "-"
              : allowanceRemarks,
          deleted: false,
        },
      ]);
      setShowAddAllowanceRow(false);
      setAllowanceName();
      setAllowanceType("Bonus");
      setAllowanceAmount();
      setAllowanceRemarks();
    } else {
      alert("Invalid Inputs!");
    }
  };

  const removeAllowanceHandler = (allowance) => {
    setAllowances([
      ...allowances.filter(
        (filteredAllowance) => filteredAllowance !== allowance
      ),
      {
        id: allowance.id,
        name: allowance.name,
        type: allowance.type,
        amount: allowance.amount,
        remarks: allowance.remarks,
        deleted: true,
      },
    ]);
    console.log("removed allowance: " + allowance.name);
  };

  const unremoveAllowanceHandler = (allowance) => {
    setAllowances([
      ...allowances.filter(
        (filteredAllowance) => filteredAllowance !== allowance
      ),
      {
        id: allowance.id,
        name: allowance.name,
        type: allowance.type,
        amount: allowance.amount,
        remarks: allowance.remarks,
        deleted: false,
      },
    ]);
    console.log("cancelled removed allowance: " + allowance.name);
  };

  const addDeductionHandler = () => {
    if (
      deductionName !== null &&
      deductionAmount !== null &&
      deductionName !== "" &&
      deductionAmount > 0 &&
      !isNaN(deductionAmount)
    ) {
      setDeductions([
        ...deductions,
        {
          id: null,
          name: deductionName,
          type: deductionType.toUpperCase(),
          amount: deductionAmount,
          remarks:
            !deductionRemarks || deductionRemarks === ""
              ? "-"
              : deductionRemarks,
          deleted: false,
        },
      ]);
      setShowAddDeductionRow(false);
      setDeductionName();
      setDeductionType("Damages");
      setDeductionAmount();
    } else {
      alert("Invalid Inputs!");
    }
  };

  const removeDeductionHandler = (deduction) => {
    setDeductions([
      ...deductions.filter(
        (filteredDeduction) => filteredDeduction !== deduction
      ),
      {
        id: deduction.id,
        name: deduction.name,
        type: deduction.type,
        amount: deduction.amount,
        remarks: deduction.remarks,
        deleted: true,
      },
    ]);
  };

  const unremoveDeductionHandler = (deduction) => {
    setDeductions([
      ...deductions.filter(
        (filteredDeduction) => filteredDeduction !== deduction
      ),
      {
        id: deduction.id,
        name: deduction.name,
        type: deduction.type,
        amount: deduction.amount,
        remarks: deduction.remarks,
        deleted: false,
      },
    ]);
    console.log("cancelled removed allowance: " + deduction.name);
  };

  const saveHandler = () => {
    if (isPersonalInfoVerified && isJobInfoVerified && isBankInfoVerified) {
      // api
      //   .updateUserBankInfo(employee.userId, bankName, accountNumber)
      //   .then((res) => {
      //     if (res.data === true) {
      //       console.log("successfully updated bank info!");
      //     }
      //   });

      // call 2 apis, one to add one to delete.
      let deleteAllowance = []; //list of allowance IDs to be deleted.
      let createAllowance = []; //list of allowances to be created.

      for (let i = 0; i < allowances.length; i++) {
        let allowance = allowances[i];
        if (allowance.deleted === true && allowance.id !== null) {
          //add to deleteAllowance list
          deleteAllowance.push(Number(allowance.id));
          console.log(typeof deleteAllowance[0]);
        } else if (allowance.id == null && allowance.deleted === false) {
          //create new allowance
          createAllowance.push({
            allowanceName: allowance.name,
            amount: allowance.amount,
            remarks: allowance.remarks,
            date: todayStr,
            allowanceType: allowance.type,
          });
        }
      }

      let deleteDeduction = [];
      let createDeduction = [];

      for (let i = 0; i < deductions.length; i++) {
        let deduction = deductions[i];
        if (deduction.deleted === true && deduction.id !== null) {
          //add to deleteAllowance list
          deleteDeduction.push(Number(deduction.id));
        } else if (deduction.id == null && deduction.deleted === false) {
          //create new allowance
          createDeduction.push({
            deductionName: deduction.name,
            amount: deduction.amount,
            remarks: deduction.remarks,
            date: todayStr,
            deductionType: deduction.type,
          });
        }
      }

      const tempPayInformation = {
        allowance: createAllowance,
        deduction: createDeduction,
      };

      api
        .editUserPayrollInformation(
          employee.userId,
          bankName,
          accountNumber,
          tempPayInformation
        )
        .then((response) => {
          setAllowances([]);
          setDeductions([]);
          alert(
            "Successfully added " +
              employee.firstName +
              " " +
              employee.lastName +
              " to payroll!"
          );
          closePayrollForm();
          setRefreshKey(refreshKey + 1);
        });

      // //employee.userId
      // //api.createallowancelist?
      // if (createAllowance.length > 0) {
      //   api.createAllowances(employee.userId, createAllowance).then((res) => {
      //     if (res.data === true) {
      //       console.log("created allowances.");
      //     }
      //   });
      // }

      // //api.deleteallowancelist?
      // if (deleteAllowance.length > 0) {
      //   api.deleteAllowanceList(deleteAllowance).then((res) => {
      //     if (res.data === true) {
      //       console.log("removed allowances.");
      //     }
      //   });
      // }

      // if (createDeduction.length > 0) {
      //   api.createDeductions(employee.userId, createDeduction).then((res) => {
      //     if (res.data === true) {
      //       console.log("created deductions.");
      //     }
      //   });
      // }

      // if (deleteDeduction.length > 0) {
      //   api.deleteDeductionList(deleteDeduction).then((res) => {
      //     if (res.data === true) {
      //       console.log("removed deductions.");
      //     }
      //   });
      // }

      // setAllowances([]);
      // setDeductions([]);
      // alert(
      //   "Successfully added " +
      //     employee.firstName +
      //     " " +
      //     employee.lastName +
      //     " to payroll!"
      // );
      // closePayrollForm();
      // setRefreshKey(refreshKey + 1);
    } else {
      let msg = "";
      msg += !isPersonalInfoVerified ? "Personal Information; " : "";
      msg += !isJobInfoVerified ? "Job Information; " : "";
      msg += !isBankInfoVerified ? "Bank Information; " : "";
      alert("Please verify " + msg);
    }
  };

  const submitHandler = () => {
    if (isPersonalInfoVerified && isJobInfoVerified && isBankInfoVerified) {
      const temp = {
        // allowanceTemplates: allowances,
        // deductionTemplates: deductions,
        allowance: allowances,
        deduction: deductions,
      };
      api
        .editUserPayrollInformation(
          employee.userId,
          bankName,
          accountNumber,
          temp
        )
        .then(() => {
          alert(
            "Successfully added " +
              employee.firstName +
              " " +
              employee.lastName +
              " to payroll!"
          );
          closePayrollForm();
        })
        .catch((error) => alert(error.response.data.message));
    } else {
      let msg = "";
      msg += !isPersonalInfoVerified ? "Personal Information; " : "";
      msg += !isJobInfoVerified ? "Job Information; " : "";
      msg += !isBankInfoVerified ? "Bank Information; " : "";
      alert("Please verify " + msg);
    }
  };

  return (
    <div>
      <div className="bg-gray-50 px-4 text-left sm:px-6">
        <button
          type="button"
          className="ml-2 mb-8 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={closePayrollForm}
        >
          <ArrowLeftIcon className="w-5 mr-1" />
          Go Back
        </button>
      </div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-9">
              <h3 className="text-lg font-bold leading-6 text-gray-900 text-start">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-600 text-start">
                Please verify the information.
              </p>
            </div>
          </div>

          <div className="mt-5 mr-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm text-gray-700 text-start font-bold"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                        // defaultValue={location.state.employee.firstName}
                        defaultValue={employee.firstName}
                        disabled
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-bold text-gray-700 text-start"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                        // defaultValue={location.state.employee.lastName}
                        defaultValue={employee.lastName}
                        disabled
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-bold text-gray-700 text-start"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                        // defaultValue={location.state.employee.email}
                        defaultValue={employee.email}
                        disabled
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="dob"
                        className="block text-sm font-bold text-gray-700 text-start"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="text"
                        name="dob"
                        id="dob"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                        // defaultValue={location.state.employee.dob}
                        defaultValue={employee.dob}
                        disabled
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="race"
                        className="block text-sm font-bold text-gray-700 text-start"
                      >
                        Race
                      </label>
                      <input
                        type="text"
                        name="race"
                        id="race"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                        // defaultValue={location.state.employee.race}
                        defaultValue={employee.race}
                        disabled
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="citizenship"
                        className="block text-sm font-bold text-gray-700 text-start"
                      >
                        Citizenship
                      </label>
                      <input
                        type="text"
                        name="citizenship"
                        id="citizenship"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                        // defaultValue={location.state.employee.citizenship}
                        defaultValue={employee.citizenship}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
                    onClick={() => setIsPersonalInfoVerified(true)}
                    disabled={isPersonalInfoVerified}
                  >
                    {isPersonalInfoVerified ? "Verified" : "Verify"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-9">
              <h3 className="text-lg font-bold leading-6 text-gray-900 text-start">
                Job Information
              </h3>
              <p className="mt-1 text-sm text-gray-600 text-start">
                Please verify the information.
              </p>
            </div>
          </div>

          <div className="mt-5 mr-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="salary-amount"
                        className="block text-sm font-bold text-gray-700 text-start"
                      >
                        Position
                      </label>
                      <input
                        type="text"
                        name="salary-amount"
                        id="salary-amount"
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                        defaultValue={employee.currentPosition.positionName}
                        disabled
                      />
                    </div>

                    {employee.currentPayInformation.basicSalary ? (
                      <div className="col-span-6 sm:col-span-6">
                        <label
                          htmlFor="salary-amount"
                          className="block text-sm font-bold text-gray-700 text-start"
                        >
                          Basic Salary Amount
                        </label>
                        <input
                          type="text"
                          name="salary-amount"
                          id="salary-amount"
                          autoComplete="family-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                          defaultValue={employee.currentPayInformation.basicSalary.toLocaleString(
                            "en-US"
                          )}
                          disabled
                        />
                      </div>
                    ) : (
                      <>
                        <div className="col-span-6 sm:col-span-6">
                          <label
                            htmlFor="salary-amount"
                            className="block text-sm font-bold text-gray-700 text-start"
                          >
                            Basic Hourly Pay
                          </label>
                          <input
                            type="text"
                            name="salary-amount"
                            id="salary-amount"
                            autoComplete="family-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                            defaultValue={employee.currentPayInformation.basicHourlyPay.toLocaleString(
                              "en-US"
                            )}
                            disabled
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="weekend-hourly-salary"
                            className="block text-sm font-bold text-gray-700 text-start"
                          >
                            Weekend Hourly Salary
                          </label>
                          <input
                            type="text"
                            name="weekend-hourly-salary"
                            id="weekend-hourly-salary"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                            defaultValue={employee.currentPayInformation.weekendHourlyPay.toLocaleString(
                              "en-US"
                            )}
                            disabled
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="event-ph-hourly-pay"
                            className="block text-sm font-bold text-gray-700 text-start"
                          >
                            Event or Public Holiday Hourly Salary
                          </label>
                          <input
                            type="text"
                            name="event-ph-hourly-pay"
                            id="event-ph-hourly-pay"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                            defaultValue={employee.currentPayInformation.eventPhHourlyPay.toLocaleString(
                              "en-US"
                            )}
                            disabled
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
                    disabled={isJobInfoVerified}
                    onClick={() => setIsJobInfoVerified(true)}
                  >
                    {isJobInfoVerified ? "Verified" : "Verify"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-9">
              <h3 className="text-lg font-bold leading-6 text-gray-900 text-start">
                Bank Account Information
              </h3>
              <p className="mt-1 text-sm text-gray-600 text-start">
                Please verify the information.
              </p>
            </div>
          </div>

          <div className="mt-5 mr-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="bank-name"
                        className="block text-sm font-bold text-gray-700 text-start"
                      >
                        Bank Name
                      </label>
                      <select
                        type="text"
                        name="bank-name"
                        id="bank-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                        // defaultValue={employee.bankName}
                        // disabled
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        disabled={isBankInfoVerified}
                      >
                        <option>DBS Bank</option>
                        <option>UOB Singapore</option>
                        <option>Citibank Singapore</option>
                        <option>Maybank Singapore</option>
                        <option>Standard Chartered Singapore</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="account-number"
                        className="block text-sm font-bold text-gray-700 text-start"
                      >
                        Account Number
                      </label>
                      <input
                        type="text"
                        name="account-number"
                        id="account-number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                        // defaultValue={employee.bankAccountNumber}
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        disabled={isBankInfoVerified}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  {isBankInfoVerified && (
                    <button
                      type="button"
                      className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setIsBankInfoVerified(false)}
                    >
                      Make Changes
                    </button>
                  )}
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
                    onClick={() => setIsBankInfoVerified(true)}
                    disabled={isBankInfoVerified}
                  >
                    {isBankInfoVerified ? "Verified" : "Verify"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-9">
              <h3 className="text-lg leading-6 text-gray-900 text-start font-bold">
                Allowances
              </h3>
              <p className="mt-1 text-sm text-gray-600 text-start">
                Add all allowances for the employee.
              </p>
            </div>
          </div>
          <div className="mt-5 mr-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden shadow sm:rounded-md">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Allowance Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Amount
                    </th>
                    {/* <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Is Flat Amount
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Is Recurring
                    </th> */}
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {allowances.length > 0
                    ? allowances.map((allowance, index) => (
                        <tr key={index}>
                          <td
                            className={
                              `whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6` +
                              (allowance.deleted
                                ? " line-through text-gray-500"
                                : "")
                            }
                          >
                            {allowance.name}
                          </td>
                          <td
                            className={
                              "whitespace-nowrap px-3 py-4 text-left text-sm text-gray-900" +
                              (allowance.deleted
                                ? " line-through text-gray-500"
                                : "")
                            }
                          >
                            {allowance.type}
                          </td>
                          <td
                            className={
                              "whitespace-nowrap px-3 py-4 text-left text-sm text-green-600" +
                              (allowance.deleted
                                ? " line-through text-gray-500"
                                : "")
                            }
                          >
                            +${allowance.amount}
                          </td>
                          {/* <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-green-600">
                            <input
                              type="checkbox"
                              checked={allowance.isFlatAmount}
                              disabled
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />{" "}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-green-600">
                            <input
                              type="checkbox"
                              checked={allowance.isRecurring}
                              disabled
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />{" "}
                          </td> */}
                          <td
                            className={
                              "whitespace-nowrap px-3 py-4 text-left text-sm text-gray-900" +
                              (allowance.deleted
                                ? " line-through text-gray-500"
                                : "")
                            }
                          >
                            {allowance.remarks}
                          </td>
                          {/* <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-900">
                            <TrashIcon
                              className="w-5 text-gray-400 hover:text-gray-900 hover:cursor-pointer"
                              onClick={() => removeAllowanceHandler(allowance)}
                            />
                          </td> */}
                          <td
                            className={
                              "whitespace-nowrap px-3 py-4 text-left text-sm text-gray-900" +
                              (allowance.deleted
                                ? " line-through text-gray-500"
                                : "")
                            }
                          >
                            {!allowance.deleted ? (
                              <TrashIcon
                                className="w-5 text-gray-400 hover:text-gray-900 hover:cursor-pointer"
                                onClick={() =>
                                  removeAllowanceHandler(allowance)
                                }
                              />
                            ) : (
                              <ArrowUturnDownIcon
                                className="w-5 text-gray-400 hover:text-gray-900 hover:cursor-pointer"
                                onClick={() =>
                                  unremoveAllowanceHandler(allowance)
                                }
                              />
                            )}
                          </td>
                        </tr>
                      ))
                    : !showAddAllowanceRow && (
                        <tr>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                            No Allowances
                          </td>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                        </tr>
                      )}
                  {showAddAllowanceRow && (
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                        <input
                          type="text"
                          name="allowance-name"
                          id="allowance-name"
                          placeholder="Name"
                          value={allowanceName}
                          onChange={(e) => setAllowanceName(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                        <select
                          id="allowance-type"
                          name="allowance-type"
                          autoComplete="allowance-type"
                          value={allowanceType}
                          onChange={(e) => setAllowanceType(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>Bonus</option>
                          <option>Lifestyle</option>
                          <option>Others</option>
                        </select>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-900">
                        <input
                          type="number"
                          min={1}
                          name="allowance-amount"
                          id="allowance-amount"
                          placeholder="Amount"
                          value={allowanceAmount}
                          onChange={(e) => setAllowanceAmount(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-900">
                        <input
                          id="allowance-is-flat-amount"
                          name="allowance-is-flat-amount"
                          type="checkbox"
                          value={allowanceIsFlatAmount}
                          onChange={(e) =>
                            setAllowanceIsFlatAmount(!allowanceIsFlatAmount)
                          }
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-900">
                        <input
                          id="allowance-is-recurring"
                          name="allowance-is-recurring"
                          type="checkbox"
                          value={allowanceIsRecurring}
                          onChange={(e) =>
                            setAllowanceIsRecurring(!allowanceIsRecurring)
                          }
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </td> */}
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                        <textarea
                          id="allowance-remarks"
                          name="allowance-remarks"
                          value={allowanceRemarks}
                          onChange={(e) => setAllowanceRemarks(e.target.value)}
                          rows={1}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={
                    showAddAllowanceRow
                      ? () => {
                          setShowAddAllowanceRow(false);
                          setAllowanceName();
                          setAllowanceType("Bonus");
                          setAllowanceAmount();
                          setAllowanceIsFlatAmount(false);
                          setAllowanceIsRecurring(false);
                          setAllowanceRemarks();
                        }
                      : () => {
                          setShowAddAllowanceRow(true);
                          setAllowanceName();
                          setAllowanceType("Bonus");
                          setAllowanceAmount();
                          setAllowanceIsFlatAmount(false);
                          setAllowanceIsRecurring(false);
                          setAllowanceRemarks();
                        }
                  }
                >
                  {showAddAllowanceRow ? "Cancel" : "Add"}
                </button>
                {showAddAllowanceRow && (
                  <button
                    type="button"
                    className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={addAllowanceHandler}
                  >
                    Confirm
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-9">
              <h3 className="text-lg leading-6 text-gray-900 text-start font-bold">
                Deductions
              </h3>
              <p className="mt-1 text-sm text-gray-600 text-start">
                Add all deductions for the employee.
              </p>
            </div>
          </div>
          <div className="mt-5 mb-5 mr-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden shadow sm:rounded-md">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Deduction Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Amount
                    </th>
                    {/* <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Is Flat Amount
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Is Recurring
                    </th> */}
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {deductions.length > 0
                    ? deductions.map((deduction, index) => (
                        <tr key={index}>
                          <td
                            className={
                              "whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6" +
                              (deduction.deleted
                                ? " line-through text-gray-500"
                                : "")
                            }
                          >
                            {deduction.name}
                          </td>
                          <td
                            className={
                              "whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6" +
                              (deduction.deleted
                                ? " line-through text-gray-500"
                                : "")
                            }
                          >
                            {deduction.type}
                          </td>
                          <td
                            className={
                              "whitespace-nowrap px-3 py-4 text-left text-sm text-red-600" +
                              (deduction.deleted
                                ? " line-through text-gray-500"
                                : "")
                            }
                          >
                            -${deduction.amount}
                          </td>
                          <td
                            className={
                              "whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6" +
                              (deduction.deleted
                                ? " line-through text-gray-500"
                                : "")
                            }
                          >
                            {deduction.remarks}
                          </td>
                          {/* <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-900">
                            <TrashIcon
                              className="w-5 text-gray-400 hover:text-gray-900 hover:cursor-pointer"
                              onClick={() => removeDeductionHandler(deduction)}
                            />
                          </td> */}
                          <td
                            className={
                              "whitespace-nowrap px-3 py-4 text-left text-sm text-gray-900" +
                              (deduction.deleted
                                ? " line-through text-gray-500"
                                : "")
                            }
                          >
                            {!deduction.deleted ? (
                              <TrashIcon
                                className="w-5 text-gray-400 hover:text-gray-900 hover:cursor-pointer"
                                onClick={() =>
                                  removeDeductionHandler(deduction)
                                }
                              />
                            ) : (
                              <ArrowUturnDownIcon
                                className="w-5 text-gray-400 hover:text-gray-900 hover:cursor-pointer"
                                onClick={() =>
                                  unremoveDeductionHandler(deduction)
                                }
                              />
                            )}
                          </td>
                        </tr>
                      ))
                    : !showAddDeductionRow && (
                        <tr>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                            No Deductions
                          </td>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                        </tr>
                      )}
                  {showAddDeductionRow && (
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                        <input
                          type="text"
                          name="deduction-name"
                          id="deduction-name"
                          placeholder="Name"
                          value={deductionName}
                          onChange={(e) => setDeductionName(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                        <select
                          id="deduction-type"
                          name="deduction-type"
                          autoComplete="deduction-type"
                          value={deductionType}
                          onChange={(e) => setDeductionType(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>Damages</option>
                          <option>Others</option>
                        </select>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-900">
                        <input
                          type="number"
                          min={1}
                          name="deduction-amount"
                          id="deduction-amount"
                          placeholder="Amount"
                          value={deductionAmount}
                          onChange={(e) => setDeductionAmount(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-900">
                        <input
                          id="deduction-is-flat-amount"
                          name="deduction-is-flat-amount"
                          type="checkbox"
                          value={deductionIsFlatAmount}
                          onChange={(e) =>
                            setDeductionIsFlatAmount(!deductionIsFlatAmount)
                          }
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-900">
                        <input
                          id="deduction-is-recurring"
                          name="deduction-is-recurring"
                          type="checkbox"
                          value={deductionIsRecurring}
                          onChange={(e) =>
                            setDeductionIsRecurring(!deductionIsRecurring)
                          }
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </td> */}
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                        <textarea
                          id="deduction-remarks"
                          name="deduction-remarks"
                          value={deductionRemarks}
                          onChange={(e) => setDeductionRemarks(e.target.value)}
                          rows={1}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={
                    showAddDeductionRow
                      ? () => {
                          setShowAddDeductionRow(false);
                          setDeductionName();
                          setDeductionType("Damages");
                          setDeductionAmount();
                          setDeductionIsFlatAmount(false);
                          setDeductionIsRecurring(false);
                          setDeductionRemarks();
                        }
                      : () => {
                          setShowAddDeductionRow(true);
                          setDeductionName();
                          setDeductionType("Damages");
                          setDeductionAmount();
                          setDeductionIsFlatAmount(false);
                          setDeductionIsRecurring(false);
                          setDeductionRemarks();
                        }
                  }
                >
                  {showAddDeductionRow ? "Cancel" : "Add"}
                </button>
                {showAddDeductionRow && (
                  <button
                    type="button"
                    className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={addDeductionHandler}
                  >
                    Confirm
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <button
          type="button"
          className="ml-2 mb-8 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={saveHandler}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddToPayrollForm;
