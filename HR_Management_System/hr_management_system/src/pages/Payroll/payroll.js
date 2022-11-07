import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import ComboBox from "../../components/ComboBox/ComboBox";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/Sidebar/Admin";
import Tab from "../../features/jobrequest/Tab";
import api from "../../utils/api";

const tabs = [
  { name: "Overview", href: "/payroll", current: true },
  { name: "Payroll History", href: "/payroll-history", current: false },
  {
    name: "Employees Not In Payroll",
    href: "/employees-not-in-payroll",
    current: false,
  },
  {
    name: "Personal Payroll",
    href: "/employee-payroll-history",
    current: false,
  },
];

// const departments = [
//   {
//     name: "Sales Department",
//     teams: [{ name: "Sales Team A" }, { name: "Sales Team B" }],
//   },
//   {
//     name: "Finance Department",
//     teams: [{ name: "Finance Team A" }, { name: "Finance Team B" }],
//   },
// ];

// const employees = [
//   {
//     name: "Jenny Wilson",
//     email: "jennyw@libro.com",
//     gross: "$10,310.00",
//     allowances: "+$0",
//     deductions: "-$100.31",
//     net: "$10,209.69",
//     status: "PAID",
//   },
//   {
//     name: "Jane Cooper",
//     email: "janec@libro.com",
//     gross: "$5,210.00",
//     allowances: "+$0",
//     deductions: "-$521.00",
//     net: "$4,689.99",
//     status: "PENDING",
//   },
//   {
//     name: "Guy Hawkins",
//     email: "guyhawkins@libro.com",
//     gross: "$3,120.00",
//     allowances: "+$0",
//     deductions: "-$936.00",
//     net: "$2,184.00",
//     status: "PAID",
//   },
//   {
//     name: "Cody Fisher",
//     email: "codyfisher@libro.com",
//     gross: "$7,500.00",
//     allowances: "+$0",
//     deductions: "-$2,250.00",
//     net: "$5250.00",
//     status: "UNPAID",
//   },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Payroll = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const searchParams = ["firstName", "lastName", "email"];
  const [query, setQuery] = useState("");
  const [searchFilteredEmployees, setSearchFilteredEmployees] = useState([]);

  useEffect(() => {
    console.log(filteredEmployees);
    console.log(
      filteredEmployees.filter(
        (employee) =>
          employee[searchParams[0]]
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1 ||
          employee[searchParams[1]]
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1 ||
          employee[searchParams[2]]
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
      )
    );
    setSearchFilteredEmployees(
      query === ""
        ? filteredEmployees
        : filteredEmployees.filter(
            (employee) =>
              employee[searchParams[0]]
                .toString()
                .toLowerCase()
                .indexOf(query.toLowerCase()) > -1 ||
              employee[searchParams[1]]
                .toString()
                .toLowerCase()
                .indexOf(query.toLowerCase()) > -1 ||
              employee[searchParams[2]]
                .toString()
                .toLowerCase()
                .indexOf(query.toLowerCase()) > -1
          )
    );
  }, [filteredEmployees, query, searchParams]);

  useEffect(() => {
    api
      .getAllEmployees()
      .then((response) => {
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      })
      .catch((error) => console.log(error.response.data.message));

    api
      .getAllDepartments()
      .then((response) => setDepartments(response.data))
      .catch((error) => console.log(error.response.data.message));
  }, []);

  const filterByDepartment = () => {
    setFilteredEmployees([
      ...employees.filter((employee) =>
        employee.teams.some(
          (team) =>
            team.department.departmentId === selectedDepartment.departmentId
        )
      ),
    ]);
  };

  const filterByTeam = () => {
    setFilteredEmployees([
      ...employees.filter((employee) =>
        employee.teams.some((team) => team.teamId === selectedTeam.teamId)
      ),
    ]);
  };

  useEffect(() => {
    if (selectedDepartment !== null) {
      filterByDepartment();
    } else {
      setFilteredEmployees(employees);
    }
  }, [selectedDepartment]);

  useEffect(() => {
    if (selectedTeam !== null) {
      filterByTeam();
    } else if (selectedDepartment !== null) {
      filterByDepartment();
    } else {
      setFilteredEmployees(employees);
    }
  }, [selectedTeam]);

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
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  console.log(e.target.value);
                }}
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
              searchParam={"departmentName"}
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
              searchParam={"teamName"}
              selectedItem={selectedTeam}
              setSelectedItem={setSelectedTeam}
              placeholder="Search for Team"
              disabled={selectedDepartment === null}
            />
          </div>
        </div>
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

export default Payroll;
