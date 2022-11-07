import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Overview = ({ searchFilteredEmployees }) => {
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {searchFilteredEmployees.map((employee) => (
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                          {employee.firstName} {employee.lastName}
                          <p className="whitespace-nowrap py-2 text-left text-sm text-gray-500">
                            {employee.currentPosition.positionName}
                          </p>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                          {employee.email}
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
                        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
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
