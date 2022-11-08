import {
  Cog8ToothIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { format, subDays } from "date-fns";
import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Overview = ({ searchFilteredEmployees }) => {
  const date = format(subDays(new Date(), 7), "MMMM yyyy");

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flex flex-col">
          <div className="flex justify-between mb-4">
            <h1 className="text-start text-2xl mb-2">Payroll for {date}</h1>
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
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
                        Gross
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
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"/>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {searchFilteredEmployees.map((employee) => (
                      <tr>
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
                          $10,310.00
                          {/* {employee.gross} */}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-green-600">
                          +$0
                          {/* {employee.allowances} */}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-red-600">
                          -$100.31
                          {/* {employee.deductions} */}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                          $10,209.69
                          {/* {employee.net} */}
                        </td>
                        <td
                          colSpan={2}
                          className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500"
                        >
                          <div
                            className={classNames(
                              "rounded-xl w-1/2 text-center font-bold bg-green-200 text-green-700",
                              employee.status === "PAID" &&
                                "bg-green-200 text-green-700",
                              employee.status === "PENDING" &&
                                "bg-yellow-200 text-yellow-700",
                              employee.status === "UNPAID" &&
                                "bg-red-200 text-red-700"
                            )}
                          >
                            PAID
                            {/* {employee.status} */}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                          <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                            disabled
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
