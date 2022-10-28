import { React } from "react";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import { useHistory } from "react-router-dom";
import PerformanceSidebar from "../../components/Sidebar/Performance";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function Goals() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [hrMode, setHrMode] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const history = useHistory();

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(user);
      })
      .catch((error) => setError(error));

    api.getGoalPeriodByYear(new Date().getFullYear() + "").then((response) => {
      console.log(response.data.substring(0, 10));
      setStartDate(response.data.substring(0, 10));
      console.log(response.data.substring(13));
      setEndDate(response.data.substring(13));
    });
  }, []);

  useEffect(() => {}, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (startDate.substring(0, 4) === endDate.substring(0, 4)) {
      const goalPeriod = {
        startDate: startDate,
        endDate: endDate,
        year: endDate.substring(0, 4),
      };
      api
        .createGoalPeriod(goalPeriod)
        .then((response) =>
          alert(
            "Goal period for " + endDate.substring(0, 4) + " has been created"
          )
        )
        .catch((error) => {
          const message = error.request.response;
          if (message.includes("already exists")) {
            alert(
              "Goal period for " + endDate.substring(0, 4) + " already exists"
            );
          }
        });
    }
  };

  if (error) return `Error`;

  return (
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
                <h1 className="text-xl font-semibold text-indigo-800 mb-20">
                  Goals HR Mode
                </h1>
              </div>
              {startDate && endDate ? (
                <div>
                  <h1 className="mx-2 font-sans font-semibold text-xl">
                    Current Goal Period
                  </h1>
                  <div className="flex flex-row justify-center">
                    <h1 className="mx-3 font-sans font-semibold">
                      {startDate}
                    </h1>
                    <h1 className="mx-2 font-sans font-semibold">to</h1>
                    <h1 className="mx-3 font-sans font-semibold">{endDate}</h1>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 mt-5 px-4 py-2 text-md font-sans font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <PencilIcon className="h-5 w-5 mr-2" />
                    Edit
                  </button>
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
                            onChange={(s) => setStartDate(s.target.value)}
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
            <div>
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Goals</h1>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
