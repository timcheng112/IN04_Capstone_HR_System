import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import ComboBox from "../../components/ComboBox/ComboBox";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar/Admin";
import Tab from "../../features/jobrequest/Tab";

const tabs = [
  { name: "Overview", href: "/payroll", current: true },
  { name: "Payroll History", href: "/payroll", current: false },
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

const Payroll = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <div>
      <Navbar />
      <div className="py-5"></div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center space-x-4">
          <div className="sm:flex-auto">
            {/* <h1 className="text-xl font-semibold text-gray-900">Job Requests</h1> */}
            <Tab tabs={tabs} />
          </div>
          <div className="w-full max-w-lg lg:max-w-xs">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search"
                type="search"
                // onChange={(e) => {
                //   search(e, requests);
                // }}
              />
            </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex">
            {/* <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              // onClick={() => history.push("/hiring/newjobrequest")}
            >
              New Job Request
            </button> */}
            <ComboBox
              items={departments}
              searchParam={"name"}
              selectedItem={selectedDepartment}
              setSelectedItem={(e) => {
                setSelectedDepartment(e);
                setSelectedTeam(null);
              }}
              placeholder="Search for Department"
            />
            <div className="mx-1" />
            <ComboBox
              items={selectedDepartment !== null && selectedDepartment.teams}
              searchParam={"name"}
              selectedItem={selectedTeam}
              setSelectedItem={setSelectedTeam}
              placeholder="Search for Team"
              disabled={selectedDepartment === null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
