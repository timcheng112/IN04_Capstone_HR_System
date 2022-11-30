import { useEffect, useState } from "react";
import Moment from "react-moment";
import Navbar from "../../components/Navbar";
import PerformanceSidebar from "../../components/Sidebar/Performance";
import ReviewList from "../../features/performance/ReviewList";
import ReviewPeriodHR from "../../features/performance/ReviewPeriodHR";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Reviews() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [hrMode, setHrMode] = useState(false);
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    api.getReviewPeriodByYear(new Date().getFullYear()).then((response) => {
      setStartDate(response.data.startDate);
      setEndDate(response.data.endDate);
    });

    api.getAllReviewPeriods().then((response) => {
      console.log(response.data);
      setSelectedPeriod(response.data[0]);
      setPeriods(response.data);
    });

    api
      .getEmployeeReviewsByYear(new Date().getFullYear(), getUserId())
      .then((response) => {
        console.log(response.data);
        setReviews(response.data);
      });

    api.getUser(getUserId()).then((response) => {
      console.log(response.data);
      setUser(response.data);
    });
  }, []);

  useEffect(() => {
    api.getReviewPeriodByYear(new Date().getFullYear()).then((response) => {
      setStartDate(response.data.startDate);
      setEndDate(response.data.endDate);
    });

    api.getAllReviewPeriods().then((response) => {
      console.log(response.data);
      setSelectedPeriod(response.data[0]);
      setPeriods(response.data);
    });

    api
      .getEmployeeReviewsByYear(new Date().getFullYear(), getUserId())
      .then((response) => {
        console.log(response.data);
        setReviews(response.data);
      });

    api.getUser(getUserId()).then((response) => {
      console.log(response.data);
      setUser(response.data);
    });
  }, [refresh]);

  function withinCurrentPeriod() {
    const now = new Date().setHours(0, 0, 0, 0);

    return (
      now >= new Date(startDate).setHours(0, 0, 0, 0) &&
      now <= new Date(endDate).setHours(0, 0, 0, 0)
    );
  }

  function afterReviewPeriod() {
    const now = new Date().setHours(0, 0, 0, 0);
    //console.log("after? " + startDate + " - " + endDate);
    return (
      now >= new Date(startDate).setHours(0, 0, 0, 0) &&
      now >= new Date(endDate).setHours(0, 0, 0, 0)
    );
  }

  function changeSelectedPeriod(year) {
    console.log("selected period " + year);
    setSelectedPeriod(year);
    setRefresh(!refresh);
  }

  function renderOverdueHeader(reviews) {
    const overdueCount = reviews.filter((a) => a.status === "Overdue").length;
    //console.log(overdueCount);
    if (overdueCount > 0) {
      return (
        <>
          <h1 className="mt-5 font-semibold text-red-600">
            My Manager Reviews
            <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 ml-1 text-sm font-medium font-semibold text-red-800">
              {overdueCount}
            </span>
          </h1>
        </>
      );
    } else {
      return (
        <>
          <h1 className="mt-5 font-semibold">My Manager Reviews</h1>
        </>
      );
    }
  }

  return (
    reviews &&
    periods &&
    user && (
      <div>
        <Navbar />
        <div className="flex">
          <div className="flex-1">
            <PerformanceSidebar
              currentPage={{
                name: "Reviews",
                href: "/performance/reviews",
                current: true,
              }}
            />
          </div>
        </div>
        <div className="py-10">
          <main className="flex-1">
            <div className="flex items-center">
              <div className="mt-4 ml-auto mr-6">
                {user.hrEmployee && (
                  <>
                    {hrMode ? (
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        onClick={() => setHrMode(!hrMode)}
                      >
                        Non-HR Mode
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        onClick={() => setHrMode(!hrMode)}
                      >
                        HR Mode
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            <div>
              {hrMode ? (
                <ReviewPeriodHR />
              ) : (
                <>
                  <div>
                    <h1 className="text-3xl font-sans font-semibold text-gray-900 mb-10">
                      Manager Reviews
                    </h1>
                    {withinCurrentPeriod() || afterReviewPeriod() ? (
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
                            {periods.map((reviewPeriod) => (
                              <option
                                key={reviewPeriod.reviewPeriodId}
                                className="text-center text-lg"
                              >
                                {reviewPeriod.year}
                              </option>
                            ))}
                          </select>
                          <span
                            className={classNames(
                              withinCurrentPeriod()
                                ? "text-green-800 bg-green-100"
                                : "text-indigo-800 bg-indigo-100",
                              "inline-flex items-center mt-2 mb-5 rounded-full px-5 py-2 text-md font-medium"
                            )}
                          >
                            Review period
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
                          {renderOverdueHeader(reviews)}
                          <ReviewList reviews={reviews} />
                        </div>
                      </>
                    ) : (
                      <div>
                        <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
                          <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-20 lg:px-8">
                            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">
                              <span className="block">No action required</span>
                            </h2>
                            <div className="mt-8 flex justify-center">
                              <div className="inline-flex rounded-md shadow"></div>
                            </div>
                          </div>
                        </div>
                      </div>
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
