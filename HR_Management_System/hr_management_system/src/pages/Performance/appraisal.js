import { Fragment, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import PerformanceSidebar from "../../components/Sidebar/Performance";
import api from "../../utils/api";
import { Listbox, Switch, Transition } from "@headlessui/react";
import { useHistory } from "react-router";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronUpDownIcon,
  EnvelopeIcon,
  PlayCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import GoalList from "../../features/performance/GoalList";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Appraisal() {
  const appraisalId = window.location.href.substring(44);
  const [appraisal, setAppraisal] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [year, setYear] = useState("");
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [rating, setRating] = useState("Select");
  const [promote, setPromote] = useState(false);
  const [justification, setJustification] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [overdue, setOverdue] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [canPromote, setCanPromote] = useState(0);
  const [reviews, setReviews] = useState([]);

  const [positions, setPositions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const history = useHistory();

  useEffect(() => {
    //console.log(appraisalId);
    api.getAppraisalById(appraisalId).then((response) => {
      console.log(response.data);
      setAppraisal(response.data);
      setEmployee(response.data.employee);
      setStrengths(response.data.strengths);
      setWeaknesses(response.data.weaknesses);
      setRatingSelect(response.data.rating);
      setPromote(response.data.promotion);
      setJustification(response.data.promotionJustification);
      setSubmitted(response.data.submitted);

      api
        .getAppraisalPeriodByYear(response.data.appraisalYear)
        .then((response) => {
          setStartDate(response.data.startDate);
          setEndDate(response.data.endDate);

          const now = new Date().setHours(0, 0, 0, 0);
          if (now >= new Date(response.data.endDate).setHours(0, 0, 0, 0)) {
            setOverdue(true);
            //console.log(response.data.endDate);
          }
        });

      api
        .getEligibleForPromotion(response.data.employee.userId)
        .then((response) => {
          setCanPromote(response.data);
        });

      api
        .getManagerReviewsByYear(
          response.data.appraisalYear,
          response.data.employee.userId
        )
        .then((response) => {
          console.log(response.data);
          setReviews(response.data);
        });
    });
  }, []);

  useEffect(() => {
    api.getAppraisalById(appraisalId).then((response) => {
      console.log(response.data);
      setAppraisal(response.data);
      setEmployee(response.data.employee);
      setStrengths(response.data.strengths);
      setWeaknesses(response.data.weaknesses);
      setRatingSelect(response.data.rating);
      setPromote(response.data.promotion);
      setJustification(response.data.promotionJustification);
      setSubmitted(response.data.submitted);

      api
        .getAppraisalPeriodByYear(response.data.appraisalYear)
        .then((response) => {
          setStartDate(response.data.startDate);
          setEndDate(response.data.endDate);

          const now = new Date().setHours(0, 0, 0, 0);
          if (now >= new Date(response.data.endDate).setHours(0, 0, 0, 0)) {
            setOverdue(true);
            //console.log(response.data.endDate);
          }
        });
      api
        .getEligibleForPromotion(response.data.employee.userId)
        .then((response) => {
          setCanPromote(response.data);
        });
    });
  }, [refresh]);

  function setRatingSelect(rating) {
    if (rating === 1) {
      setRating("1 - Outstanding");
    } else if (rating === 2) {
      setRating("2 - Exceeds Expectations");
    } else if (rating === 3) {
      setRating("3 - Meets Expectations");
    } else if (rating === 4) {
      setRating("4 - Development Needed");
    } else if (rating === 5) {
      setRating("5 - Unsatisfactory");
    } else {
      setRating("Select");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (strengths && weaknesses && rating !== "Select") {
      if (promote && canPromote === 1 && rating !== "1 - Outstanding") {
        alert(
          "If you want to promote this employee, you will have to give them a rating of 1."
        );
      } else {
        var confirm;
        if (overdue) {
          confirm = window.confirm(
            "Are you sure you want to submit? You will not be able to update the appraisal after submission."
          );
        } else {
          confirm = window.confirm(
            "Are you sure you want to submit? You will not be able to update the appraisal without deleting after submission."
          );
        }
      }

      if (confirm) {
        api
          .submitAppraisal(
            appraisalId,
            strengths,
            weaknesses,
            parseInt(rating.substring(0, 1)),
            promote,
            justification
          )
          .then((response) => {
            alert(response.data);
            setSubmitted(true);
            setOverdue(false);
            setRefresh(!refresh);
          });
      }
    } else {
      alert("Please ensure all fields are not empty before submitting");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    //console.log(parseInt(rating.substring(0, 1)));

    var rate = 0;
    if (rating !== "Select") {
      rate = parseInt(rating.substring(0, 1));
    }

    var promotion = promote;
    if (!promote) {
      promotion = false;
    }

    api
      .saveAppraisal(
        appraisalId,
        strengths,
        weaknesses,
        rate,
        promotion,
        justification
      )
      .then((response) => {
        alert(response.data);
        setRefresh(!refresh);
      });
  };

  function withinCurrentPeriod() {
    const now = new Date().setHours(0, 0, 0, 0);
    console.log("now? " + startDate + " - " + endDate);
    return (
      now >= new Date(startDate).setHours(0, 0, 0, 0) &&
      now <= new Date(endDate).setHours(0, 0, 0, 0)
    );
  }

  function handleViewPromotion(appraisal) {
    //console.log(appraisal.employee.userId)
    api.getPromotionRequestByEmployee(appraisal.employee.userId).then(response => {
      //console.log(response.data.promotionId)
      history.push(`/promotion/${response.data.promotionId}`)
    })
  }

  const handleDelete = (e) => {
    e.preventDefault();

    const confirm = window.confirm(
      "Are you sure you want to delete this submitted appraisal? You will have to submit another appraisal for this employee by " +
        new Date(endDate).getDate() +
        "/" +
        new Date(endDate).getMonth() +
        "/" +
        new Date(endDate).getFullYear() +
        "."
    );

    if (confirm) {
      api
        .deleteAppraisal(appraisal.appraisalId)
        .then((response) => alert(response.data))
        .finally(() => history.push("/performance/appraisals"));
    }
  };

  function showRating(rating) {
    if (rating === 1) {
      return "1 - Outstanding";
    } else if (rating === 2) {
      return "2 - Exceeds Expectations";
    } else if (rating === 3) {
      return "3 - Meets Expectations";
    } else if (rating === 4) {
      return "4 - Development Needed";
    } else if (rating === 5) {
      return "5 - Unsatisfactory";
    } else {
      return "Select";
    }
  }

  return (
    appraisal &&
    employee &&
    startDate &&
    endDate && (
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
        <div>
          <div className="mt-10 mx-16 md:gap-6">
            <div className="md:col-span-1">
              <div className="mt-2 px-4 sm:px-0">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 mb-10 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => history.goBack()}
                >
                  <ArrowLeftIcon
                    className="-ml-1 mr-3 h-5 w-5"
                    aria-hidden="true"
                  />
                  Go Back
                </button>
                {overdue && appraisal.status === "Overdue" ? (
                  <>
                    <h2 className="text-lg font-medium leading-6 text-red-600">
                      Appraisal for
                    </h2>
                    <h2 className="text-lg font-semibold leading-6 text-red-600">
                      {employee.firstName} {employee.lastName}
                    </h2>
                    <h3 className="mt-1 text-md text-red-600">
                      Appraisal period {appraisal.appraisalYear}
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 mt-2 text-sm font-medium text-red-800">
                      Overdue
                    </span>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-medium leading-6 text-gray-900">
                      Appraisal for
                    </h2>
                    <h2 className="text-lg font-semibold leading-6 text-gray-900">
                      {employee.firstName} {employee.lastName}
                    </h2>
                    <h3 className="mt-1 text-md text-gray-600">
                      Appraisal period {appraisal.appraisalYear}
                    </h3>
                  </>
                )}
                {submitted && (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 mt-1 py-0.5 text-sm font-medium text-green-800">
                    Submitted
                  </span>
                )}
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmit}>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  {!submitted && (
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  )}
                </div>
                {submitted ? (
                  <>
                    <div className="overflow-hidden bg-white shadow sm:rounded-lg mx-32 my-10">
                      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-md text-left font-medium font-semibold font-sans text-gray-700">
                              Strengths
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 font-sans sm:col-span-2 sm:mt-0">
                              {appraisal.strengths}
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-md text-left font-medium font-semibold font-sans text-gray-700">
                              Weaknesses
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 font-sans sm:col-span-2 sm:mt-0">
                              {appraisal.weaknesses}
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-md text-left font-medium font-semibold font-sans text-gray-700">
                              Rating
                              <div className="text-sm text-gray-500 font-sans">
                                <div>1 - Outstanding</div>
                                <div>2 - Exceeds Expectations</div>
                                <div>3 - Meets Expectations</div>
                                <div>4 - Development Needed</div>
                                <div>5 - Unsatisfactory</div>
                              </div>
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 font-sans sm:col-span-2 sm:mt-0">
                              {showRating(appraisal.rating)}
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt className="text-md text-left font-medium font-semibold font-sans text-gray-700">
                              Recommended for promotion
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 font-sans sm:col-span-2 sm:mt-0">
                              {appraisal.promotion ? (
                                <>
                                  Yes{" "}(
                                  <button
                                    type="button"
                                    className="text-indigo-600"
                                    onClick={() =>
                                      handleViewPromotion(appraisal)
                                    }
                                  >
                                    View more
                                  </button>
                                  )
                                </>
                              ) : (
                                <>No</>
                              )}
                            </dd>
                          </div>
                          {/* <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
              </dd>
            </div> */}
                          {/* <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Attachments</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul
              role="list"
              className="divide-y divide-gray-200 rounded-md border border-gray-200"
            >
              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                <div className="flex w-0 flex-1 items-center">
                  <PaperClipIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-2 w-0 flex-1 truncate">
                    resume_back_end_developer.pdf
                  </span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Download
                  </a>
                </div>
              </li>
              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                <div className="flex w-0 flex-1 items-center">
                  <PaperClipIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-2 w-0 flex-1 truncate">
                    coverletter_back_end_developer.pdf
                  </span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Download
                  </a>
                </div>
              </li>
            </ul>
          </dd>
        </div> */}
                        </dl>
                      </div>
                    </div>
                    {withinCurrentPeriod() && submitted && (
                      <>
                        <button
                          type="button"
                          className="inline-flex justify-end rounded-md border border-transparent bg-indigo-600 mx-2 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                      <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-4">
                          <div className="col-span-3">
                            <label
                              htmlFor="goals"
                              className="block text-md text-left font-sans font-medium text-gray-900"
                            >
                              Goals
                            </label>
                            <GoalList userId={employee.userId} />
                          </div>
                          <div className="col-span-3">
                            <label
                              htmlFor="goals"
                              className="block text-md text-left font-sans font-medium text-gray-900"
                            >
                              Reviews
                            </label>
                            <div className="mt-5 flex flex-col">
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
                                            View
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-200 bg-white">
                                        {reviews.map((review) => (
                                          <tr key={review.reviewId}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-left font-medium text-gray-900 sm:pl-6">
                                              {
                                                review.employeeReviewing
                                                  .firstName
                                              }{" "}
                                              {
                                                review.employeeReviewing
                                                  .lastName
                                              }
                                              <span className="mt-2 flex items-center text-sm text-gray-500">
                                                <EnvelopeIcon
                                                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                  aria-hidden="true"
                                                />
                                                <span className="truncate">
                                                  {
                                                    review.employeeReviewing
                                                      .workEmail
                                                  }
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
                                              <a
                                                href={`/performance/review/${review.reviewId}`}
                                                className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                                              >
                                                View
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
                        </div>
                        <div className="">
                          <label
                            htmlFor="strengths"
                            className="block text-md text-left font-sans font-medium text-gray-900"
                          >
                            Strengths
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="strengths"
                              name="strengths"
                              rows={3}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder=""
                              value={strengths}
                              onChange={(s) => setStrengths(s.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="weaknesses"
                            className="block text-md text-left font-sans font-medium text-gray-900"
                          >
                            Weaknesses
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="weaknesses"
                              name="weaknesses"
                              rows={3}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder=""
                              value={weaknesses}
                              onChange={(w) => setWeaknesses(w.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-md mb-2 text-left font-medium font-sans text-gray-900">
                            Rating
                          </label>
                          <div className="sm:col-span-2 sm:mt-0">
                            <select
                              id="country"
                              name="country"
                              autoComplete="country-name"
                              className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                              value={rating}
                              onChange={(r) => setRating(r.target.value)}
                            >
                              <option>Select</option>
                              <option>1 - Outstanding</option>
                              <option>2 - Exceeds Expectations</option>
                              <option>3 - Meets Expectations</option>
                              <option>4 - Development Needed</option>
                              <option>5 - Unsatisfactory</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-md text-left font-medium font-sans text-gray-900">
                            Promotion
                          </label>
                          {canPromote >= 1 ? (
                            <>
                              <Switch.Group
                                as="div"
                                className="flex items-center justify-between"
                              >
                                <span className="flex flex-grow flex-col">
                                  {canPromote > 1 ? (
                                    <Switch.Description
                                      as="span"
                                      className="font-sans text-md text-left text-indigo-800"
                                    >
                                      This employee has received the 1 -
                                      Outstanding rating for {canPromote}{" "}
                                      consecutive year(s) and is eligible for
                                      promotion.
                                    </Switch.Description>
                                  ) : (
                                    <Switch.Description
                                      as="span"
                                      className="font-sans text-md text-left text-indigo-800"
                                    >
                                      This employee has received the 1 -
                                      Outstanding rating for {canPromote}{" "}
                                      consecutive year(s) and will be eligible
                                      for promotion if they receive this rating
                                      in this appraisal.
                                    </Switch.Description>
                                  )}
                                  <Switch.Description
                                    as="span"
                                    className="font-sans text-sm text-left text-gray-700"
                                  >
                                    You will be required to complete a promotion
                                    request by recommending this employee for
                                    promotion.
                                  </Switch.Description>
                                </span>
                                <Switch
                                  checked={promote}
                                  onChange={setPromote}
                                  className={classNames(
                                    promote ? "bg-indigo-600" : "bg-gray-200",
                                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  )}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      promote
                                        ? "translate-x-5"
                                        : "translate-x-0",
                                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                                    )}
                                  />
                                </Switch>
                              </Switch.Group>
                            </>
                          ) : (
                            <>
                              <h1 className="text-left font-sans">
                                An employee can only be promoted if they have
                                achieved the 1 - Outstanding rating for 2
                                consecutive years.
                              </h1>
                              <h1 className="text-left font-sans text-indigo-700">
                                This employee has received the 1 - Outstanding
                                rating for {canPromote} consecutive year(s).
                              </h1>
                            </>
                          )}
                        </div>

                        <div>
                          {promote ? (
                            <>
                              {" "}
                              <label
                                htmlFor="justification"
                                className="block mt-5 text-md text-left font-sans font-medium text-gray-900"
                              >
                                Promotion Justification
                              </label>
                              <div className="mt-1">
                                <textarea
                                  id="justification"
                                  name="justification"
                                  rows={3}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  placeholder=""
                                  value={justification}
                                  onChange={(j) =>
                                    setJustification(j.target.value)
                                  }
                                />
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        {!submitted && (
                          <>
                            <button
                              type="submit"
                              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 mx-2 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Submit
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
