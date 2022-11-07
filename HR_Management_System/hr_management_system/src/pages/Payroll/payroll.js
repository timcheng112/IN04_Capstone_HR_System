import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import ComboBox from "../../components/ComboBox/ComboBox";
import Navbar from "../../components/Navbar";
import PayrollTabs from "../../features/payroll/PayrollTabs";
import api from "../../utils/api";
import EmployeesNotInPayroll from "./EmployeesNotInPayroll";
import Overview from "./Overview";
import PayrollHistory from "./PayrollHistory";
import EmployeePayrollHistory from "./ViewEmployeesPayHistory";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Payroll = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const searchParams = ["firstName", "lastName", "email"];
  const [query, setQuery] = useState("");
  const [searchFilteredEmployees, setSearchFilteredEmployees] = useState([]);
  const [isOverviewOpen, setIsOverviewOpen] = useState(true);
  const [isPayrollHistoryOpen, setIsPayrollHistoryOpen] = useState(false);
  const [isEmployeesNotInPayrollOpen, setIsEmployeesNotInPayrollOpen] =
    useState(false);
  const [isPersonalPayrollOpen, setIsPersonalPayrollOpen] = useState(false);
  const [isPayrollFormOpen, setIsPayrollFormOpen] = useState(false);

  const tabs = [
    { name: "Overview", current: isOverviewOpen },
    {
      name: "Payroll History",
      current: isPayrollHistoryOpen,
    },
    {
      name: "Employees Not In Payroll",
      current: isEmployeesNotInPayrollOpen,
    },
    {
      name: "Personal Payroll",
      current: isPersonalPayrollOpen,
    },
  ];

  const onChangeHandler = (tabName) => {
    if (tabName === "Overview") {
      setIsOverviewOpen(true);
      setIsPayrollHistoryOpen(false);
      setIsEmployeesNotInPayrollOpen(false);
      setIsPersonalPayrollOpen(false);
    } else if (tabName === "Payroll History") {
      setIsOverviewOpen(false);
      setIsPayrollHistoryOpen(true);
      setIsEmployeesNotInPayrollOpen(false);
      setIsPersonalPayrollOpen(false);
    } else if (tabName === "Employees Not In Payroll") {
      setIsOverviewOpen(false);
      setIsPayrollHistoryOpen(false);
      setIsEmployeesNotInPayrollOpen(true);
      setIsPersonalPayrollOpen(false);
    } else {
      setIsOverviewOpen(false);
      setIsPayrollHistoryOpen(false);
      setIsEmployeesNotInPayrollOpen(false);
      setIsPersonalPayrollOpen(true);
    }
  };

  useEffect(() => {
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
  }, [filteredEmployees, query]);

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
        {!isPayrollFormOpen && (
          <div className="sm:flex sm:items-center space-x-4">
            <div className="sm:flex-auto">
              <PayrollTabs tabs={tabs} onChangeHandler={onChangeHandler} />
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
              <ComboBox
                items={departments}
                searchParam={"departmentName"}
                selectedItem={selectedDepartment}
                setSelectedItem={(e) => {
                  setSelectedDepartment(e);
                  setSelectedTeam(null);
                }}
                placeholder="Search for Department"
                disabled={isPayrollHistoryOpen || isPersonalPayrollOpen}
              />
              <div className="mx-1" />
              <ComboBox
                items={selectedDepartment !== null && selectedDepartment.teams}
                searchParam={"teamName"}
                selectedItem={selectedTeam}
                setSelectedItem={setSelectedTeam}
                placeholder="Search for Team"
                disabled={
                  selectedDepartment === null ||
                  isPayrollHistoryOpen ||
                  isPersonalPayrollOpen
                }
              />
            </div>
          </div>
        )}
      </div>
      {isOverviewOpen && (
        <Overview searchFilteredEmployees={searchFilteredEmployees} />
      )}
      {isPayrollHistoryOpen && <PayrollHistory />}
      {isEmployeesNotInPayrollOpen && (
        <EmployeesNotInPayroll
          searchFilteredEmployees={searchFilteredEmployees}
          isPayrollFormOpen={isPayrollFormOpen}
          openPayrollForm={() => setIsPayrollFormOpen(true)}
          closePayrollForm={() => setIsPayrollFormOpen(false)}
        />
      )}
      {isPersonalPayrollOpen && <EmployeePayrollHistory />}
    </div>
  );
};

export default Payroll;
