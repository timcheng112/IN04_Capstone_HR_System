import {
  CheckCircleIcon,
  EnvelopeIcon,
  PencilIcon,
  PlayCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import api from "../../utils/api";

export default function ReviewPeriodHR() {
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [currentPeriod, setCurrentPeriod] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");
  const [reviews, setReviews] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    api.getAllReviewPeriods().then((response) => {
      //console.log(response.data);
      setSelectedPeriod(response.data[0]);
    });

    api.getReviewPeriodByYear(new Date().getFullYear()).then((response) => {
      setCurrentPeriod(response.data);
      setStartDate(response.data.startDate);
      setEndDate(response.data.endDate);
    });

    api.getAllReviewsByYear(new Date().getFullYear()).then((response) => {
      setReviews(response.data);
    });
  }, []);

  useEffect(() => {
    api.getAllReviewPeriods().then((response) => {
      //console.log(response.data);
      setSelectedPeriod(response.data[0]);
    });

    api.getReviewPeriodByYear(new Date().getFullYear()).then((response) => {
      setCurrentPeriod(response.data);
      setStartDate(response.data.startDate);
      setEndDate(response.data.endDate);
    });
  }, [refresh]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const reviewPeriod = {
      year: newStart.substring(0, 4),
      startDate: newStart,
      endDate: newEnd,
    };

    api.addReviewPeriod(reviewPeriod).then((response) => {
      alert(response.data);
      setRefresh(!refresh);
    });
  };

  const editReviewPeriod = (evt) => {
    evt.preventDefault();
    setEditMode(false);

    //api call
    api.updateReviewPeriod(startDate, endDate).then((response) => {
      alert(response.data);
      setRefresh(!refresh);
    });
  };

  function renderReviewStatus(item) {
    if (item.status === "Incomplete") {
      return (
        <div className="flex row">
          <XCircleIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          Incomplete
        </div>
      );
    } else if (item.status === "In Progress") {
      return (
        <div className="flex row">
          <PlayCircleIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-amber-400"
            aria-hidden="true"
          />
          In Progress
        </div>
      );
    } else if (item.status === "Completed") {
      return (
        <div className="flex row">
          <CheckCircleIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
            aria-hidden="true"
          />
          Completed
        </div>
      );
    } else {
      return (
        <div className="flex row">
          <XCircleIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400"
            aria-hidden="true"
          />
          Overdue
        </div>
      );
    }
  }

  function handleEdit() {
    const incomplete = reviews.filter((a) => a.status === "Incomplete");
    // console.log(parseInt(allAppraisals.length) - parseInt(incomplete.length));
    if (incomplete.length === reviews.length) {
      setEditMode(!editMode);
      setStartDate(currentPeriod.startDate);
      setEndDate(currentPeriod.endDate);
    } else {
      alert(
        "There are " +
          (parseInt(reviews.length) - parseInt(incomplete.length)) +
          " appraisal(s) that have been started, in progress or completed. Cannot change review period."
      );
      setEditMode(false);
    }
  }

  return (
    <div>
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold text-indigo-800 mb-10">
          Reviews HR Mode
        </h1>
      </div>
      <div>
        <h1 className="mx-2 font-sans font-semibold text-xl mb-5">
          Current Review Period
        </h1>
        {selectedPeriod ? (
          <>
            {editMode ? (
              <>
                <form onSubmit={editReviewPeriod}>
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
                          onChange={(s) => setStartDate(s.target.value)}
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
                          onChange={(e) => setEndDate(e.target.value)}
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
                    handleEdit();
                  }}
                >
                  <PencilIcon className="h-5 w-5 mr-2" />
                  Edit
                </button>
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
                            Employee / Reviewed By
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Manager
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
                        {reviews.map((review) => (
                          <tr key={review.reviewId}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-left font-medium text-gray-900 sm:pl-6">
                              {review.employeeReviewing.firstName}{" "}
                              {review.employeeReviewing.lastName}
                              <span className="mt-2 flex items-center text-sm text-gray-500">
                                <EnvelopeIcon
                                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span className="truncate">
                                  {review.employeeReviewing.workEmail}
                                </span>
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-left text-gray-900">
                              {review.manager.firstName}{" "}
                              {review.manager.lastName}
                              <span className="mt-2 flex items-center text-sm text-gray-500">
                                <EnvelopeIcon
                                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span className="truncate">
                                  {review.manager.workEmail}
                                </span>
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-left text-gray-500">
                              {renderReviewStatus(review)}
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
                The review period has not been created for this year. Please add
                one.
              </p>
              <p className="mt-2 text-md text-gray-800 mb-5">
                An review period has to be at least 14 days (inclusive of
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
    </div>
  );
}
