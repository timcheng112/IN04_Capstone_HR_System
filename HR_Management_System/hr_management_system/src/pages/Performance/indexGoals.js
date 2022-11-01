import { React, Fragment } from "react";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import PerformanceSidebar from "../../components/Sidebar/Performance";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon as PlusIconMini } from "@heroicons/react/20/solid";
import AddGoalModal from "../../features/performance/AddGoalModal";
import Moment from "react-moment";
import ConfirmDialog from "../../components/ConfirmDialog";
import AddAchievementModal from "../../features/performance/AddAchievementModal";
import EditGoalModal from "../../features/performance/EditGoalModal";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Walton Lsdfsfs",
    title: "Front-end Developer",
    email: "lindsay.walto@example.com",
    role: "Member",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [goalPeriods, setGoalPeriods] = useState([]);
  const [openAddGoal, setOpenAddGoal] = useState(false);
  const [openDeleteGoal, setOpenDeleteGoal] = useState(false);
  const [openEditGoal, setOpenEditGoal] = useState(false);
  const [openAddAchievement, setOpenAddAchievement] = useState(false);
  const [financial, setFinancial] = useState([]);
  const [business, setBusiness] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);

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
        console.log(response.data);
        setFinancial(response.data);
      });

    api
      .getUserGoals(goalPeriodYear, "business", getUserId())
      .then((response) => {
        //console.log(response.data);
        setBusiness(response.data);
      });
  }, []);

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
        .then((response) =>
          alert(
            "Goal period for " + newEnd.substring(0, 4) + " has been created"
          )
        )
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
    api
      .updateGoalPeriod(startDate, endDate)
      .then((response) => alert(response.data));
    setEditMode(false);
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
        });
      }
    });
  };

  function handleDeleteGoal(goalId) {
    console.log(goalId);
    api.deleteGoal(goalId).then((response) => {
      alert(response.data);
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
  }

  function submitNewAchievement(descriptionAchievement) {
    console.log("new " + descriptionAchievement);
    api
      .addAchievement(selectedItem, descriptionAchievement)
      .then((response) => alert(response.data));
  }

  function submitEditGoal(goalDescription) {
    console.log("goal desc " + goalDescription);
    console.log('id ' + selectedItem.goalId)
    api.updateGoal(selectedItem.goalId, goalDescription).then((response) => {
      alert(response.data);
    });
  }

  if (error) return `Error`;

  return (
    financial &&
    goalPeriods && (
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
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    onClick={() => setHrMode(!hrMode)}
                  >
                    HR Mode
                  </button>
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
                    {/* TODO: check if current year is  */}
                    {editMode ? (
                      <>
                        <form onSubmit={handleEdit}>
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
                            {currentPeriod.startDate}
                          </Moment>
                          <h1 className="mx-2 font-sans font-semibold">to</h1>
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
                                {people.map((person) => (
                                  <tr key={person.email}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-left text-gray-900 sm:pl-6">
                                      {person.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left ">
                                      {person.title}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left ">
                                      {person.email}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left ">
                                      {person.role}
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm text-left font-medium sm:pr-6">
                                      <a
                                        href="/home"
                                        className="text-indigo-600 hover:text-indigo-900"
                                      >
                                        View
                                        <span className="sr-only">
                                          , {person.name}
                                        </span>
                                      </a>
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
                      <p className="mt-2 text-sm text-gray-800 mb-5">
                        The period for goal submission has not been created for
                        this year. Please add one.
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
            ) : (
              <>
                <div>
                  <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">
                      Goals
                    </h1>
                    <div className="mb-10 mx-32">
                      <div>
                        {withinCurrentPeriod() ? (
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
                              defaultValue={new Date().getFullYear().toString()}
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
                                                description={selectedItem.description}
                                                open={openEditGoal}
                                                onOpen={() =>
                                                  setOpenEditGoal(false)
                                                }
                                                onClose={() =>
                                                  setOpenEditGoal(false)
                                                }
                                                onConfirm={(desc) => {
                                                  submitEditGoal(desc);
                                                }}
                                              />
                                                <button
                                                  type="button"
                                                  className="inline-flex items-center ml-3 px-3 rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                  onClick={() => {
                                                    setOpenDeleteGoal(true);
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
                                                    setOpenDeleteGoal(false)
                                                  }
                                                  setOpen={() =>
                                                    setOpenDeleteGoal(false)
                                                  }
                                                  onConfirm={() =>
                                                    handleDeleteGoal(
                                                      goal.goalId
                                                    )
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
                            </div>
                            <div className="px-4 sm:px-6 lg:px-8">
                              <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto"></div>
                              </div>
                              <div className="sm:flex sm:items-center mt-5">
                                <h2 className="text-lg font-semibold text-left ml-5">
                                  Business ({business.length})
                                </h2>
                                <div className="sm:flex-auto"></div>
                                <div className="sm:mt-0 sm:ml-16 sm:flex-none">
                                  <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                    onClick={() => setOpenAddGoal(true)}
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
                                                description={selectedItem.description}
                                                open={openEditGoal}
                                                onOpen={() =>
                                                  setOpenEditGoal(false)
                                                }
                                                onClose={() =>
                                                  setOpenEditGoal(false)
                                                }
                                                onConfirm={(desc) => {
                                                  submitEditGoal(desc);
                                                }}
                                              />

                                                <button
                                                  type="button"
                                                  className="inline-flex items-center ml-3 px-3 rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                  onClick={() => {
                                                    setOpenDeleteGoal(true);
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
                                                    setOpenDeleteGoal(false)
                                                  }
                                                  setOpen={() =>
                                                    setOpenDeleteGoal(false)
                                                  }
                                                  onConfirm={() =>
                                                    handleDeleteGoal(
                                                      goal.goalId
                                                    )
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
                            </div>
                            <AddGoalModal
                              open={openAddGoal}
                              onClose={() => setOpenAddGoal(false)}
                            />
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
                                        <h2 className="text-lg font-semibold text-left ml-5">
                                          Financial ({financial.length})
                                        </h2>
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
                                        <h2 className="text-lg font-semibold text-left ml-5">
                                          Business ({business.length})
                                        </h2>
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
                              <>No action required</>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    )
  );
}
