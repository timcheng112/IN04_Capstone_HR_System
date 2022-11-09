import { React, Fragment } from "react";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import PerformanceSidebar from "../../components/Sidebar/Performance";
import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { PlusIcon as PlusIconMini } from "@heroicons/react/20/solid";
import AddGoalModal from "../../features/performance/AddGoalModal";
import Moment from "react-moment";
import ConfirmDialog from "../../components/ConfirmDialog";
import AddAchievementModal from "../../features/performance/AddAchievementModal";
import EditGoalModal from "../../features/performance/EditGoalModal";
import ViewEmployeeGoals from "../../features/performance/ViewEmployeeGoals";
import { format, getDay, nextDay } from "date-fns";
import AddFinancialGoalModal from "../../features/performance/AddFinancialGoalModal";
import AddBusinessGoalModal from "../../features/performance/AddBusinessGoalModal";

export default function Goals() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [hrMode, setHrMode] = useState(false);
  const [goalPeriodYear, setGoalPeriodYear] = useState(
    new Date().getFullYear() + ""
  );
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentDate, setCurrentDate] = useState(null);
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [goalPeriods, setGoalPeriods] = useState([]);
  const [openAddGoal, setOpenAddGoal] = useState(false);
  const [openAddBusinessGoal, setOpenAddBusinessGoal] = useState(false);
  const [openDeleteGoal, setOpenDeleteGoal] = useState(false);
  const [openEditGoal, setOpenEditGoal] = useState(false);
  const [openAddAchievement, setOpenAddAchievement] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [financial, setFinancial] = useState([]);
  const [business, setBusiness] = useState([]);
  const [overdueFinancial, setOverdueFinancial] = useState(false);
  const [overdueBusiness, setOverdueBusiness] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [userGoals, setUserGoals] = useState([]);
  const [manager, setManager] = useState(false);
  const [managerMode, setManagerMode] = useState(false);
  const [team, setTeam] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now);

    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(user);
      })
      .catch((error) => setError(error));

    api.getGoalPeriodByYear(goalPeriodYear).then((response) => {
      setStartDate(response.data.startDate);
      setEndDate(response.data.endDate);
      setSelectedPeriod(response.data);
    });

    api.getGoalPeriodByYear(new Date().getFullYear()).then((response) => {
      setCurrentPeriod(response.data);
    });

    api.getAllGoalPeriods().then((response) => {
      setGoalPeriods(response.data);
    });

    api
      .getUserGoals(goalPeriodYear, "financial", getUserId())
      .then((response) => {
        //console.log(response.data);
        setFinancial(response.data);
        if (response.data.length <= 0 && !withinCurrentPeriod()) {
          setOverdueFinancial(true);
        }
      });

    api
      .getUserGoals(goalPeriodYear, "business", getUserId())
      .then((response) => {
        //console.log(response.data);
        setBusiness(response.data);
        if (response.data.length <= 0 && !withinCurrentPeriod()) {
          setOverdueBusiness(true);
        }
      });

    api.getAllUserGoals(new Date().getFullYear()).then((response) => {
      console.log("all goals");
      console.log(response.data);

      setUserGoals(response.data);
      response.data.forEach((employee) => {
        employee.financialGoals = employee.goals.filter(
          (g) => g.type === "financial"
        );
        employee.businessGoals = employee.goals.filter(
          (g) => g.type === "business"
        );
        //console.log(employee.goals.filter(g => g.type === "business"))
        //console.log(employee.firstName + " " + employee.businessGoals.length)
      });
    });

    api.getIsTeamHead(getUserId()).then((response) => {
      console.log(response.data);
      if (response.data > -1) {
        setManager(true);

        api.getTeamGoals(response.data, goalPeriodYear).then((response) => {
          setTeam(response.data);
          response.data.forEach((employee) => {
            employee.financialGoals = employee.goals.filter(
              (g) => g.type === "financial"
            );
            employee.businessGoals = employee.goals.filter(
              (g) => g.type === "business"
            );
          });
        });
      }
    });
  }, []);

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(user);
      })
      .catch((error) => setError(error));

    api.getGoalPeriodByYear(goalPeriodYear).then((response) => {
      setStartDate(response.data.startDate);
      setEndDate(response.data.endDate);
      setSelectedPeriod(response.data);
    });

    api.getGoalPeriodByYear(new Date().getFullYear()).then((response) => {
      setCurrentPeriod(response.data);
    });

    api.getAllGoalPeriods().then((response) => {
      setGoalPeriods(response.data);
    });

    api
      .getUserGoals(goalPeriodYear, "financial", getUserId())
      .then((response) => {
        //console.log(response.data);
        setFinancial(response.data);

        if (response.data.length <= 0 && !withinCurrentPeriod()) {
          setOverdueFinancial(true);
        } else {
          setOverdueFinancial(false);
        }
      });

    api
      .getUserGoals(goalPeriodYear, "business", getUserId())
      .then((response) => {
        console.log(response.data);
        setBusiness(response.data);
        if (response.data.length <= 0 && !withinCurrentPeriod()) {
          setOverdueBusiness(true);
        } else {
          setOverdueBusiness(false);
        }
      });

    api.getAllUserGoals(new Date().getFullYear()).then((response) => {
      console.log("all goals");
      console.log(response.data);
      setUserGoals(response.data);
      response.data.forEach((employee) => {
        employee.financialGoals = employee.goals.filter(
          (g) => g.type === "financial"
        );
        employee.businessGoals = employee.goals.filter(
          (g) => g.type === "business"
        );
        //console.log(employee.goals.filter(g => g.type === "business"))
        //console.log(employee.firstName + " " + employee.businessGoals.length)
      });
    });

    api.getIsTeamHead(getUserId()).then((response) => {
      console.log(response.data);
      if (response.data > -1) {
        setManager(true);

        api.getTeamGoals(response.data, goalPeriodYear).then((response) => {
          setTeam(response.data);
          response.data.forEach((employee) => {
            employee.financialGoals = employee.goals.filter(
              (g) => g.type === "financial"
            );
            employee.businessGoals = employee.goals.filter(
              (g) => g.type === "business"
            );
          });
        });
      }
    });
  }, [refresh]);

  useEffect(() => {
    api.getGoalPeriodByYear(goalPeriodYear).then((response) => {
      setSelectedPeriod(response.data);
    });

    api
      .getUserGoals(goalPeriodYear, "financial", getUserId())
      .then((response) => {
        //console.log(response.data);
        setFinancial(response.data);
      });

    api
      .getUserGoals(goalPeriodYear, "business", getUserId())
      .then((response) => {
        //console.log(response.data);
        setBusiness(response.data);
      });
  }, [goalPeriodYear]);

  useEffect(() => {
    //console.log("open goal?");
    const timer = setTimeout(() => {
      setRefresh(!refresh);
    }, 1000);
    return () => clearTimeout(timer);
  }, [
    openAddGoal,
    openEditGoal,
    openAddAchievement,
    openView,
    openAddBusinessGoal,
  ]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (newStart.substring(0, 4) === newEnd.substring(0, 4)) {
      const goalPeriod = {
        startDate: newStart,
        endDate: newEnd,
        year: newEnd.substring(0, 4),
      };
      api
        .createGoalPeriod(goalPeriod)
        .then((response) => {
          alert(
            "Goal period for " + newEnd.substring(0, 4) + " has been created"
          );
          setRefresh(!refresh);
        })
        .catch((error) => {
          const message = error.request.response;
          if (message.includes("already exists")) {
            alert(
              "Goal period for " + newEnd.substring(0, 4) + " already exists"
            );
          }
        });
    }
  };

  const handleEdit = (evt) => {
    evt.preventDefault();

    api.getAllGoalsByYear(goalPeriodYear).then((response) => {
      if (response.data.length) {
        alert(
          "Cannot change goal period. There have been " +
            response.data.length +
            " goal(s) added to " +
            goalPeriodYear +
            "."
        );
      } else {
        api.updateGoalPeriod(startDate, endDate).then((response) => {
          alert(response.data);
          setRefresh(!refresh);
        });
      }
      setEditMode(false);
    });
  };

  const handleDeleteGoalPeriod = (evt) => {
    evt.preventDefault();
    api.getAllGoalsByYear(goalPeriodYear).then((response) => {
      if (response.data.length) {
        alert(
          "Cannot delete goal period. There have been " +
            response.data.length +
            " goal(s) added to " +
            goalPeriodYear +
            "."
        );
      } else {
        console.log("year " + goalPeriodYear);
        api.deleteGoalPeriod(goalPeriodYear).then((response) => {
          alert(response.data);
          setRefresh(!refresh);
          setSelectedPeriod(null);
          //setHrMode(false);
        });
      }
    });
  };

  function handleDeleteGoal() {
    console.log(selectedItem);
    api.deleteGoal(selectedItem).then((response) => {
      alert(response.data);
      setRefresh(!refresh);
    });
  }

  function withinCurrentPeriod() {
    const now = new Date().setHours(0, 0, 0, 0);
    //console.log(now >= new Date(startDate).setHours(0,0,0,0));
    //console.log(now <= new Date(endDate).setHours(0,0,0,0))
    return (
      now >= new Date(startDate).setHours(0, 0, 0, 0) &&
      now <= new Date(endDate).setHours(0, 0, 0, 0)
    );
  }

  function handleUpdateGoal(goal) {
    setOpenEditGoal(true);
    setSelectedItem(goal);
  }

  function handleAddAchievement(goalId) {
    console.log("gid " + goalId);
    setSelectedItem(goalId);
    setOpenAddAchievement(true);
    setRefresh(!refresh);
  }

  function submitNewAchievement(descriptionAchievement) {
    console.log("new " + descriptionAchievement);
    api
      .addAchievement(selectedItem, descriptionAchievement)
      .then((response) => alert(response.data));
  }

  function submitEditGoal(goalDescription) {
    console.log("goal desc " + goalDescription);
    console.log("id " + selectedItem.goalId);
    api.updateGoal(selectedItem.goalId, goalDescription).then((response) => {
      alert(response.data);
    });
  }

  function editGoalPeriod() {
    console.log("handle edit " + goalPeriodYear);
    api.getAllGoalsByYear(goalPeriodYear).then((response) => {
      if (response.data.length) {
        alert(
          "Cannot change goal period. There have been " +
            response.data.length +
            " goal(s) added."
        );
      } else {
        setEditMode(!editMode);
        setStartDate(currentPeriod.startDate);
        setEndDate(currentPeriod.endDate);
        setRefresh(!refresh);
      }
    });
  }

  if (error) return `Error`;

  return (
    financial &&
    goalPeriods &&
    currentDate && (
      <div className="">
        <Navbar />
        <div className="flex">
          <div className="flex-1">
            <PerformanceSidebar
              currentPage={{
                name: "Goals",
                href: "/performance/goals",
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
            {hrMode ? (
              <div>
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-indigo-800 mb-10">
                    Goals HR Mode
                  </h1>
                </div>
                {selectedPeriod ? (
                  <div>
                    <h1 className="mx-2 font-sans font-semibold text-xl mb-5">
                      Current Goal Period
                    </h1>
                    {editMode ? (
                      <>
                        <form onSubmit={handleEdit}>
                          <p className="mt-2 text-md text-gray-800 mb-5">
                            A goal period has to be at least 14 days (inclusive
                            of working days).
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
                                  onChange={(s) => setStartDate(s.target.value)}
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
                                  onChange={(e) => setEndDate(e.target.value)}
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
                            {startDate}
                          </Moment>
                          <h1 className="mx-2 font-sans font-semibold">to</h1>
                          <Moment
                            parse="YYYY-MM-DD"
                            className="mx-2 font-sans font-semibold"
                            locale="Asia/Singapore"
                            format="DD/MM/YYYY"
                          >
                            {endDate}
                          </Moment>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 mt-5 px-4 py-2 text-md font-sans font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => editGoalPeriod()}
                        >
                          <PencilIcon className="h-5 w-5 mr-2" />
                          Edit
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md ml-5 border border-transparent bg-indigo-600 mt-5 px-4 py-2 text-md font-sans font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={handleDeleteGoalPeriod}
                        >
                          <TrashIcon className="h-5 w-5 mr-2" />
                          Delete
                        </button>
                      </>
                    )}

                    <div className="mt-8 flex flex-col mx-20">
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
                                    Name
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                  >
                                    Work Email
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                  >
                                    Financial
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                  >
                                    Business
                                  </th>
                                  <th
                                    scope="col"
                                    className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                  >
                                    <span className="sr-only">View</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 bg-white">
                                {userGoals.map((employee) => (
                                  <tr key={employee.userId}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-left text-gray-900 sm:pl-6">
                                      {employee.firstName} {employee.lastName}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left ">
                                      {employee.workEmail}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left ">
                                      {employee.financialGoals.length}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left ">
                                      {employee.businessGoals.length}
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm text-left font-medium sm:pr-6">
                                      {/*employee.userRole !== "MANAGER"  && team.teamHead.userId !== employee.userId */}

                                      <button
                                        className="text-indigo-600 hover:text-indigo-900"
                                        onClick={() => {
                                          setOpenView(true);
                                          setSelectedItem(employee.userId);
                                        }}
                                      >
                                        {" "}
                                        View
                                        <span className="sr-only">
                                          , {employee.name}
                                        </span>
                                      </button>
                                      {/* :""} */}

                                      <ViewEmployeeGoals
                                        uId={selectedItem}
                                        open={openView}
                                        onClose={() => setOpenView(false)}
                                      />
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
                ) : (
                  <>
                    <form onSubmit={handleSubmit}>
                      <p className="mt-2 text-md text-gray-800 mb-5">
                        The period for goal submission has not been created for
                        this year. Please add one.
                      </p>
                      <p className="mt-2 text-md text-gray-800 mb-5">
                        A goal period has to be at least 14 days (inclusive of
                        working days).
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
                              //   new Date(new Date().getFullYear(), 12, 31),
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
            ) : (
              <>
                <div>
                  <div className="sm:flex-auto">
                    <h1 className="text-3xl font-semibold text-gray-900">
                      Goals
                    </h1>
                    {manager ? (
                      <>
                        {managerMode ? (
                          <>
                            <div className="flex justify-end mt-4 ml-auto mr-6">
                              <div>
                                <>
                                  <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                    onClick={() => setManagerMode(!managerMode)}
                                  >
                                    Non-Manager Mode
                                  </button>
                                </>
                              </div>
                            </div>
                            <h2 className="font-semibold text-lg">
                              Team Goals
                            </h2>
                            <div className="mt-8 flex flex-col mx-20">
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
                                            Name
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                          >
                                            Work Email
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                          >
                                            Financial
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                          >
                                            Business
                                          </th>
                                          <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                          >
                                            <span className="sr-only">
                                              View
                                            </span>
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-200 bg-white">
                                        {team.map((employee) => (
                                          <tr key={employee.userId}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-left text-gray-900 sm:pl-6">
                                              {employee.firstName}{" "}
                                              {employee.lastName}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left ">
                                              {employee.workEmail}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left ">
                                              {employee.financialGoals.length}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left ">
                                              {employee.businessGoals.length}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm text-left font-medium sm:pr-6">
                                              {employee.userRole !==
                                              "MANAGER" ? (
                                                <button
                                                  className="text-indigo-600 hover:text-indigo-900"
                                                  onClick={() => {
                                                    setOpenView(true);
                                                    setSelectedItem(
                                                      employee.userId
                                                    );
                                                  }}
                                                >
                                                  View
                                                  <span className="sr-only">
                                                    , {employee.name}
                                                  </span>
                                                </button>
                                              ) : (
                                                ""
                                              )}

                                              <ViewEmployeeGoals
                                                uId={selectedItem}
                                                open={openView}
                                                onClose={() =>
                                                  setOpenView(false)
                                                }
                                              />
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
                            {selectedPeriod && (
                              <div className="flex justify-end mt-4 ml-auto mr-6">
                                <div>
                                  <>
                                    <button
                                      type="button"
                                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                      onClick={() =>
                                        setManagerMode(!managerMode)
                                      }
                                    >
                                      Manager Mode
                                    </button>
                                  </>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    <div className="mb-10 mx-32">
                      <div>
                        {withinCurrentPeriod() ? (
                          <>
                            {managerMode ? (
                              <></>
                            ) : (
                              <>
                                <label
                                  htmlFor="period"
                                  className="block text-lg mt-5 mb-5 font-semibold text-gray-700"
                                >
                                  Period
                                </label>
                                <select
                                  id="period"
                                  name="period"
                                  className="mt-1 mr-5 block font-semibold text-lg w-full rounded-md border border-gray-300 px-3 py-1 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 bg-white"
                                  defaultValue={new Date()
                                    .getFullYear()
                                    .toString()}
                                  onChange={(e) =>
                                    setGoalPeriodYear(e.target.value)
                                  }
                                >
                                  {goalPeriods.map((goalPeriod) => (
                                    <option
                                      key={goalPeriod.goalPeriodId}
                                      className="text-center text-lg"
                                    >
                                      {goalPeriod.year}
                                    </option>
                                  ))}
                                </select>
                                <span className="inline-flex items-center mt-2 mb-5 rounded-full bg-green-100 px-5 py-2 text-md font-medium text-green-800">
                                  Goal-setting period
                                  <Moment
                                    parse="YYYY-MM-DD"
                                    className="mx-2 text-md text-gray-800"
                                    locale="Asia/Singapore"
                                    format="DD/MM/YYYY"
                                  >
                                    {startDate}
                                  </Moment>
                                  {" - "}
                                  <Moment
                                    parse="YYYY-MM-DD"
                                    className="mx-2 text-md text-gray-800"
                                    locale="Asia/Singapore"
                                    format="DD/MM/YYYY"
                                  >
                                    {endDate}
                                  </Moment>
                                </span>
                                <div className="px-4 sm:px-6 lg:px-8">
                                  <div className="sm:flex sm:items-center">
                                    <div className="sm:flex-auto"></div>
                                  </div>
                                  {financial.length <= 0 ? (
                                    <>
                                      <div className="sm:flex sm:items-center">
                                        <button
                                          type="button"
                                          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                          onClick={() => setOpenAddGoal(true)}
                                        >
                                          <CurrencyDollarIcon className="mx-auto h-12 w-12 text-gray-400" />
                                          <span className="mt-2 block text-sm font-medium text-gray-900">
                                            Add a Financial Goal
                                          </span>
                                        </button>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div className="sm:flex sm:items-center">
                                        <h2 className="text-lg font-semibold text-left ml-5">
                                          Financial ({financial.length})
                                        </h2>

                                        <div className="sm:flex-auto"></div>
                                        <div className="sm:mt-0 sm:ml-16 sm:flex-none">
                                          <button
                                            type="button"
                                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                            onClick={() => setOpenAddGoal(true)}
                                          >
                                            Add Financial Goal
                                          </button>
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
                                                      Description
                                                    </th>
                                                    <th
                                                      scope="col"
                                                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                      Created
                                                    </th>
                                                    <th
                                                      scope="col"
                                                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                                    >
                                                      <span className="sr-only">
                                                        Edit
                                                      </span>
                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 bg-white">
                                                  {financial.map((goal) => (
                                                    <tr key={goal.goalId}>
                                                      <td className="whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {goal.description}
                                                      </td>
                                                      <td className="whitespace-nowrap text-left py-4 text-sm text-gray-900">
                                                        <Moment
                                                          parse="YYYY-MM-DD"
                                                          className="mx-2 font-sans"
                                                          locale="Asia/Singapore"
                                                          format="DD/MM/YYYY"
                                                        >
                                                          {goal.created}
                                                        </Moment>
                                                      </td>
                                                      <td className="relative whitespace-nowrap text-left py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <button
                                                          type="button"
                                                          className="inline-flex items-center ml-5 px-3 rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                          onClick={() => {
                                                            handleUpdateGoal(
                                                              goal
                                                            );
                                                            //console.log('gid ' + goal.goalId)
                                                          }}
                                                        >
                                                          <PencilIcon
                                                            className="h-5 w-5 mr-2"
                                                            aria-hidden="true"
                                                          />
                                                          Edit Goal
                                                        </button>
                                                        <EditGoalModal
                                                          description={
                                                            selectedItem.description
                                                          }
                                                          open={openEditGoal}
                                                          onOpen={() =>
                                                            setOpenEditGoal(
                                                              false
                                                            )
                                                          }
                                                          onClose={() =>
                                                            setOpenEditGoal(
                                                              false
                                                            )
                                                          }
                                                          onConfirm={(desc) => {
                                                            submitEditGoal(
                                                              desc
                                                            );
                                                          }}
                                                        />
                                                        <button
                                                          type="button"
                                                          className="inline-flex items-center ml-3 px-3 rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                          onClick={() => {
                                                            setSelectedItem(
                                                              goal.goalId
                                                            );
                                                            setOpenDeleteGoal(
                                                              true
                                                            );
                                                          }}
                                                        >
                                                          <TrashIcon
                                                            className="h-5 w-5 mr-1"
                                                            aria-hidden="true"
                                                          />
                                                          Delete Goal
                                                        </button>
                                                        <ConfirmDialog
                                                          title="goal"
                                                          item="goal"
                                                          open={openDeleteGoal}
                                                          onClose={() =>
                                                            setOpenDeleteGoal(
                                                              false
                                                            )
                                                          }
                                                          setOpen={() =>
                                                            setOpenDeleteGoal(
                                                              false
                                                            )
                                                          }
                                                          onConfirm={() =>
                                                            handleDeleteGoal()
                                                          }
                                                        />
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
                                  )}
                                </div>
                                <div className="px-4 sm:px-6 lg:px-8">
                                  <div className="sm:flex sm:items-center">
                                    <div className="sm:flex-auto"></div>
                                  </div>
                                  {business.length <= 0 ? (
                                    <>
                                      <div className="mt-10 sm:flex sm:items-center">
                                        <button
                                          type="button"
                                          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                          onClick={() =>
                                            setOpenAddBusinessGoal(true)
                                          }
                                        >
                                          <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
                                          <span className="mt-2 block text-sm font-medium text-gray-900">
                                            Add a Business Goal
                                          </span>
                                        </button>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div className="sm:flex sm:items-center mt-5">
                                        <h2 className="text-lg font-semibold text-left ml-5">
                                          Business ({business.length})
                                        </h2>
                                        <div className="sm:flex-auto"></div>
                                        <div className="sm:mt-0 sm:ml-16 sm:flex-none">
                                          <button
                                            type="button"
                                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                            onClick={() =>
                                              setOpenAddBusinessGoal(true)
                                            }
                                          >
                                            Add Business Goal
                                          </button>
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
                                                      Description
                                                    </th>
                                                    <th
                                                      scope="col"
                                                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                      Created
                                                    </th>
                                                    <th
                                                      scope="col"
                                                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                                    >
                                                      <span className="sr-only">
                                                        Edit
                                                      </span>
                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 bg-white">
                                                  {business.map((goal) => (
                                                    <tr key={goal.goalId}>
                                                      <td className="whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {goal.description}
                                                      </td>
                                                      <td className="whitespace-nowrap text-left px-1 py-4 text-sm text-gray-500">
                                                        <Moment
                                                          parse="YYYY-MM-DD"
                                                          className="mx-2 font-sans"
                                                          locale="Asia/Singapore"
                                                          format="DD/MM/YYYY"
                                                        >
                                                          {goal.created}
                                                        </Moment>
                                                      </td>
                                                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <button
                                                          type="button"
                                                          className="inline-flex items-center ml-5 px-3 rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                          onClick={() => {
                                                            handleUpdateGoal(
                                                              goal
                                                            );
                                                            //console.log('gid ' + goal.goalId)
                                                          }}
                                                        >
                                                          <PencilIcon
                                                            className="h-5 w-5 mr-2"
                                                            aria-hidden="true"
                                                          />
                                                          Edit Goal
                                                        </button>
                                                        <EditGoalModal
                                                          description={
                                                            selectedItem.description
                                                          }
                                                          open={openEditGoal}
                                                          onOpen={() =>
                                                            setOpenEditGoal(
                                                              false
                                                            )
                                                          }
                                                          onClose={() =>
                                                            setOpenEditGoal(
                                                              false
                                                            )
                                                          }
                                                          onConfirm={(desc) => {
                                                            submitEditGoal(
                                                              desc
                                                            );
                                                          }}
                                                        />

                                                        <button
                                                          type="button"
                                                          className="inline-flex items-center ml-3 px-3 rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                          onClick={() => {
                                                            setSelectedItem(
                                                              goal.goalId
                                                            );
                                                            setOpenDeleteGoal(
                                                              true
                                                            );
                                                          }}
                                                        >
                                                          <TrashIcon
                                                            className="h-5 w-5 mr-1"
                                                            aria-hidden="true"
                                                          />
                                                          Delete Goal
                                                        </button>
                                                        <ConfirmDialog
                                                          title="goal"
                                                          item="goal"
                                                          open={openDeleteGoal}
                                                          onClose={() =>
                                                            setOpenDeleteGoal(
                                                              false
                                                            )
                                                          }
                                                          setOpen={() =>
                                                            setOpenDeleteGoal(
                                                              false
                                                            )
                                                          }
                                                          onConfirm={() =>
                                                            handleDeleteGoal()
                                                          }
                                                        />
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
                                  )}
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {selectedPeriod ? (
                              <>
                                <label
                                  htmlFor="period"
                                  className="block text-lg mt-5 mb-5 font-semibold text-gray-700"
                                >
                                  Period
                                </label>
                                <select
                                  id="period"
                                  name="period"
                                  className="mt-1 mr-5 block font-semibold text-lg w-full rounded-md border border-gray-300 px-3 py-1 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 bg-white"
                                  onChange={(e) =>
                                    setGoalPeriodYear(e.target.value)
                                  }
                                >
                                  {goalPeriods.map((goalPeriod) => (
                                    <option
                                      key={goalPeriod.goalPeriodId}
                                      className="text-center text-lg"
                                    >
                                      {goalPeriod.year}
                                    </option>
                                  ))}
                                </select>
                                <div>
                                  <div className="sm:px-6 lg:px-8 mb-5">
                                    <div className="sm:flex sm:items-center">
                                      <div className="sm:flex-auto"></div>
                                    </div>
                                    <div className="sm:px-6 lg:px-8">
                                      <div className="sm:flex sm:items-center mt-5">
                                        {overdueFinancial ? (
                                          <>
                                            <div className="sm:flex sm:items-center">
                                              <h2 className="text-lg font-semibold text-left text-red-600 ml-5">
                                                Financial
                                                <span className="inline-flex items-center ml-1 rounded-full bg-red-100 px-2.5 py-0.5 text-md font-medium font-semibold text-red-800">
                                                  {financial.length}
                                                </span>
                                              </h2>
                                              <div className="sm:flex-auto"></div>
                                              <div className="sm:mt-0 sm:ml-16 sm:flex-none">
                                                <button
                                                  type="button"
                                                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                                  onClick={() =>
                                                    setOpenAddGoal(true)
                                                  }
                                                >
                                                  Add Financial Goal
                                                </button>
                                              </div>
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            <h2 className="text-lg font-semibold text-left ml-5">
                                              Financial
                                              <span className="inline-flex items-center ml-1 rounded-full bg-indigo-100 px-2.5 py-0.5 text-md font-medium font-semibold text-indigo-800">
                                                {financial.length}
                                              </span>
                                            </h2>
                                          </>
                                        )}
                                        <div className="sm:flex-auto"></div>
                                      </div>
                                      <div className="mt-8 flex flex-col">
                                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                              <table className="min-w-full">
                                                <thead className="bg-white">
                                                  <tr>
                                                    <th
                                                      scope="col"
                                                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                      Achievement
                                                    </th>
                                                    <th
                                                      scope="col"
                                                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                      Created
                                                    </th>
                                                    <th
                                                      scope="col"
                                                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                      Last Modified
                                                    </th>
                                                    <th
                                                      scope="col"
                                                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                                    >
                                                      <span className="sr-only">
                                                        Edit
                                                      </span>
                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody className="bg-white">
                                                  {financial?.map((goal) => (
                                                    <Fragment key={goal.goalId}>
                                                      <tr className="border-t border-gray-200">
                                                        <th
                                                          colSpan={3}
                                                          scope="col"
                                                          className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                                                        >
                                                          <span className="inline-flex items-center font-bold rounded-full bg-amber-600 mr-3 px-3 py-0.5 text-sm font-medium text-white">
                                                            GOAL
                                                          </span>{" "}
                                                          {goal.description}
                                                        </th>
                                                        <th
                                                          colSpan={1}
                                                          scope="colgroup"
                                                          className="bg-gray-50 px-4 py-2 text-right text-sm font-semibold text-gray-900 sm:px-6"
                                                        >
                                                          <button
                                                            type="button"
                                                            className="inline-flex items-center ml-5 pr-3 rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                            onClick={() => {
                                                              handleAddAchievement(
                                                                goal.goalId
                                                              );
                                                            }}
                                                          >
                                                            <PlusIconMini
                                                              className="h-5 w-5 mr-1"
                                                              aria-hidden="true"
                                                            />
                                                            Add Achievement
                                                          </button>
                                                          <AddAchievementModal
                                                            title="test"
                                                            open={
                                                              openAddAchievement
                                                            }
                                                            onOpen={() =>
                                                              setOpenAddAchievement(
                                                                false
                                                              )
                                                            }
                                                            onClose={() =>
                                                              setOpenAddAchievement(
                                                                false
                                                              )
                                                            }
                                                            onConfirm={(
                                                              desc
                                                            ) => {
                                                              submitNewAchievement(
                                                                desc
                                                              );
                                                              //handleAddAchievement(goal.goalId);
                                                            }}
                                                          />
                                                        </th>
                                                      </tr>
                                                      {goal?.achievements?.map(
                                                        (achievement) => (
                                                          <tr
                                                            key={
                                                              achievement.achievementId
                                                            }
                                                            className=""
                                                          >
                                                            <td className="whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                              {
                                                                achievement.description
                                                              }
                                                            </td>
                                                            <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">
                                                              {
                                                                achievement.created
                                                              }
                                                            </td>
                                                            <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">
                                                              {
                                                                achievement.lastModified
                                                              }
                                                            </td>
                                                            <td className="relative whitespace-nowrap text-left py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                              <a
                                                                href="#"
                                                                className="text-indigo-600 font-semibold hover:text-indigo-900"
                                                              >
                                                                Edit
                                                                <span className="sr-only">
                                                                  ,{" "}
                                                                  {
                                                                    achievement.name
                                                                  }
                                                                </span>
                                                              </a>
                                                            </td>
                                                          </tr>
                                                        )
                                                      )}
                                                    </Fragment>
                                                  ))}
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="px-4 sm:px-6 lg:px-8">
                                    <div className="sm:flex sm:items-center">
                                      <div className="sm:flex-auto"></div>
                                    </div>
                                    <div className="sm:px-6 lg:px-8">
                                      <div className="sm:flex sm:items-center">
                                        {overdueBusiness ? (
                                          <>
                                            <div className="sm:flex sm:items-center">
                                              <h2 className="text-lg font-semibold text-left text-red-600 ml-5">
                                                Business
                                                <span className="inline-flex items-center ml-1 rounded-full bg-red-100 px-2.5 py-0.5 text-md font-medium font-semibold text-red-800">
                                                  {business.length}
                                                </span>
                                              </h2>
                                              <div className="sm:flex-auto"></div>
                                              <div className="sm:mt-0 sm:ml-16 sm:flex-none">
                                                <button
                                                  type="button"
                                                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                                  onClick={() => {
                                                    setOpenAddBusinessGoal(
                                                      true
                                                    );
                                                  }}
                                                >
                                                  Add Business Goal
                                                </button>
                                              </div>
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            <h2 className="text-lg font-semibold text-left ml-5">
                                              Business
                                              <span className="inline-flex items-center ml-1 rounded-full bg-indigo-100 px-2.5 py-0.5 text-md font-medium font-semibold text-indigo-800">
                                                {business.length}
                                              </span>
                                            </h2>
                                          </>
                                        )}

                                        <div className="sm:flex-auto"></div>
                                        <div className="sm:mt-0 sm:ml-16 sm:flex-none">
                                          {/* {withinCurrentPeriod() ? (
                                        <button
                                          type="button"
                                          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                          onClick={() => setOpenAddGoal(true)}
                                        >
                                          Add Business Goal
                                        </button>
                                      ) : (
                                        <></>
                                      )} */}
                                        </div>
                                      </div>
                                      <div className="mt-8 flex flex-col">
                                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                              <table className="min-w-full">
                                                <thead className="bg-white">
                                                  <tr>
                                                    <th
                                                      scope="col"
                                                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                      Achievement
                                                    </th>
                                                    <th
                                                      scope="col"
                                                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                      Created
                                                    </th>
                                                    <th
                                                      scope="col"
                                                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                      Last Modified
                                                    </th>
                                                    <th
                                                      scope="col"
                                                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                                    >
                                                      <span className="sr-only">
                                                        Edit
                                                      </span>
                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody className="bg-white">
                                                  {business?.map((goal) => (
                                                    <Fragment key={goal.goalId}>
                                                      <tr className="border-t border-gray-200">
                                                        <th
                                                          colSpan={3}
                                                          scope="colgroup"
                                                          className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                                                        >
                                                          <span className="inline-flex items-center font-bold rounded-full bg-amber-600 mr-3 px-3 py-0.5 text-sm font-medium text-white">
                                                            GOAL
                                                          </span>{" "}
                                                          {goal.description}
                                                        </th>
                                                        <th
                                                          colSpan={1}
                                                          scope="colgroup"
                                                          className="bg-gray-50 px-4 py-2 text-right text-sm font-semibold text-gray-900 sm:px-6"
                                                        >
                                                          <AddAchievementModal
                                                            title="test"
                                                            open={
                                                              openAddAchievement
                                                            }
                                                            onOpen={() =>
                                                              setOpenAddAchievement(
                                                                false
                                                              )
                                                            }
                                                            onClose={() =>
                                                              setOpenAddAchievement(
                                                                false
                                                              )
                                                            }
                                                            onConfirm={(
                                                              desc
                                                            ) => {
                                                              submitNewAchievement(
                                                                desc
                                                              );
                                                              //handleAddAchievement(goal.goalId);
                                                            }}
                                                          />
                                                          <button
                                                            type="button"
                                                            className="inline-flex items-center ml-5 pr-3 rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                            onClick={() => {
                                                              handleAddAchievement(
                                                                goal.goalId
                                                              );
                                                            }}
                                                          >
                                                            <PlusIconMini
                                                              className="h-5 w-5 mr-1"
                                                              aria-hidden="true"
                                                            />
                                                            Add Achievement
                                                          </button>
                                                        </th>
                                                      </tr>
                                                      {goal.achievements ? (
                                                        <>
                                                          {goal.achievements?.map(
                                                            (achievement) => (
                                                              <tr
                                                                key={
                                                                  achievement.achievementId
                                                                }
                                                                className=""
                                                              >
                                                                <td className="whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                  {
                                                                    achievement.description
                                                                  }
                                                                </td>
                                                                <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">
                                                                  {
                                                                    achievement.created
                                                                  }
                                                                </td>
                                                                <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">
                                                                  {
                                                                    achievement.lastModified
                                                                  }
                                                                </td>
                                                                <td className="relative whitespace-nowrap text-left py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                                  <a
                                                                    href="#"
                                                                    className="text-indigo-600 font-semibold hover:text-indigo-900"
                                                                  >
                                                                    Edit
                                                                    <span className="sr-only">
                                                                      ,{" "}
                                                                      {
                                                                        achievement.name
                                                                      }
                                                                    </span>
                                                                  </a>
                                                                </td>
                                                              </tr>
                                                            )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </Fragment>
                                                  ))}
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
                                  <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-20 lg:px-8">
                                    <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">
                                      <span className="block">
                                        No action required
                                      </span>
                                    </h2>
                                    <div className="mt-8 flex justify-center">
                                      <div className="inline-flex rounded-md shadow">

                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <AddFinancialGoalModal
              open={openAddGoal}
              onClose={() => setOpenAddGoal(false)}
            />
            <AddBusinessGoalModal
              open={openAddBusinessGoal}
              onClose={() => setOpenAddBusinessGoal(false)}
            />
          </main>
        </div>
      </div>
    )
  );
}
