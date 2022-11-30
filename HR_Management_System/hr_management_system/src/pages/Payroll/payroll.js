import {
  ArrowDownOnSquareIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect, useRef, useState } from "react";
import ComboBox from "../../components/ComboBox/ComboBox";
import Navbar from "../../components/Navbar";
import PayrollSummaryReportDocument from "../../features/payroll/PayrollSummaryReport.js/PayrollSummaryReportDocument";
import PayrollSummaryReportDocumentViewer from "../../features/payroll/PayrollSummaryReport.js/PayrollSummaryReportDocumentViewer";
import PayrollTabs from "../../features/payroll/PayrollTabs";
import PayslipDocument from "../../features/payroll/PayslipDocument/PayslipDocument";
import PayslipDocumentViewer from "../../features/payroll/PayslipDocument/PayslipDocumentViewer";
import RunPayRollDialog from "../../features/payroll/RunPayrollDialog";
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

  const [isSummaryReportOpen, setIsSummaryReportOpen] = useState(false);
  const [isPayslipOpen, setIsPayslipOpen] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(true);
  const [isPayrollHistoryOpen, setIsPayrollHistoryOpen] = useState(false);
  const [isEmployeesNotInPayrollOpen, setIsEmployeesNotInPayrollOpen] =
    useState(false);
  const [isPersonalPayrollOpen, setIsPersonalPayrollOpen] = useState(false);
  const [isPayrollFormOpen, setIsPayrollFormOpen] = useState(false);
  const [isEditPayInformationFormOpen, setIsEditPayInformationFormOpen] =
    useState(false);

  const [loadingDocument, setLoadingDocument] = useState(false);

  const ref = document.getElementById("tabs");
  const [isPayrollTabsGone, setIsPayrollTabsGone] = useState(false);
  const [sticky, setSticky] = useState();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    !isSummaryReportOpen &&
      !isPayslipOpen &&
      !isPayrollFormOpen &&
      !isEditPayInformationFormOpen &&
      setSticky(document.getElementById("tabs").getBoundingClientRect().bottom);
    scrollPosition >= sticky
      ? setIsPayrollTabsGone(true)
      : setIsPayrollTabsGone(false);
  }, [
    ref,
    sticky,
    scrollPosition,
    isPayrollFormOpen,
    isEditPayInformationFormOpen,
    isPayslipOpen,
    isSummaryReportOpen,
  ]);

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
      setFilteredEmployees(
        employees.filter((employee) => employee.currentPayInformation.inPayroll)
      );
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
      setFilteredEmployees(
        employees.filter(
          (employee) => !employee.currentPayInformation.inPayroll
        )
      );
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
    if (isEmployeesNotInPayrollOpen) {
      api
        .getAllEmployees()
        .then((response) => {
          setEmployees(response.data);
          setFilteredEmployees(
            response.data.filter(
              (employee) => !employee.currentPayInformation.inPayroll
            )
          );
        })
        .catch((error) => console.log(error.response.data.message));
    } else {
      api
        .getAllEmployees()
        .then((response) => {
          setEmployees(response.data);
          setFilteredEmployees(
            response.data.filter(
              (employee) => employee.currentPayInformation.inPayroll
            )
          );
        })
        .catch((error) => console.log(error.response.data.message));
    }

    api
      .getAllDepartments()
      .then((response) => setDepartments(response.data))
      .catch((error) => console.log(error.response.data.message));
  }, [isPayrollFormOpen, isEditPayInformationFormOpen]);

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
      <div
        className={classNames(!isPayslipOpen && !isSummaryReportOpen && "py-5")}
      ></div>
      <div className="px-4 sm:px-6 lg:px-8">
        {!isPayslipOpen &&
          !isSummaryReportOpen &&
          !isPayrollFormOpen &&
          !isEditPayInformationFormOpen && (
            <div
              className={classNames(
                "sm:flex sm:items-center space-x-4",
                isPayrollTabsGone &&
                  "fixed top-0 w-full bg-white pr-20 shadow-xl"
              )}
              id="tabs"
            >
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
                    className={
                      "block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" +
                      ((isPayrollHistoryOpen || isPersonalPayrollOpen) &&
                        " bg-gray-200")
                    }
                    placeholder="Search"
                    type="search"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      console.log(e.target.value);
                    }}
                    disabled={isPayrollHistoryOpen || isPersonalPayrollOpen}
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
                  items={
                    selectedDepartment !== null && selectedDepartment.teams
                  }
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
      {isSummaryReportOpen && (
        <div className="flex">
          <PayrollSummaryReportDocumentViewer />
          <div className="grid grid-rows-2 shadow-xl pl-1 mb-2">
            <PDFDownloadLink
              document={<PayrollSummaryReportDocument />}
              fileName="Payroll_Summary_Report"
            >
              {({ loading }) =>
                loading ? setLoadingDocument(true) : setLoadingDocument(false)
              }
              <button
                type="button"
                className="h-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                disabled={loadingDocument}
              >
                <div className="flex justify-center">
                  <ArrowDownOnSquareIcon
                    className="h-8 w-8"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex justify-center">
                  <p className="text-xl font-bold mt-2">Export</p>
                </div>
              </button>
            </PDFDownloadLink>
            <button
              type="button"
              className="col-span-1 mt-2 rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-300"
              // disabled
              onClick={() => setIsSummaryReportOpen(false)}
            >
              <div className="flex justify-center">
                <XMarkIcon className="h-8 w-8" aria-hidden="true" />
              </div>
              <div className="flex justify-center">
                <p className="text-xl font-bold mt-2">Close</p>
              </div>
            </button>
          </div>
        </div>
      )}
      {isPayslipOpen && (
        <div className="flex">
          <PayslipDocumentViewer />
          <div className="grid grid-rows-2 shadow-xl pl-1 mb-2">
            <PDFDownloadLink
              document={<PayslipDocument />}
              fileName="Payslip_Document"
            >
              {({ loading }) =>
                loading ? setLoadingDocument(true) : setLoadingDocument(false)
              }
              <button
                type="button"
                className="h-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                disabled={loadingDocument}
              >
                <div className="flex justify-center">
                  <ArrowDownOnSquareIcon
                    className="h-8 w-8"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex justify-center">
                  <p className="text-xl font-bold mt-2">Export</p>
                </div>
              </button>
            </PDFDownloadLink>
            <button
              type="button"
              className="col-span-1 mt-2 rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-300"
              // disabled
              onClick={() => setIsPayslipOpen(false)}
            >
              <div className="flex justify-center">
                <XMarkIcon className="h-8 w-8" aria-hidden="true" />
              </div>
              <div className="flex justify-center">
                <p className="text-xl font-bold mt-2">Close</p>
              </div>
            </button>
          </div>
        </div>
      )}
      {!isPayslipOpen && !isSummaryReportOpen && isOverviewOpen && (
        <Overview
          searchFilteredEmployees={searchFilteredEmployees}
          isEditPayInformationFormOpen={isEditPayInformationFormOpen}
          openEditPayInformationForm={() =>
            setIsEditPayInformationFormOpen(true)
          }
          closeEditPayInformationForm={() =>
            setIsEditPayInformationFormOpen(false)
          }
          openPayslip={() => setIsPayslipOpen(true)}
          onChangeHandler={onChangeHandler}
        />
      )}
      {!isPayslipOpen && !isSummaryReportOpen && isPayrollHistoryOpen && (
        <PayrollHistory
          openSummaryReport={() => setIsSummaryReportOpen(true)}
          closeSummaryReport={() => setIsSummaryReportOpen(false)}
          employees={{ filteredEmployees }}
        />
      )}
      {!isPayslipOpen &&
        !isSummaryReportOpen &&
        isEmployeesNotInPayrollOpen && (
          <EmployeesNotInPayroll
            searchFilteredEmployees={searchFilteredEmployees}
            isPayrollFormOpen={isPayrollFormOpen}
            openPayrollForm={() => setIsPayrollFormOpen(true)}
            closePayrollForm={() => setIsPayrollFormOpen(false)}
          />
        )}
      {!isPayslipOpen && !isSummaryReportOpen && isPersonalPayrollOpen && (
        <EmployeePayrollHistory />
      )}
    </div>
  );
};

export default Payroll;
