import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Navbar from "../../components/Navbar";

const EditPayInformationForm = ({ employee, closeEditPayInformationForm }) => {
  const [showAddAllowanceRow, setShowAddAllowanceRow] = useState(false);
  const [allowanceName, setAllowanceName] = useState();
  const [allowanceType, setAllowanceType] = useState("Bonus");
  const [allowanceAmount, setAllowanceAmount] = useState();
  const [allowanceRemarks, setAllowanceRemarks] = useState();
  const [showAddDeductionRow, setShowAddDeductionRow] = useState(false);
  const [deductionName, setDeductionName] = useState();
  const [deductionType, setDeductionType] = useState("Damages");
  const [deductionAmount, setDeductionAmount] = useState();
  const [deductionRemarks, setDeductionRemarks] = useState();
  const [allowances, setAllowances] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [isBankInfoSaved, setIsBankInfoSaved] = useState(false);

  useEffect(() => {
    console.log(allowances);
  }, [allowances]);

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
          name: allowanceName,
          type: allowanceType.toUpperCase(),
          amount: allowanceAmount,
          remarks:
            !allowanceRemarks || allowanceRemarks === ""
              ? "-"
              : allowanceRemarks,
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
    ]);
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
          name: deductionName,
          type: deductionType.toUpperCase(),
          amount: deductionAmount,
          remarks:
            !deductionRemarks || deductionRemarks === ""
              ? "-"
              : deductionRemarks,
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
    ]);
  };

  return (
    <div>
      <div className="bg-gray-50 px-4 text-left sm:px-6">
        <button
          type="button"
          className="ml-2 mb-8 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={closeEditPayInformationForm}
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
                Bank Account Information
              </h3>
              <p className="mt-1 text-sm text-gray-600 text-start">
                Edit employee's bank information.
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
                      <input
                        type="text"
                        name="bank-name"
                        id="bank-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-600 disabled:bg-gray-100"
                        // defaultValue={employee.bankName}
                        // disabled
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        disabled={isBankInfoSaved}
                      />
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
                        value={bankAccountNumber}
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                        // disabled
                        disabled={isBankInfoSaved}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  {isBankInfoSaved && (
                    <button
                      type="button"
                      className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setIsBankInfoSaved(false)}
                    >
                      Make Changes
                    </button>
                  )}
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
                    onClick={() => setIsBankInfoSaved(true)}
                    disabled={isBankInfoSaved}
                  >
                    Save
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
                Monthly Allowances
              </h3>
              <p className="mt-1 text-sm text-gray-600 text-start">
                Add all monthly recurring allowances for the employee.
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
                    ? allowances.map((allowance) => (
                        <tr>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                            {allowance.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-900">
                            {allowance.type}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-green-600">
                            +${allowance.amount}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-900">
                            {allowance.remarks}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-900">
                            <TrashIcon
                              className="w-5 text-gray-400 hover:text-gray-900 hover:cursor-pointer"
                              onClick={() => removeAllowanceHandler(allowance)}
                            />
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
                          setAllowanceRemarks();
                        }
                      : () => {
                          setShowAddAllowanceRow(true);
                          setAllowanceName();
                          setAllowanceType("Bonus");
                          setAllowanceAmount();
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
                Monthly Deductions
              </h3>
              <p className="mt-1 text-sm text-gray-600 text-start">
                Add all monthly recurring deductions for the employee.
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
                    ? deductions.map((deduction) => (
                        <tr>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                            {deduction.name}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                            {deduction.type}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-red-600">
                            -${deduction.amount}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                            {deduction.remarks}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-900">
                            <TrashIcon
                              className="w-5 text-gray-400 hover:text-gray-900 hover:cursor-pointer"
                              onClick={() => removeDeductionHandler(deduction)}
                            />
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
                          setDeductionRemarks();
                        }
                      : () => {
                          setShowAddDeductionRow(true);
                          setDeductionName();
                          setDeductionType("Damages");
                          setDeductionAmount();
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
          onClick={() => console.log()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditPayInformationForm;