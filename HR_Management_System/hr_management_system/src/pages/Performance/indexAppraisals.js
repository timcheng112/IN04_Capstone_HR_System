import { React } from "react";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import { useHistory } from "react-router-dom";
import PerformanceSidebar from "../../components/Sidebar/Performance";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  PauseIcon,
  PencilIcon,
  PlayCircleIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import Moment from "react-moment";
import { format, getDay, nextDay } from "date-fns";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

export default function Appraisals() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [hrMode, setHrMode] = useState(false);
  const [appraisalPeriods, setAppraisalPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");
  const [isManager, setIsManager] = useState(false);
  const [appraisals, setAppraisals] = useState([]);
  const [myAppraisals, setMyAppraisals] = useState([]);
  const [organizationHead, setOrganizationHead] = useState(false);
  const [allAppraisals, setAllAppraisals] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const history = useHistory();

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        //console.log(user);
      })
      .catch((error) => setError(error));

    api.getAllAppraisalPeriods().then((response) => {
      setAppraisalPeriods(response.data);
      setSelectedPeriod(response.data[0]);
      //console.log(response.data[0]);
    });

    api.getAppraisalPeriodByYear(new Date().getFullYear()).then((response) => {
      setCurrentPeriod(response.data);
      setStartDate(response.data.startDate);
      setEndDate(response.data.endDate);
      console.log(response.data);
    });

    api.getIsTeamHead(getUserId()).then((response) => {
      //console.log(response.data);
      if (response.data > -1) {
        setIsManager(true);
        api
          .getManagerAppraisals(new Date().getFullYear(), getUserId())
          .then((response) => {
            setAppraisals(response.data);
            console.log(response.data);
          });
      }
    });

    api.getIsDepartmentHead(getUserId()).then((response) => {
      if (response.data > -1) {
        setIsManager(true);
        //console.log("department head");
        api
          .getDepartmentAppraisals(new Date().getFullYear(), getUserId())
          .then((response) => setAppraisals(response.data));
      }
    });

    api.getIsOrganizationHead(getUserId()).then((response) => {
      if (response.data > -1) {
        setOrganizationHead(true);
        setIsManager(true);
        console.log("organization head");
        api
          .getOrganizationAppraisals(new Date().getFullYear(), getUserId())
          .then((response) => setAppraisals(response.data));
      }
    });

    api
      .getEmployeeAppraisals(new Date().getFullYear(), getUserId())
      .then((response) => {
        console.log(response.data.length);
        setMyAppraisals(response.data);
      });

    api.getAllAppraisalsByYear(new Date().getFullYear()).then((response) => {
      console.log(response.data);
      const a = response.data.filter(
        (a) => a.employee.userId + "" !== getUserId() + ""
      );
      console.log(a);
      setAllAppraisals(a);
    });
  }, []);

  useEffect(() => {
    //console.log('refresh');
    var selectedYear = new Date().getFullYear();
    if (currentPeriod) {
      console.log("current period " + currentPeriod);
      selectedYear = currentPeriod;
    }

    api.getAllAppraisalPeriods().then((response) => {
      setAppraisalPeriods(response.data);
      setSelectedPeriod(response.data[0]);
      //console.log(response.data[0]);
    });

    api.getAppraisalPeriodByYear(selectedYear).then((response) => {
      setCurrentPeriod(response.data);
      setStartDate(response.data.startDate);
      setEndDate(response.data.endDate);
      console.log(response.data);
    });

    api.getIsTeamHead(getUserId()).then((response) => {
      //console.log(response.data);
      if (response.data > -1) {
        setIsManager(true);
        api.getManagerAppraisals(selectedYear, getUserId()).then((response) => {
          setAppraisals(response.data);
          console.log(response.data);
        });
      }
    });

    api.getIsDepartmentHead(getUserId()).then((response) => {
      if (response.data > -1) {
        setIsManager(true);
        //console.log("department head");
        //console.log("dept head " + selectedYear);
        api
          .getDepartmentAppraisals(selectedYear, getUserId())
          .then((response) => {
            setAppraisals(response.data);
            console.log(response.data);
          });
      }
    });

    api.getIsOrganizationHead(getUserId()).then((response) => {
      if (response.data > -1) {
        setOrganizationHead(true);
        setIsManager(true);
        console.log("organization head");
        api
          .getOrganizationAppraisals(selectedYear, getUserId())
          .then((response) => setAppraisals(response.data));
      }
    });

    api
      .getEmployeeAppraisals(selectedYear, getUserId())
      .then((response) => {
        console.log(response.data.length);
        setMyAppraisals(response.data);
      });

    api.getAllAppraisalsByYear(selectedYear).then((response) => {
      console.log(response.data);
      const a = response.data.filter(
        (a) => a.employee.userId + "" !== getUserId() + ""
      );
      console.log(a);
      setAllAppraisals(a);
    });
  }, [refresh]);

  if (error) return `Error`;

  const editAppraisalPeriod = (evt) => {
    evt.preventDefault();
    setEditMode(false);

    api.updateAppraisalPeriod(startDate, endDate).then((response) => {
      alert(response.data);
      setRefresh(!refresh);
    });
  };

  const deleteAppraisalPeriod = (evt) => {
    evt.preventDefault();

    const incomplete = allAppraisals.filter((a) => a.status === "Incomplete");
    console.log(parseInt(allAppraisals.length) - parseInt(incomplete.length));

    if (incomplete.length === allAppraisals.length) {
      api
        .deleteAppraisalPeriod(currentPeriod.startDate.substring(0, 4))
        .then((response) => {
          alert(response.data);
          setRefresh(!refresh);
        });
    } else {
      alert(
        "There are " +
          (parseInt(allAppraisals.length) - parseInt(incomplete.length)) +
          " appraisal(s) that have been started, in progress or completed. Cannot delete appraisal period."
      );
    }
  };

  function withinCurrentPeriod() {
    const now = new Date().setHours(0, 0, 0, 0);
    //console.log("now? " + startDate + " - " + endDate);
    return (
      now >= new Date(startDate).setHours(0, 0, 0, 0) &&
      now <= new Date(endDate).setHours(0, 0, 0, 0)
    );
  }

  function afterAppraisalPeriod() {
    const now = new Date().setHours(0, 0, 0, 0);
    //console.log("after? " + startDate + " - " + endDate);
    return (
      now >= new Date(startDate).setHours(0, 0, 0, 0) &&
      now >= new Date(endDate).setHours(0, 0, 0, 0)
    );
  }

  function beforeAppraisalPeriod() {
    const now = new Date().setHours(0, 0, 0, 0);
    //console.log("after? " + startDate + " - " + endDate);
    return (
      now < new Date(startDate).setHours(0, 0, 0, 0) &&
      now < new Date(endDate).setHours(0, 0, 0, 0)
    );
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const appraisalPeriod = {
      year: newStart.substring(0, 4),
      startDate: newStart,
      endDate: newEnd,
    };

    api
      .addAppraisalPeriod(appraisalPeriod)
      .then((response) => {
        alert(
          "Appraisal period for " +
            newStart.substring(0, 4) +
            " has been created"
        );
        setRefresh(!refresh);
      })
      .catch((error) => setRefresh(!refresh));
  };

  function renderAppraisalStatus(item) {
    if (item.status === "Incomplete") {
      return (
        <div className="flex row">
          <XCircleIcon
            className="mr-1.5 h-5 w-5 font-sans flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          Incomplete
        </div>
      );
    } else if (item.status === "In Progress") {
      return (
        <div className="flex row">
          <PlayCircleIcon
            className="mr-1.5 h-5 w-5 font-sans flex-shrink-0 text-amber-400"
            aria-hidden="true"
          />
          In Progress
        </div>
      );
    } else if (item.status === "Completed") {
      return (
        <div className="flex row">
          <CheckCircleIcon
            className="mr-1.5 h-5 w-5 font-sans flex-shrink-0 text-green-400"
            aria-hidden="true"
          />
          Completed
        </div>
      );
    } else {
      return (
        <div className="flex row">
          <XCircleIcon
            className="mr-1.5 h-5 w-5 font-sans flex-shrink-0 text-red-400"
            aria-hidden="true"
          />
          Overdue
        </div>
      );
    }
  }

  function renderMyAppraisalStatus(appraisal) {
    if (appraisal.status === "Completed") {
      return (
        <a
          href={`/performance/myappraisal/${appraisal.appraisalId}`}
          className="block hover:bg-gray-50"
        >
          <div className="flex items-center px-4 py-4 sm:px-6">
            <div className="flex min-w-0 flex-1 items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full"
                  src={appraisal.profilePic}
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <div className="flex">
                    <span className="inline mr-1 text-sm text-left font-medium text-gray-900">
                      Appraised by
                    </span>
                    <span className="inline text-sm text-left font-medium text-indigo-600">
                      {appraisal.managerAppraising.firstName}{" "}
                      {appraisal.managerAppraising.lastName}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <EnvelopeIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="truncate">
                      {appraisal.managerAppraising.workEmail}
                    </span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div>
                    {renderAppraisalStatus(appraisal)}
                    {/* <p className="text-sm text-gray-900 text-left"></p>
                    <p className="mt-2 flex items-center text-sm text-gray-500"></p> */}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ChevronRightIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        </a>
      );
    } else {
      return (
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center">
            <div className="flex-shrink-0">
              <img
                className="h-12 w-12 rounded-full"
                src={appraisal.profilePic}
                alt=""
              />
            </div>
            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <div className="flex">
                  <span className="inline mr-1 text-sm text-left font-medium text-gray-900">
                    Appraised by
                  </span>
                  <span className="inline text-sm text-left font-medium text-indigo-600">
                    {appraisal.managerAppraising.firstName}{" "}
                    {appraisal.managerAppraising.lastName}
                  </span>
                </div>
                <span className="mt-2 flex items-center text-sm text-gray-500">
                  <EnvelopeIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="truncate">
                    {appraisal.managerAppraising.workEmail}
                  </span>
                </span>
              </div>
              <div className="hidden md:block">
                <div>
                  <p className="text-sm text-gray-900 text-left"></p>
                  <p className="mt-2 flex items-center text-sm text-gray-500">
                    {renderAppraisalStatus(appraisal)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ChevronRightIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
      );
    }
  }

  function renderOverdueHeader(appraisals) {
    const overdueCount = appraisals.filter(
      (a) => a.status === "Overdue"
    ).length;
    //console.log(overdueCount);
    if (overdueCount > 0) {
      return (
        <>
          <h1 className="mt-5 font-semibold text-red-600">
            My Team Appraisals
            <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 ml-1 text-sm font-medium font-semibold text-red-800">
              {overdueCount}
            </span>
          </h1>
        </>
      );
    } else {
      return (
        <>
          <h1 className="mt-5 font-semibold">My Team Appraisals</h1>
        </>
      );
    }
  }

  function handleEdit() {
    const incomplete = allAppraisals.filter((a) => a.status === "Incomplete");
    console.log(parseInt(allAppraisals.length) - parseInt(incomplete.length));

    if (incomplete.length === allAppraisals.length) {
      setEditMode(!editMode);
      setStartDate(currentPeriod.startDate);
      setEndDate(currentPeriod.endDate);
    } else {
      alert(
        "There are " +
          (parseInt(allAppraisals.length) - parseInt(incomplete.length)) +
          " appraisal(s) that have been started, in progress or completed. Cannot change appraisal period."
      );
      setEditMode(false);
    }
  }

  function changeSelectedPeriod(year) {
    console.log("selected period " + year);
    setCurrentPeriod(year);
    setRefresh(!refresh);
  }

  function handleViewPromotion(appraisal) {
    //console.log(appraisal.employee.userId)
    api.getPromotionRequestByEmployee(appraisal.employee.userId).then(response => {
      //console.log(response.data.promotionId)
      history.push(`/promotion/${response.data.promotionId}`)
    })
  }

  return (
    user &&
    appraisalPeriods &&
    appraisals &&
    allAppraisals && (
      <div className="">
        <Navbar />
        <div className="flex">
          <div className="flex-1">
            <PerformanceSidebar
              currentPage={{
                name: "Appraisals",
                href: "/performance/appraisals",
                current: true,
              }}
            />
          </div>
        </div>
        <div className="py-10">
          <main className="flex-1">
            <div className="flex items-center">
              <div className="mt-4 ml-auto mr-6">
                {user !== null && user.hrEmployee && (
                  <>
                    {hrMode ? (
                      <>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                          onClick={() => setHrMode(!hrMode)}
                        >
                          Non-HR Mode
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                          onClick={() => setHrMode(!hrMode)}
                        >
                          HR Mode
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <div>
              {hrMode ? (
                <>
                  <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-indigo-800 mb-10">
                      Appraisals HR Mode
                    </h1>
                  </div>
                  <div>
                    <h1 className="mx-2 font-sans font-semibold text-xl mb-5">
                      Current Appraisal Period
                    </h1>
                    {selectedPeriod ? (
                      <>
                        {editMode ? (
                          <>
                            <form onSubmit={editAppraisalPeriod}>
                              <div className="flex flex-row justify-center">
                                <div>
                                  <label
                                    htmlFor="start-date"
                                    className="block text-md font-sans font-medium text-gray-700"
                                  >
                                    Start Date
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      name="start-date"
                                      id="start-date"
                                      // min={format(
                                      //   new Date(
                                      //     new Date().getFullYear(),
                                      //     new Date().getMonth(),
                                      //     new Date().getDate()
                                      //   ),
                                      //   "yyyy-MM-dd"
                                      // )}
                                      // max={format(
                                      //   new Date(
                                      //     new Date().getFullYear(),
                                      //     12,
                                      //     31
                                      //   ),
                                      //   "yyyy-MM-dd"
                                      // )}
                                      className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      onChange={(s) =>
                                        setStartDate(s.target.value)
                                      }
                                      value={startDate}
                                    />
                                  </div>
                                </div>
                                {"to"}
                                <div>
                                  <label
                                    htmlFor="end-date"
                                    className="block text-md font-sans font-medium text-gray-700"
                                  >
                                    End Date
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      name="end-date"
                                      id="end-date"
                                      className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      // min={format(
                                      //   new Date(
                                      //     new Date().getFullYear(),
                                      //     new Date().getMonth(),
                                      //     new Date().getDate()
                                      //   ),
                                      //   "yyyy-MM-dd"
                                      // )}
                                      // max={format(
                                      //   new Date(
                                      //     new Date().getFullYear(),
                                      //     12,
                                      //     31
                                      //   ),
                                      //   "yyyy-MM-dd"
                                      // )}
                                      onChange={(e) =>
                                        setEndDate(e.target.value)
                                      }
                                      value={endDate}
                                    />
                                  </div>
                                </div>
                              </div>
                              <button
                                type="submit"
                                className="inline-flex items-center mt-5 px-4 py-2 border border-transparent text-md font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Update
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-center mt-5 ml-5 px-4 py-2 border border-transparent text-md font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => setEditMode(false)}
                              >
                                Cancel
                              </button>
                            </form>
                          </>
                        ) : (
                          <>
                            <div className="flex flex-row justify-center">
                              <Moment
                                parse="YYYY-MM-DD"
                                className="mx-2 font-sans font-semibold"
                                locale="Asia/Singapore"
                                format="DD/MM/YYYY"
                              >
                                {currentPeriod.startDate}
                              </Moment>
                              <h1 className="mx-2 font-sans font-semibold">
                                to
                              </h1>
                              <Moment
                                parse="YYYY-MM-DD"
                                className="mx-2 font-sans font-semibold"
                                locale="Asia/Singapore"
                                format="DD/MM/YYYY"
                              >
                                {currentPeriod.endDate}
                              </Moment>
                            </div>
                            <button
                              type="button"
                              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 mt-5 px-4 py-2 text-md font-sans font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => {
                                handleEdit();
                              }}
                            >
                              <PencilIcon className="h-5 w-5 mr-2" />
                              Edit
                            </button>
                            {/* <button
                              type="button"
                              className="inline-flex items-center rounded-md ml-5 border border-transparent bg-indigo-600 mt-5 px-4 py-2 text-md font-sans font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={deleteAppraisalPeriod}
                            >
                              <TrashIcon className="h-5 w-5 mr-2" />
                              Delete
                            </button> */}
                          </>
                        )}
                        <div className="mt-8 mx-20 flex flex-col">
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
                                        Manager / Appraised By
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                      >
                                        Employee
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                      >
                                        Status
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                      >
                                        Promotion Request
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200 bg-white">
                                    {allAppraisals.map((appraisal) => (
                                      <tr key={appraisal.appraisalId}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-left font-medium text-gray-900 sm:pl-6">
                                          {
                                            appraisal.managerAppraising
                                              .firstName
                                          }{" "}
                                          {appraisal.managerAppraising.lastName}
                                          <span className="mt-2 flex items-center text-sm text-gray-500">
                                            <EnvelopeIcon
                                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                              aria-hidden="true"
                                            />
                                            <span className="truncate">
                                              {
                                                appraisal.managerAppraising
                                                  .workEmail
                                              }
                                            </span>
                                          </span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-left text-gray-900">
                                          {appraisal.employee.firstName}{" "}
                                          {appraisal.employee.lastName}
                                          <span className="mt-2 flex items-center text-sm text-gray-500">
                                            <EnvelopeIcon
                                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                              aria-hidden="true"
                                            />
                                            <span className="truncate">
                                              {appraisal.employee.workEmail}
                                            </span>
                                          </span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-left text-gray-500">
                                          {renderAppraisalStatus(appraisal)}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-left text-gray-500">
                                          {appraisal.promotion ? (
                                            <>
                                              <button
                                                type="button"
                                                className="text-indigo-600"
                                                onClick={() => handleViewPromotion(appraisal)}
                                              >
                                                View
                                              </button>
                                            </>
                                          ) : (
                                            <>NA</>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <form onSubmit={handleSubmit}>
                          <p className="mt-2 text-md text-gray-800 mb-5">
                            The appraisal period has not been created for this
                            year. Please add one.
                          </p>
                          <p className="mt-2 text-md text-gray-800 mb-5">
                            An appraisal period has to be at least 14 days
                            (inclusive of working days).
                          </p>
                          <div className="flex flex-row justify-center">
                            <div>
                              <label
                                htmlFor="start-date"
                                className="block text-md font-sans font-medium text-gray-700"
                              >
                                Start Date
                              </label>
                              <div className="mt-1">
                                <input
                                  type="date"
                                  name="start-date"
                                  id="start-date"
                                  // min={format(
                                  //   new Date(
                                  //     new Date().getFullYear(),
                                  //     new Date().getMonth(),
                                  //     new Date().getDate()
                                  //   ),
                                  //   "yyyy-MM-dd"
                                  // )}
                                  // max={format(
                                  //   new Date(new Date().getFullYear(), 12, 31),
                                  //   "yyyy-MM-dd"
                                  // )}
                                  className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  onChange={(s) => setNewStart(s.target.value)}
                                />
                              </div>
                            </div>
                            {"to"}
                            <div>
                              <label
                                htmlFor="end-date"
                                className="block text-md font-sans font-medium text-gray-700"
                              >
                                End Date
                              </label>
                              <div className="mt-1">
                                <input
                                  type="date"
                                  name="end-date"
                                  id="end-date"
                                  // min={format(
                                  //   nextDay(
                                  //     new Date(
                                  //       new Date().getFullYear(),
                                  //       new Date().getMonth(),
                                  //       new Date().getDate()
                                  //     ),
                                  //     getDay(
                                  //       new Date(
                                  //         new Date().getFullYear(),
                                  //         new Date().getMonth(),
                                  //         new Date().getDate()
                                  //       )
                                  //     ) + 14
                                  //   ),
                                  //   "yyyy-MM-dd"
                                  // )}
                                  // max={format(
                                  //   new Date(2022, 12, 31),
                                  //   "yyyy-MM-dd"
                                  // )}
                                  className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  onChange={(e) => setNewEnd(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="inline-flex items-center mt-5 px-4 py-2 border border-transparent text-md font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Create
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-sans font-semibold text-gray-900 mb-10">
                    Appraisals
                  </h1>
                  <div>
                    {withinCurrentPeriod() || afterAppraisalPeriod() ? (
                      <>
                        <div className="mx-32">
                          <label
                            htmlFor="period"
                            className="block text-lg mt-5 mb-5 font-semibold text-gray-700"
                          >
                            Period
                          </label>
                          <select
                            id="period"
                            name="period"
                            className="mt-1 block font-semibold text-lg w-full rounded-md border border-gray-300 px-3 py-1 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 bg-white"
                            defaultValue={new Date().getFullYear().toString()}
                            onChange={(e) =>
                              changeSelectedPeriod(e.target.value)
                            }
                          >
                            {appraisalPeriods.map((appraisalPeriod) => (
                              <option
                                key={appraisalPeriod.appraisalPeriodId}
                                className="text-center text-lg"
                              >
                                {appraisalPeriod.year}
                              </option>
                            ))}
                          </select>
                          {withinCurrentPeriod() ? (
                            <>
                              <span className="inline-flex items-center mt-2 mb-5 rounded-full bg-green-100 px-5 py-2 text-md font-medium text-green-800">
                                Appraisal period
                                <Moment
                                  parse="YYYY-MM-DD"
                                  className="mx-2 text-md text-green-800"
                                  locale="Asia/Singapore"
                                  format="DD/MM/YYYY"
                                >
                                  {startDate}
                                </Moment>
                                {" - "}
                                <Moment
                                  parse="YYYY-MM-DD"
                                  className="mx-2 text-md text-green-800"
                                  locale="Asia/Singapore"
                                  format="DD/MM/YYYY"
                                >
                                  {endDate}
                                </Moment>
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="inline-flex items-center mt-2 mb-5 rounded-full bg-indigo-100 px-5 py-2 text-md font-medium text-indigo-800">
                                Appraisal review period
                                <Moment
                                  parse="YYYY-MM-DD"
                                  className="mx-2 text-md text-indigo-800"
                                  locale="Asia/Singapore"
                                  format="DD/MM/YYYY"
                                >
                                  {startDate}
                                </Moment>
                                {" - "}
                                <Moment
                                  parse="YYYY-MM-DD"
                                  className="mx-2 text-md text-indigo-800"
                                  locale="Asia/Singapore"
                                  format="DD/MM/YYYY"
                                >
                                  {endDate}
                                </Moment>
                              </span>
                            </>
                          )}

                          {isManager ? (
                            <>
                              {renderOverdueHeader(appraisals)}
                              <div className="overflow-hidden bg-white shadow sm:rounded-md mt-5 ">
                                <ul
                                  role="list"
                                  className="divide-y divide-gray-200"
                                >
                                  {appraisals.map((appraisal) => (
                                    <li key={appraisal.appraisalId}>
                                      <a
                                        href={`/performance/appraisal/${appraisal.appraisalId}`}
                                        className="block hover:bg-gray-50"
                                      >
                                        <div className="flex items-center px-4 py-4 sm:px-6">
                                          <div className="flex min-w-0 flex-1 items-center">
                                            <div className="flex-shrink-0">
                                              <img
                                                className="h-12 w-12 rounded-full"
                                                src=""
                                                alt=""
                                              />
                                            </div>
                                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                              <div>
                                                <p className="truncate text-sm text-left font-medium text-indigo-600">
                                                  {appraisal.employee.firstName}{" "}
                                                  {appraisal.employee.lastName}
                                                </p>
                                                <span className="mt-2 flex items-center text-sm text-gray-500">
                                                  <EnvelopeIcon
                                                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                    aria-hidden="true"
                                                  />
                                                  <span className="truncate">
                                                    {
                                                      appraisal.employee
                                                        .workEmail
                                                    }
                                                  </span>
                                                </span>
                                              </div>
                                              <div className="hidden md:block">
                                                <div>
                                                  <p className="text-sm text-gray-900 text-left"></p>
                                                  <div className="mt-2 flex items-center text-sm text-gray-500">
                                                    {renderAppraisalStatus(
                                                      appraisal
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div>
                                            <ChevronRightIcon
                                              className="h-5 w-5 text-gray-400"
                                              aria-hidden="true"
                                            />
                                          </div>
                                        </div>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {withinCurrentPeriod() ? (
                            <>
                              <h1 className="mt-5 font-semibold">
                                My Appraisals
                              </h1>
                              <div className="relative block w-full rounded-lg border-2 border-dashed border-black mt-5 p-12 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <PauseIcon className="mx-auto w-12 h-12 text-gray-500" />
                                <span className="mt-2 block text-sm font-medium text-gray-900">
                                  Appraisal(s) are still in progress
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              {!organizationHead && (
                                <h1 className="mt-5 font-semibold">
                                  My Appraisals
                                </h1>
                              )}

                              <div className="overflow-hidden bg-white shadow sm:rounded-md mt-5">
                                {myAppraisals.length > 0 ? (
                                  <>
                                    <ul
                                      role="list"
                                      className="divide-y divide-gray-200"
                                    >
                                      {myAppraisals.map((appraisal) => (
                                        <li key={appraisal.appraisalId}>
                                          {renderMyAppraisalStatus(appraisal)}
                                        </li>
                                      ))}
                                    </ul>
                                  </>
                                ) : (
                                  <>
                                    <div className="relative block w-full rounded-lg border-2 border-dashed border-black p-12 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                      <PauseIcon className="mx-auto w-12 h-12 text-gray-500" />
                                      <span className="mt-2 block text-sm font-medium text-gray-900">
                                        Appraisal(s) are still in progress
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
                            <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-20 lg:px-8">
                              <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">
                                <span className="block">
                                  No action required
                                </span>
                              </h2>
                              <div className="mt-8 flex justify-center">
                                <div className="inline-flex rounded-md shadow"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    )
  );
}
