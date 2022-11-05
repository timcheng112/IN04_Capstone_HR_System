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
  PencilIcon,
  PlayCircleIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import Moment from "react-moment";

const applications = [
  {
    applicant: {
      name: "Ricardo Cooper",
      email: "ricardo.cooper@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "2020-01-07",
    dateFull: "January 7, 2020",
    stage: "Completed phone screening",
    href: "#",
  },
  {
    applicant: {
      name: "Kristen Ramos",
      email: "kristen.ramos@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "2020-01-07",
    dateFull: "January 7, 2020",
    stage: "Completed phone screening",
    href: "#",
  },
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
      if (response.data > -1) {
        setIsManager(true);
        console.log(response.data);
        api
          .getManagerAppraisals(new Date().getFullYear(), getUserId())
          .then((response) => setAppraisals(response.data));
      }
    });
  }, []);

  if (error) return `Error`;

  const editAppraisalPeriod = (evt) => {
    evt.preventDefault();

    api
      .updateAppraisalPeriod(startDate, endDate)
      .then((response) => alert(response.data));
  };

  const deleteAppraisalPeriod = (evt) => {
    evt.preventDefault();

    api
      .deleteAppraisalPeriod(currentPeriod.startDate.substring(0, 4))
      .then((response) => alert(response.data));
  };

  function withinCurrentPeriod() {
    const now = new Date().setHours(0, 0, 0, 0);
    console.log("now? " + startDate + " - " + endDate);
    return (
      now >= new Date(startDate).setHours(0, 0, 0, 0) &&
      now <= new Date(endDate).setHours(0, 0, 0, 0)
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
      .then((response) =>
        alert(
          "Appraisal period for " +
            newStart.substring(0, 4) +
            " has been created"
        )
      );
  };

  function renderAppraisalStatus(item) {
    if (item.status === "Incomplete") {
      return (
        <>
          <XCircleIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          Incomplete
        </>
      );
    } else if (item.status === "In Progress") {
      return (
        <>
          <PlayCircleIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-amber-400"
            aria-hidden="true"
          />
          In Progress
        </>
      );
    } else if (item.status === "Complete") {
      return (
        <>
          <CheckCircleIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
            aria-hidden="true"
          />
          Complete
        </>
      );
    } else {
      return (
        <>
          <XCircleIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400"
            aria-hidden="true"
          />
          Overdue
        </>
      );
    }
  }

  return (
    user &&
    appraisalPeriods &&
    appraisals && (
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
                                    className="block text-sm font-sans font-medium text-gray-700"
                                  >
                                    Start Date
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      name="start-date"
                                      id="start-date"
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
                                    className="block text-sm font-sans font-medium text-gray-700"
                                  >
                                    End Date
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      name="end-date"
                                      id="end-date"
                                      className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                                className="inline-flex items-center mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Update
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-center mt-5 ml-5 px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                                setEditMode(!editMode);
                                setStartDate(currentPeriod.startDate);
                                setEndDate(currentPeriod.endDate);
                              }}
                            >
                              <PencilIcon className="h-5 w-5 mr-2" />
                              Edit
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center rounded-md ml-5 border border-transparent bg-indigo-600 mt-5 px-4 py-2 text-md font-sans font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={deleteAppraisalPeriod}
                            >
                              <TrashIcon className="h-5 w-5 mr-2" />
                              Delete
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <form onSubmit={handleSubmit}>
                          <p className="mt-2 text-sm text-gray-800 mb-5">
                            The appraisal period has not been created
                            for this year. Please add one.
                          </p>
                          <div className="flex flex-row justify-center">
                            <div>
                              <label
                                htmlFor="start-date"
                                className="block text-sm font-sans font-medium text-gray-700"
                              >
                                Start Date
                              </label>
                              <div className="mt-1">
                                <input
                                  type="date"
                                  name="start-date"
                                  id="start-date"
                                  className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  onChange={(s) => setNewStart(s.target.value)}
                                />
                              </div>
                            </div>
                            {"to"}
                            <div>
                              <label
                                htmlFor="end-date"
                                className="block text-sm font-sans font-medium text-gray-700"
                              >
                                End Date
                              </label>
                              <div className="mt-1">
                                <input
                                  type="date"
                                  name="end-date"
                                  id="end-date"
                                  className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  onChange={(e) => setNewEnd(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="inline-flex items-center mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                  <h1 className="text-xl font-semibold text-gray-900 mb-10">
                    Appraisals
                  </h1>
                  <div>
                    {withinCurrentPeriod() ? (
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
                            onChange={(e) => setCurrentPeriod(e.target.value)}
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
                          {isManager ? (
                            <>
                              <h1 className="mt-5 font-semibold">
                                My Team Appraisals
                              </h1>
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
                                                <p className="mt-2 flex items-center text-sm text-gray-500">
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
                                                </p>
                                              </div>
                                              <div className="hidden md:block">
                                                <div>
                                                  <p className="text-sm text-gray-900 text-left"></p>
                                                  <p className="mt-2 flex items-center text-sm text-gray-500">
                                                    {renderAppraisalStatus(
                                                      appraisal
                                                    )}
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
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          <h1 className="mt-5 font-semibold">My Appraisals</h1>
                          <div className="overflow-hidden bg-white shadow sm:rounded-md mt-5 ">
                            <ul
                              role="list"
                              className="divide-y divide-gray-200"
                            >
                              {applications.map((application) => (
                                <li key={application.applicant.email}>
                                  <a
                                    href={application.href}
                                    className="block hover:bg-gray-50"
                                  >
                                    <div className="flex items-center px-4 py-4 sm:px-6">
                                      <div className="flex min-w-0 flex-1 items-center">
                                        <div className="flex-shrink-0">
                                          <img
                                            className="h-12 w-12 rounded-full"
                                            src={application.applicant.imageUrl}
                                            alt=""
                                          />
                                        </div>
                                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                          <div>
                                            <p className="truncate text-sm text-left font-medium text-indigo-600">
                                              {application.applicant.name}
                                            </p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                              <EnvelopeIcon
                                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                aria-hidden="true"
                                              />
                                              <span className="truncate">
                                                {application.applicant.email}
                                              </span>
                                            </p>
                                          </div>
                                          <div className="hidden md:block">
                                            <div>
                                              <p className="text-sm text-gray-900 text-left">
                                                <time
                                                  dateTime={application.date}
                                                >
                                                  {application.dateFull}
                                                </time>
                                              </p>
                                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                                <CheckCircleIcon
                                                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                                  aria-hidden="true"
                                                />
                                                {application.stage}
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
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        <div>No action required</div>
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
