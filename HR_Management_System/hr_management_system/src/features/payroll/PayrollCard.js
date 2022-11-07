import React from "react";

export default function PayrollCard({ info }) {
  return (
    <div>
      <div className="border border-gray-300 bg-white px-4 py-5 sm:px-6 rounded-xl divide-y divide-gray-200">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap mb-2">
          <div className="ml-4 mt-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900 text-start font-bold">
              {info.date}
            </h3>
            <p className="mt-1 text-sm text-gray-500 text-start">
              Submitted on {info.submissionDate}.
            </p>
          </div>
          <div className="ml-4 mt-4 flex-shrink-0">
            <button
              type="button"
              className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              View Summary Report
            </button>
          </div>
        </div>
        <div className="text-start text-gray-900 text-lg pt-3">
          <p>{info.numOfEmployees} Employees</p>
          <p>{info.gross} Gross</p>
        </div>
      </div>
    </div>
  );
}
