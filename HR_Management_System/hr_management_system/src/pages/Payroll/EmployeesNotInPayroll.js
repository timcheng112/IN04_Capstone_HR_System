import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ComboBox from "../../components/ComboBox/ComboBox";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar/Admin";
import Tab from "../../features/jobrequest/Tab";
import api from "../../utils/api";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const EmployeesNotInPayroll = ({ searchFilteredEmployees }) => {
  const history = useHistory();

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flex flex-col mb-10">
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
                        Email Address
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Position
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Options
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {searchFilteredEmployees.map((employee) => (
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                          {employee.firstName} {employee.lastName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                          {employee.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                          {employee.currentPosition.positionName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                          <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() =>
                              history.push({
                                pathname:
                                  "/employees-not-in-payroll/add-to-payroll",
                                state: {},
                              })
                            }
                          >
                            <PlusIcon
                              className="-ml-1 mr-2 h-5 w-5"
                              aria-hidden="true"
                            />
                            Add to Payroll
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

export default EmployeesNotInPayroll;
