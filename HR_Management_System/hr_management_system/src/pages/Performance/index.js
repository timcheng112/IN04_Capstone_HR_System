import { Fragment, React } from "react";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import { useHistory } from "react-router-dom";
import PerformanceSidebar from "../../components/Sidebar/Performance";
import {
  BriefcaseIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  PlayCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import CurrentPerformancePeriod from "./current";

// const people = [
//   {
//     name: "Lindsay Walton",
//     title: "Front-end Developer",
//     email: "lindsay.walton@example.com",
//     role: "Member",
//   },
//   // More people...
// ];

// const locations = [
//   {
//     name: "Earn 20% profit more than last year",
//     people: [
//       {
//         name: "Lindsay Walton",
//         title: "Front-end Developer",
//         email: "lindsay.walton@example.com",
//         role: "Member",
//       },
//       {
//         name: "Courtney Henry",
//         title: "Designer",
//         email: "courtney.henry@example.com",
//         role: "Admin",
//       },
//     ],
//   },
//   // More people...
// ];

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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Performance() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const history = useHistory();
  const date = new Date();
  const [goalPeriodYear, setGoalPeriodYear] = useState(
    new Date().getFullYear() + ""
  );
  const [goalPeriods, setGoalPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentDate, setCurrentDate] = useState(null);

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

  const [appraisalPeriods, setAppraisalPeriods] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");
  const [isManager, setIsManager] = useState(false);
  const [appraisals, setAppraisals] = useState([]);
  const [myAppraisals, setMyAppraisals] = useState([]);
  const [organizationHead, setOrganizationHead] = useState(false);
  const [allAppraisals, setAllAppraisals] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [goal, setGoal] = useState(null);
  const [appraisalPeriod, setAppraisalPeriod] = useState(null);
  const [review, setReview] = useState(null);

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(user);
      })
      .catch((error) => setError(error));
  }, []);

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
          console.log("team");
          console.log(response.data);
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

    api
      .getEmployeeReviewsByYear(now.getFullYear(), getUserId())
      .then((response) => {
        console.log(response.data);
        setReviews(response.data);
      });

    api.getGoalPeriodByYear(now.getFullYear()).then((response) => {
      console.log(response.data);
      setGoal(response.data);
    });

    api.getAppraisalPeriodByYear(now.getFullYear()).then((response) => {
      console.log(response.data);
      setAppraisalPeriod(response.data);
    });

    api.getReviewPeriodByYear(now.getFullYear()).then((response) => {
      console.log(response.data);
      setReview(response.data);
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
        console.log(response.data);
        setFinancial(response.data);
      });

    api
      .getUserGoals(goalPeriodYear, "business", getUserId())
      .then((response) => {
        //console.log(response.data);
        setBusiness(response.data);
      });
  }, [goalPeriodYear]);

  //appraisals
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
        console.log("myappraisals");
        console.log("myappraisals" + response.data);
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

    api.getAllAppraisalsByYear(new Date().getFullYear()).then((response) => {
      console.log(response.data);
      const a = response.data.filter(
        (a) => a.employee.userId + "" !== getUserId() + ""
      );
      console.log(a);
      setAllAppraisals(a);
    });

    api.getReviewPeriodByYear(new Date().getFullYear()).then((response) => {
      console.log(response.data);
      setReview(response.data);
    });
  }, [refresh]);

  //
  // useEffect(() => {
  //   console.log("use effect!");
  //   const url = window.location.href;
  //   const tempTeamId = url.substring(31);
  //   // console.log("urlSubstring:" + tempTeamId);
  //   // setTeamId(tempTeamId);
  //   teamId.current = tempTeamId;

  //   api.getTeam(teamId.current).then((response) => {
  //     setTeam(response.data);
  //     console.log(team);
  //   });
  // }, [teamId, refreshKey]);

  function withinCurrentPeriod() {
    const now = new Date().setHours(0, 0, 0, 0);
    //console.log(now >= new Date(startDate).setHours(0,0,0,0));
    //console.log(now <= new Date(endDate).setHours(0,0,0,0))
    return (
      now >= new Date(startDate).setHours(0, 0, 0, 0) &&
      now <= new Date(endDate).setHours(0, 0, 0, 0)
    );
  }

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

  if (error) return `Error`;

  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <PerformanceSidebar
            currentPage={{
              name: "Current",
              href: "/myperformance",
              current: true,
            }}
          />
        </div>
      </div>
      <div className="py-10">
        <main className="flex-1">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-bold text-indigo-600 mb-10">
              Current Performance Period
            </h1>
          </div>
          <CurrentPerformancePeriod />
          {goal ? (
            <>
              <div>
                <div className="px-4 sm:px-6 lg:px-8 mb-5">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <h1 className="text-xl font-semibold text-center">
                        Goals
                      </h1>
                    </div>
                  </div>
                  <div className="px-4 sm:px-6 lg:px-8 mx-20">
                    <div className="sm:flex sm:items-center">
                      <h2 className="text-l font-semibold text-left ml-5">
                        Financial ({financial.length})
                      </h2>
                      <div className="sm:flex-auto"></div>
                      <div className="sm:mt-0 sm:ml-16 sm:flex-none">
                        {financial.length > 0 && (
                          <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                            onClick={() => history.push("/performance/goals")}
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>

                    {financial.length <= 0 ? (
                      <>
                        <div className="mt-8 sm:flex sm:items-center">
                          <button
                            type="button"
                            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => history.push(`/performance/goals`)}
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
                                        Goals
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                      >
                                        Created
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white">
                                    {/* {locations.map((location) => (
                              <Fragment key={location.name}>
                                <tr className="border-t border-gray-200">
                                  <th
                                    colSpan={5}
                                    scope="colgroup"
                                    className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                                  >
                                    {location.name}
                                  </th>
                                </tr> */}
                                    {financial.map((g) => (
                                      <tr
                                        key={g.goalId}
                                        // className={classNames(
                                        //   personIdx === 0
                                        //     ? "border-gray-300"
                                        //     : "border-gray-200",
                                        //   "border-t"
                                        // )}
                                      >
                                        <td className="whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                          {g.description}
                                        </td>
                                        <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">
                                          {g.created}
                                        </td>
                                      </tr>
                                    ))}
                                    {/* </Fragment> */}
                                    {/* ))} */}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto"></div>
                  </div>
                  <div className="px-4 sm:px-6 lg:px-8 mx-20">
                    <div className="sm:flex sm:items-center">
                      <h2 className="text-l font-semibold text-left ml-5">
                        Business ({business.length})
                      </h2>
                      <div className="sm:flex-auto"></div>
                      <div className="sm:mt-0 sm:ml-16 sm:flex-none">
                        {business.length > 0 && (
                          <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                            onClick={() => history.push("/performance/goals")}
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                    {business.length <= 0 ? (
                      <>
                        <div className="mt-10 sm:flex sm:items-center">
                          <button
                            type="button"
                            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => history.push(`/performance/goals`)}
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
                                        Goals
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                      >
                                        Created
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white">
                                    {/* {locations.map((location) => (
                              <Fragment key={location.name}>
                                <tr className="border-t border-gray-200">
                                  <th
                                    colSpan={5}
                                    scope="colgroup"
                                    className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                                  >
                                    {location.name}
                                  </th>
                                </tr> */}
                                    {business.map((b) => (
                                      <tr
                                        key={b.goalId}
                                        className={classNames(
                                          b.goalId === 0
                                            ? "border-gray-300"
                                            : "border-gray-200",
                                          "border-t"
                                        )}
                                      >
                                        <td className="whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                          {b.description}
                                        </td>
                                        <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">
                                          {b.created}
                                        </td>
                                      </tr>
                                    ))}
                                    {/* </Fragment>
                            ))} */}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-center">Goals</h1>
                </div>
              </div>
              <div className="p-4">
                <img
                  src={require("../../assets/shiba-thumbs-up.png")}
                  alt="shiba"
                  className="object-contain h-20 w-full"
                />
                <h1 className="font-sans font-semibold text-xl">
                  Goal Period has not started
                </h1>
              </div>
            </>
          )}

          <div>
            <div className="px-4 sm:px-6 lg:px-8 mt-10">
              <div className="px-4 sm:px-6 lg:px-8 mt-10 mx-8">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-center">
                      Reviews
                    </h1>
                  </div>
                </div>
                {review ? (
                  <>
                    <div className="overflow-hidden bg-white shadow sm:rounded-md mt-5 mx-10">
                      <ul role="list" className="divide-y divide-gray-200">
                        {reviews.map((review) => (
                          <li key={review.reviewId}>
                            <a
                              href={`/performance/review/${review.reviewId}`}
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
                                        {review.employeeReviewing.firstName}{" "}
                                        {review.employeeReviewing.lastName}
                                      </p>
                                      <span className="mt-2 flex items-center text-sm text-gray-500">
                                        <EnvelopeIcon
                                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                          aria-hidden="true"
                                        />
                                        <span className="truncate">
                                          {review.employeeReviewing.workEmail}
                                        </span>
                                      </span>
                                    </div>
                                    <div className="hidden md:block">
                                      <div>
                                        <p className="text-sm text-gray-900 text-left"></p>
                                        <div className="mt-2 flex items-center text-sm text-gray-500">
                                          {renderAppraisalStatus(review)}
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
                  <>
                    <div className="p-4">
                      <img
                        src={require("../../assets/shiba-thumbs-up.png")}
                        alt="shiba"
                        className="object-contain h-20 w-full"
                      />
                      <h1 className="font-sans font-semibold text-xl">
                        Review Period has not started
                      </h1>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="px-4 sm:px-6 lg:px-8 mt-10 mx-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-center">
                    Appraisals
                  </h1>
                </div>
                {/* <div className="sm:mt-0 sm:m-17 sm:flex-none">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                      onClick={ () => history.push("/performance/appraisals")}
                    >
                      Go to Appraisals
                    </button>
                  </div> */}
              </div>
              {appraisals.length > 0 && appraisalPeriod ? (
                <>
                  <div className="overflow-hidden bg-white shadow sm:rounded-md mt-5 mx-20">
                    <ul role="list" className="divide-y divide-gray-200">
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
                                        {appraisal.employee.workEmail}
                                      </span>
                                    </span>
                                  </div>
                                  <div className="hidden md:block">
                                    <div>
                                      <p className="text-sm text-gray-900 text-left"></p>
                                      <div className="mt-2 flex items-center text-sm text-gray-500">
                                        {renderAppraisalStatus(appraisal)}
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
                <>
                  <div className="p-4">
                    <img
                      src={require("../../assets/shiba-thumbs-up.png")}
                      alt="shiba"
                      className="object-contain h-20 w-full"
                    />
                    <h1 className="font-sans font-semibold text-xl">
                      Appraisal Period has not started
                    </h1>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
